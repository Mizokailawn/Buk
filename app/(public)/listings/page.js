import SkeletonCard from "@/components/skeletons/vehicle-skeleton-card";
import ListingsWrapper from "@/components/listings/listingsgridwrapper";
import { Suspense } from "react";

export default async function ListingsPage({searchParams}) {
  
  return (
    <div>
      <Suspense fallback={<SkeletonCard />}>
        <ListingsWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
