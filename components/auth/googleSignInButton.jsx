"use client"

import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"
import { signInWithGoogle } from "@/action/googlesignin"
import { Spinner } from "../ui/spinner"
import { SpinnerButton } from "../spinnerbutton"

export function GoogleSignInButton() {

    const [loading, setLoading] = useState(false)
    
    const handleSignIn = async() => {

        if(loading) return

        try{
            setLoading(true)
            await signInWithGoogle()
        } catch(err) {
            console.log("Google sign-in error: ", err)
            setLoading(false)
        }
    }
        
  return (
    // <Button onClick={handleSignIn} disabled={loading} variant="outline" className="flex w-full gap-2 items-center justify-center">        
    //     {loading ? (
    //         <div className="flex gap-3 items-center justify-center">
    //             <Spinner className="w-4 h-4"/>
    //             Please Wait...
    //         </div>
    //     ) : (
    //         <div className="flex gap-3 items-center justify-center">
    //             <FcGoogle className="h-4 w-4" />
    //             Continue with Google
    //         </div>
    //     )}
    // </Button>
    <SpinnerButton onClick={handleSignIn}        
    isLoading={loading}
    icon={<FcGoogle className="h-4 w-4"/>}
    spinner={<Spinner className="h-4 w-4" />}
    variant="outline"        
    >Continue with Google
    </SpinnerButton>
  )
}

