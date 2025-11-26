"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface ServiceFAQProps {
  serviceTitle: string;
}

export default function ServiceFAQ({ serviceTitle }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: `Why should I choose WebDesino for ${serviceTitle}?`,
      answer: `WebDesino is a leading agency with a proven track record of delivering high-quality ${serviceTitle} services. We combine creativity, technical expertise, and data-driven strategies to ensure your project's success.`
    },
    {
      question: `How much does ${serviceTitle} cost?`,
      answer: `The cost of ${serviceTitle} varies depending on the scope, complexity, and specific requirements of your project. We offer customized packages to suit different budgets. Contact us for a free quote.`
    },
    {
      question: `How long does it take to complete a ${serviceTitle} project?`,
      answer: `The timeline depends on the project size and requirements. Typically, a standard project takes 2-4 weeks, while more complex ones may take longer. We provide a detailed timeline during the initial consultation.`
    },
    {
      question: `Do you provide support after the project is completed?`,
      answer: `Yes, we offer ongoing support and maintenance packages to ensure your ${serviceTitle} solution continues to perform optimally and stays up-to-date.`
    },
    {
      question: `Can you help with custom requirements for ${serviceTitle}?`,
      answer: `Absolutely! We specialize in custom solutions. Our team will work closely with you to understand your unique needs and deliver a tailored ${serviceTitle} solution.`
    }
  ];

  return (
    <section className="py-20 bg-white" itemScope itemType="https://schema.org/FAQPage">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/3">
            <div className="sticky top-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#02066F]/10 text-[#02066F] rounded-full text-sm font-bold mb-6">
                <HelpCircle size={16} /> FAQ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about our {serviceTitle} services? Find answers to common queries here.
              </p>
              <a href="/contact" className="text-[#02066F] font-bold hover:text-black transition-colors underline underline-offset-4">
                Have more questions? Contact Us
              </a>
            </div>
          </div>

          <div className="md:w-2/3 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#02066F]/30 transition-colors"
                itemScope
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left bg-gray-50 hover:bg-white transition-colors duration-300"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4" itemProp="name">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="text-[#02066F] flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  itemScope 
                  itemType="https://schema.org/Answer"
                >
                  <div className="p-6 pt-0 bg-gray-50 text-gray-600 leading-relaxed" itemProp="text">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
