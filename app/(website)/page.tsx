import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import ServicesPills from "@/components/ServicesPills";
import NewsTicker from "@/components/NewsTicker";
import WhyChooseUs from "@/components/WhyChooseUs";
import IndustriesSection from "@/components/IndustriesSection";
import MaximizeSection from "@/components/MaximizeSection";
import HoverSection from "@/components/HoverSection";
import SpecialistsSection from "@/components/SpecialistsSection";
import TrustedSection from "@/components/TrustedSection";
import { generateWebSiteSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { getStorageUrl } from "@/lib/utils";
import { getHomepageHeroContent, HOMEPAGE_HERO_PAGE_SLUG } from "@/lib/homepage-hero";
import { getTrustedSectionContent, TRUSTED_SECTION_PAGE_SLUG } from "@/lib/trusted-section";
import { getTrustedBrandsContent, TRUSTED_BRANDS_PAGE_SLUG } from "@/lib/trusted-brands";
import { getWhyChooseContent, WHY_CHOOSE_PAGE_SLUG } from "@/lib/why-choose";
import { getIndustriesContent, INDUSTRIES_PAGE_SLUG } from "@/lib/industries-section";
import { getMaximizeSectionContent, MAXIMIZE_SECTION_PAGE_SLUG } from "@/lib/maximize-section";
import { getLocalAreasContent, LOCAL_AREAS_PAGE_SLUG } from "@/lib/local-areas-section";
import { AWARDS_SECTION_PAGE_SLUG, getAwardsSectionContent } from "@/lib/awards-section";
import { getSaasSectionContent, SAAS_SECTION_PAGE_SLUG } from "@/lib/saas-section";

const Logo = getStorageUrl("/logo.png");

import {
  getFeatures,
  getResults,
  getHeroShowcaseItems,
} from "@/lib/data";

const LocalAreasSection = dynamic(() => import("@/components/LocalAreasSection"), {
  loading: () => <div className="min-h-[520px]" aria-hidden="true" />,
});
const BlogSection = dynamic(() => import("@/components/BlogSection"), {
  loading: () => <div className="min-h-[520px]" aria-hidden="true" />,
});
const AwardsSection = dynamic(() => import("@/components/AwardsSection"), {
  loading: () => <div className="min-h-[500px]" aria-hidden="true" />,
});
const BeforeAfterSection = dynamic(() => import("@/components/BeforeAfterSection"), {
  loading: () => <div className="min-h-[560px]" aria-hidden="true" />,
});
const SaaSSection = dynamic(() => import("@/components/SaaSSection"), {
  loading: () => <div className="min-h-[520px]" aria-hidden="true" />,
});
const SEOAuditSection = dynamic(() => import("@/components/SEOAuditSection"), {
  loading: () => <div className="min-h-[280px]" aria-hidden="true" />,
});
const ResultsSection = dynamic(() => import("@/components/ResultsSection"), {
  loading: () => <div className="min-h-[520px]" aria-hidden="true" />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-[500px]" aria-hidden="true" />,
});
const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="min-h-[460px]" aria-hidden="true" />,
});

export const metadata: Metadata = {
  title: "Top Web Development Company in Delhi NCR | Webdesino",
  description:
    "Webdesino is a leading web development and digital marketing agency in Delhi NCR offering SEO, website design and digital marketing services.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Top Web Development Company in Delhi NCR | Webdesino",
    description:
      "Webdesino is a leading web development and digital marketing agency in Delhi NCR offering SEO, website design and digital marketing services.",
    url: "https://webdesino.com",
    type: "website",
    images: [
      {
        url: Logo,
        width: 1200,
        height: 630,
        alt: "Webdesino - Top Web Development Company in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Web Development Company in Delhi NCR | Webdesino",
    description:
      "Webdesino is a leading web development and digital marketing agency in Delhi NCR offering SEO, website design and digital marketing services.",
    images: [Logo],
  },
};

export default async function Home() {
  // Fetch all data on the server
  const projects = await prisma.project.findMany();
  const testimonials = await prisma.testimonial.findMany();
  const services = await prisma.serviceCategory.findMany();
  const homePage = await prisma.page.findUnique({
    where: { slug: HOMEPAGE_HERO_PAGE_SLUG },
  });
  const trustedSectionPage = await prisma.page.findUnique({
    where: { slug: TRUSTED_SECTION_PAGE_SLUG },
  });
  const trustedBrandsPage = await prisma.page.findUnique({
    where: { slug: TRUSTED_BRANDS_PAGE_SLUG },
  });
  const whyChoosePage = await prisma.page.findUnique({
    where: { slug: WHY_CHOOSE_PAGE_SLUG },
  });
  const industriesPage = await prisma.page.findUnique({
    where: { slug: INDUSTRIES_PAGE_SLUG },
  });
  const maximizeSectionPage = await prisma.page.findUnique({
    where: { slug: MAXIMIZE_SECTION_PAGE_SLUG },
  });
  const localAreasPage = await prisma.page.findUnique({
    where: { slug: LOCAL_AREAS_PAGE_SLUG },
  });
  const awardsSectionPage = await prisma.page.findUnique({
    where: { slug: AWARDS_SECTION_PAGE_SLUG },
  });
  const saasSectionPage = await prisma.page.findUnique({
    where: { slug: SAAS_SECTION_PAGE_SLUG },
  });
  const faqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
  });
  
  const features = getFeatures();
  const results = getResults();
  const heroShowcaseItems = getHeroShowcaseItems();
  const homepageHeroContent = getHomepageHeroContent(homePage?.content, heroShowcaseItems);
  const trustedSectionContent = getTrustedSectionContent(trustedSectionPage?.content);
  const trustedBrandsContent = getTrustedBrandsContent(trustedBrandsPage?.content);
  const whyChooseContent = getWhyChooseContent(whyChoosePage?.content, features);
  const industriesContent = getIndustriesContent(industriesPage?.content);
  const maximizeSectionContent = getMaximizeSectionContent(maximizeSectionPage?.content);
  const localAreasContent = getLocalAreasContent(localAreasPage?.content);
  const awardsSectionContent = getAwardsSectionContent(awardsSectionPage?.content);
  const saasSectionContent = getSaasSectionContent(saasSectionPage?.content);
  
  const jsonLd = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero showcaseItems={heroShowcaseItems} content={homepageHeroContent} />
        <NewsTicker />
        <TrustedSection content={trustedSectionContent} brandsContent={trustedBrandsContent} />
        <ServicesOverview categories={services} />
        <ServicesPills />
        <WhyChooseUs features={features} content={whyChooseContent} />
        <IndustriesSection content={industriesContent} />
        {/* <Suspense fallback={<div>Loading portfolio...</div>}>
          <Portfolio projects={projects} />
        </Suspense> */}
        <MaximizeSection content={maximizeSectionContent} />
        <HoverSection />
        <SpecialistsSection />
        <LocalAreasSection content={localAreasContent} />
        <BlogSection />
        <AwardsSection content={awardsSectionContent} />
        <BeforeAfterSection />
        <SaaSSection content={saasSectionContent} />
        <SEOAuditSection />
        <ResultsSection results={results} />
        {/* <Suspense fallback={<div>Loading case studies...</div>}>
          <CaseStudiesList caseStudies={caseStudies} />
        </Suspense> */}
        <Testimonials testimonials={testimonials} />
        <FAQ faqs={faqs} />
      </main>
    </>
  );
}
