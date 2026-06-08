"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export default function ForgotPasswordForm(
    {className, 
        ...props
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClient();

  const handleReset = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the reset link.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your registered email to reset your password
          </CardDescription>          
        </CardHeader>
        <CardContent>
            <form onSubmit={handleReset} className="grid w-full items-center gap-6">
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="fela@gmail.com" required />                   
                </Field>
                <Button type="submit">Send Reset link</Button>
            </form>
        </CardContent>
        {message && <p>{message}</p>}
       </Card>
    </div> 
  );
}