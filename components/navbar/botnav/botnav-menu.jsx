"use client";

import React, { Suspense, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/shared/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { BOTTOM_SHEET_ITEMS } from "../nav.config";
import { AuthButton } from "@/components/auth/auth-button";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export default function BotNavMenu() {
  const pathname= usePathname()
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="nav-item flex-1">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="text-muted-foreground">
            <UserCircle size={30}/>
          </Button>
        </SheetTrigger>

        <SheetContent side="right" showCloseButton={false} className="px-5">
          <SheetTitle />

          <div className="w-12 h-1 bg-muted mx-auto mb-4 rounded-full" />

          <div className="flex flex-col gap-4 justify-center">
            <p className="text-lg font-medium text-foreground">BUK</p>
            <Separator />
          </div>

          <div className="flex flex-col text-md justify-center">
            {BOTTOM_SHEET_ITEMS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.label}>
                  <div className="flex flex-col w-full items-center py-3">
                    <Link
                      href={item.href}                      
                      className="flex gap-4 items-center w-full py-2"
                    >
                      <Icon size={20} />
                      {item.label}
                    </Link>
                  </div>

                  {index < BOTTOM_SHEET_ITEMS.length - 1 && (
                    <Separator className="my-1 bg-muted-foreground/20" />
                  )}
                </div>
              );
            })}
          </div>

          <SheetFooter>
            <div className="flex gap-4 items-center justify-evenly pr-10">
              <ModeToggle />

              <Suspense>
                <AuthButton
                  onNavigate={() => setOpen(false)}
                />
              </Suspense>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}