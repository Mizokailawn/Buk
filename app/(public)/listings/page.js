import ActiveFilterChips from "@/components/listings/activefilterchips";
import CategoryChips from "@/components/listings/CategoryChips";
import FloatingFilterButton from "@/components/listings/floatingfilterbutton";
import ListingsWrapper from "@/components/listings/listingspagewrapper";
import SearchOverlay from "@/components/listings/search-overlay";
import FloatingShareButton from "@/components/shared/floating-share-button";
import { ListingsLoadingProvider } from "@/components/listings/listings-loading-context";
import VehicleSkeletonGrid from "@/components/skeletons/vehicle-skeleton-grid";
import { GetVehicleFilterOptions } from "@/lib/queries/vehicles/get-vehicle";
import { Suspense } from "react";

export default async function ListingsPage({ searchParams }) {
  const filterOptions = await GetVehicleFilterOptions();

  return (
    <div className="px-2 py-17 w-full min-h-svh max-w-6xl mx-auto space-y-2">
      <ListingsLoadingProvider>
        <Suspense>
          <SearchOverlay />
        </Suspense>
        <Suspense>
          <CategoryChips />
        </Suspense>
        <Suspense>
          <ActiveFilterChips />
        </Suspense>
        <Suspense fallback={<VehicleSkeletonGrid />}>
          <ListingsWrapper
            filterOptions={filterOptions}
            searchParams={searchParams}
          />
        </Suspense>
        <Suspense>
          <FloatingFilterButton filterOptions={filterOptions} />
        </Suspense>
        <FloatingShareButton />
      </ListingsLoadingProvider>
    </div>
  );
}
