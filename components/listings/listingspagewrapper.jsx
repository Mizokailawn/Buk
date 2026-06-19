import { Suspense } from "react";
import ListingsQueryProvider from "./listings-query-provider";
import VehicleSkeletonGrid from "../skeletons/vehicle-skeleton-grid";
import { parseFilters } from "@/lib/filter/parse-filter";
import ListingsGridWrapper from "./listingsgirdwrapper";
import { GetFilteredVehiclePage } from "@/lib/queries/vehicles/get-vehicle";

export default async function ListingsWrapper({ searchParams }) {
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
