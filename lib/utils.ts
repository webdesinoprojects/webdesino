import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const LOCATION_PLACEHOLDER_REGEX = /\{\{\s*location\s*\}\}|\{\s*location\s*\}/gi

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function replaceLocationPlaceholder(
  value: string | null | undefined,
  location = "Delhi NCR"
) {
  if (!value) return ""

  return value.replace(LOCATION_PLACEHOLDER_REGEX, location)
}

const STORAGE_PUBLIC_PREFIX = "/storage/v1/object/public/images/";

/**
 * Some content stores Supabase public object URLs with the site origin (webdesino.com).
 * That path is not served by Next.js — only *.supabase.co (or CDN) has the bytes.
 * Rewrite so next/image and browsers fetch the real object URL.
 */
export function rewriteSiteOriginStorageUrlToSupabase(url: string): string {
  const supabaseBase = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!supabaseBase) return url;

  let toParse = url.trim();
  if (toParse.startsWith("//")) {
    toParse = `https:${toParse}`;
  }

  try {
    const u = new URL(toParse);
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();
    if (host !== "webdesino.com") return url;
    if (!u.pathname.includes(STORAGE_PUBLIC_PREFIX)) return url;
    return `${supabaseBase}${u.pathname}${u.search}`;
  } catch {
    return url;
  }
}

/** True when CDN env points at the marketing domain — storage URLs are not served there unless proxied. */
export function isCdnUrlPointingAtWebdesinoSite(cdnUrl: string): boolean {
  try {
    const host = new URL(cdnUrl).hostname.replace(/^www\./i, "").toLowerCase();
    return host === "webdesino.com";
  } catch {
    return false;
  }
}

export function getStorageUrl(path: string | undefined | null) {
  if (!path) return "";

  const normalizedPath = path.trim();
  if (!normalizedPath) return "";

  if (normalizedPath.startsWith("data:")) {
    return normalizedPath;
  }

  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://")
  ) {
    return rewriteSiteOriginStorageUrlToSupabase(normalizedPath);
  }

  // Public assets in /public.
  if (normalizedPath.startsWith("/")) {
    return normalizedPath;
  }

  // CRITICAL FIX: Use CDN URL if available, fallback to Supabase
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (cdnUrl && !isCdnUrlPointingAtWebdesinoSite(cdnUrl)) {
    const base = cdnUrl.replace(/\/$/, "");
    const cleanPath = normalizedPath.replace(/^\/+/, "");
    return `${base}/storage/v1/object/public/images/${cleanPath}`;
  }
  
  if (supabaseUrl) {
    const base = supabaseUrl.replace(/\/$/, "");
    const cleanPath = normalizedPath.replace(/^\/+/, "");
    return `${base}/storage/v1/object/public/images/${cleanPath}`;
  }

  // Ensure Next/Image always gets a valid absolute local path, even without env config.
  return `/${normalizedPath.replace(/^\/+/, "")}`;
}

