import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { isAllowedAdminEmail } from "@/lib/admin-auth";

async function redirectForAllowedAdmin(supabase: ReturnType<typeof createClient>, origin: string, next: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAllowedAdminEmail(user?.email)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/admin?error=unauthorized`);
  }

  return NextResponse.redirect(`${origin}${next}`);
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/admin/dashboard";
  const supabase = createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return redirectForAllowedAdmin(supabase, origin, next);
    }

    return NextResponse.redirect(`${origin}/admin/forgot-password?error=invalid_or_expired_link`);
  }

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash: tokenHash,
    });

    if (!error) {
      return redirectForAllowedAdmin(supabase, origin, next);
    }

    return NextResponse.redirect(`${origin}/admin/forgot-password?error=invalid_or_expired_link`);
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/admin/forgot-password?error=invalid_or_expired_link`);
}
