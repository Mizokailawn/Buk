// components/listings/search-overlay.jsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, ChevronLeft, XIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "../search/search-provider";
import { useListingsLoading } from "./listings-loading-context";


export default function SearchOverlay() {
  const searchParams = useSearchParams();
  const { open, setOpen } = useSearch();
  const isOpen = open || searchParams.get("search") === "1";

  if (!isOpen) return null;

  return (
    <SearchOverlayContent
      currentQuery={searchParams.get("q") ?? ""}
      searchParams={searchParams}
      setOpen={setOpen}
    />
  );
}

function SearchOverlayContent({ currentQuery, searchParams, setOpen }) {
  const [query, setQuery] = useState(currentQuery);
  const router = useRouter();
  const inputRef = useRef(null);
  const { startListingsNavigation } = useListingsLoading();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSearch = () => {
    const value = query.trim();

    if (!value) return;

    const params = new URLSearchParams(searchParams);

    params.delete("search");
    params.set("q", value);

    setOpen(false);
    startListingsNavigation(params);

    router.push(`/listings?${params.toString()}`, {
      scroll: false,
    });
  };

  const onClose = () => {
    const params = new URLSearchParams(searchParams);

    params.delete("search");

    const queryString = params.toString();

    setQuery("");
    setOpen(false);
    router.replace(queryString ? `/listings?${params.toString()}` : "/listings", {
      scroll: false,
    });
  };

  const reset = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="relative pt-6 pb-4 border-b px-3 flex justify-center max-w-4xl mx-auto gap-2">
        <Button
          variant="outline"
          onClick={onClose}
          className="rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <SearchIcon className="absolute left-18 top-10/18 -translate-y-1/2 w-5 h-5 text-muted-foreground" />

        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          placeholder="Search vehicles..."
          className="flex-1 rounded-full pl-10 py-2 border-2"
        />

        {query.length > 0 && (
          <Button
            variant="ghost"
            onClick={reset}
            className="absolute right-3 top-10/18 -translate-y-1/2"
          >
            <XIcon className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex justify-center items-center h-100 italic text-muted-foreground text-sm max-w-4xl mx-auto">
        <p>Search for Cars, Bikes, SUVs etc.</p>
      </div>
    </div>
  );
}
