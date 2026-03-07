"use client";

import Link from "next/link";
import { Building, Briefcase, GraduationCap, ShoppingCart, Rocket, Building2, Shirt, Globe } from "lucide-react";

const industries = [
  {
    icon: Building,
    title: "Real Estate",
    description: "High-performance real estate websites with property listings, lead forms, and SEO-ready structures.",
    example: "Land Sathi",
    link: "https://landsathi.com/",
  },
  {
    icon: Briefcase,
    title: "Agencies & Startups",
    description: "Conversion-focused websites for startups and agencies to build credibility and attract clients.",
    example: "Ambassador Perk",
    link: "https://ambassadorperk.com/",
  },
  {
    icon: GraduationCap,
    title: "Education & Training",
    description: "Online learning platforms and coaching institute websites with student-friendly navigation.",
    example: "ProSkills Hub",
    link: "https://proskillshub.com/",
  },
  {
    icon: Building,
    title: "Healthcare & Clinics",
    description: "Trusted healthcare websites for hospitals, clinics, and medical suppliers with appointment booking.",
    example: "Mentok Healthcare",
    link: "https://mentokhealthcare.com/",
  },
  {
    icon: ShoppingCart,
    title: "Ecommerce & Retail",
    description: "Ecommerce websites with integrated payments, modern UI, and optimized product catalogs.",
    example: "Buy Khari Bauli",
    link: "https://buykharibauli.com/",
  },
  {
    icon: Rocket,
    title: "Small Businesses",
    description: "Affordable, professional websites for SMEs and local businesses to boost online presence.",
    example: "Book Buzzz",
    link: "https://bookbuzzz.com/",
  },
  {
    icon: Building2,
    title: "Corporate & SaaS",
    description: "Corporate and SaaS websites with clean UI, secure integrations, and lead generation systems.",
    example: "CS Hub",
    link: "https://cshub.in/",
  },
  {
    icon: Shirt,
    title: "Fashion & Lifestyle",
    description: "Stylish, modern websites for fashion, lifestyle, and wellness brands with ecommerce features.",
    example: "Nourish Mantra",
    link: "https://nourishmentra.com/",
  },
  {
    icon: Globe,
    title: "Freelance & Talent Platforms",
    description: "Dynamic platforms for talent acquisition, freelance gigs, and creative marketplaces.",
    example: "Site Karo",
    link: "https://sitekaro-rajeev-thes-projects.vercel.app/",
  },
];

export default function IndustriesSection() {
  return (
    <section className="py-10 lg:py-16 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#111184] mb-4 animate-fade-in">
            Industries We Serve
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            At WebDesino, we deliver tailor-made websites and digital solutions for businesses across multiple industries. From real estate and ecommerce to healthcare, startups, and education, we build SEO-optimized websites that generate leads, boost sales, and build trust.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, idx) => {
            const Icon = industry.icon;
            return (
              <Link
                key={idx}
                href={industry.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 lg:p-8 rounded-3xl glass hover:glass-strong transition-all duration-300 hover-lift animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <Icon className="text-[#111184] group-hover:text-[#111184]/80 transition-colors duration-300" size={40} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#111184] mb-3 group-hover:text-[#111184]/80 transition-all">
                  {industry.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {industry.description}
                </p>

                {/* Example Link */}
                <div
                  className="inline-flex items-center gap-2 text-[#111184] font-semibold text-sm hover:gap-3 transition-all"
                >
                  View Example – {industry.example}
                  <span className="text-xl">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
