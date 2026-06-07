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
   - *Suggested Fix*: Update the query to fetch column-specific `DISTINCT` unique values using SQL rather than in-memory JavaScript processing.
3. **Initial Listing Load (Medium Priority)**: `ListingsGrid` relies on client-side fetching via TanStack Query. The first page could be server-rendered or pre-fetched for better SEO and initial load speed.
4. **Redundant Auth Checks (Low Priority)**: Multiple components call `supabase.auth.getUser()` independently.

## Next Logical Steps
1. **Optimize Image Uploads**: Refactor `action/vehicle.js` to use concurrent promises (`Promise.all()`) when moving uploaded images from the temp directory to the vehicle directory.
2. **Optimize Filter Data**: Refactor `GetVehicleFilterOptions` to use PostgreSQL `DISTINCT` queries or parallel lightweight calls instead of in-memory set processing over 1000 entries.
3. **Implement Favourites**: Add stateful bookmarks/favourites linked to user accounts.
4. **Enhance Profile Page**: Allow users to mark their own vehicles as "Sold" or delete listings.
5. **Implement Server-Side Prefetching**: Pass initial page data to `ListingsGrid` to eliminate initial loading states.
