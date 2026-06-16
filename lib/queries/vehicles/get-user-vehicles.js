import { createClient } from "@/lib/supabase/public";

/**
 * Fetch all listings published by the currently logged-in user.
 * This bypasses "use cache" since user listings are dynamic and personal.
 */
export async function GetUserVehicles(userId) {
  const supabase = createClient();  

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      `
        id,
        user_id,
        model,
        brand,
        price,
        city,
        status,
        thumbnail_url,
        created_at
      `
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching user vehicles: ", error.message);
    return { success: false, error: "Error fetching your listings." };
  }

  return { success: true, data };
}
