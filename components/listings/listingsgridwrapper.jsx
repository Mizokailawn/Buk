import { GetHomepageVehicles } from "@/lib/queries/vehicles/get-vehicle";
import ListingsGrid from "./listingsgrid";
import { PublicVehiclesError } from "../errors/public-vehicle-error";

export default async function ListingsWrapper() {
  
  const response = await GetHomepageVehicles();
  const listings = response.data;

  if (!response.success) {
    return <PublicVehiclesError message={response.error} />;
  }

  if (listings.length === 0) {
    return (
      <div>
        <p>Sorry! NO vehicles to show at the moment.</p>
      </div>
    );
  }

  return <ListingsGrid listings={listings} />;
}
