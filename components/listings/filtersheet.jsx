"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useListingsLoading } from "./listings-loading-context";

const arrayFromParams = (params, key) =>
  params.get(key)?.split(",").filter(Boolean) || [];

export default function FilterSheet({ open, setOpen, filterOptions }) {
  const params = useSearchParams();
  const currentFilters = useMemo(
    () => ({
      brand: arrayFromParams(params, "brand"),
      city: arrayFromParams(params, "city"),
      fuel: arrayFromParams(params, "fuel"),
      transmission: arrayFromParams(params, "transmission"),
      minPrice: params.get("minPrice") || "",
      maxPrice: params.get("maxPrice") || "",
      sort: params.get("sort") || "newest",
    }),
    [params],
  );

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      className="max-h-[85vh] rounded-t-3xl mx-3 w-[calc(100%-1rem)] bg-background"
    >
      <SheetContent
        side="bottom"
        className="max-h-[85vh] rounded-t-lg bg-background"
      >
        <SheetHeader className="px-4 py-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        {open && (
          <FilterSheetForm
            currentFilters={currentFilters}
            filterOptions={filterOptions}
            params={params}
            setOpen={setOpen}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

function FilterSheetForm({ currentFilters, filterOptions, params, setOpen }) {
  const filterSections = [
    {
      key: "brand",
      title: "Brand",
      values: filterOptions.brands,
    },
    {
      key: "city",
      title: "District",
      values: filterOptions.cities,
    },
    {
      key: "fuel",
      title: "Fuel",
      values: filterOptions.fuel,
    },
    {
      key: "transmission",
      title: "Transmission",
      values: filterOptions.transmission,
    },
  ];

  const router = useRouter();
  const [draft, setDraft] = useState(currentFilters);
  const { startListingsChange } = useListingsLoading();

  const toggleArrayValue = (key, value) => {
    setDraft((previous) => {
      const selected = previous[key];
      const nextSelected = selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value];

      return {
        ...previous,
        [key]: nextSelected,
      };
    });
  };

  const setTextValue = (key, value) => {
    setDraft((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    const next = new URLSearchParams(params);

    ["brand", "city", "fuel", "transmission"].forEach((key) => {
      if (draft[key].length) {
        next.set(key, draft[key].join(","));
      } else {
        next.delete(key);
      }
    });

    ["minPrice", "maxPrice"].forEach((key) => {
      if (draft[key]) {
        next.set(key, draft[key]);
      } else {
        next.delete(key);
      }
    });

    if (draft.sort && draft.sort !== "newest") {
      next.set("sort", draft.sort);
    } else {
      next.delete("sort");
    }

    const query = next.toString();
    startListingsChange(next);
    router.replace(query ? `/listings?${query}` : "/listings");
    setOpen(false);
  };

  const clearFilters = () => {
    const next = new URLSearchParams(params);

    [
      "brand",
      "city",
      "fuel",
      "transmission",
      "minPrice",
      "maxPrice",
      "sort",
    ].forEach((key) => next.delete(key));

    const query = next.toString();
    startListingsChange(next);
    router.replace(query ? `/listings?${query}` : "/listings");
    setOpen(false);
  };

  return (
    <>
      <div className="space-y-5 overflow-y-auto px-4 pb-4">
        <section className="space-y-2">
          <h3 className="text-sm font-medium">Sort</h3>
          <Select
            value={draft.sort}
            onValueChange={(value) => setTextValue("sort", value)}
          >
            <SelectTrigger className="w-full rounded-md">
              <SelectValue placeholder="Sort listings" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.sort.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="minPrice">
              Min Price
            </label>
            <Input
              id="minPrice"
              type="number"
              inputMode="numeric"
              value={draft.minPrice}
              onChange={(event) => setTextValue("minPrice", event.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="maxPrice">
              Max Price
            </label>
            <Input
              id="maxPrice"
              type="number"
              inputMode="numeric"
              value={draft.maxPrice}
              onChange={(event) => setTextValue("maxPrice", event.target.value)}
              placeholder="Any"
            />
          </div>
        </section>

        <Accordion type="multiple" className="w-full">
          {filterSections.map((section) => (
            <AccordionItem
              key={section.key}
              value={section.key}
              className="items-center"
            >
              <AccordionTrigger className="flex gap-2 items-center">
                <div className="flex justify-center items-center h-6">
                  {section.title}
                </div>
                {draft[section.key].length > 0 && (
                <div className="flex h-6 w-6 items-center justify-center text-sm border text-muted-foreground rounded-full">
                    {draft[section.key].length}
                </div>
                )}
              </AccordionTrigger>

              <AccordionContent>
                <FilterGroup
                  values={section.values}
                  selected={draft[section.key]}
                  onToggle={(value) => toggleArrayValue(section.key, value)}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>        
      </div>

      <SheetFooter className="grid grid-cols-2 gap-2 border-t p-4">
        <Button variant="outline" onClick={clearFilters}>
          Clear
        </Button>
        <Button onClick={applyFilters}>Apply</Button>
      </SheetFooter>
    </>
  );
}

function FilterGroup({ title, values, selected, onToggle }) {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="grid grid-cols-2 gap-3">
        {values.map((value) => (
          <label
            key={value}
            className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
          >
            <Checkbox
              checked={selected.includes(value)}
              onCheckedChange={() => onToggle(value)}
            />
            <span className="line-clamp-1 capitalize">{value}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
