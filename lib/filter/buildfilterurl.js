// lib/buildFilterUrl.js

export function buildFilterUrl(filters) {
  const params = new URLSearchParams();

  // Search
  if (filters.q?.trim()) {
    params.set("q", filters.q.trim());
  }

  // Category
  if (filters.category?.length) {
    params.set(
      "category",
      filters.category.join(",")
    );
  }

  // Brand
  if (filters.brand?.length) {
    params.set(
      "brand",
      filters.brand.join(",")
    );
  }

  // City
  if (filters.city?.length) {
    params.set(
      "city",
      filters.city.join(",")
    );
  }

  // Fuel
  if (filters.fuel?.length) {
    params.set(
      "fuel",
      filters.fuel.join(",")
    );
  }

  // Transmission
  if (filters.transmission?.length) {
    params.set(
      "transmission",
      filters.transmission.join(",")
    );
  }

  // Seller
  if (filters.seller?.length) {
    params.set(
      "seller",
      filters.seller.join(",")
    );
  }

  // Price
  if (filters.minPrice) {
    params.set(
      "minPrice",
      filters.minPrice
    );
  }

  if (filters.maxPrice) {
    params.set(
      "maxPrice",
      filters.maxPrice
    );
  }

  // Sort
  if (
    filters.sort &&
    filters.sort !== "newest"
  ) {
    params.set(
      "sort",
      filters.sort
    );
  }

  const queryString =
    params.toString();

  return queryString
    ? `/listings?${queryString}`
    : "/listings";
}