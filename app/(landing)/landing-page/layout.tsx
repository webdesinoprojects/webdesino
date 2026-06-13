import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ContactWidget from "@/components/ContactWidget";
import prisma from "@/lib/prisma";
import { landingContact } from "@/lib/landing-page-data";

export const metadata: Metadata = {
  title: "Digital Growth Services | Webdesino",
  description: "Choose website development, Google Ads, Meta Ads, or SEO Optimization services from Webdesino.",
};

export const revalidate = 3600;

export default async function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locations = await prisma.locationPage.findMany({
    select: {
      location: true,
      slug: true,
    },
    orderBy: {
      location: "asc",
    },
    take: 100,
    distinct: ["location"],
  });

  const uniqueLocationsMap = new Map<string, { name: string; slug: string }>();
  locations.forEach((location) => {
    if (!uniqueLocationsMap.has(location.location)) {
      uniqueLocationsMap.set(location.location, {
        name: location.location,
        slug: location.slug,
      });
    }
  });

  const footerLocations = Array.from(uniqueLocationsMap.values()).slice(0, 50);

  return (
    <>
      <Navbar phoneNumbers={landingContact.phoneNumbers} proposalHref="/landing-page#services" />
      {children}
      <Footer
        locations={footerLocations}
        phoneNumbers={landingContact.phoneNumbers}
        whatsappHref={landingContact.whatsappHref}
      />
      <BottomNav />
      <ContactWidget whatsappHref={landingContact.whatsappHref} hideCallBooking />
    </>
  );
}
