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
          h-10 w-10
          bottom-14
          right-4
          z-40
          rounded-full
          shadow-lg
        "
      >
        <SlidersHorizontal size={18} />        
      </Button>

      <FilterSheet
        open={open}
        setOpen={setOpen}
        filterOptions={filterOptions}
      />
    </>
  );
}
