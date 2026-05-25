import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import AnimatedLandingWord from "@/components/landing/AnimatedLandingWord";
import { landingContact, landingServices, type LandingServiceSlug } from "@/lib/landing-page-data";

export const metadata: Metadata = {
  title: "Website, Ads and SEO Services | Webdesino",
  description:
    "Choose Website Development, Google Ads, Meta Ads, or SEO Optimization services and request a free consultation.",
};

const marqueeItems = [
  "Google Ads",
  "Meta Ads",
  "Website Development",
  "SEO Optimization",
  "Lead Generation",
  "Landing Pages",
  "Conversion Tracking",
  "Performance Marketing",
];

const serviceVisuals: Record<
  LandingServiceSlug,
  {
    image: string;
    cardClassName: string;
    imageClassName: string;
    description: string;
  }
> = {
  "web-development": {
    image: "/images/landing-page/Website Creator-amico.svg",
    cardClassName: "md:col-span-2 md:row-span-2 bg-[#e9e3ff]",
    imageClassName: "bottom-2 left-1/2 h-[53%] w-[86%] -translate-x-1/2 md:h-[56%]",
    description: "Fast, responsive websites built to turn visitors into enquiries.",
  },
  "google-ads": {
    image: "/images/landing-page/Target-amico.svg",
    cardClassName: "md:col-span-4 bg-[#ffe1ec]",
    imageClassName: "bottom-0 right-3 h-[75%] w-[48%] md:w-[43%]",
    description: "Capture high-intent searches with measurable paid campaigns.",
  },
  "meta-ads": {
    image: "/images/landing-page/Mobile Marketing-amico.svg",
    cardClassName: "md:col-span-2 bg-[#e6f4ef]",
    imageClassName: "bottom-0 right-1 h-[59%] w-[58%]",
    description: "Reach and retarget customers across Facebook and Instagram.",
  },
  "seo-optimization": {
    image: "/images/landing-page/SEO-amico.svg",
    cardClassName: "md:col-span-2 bg-[#fff0bf]",
    imageClassName: "bottom-0 right-0 h-[57%] w-[58%]",
    description: "Build sustainable visibility through search-first growth.",
  },
};

