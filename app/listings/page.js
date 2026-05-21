import ListingsGrid from "@/components/listings/listingsgrid"
import { getExploreListings } from "@/lib/fetchrides/fetchRides"

export default async function ListingsPage () {
    let listings = []

    try {
        listings = await getExploreListings()
    } catch (error) {
        console.error("Error fetching explore listings: ", error)
    }

  return (
    <ListingsGrid listings={listings} />
  )
}

