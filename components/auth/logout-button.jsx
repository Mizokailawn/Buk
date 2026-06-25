"use client"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";


 export function LogoutButton({ onNavigate }) {    
    
    const handleLogout = async () => {
        const supabase = createClient();
        const { error } = await supabase.auth.signOut();

        if (error) {
            toast.error("Logout failed: ", error.message)
            return
        }

        onNavigate?.()
        toast.success("Logged out successfully!");

        window.location.href = "/"
    }
    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    );
 }

