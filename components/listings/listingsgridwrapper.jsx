import ListingsGrid from "./listingsgrid";
import { PublicVehiclesError } from "../errors/public-vehicle-error";
import { parseFilters } from "@/lib/filter/parse-filter";
import CategoryChips from "./CategoryChips";
import { GetFilteredVehicle } from "@/lib/queries/vehicles/get-vehicle";

export default async function ListingsWrapper({searchParams}) {
  const filters = parseFilters(await searchParams);
  console.log("Filter: ", filters)  
  
  const vehicle = await GetFilteredVehicle(filters);
  // console.log("Filtered vehicles: ", vehicle[0]);

  if (!vehicle?.length) {
    return (
      <div className="flex h-screen w-full p-3 justify-center items-center bg-background">
        <p className="text-sm italic text-muted-foreground">Sorry! NO vehicles found. Please check your filters.</p>
      </div>
    );
  }

  // if (error) {
  //   console.error("Error fetching filtered vehicle: ", error.meaasge);
  //   return <PublicVehiclesError message={error.message} />;
  // }

  return (
    <div>
      <CategoryChips />
      <ListingsGrid vehicle={vehicle} />;
    </div>
  );
}
