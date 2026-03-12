import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ContactWidget from "@/components/ContactWidget";
import prisma from "@/lib/prisma";

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://webdesino.com"),
  title: {
    default: "Best Web Design Agency in Delhi | SEO Services | Webdesino",
    template: `%s | Webdesino`,
  },
  description: "Webdesino is the top web development company in Delhi NCR. We build affordable, high-performance websites and provide expert SEO services to rank your business #1. Trusted by 100+ businesses in Delhi, Uttam Nagar, Karol Bagh.",
  keywords: ["web design delhi", "web development agency delhi", "seo services delhi", "best web developer delhi ncr", "affordable website design", "top web design agency delhi", "ecommerce website developer delhi", "local seo delhi", "digital marketing delhi"],
  authors: [{ name: "Webdesino" }],
  creator: "Webdesino",
  publisher: "Webdesino",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Web Design Agency in Delhi | SEO Services | Webdesino",
    description: "Webdesino is the top web development company in Delhi NCR. We build affordable, high-performance websites and provide expert SEO services to rank your business #1.",
    url: "https://webdesino.com",
    siteName: "Webdesino",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Webdesino - Web Design and SEO Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Web Design Agency in Delhi | SEO Services | Webdesino",
    description: "Webdesino is the top web development company in Delhi NCR. We build affordable, high-performance websites and provide expert SEO services to rank your business #1.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'kq9IMLIo8C8VIGBSe6WnyRJtNULCKsmMFxWECkFhDl0',
    yandex: 'your-yandex-verification-code',
  },
};

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

