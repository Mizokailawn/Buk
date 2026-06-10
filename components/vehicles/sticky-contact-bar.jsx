"use client";

import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

const BOTTOM_NAV_HEIGHT = 50;

export default function StickyContactBar({
  vehicle,
}) {
  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{
        bottom: `${BOTTOM_NAV_HEIGHT}px`,
      }}
    >
      <div className="mx-auto w-full max-w-3xl px-2 backdrop-blur-xs">
        <div className="flex items-center gap-3 rounded-xl border bg-background/80 px-2 py-1 shadow-xl backdrop-blur-xl">
          {/* Model */}
          <div className="min-w-fit px-2">
            <p className="text-xs text-muted-foreground capitalize">
              {vehicle?.model}
            </p>

            <h3 className="text-sm font-bold tracking-tight">
              ₹
              {new Intl.NumberFormat("en-IN").format(
                vehicle?.price || 0
              )}
            </h3>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-1 items-center gap-2">
            <Link
              href={`tel:${vehicle?.phone}`}
              className="flex h-10 flex-1 items-center justify-center border gap-2 rounded-lg bg-card px-2 font-medium text-foreground transition active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" />
              Phone
            </Link>

            <Link
              href={`https://wa.me/91${vehicle?.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-green-600/85 px-2 font-medium text-foreground transition active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}