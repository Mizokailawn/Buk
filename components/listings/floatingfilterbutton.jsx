"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import FilterSheet from "./filtersheet";
import { Button } from "../ui/button";

export default function FloatingFilterButton({ filterOptions }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-16
          right-4
          z-50
          rounded-full
          shadow-lg
        "
      >
        <SlidersHorizontal size={18} />
        Filters
      </Button>

      <FilterSheet
        open={open}
        setOpen={setOpen}
        filterOptions={filterOptions}
      />
    </>
  );
}
