"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import EditButton from "./edit-button";
import VehicleStatusToggle from "./vehicle-status-toggle";
import DeleteVehicleButton from "./delete-vehicle-button";

function UserVehicleCard({ vehicle }) {
  return (
    <Card className="flex flex-col overflow-hidden aspect-square rounded-2xl bg-card shadow-sm hover:shadow-md transition-all cursor-pointer gap-2 pt-0 pb-2">
      {/* IMAGE */}
      <div className="relative w-full h-full overflow-hidden">
        <Link href={`/vehicle/${vehicle?.id}`} className="block">
          <Image
            src={vehicle?.thumbnail_url || "/placeholder-car.jpg"}
            alt={vehicle?.model}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 400px) 100vw, 33vw"
          />          
        </Link>
      </div>

      <Link href={`/vehicle/${vehicle?.id}`} className="block">
        <CardContent className="flex flex-col px-1 space-y-1">
          <div className="flex">
            {/* BRAND */}
            <h3 className="font-medium text-sm line-clamp-1 text-card-foreground px-1 capitalize">
              {vehicle?.brand}
            </h3>
            {/* MODEL */}
            <h3 className="font-medium text-sm line-clamp-1 text-card-foreground px-1 capitalize">
              {vehicle?.model}
            </h3>
          </div>
          <div className="flex justify-between items-center px-1">
            {/* PRICE */}
            <p className="text-xl font-semibold text-purple-500">
              ₹{Number(vehicle?.price).toLocaleString("en-IN")}
            </p>

            {/* CITY */}
            <p className="flex text-xs text-muted-foreground gap-0.5 items-center capitalize">
              <MapPin className="h-3 w-3" />
              {vehicle?.city}
            </p>
          </div>
        </CardContent>
      </Link>
      <div className="grid grid-cols-3 gap-2 p-2">
        <EditButton vehicleId={vehicle?.id} className="col-span-2"/>
        <DeleteVehicleButton veicleId={vehicle?.id}/>
        <VehicleStatusToggle
          vehicleId={vehicle?.id}
          initialStatus={vehicle?.status}
        />
      </div>
    </Card>
  );
}

export default UserVehicleCard;
