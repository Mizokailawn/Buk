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
        year,
        price,
        city, 
        thumbnail_url      
    `,
    )
    .order("created_at", { ascending: false })
    .limit(12);

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
  cacheTag(`vehicle-details-${id}`);

  
  const supabase = createClient();
  
  const { data, error } = await supabase
  .from("vehicles")
  .select(
    `*,
    vehicle_images(*)`,
  )
  .eq("id", id)
  .single();
  
  console.log("DATABASE HIT VIA GetPublicVehicleById(id)");
  
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
    year,
    price,
    city,
    thumbnail_url
    `,
    )
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (filters?.category.length) {
    query = query.in("category", filters.category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching filtered vehicle: ", error.message);
    throw error;
  }

  // console.log("Data: ", data[0])

  return data;
}

// ===============================================================
// FETCH FILTERED VEHICLE PAGE
// ===============================================================
export async function GetFilteredVehiclePage(
  filters,
  { cursor = 0, limit = 12 } = {},
) {
  "use cache";
  cacheLife("minutes");
  cacheTag("filtered-vehicle-page");

  const supabase = createClient();

  const from = cursor;
  const pageSize = limit;
  const to = from + pageSize - 1;

  const applyFilters = (query) => {
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

    return query;
  };

  const applySorting = (query) => {
    if (filters?.sort === "price-asc") {
      return query.order("price", { ascending: true });
    }

    if (filters?.sort === "price-desc") {
      return query.order("price", { ascending: false });
    }

    return query.order("created_at", { ascending: false });
  };

  // ----------------------------
  // FTS SEARCH
  // ----------------------------

  let query = supabase
    .from("vehicles")
    .select(
      `
      id,
      model,
      brand,
      year,
      price,
      city,
      thumbnail_url
    `,
    )
    .eq("status", "active");

  query = applyFilters(query);

  const searchValue = filters?.q?.slice(0, 100).replaceAll(",", " ").trim();

  if (searchValue) {
    query = query.textSearch("search_vector", searchValue, {
      type: "websearch",
      config: "simple",
    });
  }

  query = applySorting(query);

  const { data, error } = await query.range(from, to);

  if (error) {
    console.error("Error fetching filtered vehicles:", error.message);
    throw error;
  }

  // FTS found results OR no search query
  if (!searchValue || data.length > 0) {
    return {
      data,
      nextCursor: data.length === pageSize ? from + pageSize : null,
    };
  }

  // ----------------------------
  // FUZZY FALLBACK
  // ----------------------------

  const { data: fuzzyData, error: fuzzyError } = await supabase.rpc(
    "search_vehicles_fuzzy",
    {
      search_term: searchValue,
    },
  );

  if (fuzzyError) {
    console.error("Error fetching fuzzy vehicles:", fuzzyError.message);
    throw fuzzyError;
  }

  let filtered = fuzzyData ?? [];

  if (filters?.category?.length) {
    filtered = filtered.filter((v) => filters.category.includes(v.category));
  }

  if (filters?.brand?.length) {
    filtered = filtered.filter((v) => filters.brand.includes(v.brand));
  }

  if (filters?.city?.length) {
    filtered = filtered.filter((v) => filters.city.includes(v.city));
  }

  if (filters?.fuel?.length) {
    filtered = filtered.filter((v) => filters.fuel.includes(v.fuel));
  }

  if (filters?.transmission?.length) {
    filtered = filtered.filter((v) =>
      filters.transmission.includes(v.transmission),
    );
  }

  if (filters?.seller?.length) {
    filtered = filtered.filter((v) => filters.seller.includes(v.seller));
  }

  if (filters?.minPrice) {
    filtered = filtered.filter(
      (v) => Number(v.price) >= Number(filters.minPrice),
    );
  }

  if (filters?.maxPrice) {
    filtered = filtered.filter(
      (v) => Number(v.price) <= Number(filters.maxPrice),
    );
  }

  if (filters?.sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters?.sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  const paginated = filtered.slice(from, from + pageSize);

  return {
    data: paginated.map((v) => ({
      id: v.id,
      model: v.model,
      brand: v.brand,
      year: v.year,
      price: v.price,
      city: v.city,
      thumbnail_url: v.thumbnail_url,
    })),
    nextCursor: filtered.length > from + pageSize ? from + pageSize : null,
  };
}

// ===============================================================
// FETCH FILTERED VEHICLE OPTIONS
// ===============================================================
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
    const values = data.map((vehicle) => vehicle[key]).filter(Boolean);

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
