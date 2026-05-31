import ListingsGrid from "./listingsgrid";
import CategoryChips from "./CategoryChips";
import { Suspense } from "react";
import VehicleSkeletonCard from "../skeletons/vehicle-skeleton-card";

export default async function ListingsWrapper({ searchParams }) {
  return (
    <div className="space-y-3">
      <Suspense>
        <CategoryChips />
      </Suspense>      
      <Suspense fallback={<VehicleSkeletonCard />}>
        <ListingsGrid searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
