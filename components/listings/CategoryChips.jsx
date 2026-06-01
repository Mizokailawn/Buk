"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { VEHICLE_CATEGORIES } from "@/lib/filter/filter-options";
import {
  useEffect,
  useState,
  useTransition,
} from "react";

export default function CategoryChips() {
  const router = useRouter();
  const params = useSearchParams();

  const [isPending, startTransition] =
    useTransition();

  const active =
    params.get("category") || "";

  const [
    optimisticCategory,
    setOptimisticCategory,
  ] = useState(active);

  // Keep local state in sync with URL
  useEffect(() => {
    setOptimisticCategory(active);
  }, [active]);

  function selectCategory(category) {
    const next =
      new URLSearchParams(params);

    const newCategory =
      optimisticCategory === category
        ? ""
        : category;

    setOptimisticCategory(
      newCategory
    );

    if (!newCategory) {
      next.delete("category");
    } else {
      next.set(
        "category",
        newCategory
      );
    }

    startTransition(() => {
      const query = next.toString();
      router.push(query ? `/listings?${query}` : "/listings");
    });
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:py-2">
      {VEHICLE_CATEGORIES.map((category) => (
        <Button
          key={category.value}
          variant={
            optimisticCategory ===
            category.value
              ? "default"
              : "outline"
          }
          disabled={isPending}
          onClick={() =>
            selectCategory(
              category.value
            )
          }
          className="h-6 w-15"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
