import { createClient } from "@/lib/supabase/server";
import { GetUserVehicles } from "@/lib/queries/vehicles/get-user-vehicles";
import { redirect } from "next/navigation";
import UserData from "./user-data";
import UserListings from "./user-listings";

export default async function UserDetails() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { success, data: listings = [] } = await GetUserVehicles(user.id);  

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* HEADER SECTION */}
      <UserData user={user} />

      {/* MY LISTINGS SECTION */}
      <UserListings listings={listings} />
    </div>
  );
}
