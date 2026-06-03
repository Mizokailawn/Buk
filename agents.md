# Project Memory for AI Agents

## Tech Stack & Architecture
- **Framework**: Next.js (App Router)
- **Language**: JavaScript (JSX)
- **Styling**: Tailwind CSS 4 with Shadcn UI components
- **Database & Auth**: Supabase (PostgreSQL, Storage, Auth)
- **Data Fetching**: TanStack Query (React Query) for client-side infinite scrolling, Next.js "use cache" for server-side queries.
- **Form Handling**: React Hook Form with Zod validation.
- **State Management**: Primarily URL-based state for filters and React Query for server state.

## Core Purpose
A peer-to-peer vehicle marketplace platform specifically designed for the Mizoram region, focusing on ease of use, zero commission fees, and local localization (e.g., district-based filtering).

## Folder Interaction & Data Flow
- **`app/`**: Defines routes and layouts. Uses Server Components by default. Pages in `(public)` use `lib/queries` for initial data.
- **`action/`**: Contains "use server" functions for mutations (publishing listings, auth). They handle database writes and cache revalidation.
- **`components/`**: Organized by feature (auth, listings, navbar, sell, vehicles). `ui/` contains reusable atomic components.
- **`lib/`**:
    - `supabase/`: Client and server factories for Supabase access.
    - `queries/`: Centralized data fetching logic using Next.js caching directives.
    - `filter/`: Logic for parsing and building URL search parameters for vehicle filtering.
    - `vehicle/`: Specialized logic like image processing and compression.
- **`hooks/`**: Custom React hooks (e.g., `debounce.jsx`) for reusable client-side logic.

### Data Flow Example: Publishing a Listing
1. `components/sell/sellform.jsx` collects user input.
2. `lib/vehicle/imageprocesssing/uploadImages.js` uploads photos to Supabase Storage.
3. `action/vehicle.js` (`publishVehicleListing`) is called with the metadata and image paths.
4. The action validates data with Zod, inserts into the `vehicles` table, moves images to permanent storage, and calls `revalidateTag`.

## Coding Standards & Patterns
- **Server Actions**: All mutations must be in the `action/` folder and use "use server".
- **Caching**: Use Next.js 15+ "use cache" directive in `lib/queries` for data that doesn't change frequently. Use `cacheTag` for manual revalidation.
- **Components**: Prefer Server Components for data display and Client Components only when interactivity (hooks, state) is required.
- **Naming**:
    - Components: PascalCase (e.g., `VehicleCard.jsx`).
    - Libs/Actions: camelCase (e.g., `get-vehicle.js`, `auth.js`).
- **Safety**: Always validate input using Zod schemas (found in component folders or shared lib). Check `auth.getUser()` in Server Actions to ensure the user is authorized.
- **Styling**: Use Tailwind utility classes. Keep complex conditional classes clean with `cn()` utility.
