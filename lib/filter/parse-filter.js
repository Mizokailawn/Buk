export function parseFilters(searchParams) {
  return {
    q: searchParams.q || "",

    category: searchParams.category
      ? searchParams.category.split(",")
      : [],

    brand: searchParams.brand
      ? searchParams.brand.split(",")
      : [],

    city: searchParams.city
      ? searchParams.city.split(",")
      : [],

    fuel: searchParams.fuel
      ? searchParams.fuel.split(",")
      : [],

    transmission: searchParams.transmission
      ? searchParams.transmission.split(",")
      : [],

    seller: searchParams.seller
      ? searchParams.seller.split(",")
      : [],

    minPrice: searchParams.minPrice || "",

    maxPrice: searchParams.maxPrice || "",

    sort: searchParams.sort || "newest",
  };
}