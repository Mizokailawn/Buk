import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
    let supabaseResponse = await NextResponse.next({
        request,
    }) 

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiestoSet) {
                    cookiestoSet.forEach(({name, value }) =>
                        request.cookies.set(name, value),                     
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiestoSet.forEach(({name, value, options}) =>
                        supabaseResponse.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    const { data } = await supabase.auth.getClaims();
    const user = data?.claims;

    if (
        request.nextUrl.pathname !== "/" &&
        !user &&
        !request.nextUrl.pathname.startsWith("/login") &&
        !request.nextUrl.pathname.startsWith("/signup") &&
        !request.nextUrl.pathname.startsWith("/callback") &&
        !request.nextUrl.pathname.startsWith("/phone") &&
        !request.nextUrl.pathname.startsWith("/forgot-password") && 
        !request.nextUrl.pathname.startsWith("/update-password")
    ) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}