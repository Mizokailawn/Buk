// app/providers.jsx

"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useState } from "react";

import { getQueryClient } from "@/lib/tanstack/get-query-client";

export default function Providers({ children }) {
  /*
    Stable QueryClient initialization
  */
  const [queryClient] = useState(() =>
    getQueryClient()
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* Devtools only in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools 
        initialIsOpen={false}
        buttonPosition="top-right" />
      )}
    </QueryClientProvider>
  );
}