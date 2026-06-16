"use client";

import { createContext, useContext, useState } from "react";

const ListingsLoadingContext = createContext(null);

export function ListingsLoadingProvider({ children }) {
  const [isFilterChanging, setIsFilterChanging] = useState(false);

  return (
    <ListingsLoadingContext.Provider
      value={{ isFilterChanging, setIsFilterChanging }}
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
