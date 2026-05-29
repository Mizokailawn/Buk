"use client";

import { useState, useEffect, useRef } from "react"; // 🔥 CHANGED
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { sendOtpAction, verifyOtpAction } from "@/action/auth";
import { Spinner } from "../ui/spinner";
import { SpinnerButton } from "../shared/spinnerbutton";

export function PhoneAuth({ className, ...props }) {
  const [phone, setPhone] = useState("");
  const [formatted, setFormatted] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("phone");

  const [sending, setSending] = useState(false);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 Cooldown timer
  const [cooldown, setCooldown] = useState(0);

  // 🔥 Request lock (Prevent double click)
  const lockRef = useRef(false);

  const router = useRouter();

  // =============================================================================
  // 🔥 Persist state across refresh
  // =============================================================================
  useEffect(() => {
    const saved = localStorage.getItem("otp_state");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFormatted(data.formatted || "");
        setStep(data.step || "phone");
      } catch (e) {
        console.error("Failed to parse saved state");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("otp_state", JSON.stringify({ formatted, step }));
  }, [formatted, step]);

  // =============================================================================
  // 🔥 Cooldown countdown
  // =============================================================================
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  function formatPhone(input) {
    const p = parsePhoneNumberFromString(input, "IN");
    return p && p.isValid() ? p.number : null;
  }

  // =============================================================================
  // SEND OTP
  // =============================================================================
  async function handleSendOtp(e) {
    e.preventDefault();

    // 🔥 Prevent race condition
    if (lockRef.current) return;
    lockRef.current = true;

    setSending(true);
    setError(null);

    const formattedPhone = formatPhone(phone);

    if (!formattedPhone) {
      toast.error("Invalid phone number");
      lockRef.current = false;
      setSending(false);
      return;
    }

    setFormatted(formattedPhone);

    try {
      const res = await sendOtpAction(formattedPhone);

      if (res && res.error) {
        toast.error(res.error);
        setError(res.error);
        return;
      }

      // 🔥 Start cooldown
      setCooldown(45);

      setStep("otp");
    } catch (err) {
      console.error(err);
      toast.error("Network error. Try again.");
      setError("Network error");
    } finally {
      setSending(false);
      lockRef.current = false; // 🔥 NEW
    }
  }

  // 🔥 Resend OTP without leaving OTP screen
  async function handleResendOtp() {
    if (lockRef.current || cooldown > 0) return;

    lockRef.current = true;
    setResending(true);
    setError(null);

    if (!formatted) {
      toast.error("Session expired. Please enter phone again.");
      resetFlow();
      lockRef.current = false;
      setResending(false);
      return;
    }

    try {
      const res = await sendOtpAction(formatted);

      if (res && res.error) {
        toast.error(res.error);
        setError(res.error);
        return;
      }

      toast.success("New OTP sent");
      setCooldown(45);
    } catch (err) {
      console.error(err);
      toast.error("Failed to resend OTP");
      setError("Failed to resend OTP");
    } finally {
      setResending(false);
      lockRef.current = false;
    }
  }

  // =============================================================================
  // VERIFY OTP
  // =============================================================================
  async function handleVerifyOtp(e) {
    e.preventDefault();

    // 🔥 NEW: lock
    if (lockRef.current) return;
    lockRef.current = true;

    setVerifying(true);
    setError(null);

    if (!formatted) {
      toast.error("Session expired. Please enter phone again.");
      resetFlow();
      lockRef.current = false;
      setVerifying(false);
      return;
    }

    if (otp.length !== 6) {
      toast.error("Invalid OTP");
      lockRef.current = false;
      setVerifying(false);
      return;
    }

    try {
      const res = await verifyOtpAction(formatted, otp);

      if (res && res.error) {
        toast.error(res.error); // 🔥 CHANGED (real error)
        setError(res.error);
        return;
      }

      toast.success("Logged in successfully");

      // 🔥 NEW: clear persisted state
      localStorage.removeItem("otp_state");
      router.refresh();
      router.push((res && res.redirect) || "/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      setError("Something went wrong");
    } finally {
      setVerifying(false);
      lockRef.current = false;
    }
  }

  // =============================================================================
  // 🔥 NEW: clean reset
  // =============================================================================
  function resetFlow() {
    setStep("phone");
    setPhone("");
    setFormatted("");
    setOtp("");
    setError(null);
    setCooldown(0);
    localStorage.removeItem("otp_state");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {step === "phone" ? "Login with Phone" : "Verify OTP"}
          </CardTitle>

          <CardDescription>
            {step === "phone"
              ? "Enter your phone number to receive an OTP"
              : `Enter the OTP sent to ${formatted}`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="grid gap-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                  <Input
                    id="phone"
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <Button disabled={sending || cooldown > 0} type="submit">
                    {sending ? (
                      <div className="flex gap-2 items-center justify-center">
                        <Spinner className="flex h-4 w-4" />
                        Sending...
                      </div>
                    ) : cooldown > 0 ? (
                      `Wait ${cooldown}s`
                    ) : (
                      "Send OTP"
                    )}
                  </Button>

                  <FieldDescription className="text-center">
                    We’ll send a one-time password to your phone
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="grid gap-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="otp">OTP</FieldLabel>
                  <Input
                    id="otp"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    maxLength={6}
                    required
                  />
                </Field>

                <Field>
                  <SpinnerButton
                    type="submit"
                    isLoading={verifying}
                    loadingText="Verifying..."
                  >
                    Verify OTP
                  </SpinnerButton>                  

                  {/* 🔥 Resend OTP */}
                  <Button
                    type="button"
                    variant="outline"
                    disabled={resending || cooldown > 0}
                    onClick={handleResendOtp}
                  >
                    {resending ? (
                      <div className="flex items-center justify-center gap-2">
                        <Spinner className="h-4 w-4" />
                        Resending OTP...
                      </div>
                    ) : cooldown > 0 ? (
                      `Retry in ${cooldown}s`
                    ) : (
                      "Resend OTP"
                    )}
                  </Button>

                  {/* 🔥 Reset */}
                  <Button type="button" variant="ghost" onClick={resetFlow}>
                    Change phone number
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}

          {error && (
            <div className="text-red-500 text-center text-sm mt-2">{error}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
