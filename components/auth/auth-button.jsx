"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "./logout-button";


export function AuthButton({ initialUser, onNavigate }) {
  const [user, setUser] = useState(initialUser);
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (user) {
    return (
      <div className="flex gap-4 items-center">
        <LogoutButton onClick={onNavigate}/>
      </div>
    );
  }

  return (
        <Link href="/login"
        onClick={onNavigate} 
        className="border-2 rounded-md py-2 px-3">
          Login
        </Link>
  );
}
