"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, CheckCircle, Mail, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    try {
      const result = await forgotPassword(formData);
      if (result?.success) {
        setIsSuccess(true);
      } else {
        setError(result?.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to send reset link right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#070B1A] via-[#101B47] to-[#31215F] p-4">
      {/* Radial glows */}
      <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 right-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-[20px] border border-white/10 bg-white/10 p-10 shadow-[0_20px_60px_rgba(5,8,25,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl sm:p-12">

          {isSuccess ? (
            <div className="flex flex-col items-center text-center space-y-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-[0_10px_25px_rgba(40,80,255,0.35)]">
                <CheckCircle className="h-8 w-8 text-cyan-200" />
              </div>
              <h1 className="text-2xl font-bold text-white">Check your inbox</h1>
              <p className="text-sm text-blue-100/75">
                If an account exists with that email, we've sent password reset instructions. Check your spam folder too.
              </p>
              <Link
                href="/admin"
                className="mt-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(53,94,255,0.45)] transition-transform duration-200 hover:scale-[1.01]"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col items-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-[0_10px_25px_rgba(40,80,255,0.35)]">
                  <KeyRound className="h-7 w-7 text-cyan-200" />
                </div>
                <h1 className="text-center text-3xl font-bold tracking-tight text-white">Reset Password</h1>
                <p className="mt-2 text-center text-sm text-blue-100/80">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-blue-100/75">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/60" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@company.com"
                      required
                      className="h-12 rounded-xl border border-white/20 bg-white/10 pl-11 text-white placeholder:text-blue-100/45 transition-all duration-200 focus:border-cyan-300/70 focus:bg-white/15 focus:ring-4 focus:ring-cyan-300/20"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg border border-rose-300/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
                    {error}
                  </p>
                )}

                <Button
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#4F46E5] text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(53,94,255,0.45)] transition-transform duration-200 hover:scale-[1.01] hover:from-[#4B8EF8] hover:to-[#5B52F0] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_14px_34px_rgba(53,94,255,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <div className="flex justify-center pt-1">
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-xs text-blue-100/60 transition-colors hover:text-cyan-200"
                  >
                    <ArrowLeft size={13} />
                    Back to Login
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
