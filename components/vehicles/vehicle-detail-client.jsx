//components/vehicles/vehicle-detail-client.jsx

"use client";

import { useVehicle } from "@/hooks/vehicles/use-vehicles";
import { Spinner } from "../ui/spinner";
import VehicleDetailData from "./vehicle-detail-data";
import VehicleImageCarousel from "./vehicle-image-carousel";

export default function VehicleDetailClient({ id }) {
  /*
    Instantly uses hydrated cache
  */
  const { data: vehicle, isError, error } = useVehicle(id);

  if (isError) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        Error occurred while fetching vehicle details.
        {error.message}
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 h-full w-full justify-center items-center">
      <div>
        <VehicleImageCarousel vehicle={vehicle} />
      </div>
      <div>
        <VehicleDetailData vehicle={vehicle} />
      </div>
    </div>
  );
}
