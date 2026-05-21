"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/debounce";
import { PasswordInput } from "./password-input";

export default function UpdateUser(
    {className,
    ...props    
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const debouncedPassword = useDebounce(password);
  const debouncedConfirmPassword = useDebounce(confirmPassword);

  const isPasswordValid = debouncedPassword.length >= 8;
  const doPasswordsMatch = debouncedPassword === debouncedConfirmPassword &&
    debouncedPassword.length > 0;

  const isFormValid = isPasswordValid && doPasswordsMatch;

    const getInputStyle = (value, isValid) => {
    if (!value) return "";

    return isValid
      ? "border-green-300 focus-visible:ring-green-300"
      : "border-red-300 focus-visible:ring-red-300";
    };

  const supabase = createClient();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({
      password: password,
      confirmPassword: confirmPassword,
    });

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    if (error) {
      setMessage(error.message);
      toast.error("Failed to update password. Please try again.");
    } else {
      setMessage("Password updated successfully! You can now log in using your new Password.");
      toast.success("Password updated successfully!");
      setTimeout(() => router.push("/auth/login"), 1500);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            Enter your New Password
          </CardDescription>          
        </CardHeader>
        <CardContent>
            <form onSubmit={handleUpdate} className="grid w-full items-center gap-6">
                <Field>
                    <FieldLabel htmlFor="New Password">New Password</FieldLabel>
                    <PasswordInput 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} id="password" required placeholder="**********"
                    className = {getInputStyle(debouncedPassword, isPasswordValid)} />
                    <FieldLabel htmlFor="Confirm Password" className="mt-5">Confirm New Password</FieldLabel>
                    <PasswordInput 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" required placeholder="**********"
                    className = {getInputStyle(debouncedConfirmPassword, doPasswordsMatch)} />                   
                </Field>
                <Button type="submit" disabled={!isFormValid}>Update Password</Button>
            </form>
        </CardContent>
        {message && <p className="items-center justify-center text-sm">{message}</p>}
       </Card>
    </div>
  );
}