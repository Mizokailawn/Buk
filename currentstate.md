# Project Current State

## Overall Progress
The project is a functional MVP (Minimum Viable Product) for a local vehicle marketplace in Mizoram. Core features including authentication, vehicle listing (with image uploads), and a filtered browse/search experience are implemented and highly responsive.

## Fully Functional & Stable Features
- **Authentication**: Email/Password and Google Sign-in via Supabase Auth.
- **Vehicle Publishing**: Multi-step process with image processing, Supabase Storage integration, and server action insertion.
- **Listings & Integrated Search**: Infinite scrolling grid of vehicles on `/listings` with filters (category, brand, district, and price). Search inputs from `SearchBox` or `SearchOverlay` seamlessly integrate by appending `q` to the URL query string and updating TanStack Query.
- **Responsive Navigation**: Bottom navigation for mobile and top navigation for desktop.
- **Caching**: Next.js 15 "use cache" implemented for high-performance server-side data fetching.

## In-Progress or Incomplete Features
- **User Profile**: Profile page (`(protected)/profile`) exists but needs more detailed management of user listings.
- **Recently Viewed & Favourites**: Placeholder links in navigation but logic is not yet implemented.
- **User Activity Tracking**: UI sections in `BotNavMenu` are placeholders.
- **Direct Messaging**: Users currently contact via Phone/WhatsApp; in-app messaging is not yet implemented.

## Known Issues & Bottlenecks
1. **Sequential Image Processing (High Priority)**: `action/vehicle.js` moves images one by one in a sequential `for...of` loop. This makes publishing listings slow when multiple photos are uploaded.
   - *Suggested Fix*: Implement `Promise.all()` to concurrently handle `.move` operations on storage.
2. **Inefficient Filter Options Query (High Priority)**: `GetVehicleFilterOptions` in `lib/queries/vehicles/get-vehicle.js` fetches up to 1000 rows to find unique brands/cities. This will fail to scale as the database grows.
   - *Suggested Fix*: Update the query to fetch column-specific `DISTINCT` unique values using SQL rather than in-memory JavaScript processing. Or maintain a separate meta table / Postgres materialized view of available filter options.
3. **Initial Listing Load (Medium Priority)**: `ListingsGrid` relies on client-side fetching via TanStack Query. The first page could be server-rendered or pre-fetched for better SEO and initial load speed.
   - *Suggested Fix*: Pass initial page data to `ListingsGrid` from the server-side to eliminate initial loading states.
4. **Redundant Auth Checks (Low Priority)**: Multiple components call `supabase.auth.getUser()` independently.

## Suggested PWA Roadmap
Because Mizoram has a mobile-first user base and frequently spotty internet coverage, implementing a Progressive Web App (PWA) is highly recommended.
1. **Setup Next-PWA**: Install `@ducanh2912/next-pwa` for robust Next.js App Router support.
2. **Web Manifest**: Create a `manifest.json` in `/public` specifying theme colors, app names, start URL, and responsive app icons.
3. **Service Worker Caching Strategy**:
   - Cache-first for core assets (JS, CSS, static UI icons).
   - Stale-while-revalidate for dynamic API fetches like `/api/vehicles` so users can browse previously fetched vehicles offline.
   - Elegant custom Offline fallback page for when network requests fail.
4. **Install Prompt**: Add a subtle "Add to Home Screen" installation banner for mobile browsers.

## Next Logical Steps
1. **Optimize Image Uploads**: Refactor `action/vehicle.js` to use concurrent promises (`Promise.all()`) when moving uploaded images from the temp directory to the vehicle directory.
2. **Optimize Filter Data**: Refactor `GetVehicleFilterOptions` to use PostgreSQL `DISTINCT` queries or parallel lightweight calls instead of in-memory set processing over 1000 entries.
3. **Implement Favourites**: Add stateful bookmarks/favourites linked to user accounts.
4. **Enhance Profile Page**: Allow users to mark their own vehicles as "Sold" or delete listings.
5. **Implement Server-Side Prefetching**: Pass initial page data to `ListingsGrid` to eliminate initial loading states.
6. **Implement PWA Support**: Implement Web Manifest and register the service worker for offline resilience and home screen installation.
