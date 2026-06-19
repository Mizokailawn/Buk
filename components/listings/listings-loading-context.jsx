"use client";

import { createContext, useContext, useState } from "react";
import { getQueryClient } from "@/lib/tanstack/get-query-client";
import { getVehicleListingsQueryKey } from "@/lib/filter/listings-query-key";

const ListingsLoadingContext = createContext(null);

export function ListingsLoadingProvider({ children }) {
  const [isFilterChanging, setIsFilterChanging] = useState(false);
  const [pendingFilterKey, setPendingFilterKey] = useState(null);

  const startListingsNavigation = (nextParams) => {
    const queryKey = getVehicleListingsQueryKey(nextParams);
    const filterKey = queryKey[2];
    const queryClient = getQueryClient();
    const cached = queryClient.getQueryData(queryKey);

    setPendingFilterKey(filterKey);
    setIsFilterChanging(!cached);
  };

  return (
    <ListingsLoadingContext.Provider
      value={{
        isFilterChanging,
        pendingFilterKey,
        setIsFilterChanging,
        setPendingFilterKey,
        startListingsNavigation,
        startListingsChange: startListingsNavigation,
      }}
    >
      {children}
    </ListingsLoadingContext.Provider>
  );
}

export function useListingsLoading() {
  const context = useContext(ListingsLoadingContext);

  if (!context) {
    throw new Error(
      "useListingsLoading must be used inside ListingsLoadingProvider",
    );
  }

  return context;
}
