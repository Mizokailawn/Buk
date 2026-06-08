"use client"

import { BookmarkIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
import { Home } from "lucide-react"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle home" size="sm" variant="outline">
      <Home className="h-4 w-4 transition-colors text-foreground fill-none group-data-[state=on]/toggle:fill-foreground group-data-[state=on]/toggle:text-purple-500" />
      Bookmark
    </Toggle>
  )
}
