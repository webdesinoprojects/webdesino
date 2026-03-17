"use client";

import Link from "next/link";
import { Quote, Star, User } from "lucide-react";
import type { Testimonial } from "@/lib/generated/prisma";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  // Show only first 3 on home page
  const displayedTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#111184]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#111184]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#111184] mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it. Here's what business owners and marketing managers have to say about working with WebDesino.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedTestimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group"
              itemScope
              itemType="https://schema.org/Review"
            >
              <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Service" className="hidden">
                <meta itemProp="name" content="Webdesino Web Development & Digital Marketing Services" />
              </div>

              <Quote className="absolute top-6 right-6 text-[#111184]/20 w-10 h-10 group-hover:text-[#111184]/40 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#111184] text-[#111184]" />
                ))}
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed italic relative z-10" itemProp="reviewBody">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#111184]/10 flex items-center justify-center text-[#111184] flex-shrink-0">
                  <User size={24} />
                </div>
                <div itemProp="author" itemScope itemType="https://schema.org/Person">
                  <h3 className="font-bold text-[#111184] text-sm" itemProp="name">
                    {testimonial.name}
                  </h3>
                  {testimonial.company && (
                    <p className="text-xs text-gray-500 font-medium mt-0.5">
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {testimonials.length > 3 && (
          <div className="text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center justify-center px-8 py-3 border border-[#111184] text-[#111184] font-semibold rounded-full hover:bg-[#111184] hover:text-white transition-colors duration-300"
            >
              View All
            </Link>
          </div>
        )}

        {/* <div className="flex justify-center gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-[#111184] mb-1">4.9/5</div>
            <div className="flex gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#111184] text-[#111184]" />
              ))}
            </div>
            <div className="text-xs text-gray-500">Google Reviews</div>
          </div>
          <div className="w-px h-12 bg-gray-200" />
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-[#111184] mb-1">100%</div>
            <div className="text-sm font-semibold text-[#111184] mb-1">Satisfaction</div>
            <div className="text-xs text-gray-500">Client Retention</div>
          </div>
        </div> */}
      </div>
    </section>
  );
}
