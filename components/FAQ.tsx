"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FAQ } from "@/lib/data";

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (faqs.length === 0) return null;

  return (
    <section className="py-10 lg:py-16 bg-white" itemScope itemType="https://schema.org/FAQPage">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-center text-teal mb-10 lg:mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-cream hover:bg-cream/80 transition"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-teal pr-4" itemProp="name">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-orange flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-orange flex-shrink-0" size={24} />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white" itemScope itemType="https://schema.org/Answer">
                  <p className="text-gray-700 leading-relaxed" itemProp="text">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
