// app/(public)/vehicle/[id]/page.js

import { Spinner } from "@/components/ui/spinner";
import { VehicleDetailsWrapper } from "@/components/vehicles/vehicle-details-wrapper";
import { Suspense } from "react";

export default function Page({params}) {
  
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
