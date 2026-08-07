"use client";

import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { signInWithGoogle } from "@/action/googlesignin";
import { Spinner } from "../ui/spinner";
import { SpinnerButton } from "../shared/spinnerbutton";

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (loading) return;

    console.log("ORIGIN: ", window.location.origin);

    try {
      setLoading(true);
      await signInWithGoogle();
    } catch (err) {
      console.log("Google sign-in error: ", err);
      setLoading(false);
    }
  };

  return (    
    <SpinnerButton
      onClick={handleSignIn}
      isLoading={loading}
      icon={<FcGoogle className="h-4 w-4" />}
      spinner={<Spinner className="h-4 w-4" />}
      variant="outline"
    >
      Login with Google
    </SpinnerButton>
  );
}
