// lib/queries/vehicles/get-vehicle-by-id.js

import { createClient } from "@/lib/supabase/client";

export async function getVehicleById(id) {
  const supabase = createClient();
  console.log("Fetching vehicle with id:", id);

  const { data, error } = await supabase
    .from("vehicles")
    .select(`
      *,
      vehicle_images(*)
    `)
    .eq("id", id)
    .single();

    console.log("Supabase response for vehicle id: ", data);    

  if (error) {
    throw new Error(error.message);
  }

  return data;
}