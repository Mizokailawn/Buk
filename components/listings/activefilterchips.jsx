"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const FILTER_LABELS = {
  brand: "Brand",
  city: "District",
  fuel: "Fuel",
  transmission: "Transmission",
  minPrice: "Min",
  maxPrice: "Max",
  sort: "Sort",
  category: "Category",
  q: "Search",
};

const listKeys = ["q", "category", "brand", "city", "fuel", "transmission"];
const singleKeys = ["minPrice", "maxPrice", "sort"];

export default function ActiveFilterChips() {
  const params = useSearchParams();
  const router = useRouter();

  const chips = [
    ...listKeys.flatMap((key) =>
      (params.get(key)?.split(",").filter(Boolean) || []).map((value) => ({
        key,
        value,
        label: `${value}`,
      })),
    ),
    ...singleKeys
      .map((key) => {
        const value = params.get(key);

        if (!value || (key === "sort" && value === "newest")) return null;

        return {
          key,
          value,
          label: `${value}`,
        };
      })
      .filter(Boolean),
  ];

  if (!chips.length) return null;

  function removeChip(chip) {
    const next = new URLSearchParams(params);

    if (listKeys.includes(chip.key)) {
      const updated = (
        params.get(chip.key)?.split(",").filter(Boolean) || []
      ).filter((value) => value !== chip.value);

      if (updated.length) {
        next.set(chip.key, updated.join(","));
      } else {
        next.delete(chip.key);
      }
    } else {
      next.delete(chip.key);
    }

    const query = next.toString();
    router.replace(query ? `/listings?${query}` : "/listings");
  }

  function clearAll() {
    const next = new URLSearchParams(params);

    [...listKeys, ...singleKeys].forEach((key) => next.delete(key));

    const query = next.toString();
    router.replace(query ? `/listings?${query}` : "/listings");
  }

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto">
        <div className="grid grid-rows-2 grid-flow-col items-center gap-1">
          {chips.map((chip) => (
            <Button
              key={`${chip.key}-${chip.value}`}
              variant="outline"
              onClick={() => removeChip(chip)}
              className="inline-flex h-7 items-center max-w-40 justify-between gap-1 rounded-full border px-2 text-xs text-muted-foreground"
            >
              {chip.label}
              <X className="h-3 w-3" />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={clearAll}
          className="h-7 rounded-full px-2 text-xs font-medium"
        >
          Clear all
        </Button>
      </div>
    </div>
  );
}
