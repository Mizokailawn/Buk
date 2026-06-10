import HeroSection from "@/components/homepage/herosection";
import Rides from "@/components/homepage/rides";
import { ToggleDemo } from "@/components/toggletest";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh bg-background py-20 px-2 gap-4 w-full max-w-6xl mx-auto">
      <div className="w-full">
        <HeroSection />
      </div>
      <div>
        <Rides />
      </div>
      <footer>
        {/* <ToggleDemo /> */}
      </footer>
    </div>
  );
}
