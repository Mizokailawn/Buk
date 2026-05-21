// app/(main)/vehicle/[id]/page.jsx

import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getQueryClient } from "@/lib/tanstack/get-query-client";
import { queryKeys } from "@/lib/tanstack/query-keys";
import { getVehicleById } from "@/lib/queries/vehicles/get-vehicle-by-id";
import VehicleDetailClient from "@/components/cars/vehicle-detail-client";

export default async function Page({ params }) {
    const {id} = await params;
  const queryClient = getQueryClient();    

  /*
    Server-side prefetch
  */
  await queryClient.prefetchQuery({
    queryKey: queryKeys.vehicles.detail(
      id
    ),

    queryFn: () =>
      getVehicleById(id),
  });

  return (
    /*
      Transfer cache to browser
    */
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <VehicleDetailClient id={id} />
    </HydrationBoundary>
  );
}

