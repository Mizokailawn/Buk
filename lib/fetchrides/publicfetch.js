import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "../supabase/public";

// ================================================
// FETCH PUBLIC VEHICLE
// ================================================
export async function GetPublicVehicles() {
  "use cache";
  cacheLife("minutes")
  cacheTag("public-vehicles")

  console.log("DATABASE HIT VIA GetPublicVehicles")

  const supabase = createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      `
        id,
        model,
        brand,
        price,
        city, 
        thumbnail_url      
    `,
    )
    .order("created_at", { ascending: false })
    .limit(10);  

  if (error) {
    console.error("Error fetching vehicles: ", error.message);
    return { success: false, error: "Error fetching public vehicles."}
  }

  return { success: true, data };
}

// ===============================================================
// FETCH VEHICLE BY ID
// ===============================================================
export async function GetPublicVehicleById(id) {
  "use cache";
  cacheLife("hours")
  cacheTag("vehicle-details")

  console.log("DATABASE HIT VIA GetPublicVehicleById(id)")

  const supabase = createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      `*,
    vehicle_images(*)`,
    )
    .eq("id", id)
    .single();    

  if (error) {
    console.error("Error fetching vehicle by Id: ", error.message);
    return { success: false, error: "Error fetching vehicle details."}
  }
  return data;
}
