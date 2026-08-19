"use client";

import { Phone } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import Link from "next/link";
import { Badge } from "../ui/badge";

const BOTTOM_NAV_HEIGHT = 60;

export default function StickyContactBar({
  vehicle,
}) {
  const WhatsappUrl = `https://wa.me/91${vehicle?.whatsapp}?text=Hello,%20BUK%20a%20I%20motor%20zawrh%20chungchangah%20khan%20ka%20lo%20be%20lawk%20che...`;
  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{
        bottom: `${BOTTOM_NAV_HEIGHT}px`,
      }}
    >
      <div className="mx-auto w-full max-w-md px-2 backdrop-blur-xs">
        <div className="flex items-center justify-evenly gap-3 rounded-xl border bg-background/80 px-2 py-1 shadow-xl backdrop-blur-xl">
          {/* Model */}
          <div className="min-w-0 flex-[1.1] px-2">
            <p className="text-xs text-muted-foreground capitalize">
              {vehicle?.brand} {vehicle?.model}
            </p>
            <h3 className="text-md text-purple-500 font-bold tracking-tight">
              ₹
              {new Intl.NumberFormat("en-IN").format(
                vehicle?.price || 0
              )}
            </h3>
          </div>
          <div className="flex flex-1 items-center w-full">
            <Badge className="text-background capitalize" >{vehicle?.seller}
            </Badge>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-1 items-center gap-2">
            <Link
              href={`tel:${vehicle?.phone}`}
              className="flex h-10 flex-1 items-center justify-center border gap-2 rounded-full bg-card hover:bg-purple-500 px-2 font-medium text-foreground transition active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" />
              Call 
            </Link>

            <Link
              href={WhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 px-2 font-medium text-foreground transition active:scale-[0.98]"
            >
              <SiWhatsapp className="h-5 w-5" />
              WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}