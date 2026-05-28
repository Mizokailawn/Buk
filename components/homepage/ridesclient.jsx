import { GetHomepageVehicles } from "@/lib/queries/vehicles/get-vehicle";
import VehicleCard from "../vehicles/car-card";
import { PublicVehiclesError } from "../errors/public-vehicle-error";

export default async function RidesClient() {
  const response = await GetHomepageVehicles();

  // 1. Handle the cached error state explicitly
  if (!response.success) {
    return <PublicVehiclesError message={response.error} />;
  }
  const vehicles = response.data;

  // 2. Handle a clean empty state (Database works, but has 0 cars matching)
  if (vehicles.length === 0) {
    return (
      <div className="p-6 text-center border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">
          No vehicles available right now.
        </p>
      </div>
    );
  }

  // 3. Render successful grid layout
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full px-2">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}
