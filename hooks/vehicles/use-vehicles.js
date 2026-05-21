// lib/hooks/vehicles/use-vehicle.js

"use client";

import { useQuery } from "@tanstack/react-query";

import { getVehicleById } from "@/lib/queries/vehicles/get-vehicle-by-id";

import { queryKeys } from "@/lib/tanstack/query-keys";

export function useVehicle(id) {
  return useQuery({
    queryKey: queryKeys.vehicles.detail(id),

    queryFn: () => getVehicleById(id),

    enabled: !!id,
  });
}