export function parseFilters(searchParams) {
  const getValue = (key) => {
    if (!searchParams) return "";

    if (typeof searchParams.get === "function") {
      return searchParams.get(key) || "";
    }

    const value = searchParams[key];

    if (Array.isArray(value)) {
      return value[0] || "";
    }

    return value || "";
  };

  const getList = (key) => {
    const value = getValue(key);

    return value
      ? value.split(",").filter(Boolean)
      : [];
  };

  return {
    q: getValue("q"),

    category: getList("category"),

    brand: getList("brand"),

    city: getList("city"),

    fuel: getList("fuel"),

    transmission: getList("transmission"),

    seller: getList("seller"),

    minPrice: getValue("minPrice"),

    maxPrice: getValue("maxPrice"),

    sort: getValue("sort") || "newest",
  };
}
