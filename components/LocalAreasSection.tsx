"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import {
  defaultLocalAreasContent,
  type LocalAreasContent,
} from "@/lib/local-areas-section";

interface LocalAreasSectionProps {
  content?: LocalAreasContent;
}

export default function LocalAreasSection({
  content = defaultLocalAreasContent,
}: LocalAreasSectionProps) {
  return (
    <section className="py-10 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#111184]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#111184]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#111184] mb-6 animate-fade-in">
            {content.title}
          </h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <p>
              {content.introPrefix}{" "}
              {content.introAreas.map((area, idx) => (
                <span key={idx}>
                  <Link href={area.href} className="text-[#111184] hover:underline font-medium">
                    {area.name}
                  </Link>
                  {idx < content.introAreas.length - 1 ? ", " : ""}
                </span>
              ))}
              {" "}
              {content.introSuffix}
            </p>
            <p>{content.description}</p>
            <p className="font-semibold text-[#111184]">
              {content.highlightText}
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div className="w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-white/20 glass mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <iframe
            src={content.mapEmbedUrl}
            title={content.mapTitle}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Location Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {content.locationCards.map((location, idx) => (
            <Link
              key={idx}
              href={location.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 p-6 rounded-2xl glass hover:glass-strong transition-all duration-300 hover-lift animate-fade-in"
              style={{ animationDelay: `${idx * 0.1 + 0.2}s` }}
            >
              <MapPin className="text-[#111184] flex-shrink-0 group-hover:scale-110 transition-transform" size={24} />
              <span className="font-semibold text-[#111184] group-hover:text-[#111184]/80 transition-colors">
                {location.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed mb-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {content.closingText}
          </p>
          <Link
            href={content.ctaHref}
            className="inline-flex items-center gap-2 bg-[#111184] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300 hover-lift animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            {content.ctaText} →
          </Link>
        </div>
      </div>
    </section>
  );
}
