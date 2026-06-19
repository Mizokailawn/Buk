// components/search/search-box.jsx

"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default function SearchBox() {
  return (
    <Link
      href="/listings?search=1"
      className="flex items-center w-50 h-10 px-2 rounded-full border-2 text-muted-foreground text-sm"
    >
      <SearchIcon className="size-5 mr-2" />
      Search
    </Link>
  );
}
