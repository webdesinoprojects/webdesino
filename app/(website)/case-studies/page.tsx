import { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, ArrowRight, Award, Calendar } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { Project } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Case Studies | Proven Success Stories | WebDesino',
  description: 'Explore real client success stories. See how WebDesino helped businesses achieve 20x-330x growth through SEO, digital marketing, and web development.',
  openGraph: {
    title: 'WebDesino Case Studies - Real Results, Real Growth',
    description: 'From ₹3,000 to ₹10 lakh monthly. From zero to ₹25 lakh monthly. Discover proven digital marketing strategies that deliver measurable results.',
    type: 'website',
  },
};

export default async function CaseStudiesPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const caseStudies = projects.map((project: Project) => {
    const metrics = (project.metrics as any[]) || [];
    const getMetric = (label: string) => metrics.find((m: any) => m.label === label)?.value || '';

    return {
      slug: project.slug,
      industry: project.industry,
      client: project.client,
      duration: getMetric('Timeline'),
      background: project.description,
      heroMetrics: {
        revenue: getMetric('Revenue'),
        roi: getMetric('ROI'),
        timeline: getMetric('Timeline'),
      },
      results: {
        highlights: project.highlights || [],
      },
    };
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#111184]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="text-center relative z-10">
          <div className="inline-block glass px-6 py-3 rounded-full text-sm font-semibold mb-6 text-[#111184] animate-fade-in">
            Real Results, Real Stories
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#111184] mb-6 animate-slide-up">
            Success Stories That Inspire
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Discover how we&apos;ve helped businesses achieve extraordinary growth through data-driven digital strategies. 
            From startups to established brands, see the measurable impact of our work.
          </p>

          {/* Stats Banner */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Award className="w-12 h-12 text-[#111184] mb-4 mx-auto" />
              <p className="text-4xl font-bold text-[#111184] mb-2">₹6.3Cr+</p>
              <p className="text-sm text-gray-600 font-medium">Total Sales Generated</p>
            </div>
            <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <TrendingUp className="w-12 h-12 text-[#111184] mb-4 mx-auto" />
              <p className="text-4xl font-bold text-[#111184] mb-2">330x</p>
              <p className="text-sm text-gray-600 font-medium">Max Growth Achieved</p>
            </div>
            <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <Calendar className="w-12 h-12 text-[#111184] mb-4 mx-auto" />
              <p className="text-4xl font-bold text-[#111184] mb-2">90 Days</p>
              <p className="text-sm text-gray-600 font-medium">Avg. Time to Results</p>
            </div>
            <div className="glass-strong rounded-3xl p-8 hover-lift transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Award className="w-12 h-12 text-[#111184] mb-4 mx-auto" />
              <p className="text-4xl font-bold text-[#111184] mb-2">100%</p>
              <p className="text-sm text-gray-600 font-medium">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <Link 
              key={study.slug} 
              href={`/case-studies/${study.slug}`}
              className="group glass-strong rounded-3xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card Header */}
              <div className={`p-8 relative overflow-hidden ${
                index === 0 ? 'bg-gradient-to-br from-[#111184]/5 to-white' :
                index === 1 ? 'bg-gradient-to-br from-white to-[#111184]/5' :
                index === 2 ? 'bg-gradient-to-br from-[#111184]/5 to-cream' :
                'bg-gradient-to-br from-white to-cream'
              }`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="glass px-4 py-2 rounded-full text-sm font-semibold text-[#111184] shadow-md">
                    {study.industry}
                  </span>
                  <span className="text-sm font-medium text-gray-600">{study.duration}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111184] mb-4 group-hover:text-[#111184] transition-all relative z-10">
                  {study.client}
                </h2>
                <p className="text-gray-700 mb-6 leading-relaxed relative z-10">{study.background.substring(0, 150)}...</p>
              </div>

              {/* Metrics */}
              <div className="p-8 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass rounded-2xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Revenue Growth</p>
                    <p className="text-lg font-bold text-[#111184]">{study.heroMetrics.revenue}</p>
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <p className="text-sm text-gray-600 mb-1">ROI</p>
                    <p className="text-lg font-bold text-[#111184]">{study.heroMetrics.roi}</p>
                  </div>
                </div>

                {/* Key Results */}
                <div className="space-y-2 mb-6">
                  {study.results.highlights.slice(0, 3).map((highlight: string, idx: number) => (
                    <div key={idx} className="flex items-start text-sm text-gray-700">
                      <Award className="w-4 h-4 text-[#111184] mr-2 mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between text-[#111184] font-semibold group-hover:text-[#111184] transition-colors">
                  <span>Read Full Case Study</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#111184] py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Join 100+ businesses that have transformed their digital presence with WebDesino.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link 
              href="/contact" 
              className="bg-white text-[#111184] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center hover-lift shadow-xl"
            >
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link 
              href="/services" 
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#111184] transition-all duration-300 inline-flex items-center justify-center hover-lift"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
