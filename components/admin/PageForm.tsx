"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { createPage, updatePage } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Section {
  title: string;
  content: string;
  image?: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Feature {
  title: string;
  description: string;
}

interface PageContent {
  html?: string;
  hero?: {
    title?: string;
    subtitle?: string;
    image?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  sections?: Section[];
  stats?: Stat[];
  features?: Feature[];
  serviceAreas?: string[];
}

interface PageFormProps {
  page?: {
    id: string;
    slug: string;
    title: string;
    description: string | null;
    content: any;
  };
}

export default function PageForm({ page }: PageFormProps) {
  const isEditing = !!page;
  const action = isEditing ? updatePage.bind(null, page.id) : createPage;

  const defaultContent: PageContent = {
    html: "",
    hero: {
      title: page?.title || "Page Title",
      subtitle: "Page Subtitle",
      ctaText: "Learn More",
      ctaLink: "#"
    },
    sections: [
      { title: "Section 1", content: "Content for section 1..." }
    ],
    stats: [
      { value: "100+", label: "Happy Clients" },
      { value: "100+", label: "Projects Completed" },
      { value: "₹6.3 Cr+", label: "Sales Generated" },
      { value: "10+", label: "Certifications" },
    ],
    features: [
      { title: "Proven Results", description: "Trusted by businesses across Delhi NCR..." },
    ],
    serviceAreas: ["Uttam Nagar", "Dwarka", "Janakpuri"]
  };

  const [content, setContent] = useState<PageContent>(page?.content || defaultContent);
  const [slug, setSlug] = useState(page?.slug || "");

  const updateHtml = (value: string) => {
    setContent(prev => ({ ...prev, html: value }));
  };

  const updateHero = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateSection = (index: number, field: string, value: any) => {
    const newSections = [...(content.sections || [])];
    newSections[index] = { ...newSections[index], [field]: value };
    setContent(prev => ({ ...prev, sections: newSections }));
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = [...(content.stats || [])];
    newStats[index] = { ...newStats[index], [field]: value };
    setContent(prev => ({ ...prev, stats: newStats }));
  };

  const updateFeature = (index: number, field: string, value: string) => {
    const newFeatures = [...(content.features || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setContent(prev => ({ ...prev, features: newFeatures }));
  };

  const updateServiceAreas = (value: string) => {
    setContent(prev => ({ ...prev, serviceAreas: value.split(",").map(s => s.trim()) }));
  };

  const addSection = () => {
    setContent(prev => ({
      ...prev,
      sections: [...(prev.sections || []), { title: "New Section", content: "" }]
    }));
  };

  const removeSection = (index: number) => {
    const newSections = [...(content.sections || [])];
    newSections.splice(index, 1);
    setContent(prev => ({ ...prev, sections: newSections }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/pages">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">
          {isEditing ? "Edit Page" : "Add New Page"}
        </h1>
      </div>

      <form action={action} className="space-y-8">
        <input type="hidden" name="content" value={JSON.stringify(content)} />
        
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Page Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. About Us"
                  defaultValue={page?.title}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="e.g. about"
                  defaultValue={page?.slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="SEO Description..."
                defaultValue={page?.description || ""}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom HTML Content (Overrides Sections)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Content</Label>
              <ReactQuill
                theme="snow"
                value={content.html || ""}
                onChange={updateHtml}
                className="bg-white"
              />
              <p className="text-sm text-muted-foreground">
                If provided, this content will be rendered instead of the Hero and Sections below.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Hero Title</Label>
              <Input
                value={content.hero?.title || ""}
                onChange={(e) => updateHero("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Textarea
                value={content.hero?.subtitle || ""}
                onChange={(e) => updateHero("subtitle", e.target.value)}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Hero Image</Label>
              <ImageUpload 
                name="hero_image" 
                label="Upload Hero Image"
                defaultValue={content.hero?.image}
                onUploadComplete={(url) => updateHero("image", url)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>CTA Text</Label>
                <Input
                  value={content.hero?.ctaText || ""}
                  onChange={(e) => updateHero("ctaText", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>CTA Link</Label>
                <Input
                  value={content.hero?.ctaLink || ""}
                  onChange={(e) => updateHero("ctaLink", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {slug === "about" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Stats Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.stats?.map((stat, index) => (
                    <div key={index} className="border p-4 rounded-lg space-y-2">
                      <Label>Stat {index + 1}</Label>
                      <Input 
                        placeholder="Value (e.g. 100+)" 
                        value={stat.value} 
                        onChange={(e) => updateStat(index, "value", e.target.value)}
                      />
                      <Input 
                        placeholder="Label (e.g. Happy Clients)" 
                        value={stat.label} 
                        onChange={(e) => updateStat(index, "label", e.target.value)}
                      />
                    </div>
                  ))}
                </div>
                <Button type="button" variant="outline" onClick={() => setContent(prev => ({ ...prev, stats: [...(prev.stats || []), { value: "", label: "" }] }))}>
                  Add Stat
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose Us Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.features?.map((feature, index) => (
                  <div key={index} className="border p-4 rounded-lg space-y-2">
                    <Label>Feature {index + 1}</Label>
                    <Input 
                      placeholder="Title" 
                      value={feature.title} 
                      onChange={(e) => updateFeature(index, "title", e.target.value)}
                    />
                    <Textarea 
                      placeholder="Description" 
                      value={feature.description} 
                      onChange={(e) => updateFeature(index, "description", e.target.value)}
                    />
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => setContent(prev => ({ ...prev, features: [...(prev.features || []), { title: "", description: "" }] }))}>
                  Add Feature
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Areas (Comma separated)</Label>
                  <Textarea 
                    value={content.serviceAreas?.join(", ")} 
                    onChange={(e) => updateServiceAreas(e.target.value)}
                    placeholder="Uttam Nagar, Dwarka, Janakpuri..."
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Content Sections</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addSection}>
              <Plus className="h-4 w-4 mr-2" /> Add Section
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {content.sections?.map((section, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 bg-slate-50 relative">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => removeSection(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="space-y-2">
                  <Label>Section Title</Label>
                  <Input
                    value={section.title}
                    onChange={(e) => updateSection(index, "title", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Content</Label>
                  <ReactQuill
                    theme="snow"
                    value={section.content}
                    onChange={(value) => updateSection(index, "content", value)}
                    className="bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Section Image (Optional)</Label>
                  <ImageUpload 
                    name={`section_image_${index}`}
                    label="Upload Image"
                    defaultValue={section.image}
                    onUploadComplete={(url) => updateSection(index, "image", url)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/pages">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            {isEditing ? "Update Page" : "Create Page"}
          </Button>
        </div>
      </form>
    </div>
  );
}
