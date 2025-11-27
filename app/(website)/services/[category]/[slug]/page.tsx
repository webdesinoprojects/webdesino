import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData } from "@/lib/services-data";
import { ArrowRight, CheckCircle2, Star, ChevronRight, ShieldCheck, Zap, Users, Clock, Smartphone } from "lucide-react";
import { generateServiceSchema, generateBreadcrumbSchema, BASE_URL } from "@/lib/seo";
import ServiceEnquiryForm from "@/components/ServiceEnquiryForm";
import ServiceTechStack from "@/components/ServiceTechStack";
import ServiceIndustries from "@/components/ServiceIndustries";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceFeatures from "@/components/ServiceFeatures";
import ServiceCaseStudies from "@/components/ServiceCaseStudies";
import TrustedSection from "@/components/TrustedSection";

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const params = [];
  for (const category of servicesData) {
    for (const subtype of category.subtypes) {
      params.push({
        category: category.slug,
        slug: subtype.slug,
      });
    }
  }
  return params;
}

export function generateMetadata({ params }: PageProps) {
  const category = servicesData.find((c) => c.slug === params.category);
  const service = category?.subtypes.find((s) => s.slug === params.slug);

  if (!service) return null;

  return {
    title: `${service.title} Services in Delhi | Webdesino`,
    description: service.description,
    openGraph: {
      title: `${service.title} Services in Delhi | Webdesino`,
      description: service.description,
      url: `${BASE_URL}/services/${params.category}/${params.slug}`,
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`, // Ideally specific service image
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
    alternates: {
      canonical: `/services/${params.category}/${params.slug}`,
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const category = servicesData.find((c) => c.slug === params.category);
  const service = category?.subtypes.find((s) => s.slug === params.slug);

  if (!category || !service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(service);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Services', item: '/services' },
    { name: category.title, item: `/services/${category.slug}` },
    { name: service.title, item: `/services/${category.slug}/${service.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }}
      />
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-200 sticky top-0 z-30 backdrop-blur-md bg-slate-50/90">
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center gap-0.5 text-xs md:text-sm text-slate-600 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            <Link href="/" className="hover:text-[#02066F] transition-colors">Home</Link>
            <ChevronRight size={12} className="text-slate-400 flex-shrink-0" />
            <Link href="/services" className="hover:text-[#02066F] transition-colors">Services</Link>
            <ChevronRight size={12} className="text-slate-400 flex-shrink-0" />
            <Link href={`/services/${category.slug}`} className="hover:text-[#02066F] transition-colors">{category.title}</Link>
            <ChevronRight size={12} className="text-slate-400 flex-shrink-0" />
            <span className="text-[#02066F] font-medium">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-slate-50 text-slate-900 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#02066F]/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-14 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <span className="inline-block px-4 py-1.5 bg-white text-[#02066F] rounded-full text-sm font-bold mb-6 border border-[#02066F]/20 shadow-sm">
                Your Best {service.title} Partner
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-slate-900">
                Expert in <span className="text-[#02066F]">{service.title}</span> for Scalable Solutions
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {service.description} At Webdesino, we specialize in delivering top-notch {service.title.toLowerCase()} services for businesses of all sizes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#02066F] text-white rounded-full font-bold hover:bg-black transition-all hover:scale-105 shadow-lg shadow-[#02066F]/20 flex items-center gap-2"
                >
                  Get Started <ArrowRight size={20} />
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-4 bg-white text-slate-700 rounded-full font-bold hover:bg-slate-50 transition-all border border-slate-200 hover:border-[#02066F]"
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative z-20 animate-scale-in">
              <ServiceEnquiryForm serviceTitle={service.title} />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Why Choose <span className="text-[#02066F]">Webdesino</span> as your {service.title} Partner?
            </h2>
            <p className="text-lg text-slate-600 mb-4">
              In today's competitive digital landscape, you need a partner who understands your unique challenges and goals. At Webdesino, we don't just deliver services; we build lasting partnerships.
            </p>
            <p className="text-slate-600">
              Our team of experts combines creativity with technical prowess to deliver solutions that are not only visually stunning but also robust, scalable, and performance-oriented. We are committed to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Professional Quality", icon: ShieldCheck, desc: "High-standard deliverables that meet industry benchmarks." },
              { title: "Fully Responsive", icon: Smartphone, desc: "Solutions that work perfectly across all devices and screens." },
              { title: "Enhanced UX", icon: Users, desc: "User-centric designs that drive engagement and conversions." },
              { title: "24/7 Support", icon: Clock, desc: "Round-the-clock assistance to keep your business running." }
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#02066F]/30 transition-all hover:-translate-y-1">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 text-[#02066F]">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features">
        <ServiceFeatures serviceTitle={service.title} features={service.features} />
      </div>

      {/* Tech Stack Section */}
      <ServiceTechStack categorySlug={category.slug} />

      {/* Our Process Section */}
      <div className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our Approach to <span className="text-[#02066F]">{service.title}</span>
            </h2>
            <p className="text-lg text-slate-600">
              We follow a proven methodology to ensure consistent, high-quality results for every project.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

            {[
              { title: "Discovery", desc: "Understanding your goals and requirements." },
              { title: "Strategy", desc: "Developing a tailored plan for success." },
              { title: "Execution", desc: "Implementing solutions with precision." },
              { title: "Optimization", desc: "Refining for maximum performance." },
              { title: "Maintenance", desc: "Ongoing support and updates."
              }
            ].map((step, idx) => (
              <div key={idx} className="text-center bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 flex items-center justify-center mx-auto mb-4 shadow-sm relative z-10 text-[#02066F]">
                  <span className="text-3xl font-bold opacity-20">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Benefits Section */}
      <div className="py-16 bg-[#02066F] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Why Choose Our <span className="text-white">{service.title}</span>?
              </h2>
              <div className="space-y-6">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:bg-white group-hover:text-[#02066F] transition-colors duration-300">
                      <Star size={20} className="text-white group-hover:text-[#02066F]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{benefit}</h3>
                      <p className="text-gray-300 group-hover:text-white transition-colors">
                        Experience significant improvements in your business performance with our {benefit.toLowerCase()} focused approach.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/5 rounded-3xl blur-2xl animate-pulse-glow"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Proven Results</h3>
                <p className="text-gray-300 mb-8">
                  We deliver measurable impact. Our clients consistently see growth in traffic, engagement, and revenue.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">98%</div>
                    <div className="text-xs text-gray-300">Client Satisfaction</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                    <div className="text-xs text-gray-300">Projects Delivered</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">5+</div>
                    <div className="text-xs text-gray-300">Years Experience</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                    <div className="text-xs text-gray-300">Support Team</div>
                  </div>
                </div>
                <Link
                  href="/portfolio"
                  className="block w-full py-4 bg-white text-[#02066F] text-center rounded-lg font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg shadow-black/20"
                >
                  View Success Stories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 border-y border-slate-200">
        <TrustedSection />
      </div>
      <ServiceIndustries />
      <ServiceCaseStudies />
      <ServiceFAQ serviceTitle={service.title} />

      {/* Related Services */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Other {category.title} Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {category.subtypes
              .filter(s => s.slug !== service.slug)
              .slice(0, 3)
              .map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/services/${category.slug}/${relatedService.slug}`}
                  className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedService.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{relatedService.description}</p>
                  <span className="inline-flex items-center gap-1 text-[#02066F] text-sm font-medium mt-4">
                    View Service <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
