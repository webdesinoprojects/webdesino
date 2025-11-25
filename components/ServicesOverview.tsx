"use client";

import Link from "next/link";
import { Monitor, Smartphone, Megaphone, Palette, ArrowRight, Code2, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Website Development",
    description: "Custom, SEO-friendly, and responsive websites tailored to your business needs. From corporate sites to landing pages, we build it all.",
    link: "/services/website-solutions",
    color: "text-blue-600",
    bg: "bg-blue-50",
    borderColor: "border-blue-100"
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Native and hybrid mobile applications for iOS and Android. We create seamless user experiences that keep your customers engaged.",
    link: "/services/website-solutions",
    color: "text-purple-600",
    bg: "bg-purple-50",
    borderColor: "border-purple-100"
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Data-driven SEO, Social Media, and PPC campaigns to boost your visibility. We help you reach your target audience and drive conversions.",
    link: "/services/digital-marketing",
    color: "text-orange",
    bg: "bg-orange/10",
    borderColor: "border-orange/20"
  },
  {
    icon: Palette,
    title: "Graphic Designing",
    description: "Creative branding, logo design, and marketing collaterals that speak your brand language. Stand out with stunning visuals.",
    link: "/services/graphic-designing",
    color: "text-pink-600",
    bg: "bg-pink-50",
    borderColor: "border-pink-100"
  },
  {
    icon: Code2,
    title: "SaaS Solutions",
    description: "Scalable software solutions to streamline your business operations. Automate workflows and improve efficiency with our custom tools.",
    link: "/services/seo-services",
    color: "text-teal",
    bg: "bg-teal/10",
    borderColor: "border-teal/20"
  },
  {
    icon: BarChart3,
    title: "SEO Services",
    description: "Rank higher on Google with our proven SEO strategies. We focus on local SEO, technical optimization, and content marketing.",
    link: "/services/seo-services",
    color: "text-green-600",
    bg: "bg-green-50",
    borderColor: "border-green-100"
  }
];

export default function ServicesOverview() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange font-bold tracking-wider uppercase text-sm mb-2 block">What We Do</span>
          <h2 className="text-3xl lg:text-5xl font-bold text-teal mb-6">
            Comprehensive Digital Solutions
          </h2>
          <p className="text-lg text-gray-600">
            We don't just build websites; we build digital businesses. Explore our wide range of services designed to help you grow online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx}
              className={`group p-8 rounded-2xl border ${service.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${service.bg} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500`} />
              
              <div className={`w-14 h-14 rounded-xl ${service.bg} ${service.color} flex items-center justify-center mb-6 relative z-10`}>
                <service.icon size={28} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10 group-hover:text-teal transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                {service.description}
              </p>

              <Link 
                href={service.link}
                className={`inline-flex items-center gap-2 font-semibold ${service.color} group-hover:gap-3 transition-all relative z-10`}
              >
                Learn More <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
