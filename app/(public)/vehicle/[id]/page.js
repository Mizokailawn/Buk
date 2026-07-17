// app/(public)/vehicle/[id]/page.js

import VehicleDetailTracker from "@/components/pwa/vehicle-details-tracker";
import { Spinner } from "@/components/ui/spinner";
import { VehicleDetailsWrapper } from "@/components/vehicles/vehicle-details-wrapper";
import { GetPublicVehicleById } from "@/lib/queries/vehicles/get-vehicle";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const vehicle = await GetPublicVehicleById(id);
  
  function capitalizeWords(str) {
  if (!str) return "";

  return str
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}

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
  const brand = capitalizeWords(vehicle?.brand)
  const model = vehicle?.model

  return {
    title: `${brand} ${model} for sale | BUK`,
    description: `₹${formatPrice(vehicle?.price)}`,

    openGraph: {
      title: `${brand} ${model} for sale`,
      description: `₹${formatPrice(vehicle?.price)} • ${vehicle?.city}`,
      images: [
                {
                  url: vehicle?.thumbnail_url,
                  width: 1200,
                  height: 630,
                  alt: "Vehicle Image",
                },
              ],
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
    <div className="flex justify-center py-17 min-h-svh max-w-lg mx-auto">
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
