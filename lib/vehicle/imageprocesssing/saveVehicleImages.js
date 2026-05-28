// lib/saveVehicleImages.js

export async function saveVehicleImages(vehicleId, uploads) {

  const supabase = await createClient()

  const rows = uploads.map((img, index) => ({
    vehicle_id: vehicleId,
    url: img.url,
    order_index: index,
  }))

  console.log("Inserting Vehicle Images Data: ", rows)

  const { error } = await supabase
    .from("vehicle_images")
    .insert(rows)    

  if (error) {
    await supabase.from("vehicles").delete().eq("vehicle_id", vehicleId)
    await supabase.storage.from("vehicle-images").remove(uploads.map(img => img.path))
    console.log("Error Inserting Vehicle Images: ", error.message)
    throw error
  }
}