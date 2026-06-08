import ListingsWrapper from "@/components/listings/listingsgridwrapper";
import { GetVehicleFilterOptions } from "@/lib/queries/vehicles/get-vehicle";

export default async function ListingsPage() {
  const filterOptions = await GetVehicleFilterOptions();

  return (
    <div className="px-2 py-17 w-full min-h-svh max-w-6xl mx-auto">
      <ListingsWrapper filterOptions={filterOptions} />
    </div>
  );
}
