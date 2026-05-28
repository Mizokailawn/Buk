import SkeletonCard from "@/components/skeletons/vehicle-skeleton-card";
import ListingsGrid from "@/components/listings/listingsgrid";
import ListingsWrapper from "@/components/listings/listingsgridwrapper";
import { getExploreListings } from "@/lib/vehicle/fetchrides/fetchRides";
import { Suspense } from "react";

export default async function ListingsPage() {
  // let listings = []

  // try {
  //     listings = await getExploreListings()
  // } catch (error) {
  //     console.error("Error fetching explore listings: ", error)
  // }

  return (
    <div>
      <Suspense fallback={<SkeletonCard />}>
        <ListingsWrapper />
      </Suspense>
    </div>
    // <ListingsGrid listings={listings} />
  );
}
