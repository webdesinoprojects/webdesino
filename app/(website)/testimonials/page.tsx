import { prisma } from "@/lib/prisma";
import { Quote, Star, User } from "lucide-react";
import type { Metadata } from "next";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Client Testimonials | WebDesino",
  description: "Read what our clients say about our web development, SEO, and digital marketing services in Delhi NCR.",
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany();
  const faqs = await prisma.faq.findMany({ orderBy: { order: 'asc' } });

  return (
    <main className="pt-24 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-[#02066F] mb-6">
            What Our Clients Say
          </h1>
          <p className="text-xl text-gray-600">
            See why 100+ businesses in Delhi NCR trust WebDesino for their digital growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group border border-gray-100"
            >
              <Quote className="absolute top-6 right-6 text-[#02066F]/20 w-10 h-10 group-hover:text-[#02066F]/40 transition-colors" />

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#02066F] text-[#02066F]" />
                ))}
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed italic relative z-10">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#02066F]/10 flex items-center justify-center text-[#02066F] flex-shrink-0">
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-[#02066F] text-sm">
                    {testimonial.name}
                  </h4>
                  {testimonial.company && (
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {testimonial.company}
                    </p>
                  )}
                  {testimonial.location && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {testimonial.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <FAQ faqs={faqs} />
      </div>
    </main>
  );
}
