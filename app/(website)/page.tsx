import { Metadata } from "next";
import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import ServicesPills from "@/components/ServicesPills";
import WhyChooseUs from "@/components/WhyChooseUs";
import Portfolio from "@/components/Portfolio";
import IndustriesSection from "@/components/IndustriesSection";
import MaximizeSection from "@/components/MaximizeSection";
import HoverSection from "@/components/HoverSection";
import SpecialistsSection from "@/components/SpecialistsSection";
import AwardsSection from "@/components/AwardsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import TrustedSection from "@/components/TrustedSection";
import ResultsSection from "@/components/ResultsSection";
import LocalAreasSection from "@/components/LocalAreasSection";
import CaseStudiesList from "@/components/CaseStudiesList";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import SaaSSection from "@/components/SaaSSection";
import SEOAuditSection from "@/components/SEOAuditSection";
import BlogSection from "@/components/BlogSection";
import { generateWebSiteSchema } from "@/lib/seo";
import { prisma } from "@/lib/prisma";
import { getStorageUrl } from "@/lib/utils";

const Logo = getStorageUrl("/logo.png");

import {
  getFeatures,
  getResults,
  getHeroShowcaseItems,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Webdesino | Stunning Websites by Top Web Development Agency",
  description:
    "Webdesino is a leading Digital Marketing Agency Delhi and web development company helping businesses grow online with creative websites, SEO, and digital marketing solutions. Trusted by 100+ businesses across Delhi NCR.",
  openGraph: {
    images: [
      {
        url: Logo,
        width: 1200,
        height: 630,
        alt: "Webdesino Logo",
      },
    ],
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
