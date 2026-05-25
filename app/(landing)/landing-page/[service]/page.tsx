import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingServiceDetail from "@/components/landing/LandingServiceDetail";
import { getLandingService, landingServices } from "@/lib/landing-page-data";

interface LandingServicePageProps {
  params: {
    service: string;
  };
}

export function generateStaticParams() {
  return landingServices.map((service) => ({ service: service.slug }));
}

export function generateMetadata({ params }: LandingServicePageProps): Metadata {
  const service = getLandingService(params.service);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} Services | Webdesino`,
    description: service.description,
    alternates: {
      canonical: `/landing-page/${service.slug}`,
    },
  };
}

export default function LandingServicePage({ params }: LandingServicePageProps) {
  const service = getLandingService(params.service);

  if (!service) {
    notFound();
  }

  return <LandingServiceDetail service={service} />;
}
