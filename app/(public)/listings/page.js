import ListingsWrapper from "@/components/listings/listingsgridwrapper";
import { GetVehicleFilterOptions } from "@/lib/queries/vehicles/get-vehicle";

export default async function ListingsPage() {
  const filterOptions = await GetVehicleFilterOptions();

  return (
    <div className="px-3 w-full h-full max-w-6xl mx-auto">
      <ListingsWrapper filterOptions={filterOptions} />
    </div>
  );
}
