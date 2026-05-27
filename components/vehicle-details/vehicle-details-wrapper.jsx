// app/(main)/vehicle/[id]/page.jsx

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/tanstack/get-query-client";
import { queryKeys } from "@/lib/tanstack/query-keys";
import VehicleDetailClient from "@/components/vehicles/vehicle-detail-client";
import { GetPublicVehicleById } from "@/lib/fetchrides/publicfetch";

export async function VehicleDetailsWrapper({params}) {
  const { id } = await params
  const queryClient = getQueryClient();

  /*
    Server-side prefetch
  */
  await queryClient.prefetchQuery({
    queryKey: queryKeys.vehicles.detail(id),

    queryFn: () => GetPublicVehicleById(id),
  });

  return (
    /*
      Transfer cache to browser
    */
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VehicleDetailClient id={id} />
    </HydrationBoundary>
  );
}
