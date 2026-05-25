import type { LucideIcon } from "lucide-react";
import { Code2, Megaphone, Search, Target } from "lucide-react";

export type LandingServiceSlug =
  | "web-development"
  | "google-ads"
  | "meta-ads"
  | "seo-optimization";

export interface LandingService {
  slug: LandingServiceSlug;
  title: string;
  badge: string;
  description: string;
  categorySlug: "website-solutions" | "digital-marketing" | "seo-services";
  icon: LucideIcon;
  features: string[];
  benefits: string[];
  process: { title: string; description: string }[];
}

export const landingContact = {
  phoneNumbers: [{ display: "+91 89528 73550", href: "tel:+918952873550" }],
  whatsappHref: "https://wa.me/918952873550",
};

export const landingServices: LandingService[] = [
  {
    slug: "web-development",
    title: "Website Development",
    badge: "Websites Built to Convert",
    description:
      "Custom website development using modern technologies such as Next.js and React. We create fast, secure, and scalable websites that turn visitors into qualified leads.",
    categorySlug: "website-solutions",
    icon: Code2,
    features: [
      "Custom Frontend & Backend",
      "Responsive Website Design",
      "CMS & API Integration",
      "Conversion Focused Pages",
      "Performance Optimization",
      "SEO Friendly Structure",
    ],
    benefits: [
      "Fast, Mobile-Ready Experiences",
      "Scalable Website Architecture",
      "Clear Lead Generation Journeys",
      "Reliable Post-Launch Support",
    ],
    process: [
      { title: "Discovery", description: "Understand your offer, audience, and conversion goals." },
      { title: "Structure", description: "Plan pages, user journeys, and the right technical stack." },
      { title: "Build", description: "Design and develop a responsive, high-performing website." },
      { title: "Launch", description: "Test tracking, speed, forms, and production readiness." },
      { title: "Improve", description: "Support updates and improve performance over time." },
    ],
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    badge: "High-Intent Paid Search",
    description:
      "Reach customers while they are actively searching for your service. Our Google Ads campaigns focus on qualified enquiries, efficient budget use, and measurable conversion tracking.",
    categorySlug: "digital-marketing",
    icon: Target,
    features: [
      "Keyword & Intent Research",
      "Search Campaign Setup",
      "Conversion Tracking",
      "Landing Page Alignment",
      "Bid & Budget Optimization",
      "Performance Reporting",
    ],
    benefits: [
      "Reach Ready-to-Buy Customers",
      "Control Spend and Lead Quality",
      "Measure Calls and Form Leads",
      "Continuously Improve ROI",
    ],
    process: [
      { title: "Audit", description: "Review your market, search demand, budget, and goals." },
      { title: "Plan", description: "Map keywords, audiences, offers, and landing pages." },
      { title: "Launch", description: "Build focused campaigns with accurate tracking." },
      { title: "Optimize", description: "Improve bids, terms, ads, and conversion rates." },
      { title: "Report", description: "Share lead and spend insights for informed scaling." },
    ],
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    badge: "Facebook & Instagram Growth",
    description:
      "Build awareness and generate leads on Facebook and Instagram through audience-led campaigns, compelling creative testing, retargeting, and conversion-focused optimization.",
    categorySlug: "digital-marketing",
    icon: Megaphone,
    features: [
      "Audience Strategy",
      "Creative & Copy Testing",
      "Lead Generation Campaigns",
      "Pixel & Event Tracking",
      "Retargeting Funnels",
      "Campaign Reporting",
    ],
    benefits: [
      "Target Relevant Audiences",
      "Generate Leads at Scale",
      "Reconnect With Interested Visitors",
      "Learn Which Creatives Convert",
    ],
    process: [
      { title: "Research", description: "Define audience segments, objectives, and offers." },
      { title: "Creative", description: "Develop messages and formats suited to Meta feeds." },
      { title: "Campaign", description: "Set up acquisition and retargeting campaigns." },
      { title: "Testing", description: "Test creative, audiences, placements, and forms." },
      { title: "Scaling", description: "Increase effective campaigns with clear reporting." },
    ],
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    badge: "Sustainable Organic Visibility",
    description:
      "Improve search visibility and qualified organic traffic with technical improvements, on-page optimization, useful content planning, and clear performance reporting.",
    categorySlug: "seo-services",
    icon: Search,
    features: [
      "Technical SEO Audit",
      "Keyword & Intent Mapping",
      "On-Page SEO",
      "Content Opportunity Plan",
      "Internal Linking Strategy",
      "Search Performance Reporting",
    ],
    benefits: [
      "Improve Search Visibility",
      "Attract Relevant Organic Traffic",
      "Strengthen Website Foundations",
      "Build Long-Term Lead Potential",
    ],
    process: [
      { title: "Audit", description: "Identify technical, content, and ranking opportunities." },
      { title: "Strategy", description: "Prioritize keywords and pages by business impact." },
      { title: "Implement", description: "Improve pages, metadata, linking, and technical health." },
      { title: "Measure", description: "Monitor visibility, traffic, queries, and conversions." },
      { title: "Grow", description: "Expand useful content and authority over time." },
    ],
  },
];

export function getLandingService(slug: string) {
  return landingServices.find((service) => service.slug === slug);
}
