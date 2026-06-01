import ListingsGrid from "./listingsgrid";
import CategoryChips from "./CategoryChips";
import { Suspense } from "react";
import VehicleSkeletonCard from "../skeletons/vehicle-skeleton-card";
import FloatingFilterButton from "./floatingfilterbutton";
import ActiveFilterChips from "./activefilterchips";
import ListingsQueryProvider from "./listings-query-provider";

export default function ListingsWrapper({ filterOptions }) {
  return (
    <ListingsQueryProvider>
      <div className="space-y-3 pb-20">
        <Suspense>
          <CategoryChips />
        </Suspense>
        <Suspense>
          <ActiveFilterChips />
        </Suspense>
        <Suspense fallback={<VehicleSkeletonCard />}>
          <ListingsGrid />
        </Suspense>
        <Suspense>
          <FloatingFilterButton filterOptions={filterOptions} />
        </Suspense>
      </div>
    </ListingsQueryProvider>
  );
}
