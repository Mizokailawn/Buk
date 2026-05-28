import HeroSection from "@/components/homepage/herosection";
import Rides from "@/components/homepage/rides";
import { getHomePageListings } from "@/lib/vehicle/fetchrides/fetchRides";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background gap-4 w-full">
      <div className="w-full">
        <HeroSection />
      </div>
      <div>
        <Rides />
      </div>
    </div>
  );
}
