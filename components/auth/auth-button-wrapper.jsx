import { createClient } from '@/lib/supabase/server'
import React from 'react'
import { AuthButton } from './auth-button';

const AuthButtonWrapper = async() => {
    const supabase = await createClient();

    const { data: {user} } = await supabase.auth.getUser()

  return (
    <div><AuthButton initialUser={user} /></div>
  )
}

export default AuthButtonWrapper