import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthButton } from "@/components/auth/auth-button";
import { ModeToggle } from "@/components/shared/theme-toggle";
import { UserCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Timer } from "lucide-react";
import { Star } from "lucide-react";

export default function BotNavMenu() {
  return (
    <div className="nav-item flex-1">
      <Sheet>
        <SheetTrigger>
          <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent side="right" showCloseButton={false} className="px-3">
          <SheetTitle></SheetTitle>
          {/* Drag handle */}
          <div className="w-12 h-1 bg-muted mx-auto mb-4 rounded-full" />

          {/* Account */}
          <div className="flex flex-col gap-4 justify-center">
            <p className="text-md font-medium text-muted-foreground items-center justify-center">
              Account
            </p>
            <Separator />
            <div className="flex gap-2">
              <SheetClose asChild>
                <Link href="/profile" className="flex items-center gap-3">
                  <UserCircle size={20} />
                  <span>My Profile</span>
                </Link>
              </SheetClose>
            </div>
            <div className="flex gap-2">
              <SheetClose asChild>
                <Link href="/recent" className="flex items-center gap-3">
                  <Timer size={20} />
                  <span>Recently Viewed</span>
                </Link>
              </SheetClose>
            </div>
            <div className="flex gap-2">
              <SheetClose>
                <Link href="/favourites" className="flex items-center gap-3">
                  <Star size={20} />
                  <span>Favourites</span>
                </Link>
              </SheetClose>
            </div>
          </div>

          {/* Activity */}
          <div className="mt-6 space-y-4">
            <p className="text-sm font-medium text-muted-foreground">
              Activity
            </p>
            <div className="space-y-2">
              <p>Recently Viewed</p>
            </div>
          </div>

          {/* Settings */}
          <div className="mt-6 space-y-4">
            <p className="text-sm font-medium text-muted-foreground">
              Settings
            </p>
            <div className="space-y-2">
              <p>Help</p>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <div className="flex gap-4 items-center justify-start">
                <ModeToggle />
                <AuthButton />
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
