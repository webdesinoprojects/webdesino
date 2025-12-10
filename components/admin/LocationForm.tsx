"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, RefreshCw } from "lucide-react";
import { createLocation, updateLocation } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";

interface Service {
  title: string;
  items: string[];
  image: string;
}

interface Content {
  hero?: {
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
    image?: string;
  };
  story?: {
    title?: string;
    content?: string[];
    image?: string;
  };
  leadingCompany?: {
    title?: string;
    content?: string;
  };
  services?: Service[];
}

interface LocationFormProps {
  location?: {
    id: string;
    location: string;
    slug: string;
    title: string;
    description: string | null;
    content: any;
  };
}

export default function LocationForm({ location }: LocationFormProps) {
  const isEditing = !!location;
  const action = isEditing ? updateLocation.bind(null, location.id) : createLocation;

  const generateContent = (locName: string): Content => ({
    hero: {
      subtitle: `Are you searching for a reliable website designer in ${locName}? At WebDesino, we help local businesses create modern, fast, and SEO-friendly websites that generate genuine leads and rank well on Google.`,
      ctaText: "Get a Free Quote",
      ctaLink: "#contact",
      secondaryCtaText: "Call Us Now",
      secondaryCtaLink: "tel:+919310851557",
      image: "/location-hero.png"
    },
    story: {
      title: `Why Your ${locName} Business Needs a Website Today`,
      content: [
        `In today's digital landscape, your customers are actively engaged online, whether they are exploring the vibrant market in ${locName}. A professionally crafted website does more than just provide information; it serves as a powerful tool for your business.`,
        "A captivating website design establishes trust with potential clients, featuring a sleek, modern aesthetic that reflects your brand's values. It effectively generates leads by incorporating clear and compelling calls to action that guide visitors towards taking the next step.",
        `Whether you run a charming boutique, a dynamic coaching center, a caring clinic, or a home-based service, a local website tailored for the ${locName} audience will enable you to differentiate yourself from your competitors and attract the clientele you desire.`
      ],
      image: "/location-story.png"
    },
    leadingCompany: {
      title: `The Leading Web Development Company in ${locName}`,
      content: `Located in the heart of West Delhi, WebDesino is known for delivering high-converting websites for small businesses and startups. We're the go-to web developer in ${locName} for WordPress, Shopify, and custom-built platforms.`
    },
    services: [
      {
        title: "Website Design & Development",
        items: [
          "Mobile-responsive layouts using WordPress, custom HTML/CSS, and popular CMS platforms",
          "SEO-structured, fast-loading code for better rankings and user experience",
          "Custom templates designed for clinics, shops, real estate agents, and startups",
          "Before/After design comparisons to showcase how we transform your online presence"
        ],
        image: "/location-service-1.png"
      },
      {
        title: "SEO & Google My Business Optimization",
        items: [
          `On-page SEO targeting high-value keywords like "web designer ${locName}"`,
          "Google My Business setup with accurate categories, operating hours, photos, and keyword-rich descriptions",
          "Citation building and weekly posts to maintain high visibility in local searches"
        ],
        image: "/location-service-2.png"
      },
      {
        title: "Local Targeting & Fast Support",
        items: [
          `In-person consultations in ${locName}`,
          "Quick call/WhatsApp support for urgent changes or troubleshooting",
          "A dedicated local account manager who understands the West Delhi business ecosystem"
        ],
        image: "/location-service-3.png"
      }
    ]
  });

  const [content, setContent] = useState<Content>(() => {
    const locName = location?.location || "your area";
    const defaults = generateContent(locName);
    const dbContent = location?.content || {};
    
    return {
      hero: { ...defaults.hero, ...(dbContent.hero || {}) },
      story: { ...defaults.story, ...(dbContent.story || {}) },
      leadingCompany: { ...defaults.leadingCompany, ...(dbContent.leadingCompany || {}) },
      services: dbContent.services && dbContent.services.length > 0 ? dbContent.services : defaults.services
    };
  });

  const handleRegenerate = () => {
    const locInput = document.getElementById('location') as HTMLInputElement;
    const locName = locInput?.value || "your area";
    if (confirm(`Are you sure you want to regenerate all content for "${locName}"? This will overwrite current changes.`)) {
      setContent(generateContent(locName));
    }
  };

  const updateHero = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateStory = (field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      story: { ...prev.story, [field]: value }
    }));
  };

  const updateLeadingCompany = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      leadingCompany: { ...prev.leadingCompany, [field]: value }
    }));
  };

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...(content.services || [])];
    newServices[index] = { ...newServices[index], [field]: value };
    setContent(prev => ({ ...prev, services: newServices }));
  };

  const addService = () => {
    setContent(prev => ({
      ...prev,
      services: [...(prev.services || []), { title: "New Service", items: ["Feature 1"], image: "/location-service-1.png" }]
    }));
  };

  const removeService = (index: number) => {
    const newServices = [...(content.services || [])];
    newServices.splice(index, 1);
    setContent(prev => ({ ...prev, services: newServices }));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/locations">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-900">
          {isEditing ? "Edit Location" : "Add New Location"}
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
                <Label htmlFor="location">Location Name</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. New Delhi"
                    defaultValue={location?.location}
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={handleRegenerate} 
                    title="Regenerate Content from Location Name"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  placeholder="e.g. best-web-developer-in-new-delhi"
                  defaultValue={location?.slug}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Page Title (H1)</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Best Web Development Company in New Delhi"
                defaultValue={location?.title}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="SEO Description..."
                defaultValue={location?.description || ""}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Subtitle / Intro Text</Label>
              <Textarea
                value={content.hero?.subtitle || ""}
                onChange={(e) => updateHero("subtitle", e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary CTA Text</Label>
                <Input
                  value={content.hero?.ctaText || ""}
                  onChange={(e) => updateHero("ctaText", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Primary CTA Link</Label>
                <Input
                  value={content.hero?.ctaLink || ""}
                  onChange={(e) => updateHero("ctaLink", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Secondary CTA Text</Label>
                <Input
                  value={content.hero?.secondaryCtaText || ""}
                  onChange={(e) => updateHero("secondaryCtaText", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Secondary CTA Link</Label>
                <Input
                  value={content.hero?.secondaryCtaLink || ""}
                  onChange={(e) => updateHero("secondaryCtaLink", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Hero Image</Label>
              <ImageUpload 
                name="hero_image" 
                label="Upload Hero Image"
                defaultValue={content.hero?.image}
                onUploadComplete={(url: string) => updateHero("image", url)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Story Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Section Title</Label>
              <Input
                value={content.story?.title || ""}
                onChange={(e) => updateStory("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Content (Paragraphs separated by double newlines)</Label>
              <Textarea
                value={content.story?.content?.join("\n\n") || ""}
                onChange={(e) => updateStory("content", e.target.value.split("\n\n"))}
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label>Story Image</Label>
              <ImageUpload 
                name="story_image" 
                label="Upload Story Image"
                defaultValue={content.story?.image}
                onUploadComplete={(url: string) => updateStory("image", url)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leading Company Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Section Title</Label>
              <Input
                value={content.leadingCompany?.title || ""}
                onChange={(e) => updateLeadingCompany("title", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={content.leadingCompany?.content || ""}
                onChange={(e) => updateLeadingCompany("content", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Services Section</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addService}>
              <Plus className="h-4 w-4 mr-2" /> Add Service
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {content.services?.map((service, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4 bg-slate-50 relative">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  onClick={() => removeService(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="space-y-2">
                  <Label>Service Title</Label>
                  <Input
                    value={service.title}
                    onChange={(e) => updateService(index, "title", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Service Items (One per line)</Label>
                  <Textarea
                    value={(service.items || []).join("\n")}
                    onChange={(e) => updateService(index, "items", e.target.value.split("\n"))}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Service Image</Label>
                  <ImageUpload 
                    name={`service_image_${index}`}
                    label="Upload Service Image"
                    defaultValue={service.image}
                    onUploadComplete={(url: string) => updateService(index, "image", url)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/locations">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit">
            {isEditing ? "Update Location" : "Create Location"}
          </Button>
        </div>
      </form>
    </div>
  );
}
