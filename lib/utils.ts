import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStorageUrl(path: string | undefined | null) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  // If it starts with /, assume it's a local public asset
  if (path.startsWith("/")) return path;
  
  // If it's a relative path (not starting with /), assume it's uploaded to 'images' bucket
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return path; // Fallback to local if no env var
  
  return `${supabaseUrl}/storage/v1/object/public/images/${path}`;
}

