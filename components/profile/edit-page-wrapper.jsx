import { GetPublicVehicleById } from "@/lib/queries/vehicles/get-vehicle";
import { createClient } from "@/lib/supabase/server";
import EditVehicleForm from "./edit-vehicle-form";

export default async function EditPageWrapper({ params }) {

  const supabase = await createClient();
  const {id} = await params  

  const { data: user, authError } = await supabase.auth.getUser();

  if (!user || authError) {
    return;
  }

  const vehicle = await GetPublicVehicleById(id);  

  return (
    <>
      <EditVehicleForm vehicle={vehicle} />
    </>
  );
}
