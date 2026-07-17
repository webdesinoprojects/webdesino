export const SAAS_SECTION_PAGE_SLUG = "saas-section";

export interface SaasStep {
  step: string;
  title: string;
}

export interface SaasSectionContent {
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  steps: SaasStep[];
}

export const defaultSaasSteps: SaasStep[] = [
  { step: "01", title: "Signup" },
  { step: "02", title: "Choose A Plan" },
  { step: "03", title: "Implementation" },
  { step: "04", title: "Final Result" },
];

export const defaultSaasSectionContent: SaasSectionContent = {
  eyebrow: "OPTIMIZE YOUR MARKETING",
  title: "Take Control Of Your Business Processes With Our SaaS",
  description:
    "Streamline your business operations with our tailored SaaS solutions. Our platforms offer seamless integration and user-friendly interfaces, allowing you to manage tasks and optimize workflows efficiently. With real-time insights, customizable features, and scalable options, our tools empower you to stay ahead in a competitive market.",
  ctaText: "Get Started Now",
  ctaHref: "/contact",
  steps: defaultSaasSteps,
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanSteps(value: unknown): SaasStep[] {
  if (!Array.isArray(value)) return defaultSaasSteps;

  const steps = value
    .map((item) => {
      const raw = item as Partial<SaasStep>;

      return {
        step: cleanString(raw.step, ""),
        title: cleanString(raw.title, ""),
      };
    })
    .filter((item) => item.step && item.title);

  return steps.length ? steps : defaultSaasSteps;
}

export function getSaasSectionContent(pageContent: unknown): SaasSectionContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const saasSection =
    content.saasSection && typeof content.saasSection === "object"
      ? content.saasSection
      : content;

  return {
    eyebrow: cleanString(saasSection.eyebrow, defaultSaasSectionContent.eyebrow),
    title: cleanString(saasSection.title, defaultSaasSectionContent.title),
    description: cleanString(
      saasSection.description,
      defaultSaasSectionContent.description
    ),
    ctaText: cleanString(saasSection.ctaText, defaultSaasSectionContent.ctaText),
    ctaHref: cleanString(saasSection.ctaHref, defaultSaasSectionContent.ctaHref),
    steps: cleanSteps(saasSection.steps),
  };
}
