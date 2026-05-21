"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

function VehicleCard({ vehicles }) {
  return (
    <Link href={`/vehicle/${vehicles.id}`} className="block">
      <Card className="overflow-hidden aspect-square rounded-2xl bg-card shadow-sm hover:shadow-md transition-all cursor-pointer gap-1 pt-0 pb-2">
        {/* IMAGE */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={vehicles.thumbnail_url || "/placeholder-car.jpg"}
            alt={vehicles.model}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 400px) 100vw, 33vw"
          />
        </div>

        <CardContent className="flex flex-col px-1 space-y-1">
          <div className="flex">
            {/* BRAND */}
            <h3 className="font-medium text-xs line-clamp-1 text-card-foreground px-1 capitalize">
              {vehicles.brand}
            </h3>
            {/* MODEL */}
            <h3 className="font-medium text-xs line-clamp-1 text-card-foreground px-1 capitalize">
              {vehicles.model}
            </h3>
          </div>
          <div className="flex justify-between items-center px-1">
            {/* PRICE */}
            <p className="text-sm font-semibold text-purple-400">
              ₹{Number(vehicles.price).toLocaleString("en-IN")}
            </p>

            {/* CITY */}
            <p className="flex text-xs text-muted-foreground gap-0.5 items-center capitalize">
              <MapPin className="h-3 w-3" />
              {vehicles.city}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default VehicleCard;
