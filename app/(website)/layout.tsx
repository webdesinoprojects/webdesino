import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ContactWidget from "@/components/ContactWidget";
import prisma from "@/lib/prisma";
import { generateDefaultMetadata } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = generateDefaultMetadata();

export default async function WebsiteLayout({
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
      location: 'asc',
    },
  });

  // Deduplicate locations - show each location only once
  const uniqueLocationsMap = new Map<string, { name: string; slug: string }>();
  locations.forEach(loc => {
    if (!uniqueLocationsMap.has(loc.location)) {
      uniqueLocationsMap.set(loc.location, {
        name: loc.location,
        slug: loc.slug,
      });
    }
  });
  
  const footerLocations = Array.from(uniqueLocationsMap.values());

  return (
    <>
      <Navbar />
      {children}
      <Footer locations={footerLocations} />
      <BottomNav />
      <ContactWidget />
    </>
  );
}

