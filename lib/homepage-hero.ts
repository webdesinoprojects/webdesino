import type { HeroShowcaseItem } from "@/lib/data";

export const HOMEPAGE_HERO_PAGE_SLUG = "home";

export const homepageHeroIconNames = [
  "Store",
  "Smartphone",
  "Megaphone",
  "Palette",
  "Globe",
  "TrendingUp",
] as const;

export type HomepageHeroIconName = typeof homepageHeroIconNames[number];

export interface HomepageHeroWord {
  text: string;
  href: string;
}

export interface HomepageHeroContent {
  titleLine1: string;
  description: string;
  searchPlaceholder: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  rotatingWords: HomepageHeroWord[];
  typingPhrases: string[];
  showcaseImages: string[];
  showcaseItems: HeroShowcaseItem[];
}

export const defaultHomepageHeroImages = [
  "/images/home/hero/bookbuzz.jpg",
  "/agnishila.png",
  "/images/home/hero/growth-campaign.jpg",
  "/images/home/hero/brand-identity.jpg",
  "/images/home/hero/meritshot.jpg",
  "/images/home/services/digital-marketing.jpg",
  "/images/home/services/seo-services.jpg",
];

export const defaultHomepageRotatingWords: HomepageHeroWord[] = [
  { text: "Website Design", href: "/services/website-solutions" },
  { text: "SEO Services", href: "/services/seo-services" },
  { text: "Digital Marketing", href: "/services/digital-marketing" },
  { text: "E-commerce", href: "/services/website-solutions/ecommerce-development" },
  { text: "Mobile Apps", href: "/services/app-development" },
  { text: "Branding", href: "/services/branding" },
];

export const defaultHomepageTypingPhrases = [
  "Web Development Agency",
  "SEO Company",
  "Digital Marketing Agency",
  "E-commerce Experts",
];

const fallbackShowcaseItems: HeroShowcaseItem[] = [];

export const defaultHomepageHeroContent: HomepageHeroContent = {
  titleLine1: "Stunning Websites By Top",
  description:
    "We build high-performance websites and digital strategies that drive growth, engagement, and revenue for your business.",
  searchPlaceholder: "Search services (e.g., SEO, Web Design)...",
  primaryCtaText: "Start Your Project",
  primaryCtaLink: "/contact",
  secondaryCtaText: "View Our Work",
  secondaryCtaLink: "/portfolio",
  rotatingWords: defaultHomepageRotatingWords,
  typingPhrases: defaultHomepageTypingPhrases,
  showcaseImages: defaultHomepageHeroImages,
  showcaseItems: fallbackShowcaseItems,
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanWords(value: unknown): HomepageHeroWord[] {
  if (!Array.isArray(value)) return defaultHomepageRotatingWords;

  const words = value
    .map((item) => ({
      text: cleanString((item as HomepageHeroWord)?.text, ""),
      href: cleanString((item as HomepageHeroWord)?.href, "#"),
    }))
    .filter((item) => item.text);

  return words.length ? words : defaultHomepageRotatingWords;
}

function cleanStringList(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;

  const items = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);

  return items.length ? items : fallback;
}

function cleanShowcaseItems(value: unknown, fallback: HeroShowcaseItem[]): HeroShowcaseItem[] {
  if (!Array.isArray(value)) return fallback;

  const items = value
    .map((item) => {
      const raw = item as Partial<HeroShowcaseItem>;
      const iconName = homepageHeroIconNames.includes(raw.iconName as HomepageHeroIconName)
        ? raw.iconName
        : "Globe";

      return {
        name: cleanString(raw.name, ""),
        category: cleanString(raw.category, ""),
        stat: cleanString(raw.stat, ""),
        description: cleanString(raw.description, ""),
        iconName,
        iconColor: cleanString(raw.iconColor, "text-[#111184]"),
      } as HeroShowcaseItem;
    })
    .filter((item) => item.name && item.category && item.stat);

  return items.length ? items : fallback;
}

export function getHomepageHeroContent(
  pageContent: unknown,
  fallbackItems: HeroShowcaseItem[]
): HomepageHeroContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const hero = content.hero && typeof content.hero === "object" ? content.hero : content;

  return {
    titleLine1: cleanString(hero.titleLine1, defaultHomepageHeroContent.titleLine1),
    description: cleanString(hero.description, defaultHomepageHeroContent.description),
    searchPlaceholder: cleanString(hero.searchPlaceholder, defaultHomepageHeroContent.searchPlaceholder),
    primaryCtaText: cleanString(hero.primaryCtaText, defaultHomepageHeroContent.primaryCtaText),
    primaryCtaLink: cleanString(hero.primaryCtaLink, defaultHomepageHeroContent.primaryCtaLink),
    secondaryCtaText: cleanString(hero.secondaryCtaText, defaultHomepageHeroContent.secondaryCtaText),
    secondaryCtaLink: cleanString(hero.secondaryCtaLink, defaultHomepageHeroContent.secondaryCtaLink),
    rotatingWords: cleanWords(hero.rotatingWords),
    typingPhrases: cleanStringList(hero.typingPhrases, defaultHomepageTypingPhrases),
    showcaseImages: cleanStringList(hero.showcaseImages, defaultHomepageHeroImages),
    showcaseItems: cleanShowcaseItems(hero.showcaseItems, fallbackItems),
  };
}
