export const MAXIMIZE_SECTION_PAGE_SLUG = "maximize-section";

export const maximizeIconNames = ["Rocket", "Star", "Trophy", "Award", "TrendingUp", "Zap"] as const;

export type MaximizeIconName = (typeof maximizeIconNames)[number];

export interface MaximizeCta {
  text: string;
  href: string;
  ariaLabel: string;
}

export interface MaximizeRecognitionItem {
  iconName: MaximizeIconName;
  value: string;
  label: string;
}

export interface MaximizeStat {
  value: string;
  label: string;
}

export interface MaximizeSectionContent {
  badgeIconName: MaximizeIconName;
  badgeText: string;
  headingBlueLine: string;
  headingBlackPrefix: string;
  headingBlueWord: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: MaximizeCta;
  secondaryCta: MaximizeCta;
  recognitionText: string;
  recognitionItems: MaximizeRecognitionItem[];
  stats: MaximizeStat[];
}

export const defaultMaximizeRecognitionItems: MaximizeRecognitionItem[] = [
  { iconName: "Star", value: "4.9/5", label: "Client Rating" },
  { iconName: "Trophy", value: "10+", label: "Certifications" },
  { iconName: "Rocket", value: "100%", label: "Success Rate" },
];

export const defaultMaximizeStats: MaximizeStat[] = [
  { value: "₹6.3 Cr+", label: "Sales Generated for Clients" },
  { value: "100+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
];

export const defaultMaximizeSectionContent: MaximizeSectionContent = {
  badgeIconName: "Rocket",
  badgeText: "Why WebDesino Ranks #1 in Delhi NCR",
  headingBlueLine: "Web Design And Development",
  headingBlackPrefix: "Company In",
  headingBlueWord: "Delhi",
  description:
    "At our web design and development company in Delhi, we focus on attracting new customers through responsive, user-friendly websites tailored to your audience. Our digital marketing strategies-SEO, social media, and targeted ads-drive traffic and convert visitors into loyal customers.",
  image: "/location-story.png",
  imageAlt: "Digital Growth",
  primaryCta: {
    text: "Start Your Project",
    href: "/contact",
    ariaLabel: "Start Your Project - Web Development Services Delhi",
  },
  secondaryCta: {
    text: "See Our Work",
    href: "/portfolio",
    ariaLabel: "See Our Work - Portfolio Projects",
  },
  recognitionText: "Recognized for professional work and high-quality digital solutions",
  recognitionItems: defaultMaximizeRecognitionItems,
  stats: defaultMaximizeStats,
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanIconName(value: unknown, fallback: MaximizeIconName): MaximizeIconName {
  return maximizeIconNames.includes(value as MaximizeIconName)
    ? (value as MaximizeIconName)
    : fallback;
}

function cleanCta(value: unknown, fallback: MaximizeCta): MaximizeCta {
  const raw = value && typeof value === "object" ? (value as Partial<MaximizeCta>) : {};

  return {
    text: cleanString(raw.text, fallback.text),
    href: cleanString(raw.href, fallback.href),
    ariaLabel: cleanString(raw.ariaLabel, fallback.ariaLabel),
  };
}

function cleanRecognitionItems(value: unknown): MaximizeRecognitionItem[] {
  if (!Array.isArray(value)) return defaultMaximizeRecognitionItems;

  const items = value
    .map((item, index) => {
      const raw = item as Partial<MaximizeRecognitionItem>;
      const fallback = defaultMaximizeRecognitionItems[index] || defaultMaximizeRecognitionItems[0];

      return {
        iconName: cleanIconName(raw.iconName, fallback.iconName),
        value: cleanString(raw.value, ""),
        label: cleanString(raw.label, ""),
      };
    })
    .filter((item) => item.value && item.label)
    .slice(0, 3);

  return items.length ? items : defaultMaximizeRecognitionItems;
}

function cleanStats(value: unknown): MaximizeStat[] {
  if (!Array.isArray(value)) return defaultMaximizeStats;

  const stats = value
    .map((item) => {
      const raw = item as Partial<MaximizeStat>;

      return {
        value: cleanString(raw.value, ""),
        label: cleanString(raw.label, ""),
      };
    })
    .filter((item) => item.value && item.label)
    .slice(0, 3);

  return stats.length ? stats : defaultMaximizeStats;
}

export function getMaximizeSectionContent(pageContent: unknown): MaximizeSectionContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const maximize =
    content.maximizeSection && typeof content.maximizeSection === "object"
      ? content.maximizeSection
      : content;

  return {
    badgeIconName: cleanIconName(maximize.badgeIconName, defaultMaximizeSectionContent.badgeIconName),
    badgeText: cleanString(maximize.badgeText, defaultMaximizeSectionContent.badgeText),
    headingBlueLine: cleanString(
      maximize.headingBlueLine,
      defaultMaximizeSectionContent.headingBlueLine
    ),
    headingBlackPrefix: cleanString(
      maximize.headingBlackPrefix,
      defaultMaximizeSectionContent.headingBlackPrefix
    ),
    headingBlueWord: cleanString(maximize.headingBlueWord, defaultMaximizeSectionContent.headingBlueWord),
    description: cleanString(maximize.description, defaultMaximizeSectionContent.description),
    image: cleanString(maximize.image, defaultMaximizeSectionContent.image),
    imageAlt: cleanString(maximize.imageAlt, defaultMaximizeSectionContent.imageAlt),
    primaryCta: cleanCta(maximize.primaryCta, defaultMaximizeSectionContent.primaryCta),
    secondaryCta: cleanCta(maximize.secondaryCta, defaultMaximizeSectionContent.secondaryCta),
    recognitionText: cleanString(
      maximize.recognitionText,
      defaultMaximizeSectionContent.recognitionText
    ),
    recognitionItems: cleanRecognitionItems(maximize.recognitionItems),
    stats: cleanStats(maximize.stats),
  };
}
