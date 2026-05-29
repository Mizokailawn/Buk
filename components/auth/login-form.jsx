"use client";

import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PasswordInput } from "./password-input";
import { loginAction } from "@/action/auth";
import { SpinnerButton } from "../shared/spinnerbutton";
import { LogInIcon } from "lucide-react";
import { GoogleSignInButton } from "./googleSignInButton";
import { Smartphone } from "lucide-react";

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();  

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      const res = await loginAction(formdata);      

      if (res?.error) {
        toast.error(res.error);
        setError(res.error);
        return;
      }

      toast.success("Logged in successfully!");
      router.refresh();
      router.push("/");
    } catch (err) {
      console.error("Unexpected error during login:", err);
      toast.error("An unexpected error occurred. Please try again.");
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleLogin}
            className="grid w-full items-center gap-6"
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  required
                />
              </Field>
              <Field>
                <SpinnerButton
                  type="submit"
                  isLoading={isLoading}
                  icon={<LogInIcon className="h-4 w-4" />}
                  className="flex items-center justify-center"
                >
                  Login
                </SpinnerButton>                
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
          <div className="flex justify-center items-center text-xs py-2">
            OR
          </div>
          <GoogleSignInButton />
          <Button variant="outline" className="flex w-full">
            <Link
              href="/phone"
              className="flex gap-3 items-center justify-center"
            >
              <Smartphone className="h-4 w-4" />
              Continue with Phone
            </Link>
          </Button>
        </CardContent>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </Card>
    </div>
  );
}
