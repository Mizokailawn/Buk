import VehicleDetailClient from "@/components/vehicles/vehicle-detail-client";
import { GetPublicVehicleById } from "@/lib/queries/vehicles/get-vehicle";

export async function VehicleDetailsWrapper({ params }) {
  const { id } = await params;
  const vehicle = await GetPublicVehicleById(id);

  return (
    <VehicleDetailClient vehicle={vehicle} />
  );
}
