// lib/tanstack/get-query-client.js

import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        /*
          Data stays fresh for 1 minute.
          Prevents unnecessary refetches.
        */
        staleTime: 1000 * 60,

        /*
          Cache stays in memory for 5 mins.
        */
        gcTime: 1000 * 60 * 5,

        /*
          Prevent annoying tab refetches.
        */
        refetchOnWindowFocus: false,

        /*
          Retry failed requests once.
        */
        retry: 1,
      },

      mutations: {
        retry: 1,
      },
    },
  });
}

/*
  Browser singleton cache
*/
let browserQueryClient = undefined;

export function getQueryClient() {
  /*
    SERVER:
    Create fresh cache per request.
  */
  if (isServer) {
    return makeQueryClient();
  }

  /*
    CLIENT:
    Reuse singleton cache.
  */
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}