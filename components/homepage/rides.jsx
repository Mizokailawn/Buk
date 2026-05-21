import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import VehicleCard from "../cars/car-card";
import Link from "next/link";

const Rides = ({ vehicles }) => {
  return (
    <div className="flex flex-col gap-2 w-full pt-2 items-center px-2">
      <div className="flex justify-between items-center px-2 w-full">
        <h1 className="text-lg md:text-2xl font-medium">Rides</h1>
        <Link href="/listings">
          <Button
            variant="link"
            className="relative gap-1 justify-between items-center px-2 rounded-full text-xs"
          >
            View all
            <ArrowRight className="h-2 w-2" />
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full px-2">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicles={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default Rides;
