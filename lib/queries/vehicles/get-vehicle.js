import { cacheLife, cacheTag } from "next/cache";
import { createClient } from "../../supabase/public";
import { VEHICLE_FILTER_OPTIONS } from "@/lib/filter/filter-options";

// ================================================
// FETCH PUBLIC VEHICLE
// ================================================
export async function GetHomepageVehicles() {
  "use cache";
  cacheLife("minutes");
  cacheTag("public-vehicles");

  console.log("DATABASE HIT VIA GetHomepageVehicles");

  const supabase = createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      `
        id,
        model,
        brand,
        price,
        city, 
        thumbnail_url      
    `,
    )
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching vehicles: ", error.message);
    return { success: false, error: "Error fetching public vehicles." };
  }

  return { success: true, data };
}

// ===============================================================
// FETCH VEHICLE BY ID
// ===============================================================
export async function GetPublicVehicleById(id) {
  "use cache";
  cacheLife("hours");
  cacheTag("vehicle-details");

  console.log("DATABASE HIT VIA GetPublicVehicleById(id)");

  const supabase = createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select(
      `*,
    vehicle_images(*)`,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching vehicle by Id: ", error.message);
    return { success: false, error: "Error fetching vehicle details." };
  }
  return data;
}

// ===============================================================
// FETCH FILTERED VEHICLE
// ===============================================================
export async function GetFilteredVehicle(filters) {
  "use cache";
  cacheLife("hours");
  cacheTag("filtered-vehicle");

  const supabase = createClient();

  let query = supabase
    .from("vehicles")
    .select(
      `
    id,
    model,
    brand,
    price,
    city,
    fuel,
    transmission,
    thumbnail_url
    `,
    )
    .eq("status", "active")
    .order("created_at", { ascending:false});

  if (filters?.category.length) {
    query = query.in("category", filters.category);
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching filtered vehicle: ", error.message)
    throw error;
  }

  // console.log("Data: ", data[0])

  return data;
}

export async function GetFilteredVehiclePage(filters, { cursor = 0, limit = 12 } = {}) {
  "use cache"
  cacheLife("minutes")
  cacheTag("filtered-vehicle-page")
  
  const supabase = createClient();
  const from = Number(cursor) || 0;
  const pageSize = Number(limit) || 12;
  const to = from + pageSize - 1;

  let query = supabase
    .from("vehicles")
    .select(
      `
        id,
        model,
        brand,
        price,
        city,
        fuel,
        transmission,
        thumbnail_url
      `,
    )
    .eq("status", "active");

  if (filters?.q) {
    const value = filters.q.replaceAll(",", " ").trim();
    query = query.or(
      `brand.ilike.%${value}%,model.ilike.%${value}%,city.ilike.%${value}%`,
    );
  }

  if (filters?.category?.length) {
    query = query.in("category", filters.category);
  }

  if (filters?.brand?.length) {
    query = query.in("brand", filters.brand);
  }

  if (filters?.city?.length) {
    query = query.in("city", filters.city);
  }

  if (filters?.fuel?.length) {
    query = query.in("fuel", filters.fuel);
  }

  if (filters?.transmission?.length) {
    query = query.in("transmission", filters.transmission);
  }

  if (filters?.seller?.length) {
    query = query.in("seller", filters.seller);
  }

  if (filters?.minPrice) {
    query = query.gte("price", Number(filters.minPrice));
  }

  if (filters?.maxPrice) {
    query = query.lte("price", Number(filters.maxPrice));
  }

  if (filters?.sort === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (filters?.sort === "price-desc") {
    query = query.order("price", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query.range(from, to);

  if (error) {
    console.error("Error fetching filtered vehicle page: ", error.message);
    throw error;
  }

  return {
    data,
    nextCursor: data.length === pageSize ? from + pageSize : null,
  };
}

export async function GetVehicleFilterOptions() {
  "use cache";
  cacheLife("hours");
  cacheTag("vehicle-filter-options");

  const supabase = createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .select("brand, city, fuel, transmission")
    .eq("status", "active")
    .limit(1000);

  if (error) {
    console.error("Error fetching vehicle filter options: ", error.message);
    return VEHICLE_FILTER_OPTIONS;
  }

  const fallbackKeys = {
    brand: "brands",
    city: "cities",
    fuel: "fuel",
    transmission: "transmission",
  };

  const uniqueSorted = (key) => {
    const values = data
      .map((vehicle) => vehicle[key])
      .filter(Boolean);

    const unique = [...new Set(values)].sort((a, b) => a.localeCompare(b));

    return unique.length ? unique : VEHICLE_FILTER_OPTIONS[fallbackKeys[key]];
  };

  return {
    ...VEHICLE_FILTER_OPTIONS,
    brands: uniqueSorted("brand"),
    cities: uniqueSorted("city"),
    fuel: uniqueSorted("fuel"),
    transmission: uniqueSorted("transmission"),
  };
}
