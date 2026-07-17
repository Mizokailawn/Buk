import {
  Fuel,
  Gauge,
  BadgeCheck,
  CircleDot,  
} from "lucide-react";
import StickyContactBar from "./sticky-contact-bar";
import VehicleDescription from "./vehicle-description";
import { Badge } from "../ui/badge";
import { Calendar } from "lucide-react";

export default function VehicleDetailsSection({ vehicle }) {
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

  return (
    <section className="flex flex-col w-full px-2 pb-16 pt-3 space-y-6">
      {/* HERO SECTION */}
      <div className="flex flex-col gap-2 rounded-xl border bg-gradient-to-b from-background to-muted/30 p-3 shadow-sm capitalize">
        {/* Flex layout with items-center ensures the Badge and Text align perfectly on their vertical middle */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-purple-500">
            ₹{formatPrice(vehicle?.price)}
          </h1>
          <div className="flex gap-2">
            <p className="text-sm text-muted-foreground">Posted by:</p>
            <Badge>{vehicle.seller}</Badge>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">
            {vehicle.brand} {vehicle.model}
          </h2>
        </div>
        <div className="flex justify-between text-xs">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{vehicle?.locality}</span>
            <span>•</span>
            <span>{vehicle?.city}</span>
          </div>
          <div className="text-muted-foreground">
            <p>{formatRelativeDate(vehicle?.created_at)}</p>
          </div>
        </div>
      </div>      

      {/* QUICK SPECS */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <SpecCard
          icon={<Calendar className="h-5 w-5" />}
          label="Registration Year"
          value={vehicle?.year}
        />

        <SpecCard
          icon={<BadgeCheck className="h-5 w-5" />}
          label="Registration"
          value={vehicle?.registration}
        />

        <SpecCard
          icon={<Fuel className="h-5 w-5" />}
          label="Fuel"
          value={vehicle?.fuel}
        />

        <SpecCard
          icon={<CircleDot className="h-5 w-5" />}
          label="Category"
          value={vehicle?.category}
        />
      </div>

      {/* DESCRIPTION */}
      <VehicleDescription description={vehicle.description} />

      {/* VEHICLE DETAILS */}
      <div className="rounded-3xl border bg-card p-5 shadow-sm">
        <h3 className="text-lg font-semibold">Vehicle Details</h3>

        <div className="mt-4 divide-y capitalize">
          <DetailRow label="Brand" value={vehicle?.brand} />

          <DetailRow label="Model" value={vehicle?.model} />

          <DetailRow label="Registration" value={vehicle?.registration} />

          <DetailRow label="Registration Year" value={vehicle?.year} />

          <DetailRow label="Locality" value={vehicle?.locality} />

          <DetailRow label="District" value={vehicle?.city} />

          <DetailRow label="Fuel" value={vehicle?.fuel} />

          <DetailRow label="Transmission" value={vehicle?.transmission} />

          <DetailRow label="Category" value={vehicle?.category} />

          <DetailRow label="Sold by" value={vehicle?.seller} />
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
