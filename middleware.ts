import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that are protected (dashboard, profile, etc.)
  // Everything under /admin except the root /admin (which is login)
  const isProtectedPath = path.startsWith("/admin/") && path !== "/admin";
  
  // Define paths that are for public auth (login page is /admin)
  const isAuthPath = path === "/admin";

  const token = request.cookies.get("session")?.value;
  const session = token ? await verifyToken(token) : null;

  // If trying to access protected path without valid session
  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If trying to access auth path with valid session
  if (isAuthPath && session) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
