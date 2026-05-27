import React from "react";
import VehicleCard from "../vehicles/car-card";
import VehicleCardSkeleton from "./vehicle-card-skeleton";

export default function SkeletonCard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full px-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <VehicleCardSkeleton key={index} />
      ))}
    </div>
  );
}
