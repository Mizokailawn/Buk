import CategoryChips from "@/components/listings/CategoryChips";
import ListingsWrapper from "@/components/listings/listingsgridwrapper";
import VehicleSkeletonGrid from "@/components/skeletons/vehicle-skeleton-grid";
import { GetVehicleFilterOptions } from "@/lib/queries/vehicles/get-vehicle";
import { Suspense } from "react";

export default async function ListingsPage({ searchParams }) {
  const filterOptions = await GetVehicleFilterOptions();

  return (
    <div className="px-2 py-17 w-full min-h-svh max-w-6xl mx-auto space-y-2">
      <Suspense>
        <CategoryChips />
      </Suspense>
      <Suspense fallback={<VehicleSkeletonGrid />}>
        <ListingsWrapper
          filterOptions={filterOptions}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
