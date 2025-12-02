"use server";

import prisma from "@/lib/prisma";
import { comparePassword } from "@/lib/auth";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  try {
    const user = await prisma.admin.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: "Invalid credentials" };
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return { success: false, error: "Invalid credentials" };
    }

    const token = await signToken({ id: user.id, email: user.email, name: user.name });

    cookies().set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Failed to login" };
  }
}

export async function logout() {
  cookies().delete("session");
  redirect("/admin/login");
}
