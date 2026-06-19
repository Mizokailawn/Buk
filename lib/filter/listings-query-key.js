const LIST_KEYS = [
  "category",
  "brand",
  "city",
  "fuel",
  "transmission",
  "seller",
];
const SINGLE_KEYS = ["minPrice", "maxPrice", "sort"];

function readParam(params, key) {
  if (!params) return "";

  if (typeof params.get === "function") {
    return params.get(key) || "";
  }

  const value = params[key];

  if (Array.isArray(value)) {
    return value[0] || "";
  }

  return value || "";
}

export function getVehicleListingsFilterKey(params) {
  const normalized = new URLSearchParams();
  const search = readParam(params, "q").trim();

  if (search) {
    normalized.set("q", search);
  }

  LIST_KEYS.forEach((key) => {
    const values = readParam(params, key)
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    if (values.length) {
      normalized.set(key, values.join(","));
    }
  });

  SINGLE_KEYS.forEach((key) => {
    const value = readParam(params, key).trim();

    if (!value || (key === "sort" && value === "newest")) return;

    normalized.set(key, value);
  });

  return normalized.toString();
}

export function getVehicleListingsQueryKey(params) {
  return ["vehicles", "infinite-list", getVehicleListingsFilterKey(params)];
}
