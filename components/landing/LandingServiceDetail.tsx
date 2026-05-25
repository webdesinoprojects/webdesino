import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Star,
  Users,
} from "lucide-react";
import ServiceCaseStudies from "@/components/ServiceCaseStudies";
import ServiceEnquiryForm from "@/components/ServiceEnquiryForm";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceFeatures from "@/components/ServiceFeatures";
import ServiceIndustries from "@/components/ServiceIndustries";
import ServiceTechStack from "@/components/ServiceTechStack";
import TrustedSection from "@/components/TrustedSection";
import type { LandingService } from "@/lib/landing-page-data";
import { landingContact, landingServices } from "@/lib/landing-page-data";

interface LandingServiceDetailProps {
  service: LandingService;
}

const partnershipReasons = [
  {
    title: "Professional Quality",
    icon: ShieldCheck,
    description: "High-standard delivery aligned to your business objective.",
  },
  {
    title: "Mobile Ready",
    icon: Smartphone,
    description: "Experiences and campaigns designed for mobile-first customers.",
  },
  {
    title: "Conversion Focus",
    icon: Users,
    description: "Clear journeys built to turn attention into qualified enquiries.",
  },
  {
    title: "Ongoing Support",
    icon: Clock,
    description: "Responsive guidance as performance and priorities evolve.",
  },
];

export default function LandingServiceDetail({ service }: LandingServiceDetailProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-30 backdrop-blur-md bg-slate-50/90">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center gap-0.5 text-xs md:text-sm text-slate-600 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            <Link href="/" className="hover:text-[#111184] transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400 flex-shrink-0" />
            <Link href="/landing-page" className="hover:text-[#111184] transition-colors">Growth Services</Link>
            <ChevronRight size={12} className="text-slate-400 flex-shrink-0" />
            <span className="text-[#111184] font-medium">{service.title}</span>
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden bg-[#08083c] text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.07]" />
        <div className="absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/3 translate-y-1/3 rounded-full bg-[#5353ff]/25 blur-3xl" />
        <div className="container relative z-10 mx-auto px-4 py-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
            <div className="animate-slide-in-left">
              <span className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
                {service.badge}
              </span>
              <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Expert <span className="text-blue-200">{service.title}</span> for measurable growth
              </h1>
              <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-200 lg:text-xl">
                {service.description}
              </p>
              <div className="mb-9 grid gap-3 sm:grid-cols-2">
                {service.benefits.slice(0, 4).map((benefit) => (
                  <p key={benefit} className="flex items-center gap-2 text-sm font-medium text-slate-100">
                    <CheckCircle2 size={17} className="shrink-0 text-blue-300" />
                    {benefit}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#enquiry-form"
                  className="flex items-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-[#111184] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-blue-50"
                >
                  Get Free Consultation <ArrowRight size={19} />
                </Link>
                <a
                  href={landingContact.phoneNumbers[0].href}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
                >
                  <PhoneCall size={18} />
                  Call Now
                </a>
              </div>
            </div>
            <div id="enquiry-form" className="relative z-20 scroll-mt-32 animate-scale-in">
              <div className="rounded-[1.7rem] border border-white/15 bg-white/[0.07] p-2 shadow-2xl shadow-black/20 backdrop-blur-sm">
                <ServiceEnquiryForm
                  serviceTitle={service.title}
                  source="ads-landing"
                  landingService={service.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Why choose <span className="text-[#111184]">Webdesino</span> for {service.title}?
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              Your growth channel needs a practical strategy, careful execution, and meaningful measurement.
            </p>
            <p className="text-slate-600">
              Our team aligns every activity with your business target, whether that is qualified enquiries, stronger visibility, or a better digital sales journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipReasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#111184]/30 transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-[#111184]">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h3>
                  <p className="text-slate-600 text-sm">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div id="features" className="scroll-mt-32">
        <ServiceFeatures serviceTitle={service.title} features={service.features} />
      </div>

      <ServiceTechStack categorySlug={service.categorySlug} />

      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our approach to <span className="text-[#111184]">{service.title}</span>
            </h2>
            <p className="text-lg text-slate-600">
              A focused process keeps delivery transparent, measurable, and aligned with the result you need.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />
            {service.process.map((step, index) => (
              <div key={step.title} className="text-center bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 flex items-center justify-center mx-auto mb-4 shadow-sm relative z-10 text-[#111184]">
                  <span className="text-3xl font-bold opacity-20">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#111184] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                What you gain with our <span className="text-white">{service.title}</span>
              </h2>
              <div className="space-y-6">
                {service.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-4 group">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:bg-white group-hover:text-[#111184] transition-colors duration-300">
                      <Star size={20} className="text-white group-hover:text-[#111184]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{benefit}</h3>
                      <p className="text-gray-300 group-hover:text-white transition-colors">
                        A structured {service.title.toLowerCase()} plan focused on performance, quality, and clear business outcomes.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl animate-pulse-glow" />
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Proven Delivery</h3>
                <p className="text-gray-300 mb-8">
                  Webdesino combines strategy, implementation, and support to help businesses move from interest to measurable progress.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { value: "98%", label: "Client Satisfaction" },
                    { value: "100+", label: "Projects Delivered" },
                    { value: "5+", label: "Years Experience" },
                    { value: "24/7", label: "Support Team" },
                  ].map((result) => (
                    <div key={result.label} className="bg-white/10 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-white mb-1">{result.value}</div>
                      <div className="text-xs text-gray-300">{result.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  href="#enquiry-form"
                  className="block w-full py-4 bg-white text-[#111184] text-center rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg shadow-black/20"
                >
                  Request a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50 border-y border-slate-200">
        <TrustedSection />
      </div>
      <ServiceIndustries />
      <ServiceCaseStudies />
      <ServiceFAQ serviceTitle={service.title} />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Other Growth Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {landingServices
              .filter((relatedService) => relatedService.slug !== service.slug)
              .map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/landing-page/${relatedService.slug}`}
                  className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedService.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{relatedService.description}</p>
                  <span className="inline-flex items-center gap-1 text-[#111184] text-sm font-medium mt-4">
                    View Service <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
