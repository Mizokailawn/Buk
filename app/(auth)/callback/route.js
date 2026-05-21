import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
    const requestUrl = new URL(request.url)
    console.log("FUll request:", requestUrl)
    const code = requestUrl.searchParams.get("code")

    if (!code) {
        console.error("No OAuth code found");
        return NextResponse.redirect(new URL("/login", request.url))
    }

    const supabase = await createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
        console.error("OAuth error:", error.message)
        return NextResponse.redirect(new URL("/login", request.url))
    }    

    return NextResponse.redirect(new URL("/", request.url)) 
}