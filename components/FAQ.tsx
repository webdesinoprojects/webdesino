"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { replaceLocationPlaceholder } from "@/lib/utils";
import { generateFAQSchema } from "@/lib/seo";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  location?: string;
}

export default function FAQ({ faqs, location }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const resolvedFaqs = faqs.map((faq) => ({
    ...faq,
    question: replaceLocationPlaceholder(faq.question, location),
    answer: replaceLocationPlaceholder(faq.answer, location),
  })).filter((faq) => faq.question.trim() && faq.answer.trim());

  const faqSchema = generateFAQSchema(resolvedFaqs);

  if (resolvedFaqs.length === 0) return null;

  return (
    <section className="py-10 lg:py-16 bg-white">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-center text-[#111184] mb-10 lg:mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {resolvedFaqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-gray-100 transition"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-[#111184] pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#111184] flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-[#111184] flex-shrink-0" size={24} />
                )}
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
