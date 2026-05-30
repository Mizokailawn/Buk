"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { label: "Bikes", value: "bike" },
  { label: "Scooty", value: "scooty" },
  { label: "Cars", value: "car" },
  { label: "Suv", value: "suv" },
  { label: "Pickup", value: "pickup" },
  { label: "Truck", value: "truck" },
  { label: "Van", value: "van" }, 
];

export default function CategoryChips() {
  const router = useRouter();
  const params = useSearchParams();

  const active =
    params.get("category") || "";

  function selectCategory(category) {
    const next =
      new URLSearchParams(params);

    next.set("category", category);

    router.push(
      `/listings?${next.toString()}`
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() =>
            selectCategory(category.value)
          }
          className={`rounded-full px-4 py-2 border ${
            active === category.value
              ? "bg-card text-foreground"
              : ""
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}