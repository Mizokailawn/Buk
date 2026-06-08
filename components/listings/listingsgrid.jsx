"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import VehicleCard from "../vehicles/car-card";
import VehicleSkeletonCard from "../skeletons/vehicle-skeleton-grid";
import { Spinner } from "../ui/spinner";

const PAGE_SIZE = 12;

export default function ListingsGrid() {
  const searchParams = useSearchParams();
  const sentinelRef = useRef(null);
  const filterKey = searchParams.toString();

  const queryUrl = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", String(PAGE_SIZE));

    return params;
  }, [searchParams]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["vehicles", "infinite-list", filterKey],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams(queryUrl);
      params.set("cursor", String(pageParam));

      const response = await fetch(`/api/vehicles?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Could not load vehicles.");
      }

      return response.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  useEffect(() => {
    const target = sentinelRef.current;

    if (!target || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const vehicles = data?.pages.flatMap((page) => page.data) || [];

  if (isLoading) {
    return <VehicleSkeletonCard />;
  }

  if (isError) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-2 text-center">
        <p className="text-sm text-muted-foreground">
          {error.message || "Something went wrong while loading vehicles."}
        </p>
      </div>
    );
  }

  if (!vehicles.length) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center">
        <p className="text-sm italic text-muted-foreground">
          Sorry! No vehicles found.
        </p>
        <p className="text-sm italic text-muted-foreground">
          Please check your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-7 w-full">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      <div ref={sentinelRef} className="flex h-14 items-center justify-center">
        {isFetchingNextPage && <Spinner className="h-6 w-6" />}
        {!hasNextPage && (
          <p className="text-xs text-muted-foreground">
            You have reached the end.
          </p>
        )}
      </div>
    </div>
  );
}
