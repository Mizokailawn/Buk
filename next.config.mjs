/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const hostname = new URL(supabaseUrl).hostname;
const isProd = process.env.NODE_ENV === "production";
const withPWA = withPWAInit({
  dest: "public",
  disable: !isProd,
  register: true,
  reloadOnOnline: true,
  cacheStartUrl: false,
  dynamicStartUrl: false,
  extendDefaultRuntimeCaching: false,
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({ url }) => url.pathname.startsWith("/_next/static/"),
        handler: "CacheFirst",
        options: {
          cacheName: "buk-next-static",
          expiration: {
            maxEntries: 120,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "script",
        handler: "CacheFirst",
        options: {
          cacheName: "buk-scripts",
          expiration: {
            maxEntries: 80,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "style",
        handler: "CacheFirst",
        options: {
          cacheName: "buk-styles",
          expiration: {
            maxEntries: 40,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
      {
        urlPattern: ({ request }) => request.destination === "font",
        handler: "CacheFirst",
        options: {
          cacheName: "buk-fonts",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 365 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: ({ url }) =>
          url.pathname === "/manifest.webmanifest" ||
          url.pathname.endsWith(".webmanifest") ||
          url.pathname === "/favicon.ico" ||
          url.pathname.startsWith("/icon-") ||
          url.pathname.startsWith("/apple-icon"),
        handler: "CacheFirst",
        options: {
          cacheName: "buk-pwa-assets",
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
      {
        urlPattern: ({ request, url }) =>
          request.destination === "image" ||
          (url.hostname.includes("supabase.co") &&
            url.pathname.includes("/storage/v1/object/public/vehicle-images")),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "buk-vehicle-images",
          expiration: {
            maxEntries: 120,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
});

const nextConfig = {
  /* config options here */
  reactCompiler: true,

  // Enable cache
  cacheComponents: true,

  // Images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname,
      },
    ],
  },
};

export default isProd ? withPWA(nextConfig) : nextConfig;
