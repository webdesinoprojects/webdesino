export const AWARDS_SECTION_PAGE_SLUG = "awards-section";

export const awardsIconNames = [
  "Trophy",
  "Award",
  "Medal",
  "Star",
  "BadgeCheck",
  "Crown",
  "Sparkles",
  "ShieldCheck",
  "Gem",
  "Rocket",
  "Flag",
  "Target",
  "Zap",
  "ThumbsUp",
  "Handshake",
] as const;

export type AwardsIconName = (typeof awardsIconNames)[number];

export interface AwardCard {
  iconName: AwardsIconName;
  title: string;
  organization: string;
}

export interface AwardsSectionContent {
  backgroundWord: string;
  titleLineOne: string;
  titleLineTwo: string;
  description: string;
  cards: AwardCard[];
}

export const defaultAwardCards: AwardCard[] = [
  {
    title: "Best Web Development Agency 2024",
    organization: "Delhi Business Awards",
    iconName: "Trophy",
  },
  {
    title: "Top SEO Services Provider",
    organization: "Digital India Awards",
    iconName: "Award",
  },
  {
    title: "Excellence in Digital Marketing",
    organization: "Marketing Excellence Awards",
    iconName: "Medal",
  },
  {
    title: "Innovation in Web Design",
    organization: "Design Excellence Awards",
    iconName: "Star",
  },
];

export const defaultAwardsSectionContent: AwardsSectionContent = {
  backgroundWord: "Awards",
  titleLineOne: "Our Work Speaks Louder",
  titleLineTwo: "with Awards",
  description:
    "Recognized for professional work and high-quality digital solutions that set industry benchmarks. Award-winning web development and SEO services trusted by 100+ businesses in Delhi NCR.",
  cards: defaultAwardCards,
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanIconName(value: unknown): AwardsIconName {
  return awardsIconNames.includes(value as AwardsIconName)
    ? (value as AwardsIconName)
    : "Trophy";
}

function cleanCards(value: unknown): AwardCard[] {
  if (!Array.isArray(value)) return defaultAwardCards;

  const cards = value
    .map((item) => {
      const raw = item as Partial<AwardCard>;

      return {
        iconName: cleanIconName(raw.iconName),
        title: cleanString(raw.title, ""),
        organization: cleanString(raw.organization, ""),
      };
    })
    .filter((item) => item.title && item.organization);

  return cards.length ? cards : defaultAwardCards;
}

export function getAwardsSectionContent(pageContent: unknown): AwardsSectionContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const awardsSection =
    content.awardsSection && typeof content.awardsSection === "object"
      ? content.awardsSection
      : content;

  return {
    backgroundWord: cleanString(
      awardsSection.backgroundWord,
      defaultAwardsSectionContent.backgroundWord
    ),
    titleLineOne: cleanString(
      awardsSection.titleLineOne,
      defaultAwardsSectionContent.titleLineOne
    ),
    titleLineTwo: cleanString(
      awardsSection.titleLineTwo,
      defaultAwardsSectionContent.titleLineTwo
    ),
    description: cleanString(
      awardsSection.description,
      defaultAwardsSectionContent.description
    ),
    cards: cleanCards(awardsSection.cards),
  };
}
