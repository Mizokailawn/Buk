"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "../ui/button"

export function LogOut({onNavigate}) {
    console.log("New logout component")
    const router = useRouter()

    const handleLogout = async() => {
        const supabase = createClient()
        await supabase.auth.signOut()
        onNavigate?.() 
        router.replace("/")
        router.refresh()      
        toast.success("Successfully logged out") 
    }
    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    )
}