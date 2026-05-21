export const revalidate = 60;

import HeroSection from "@/components/homepage/herosection";
import Rides from "@/components/homepage/rides";
import { getHomePageListings } from "@/lib/fetchrides/fetchRides";

export default async function Home() {
  let vehicles = [];

  try {
    vehicles = await getHomePageListings();
  } catch (error) {
    console.error("Error fetching vehicles for homepage: ", error.message);
  }

  return (
    <div className="flex flex-col min-h-screen bg-background gap-4 w-full">
      <div className="w-full">
        <HeroSection />
      </div>
      <div>
        <Rides vehicles={vehicles} />
      </div>
    </div>
  );
}
