"use client";

import { Button } from "@/components/ui/button";
import { MORE_ITEMS } from "@/components/navbar/nav.config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";


export default function MobileTopNav() {
    const router = useRouter()
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between h-12 px-3 border backdrop-blur-xs rounded-full mt-2 mx-2">
      {/* Left: Back */}
      <Button variant="outline" size="icon"className="rounded-full" onClick={() => router.back()}>
        <ArrowLeft className="h-3 w-3" />
      </Button>

      {/* Center: Logo or Title */}
      <div className="font-semibold text-sm">
        <Link href="/">BUK</Link>
      </div>

      {/* Right: Dropdown */}
      <DropdownMenu>
        {/* Trigger */}
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>

        {/* Content */}
        <DropdownMenuContent align="end" className="w-48">
          {MORE_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 w-full"
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
