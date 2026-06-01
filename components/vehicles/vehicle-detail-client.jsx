"use client";

import VehicleDetailData from "./vehicle-detail-data";
import VehicleImageCarousel from "./vehicle-image-carousel";

export default function VehicleDetailClient({ vehicle }) {
  if (!vehicle || vehicle.success === false) {
    return (
      <div className="flex h-full w-full justify-center items-center">
        Error occurred while fetching vehicle details.
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
