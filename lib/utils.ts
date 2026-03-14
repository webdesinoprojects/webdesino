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

export function getStorageUrl(path: string | undefined | null) {
  if (!path) return "";

  const normalizedPath = path.trim();
  if (!normalizedPath) return "";

  // Already absolute URLs (or data URIs) should pass through untouched.
  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://") ||
    normalizedPath.startsWith("data:")
  ) {
    return normalizedPath;
  }

  // Public assets in /public.
  if (normalizedPath.startsWith("/")) {
    return normalizedPath;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    const base = supabaseUrl.replace(/\/$/, "");
    const cleanPath = normalizedPath.replace(/^\/+/, "");
    return `${base}/storage/v1/object/public/images/${cleanPath}`;
  }

  // Ensure Next/Image always gets a valid absolute local path, even without env config.
  return `/${normalizedPath.replace(/^\/+/, "")}`;
}

