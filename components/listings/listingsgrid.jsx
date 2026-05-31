import { parseFilters } from "@/lib/filter/parse-filter";
import VehicleCard from "../vehicles/car-card";
import { GetFilteredVehicle } from "@/lib/queries/vehicles/get-vehicle";

const ListingsGrid = async({ searchParams }) => {
  const filters = parseFilters(await searchParams);
    console.log("Filter: ", filters);
  
    const vehicle = await GetFilteredVehicle(filters);
  
    if (!vehicle?.length) {
      return (
        <>          
          <div className="flex flex-col h-[calc(100vw-100px)] w-full mx-auto justify-center items-center">
            <p className="text-sm italic text-muted-foreground">
              Sorry! NO vehicles found.
            </p>
            <p className="text-sm italic text-muted-foreground">
              Please check your filters.
            </p>
          </div>
        </>
      );
    }
  return (
    <div className="space-y-3 w-full">      
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-7 w-full">
        {vehicle.map((vehicle) => {
          if (!vehicle || !vehicle.id) {
            console.log("Skipping invalid vehicle data: ", vehicle);
            return null; // Skip rendering for this item
          }
          return <VehicleCard key={vehicle.id} vehicle={vehicle} />;
        })}
      </div>
    </div>
  );
};

export default ListingsGrid;
