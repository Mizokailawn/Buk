
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import UserListingsGrid from "./user-listings-grid";

export default function UserListings({listings}) {
    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-foreground">My Vehicle Listings</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Manage the vehicles you have listed for sale.</p>
          </div>
          <Badge variant="outline" className="text-foreground border-purple-400/30 px-3 py-1 rounded-full text-xs font-semibold">
            {listings.length} Listings
          </Badge>
        </div>

        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border-2 border-dashed border-muted/50 bg-card">
            <UserCircle className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="font-semibold text-lg text-foreground">No Listings Yet</h3>
            <p className="text-sm text-muted-foreground max-w-sm mt-1 mb-6">
              You haven't listed any vehicles for sale yet. Post your ride 100% free.
            </p>
            <Button asChild>
              <Link href="/sell">Sell My Ride</Link>
            </Button>
          </div>
        ) : (
          <UserListingsGrid listings={listings} />
        )}
      </div>
    )
}