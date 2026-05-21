"use server"

import { createClient } from "@/lib/supabase/server";

export async function createVehicle(car){

    const supabase = await createClient()

    const { data : { user } } = await supabase.auth.getUser()

    if (!user) {
        console.error("No USER : ", error.message);
        return
    }
    
    const { data, error } = await supabase.from("vehicles")
        .insert([
        {
        user_id : user.id,
        ...car,
        }
        ])
        .select()
        .single()

        console.log("Data Inserted to vehicles table: ", data)

//     const vehicleId = data.id
//     const userId = data.user.id

//     if (error){
//         console.error("Upload failed :", error.message)
//     return
//     }

// return { success: true, vehicleId, userId }
// }
        if (error) {
            console.log("Error Inserting Data to vehicles table: ", error.message)
            throw error
        }

    return data
}

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
    console.error("Error Inserting Vehicle Images: ", error.message)
    try {
    await supabase.from("vehicles").delete().eq("id", vehicleId)
    } catch (deleteError){
        console.error("Error deleting gghost vehicle: ", deleteError.message)
    }
    try {
    await supabase.storage.from("vehicle-images").remove(uploads.map(img => img.path))
    } catch (storageError){
        console.error("Error deleting images from storage: ", storageError.message)
    }
    throw error
  }
}