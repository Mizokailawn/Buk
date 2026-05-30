"use client";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function ActiveFilterChips() {
  const params = useSearchParams();
  const router = useRouter();

  const brands =
    params.get("brand")?.split(",") ||
    [];

  function removeBrand(brand) {
    const next =
      new URLSearchParams(params);

    const updated = brands.filter(
      (b) => b !== brand
    );

    if (updated.length) {
      next.set(
        "brand",
        updated.join(",")
      );
    } else {
      next.delete("brand");
    }

    router.replace(
      `/listings?${next.toString()}`
    );
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() =>
            removeBrand(brand)
          }
        >
          {brand} ✕
        </button>
      ))}
    </div>
  );
}