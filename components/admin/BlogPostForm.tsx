"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ArrowLeft, FileText, ImageIcon, PenSquare, Info } from "lucide-react";
import { createBlogPost, updateBlogPost } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { useRouter } from "next/navigation";

interface BlogPostFormProps {
  post?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    image: string | null;
    content: string | null;
  };
  returnPath?: string;
}

const BLOG_CATEGORIES = [
  "Web Development",
  "SEO",
  "Digital Marketing",
  "Content Marketing",
  "Branding",
  "E-commerce",
  "Case Study",
  "UI/UX",
  "Business Growth",
  "General",
];

const GALLERY_START = "<!--BLOG_GALLERY_START-->";
const GALLERY_END = "<!--BLOG_GALLERY_END-->";

function stripGallery(content: string) {
  const regex = new RegExp(`${GALLERY_START}[\\s\\S]*?${GALLERY_END}`, "g");
  return content.replace(regex, "").trim();
}

function extractGalleryImages(content: string) {
  const match = content.match(new RegExp(`${GALLERY_START}([\\s\\S]*?)${GALLERY_END}`));
  if (!match?.[1]) return [] as string[];
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("http"));
}

function appendGallery(content: string, images: string[]) {
  const clean = stripGallery(content || "");
  if (images.length === 0) return clean;

  const galleryHtml = `
${GALLERY_START}
${images.join("\n")}
${GALLERY_END}
<div class="blog-gallery" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:24px;">
${images
  .map(
    (url) =>
      `<img src="${url}" alt="Blog image" style="width:100%;height:auto;border-radius:12px;border:1px solid #e2e8f0;" />`
  )
  .join("\n")}
</div>`;

  return `${clean}\n\n${galleryHtml}`.trim();
}

export default function BlogPostForm({ post, returnPath }: BlogPostFormProps) {
  const router = useRouter();
  const back = returnPath || "/admin/blogs";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSlugInfo, setShowSlugInfo] = useState(false);
  const initialContent = post?.content || "";
  const [galleryImages, setGalleryImages] = useState<string[]>(extractGalleryImages(initialContent));
  
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    category: post?.category || "General",
    excerpt: post?.excerpt || "",
    image: post?.image || "",
    content: stripGallery(initialContent),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleGalleryUpload = (urls: string[]) => {
    setGalleryImages(urls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        ...formData,
        content: appendGallery(formData.content, galleryImages),
      };

      if (post) {
        await updateBlogPost(post.id, payload);
      } else {
        await createBlogPost(payload);
      }
      router.push(back);
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-shell space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={back}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            {post ? "Edit Blog Post" : "New Blog Post"}
          </h1>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-r from-[#111184]/[0.08] via-white to-white p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-9 w-9 rounded-lg bg-[#111184] text-white flex items-center justify-center shadow-sm">
            <FileText size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">Blog Publishing Workspace</p>
            <p className="text-xs text-slate-500">Create a structured post with SEO-friendly metadata, featured visuals, and gallery images.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-premium-form space-y-8">
        <Card className="admin-form-card">
          <CardHeader>
            <CardTitle>Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Top SEO Strategies for Delhi Businesses"
                required
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 pt-1">
              <ImageIcon size={14} />
              Media
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="slug">Slug</Label>
                  <button
                    type="button"
                    onClick={() => setShowSlugInfo(!showSlugInfo)}
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    title="Slug formatting guidelines"
                  >
                    <Info size={14} />
                  </button>
                </div>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g. top-seo-strategies-delhi"
                  required
                />
                {showSlugInfo && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                    <p className="font-semibold text-blue-900 mb-2">✓ Slug Formatting Rules:</p>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Use only lowercase letters (a-z)</li>
                      <li>• Use hyphens (-) instead of spaces</li>
                      <li>• No special characters (?, !, @, etc.)</li>
                      <li>• No uppercase letters</li>
                    </ul>
                    <div className="mt-3 pt-2 border-t border-blue-200">
                      <p className="text-xs text-blue-700 mb-1">Examples:</p>
                      <p className="text-xs text-green-700">✓ what-is-seo-guide-2024</p>
                      <p className="text-xs text-red-700">✗ What-is-SEO?-Guide-(2024)</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Featured Image</Label>
              <ImageUpload
                name="image"
                defaultValue={formData.image}
                onUploadComplete={handleImageUpload}
              />
            </div>

            <div className="space-y-2">
              <Label>Upload Images (Gallery)</Label>
              <ImageUpload
                name="gallery-images"
                multiple
                defaultValues={galleryImages}
                onUploadCompleteMultiple={handleGalleryUpload}
                label="Blog Gallery Images"
                maxFiles={12}
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 pt-1">
              <PenSquare size={14} />
              Content
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Write a short summary for cards and search previews..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <RichTextEditor
                value={formData.content}
                onChange={handleContentChange}
                placeholder="Write your post content here..."
              />
            </div>
          </CardContent>
        </Card>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="admin-form-submit">
            {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
