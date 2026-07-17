export const TRUSTED_SECTION_PAGE_SLUG = "trusted-section";

export const trustedSectionIconNames = ["Users", "Briefcase", "Shield", "Award"] as const;

export type TrustedSectionIconName = (typeof trustedSectionIconNames)[number];

export interface TrustedSectionStat {
  iconName: TrustedSectionIconName;
  label: string;
  value: string;
}

export interface TrustedSectionCertification {
  name: string;
  logo: string;
  link: string;
}

export interface TrustedSectionContent {
  title: string;
  description: string;
  stats: TrustedSectionStat[];
  certificationTitle: string;
  certificationDescription: string;
  certifications: TrustedSectionCertification[];
  badgeText: string;
}

export const defaultTrustedSectionStats: TrustedSectionStat[] = [
  { iconName: "Users", label: "Happy Clients", value: "100+" },
  { iconName: "Briefcase", label: "Projects Delivered", value: "100+" },
  { iconName: "Shield", label: "Global Certifications", value: "10+" },
];

export const defaultTrustedSectionCertifications: TrustedSectionCertification[] = [
  { name: "Google Certified Partner Delhi NCR", logo: "/google.jpg", link: "https://www.google.com/partners/" },
  { name: "WordPress Certified Agency Delhi NCR", logo: "/wordpress.jpg", link: "https://wordpress.org/" },
  { name: "Shopify Partner Web Development Delhi NCR", logo: "/shopify.jpg", link: "https://www.shopify.com/partners" },
  { name: "SEMRush Certified Digital Marketing Delhi NCR", logo: "/semrush.png", link: "https://www.semrush.com/" },
  { name: "DesignRush Accredited Web Development Company Delhi NCR", logo: "/designrush.jpg", link: "https://designrush.com/" },
];

export const defaultTrustedSectionContent: TrustedSectionContent = {
  title: "Trusted Web Development Company in Delhi NCR",
  description:
    "At WebDesino, we are trusted by 100+ clients across Delhi NCR for delivering modern websites, SEO strategies, and digital marketing solutions. Recognized by global leaders, we ensure every project is SEO-optimized, professional, and result-driven.",
  stats: defaultTrustedSectionStats,
  certificationTitle: "Certified Partners",
  certificationDescription: "Recognized and certified by global industry leaders",
  certifications: defaultTrustedSectionCertifications,
  badgeText: "Optimize Your Marketing",
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanStats(value: unknown): TrustedSectionStat[] {
  if (!Array.isArray(value)) return defaultTrustedSectionStats;

  const stats = value
    .map((item) => {
      const raw = item as Partial<TrustedSectionStat>;
      const iconName: TrustedSectionIconName = trustedSectionIconNames.includes(raw.iconName as TrustedSectionIconName)
        ? (raw.iconName as TrustedSectionIconName)
        : "Users";

      return {
        iconName,
        label: cleanString(raw.label, ""),
        value: cleanString(raw.value, ""),
      };
    })
    .filter((item) => item.label && item.value);

  return stats.length ? stats : defaultTrustedSectionStats;
}

function cleanCertifications(value: unknown): TrustedSectionCertification[] {
  if (!Array.isArray(value)) return defaultTrustedSectionCertifications;

  const certifications = value
    .map((item) => {
      const raw = item as Partial<TrustedSectionCertification>;
      return {
        name: cleanString(raw.name, ""),
        logo: cleanString(raw.logo, ""),
        link: cleanString(raw.link, "#"),
      };
    })
    .filter((item) => item.name && item.logo);

  return certifications.length ? certifications : defaultTrustedSectionCertifications;
}

export function getTrustedSectionContent(pageContent: unknown): TrustedSectionContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const trusted = content.trustedSection && typeof content.trustedSection === "object"
    ? content.trustedSection
    : content;

  return {
    title: cleanString(trusted.title, defaultTrustedSectionContent.title),
    description: cleanString(trusted.description, defaultTrustedSectionContent.description),
    stats: cleanStats(trusted.stats),
    certificationTitle: cleanString(trusted.certificationTitle, defaultTrustedSectionContent.certificationTitle),
    certificationDescription: cleanString(
      trusted.certificationDescription,
      defaultTrustedSectionContent.certificationDescription
    ),
    certifications: cleanCertifications(trusted.certifications),
    badgeText: cleanString(trusted.badgeText, defaultTrustedSectionContent.badgeText),
  };
}
