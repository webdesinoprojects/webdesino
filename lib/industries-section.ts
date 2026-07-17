export const INDUSTRIES_PAGE_SLUG = "industries";

export const industriesIconNames = [
  "Building",
  "Briefcase",
  "GraduationCap",
  "ShoppingCart",
  "Rocket",
  "Building2",
  "Shirt",
  "Globe",
  "Stethoscope",
  "Plane",
  "Utensils",
  "Truck",
  "ShieldCheck",
  "Monitor",
  "Scale",
  "Handshake",
  "Sprout",
  "UserSearch",
  "BarChart3",
  "BookOpenCheck",
  "Bed",
  "CloudCog",
  "UserSquare2",
  "Store",
  "HeartPulse",
  "Landmark",
  "Laptop",
  "Users",
  "Megaphone",
  "Code",
  "Palette",
  "Home",
] as const;

export type IndustriesIconName = (typeof industriesIconNames)[number];

export interface IndustryCard {
  iconName: IndustriesIconName;
  title: string;
  description: string;
  linkLabel: string;
  linkText: string;
  linkUrl: string;
}

export interface IndustriesContent {
  title: string;
  description: string;
  cards: IndustryCard[];
}

export const defaultIndustryCards: IndustryCard[] = [
  {
    iconName: "Building",
    title: "Real Estate",
    description: "High-performance real estate websites with property listings, lead forms, and SEO-ready structures.",
    linkLabel: "View Example",
    linkText: "Land Sathi",
    linkUrl: "https://landsathi.com/",
  },
  {
    iconName: "Briefcase",
    title: "Agencies & Startups",
    description: "Conversion-focused websites for startups and agencies to build credibility and attract clients.",
    linkLabel: "View Example",
    linkText: "Ambassador Perk",
    linkUrl: "https://ambassadorperk.com/",
  },
  {
    iconName: "GraduationCap",
    title: "Education & Training",
    description: "Online learning platforms and coaching institute websites with student-friendly navigation.",
    linkLabel: "View Example",
    linkText: "ProSkills Hub",
    linkUrl: "https://proskillshub.com/",
  },
  {
    iconName: "Building",
    title: "Healthcare & Clinics",
    description: "Trusted healthcare websites for hospitals, clinics, and medical suppliers with appointment booking.",
    linkLabel: "View Example",
    linkText: "Mentok Healthcare",
    linkUrl: "https://mentokhealthcare.com/",
  },
  {
    iconName: "ShoppingCart",
    title: "Ecommerce & Retail",
    description: "Ecommerce websites with integrated payments, modern UI, and optimized product catalogs.",
    linkLabel: "View Example",
    linkText: "Buy Khari Bauli",
    linkUrl: "https://buykharibauli.com/",
  },
  {
    iconName: "Rocket",
    title: "Small Businesses",
    description: "Affordable, professional websites for SMEs and local businesses to boost online presence.",
    linkLabel: "View Example",
    linkText: "Book Buzzz",
    linkUrl: "https://bookbuzzz.com/",
  },
  {
    iconName: "Building2",
    title: "Corporate & SaaS",
    description: "Corporate and SaaS websites with clean UI, secure integrations, and lead generation systems.",
    linkLabel: "View Example",
    linkText: "CS Hub",
    linkUrl: "https://cshub.in/",
  },
  {
    iconName: "Shirt",
    title: "Fashion & Lifestyle",
    description: "Stylish, modern websites for fashion, lifestyle, and wellness brands with ecommerce features.",
    linkLabel: "View Example",
    linkText: "Nourish Mantra",
    linkUrl: "https://nourishmentra.com/",
  },
  {
    iconName: "Globe",
    title: "Freelance & Talent Platforms",
    description: "Dynamic platforms for talent acquisition, freelance gigs, and creative marketplaces.",
    linkLabel: "View Example",
    linkText: "Site Karo",
    linkUrl: "https://sitekaro-rajeev-thes-projects.vercel.app/",
  },
];

export const defaultIndustriesContent: IndustriesContent = {
  title: "Industries We Serve",
  description:
    "At WebDesino, we deliver tailor-made websites and digital solutions for businesses across multiple industries. From real estate and ecommerce to healthcare, startups, and education, we build SEO-optimized websites that generate leads, boost sales, and build trust.",
  cards: defaultIndustryCards,
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanIconName(value: unknown): IndustriesIconName {
  return industriesIconNames.includes(value as IndustriesIconName)
    ? (value as IndustriesIconName)
    : "Building";
}

function cleanCards(value: unknown): IndustryCard[] {
  if (!Array.isArray(value)) return defaultIndustryCards;

  const cards = value
    .map((item) => {
      const raw = item as Partial<IndustryCard>;

      return {
        iconName: cleanIconName(raw.iconName),
        title: cleanString(raw.title, ""),
        description: cleanString(raw.description, ""),
        linkLabel: cleanString(raw.linkLabel, "View Example"),
        linkText: cleanString(raw.linkText, ""),
        linkUrl: cleanString(raw.linkUrl, "#"),
      };
    })
    .filter((item) => item.title && item.description);

  return cards.length ? cards : defaultIndustryCards;
}

export function getIndustriesContent(pageContent: unknown): IndustriesContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const industries =
    content.industries && typeof content.industries === "object" ? content.industries : content;

  return {
    title: cleanString(industries.title, defaultIndustriesContent.title),
    description: cleanString(industries.description, defaultIndustriesContent.description),
    cards: cleanCards(industries.cards),
  };
}
