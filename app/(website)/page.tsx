import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import ServicesPills from "@/components/ServicesPills";
import WhyChooseUs from "@/components/WhyChooseUs";
import IndustriesSection from "@/components/IndustriesSection";
import MaximizeSection from "@/components/MaximizeSection";
import HoverSection from "@/components/HoverSection";
import SpecialistsSection from "@/components/SpecialistsSection";
import TrustedSection from "@/components/TrustedSection";
import { generateWebSiteSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { getStorageUrl } from "@/lib/utils";

const Logo = getStorageUrl("/logo.png");

import {
  getFeatures,
  getResults,
  getHeroShowcaseItems,
} from "@/lib/data";

const LocalAreasSection = dynamic(() => import("@/components/LocalAreasSection"));
const BlogSection = dynamic(() => import("@/components/BlogSection"));
const AwardsSection = dynamic(() => import("@/components/AwardsSection"));
const BeforeAfterSection = dynamic(() => import("@/components/BeforeAfterSection"));
const SaaSSection = dynamic(() => import("@/components/SaaSSection"));
const SEOAuditSection = dynamic(() => import("@/components/SEOAuditSection"));
const ResultsSection = dynamic(() => import("@/components/ResultsSection"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));

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
  const faqs = await prisma.faq.findMany({
    orderBy: { order: 'asc' },
  });
  
  const features = getFeatures();
  const results = getResults();
  const heroShowcaseItems = getHeroShowcaseItems();
  
  const jsonLd = generateWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero showcaseItems={heroShowcaseItems} />
      <TrustedSection />
      <ServicesOverview categories={services} />
      <ServicesPills />
      <WhyChooseUs features={features} />
      <IndustriesSection />
      {/* <Suspense fallback={<div>Loading portfolio...</div>}>
        <Portfolio projects={projects} />
      </Suspense> */}
      <MaximizeSection />
      <HoverSection />
      <SpecialistsSection />
      <LocalAreasSection />
      <BlogSection />
      <AwardsSection />
      <BeforeAfterSection />
      <SaaSSection />
      <SEOAuditSection />
      <ResultsSection results={results} />
      {/* <Suspense fallback={<div>Loading case studies...</div>}>
        <CaseStudiesList caseStudies={caseStudies} />
      </Suspense> */}
      <Testimonials testimonials={testimonials} />
      <FAQ faqs={faqs} />
    </>
  );
}
