"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import {
  useEffect,
  useState,
  useTransition,
} from "react";

const categories = [
  { label: "Bikes", value: "bike" },
  { label: "Scooty", value: "scooty" },
  { label: "Cars", value: "car" },
  { label: "SUV", value: "suv" },
  { label: "Pickup", value: "pickup" },
  { label: "Truck", value: "truck" },
  { label: "Van", value: "van" },
];

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
      router.push(
        `/listings?${next.toString()}`
      );
    });
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:py-2">
      {categories.map((category) => (
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