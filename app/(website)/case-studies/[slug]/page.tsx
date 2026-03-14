import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { CaseStudy } from '@/lib/case-studies';
import { getStorageUrl } from '@/lib/utils';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, BASE_URL } from '@/lib/seo';
import { 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  Target,
  AlertTriangle,
  CheckCircle2,
  Rocket,
  Users,
  Award,
  ExternalLink,
  Quote,
  GoalIcon
} from 'lucide-react';

// Helper to transform Prisma project to CaseStudy interface
function transformProjectToCaseStudy(project: any): CaseStudy {
  const metrics = (project.metrics as any[]) || [];
  const heroMetrics = {
    revenue: metrics.find((m: any) => m.label === "Revenue")?.value || "",
    roi: metrics.find((m: any) => m.label === "ROI")?.value || "",
    timeline: metrics.find((m: any) => m.label === "Timeline")?.value || "",
    channels: metrics.find((m: any) => m.label === "Channels")?.value || "",
  };

  return {
    slug: project.slug,
    title: project.title,
    client: project.client,
    industry: project.industry,
    duration: heroMetrics.timeline,
    image: project.image,
    heroMetrics,
    background: project.description,
    challenges: project.challenges as any,
    solutions: project.solutions as any,
    implementation: project.implementation as any,
    results: project.resultsData as any,
    testimonial: project.testimonial as any,
    keyLearnings: project.keyLearnings,
    faqs: (project.faqs as any) || [],
    relatedServices: (project.relatedServices as any) || []
  };
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const projects = await prisma.project.findMany({
    select: { slug: true }
  });
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  });
  
  if (!project) {
    return {
      title: 'Case Study Not Found',
    };
  }

  const caseStudy = transformProjectToCaseStudy(project);

  return {
    title: `${caseStudy.title} | WebDesino Case Study`,
    description: `Discover how ${caseStudy.client} achieved ${caseStudy.heroMetrics.revenue} in ${caseStudy.heroMetrics.timeline}. Real results, proven strategies, measurable ROI.`,
    openGraph: {
      title: caseStudy.title,
      description: `${caseStudy.client} success story: ${caseStudy.heroMetrics.revenue} in ${caseStudy.heroMetrics.timeline}`,
      type: 'article',
      url: `${BASE_URL}/case-studies/${params.slug}`,
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`, // Should be case study specific image if available
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
    },
    alternates: {
      canonical: `/case-studies/${params.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug }
  });

  if (!project) {
    notFound();
  }

  const caseStudy = transformProjectToCaseStudy(project);

  // JSON-LD Schema
  const articleSchema = generateArticleSchema({
    title: caseStudy.title,
    description: caseStudy.background,
    date: new Date().toISOString(), // Ideally from caseStudy data
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Case Studies', item: '/case-studies' },
    { name: caseStudy.title, item: `/case-studies/${params.slug}` },
  ]);

  const faqSchema = generateFAQSchema(
    (caseStudy.faqs || []).map((faq: { question?: string; answer?: string }) => ({
      question: faq.question,
      answer: faq.answer,
    }))
  );

  const pageSchemas = faqSchema
    ? [articleSchema, breadcrumbSchema, faqSchema]
    : [articleSchema, breadcrumbSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-cream via-white to-cream relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#111184]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
          <Link 
            href="/case-studies" 
            className="inline-flex items-center text-[#111184] hover:text-black transition-all duration-300 font-medium animate-fade-in"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Case Studies
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block glass-strong px-6 py-3 rounded-full text-sm font-bold mb-6 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <span className="gradient-text">{caseStudy.industry}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#111184] mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {caseStudy.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
              {caseStudy.background}
            </p>
            
            {caseStudy.image && (
              <div className="mt-12 relative w-full max-w-4xl mx-auto h-[300px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Image
                  src={getStorageUrl(caseStudy.image)}
                  alt={caseStudy.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <TrendingUp className="w-12 h-12 text-[#111184] mb-4" />
              <p className="text-sm text-gray-600 mb-2 font-medium">Revenue Growth</p>
              <p className="text-3xl font-bold text-[#111184]">{caseStudy.heroMetrics.revenue}</p>
            </div>
            <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <GoalIcon className="w-12 h-12 text-[#111184] mb-4" />
              <p className="text-sm text-gray-600 mb-2 font-medium">ROI Achieved</p>
              <p className="text-3xl font-bold text-[#111184]">{caseStudy.heroMetrics.roi}</p>
            </div>
            <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Calendar className="w-12 h-12 text-[#111184] mb-4" />
              <p className="text-sm text-gray-600 mb-2 font-medium">Timeline</p>
              <p className="text-3xl font-bold text-[#111184]">{caseStudy.heroMetrics.timeline}</p>
            </div>
            <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Rocket className="w-12 h-12 text-[#111184] mb-4" />
              <p className="text-sm text-gray-600 mb-2 font-medium">Channels</p>
              <p className="text-3xl font-bold text-[#111184]">{caseStudy.heroMetrics.channels || 'Multi-Channel'}</p>
            </div>
          </div>
        </section>

        {/* Challenges Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-[#111184]/5 via-white to-gray-50 relative overflow-hidden">
          <div className="absolute top-10 right-10 w-72 h-72 bg-[#111184]/10 rounded-full blur-3xl animate-float" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center mb-8 animate-fade-in">
              <AlertTriangle className="w-10 h-10 text-[#111184] mr-4" />
              <h2 className="text-3xl md:text-5xl font-bold text-[#111184]">
                {caseStudy.challenges.title}
              </h2>
            </div>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-4xl animate-fade-in" style={{ animationDelay: '0.1s' }}>{caseStudy.challenges.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.challenges.painPoints.map((point, index) => (
                <div key={index} className="glass-strong rounded-2xl p-8 border-l-4 border-[#111184] hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                  <p className="text-gray-800 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#111184]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center mb-12 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-[#111184] mr-4" />
              <h2 className="text-3xl md:text-5xl font-bold text-[#111184]">
                {caseStudy.solutions.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudy.solutions.pillars.map((pillar, index) => (
                <div key={index} className="glass rounded-3xl p-8 hover-lift transition-all duration-300 animate-scale-in group" style={{ animationDelay: `${0.1 + index * 0.1}s` }}>
                  <div className="w-12 h-12 bg-[#111184] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111184] mb-4 group-hover:text-[#111184] transition-colors">{pillar.name}</h3>
                  <p className="text-gray-700 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Implementation Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-cream via-white to-cream relative overflow-hidden">
          <div className="absolute top-20 right-20 w-64 h-64 bg-[#111184]/5 rounded-full blur-3xl animate-float" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center mb-12 animate-fade-in">
              <Users className="w-10 h-10 text-[#111184] mr-4" />
              <h2 className="text-3xl md:text-5xl font-bold text-[#111184]">
                Implementation Details
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-2xl font-bold text-[#111184] mb-6">Timeline & Process</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{caseStudy.implementation.timeline}</p>
                <div className="space-y-4">
                  {caseStudy.implementation.process.map((step, index) => (
                    <div key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
                      <CheckCircle2 className="w-5 h-5 text-[#111184] mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.15s' }}>
                  <h3 className="text-2xl font-bold text-[#111184] mb-6">Tools & Technology</h3>
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.implementation.tools.map((tool, index) => (
                      <span key={index} className="glass px-4 py-2 rounded-full text-sm font-semibold text-[#111184] hover:bg-[#111184] hover:text-white transition-all duration-300 hover-lift">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-2xl font-bold text-[#111184] mb-6">Team Composition</h3>
                  <div className="flex flex-wrap gap-3">
                    {caseStudy.implementation.team.map((member, index) => (
                      <span key={index} className="glass px-4 py-2 rounded-full text-sm font-semibold text-[#111184] hover:bg-[#111184] hover:text-white transition-all duration-300 hover-lift">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex items-center mb-12 animate-fade-in">
              <Award className="w-10 h-10 text-[#111184] mr-4" />
              <h2 className="text-3xl md:text-5xl font-bold text-[#111184]">
                Results That Speak
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-3xl font-bold text-gray-600 mb-6">Before</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg"><span className="font-bold">Revenue:</span> {caseStudy.results.before.revenue}</p>
                  {caseStudy.results.before.traffic && (
                    <p className="text-gray-700 text-lg"><span className="font-bold">Traffic:</span> {caseStudy.results.before.traffic}</p>
                  )}
                  <p className="text-gray-700 text-lg"><span className="font-bold">Visibility:</span> {caseStudy.results.before.visibility}</p>
                </div>
              </div>

              <div className="glass-strong rounded-3xl p-8 border-4 border-[#111184] hover-lift transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-3xl font-bold gradient-text mb-6">After</h3>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg"><span className="font-bold">Revenue:</span> <span className="text-[#111184] font-bold">{caseStudy.results.after.revenue}</span></p>
                  {caseStudy.results.after.traffic && (
                    <p className="text-gray-700 text-lg"><span className="font-bold">Traffic:</span> <span className="text-[#111184] font-bold">{caseStudy.results.after.traffic}</span></p>
                  )}
                  <p className="text-gray-700 text-lg"><span className="font-bold">Visibility:</span> <span className="text-[#111184] font-bold">{caseStudy.results.after.visibility}</span></p>
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-8 lg:p-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-3xl font-bold text-[#111184] mb-8">Key Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudy.results.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start glass p-4 rounded-2xl hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: `${0.4 + index * 0.05}s` }}>
                    <CheckCircle2 className="w-5 h-5 text-[#111184] mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-cream via-white to-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#111184] rounded-3xl p-12 lg:p-16 shadow-2xl text-white relative overflow-hidden hover-lift transition-all duration-300 animate-scale-in">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <Quote className="w-20 h-20 opacity-10 absolute top-8 left-8" />
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl font-medium mb-8 italic leading-relaxed">
                  &ldquo;{caseStudy.testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-white/20 pt-6">
                  <p className="text-2xl font-bold mb-2">{caseStudy.testimonial.author}</p>
                  <p className="text-white/90 font-semibold">{caseStudy.testimonial.position}, {caseStudy.testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Learnings Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111184] mb-12 animate-fade-in">Key Learnings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.keyLearnings.map((learning, index) => (
                <div key={index} className="glass-strong rounded-2xl p-8 border-l-4 border-[#111184] hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <p className="text-gray-800 font-medium leading-relaxed">{learning}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-cream via-white to-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111184] mb-12 text-center animate-fade-in">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {caseStudy.faqs.map((faq, index) => (
                <div key={index} className="glass-strong rounded-2xl p-8 hover-lift transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <h3 className="text-xl font-bold text-[#111184] mb-4">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#111184] py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
              Want Results Like {caseStudy.client}?
            </h2>
            <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Let&apos;s discuss how we can transform your business with proven digital strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link 
                href="/contact" 
                className="bg-white text-[#111184] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center hover-lift shadow-xl"
              >
                Get Your Free Consultation
                <ExternalLink className="w-5 h-5 ml-2" />
              </Link>
              <Link 
                href="/case-studies" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#111184] transition-all duration-300 inline-flex items-center justify-center hover-lift"
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111184] mb-12 text-center animate-fade-in">Related Services</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {caseStudy.relatedServices.map((service, index) => (
                <Link 
                  key={index}
                  href={service.url}
                  className="glass-strong px-6 py-3 rounded-full font-semibold text-[#111184] hover:bg-[#111184] hover:text-white transition-all duration-300 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
