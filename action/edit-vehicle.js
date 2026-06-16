"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidateTag } from "next/cache";

/**
 * Edit / Update an existing vehicle listing owned by the logged-in user.
 */
export async function updateVehicleDetails({ vehicleId, vehicle }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const updateData = {
    model: vehicle.model,
    brand: vehicle.brand,
    category: vehicle.category,
    price: vehicle.price,
    seller: vehicle.seller,
    description: vehicle.description,
    phone: vehicle.phone,
    whatsapp: vehicle.whatsapp,
    city: vehicle.city,
    registration: vehicle.registration,
    fuel: vehicle.fuel,
    transmission: vehicle.transmission,
  };

  const { data , error } = await supabase
    .from("vehicles")
    .update(updateData)
    .eq("id", vehicleId)
    .eq("user_id", user.id)
    .select("id")
    .single();

  if (error || !data) {
    return {
      success: false,
      error: "Vehicle not found.",
    };
  }

  revalidateTag("vehicle-details");

  revalidateTag("user-vehicles");

  revalidateTag("filtered-vehicle-page");

  return {
    success: true,
  };
}

/**
 * Update the status of a listing (e.g., mark as "sold" or "archived").
 */
export async function UpdateVehicleStatus(vehicleId, status) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
    };
  }

  const { error } = await supabase
    .from("vehicles")
    .update({ status })
    .eq("id", vehicleId)
    .eq("user_id", user.id);

  if (error) {
    console.error(error);

    return {
      success: false,
    };
  }

  revalidateTag("user-vehicles");
  revalidateTag("filtered-vehicle-page");
  revalidateTag("vehicle-details");

  return {
    success: true,
  };
}

// ======================================================
// DELETE VEHICLE
// ======================================================
export async function deleteVehicle(vehicleId) {
  const supabase = await createClient();  

  try {
    // auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    // fetch vehicle
    const { data: vehicle, error: vehicleError } = await supabase
      .from("vehicles")
      .select("user_id")
      .eq("id", vehicleId)
      .single();

          if (vehicleError || !vehicle) {
      return {
        success: false,
        error: "Vehicle not found",
      };
    }

    // ownership check
    if (vehicle.user_id !== user.id) {
      return {
        success: false,
        error: "Not authorized",
      };
    }

    // storage cleanup      
    const folderPath = `${vehicle.user_id}/${vehicleId}`; 

    const { data: files, error: listError } = await supabase.storage
      .from("vehicle-images")
      .list(folderPath);


    if (listError) {
      console.error(listError)
    } 

    if (files?.length) {
      const filePaths = files.map((file) => `${folderPath}/${file.name}`);

      const { error: removeError } = await supabase.storage.from("vehicle-images").remove(filePaths);

      if (removeError) {
        console.error("Remove Error: ", removeError)
      }
    }

    // delete row
    const { error: deleteError } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", vehicleId)
      .eq("user_id", user.id);

    if (deleteError) {
      return {
        success: false,
        error: deleteError.message,
      };
    }

    revalidateTag("user-vehicles");

    revalidateTag("vehicle-details");

    revalidateTag("filtered-vehicle-page");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
