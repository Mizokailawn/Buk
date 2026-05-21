"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


// This action handles user signup on the server side. It validates the input and creates a new user in Supabase.
export async function signUpAction(formData) {
  const supabase = await createClient();

  const email = formData.get("email")?.trim().toLowerCase();
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  // Validation
  if (!email || !password || !confirmPassword) {
    return { error: "Missing fields" };
  }

  if (!email.includes("@") || !email.includes(".")) {
    return { error: "Invalid email address" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters long" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_BASE_URL,
      data: {
        role: "user",
      },
    },
  });

  if (error) {
    console.error("Signup error:", error.message);

    if (error.message.toLowerCase().includes("already")) {
      return { error: "Email already in use. Please log in instead." };
    }

    return { error: "Something went wrong. Please try again." };
  }

    return { success: true };
}

// =========================================================================
// This action handles user login on the server side. It validates the input and authenticates the user with Supabase.
// =========================================================================

export async function loginAction(formData) {
  const supabase = await createClient();

  const email = formData.get("email")?.trim().toLowerCase();
  const password = formData.get("password");

  // Validation
  if (!email || !password) {
    return { error: "Missing fields" };
  }

  if (!email.includes("@") || !email.includes(".")) {
    return { error: "Invalid email address" };
  }  

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error.message);
    return { error: "Invalid email or password" };
  }  

  return { success: true };
}

// =============================================================================
// Send OTP action
// =============================================================================

export async function sendOtpAction(phone) {
  const supabase = await createClient();

  // 🔥strict validation
  if (!phone) {
    return { error: "Phone number is required" };
  }

  try {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    if (error) {
      console.log("Error with Otp:", error.message);

      // 🔥return structured error
      return { error: error.message };
    }

    return { success: true };

  } catch (err) {
    console.error("Send OTP fatal error:", err);

    // 🔥consistent fallback error
    return { error: "Failed to send OTP. Try again." };
  }
}


// =============================================================================
// Verify OTP
// =============================================================================

export async function verifyOtpAction(phone, token) {
  const supabase = await createClient();

  // 🔥 validation
  if (!phone || !token) {
    return { error: "Missing phone or OTP" };
  }

  if (token.length !== 6) {
    return { error: "OTP must be 6 digits" };
  }

  try {
    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });

    if (error) {
      console.log("OTP verify error:", error.message);

      // 🔥 return error instead 
      return { error: error.message };
    }

    return { success: true, redirect: "/" };

  } catch (err) {
    console.error("Verify OTP fatal error:", err);

    // 🔥 fallback error
    return { error: "Verification failed. Try again." };
  }
}
