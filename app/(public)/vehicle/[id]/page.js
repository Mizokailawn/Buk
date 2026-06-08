// app/(public)/vehicle/[id]/page.js

import { Spinner } from "@/components/ui/spinner";
import { VehicleDetailsWrapper } from "@/components/vehicles/vehicle-details-wrapper";
import { Suspense } from "react";

export default function Page({ params }) {
  return (
    <div className="py-17 min-h-svh">
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
