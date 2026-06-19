import ActiveFilterChips from "@/components/listings/activefilterchips";
import CategoryChips from "@/components/listings/CategoryChips";
import FloatingFilterButton from "@/components/listings/floatingfilterbutton";
import ListingsWrapper from "@/components/listings/listingspagewrapper";
import SearchOverlay from "@/components/listings/search-overlay";
import FloatingShareButton from "@/components/shared/floating-share-button";
import VehicleSkeletonGrid from "@/components/skeletons/vehicle-skeleton-grid";
import { ListingsLoadingProvider } from "@/components/listings/listings-loading-context";
import { GetVehicleFilterOptions } from "@/lib/queries/vehicles/get-vehicle";
import { SearchProvider } from "@/components/search/search-provider";
import { Suspense } from "react";

export default async function ListingsPage({ searchParams }) {
  const filterOptions = await GetVehicleFilterOptions();

  return (
    <div className="px-2 py-17 w-full min-h-svh max-w-6xl mx-auto space-y-2">
      <ListingsLoadingProvider>
        <SearchProvider>
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
            <ListingsWrapper searchParams={searchParams} />
          </Suspense>
          <Suspense>
            <FloatingFilterButton filterOptions={filterOptions} />
          </Suspense>
          <FloatingShareButton />
        </SearchProvider>
      </ListingsLoadingProvider>
    </div>
  );
}
