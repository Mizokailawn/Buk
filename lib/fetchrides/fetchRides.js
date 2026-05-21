import { createClient } from "../supabase/server";

export async function getHomePageListings(){
    const supabase = await createClient()

    const { data, error } = await supabase.from("vehicles").select(`
        id,
        model,
        brand,
        price,
        city, 
        thumbnail_url      
    `).order("created_at", { ascending: false })
    .limit(10);

    if (error){
        console.error("Error fetching vehicles: ", error.message)
        throw new Error(error.message)
    }

    return data
}


export async function getExploreListings(){
    const supabase = await createClient()

    const { data, error } = await supabase.from("vehicles").select(`
        id,
        model,
        brand,
        price,
        city, 
        thumbnail_url      
    `).order("created_at", { ascending: false })
    .limit(10);

    if (error){
        console.error("Error fetching vehicles: ", error.message)
        throw new Error(error.message)
    }

    return data
}

export async function getVehicleDetails(id){
    const supabase = await createClient()

    const { data, error } = await supabase.from("vehicles")
        .select(`
        *,
        vehicle_images(*)
        `).eq("id", id).
        single();

        console.log("Supabase response for vehicle id: ", data);
        console.error("Error: ", error)

    if (error){
        console.error("Error fetching vehicle details: ", error.message)
        throw new Error(error.message)
    }   

    return data
}