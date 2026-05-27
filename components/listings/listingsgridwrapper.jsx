import { GetPublicVehicles } from "@/lib/fetchrides/publicfetch"
import ListingsGrid from "./listingsgrid"
import { PublicVehiclesError } from "../errors/public-vehicle-error"

export default async function ListingsWrapper() {
    // let listings = []

    // try {
    //     listings = await GetPublicVehicles()
    // } catch (error) {
    //     console.error("Error fetching explore listings: ", error)
    // }
    const response = await GetPublicVehicles()
    const listings = response.data

    if (!response.success ) {
      return <PublicVehiclesError message={response.error} />
    }

    if (listings.length === 0) {
      return(
        <div>
          <p>Sorry! NO vehicles to show at the moment.</p>
        </div>
      )
    }

  return (
    <ListingsGrid listings={listings} />
  )
}