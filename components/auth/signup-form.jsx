"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "./password-input";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/debounce";
import { signUpAction } from "@/action/auth";
import { Input } from "../ui/input";
import { Smartphone } from "lucide-react";
import { GoogleSignInButton } from "./googleSignInButton";
import { SpinnerButton } from "../spinnerbutton";
import { FcSmartphoneTablet } from "react-icons/fc";

export function SignupForm({ ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const debouncedEmail = useDebounce(email);
  const debouncedPassword = useDebounce(password);
  const debouncedConfirmPassword = useDebounce(confirmPassword);

  const isEmailValid =
    debouncedEmail.includes("@") && debouncedEmail.includes(".");
  const isPasswordValid = debouncedPassword.length >= 8;
  const doPasswordsMatch =
    debouncedPassword === debouncedConfirmPassword &&
    debouncedPassword.length > 0;

  const isFormValid = isEmailValid && isPasswordValid && doPasswordsMatch;

  const getInputStyle = (value, isValid) => {
    if (!value) return "";

    return isValid
      ? "border-green-300 focus-visible:ring-green-300"
      : "border-red-300 focus-visible:ring-red-300";
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("confirmPassword", confirmPassword);

      const res = await signUpAction(formdata);

      if (res?.error) {
        setError(res.error);
        toast.error(res.error);
        setIsLoading(false);
        return;
      }

      toast.success(
        "Account created successfully! Please check your email to verify your account.",
      );
      router.push("/login");
      
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // const signInWithGoogle = async () => {
  //   setIsGoogleLoading(true);
  //   const supabase = createClient();

  //   try {
  //     const { error } = await supabase.auth.signInWithOAuth({
  //       provider: "google",
  //       options: {
  //         redirectTo: `${window.location.origin}/callback`,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error signing in with Google:", error.message);
  //     toast.error("An unexpected error occurred. Please try again.");
  //   } finally {
  //     setIsGoogleLoading(false);
  //   }
  // };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription className="text-xs">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                // required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                className={getInputStyle(debouncedEmail, isEmailValid)}
              />              
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <PasswordInput
                // required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="********"
                minLength={8}
                className={getInputStyle(debouncedPassword, isPasswordValid)}
              />
              <FieldDescription className="text-xs">
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <PasswordInput
                // required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirm-password"
                placeholder="********"
                minLength={8}
                className={getInputStyle(
                  debouncedConfirmPassword,
                  doPasswordsMatch,
                )}
              />
            </Field>
            <FieldGroup>
              <Field>
                {/* <Button type="submit" disabled={isLoading || !isFormValid}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>                 */}
                <SpinnerButton type="submit" 
                loadingText="Creating account..." 
                isLoading={isLoading}
                >
                  Create Account
                </SpinnerButton>
                <GoogleSignInButton />
                <Button variant="outline">
                  <Link href="/phone" className="flex gap-3 items-center justify-center">
                    <FcSmartphoneTablet className="h-4 w-4" />
                    Continue with Phone
                  </Link>
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
          {error && (
            <p className="text-red-500 text-sm mt-2">
              An error occurred. Please check your credentials and try again.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
