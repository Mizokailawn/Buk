"use server";

import { createClient } from "@/lib/supabase/server";
import { publishVehicleSchema } from "@/components/sell/sell-form-schema";
import { revalidateTag } from "next/cache";

const VEHICLE_IMAGE_BUCKET = "vehicle-images";

function revalidateVehicleCaches() {
  revalidateTag("public-vehicles");
  revalidateTag("filtered-vehicle");
  revalidateTag("filtered-vehicle-page");
  revalidateTag("vehicle-filter-options");
  revalidateTag("vehicle-details");
}

async function removeUploadedImages(supabase, uploads) {
  const paths = uploads.map((img) => img.path).filter(Boolean);

  if (paths.length === 0) return;

  const { error } = await supabase.storage
    .from(VEHICLE_IMAGE_BUCKET)
    .remove(paths);

  if (error) {
    console.error("Image cleanup failed:", error.message);
  }
}

function assertOwnTempUploads(images, userId) {
  const tempPrefix = `${userId}/temp/`;
  const hasUnsafePath = images.some((img) => !img.path.startsWith(tempPrefix));

  if (hasUnsafePath) {
    throw new Error("Invalid uploaded image path");
  }
}

async function moveImagesToVehicleFolder(supabase, images, userId, vehicleId) {
  const finalizedImages = [];

  try {
    for (const [index, img] of images.entries()) {
      const fileName = img.path.split("/").pop();
      const finalPath = `${userId}/${vehicleId}/${fileName}`;

      const { error } = await supabase.storage
        .from(VEHICLE_IMAGE_BUCKET)
        .move(img.path, finalPath);

      if (error) throw error;

      const { data } = supabase.storage
        .from(VEHICLE_IMAGE_BUCKET)
        .getPublicUrl(finalPath);

      finalizedImages.push({
        path: finalPath,
        url: data.publicUrl,
        order: index,
      });
    }

    return finalizedImages;
  } catch (error) {
    await removeUploadedImages(supabase, finalizedImages);
    throw error;
  }
}

export async function publishVehicleListing(input) {
  const parsed = publishVehicleSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || "Invalid listing details",
    };
  }

  const supabase = await createClient();
  const { vehicle, images } = parsed.data;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    await removeUploadedImages(supabase, images);

    return {
      success: false,
      error: "Please sign in again before publishing your listing.",
    };
  }

  let vehicleId = null;
  let finalizedImages = [];

  try {
    assertOwnTempUploads(images, user.id);

    const { data: createdVehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .insert([
        {
          ...vehicle,
          registration: vehicle.registration.toUpperCase(),
          user_id: user.id,
        },
      ])
      .select("id")
      .single();

    if (vehicleError) throw vehicleError;

    vehicleId = createdVehicle.id;

    finalizedImages = await moveImagesToVehicleFolder(
      supabase,
      images,
      user.id,
      vehicleId,
    );

    const imageRows = finalizedImages.map((img, index) => ({
      vehicle_id: vehicleId,
      url: img.url,
      order_index: index,
    }));

    const { error: imageError } = await supabase
      .from("vehicle_images")
      .insert(imageRows);

    if (imageError) throw imageError;

    const { error: thumbnailError } = await supabase
      .from("vehicles")
      .update({ thumbnail_url: finalizedImages[0]?.url })
      .eq("id", vehicleId);

    if (thumbnailError) throw thumbnailError;

    revalidateVehicleCaches();

    return {
      success: true,
      vehicleId,
    };
  } catch (error) {
    console.error("Vehicle publish failed:", error);

    if (vehicleId) {
      const { error: deleteError } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", vehicleId);

      if (deleteError) {
        console.error("Vehicle rollback failed:", deleteError.message);
      }
    }

    await removeUploadedImages(supabase, [...images, ...finalizedImages]);

    return {
      success: false,
      error: "Could not publish your listing. Please try again.",
    };
  }
}
