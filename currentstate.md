# Project Current State

## Overall Progress
The project is a functional MVP (Minimum Viable Product) for a local vehicle marketplace. Core features including authentication, vehicle listing (with image uploads), and a filtered browse/search experience are implemented.

## Fully Functional & Stable Features
- **Authentication**: Email/Password and Google Sign-in via Supabase Auth.
- **Vehicle Publishing**: Multi-step process with image processing, Supabase Storage integration, and database insertion.
- **Listings & Search**: Infinite scrolling grid of vehicles with filters for category, brand, district, and price.
- **Responsive Navigation**: Bottom navigation for mobile and top navigation for desktop.
- **Caching**: Next.js 15 "use cache" implemented for high-performance server-side data fetching.

## In-Progress or Incomplete Features
- **User Profile**: Profile page (`(protected)/profile`) exists but needs more detailed management of user listings.
- **Recently Viewed & Favourites**: Placeholder links in navigation but logic is not yet implemented.
- **User Activity Tracking**: UI sections in `BotNavMenu` are placeholders.
- **Direct Messaging**: Users currently contact via Phone/WhatsApp; in-app messaging is not yet implemented.

## Known Issues & Bottlenecks
1. **Sequential Image Processing (High Priority)**: `action/vehicle.js` moves images one by one in a `for` loop. This makes publishing listings slow when multiple photos are uploaded.
2. **Inefficient Filter Options Query (High Priority)**: `GetVehicleFilterOptions` in `lib/queries/vehicles/get-vehicle.js` fetches 1000 rows to find unique brands/cities. This will fail to scale as the database grows.
3. **Initial Listing Load (Medium Priority)**: `ListingsGrid` relies on client-side fetching via TanStack Query. The first page could be server-rendered for better SEO and initial load speed.
4. **Redundant Auth Checks (Low Priority)**: Multiple components call `supabase.auth.getUser()` independently.

## Next Logical Steps
1. **Optimize Image Uploads**: Refactor `action/vehicle.js` to use `Promise.all` for moving images.
2. **Optimize Filter Data**: Update `GetVehicleFilterOptions` to use PostgreSQL `DISTINCT` queries instead of in-memory processing.
3. **Implement Favourites**: Add functionality to save/bookmark vehicles.
4. **Enhance Profile Page**: Allow users to mark their own vehicles as "Sold" or delete listings.
5. **Implement Server-Side Prefetching**: Pass initial page data to `ListingsGrid` to eliminate initial loading states.
