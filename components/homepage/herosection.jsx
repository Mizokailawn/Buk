import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center sm:text-left max-w-2xl mx-auto sm:mx-0">
          {/* Heading */}
          <h2 className="text-muted-foreground text-sm italic">
            Built For Mizoram
          </h2>
          <h1 className="text-2xl sm:text-2xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            SIMPLE. EASY. FREE
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-sm sm:text-lg text-muted-foreground leading-relaxed">
            List your rides in Seconds. Find the right one in Minutes. Let's
            reduce Commission Fees
          </p>

          {/* Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              asChild
              className="w-full sm:w-auto text-base font-semibold"
            >
              <Link href="/sell">Sell My Ride</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto text-base font-semibold"
            >
              <Link href="/listings">Explore Rides</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
