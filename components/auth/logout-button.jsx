"use client"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


 export function LogoutButton() {
    const router = useRouter();
    
    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        onLogout?.()
        toast.success("Logged out successfully!");
        router.refresh();
        router.push("/");
    }
    return (
        <Button onClick={handleLogout}>
            Logout
        </Button>
    );
 }

