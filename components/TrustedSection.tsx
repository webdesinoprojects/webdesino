import Link from "next/link";
import NextImage from "next/image";
import { Award, Users, Briefcase, Shield } from "lucide-react";
import { getStorageUrl } from "@/lib/utils";
import {
  defaultTrustedSectionContent,
  type TrustedSectionContent,
  type TrustedSectionIconName,
} from "@/lib/trusted-section";
import {
  defaultTrustedBrandsContent,
  type TrustedBrandsContent,
  type TrustedBrandSpotlight,
} from "@/lib/trusted-brands";

const statIcons: Record<TrustedSectionIconName, typeof Users> = {
  Users,
  Briefcase,
  Shield,
  Award,
};

interface TrustedSectionProps {
  content?: TrustedSectionContent;
  brandsContent?: TrustedBrandsContent;
}

export default function TrustedSection({
  content = defaultTrustedSectionContent,
  brandsContent = defaultTrustedBrandsContent,
}: TrustedSectionProps) {
  const renderSpotlightCard = (
    client: TrustedBrandSpotlight,
    keyPrefix: string,
    index: number,
    isDuplicate = false
  ) => (
    <Link
      key={`${keyPrefix}-${index}`}
      href={client.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${client.name}`}
      aria-hidden={isDuplicate}
      tabIndex={isDuplicate ? -1 : 0}
      className="flex-shrink-0 w-[72vw] min-w-[240px] sm:w-[52vw] md:w-[280px] md:min-w-[280px] lg:w-[300px] lg:min-w-[300px] xl:w-[320px] xl:min-w-[320px] group cursor-pointer"
    >
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1 group-hover:shadow-2xl border border-white/10 bg-white/85 group-hover:bg-white/95 backdrop-blur-md">
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/95">
          <NextImage
            src={getStorageUrl(client.logo)}
            alt={client.name}
            fill
            className="object-contain p-10 md:p-12 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#111184]/80 via-[#111184]/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 backdrop-blur-xl bg-[#111184]/90 border-t border-white/30">
          <div className="flex gap-1 mb-3">
            {Array.from({ length: client.rating }).map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white mb-1">
            {client.name}
          </h3>

          <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#111184]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 animate-fade-in">
            {content.title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {content.description}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
          {content.stats.map((stat, idx) => {
            const Icon = statIcons[stat.iconName] || Users;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white border border-slate-100 shadow-lg hover:shadow-xl hover:border-[#111184]/20 text-center hover-lift transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
              >
                <Icon className="mx-auto mb-4 text-[#111184]" size={48} />
                <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Certifications Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              {content.certificationTitle}
            </h3>
            <p className="text-slate-600">
              {content.certificationDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-8">
            {content.certifications.map((cert, idx) => (
              <Link
                key={idx}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 sm:p-6 rounded-2xl glass hover:glass-strong text-center transition-all duration-300 hover-lift animate-fade-in"
                style={{ animationDelay: `${idx * 0.1 + 0.5}s` }}
                aria-label={cert.name}
              >
                <div className="mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <NextImage
                    src={getStorageUrl(cert.logo)}
                    alt={cert.name}
                    width={100}
                    height={100}
                    className="w-full h-auto object-contain max-w-[60px] sm:max-w-[70px] md:max-w-[80px] mx-auto"
                  />
                </div>
                <div className="text-xs text-gray-600 group-hover:text-[#111184] transition-colors font-medium">
                  {cert.name.replace(" Delhi NCR", "")}
                </div>
              </Link>
            ))}
          </div>

          {/* Optimize Your Marketing Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong animate-fade-in" style={{ animationDelay: '1s' }}>
              <Award className="text-[#111184]" size={24} />
              <span className="text-sm font-bold text-[#111184] uppercase tracking-wider">
                {content.badgeText}
              </span>
            </div>
          </div>
        </div>

        {/* Trusted by Leading Brands - Premium Carousel */}
        <div className="py-16 md:py-24 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-12 text-center">
              {brandsContent.title}
            </h2>

            {/* Testimonial Cards Carousel */}
            <div className="relative group/carousel">
              <div
                className="overflow-hidden relative w-full pb-4 [--marquee-duration:18s] lg:[--marquee-duration:28s]"
                style={{
                  maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                }}
              >
                <div
                  className="flex w-max gap-4 md:gap-8 hover:[animation-play-state:paused]"
                  style={{
                    animation: "marquee var(--marquee-duration) linear infinite",
                  }}
                >
                  {/* First Set */}
                  {brandsContent.brands.map((client, index) =>
                    renderSpotlightCard(client, "set1", index)
                  )}

                  {/* Second Set (Duplicate for seamless loop) */}
                  <div className="flex gap-4 md:gap-8" aria-hidden="true">
                    {brandsContent.brands.map((client, index) =>
                      renderSpotlightCard(client, "set2", index, true)
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
