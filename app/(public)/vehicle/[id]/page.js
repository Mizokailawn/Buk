// app/(public)/vehicle/[id]/page.js

import VehicleDetailTracker from "@/components/pwa/vehicle-details-tracker";
import { Spinner } from "@/components/ui/spinner";
import { VehicleDetailsWrapper } from "@/components/vehicles/vehicle-details-wrapper";
import { GetPublicVehicleById } from "@/lib/queries/vehicles/get-vehicle";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const vehicle = await GetPublicVehicleById(id);

  const formatPrice = (price) => {
    if (!price) return "₹0";

    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | BUK",
    };
  }

  return {
    title: `${vehicle.brand} ${vehicle.model} | BUK`,
    description: `₹${formatPrice(vehicle?.price)}`,

    openGraph: {
      title: `${vehicle.brand} ${vehicle.model}`,
      description: `₹${vehicle.price.toLocaleString()}`,
      images: [vehicle.images?.[0]],
      type: "website",
    },

    // twitter: {
    //   card: "summary_large_image",
    //   title: `${vehicle.brand} ${vehicle.model}`,
    //   description: `₹${vehicle.price.toLocaleString()}`,
    //   images: [vehicle.images?.[0]],
    // },
  };
}

export default function Page({ params }) {
  return (
    <div className="flex justify-center py-17 min-h-svh max-w-6xl mx-auto">
      <VehicleDetailTracker />
      <Suspense fallback={
          <div className="flex min-h-svh justify-center items-center w-full mx-auto my-auto">
            <Spinner className="h-10 w-10" />
          </div>
        }
      >
        <VehicleDetailsWrapper params={params} />
      </Suspense>
    </div>
  );
}
