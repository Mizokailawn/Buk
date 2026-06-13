import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

const ROUTE_POLICY = {
  // Public routes accessible by everyone
  publicExact: new Set([
    "/",
    "/listings",
    "/search",
    "/phone",
    "/callback",
    "/forgot-password",
    "/update-password",
  ]),

  // Dynamic public routes
  publicPrefix: ["/vehicle", "/api/vehicles", "/docs", "/contact-us",],

  // Routes only accessible when NOT authenticated
  guestOnly: new Set([
    "/login",
    "/signup",
  ]),

  // Routes that require authentication
  protectedPrefix: [
    "/sell",
    "/profile",
  ],
};

function getRouteType(pathname) {
  if (ROUTE_POLICY.guestOnly.has(pathname)) {
    return "guestOnly";
  }

  if (ROUTE_POLICY.publicExact.has(pathname)) {
    return "public";
  }

  if (
    ROUTE_POLICY.publicPrefix.some((prefix) =>
      pathname.startsWith(prefix)
    )
  ) {
    return "public";
  }

  if (
    ROUTE_POLICY.protectedPrefix.some((prefix) =>
      pathname.startsWith(prefix)
    )
  ) {
    return "protected";
  }

  // Secure by default
  return "protected";
}

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(
            ({ name, value, options }) => {
              supabaseResponse.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  // Always run so Supabase can refresh sessions
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const routeType = getRouteType(pathname);

  // Protected routes require authentication
  if (routeType === "protected" && (!user || error)) {
    const url = request.nextUrl.clone();

    url.pathname = "/login";

    // Preserve destination after login
    url.searchParams.set(
      "next",
      pathname + request.nextUrl.search
    );

    return NextResponse.redirect(url);
  }

  // Logged-in users should not access guest-only pages
  if (routeType === "guestOnly" && user) {
    const url = request.nextUrl.clone();

    // Change later if you create a dashboard
    url.pathname = "/";

    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}