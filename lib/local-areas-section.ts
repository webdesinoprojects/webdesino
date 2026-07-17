export const LOCAL_AREAS_PAGE_SLUG = "local-areas";

export interface LocalAreaLink {
  name: string;
  href: string;
}

export interface LocalLocationCard {
  name: string;
  link: string;
}

export interface LocalAreasContent {
  title: string;
  introPrefix: string;
  introAreas: LocalAreaLink[];
  introSuffix: string;
  description: string;
  highlightText: string;
  mapEmbedUrl: string;
  mapTitle: string;
  locationCards: LocalLocationCard[];
  closingText: string;
  ctaText: string;
  ctaHref: string;
}

export const defaultLocalIntroAreas: LocalAreaLink[] = [
  { name: "Dwarka", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Uttam Nagar", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Bawana", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Karol Bagh", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Kalkaji", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Govindpuri", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Kamla Nagar", href: "https://share.google/HamoWu7AFPzS3TEoh" },
  { name: "Shakti Nagar", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Civil Lines", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Rajouri Garden", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Sabzi Mandi", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Krishan Vihar", href: "https://share.google/1oqOSK2n3UvhKbHu5" },
];

export const defaultLocalLocationCards: LocalLocationCard[] = [
  { name: "Krishan Vihar & Nearby Areas", link: "https://share.google/1oqOSK2n3UvhKbHu5" },
  { name: "Uttam Nagar & Nearby Areas", link: "https://share.google/7bfsoSDMcdKosq9H4" },
  { name: "Kamla Nagar & Nearby Areas", link: "https://share.google/HamoWu7AFPzS3TEoh" },
  { name: "Karol Bagh & Nearby Areas", link: "https://www.google.com/maps/place/Karol+Bagh,+Delhi" },
  { name: "Hauz Khas & Nearby Areas", link: "https://share.google/c7gS6rqXBDvqMimZ8" },
  { name: "DLF Camellias & Nearby Areas", link: "https://share.google/OEllDuOFBQkSiWfF6" },
];

export const defaultLocalAreasContent: LocalAreasContent = {
  title: "Your Local Web Development Company in Delhi NCR",
  introPrefix:
    "At WebDesino, we are proud to be the trusted local web development and digital marketing company in Delhi NCR. We help businesses across",
  introAreas: defaultLocalIntroAreas,
  introSuffix: "establish a strong digital presence.",
  description:
    "Whether you run a small shop, a clinic, a real estate agency, or an ecommerce brand, our SEO-optimized websites and marketing strategies ensure higher visibility, more leads, and improved conversions. We focus on Google Maps SEO and hyperlocal strategies so your business shows up when customers in your neighborhood search online.",
  highlightText: "Explore our dedicated Google Business Profiles to see how we serve your area:",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d437.42263208577924!2d77.078731!3d28.708156!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d07a48393eb81%3A0x1ad6b22a2676a6e9!2sRohit%20Tiwari%20-%20Web%20Developer%20and%20designer!5e0!3m2!1sen!2sus!4v1763955823882!5m2!1sen!2sus",
  mapTitle: "Webdesino office location map",
  locationCards: defaultLocalLocationCards,
  closingText:
    "By combining modern design, technical expertise, and local SEO strategies, we ensure your business ranks higher in Delhi NCR searches and attracts the right customers from your neighborhood.",
  ctaText: "Get a Free Consultation",
  ctaHref: "/contact",
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanAreaLinks(value: unknown): LocalAreaLink[] {
  if (!Array.isArray(value)) return defaultLocalIntroAreas;

  const links = value
    .map((item) => {
      const raw = item as Partial<LocalAreaLink>;
      return {
        name: cleanString(raw.name, ""),
        href: cleanString(raw.href, "#"),
      };
    })
    .filter((item) => item.name);

  return links.length ? links : defaultLocalIntroAreas;
}

function cleanLocationCards(value: unknown): LocalLocationCard[] {
  if (!Array.isArray(value)) return defaultLocalLocationCards;

  const cards = value
    .map((item) => {
      const raw = item as Partial<LocalLocationCard>;
      return {
        name: cleanString(raw.name, ""),
        link: cleanString(raw.link, "#"),
      };
    })
    .filter((item) => item.name);

  return cards.length ? cards : defaultLocalLocationCards;
}

export function getLocalAreasContent(pageContent: unknown): LocalAreasContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const localAreas =
    content.localAreas && typeof content.localAreas === "object" ? content.localAreas : content;

  return {
    title: cleanString(localAreas.title, defaultLocalAreasContent.title),
    introPrefix: cleanString(localAreas.introPrefix, defaultLocalAreasContent.introPrefix),
    introAreas: cleanAreaLinks(localAreas.introAreas),
    introSuffix: cleanString(localAreas.introSuffix, defaultLocalAreasContent.introSuffix),
    description: cleanString(localAreas.description, defaultLocalAreasContent.description),
    highlightText: cleanString(localAreas.highlightText, defaultLocalAreasContent.highlightText),
    mapEmbedUrl: cleanString(localAreas.mapEmbedUrl, defaultLocalAreasContent.mapEmbedUrl),
    mapTitle: cleanString(localAreas.mapTitle, defaultLocalAreasContent.mapTitle),
    locationCards: cleanLocationCards(localAreas.locationCards),
    closingText: cleanString(localAreas.closingText, defaultLocalAreasContent.closingText),
    ctaText: cleanString(localAreas.ctaText, defaultLocalAreasContent.ctaText),
    ctaHref: cleanString(localAreas.ctaHref, defaultLocalAreasContent.ctaHref),
  };
}
