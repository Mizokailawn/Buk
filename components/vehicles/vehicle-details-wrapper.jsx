import VehicleDetails from "@/components/vehicles/vehicle-details";
import { GetPublicVehicleById } from "@/lib/queries/vehicles/get-vehicle";

export async function VehicleDetailsWrapper({ params }) {
  const { id } = await params;
  const vehicle = await GetPublicVehicleById(id);

  return (
    <div className="flex max-w-6xl mx-auto">
      <VehicleDetails vehicle={vehicle} />
    </div>
  );
}
