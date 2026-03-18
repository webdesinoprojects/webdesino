import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { employeeNameToSlug } from '@/lib/employee-paths'

const EMPLOYEE_SESSION_COOKIE = 'employee_token'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname;
  const isAdminPublicPath = path === "/admin" || path === "/admin/forgot-password" || path === "/admin/reset-password" || path === "/admin/auth-error";
  const isProtectedPath = path.startsWith("/admin/") && !isAdminPublicPath;
  const isAuthPath = path === "/admin";
  const isEmployeeProtectedPath = path.startsWith("/employee/dashboard");
  const isEmployeeAuthPath = path === "/employee/login";
  const employeeNamedMatch = path.match(/^\/employee\/([^/]+)\/dashboard(\/.*)?$/);

  // If trying to access protected path without valid session
  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // If trying to access auth path with valid session
  if (isAuthPath && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isEmployeeProtectedPath || isEmployeeAuthPath) {
    const employeeToken = request.cookies.get(EMPLOYEE_SESSION_COOKIE)?.value;
    const employeePayload = employeeToken ? await verifyToken(employeeToken) : null;
    const hasEmployeeSession = Boolean(employeePayload && employeePayload.type === "employee");

    if (isEmployeeProtectedPath && hasEmployeeSession) {
      const name = String((employeePayload as any).name || "");
      const slug = employeeNameToSlug(name);
      const suffix = path.replace("/employee/dashboard", "");
      const nextUrl = new URL(`/employee/${slug}/dashboard${suffix}${request.nextUrl.search}`, request.url);
      return NextResponse.redirect(nextUrl);
    }

    if (isEmployeeProtectedPath && !hasEmployeeSession) {
      return NextResponse.redirect(new URL("/employee/login", request.url));
    }
  }

  if (employeeNamedMatch) {
    const employeeToken = request.cookies.get(EMPLOYEE_SESSION_COOKIE)?.value;
    const employeePayload = employeeToken ? await verifyToken(employeeToken) : null;
    const hasEmployeeSession = Boolean(employeePayload && employeePayload.type === "employee");

    if (!hasEmployeeSession) {
      return NextResponse.redirect(new URL("/employee/login", request.url));
    }

    const name = String((employeePayload as any).name || "");
    const expectedSlug = employeeNameToSlug(name);
    const slugInPath = employeeNamedMatch[1];
    const suffix = employeeNamedMatch[2] || "";

    if (slugInPath !== expectedSlug) {
      const canonical = new URL(`/employee/${expectedSlug}/dashboard${suffix}${request.nextUrl.search}`, request.url);
      return NextResponse.redirect(canonical);
    }

    const rewritten = request.nextUrl.clone();
    rewritten.pathname = `/employee/dashboard${suffix}`;
    return NextResponse.rewrite(rewritten);
  }

  return response
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/employee/:path*",
  ],
};
