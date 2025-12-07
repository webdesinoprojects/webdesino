import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { Monitor, Smartphone, Megaphone, Palette, Code2, ArrowRight, CheckCircle2 } from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const locations = await prisma.locationPage.findMany({
    select: { slug: true },
  });
  return locations.map((loc) => ({
    slug: loc.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await prisma.locationPage.findUnique({
    where: { slug: params.slug },
  });

  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.description || `Best Web Development Services in ${page.location}`,
  };
}

export default async function LocationPage({ params }: PageProps) {
  const page = await prisma.locationPage.findUnique({
    where: { slug: params.slug },
  });

  if (!page) {
    notFound();
  }

  const locationName = page.location;

  // Dynamic Features for WhyChooseUs
  const features = [
    {
      number: "01",
      title: `Local Expertise in ${locationName}`,
      description: `We understand the ${locationName} market dynamics and tailor our web solutions to resonate with your local audience.`,
    },
    {
      number: "02",
      title: "SEO-Optimized",
      description: "Our websites are built with SEO at the core, ensuring you rank high on Google for local searches.",
    },
    {
      number: "03",
      title: "Affordable Pricing",
      description: `Get premium web development services in ${locationName} at competitive rates suitable for startups and SMEs.`,
    },
  ];

  // Dynamic FAQs
  const faqs = [
    {
      question: `Why do I need a website for my business in ${locationName}?`,
      answer: `A website acts as your 24/7 digital storefront. In a competitive market like ${locationName}, having a professional online presence builds credibility and helps you reach more customers.`,
    },
    {
      question: `How much does web design cost in ${locationName}?`,
      answer: "Our pricing is flexible and depends on your specific requirements. We offer affordable packages tailored for small businesses and startups.",
    },
    {
      question: "Do you provide SEO services along with web design?",
      answer: "Yes! All our websites are SEO-friendly. We also offer dedicated SEO packages to help you rank higher in local search results.",
    },
    {
      question: `How long does it take to build a website?`,
      answer: "Typically, a standard business website takes 1-2 weeks, while more complex e-commerce sites may take 3-4 weeks.",
    },
  ];

  // Services Data (Inline for dynamic location insertion)
  const services = [
    {
      icon: Monitor,
      title: "Website Development",
      description: `Custom, SEO-friendly websites for businesses in ${locationName}.`,
      link: "/services/website-solutions",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Native and hybrid mobile apps to engage your customers on the go.",
      link: "/services/app-development",
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: `Boost your brand visibility in ${locationName} with our expert marketing strategies.`,
      link: "/services/digital-marketing",
    },
    {
      icon: Palette,
      title: "Graphic Designing",
      description: "Creative branding and logo design to make your business stand out.",
      link: "/services/branding",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-[#02066F] text-white py-20 lg:py-32 overflow-hidden">
         <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/20 to-transparent"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                    {page.title}
                </h1>
                <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                    {page.description || `Looking for the best web development company in ${locationName}? We deliver high-performance websites that drive growth.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="#contact" className="px-8 py-4 bg-white text-[#02066F] rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
                        Get a Free Quote
                    </Link>
                    <Link href="tel:+919310851557" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-all">
                        Call Us Now
                    </Link>
                </div>
            </div>
         </div>
      </section>

      {/* Intro / Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg text-slate-600">
                <p className="lead text-xl text-slate-800 font-medium">
                    Are you looking for the <strong>{page.title}</strong>? You are in the right place. 
                    Webdesino is a premier web design and digital marketing agency serving businesses in <strong>{locationName}</strong>.
                </p>
                <p>
                    We specialize in creating high-performance, SEO-friendly websites that drive traffic and convert visitors into customers. 
                    Whether you are a startup or an established business in {locationName}, we have the expertise to take your online presence to the next level.
                </p>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#02066F] mb-4">Our Services in {locationName}</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Comprehensive digital solutions tailored for your business growth.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 group">
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#02066F] transition-colors">
                            <service.icon className="text-[#02066F] group-hover:text-white transition-colors" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                        <p className="text-slate-600 mb-4 text-sm">{service.description}</p>
                        <Link href={service.link} className="text-[#02066F] font-semibold flex items-center gap-2 text-sm hover:gap-3 transition-all">
                            Learn More <ArrowRight size={16} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs features={features} />


      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2 bg-[#02066F] p-8 lg:p-12 text-white flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business in {locationName}?</h2>
                    <p className="mb-8 text-blue-100">
                        Contact us today for a free consultation and quote. Let's build something amazing together.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="text-green-400" /> <span>Free SEO Audit</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="text-green-400" /> <span>Custom Design Strategy</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <CheckCircle2 className="text-green-400" /> <span>24/7 Support</span>
                        </li>
                    </ul>
                </div>
                <div className="md:w-1/2 p-8 lg:p-12">
                    <ContactForm locationName={locationName} />
                </div>
            </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQ faqs={faqs} />
    </main>
  );
}
