// lib/imageprocessing/uploadImages.js
import { createClient } from "../supabase/client";

export async function uploadImages(images, vehicleId) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const uploadedPaths = [];

  try {
    const uploads = await Promise.all(
      images.map(async (img, index) => {
        const path = `${user.id}/${vehicleId}/${img.id}.jpg`;

        const { error } = await supabase.storage
          .from("vehicle-images")
          .upload(path, img.file);

        if (error) throw error;

        uploadedPaths.push(path);

        const { data } = supabase.storage
          .from("vehicle-images")
          .getPublicUrl(path);

        return {
          url: data.publicUrl,
          path,
          order: index,
        };
      }),
    );

    return uploads;
  } catch (error) {
    console.error("Error uploading images: ", error.message);
    if (uploadedPaths.length > 0) {
      await supabase.storage.from("vehicle-images").remove(uploadedPaths);
    }
    throw error;
  }
}
