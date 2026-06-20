// app/(public)/vehicle/[id]/page.js

import VehicleDetailTracker from "@/components/pwa/vehicle-details-tracker";
import { Spinner } from "@/components/ui/spinner";
import { VehicleDetailsWrapper } from "@/components/vehicles/vehicle-details-wrapper";
import { Suspense } from "react";

export default function Page({ params }) {
  return (
    <div className="flex justify-center py-17 min-h-svh max-w-xs max-w-6xl mx-auto">
      <VehicleDetailTracker />
      <Suspense fallback={
          <div className="flex min-h-svh justify-center items-center w-full mx-auto my-auto">
            <Spinner className="h-10 w-10" />
          </div>
        }
      >
        <VehicleDetailsWrapper params={params} />
      </Suspense>
    </div>
  );
}
