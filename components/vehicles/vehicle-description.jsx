"use client"

import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function VehicleDescription({description}) {
    const [expanded, setExpanded] = useState(false)

    const descriptionTooLong = description?.length > 180;

    return (
        <div className="rounded-xl border bg-card p-3 shadow-sm">
        <h3 className="text-lg font-semibold">Description</h3>

        <div
          className={`mt-3 text-sm leading-7 text-muted-foreground transition-all ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {description}
        </div>

        {descriptionTooLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            {expanded ? (
              <>
                Show less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Read more
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>
    )
}