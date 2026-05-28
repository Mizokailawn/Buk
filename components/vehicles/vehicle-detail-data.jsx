"use client";

import { useState } from "react";
import {
  Fuel,
  Gauge,
  BadgeCheck,
  CircleDot,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import StickyContactBar from "./sticky-contact-bar";

export default function VehicleDetailsSection({ vehicle }) {
  const [expanded, setExpanded] = useState(false);

  const formatPrice = (price) => {
    if (!price) return "₹0";

    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffMs = now - date;

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    if (hours < 24) {
      return `${hours} hr ago`;
    }

    if (days < 7) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const descriptionTooLong = vehicle?.description?.length > 180;

  return (
    <section className="flex flex-col px-2 pb-16 pt-3 space-y-6 w-screen">
      {/* HERO SECTION */}
      <div className="rounded-xl border bg-gradient-to-b from-background to-muted/30 p-3 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-purple-500">
              ₹{formatPrice(vehicle?.price)}
            </h1>

            <h2 className="mt-2 text-xl font-semibold capitalize">
              {vehicle?.brand} {vehicle?.model}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>{vehicle?.fuel}</span>

              <span>•</span>

              <span>{vehicle?.transmission}</span>

              <span>•</span>

              <span>Posted {formatRelativeDate(vehicle?.created_at)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK SPECS */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <SpecCard
          icon={<Fuel className="h-5 w-5" />}
          label="Fuel"
          value={vehicle?.fuel}
        />

        <SpecCard
          icon={<Gauge className="h-5 w-5" />}
          label="Transmission"
          value={vehicle?.transmission}
        />

        <SpecCard
          icon={<BadgeCheck className="h-5 w-5" />}
          label="Registration"
          value={vehicle?.registration}
        />

        <SpecCard
          icon={<CircleDot className="h-5 w-5" />}
          label="Wheels"
          value={vehicle?.wheels}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="rounded-xl border bg-card p-3 shadow-sm">
        <h3 className="text-lg font-semibold">Description</h3>

        <div
          className={`mt-3 text-sm leading-7 text-muted-foreground transition-all ${
            expanded ? "" : "line-clamp-4"
          }`}
        >
          {vehicle?.description}
        </div>

        {descriptionTooLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            {expanded ? (
              <>
                Show less
                <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Read more
                <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        )}
      </div>      

      {/* VEHICLE DETAILS */}
      <div className="rounded-3xl border bg-card p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Vehicle Details</h3>

        <div className="mt-4 divide-y capitalize">
          <DetailRow label="Brand" value={vehicle?.brand} />

          <DetailRow label="Model" value={vehicle?.model} />

          <DetailRow label="Fuel" value={vehicle?.fuel} />

          <DetailRow label="Transmission" value={vehicle?.transmission} />

          <DetailRow label="Registration" value={vehicle?.registration} />

          <DetailRow label="Wheels" value={vehicle?.wheels} />

          <DetailRow label="Seller" value={vehicle?.seller} />
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto">
        <StickyContactBar vehicle={vehicle} />
      </div>
    </section>
  );
}

function SpecCard({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-2 shadow-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <span className="text-xs font-medium">{label}</span>
      </div>

      <div className="mt-3 text-base font-semibold">{value}</div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="text-sm text-muted-foreground">{label}</span>

      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
