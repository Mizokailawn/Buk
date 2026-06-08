import ListingsGrid from "./listingsgrid";
import CategoryChips from "./CategoryChips";
import { Suspense } from "react";
import FloatingFilterButton from "./floatingfilterbutton";
import ActiveFilterChips from "./activefilterchips";
import ListingsQueryProvider from "./listings-query-provider";
import SearchOverlay from "./search-overlay";
import VehicleSkeletonGrid from "../skeletons/vehicle-skeleton-grid";

export default async function ListingsWrapper({ filterOptions }) {
  return (
    <ListingsQueryProvider>
      <Suspense>
        <SearchOverlay />
      </Suspense>
      <div className="space-y-3 pb-20">
        <Suspense>
          <CategoryChips />
        </Suspense>
        <Suspense>
          <ActiveFilterChips />
        </Suspense>
        <Suspense fallback={<VehicleSkeletonGrid />}>
          <ListingsGrid />
        </Suspense>
        <Suspense>
          <FloatingFilterButton filterOptions={filterOptions} />
        </Suspense>
      </div>
    </ListingsQueryProvider>
  );
}
