import { NextResponse } from "next/server";
import { parseFilters } from "@/lib/filter/parse-filter";
import { GetFilteredVehiclePage } from "@/lib/queries/vehicles/get-vehicle";
import { vehicleQuerySchema } from "@/lib/validation/vehicle-query-schema";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const parsed = vehicleQuerySchema.safeParse({
      cursor: searchParams.get("cursor"),
      limit: searchParams.get("limit"),
    });    

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid query parameters",
        },
        {
          status: 400,
        },
      )
    }
    const filters = parseFilters(searchParams);
    
    const page = await GetFilteredVehiclePage(filters, parsed.data);

    return NextResponse.json(page);
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to fetch vehicles." },
      { status: 500 },
    );
  }
}
