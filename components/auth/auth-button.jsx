"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "./logout-button";
import { Button } from "../ui/button";

export function AuthButton({ initialUser }) {
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
        <LogoutButton />
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-center">
      <Button asChild variant="outline">
        <Link href="/login">Login</Link>
      </Button>
    </div>
  );
}
