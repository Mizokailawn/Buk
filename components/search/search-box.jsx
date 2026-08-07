"use client";

import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SearchBox() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q");

  return (
    <Link
      href="/listings?search=1"
      className="flex items-center w-50 md:w-100 h-10 px-2 rounded-full border-2 text-muted-foreground text-sm"
    >
      <SearchIcon className="size-5 mr-2 shrink-0" />

      <span className="truncate">
        {query || "Search"}
      </span>
    </Link>
  );
}