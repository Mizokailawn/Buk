import { Suspense } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SkeletonCard from "../skeletons/skeletonCard";
import RidesClient from "./ridesclient";

const Rides = () => {
  return (
    <div className="flex flex-col gap-2 w-full pt-2 items-center px-2">
      <div className="flex justify-between items-center px-2 w-full">
        <h1 className="text-lg md:text-2xl font-medium">Rides</h1>
        <Button
          asChild
          variant="link"
          className="relative gap-1 justify-between items-center px-2 rounded-full text-xs"
        >
          <Link href="/listings">
            View all
            <ArrowRight className="h-2 w-2" />
          </Link>
        </Button>
      </div>
      <div>
        <Suspense fallback={<SkeletonCard />}>
          <RidesClient />
        </Suspense>
      </div>      
    </div>
  );
};

export default Rides;
