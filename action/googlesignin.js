import { createClient } from "@/lib/supabase/client";

export async function signInWithGoogle () {
    
    const supabase = createClient()    

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${window.location.origin}/callback`,
        }
    })

    if (error) {
        console.log("Google sign-in error: ", error.message)        
    }    

    return { data, error }
}