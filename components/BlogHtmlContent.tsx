import { transformBlogImagesInHtml } from "@/lib/transform-blog-html";

type BlogHtmlContentProps = {
  html: string;
  className?: string;
};

/** Renders blog HTML on the server; rewrites <img> to /_next/image for raster assets. */
export default function BlogHtmlContent({ html, className }: BlogHtmlContentProps) {
  if (!html) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: transformBlogImagesInHtml(html) }}
    />
  );
}
