// components/listings/search-overlay.jsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { XIcon } from "lucide-react";

export default function SearchOverlay({open}) {
  const [query, setQuery] = useState("");
  const searchparams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef(null);

  const isOpen = searchparams.get("search") === "1" || open;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const onSearch = () => {
    if (!query.trim()) return;

    const params = new URLSearchParams(searchparams);
    params.delete("search");
    params.set("q", query );

    router.replace(`/listings?${params.toString()}`, { scroll: false });
  };

  const reset = () => {
    setQuery("");
  }

  const onClose = () => {
    const params = new URLSearchParams(searchparams);
    params.delete("search");
    const queryString = params.toString();
    router.replace(queryString ? `/listings?${queryString}` : "/listings", {
      scroll: false,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="relative pt-6 pb-4 border-b px-3 flex gap-2">
        <Button variant="outline" onClick={onClose} className="rounded-full">
          <ChevronLeft className="w-5 h-5" />
          </Button>
        <SearchIcon className="absolute left-18 top-10/18 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
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
          className="flex-1 rounded-full pl-10 py-2 bg-background border-2"
        ></Input>
        {query.length > 0 && (
          <Button variant="ghost" onClick={reset} className="absolute right-3 top-10/18 transform -translate-y-1/2">
            <XIcon size="sm" />
            </Button>
        )}
        
      </div>
    </div>
  );
}
