import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface PageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const category = await prisma.serviceCategory.findUnique({
    where: { slug: params.category },
  });
  
  if (!category) return { title: "Category Not Found" };
  
  return {
    title: `${category.title} | Webdesino Services`,
    description: category.description,
    alternates: {
      canonical: `/services/${params.category}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const category = await prisma.serviceCategory.findUnique({
    where: { slug: params.category },
    include: { subtypes: true },
  });

  if (!category) {
    notFound();
  }

  // Dynamically get the icon component
  const Icon = category.icon ? (LucideIcons as any)[category.icon] : null;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-slate-50 text-slate-900 py-24 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#111184]/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl mb-8 backdrop-blur-sm border border-slate-200 shadow-xl">
              {Icon && <Icon size={56} className="text-[#111184]" />}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-slate-900">{category.title}</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Subtypes Grid */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {category.subtypes.map((subtype: any, idx: number) => (
            <div 
              key={subtype.slug} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#111184] transition-colors">
                    {subtype.title}
                  </h3>
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-[#111184] group-hover:text-white transition-all duration-300">
                    <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {subtype.description}
                </p>
                
                <div className="space-y-4 mb-8 bg-gray-50 p-6 rounded-xl">
                  {subtype.features.slice(0, 3).map((feature: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-[#111184] mt-1 shrink-0" />
                      <span className="text-sm text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  href={`/services/${category.slug}/${subtype.slug}`}
                  className="block w-full py-3 text-center bg-[#111184] text-white rounded-lg font-semibold hover:bg-black transition-colors duration-300"
                >
                  Explore Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-24 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#111184] via-black to-[#111184]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Ready to get started?</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
            Contact us today to discuss your project and see how we can help you achieve your business goals.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#111184] text-white rounded-full font-bold text-lg hover:bg-black transition-all hover:scale-105 shadow-xl shadow-black/20"
          >
            Get a Free Proposal <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </main>
  );
}
