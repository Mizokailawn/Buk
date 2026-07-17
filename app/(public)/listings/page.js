import ActiveFilterChips from "@/components/listings/activefilterchips";
import CategoryChips from "@/components/listings/CategoryChips";
import FloatingFilterButton from "@/components/listings/floatingfilterbutton";
import ListingsWrapper from "@/components/listings/listingspagewrapper";
import SearchOverlay from "@/components/listings/search-overlay";
import FloatingShareButton from "@/components/shared/floating-share-button";
import VehicleSkeletonGrid from "@/components/skeletons/vehicle-skeleton-grid";
import { ListingsLoadingProvider } from "@/components/listings/listings-loading-context";
import { GetVehicleFilterOptions } from "@/lib/queries/vehicles/get-vehicle";
import { SearchProvider } from "@/components/search/search-provider";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  
  const brand = params.brand;
  const model = params.model;
  const category = params.category;
  const city = params.city;
  
  function capitalize(str) {
    if (!str) return "";

    return str
    .split("")
    .map(
      (w) =>
        w.charAt(0).toUpperCase() +
        w.slice(1).toLowerCase()
    )
    .join(" ")
  }
  
  const brandName = capitalize(brand)
  const modelName = capitalize(model)


  let title = "Listings || BUK";
  let description =
    "Buy and sell used cars, bikes, scooters and other vehicles across Mizoram.";

  if (brand && model) {
    title = `${brandName} ${modelName} Listings · BUK`;
    description = `Browse available ${brandName} ${modelName} listings on BUK.`;
  } else if (brand) {
    title = `${brandName} Vehicles for Sale · BUK`;
    description = `Browse used ${brandName} vehicles for sale across Mizoram on BUK.`;
  } else if (category && city) {
    title = `${category}s for Sale in ${city} · BUK`;
    description = `Browse used ${category} listings in ${city} on BUK.`;
  } else if (category) {
    title = `${category}s for Sale · BUK`;
    description = `Browse used ${category} listings across Mizoram on BUK.`;
  } else if (city) {
    title = `Vehicles for Sale in ${city} · BUK`;
    description = `Browse used vehicle listings in ${city} on BUK.`;
  }

  return {
    title,
    description,

    openGraph: {
      title,
      description,      
      type: "website",      
      images: [
        {
          url: "/icon-512.png",
          width: 512,
          height: 512,
          alt: "BUK Logo",
        },
      ],
    },    
  };
}

export default async function ListingsPage({ searchParams }) {
  const filterOptions = await GetVehicleFilterOptions();

  return (
    <div className="px-2 py-17 w-full min-h-svh max-w-6xl mx-auto space-y-2">
      <ListingsLoadingProvider>
        <SearchProvider>
          <Suspense>
            <SearchOverlay />
          </Suspense>
          <Suspense>
            <CategoryChips />
          </Suspense>
          <Suspense>
            <ActiveFilterChips />
          </Suspense>
          <Suspense fallback={<VehicleSkeletonGrid />}>
            <ListingsWrapper searchParams={searchParams} />
          </Suspense>
          <Suspense>
            <FloatingFilterButton filterOptions={filterOptions} />
          </Suspense>
          <FloatingShareButton />
        </SearchProvider>
      </ListingsLoadingProvider>
    </div>
  );
}
