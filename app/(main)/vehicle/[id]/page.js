// app/(main)/vehicle/[id]/page.jsx

import { Spinner } from "@/components/ui/spinner";
import { VehicleDetailsWrapper } from "@/components/vehicle-details/vehicle-details-wrapper";
import { Suspense } from "react";

// import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
// import { getQueryClient } from "@/lib/tanstack/get-query-client";
// import { queryKeys } from "@/lib/tanstack/query-keys";
// import VehicleDetailClient from "@/components/vehicles/vehicle-detail-client";
// import { GetPublicVehicleById } from "@/lib/fetchrides/publicfetch";

export default function Page({params}) {
  // const { id } = await params;
  // const queryClient = getQueryClient();

  // /*
  //   Server-side prefetch
  // */
  // await queryClient.prefetchQuery({
  //   queryKey: queryKeys.vehicles.detail(id),

  //   queryFn: () => GetPublicVehicleById(id),
  // });

  // return (
  //   /*
  //     Transfer cache to browser
  //   */
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <VehicleDetailClient id={id} />
  //   </HydrationBoundary>
  // );
  return (
    <div>
      <Suspense fallback={<div>
        <Spinner size="sm" />
      </div>}>
        <VehicleDetailsWrapper params={params} />
      </Suspense>
    </div>
  );
}
