"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import FilterSheet from "./FilterSheet";

export default function FloatingFilterButton(
  props
) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-6
          right-4
          z-50
          rounded-full
          shadow-lg
          px-4
          py-3
          bg-primary
          text-white
          flex
          items-center
          gap-2
        "
      >
        <SlidersHorizontal size={18} />
        Filters
      </button>

      <FilterSheet
        open={open}
        setOpen={setOpen}
        {...props}
      />
    </>
  );
}