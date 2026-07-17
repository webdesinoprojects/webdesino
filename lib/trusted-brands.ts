export const TRUSTED_BRANDS_PAGE_SLUG = "trusted-brands";

export interface TrustedBrandSpotlight {
  name: string;
  logo: string;
  link: string;
  rating: number;
}

export interface TrustedBrandsContent {
  title: string;
  brands: TrustedBrandSpotlight[];
}

export const defaultTrustedBrandSpotlights: TrustedBrandSpotlight[] = [
  {
    name: "UAG",
    logo: "/uag.png",
    link: "https://www.urbanarmorgear.com/",
    rating: 5,
  },
  {
    name: "Aadiva",
    logo: "/aadiva.png",
    link: "https://aadiva.com/",
    rating: 5,
  },
  {
    name: "Bulkwala",
    logo: "/bulkwala.jpg",
    link: "https://bulkwala.com/",
    rating: 5,
  },
  {
    name: "Bookbuzz",
    logo: "/bookbuzz.png",
    link: "https://www.thebookbuzz.in/",
    rating: 5,
  },
  {
    name: "BuyKhariBauli",
    logo: "/buykharibauli.png",
    link: "https://buykharibaoli.com/",
    rating: 5,
  },
  {
    name: "Landsaathi",
    logo: "/landsaathi.png",
    link: "https://landsathi.com/",
    rating: 5,
  },
  {
    name: "Agnishila",
    logo: "/agnishila.png",
    link: "https://agnishila.in/",
    rating: 5,
  },
  {
    name: "Maxlift",
    logo: "/maxlift.png",
    link: "https://www.maxlift.in/",
    rating: 5,
  },
];

export const defaultTrustedBrandsContent: TrustedBrandsContent = {
  title: "Trusted by leading brands",
  brands: defaultTrustedBrandSpotlights,
};

function cleanString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function cleanRating(value: unknown): number {
  const numberValue = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numberValue)) return 5;
  return Math.min(5, Math.max(1, Math.round(numberValue)));
}

function cleanBrands(value: unknown): TrustedBrandSpotlight[] {
  if (!Array.isArray(value)) return defaultTrustedBrandSpotlights;

  const brands = value
    .map((item) => {
      const raw = item as Partial<TrustedBrandSpotlight>;
      return {
        name: cleanString(raw.name, ""),
        logo: cleanString(raw.logo, ""),
        link: cleanString(raw.link, "#"),
        rating: cleanRating(raw.rating),
      };
    })
    .filter((item) => item.name && item.logo);

  return brands.length ? brands : defaultTrustedBrandSpotlights;
}

export function getTrustedBrandsContent(pageContent: unknown): TrustedBrandsContent {
  const content = pageContent && typeof pageContent === "object" ? (pageContent as any) : {};
  const trustedBrands =
    content.trustedBrands && typeof content.trustedBrands === "object"
      ? content.trustedBrands
      : content;

  return {
    title: cleanString(trustedBrands.title, defaultTrustedBrandsContent.title),
    brands: cleanBrands(trustedBrands.brands),
  };
}
