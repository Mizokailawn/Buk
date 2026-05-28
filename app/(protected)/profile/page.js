import { createClient } from '@/lib/supabase/server';
import React, { Suspense } from 'react'

async function UserDetails() {
  const supabase = await createClient();
  //const { data, error } = await supabase.auth.getClaims();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return "Not logged in";
  }

  return JSON.stringify(data.user, null, 2);
}

const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4 text-foreground">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto bg-background text-foreground">
          <Suspense>        
             <UserDetails />
          </Suspense>
        </pre>
    </div>
  )
}

export default ProfilePage