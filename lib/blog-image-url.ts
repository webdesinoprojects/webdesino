import { isCdnUrlPointingAtWebdesinoSite } from "./utils";

/**
 * Normalize image URLs inside blog HTML for bandwidth: prefer CDN over direct Supabase.
 * Same path layout as getStorageUrl() for the `images` bucket.
 */
export function normalizeBlogImageSrc(src: string): string {
  if (!src || src.startsWith("data:")) return src;

  const rawCdn = process.env.NEXT_PUBLIC_CDN_URL?.replace(/\/$/, "");
  const cdnBase =
    rawCdn && !isCdnUrlPointingAtWebdesinoSite(rawCdn) ? rawCdn : null;

  if (
    cdnBase &&
    src.includes("supabase.co") &&
    src.includes("/object/public/images/")
  ) {
    const marker = "/object/public/images/";
    const idx = src.indexOf(marker);
    if (idx !== -1) {
      const after = src.slice(idx + marker.length);
      const pathOnly = after.split("?")[0];
      try {
        const decoded = decodeURIComponent(pathOnly);
        return `${cdnBase}${marker}${decoded}`;
      } catch {
        return `${cdnBase}${marker}${pathOnly}`;
      }
    }
  }

  return src;
}
