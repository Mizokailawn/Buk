"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useState } from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function FilterSheet({
  open,
  setOpen,
  brands,
  cities,
}) {
  const router = useRouter();

  const params = useSearchParams();

  const [selectedBrands, setBrands] =
    useState(
      params.get("brand")?.split(",") ||
        []
    );

  const [selectedCities, setCities] =
    useState(
      params.get("city")?.split(",") ||
        []
    );

  const [minPrice, setMinPrice] =
    useState(
      params.get("minPrice") || ""
    );

  const [maxPrice, setMaxPrice] =
    useState(
      params.get("maxPrice") || ""
    );

  const applyFilters = () => {
    const next =
      new URLSearchParams(params);

    if (selectedBrands.length) {
      next.set(
        "brand",
        selectedBrands.join(",")
      );
    } else {
      next.delete("brand");
    }

    if (selectedCities.length) {
      next.set(
        "city",
        selectedCities.join(",")
      );
    } else {
      next.delete("city");
    }

    if (minPrice) {
      next.set(
        "minPrice",
        minPrice
      );
    } else {
      next.delete("minPrice");
    }

    if (maxPrice) {
      next.set(
        "maxPrice",
        maxPrice
      );
    } else {
      next.delete("maxPrice");
    }

    router.replace(
      `/listings?${next.toString()}`
    );

    setOpen(false);
  };

  function clearFilters() {
    router.replace("/listings");

    setOpen(false);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>
            Filters
          </SheetTitle>
        </SheetHeader>

        {/* SORT */}

        {/* PRICE */}

        <div className="space-y-2 mt-4">
          <label>Min Price</label>

          <input
            value={minPrice}
            onChange={(e) =>
              setMinPrice(
                e.target.value
              )
            }
            type="number"
          />

          <label>Max Price</label>

          <input
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(
                e.target.value
              )
            }
            type="number"
          />
        </div>

        {/* BRAND */}

        <div className="mt-6">
          <h3 className="font-medium">
            Brand
          </h3>

          {brands.map((brand) => (
            <label
              key={brand}
              className="flex gap-2"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(
                  brand
                )}
                onChange={(e) => {
                  if (
                    e.target.checked
                  ) {
                    setBrands([
                      ...selectedBrands,
                      brand,
                    ]);
                  } else {
                    setBrands(
                      selectedBrands.filter(
                        (b) =>
                          b !== brand
                      )
                    );
                  }
                }}
              />

              {brand}
            </label>
          ))}
        </div>

        {/* CITY */}

        <div className="mt-6">
          <h3 className="font-medium">
            City
          </h3>

          {cities.map((city) => (
            <label
              key={city}
              className="flex gap-2"
            >
              <input
                type="checkbox"
                checked={selectedCities.includes(
                  city
                )}
                onChange={(e) => {
                  if (
                    e.target.checked
                  ) {
                    setCities([
                      ...selectedCities,
                      city,
                    ]);
                  } else {
                    setCities(
                      selectedCities.filter(
                        (c) =>
                          c !== city
                      )
                    );
                  }
                }}
              />

              {city}
            </label>
          ))}
        </div>

        <div className="sticky bottom-0 flex gap-2 mt-8">
          <button
            onClick={clearFilters}
          >
            Clear
          </button>

          <button
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}