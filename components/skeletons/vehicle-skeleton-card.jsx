import React from "react";
import CardSkeleton from "./card-skeleton";

export default function VehicleSkeletonCard() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full px-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
