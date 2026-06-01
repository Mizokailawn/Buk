"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const FILTER_LABELS = {
  brand: "Brand",
  city: "District",
  fuel: "Fuel",
  transmission: "Transmission",
  minPrice: "Min",
  maxPrice: "Max",
  sort: "Sort",
};

const listKeys = ["brand", "city", "fuel", "transmission"];
const singleKeys = ["minPrice", "maxPrice", "sort"];

export default function ActiveFilterChips() {
  const params = useSearchParams();
  const router = useRouter();

  const chips = [
    ...listKeys.flatMap((key) =>
      (params.get(key)?.split(",").filter(Boolean) || []).map((value) => ({
        key,
        value,
        label: `${FILTER_LABELS[key]}: ${value}`,
      })),
    ),
    ...singleKeys
      .map((key) => {
        const value = params.get(key);

        if (!value || (key === "sort" && value === "newest")) return null;

        return {
          key,
          value,
          label: `${FILTER_LABELS[key]}: ${value}`,
        };
      })
      .filter(Boolean),
  ];

  if (!chips.length) return null;

  function removeChip(chip) {
    const next = new URLSearchParams(params);

    if (listKeys.includes(chip.key)) {
      const updated = (params.get(chip.key)?.split(",").filter(Boolean) || [])
        .filter((value) => value !== chip.value);

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
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={`${chip.key}-${chip.value}`}
          onClick={() => removeChip(chip)}
          className="inline-flex h-7 items-center gap-1 rounded-full border px-2 text-xs text-muted-foreground"
        >
          {chip.label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <button
        onClick={clearAll}
        className="h-7 rounded-full px-2 text-xs font-medium text-primary"
      >
        Clear all
      </button>
    </div>
  );
}
