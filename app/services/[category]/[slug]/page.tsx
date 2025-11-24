import { notFound } from "next/navigation";
import Link from "next/link";
import { servicesData } from "@/lib/services-data";
import { ArrowRight, CheckCircle2, Star, ChevronRight } from "lucide-react";
import { generateServiceSchema, generateBreadcrumbSchema, BASE_URL } from "@/lib/seo";

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
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-slate-600 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
            <Link href={`/services/${category.slug}`} className="hover:text-blue-600 transition-colors">{category.title}</Link>
            <ChevronRight size={14} className="text-slate-400 flex-shrink-0" />
            <span className="text-blue-600 font-medium">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-teal text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <span className="inline-block px-4 py-1.5 bg-orange/20 text-orange rounded-full text-sm font-bold mb-6 border border-orange/30 backdrop-blur-sm">
                {category.title}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/contact"
                  className="px-8 py-4 bg-orange text-white rounded-full font-bold hover:bg-orange/90 transition-all hover:scale-105 shadow-lg shadow-orange/20 flex items-center gap-2"
                >
                  Get Started <ArrowRight size={20} />
                </Link>
                <Link 
                  href="#features"
                  className="px-8 py-4 bg-white/10 text-white rounded-full font-bold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
                >
                  Explore Features
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative animate-scale-in">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-md p-8 flex items-center justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-500/20 animate-pulse-glow"></div>
                {/* Abstract representation of the service */}
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 bg-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-orange backdrop-blur-sm border border-orange/30">
                    <Star size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{service.title}</h3>
                  <p className="text-white/70">Professional Services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Key Features of Our <span className="text-teal">{service.title}</span>
            </h2>
            <p className="text-lg text-gray-600">
              We deliver comprehensive solutions designed to meet your specific business requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.features.map((feature, idx) => (
              <div key={idx} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500"></div>
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-teal group-hover:text-orange group-hover:scale-110 transition-all duration-300 relative z-10">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{feature}</h3>
                <p className="text-gray-600 text-sm relative z-10">
                  Professional implementation of {feature.toLowerCase()} to enhance your business capabilities.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Process Section (New Enhancement) */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Approach to <span className="text-orange">{service.title}</span>
            </h2>
            <p className="text-lg text-gray-600">
              We follow a proven methodology to ensure consistent, high-quality results for every project.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
            
            {[
              { title: "Discovery", desc: "Understanding your goals and requirements." },
              { title: "Strategy", desc: "Developing a tailored plan for success." },
              { title: "Execution", desc: "Implementing solutions with precision." },
              { title: "Optimization", desc: "Refining for maximum performance." }
            ].map((step, idx) => (
              <div key={idx} className="text-center bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center mx-auto mb-6 shadow-sm relative z-10">
                  <span className="text-3xl font-bold text-teal/20">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-teal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Why Choose Our <span className="text-orange">{service.title}</span>?
              </h2>
              <div className="space-y-6">
                {service.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0 mt-1 group-hover:bg-orange transition-colors duration-300">
                      <Star size={20} className="text-white" />
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
              <div className="absolute -inset-4 bg-orange/20 rounded-3xl blur-2xl animate-pulse-glow"></div>
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Get a Custom Quote</h3>
                <p className="text-gray-300 mb-8">
                  Ready to transform your business? Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <Link 
                  href="/contact"
                  className="block w-full py-4 bg-orange text-white text-center rounded-lg font-bold hover:bg-orange/90 transition-all hover:scale-105 shadow-lg shadow-orange/20"
                >
                  Enquire Now
                </Link>
                <p className="text-center text-sm text-gray-400 mt-4">
                  No obligation. 100% Free Consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Services */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Other {category.title} Services</h2>
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
                  <span className="inline-flex items-center gap-1 text-teal text-sm font-medium mt-4">
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
