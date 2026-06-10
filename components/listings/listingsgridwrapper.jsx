import ListingsGrid from "./listingsgrid";
import CategoryChips from "./CategoryChips";
import { Suspense } from "react";
import FloatingFilterButton from "./floatingfilterbutton";
import ActiveFilterChips from "./activefilterchips";
import ListingsQueryProvider from "./listings-query-provider";
import SearchOverlay from "./search-overlay";
import VehicleSkeletonGrid from "../skeletons/vehicle-skeleton-grid";
import { parseFilters } from "@/lib/filter/parse-filter";
import { GetFilteredVehiclePage } from "@/lib/queries/vehicles/get-vehicle";
import FloatingShareButton from "../shared/share-button";

export default async function ListingsWrapper({ filterOptions, searchParams }) {

  const filters = parseFilters(await searchParams);
  const initialData = await GetFilteredVehiclePage(filters);

  return (
    <ListingsQueryProvider>
      <Suspense>
        <SearchOverlay />
      </Suspense>
      <div className="space-y-3">
        {/* <Suspense>
          <CategoryChips />
        </Suspense> */}
        <Suspense>
          <ActiveFilterChips />
        </Suspense>
        <Suspense fallback={<VehicleSkeletonGrid />}>
          <ListingsGrid initialData={initialData} />
        </Suspense>
        <Suspense>
          <FloatingFilterButton filterOptions={filterOptions} />
        </Suspense>
        <FloatingShareButton />
      </div>
    </ListingsQueryProvider>
  );
}
