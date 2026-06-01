import { NextResponse } from "next/server";
import { parseFilters } from "@/lib/filter/parse-filter";
import { GetFilteredVehiclePage } from "@/lib/queries/vehicles/get-vehicle";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filters = parseFilters(searchParams);
    const cursor = Number(searchParams.get("cursor") || 0);
    const limit = Number(searchParams.get("limit") || 12);
    const page = await GetFilteredVehiclePage(filters, { cursor, limit });

    return NextResponse.json(page);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch vehicles." },
      { status: 500 },
    );
  }
}
