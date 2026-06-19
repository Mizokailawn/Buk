const CACHE_VERSION = "v1";
const SHELL_CACHE = `buk-shell-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(SHELL_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),

      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== SHELL_CACHE) {
              return caches.delete(cacheName);
            }
          })
        )
      ),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  /**
   * NEVER CACHE:
   * API routes
   */
  if (url.pathname.startsWith("/api")) {
    return;
  }

  /**
   * NEVER CACHE:
   * Supabase
   */
  if (url.hostname.includes("supabase.co")) {
    return;
  }

  /**
   * NEVER CACHE:
   * Next image optimizer
   */
  if (url.pathname.startsWith("/_next/image")) {
    return;
  }

  /**
   * NEVER CACHE:
   * Images
   */
  if (
    request.destination === "image" ||
    request.destination === "video"
  ) {
    return;
  }

  /**
   * CACHE FIRST:
   * Next.js static chunks
   */
  if (url.pathname.startsWith("/_next/static")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  /**
   * CACHE FIRST:
   * JS / CSS / Fonts
   */
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "font"
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  /**
   * CACHE FIRST:
   * Manifest
   */
  if (
    url.pathname === "/manifest.webmanifest" ||
    url.pathname.endsWith(".webmanifest")
  ) {
    event.respondWith(cacheFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);

    if (!response || response.status !== 200) {
      return response;
    }

    const cache = await caches.open(SHELL_CACHE);

    cache.put(request, response.clone());

    return response;
  } catch {
    return new Response("Offline", {
      status: 503,
      statusText: "Offline",
    });
  }
}