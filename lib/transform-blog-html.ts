import { normalizeBlogImageSrc } from "@/lib/blog-image-url";
import { getStorageUrl } from "@/lib/utils";

const IMG_TAG_RE = /<img\s+([^>]*?)\s*\/?>/gi;
const OPTIMIZED_WIDTH = 1080;
const OPTIMIZED_QUALITY = 75;

function extractSrc(attrs: string): string | null {
  const d = attrs.match(/\bsrc\s*=\s*"([^"]*)"/i);
  if (d) return d[1];
  const s = attrs.match(/\bsrc\s*=\s*'([^']*)'/i);
  if (s) return s[1];
  return null;
}

function replaceSrcAttr(attrs: string, newSrc: string): string {
  const esc = newSrc.replace(/"/g, "&quot;");
  if (/\bsrc\s*=\s*"[^"]*"/i.test(attrs)) {
    return attrs.replace(/\bsrc\s*=\s*"[^"]*"/i, `src="${esc}"`);
  }
  if (/\bsrc\s*=\s*'[^']*'/i.test(attrs)) {
    return attrs.replace(/\bsrc\s*=\s*'[^']*'/i, `src="${esc}"`);
  }
  return `${attrs} src="${esc}"`;
}

function resolveImgSrc(raw: string): string {
  const t = raw.trim();
  if (!t || t.startsWith("data:")) return t;
  return normalizeBlogImageSrc(getStorageUrl(t));
}

function isSvgUrl(url: string): boolean {
  return /\.svg(\?|#|$)/i.test(url);
}

/**
 * Server-only: rewrite <img src> so traffic does not hit Supabase/full-size blindly.
 * Raster images → same-origin /_next/image (resized WebP/AVIF).
 * SVG / data URLs → leave direct (next/image optimizer is a poor fit for SVG in HTML).
 */
export function transformBlogImagesInHtml(html: string): string {
  if (!html) return html;

  return html.replace(IMG_TAG_RE, (full, attrs: string) => {
    const rawSrc = extractSrc(attrs);
    if (rawSrc == null || !rawSrc.trim()) return full;
    const trimmed = rawSrc.trim();
    if (trimmed.includes("/_next/image")) return full;

    const resolved = resolveImgSrc(trimmed);
    if (!resolved || resolved.startsWith("data:")) return full;

    let newSrc: string;
    if (isSvgUrl(resolved)) {
      newSrc = resolved;
    } else {
      newSrc = `/_next/image?url=${encodeURIComponent(resolved)}&w=${OPTIMIZED_WIDTH}&q=${OPTIMIZED_QUALITY}`;
    }

    let newAttrs = replaceSrcAttr(attrs, newSrc);
    if (!/\bloading\s*=/i.test(newAttrs)) {
      newAttrs += ` loading="lazy"`;
    }
    if (!/\bdecoding\s*=/i.test(newAttrs)) {
      newAttrs += ` decoding="async"`;
    }

    const compact = full.replace(/\s+$/, "");
    const selfClosing = compact.endsWith("/>");
    return selfClosing ? `<img ${newAttrs} />` : `<img ${newAttrs}>`;
  });
}
