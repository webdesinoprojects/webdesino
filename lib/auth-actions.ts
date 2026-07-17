"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { isAllowedAdminEmail, normalizeAdminEmail } from "@/lib/admin-auth";

function normalizeOrigin(value?: string | null) {
  if (!value) return null;

  try {
    const url = value.startsWith("http") ? new URL(value) : new URL(`https://${value}`);
    return url.origin;
  } catch {
    return null;
  }
}

function isLocalOrigin(origin: string) {
  try {
    const hostname = new URL(origin).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function resolveAppOrigin() {
  const envOrigins = [
    normalizeOrigin(process.env.FRONTEND_URL),
    normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL),
    normalizeOrigin(process.env.SITE_URL),
    normalizeOrigin(process.env.VERCEL_URL),
  ].filter((origin): origin is string => Boolean(origin));

  const headerStore = headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? (process.env.NODE_ENV === "production" ? "https" : "http");
  const headerOrigin = host ? normalizeOrigin(`${proto}://${host}`) : null;

  const candidates = [...envOrigins, headerOrigin].filter((origin): origin is string => Boolean(origin));

  if (process.env.NODE_ENV === "production") {
    const nonLocalCandidate = candidates.find((candidate) => !isLocalOrigin(candidate));
    if (nonLocalCandidate) {
      return nonLocalCandidate;
    }
  }

  return candidates[0] ?? "http://localhost:3000";
}

export async function login(formData: FormData) {
  const email = normalizeAdminEmail(formData.get("email") as string);
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  if (!isAllowedAdminEmail(email)) {
    return { success: false, error: "Invalid credentials. Please try again." };
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Admin login failed:", error.message);
    return { success: false, error: "Invalid credentials. Please try again." };
  }

  if (!isAllowedAdminEmail(data.user?.email)) {
    await supabase.auth.signOut();
    return { success: false, error: "Invalid credentials. Please try again." };
  }

  return { success: true };
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin");
}

export async function forgotPassword(formData: FormData) {
  const email = normalizeAdminEmail(formData.get("email") as string);

  if (!email) {
    return { success: false, error: "Email is required" };
  }

  if (!isAllowedAdminEmail(email)) {
    return { success: true };
  }

  const supabase = createClient();
  const origin = resolveAppOrigin().trim();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/admin/reset-password`,
  });

  if (error) {
    console.error("Admin password reset email failed:", error.message);
    return { success: false, error: "Unable to send reset instructions right now. Please try again later." };
  }

  return { success: true };
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const supabase = createClient();
  const {
    data: { user: currentUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !isAllowedAdminEmail(currentUser?.email)) {
    return { success: false, error: "This reset link is not authorized for admin access." };
  }

  if (!password || !confirmPassword) {
    return { success: false, error: "Password and confirm password are required" };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }

  const { data: { user }, error } = await supabase.auth.updateUser({ password });

  if (error) {
    console.error("Admin password update failed:", error.message);
    return { success: false, error: "Unable to update password right now. Please request a new reset link." };
  }

  // Keep Prisma Admin table in sync
  if (user?.email) {
    try {
      const hashedPassword = await hash(password, 12);
      await prisma.admin.updateMany({
        where: { email: user.email },
        data: { password: hashedPassword },
      });
    } catch {
      // Prisma sync failure is non-critical; Supabase Auth is the source of truth
    }
  }

  return { success: true };
}

