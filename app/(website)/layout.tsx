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

  const footerLocations = locations.map(loc => ({
    name: loc.location,
    slug: loc.slug,
  }));

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

