import { getFeatures, type Feature } from "@/lib/data";

export const WHY_CHOOSE_PAGE_SLUG = "why-choose";

export interface WhyChooseContent {
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  visionTitle: string;
  visionImage: string;
  visionImageAlt: string;
  visionQuote: string;
  cards: Feature[];
}

const defaultCards = getFeatures().slice(0, 6);

export const defaultWhyChooseContent: WhyChooseContent = {
  titlePrefix: "Why Choose",
  titleHighlight: "WebDesino?",
  subtitle:
    "We combine technical expertise with creative innovation to deliver digital solutions that stand out.",
  visionTitle: "Our Vision",
  visionImage: "/images/home/why-choose/vision.jpg",
  visionImageAlt: "Why choose WebDesino visual",
  visionQuote:
    "To empower businesses with digital excellence and innovative technology solutions.",
  cards: defaultCards,
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanCards(value: unknown, fallbackCards: Feature[] = defaultCards): Feature[] {
  const source = Array.isArray(value) ? value : [];
  const normalizedFallbacks = fallbackCards.length ? fallbackCards : defaultCards;

  return Array.from({ length: 6 }, (_, index) => {
    const raw = source[index] as Partial<Feature> | undefined;
    const fallback = normalizedFallbacks[index] || defaultCards[index] || {
      number: String(index + 1),
      title: `Feature ${index + 1}`,
      description: "",
    };

    return {
      number: cleanString(raw?.number, fallback.number || String(index + 1)),
      title: cleanString(raw?.title, fallback.title),
      description: cleanString(raw?.description, fallback.description),
    };
  });
}

export function getWhyChooseContent(
  pageContent: unknown,
  fallbackCards: Feature[] = defaultCards
): WhyChooseContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const whyChoose =
    content.whyChoose && typeof content.whyChoose === "object" ? content.whyChoose : content;

  return {
    titlePrefix: cleanString(whyChoose.titlePrefix, defaultWhyChooseContent.titlePrefix),
    titleHighlight: cleanString(whyChoose.titleHighlight, defaultWhyChooseContent.titleHighlight),
    subtitle: cleanString(whyChoose.subtitle, defaultWhyChooseContent.subtitle),
    visionTitle: cleanString(whyChoose.visionTitle, defaultWhyChooseContent.visionTitle),
    visionImage: cleanString(whyChoose.visionImage, defaultWhyChooseContent.visionImage),
    visionImageAlt: cleanString(whyChoose.visionImageAlt, defaultWhyChooseContent.visionImageAlt),
    visionQuote: cleanString(whyChoose.visionQuote, defaultWhyChooseContent.visionQuote),
    cards: cleanCards(whyChoose.cards, fallbackCards),
  };
}
