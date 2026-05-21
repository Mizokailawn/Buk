// lib/tanstack/query-keys.js

/*
  Centralized query keys.

  Benefits:
  - avoids typos
  - easier invalidation
  - scalable
*/

export const queryKeys = {
  vehicles: {
    all: ["vehicles"],

    lists: () => [...queryKeys.vehicles.all, "list"],

    list: (filters) => [
      ...queryKeys.vehicles.lists(),
      filters,
    ],

    details: () => [
      ...queryKeys.vehicles.all,
      "detail",
    ],

    detail: (id) => [
      ...queryKeys.vehicles.details(),
      id,
    ],
  },

  favorites: {
    all: ["favorites"],

    user: (userId) => [
      "favorites",
      userId,
    ],
  },
};