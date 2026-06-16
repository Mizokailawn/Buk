import { Suspense } from "react";
import FloatingFilterButton from "./floatingfilterbutton";
import ActiveFilterChips from "./activefilterchips";
import ListingsQueryProvider from "./listings-query-provider";
import SearchOverlay from "./search-overlay";
import VehicleSkeletonGrid from "../skeletons/vehicle-skeleton-grid";
import { parseFilters } from "@/lib/filter/parse-filter";
import { GetFilteredVehiclePage } from "@/lib/queries/vehicles/get-vehicle";
import FloatingShareButton from "../shared/floating-share-button";
import ListingsGridWrapper from "./listingsgirdwrapper";

export default async function ListingsWrapper({ filterOptions, searchParams }) {
  const filters = parseFilters(await searchParams);
  const initialData = await GetFilteredVehiclePage(filters);

  return (
    <ListingsQueryProvider>      
      <div className="space-y-3">        
        <Suspense fallback={<VehicleSkeletonGrid />}>
          <ListingsGridWrapper initialData={initialData} />
        </Suspense>        
      </div>
    </ListingsQueryProvider>
  );
}