const proofPoints = ["Free consultation", "Strategy built around leads", "Fast response"];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fffdfa]">
      <section className="relative min-h-[600px] overflow-hidden px-4 pb-24 pt-16 lg:min-h-[670px] lg:pt-20">
        <div className="absolute -left-24 top-40 h-64 w-64 rounded-full bg-[#ece6ff]/70 blur-3xl" />
        <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-[#ffe1ec]/70 blur-3xl" />

        <div className="absolute left-[7%] top-[17%] hidden h-20 w-24 -rotate-6 items-center justify-center rounded-3xl bg-[#ffe1ec] shadow-sm lg:flex animate-float">
          <Image src="/images/landing-page/Target-amico.svg" alt="" width={94} height={68} className="h-[68px] w-[94px] object-contain" />
        </div>
        <div className="absolute right-[9%] top-[15%] hidden h-[82px] w-[110px] rotate-6 items-center justify-center rounded-3xl bg-[#e9e3ff] shadow-sm lg:flex animate-float" style={{ animationDelay: "0.7s" }}>
          <Image src="/images/landing-page/SEO-amico.svg" alt="" width={94} height={72} className="h-[74px] w-[98px] object-contain" />
        </div>
        <div className="absolute left-[3%] top-[47%] hidden h-40 w-52 -rotate-3 items-end justify-center rounded-[2rem] bg-[#e6f4ef]/65 p-2 shadow-sm lg:flex animate-float" style={{ animationDelay: "1.1s" }}>
          <Image src="/images/landing-page/Marketing-pana.svg" alt="" width={750} height={500} className="h-[145px] w-[205px] object-contain" />
        </div>
        <div className="absolute right-[3%] top-[45%] hidden h-40 w-52 rotate-2 items-end justify-center rounded-[2rem] bg-[#fff0bf]/60 p-2 shadow-sm lg:flex animate-float" style={{ animationDelay: "1.5s" }}>
          <Image src="/images/landing-page/Marketing-cuate.svg" alt="" width={750} height={500} className="h-[145px] w-[205px] object-contain" />
        </div>
        <div className="absolute bottom-[10%] left-[17%] hidden h-20 w-24 rotate-6 items-center justify-center rounded-3xl bg-[#fff0bf] shadow-sm xl:flex animate-float" style={{ animationDelay: "0.35s" }}>
          <Image src="/images/landing-page/Website Creator-amico.svg" alt="" width={88} height={66} className="h-[68px] w-[90px] object-contain" />
        </div>
        <div className="absolute bottom-[12%] right-[17%] hidden h-20 w-24 -rotate-6 items-center justify-center rounded-3xl bg-[#ffe1ec] shadow-sm xl:flex animate-float" style={{ animationDelay: "1.8s" }}>
          <Image src="/images/landing-page/Mobile Marketing-amico.svg" alt="" width={88} height={68} className="h-[68px] w-[90px] object-contain" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-8 inline-flex rounded-full border border-[#111184]/10 bg-white px-5 py-2 text-sm font-semibold text-[#111184] shadow-sm">
            Digital growth for businesses ready to scale
          </p>
          <h1 className="text-balance text-4xl font-bold leading-[1.12] text-slate-900 sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Turn attention into
            <span className="block">
              <AnimatedLandingWord />
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Websites, Google Ads, Meta Ads and SEO working together to create qualified enquiries and measurable business growth.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111184] px-8 py-4 font-bold text-white shadow-xl shadow-[#111184]/15 transition hover:-translate-y-0.5 hover:bg-[#0b0b68]"
            >
              Explore Services <ArrowRight size={18} />
            </Link>
            <a
              href={landingContact.phoneNumbers[0].href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#111184]/15 bg-white px-8 py-4 font-semibold text-[#111184] transition hover:border-[#111184]/30"
            >
              <PhoneCall size={18} />
              {landingContact.phoneNumbers[0].display}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-medium text-slate-500">
            {proofPoints.map((point) => (
              <span key={point} className="inline-flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#111184]" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Growth services" className="relative -mt-6 h-40 overflow-hidden md:h-48">
        <div className="absolute left-[-5%] top-[55px] w-[110%] -rotate-[4deg] border-y border-[#111184]/10 bg-[#f1eeff] py-4 text-[#111184] shadow-sm">
          <div className="flex min-w-max animate-marquee gap-12">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-12 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.22em] md:text-base">
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-[#111184]/40" />
              </span>
            ))}
          </div>
        </div>
        <div className="absolute left-[-5%] top-[55px] w-[110%] rotate-[4deg] border-y border-[#111184]/10 bg-white py-4 text-slate-700 shadow-sm">
          <div className="flex min-w-max animate-marquee gap-12 [animation-direction:reverse]">
            {[...marqueeItems.slice().reverse(), ...marqueeItems.slice().reverse()].map((item, index) => (
              <span key={`${item}-reverse-${index}`} className="inline-flex items-center gap-12 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.22em] md:text-base">
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-[#111184]/35" />
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-32 px-4 pb-16 pt-4 lg:pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#111184]">What we do</p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Choose the channel that fits your goal
            </h2>
          </div>

          <div className="grid auto-rows-[255px] gap-4 md:grid-cols-6 md:auto-rows-[225px]">
            {landingServices.map((service) => {
              const visual = serviceVisuals[service.slug];

              return (
                <Link
                  key={service.slug}
                  href={`/landing-page/${service.slug}`}
                  className={`${visual.cardClassName} group relative overflow-hidden rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className="relative z-10 max-w-[60%] md:max-w-[58%]">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#111184]/70">
                      {service.badge}
                    </p>
                    <h3 className="mb-3 text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-700">{visual.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#111184]">
                      View service <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                  <div className={`absolute ${visual.imageClassName}`}>
                    <Image
                      src={visual.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 55vw, 35vw"
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 pb-16 lg:pb-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 rounded-[2rem] bg-[#111184] px-8 py-10 text-white md:flex-row md:px-12">
          <div className="max-w-xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-blue-200">Get your plan</p>
            <h2 className="text-3xl font-bold">Ready to grow with the right channel?</h2>
            <p className="mt-3 text-white/75">Share your requirement and our team will guide you toward the most practical next step.</p>
          </div>
          <Link
            href="/landing-page/google-ads#enquiry-form"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-[#111184] transition hover:bg-blue-50"
          >
            Request a Free Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
