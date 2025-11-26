import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing & Packages | WebDesino',
  description: 'Affordable web design and digital marketing packages tailored to your business needs.',
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#02066F] mb-4">
              Transparent Pricing & Packages
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business growth. No hidden fees, just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-[#02066F] mb-2">Basic Plan</h3>
              <p className="text-gray-600 mb-6">Perfect for small businesses & startups</p>
              <div className="text-4xl font-bold text-[#02066F] mb-6">
                ₹10,324 <span className="text-lg font-normal text-gray-500">/ Plan</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Free Consultation",
                  "Domain Name",
                  "Social Links Integration",
                  "Free Web Hosting (1 Year)",
                  "Home & Internal Web Pages (only 5)",
                  "Corporate Email ID's",
                  "Contact Form",
                  "Google Location Map",
                  "Mobile/iPad Compatibility",
                  "Visitor Counter",
                  "Search Engine Optimization (SEO)",
                  "CMS",
                  "Custom Design",
                  "Content Writing",
                  "24X7 Technical Support"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-[#02066F] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block w-full py-3 px-6 text-center bg-white border-2 border-[#02066F] text-[#02066F] font-semibold rounded-full hover:bg-[#02066F] hover:text-white transition-colors duration-300">
                Get Started
              </Link>
            </div>

            {/* Growth Plan */}
            <div className="border-2 border-[#02066F] rounded-2xl p-8 shadow-xl relative transform scale-105 z-10 bg-white">
              <div className="absolute top-0 right-0 bg-[#02066F] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-[#02066F] mb-2">Growth</h3>
              <p className="text-gray-600 mb-6">For businesses ready to scale</p>
              <div className="text-4xl font-bold text-[#02066F] mb-6">
                Request Quote
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Advanced Website (10+ Pages)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  CMS Integration (WordPress/Next.js)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Advanced SEO & Speed Optimization
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Google Analytics & Search Console
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  3 Months Support
                </li>
              </ul>
              <Link href="/contact" className="block w-full py-3 px-6 text-center bg-[#02066F] text-white font-semibold rounded-full hover:bg-black transition-colors duration-300">
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-[#02066F] mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">Custom solutions for large organizations</p>
              <div className="text-4xl font-bold text-[#02066F] mb-6">
                Custom
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  E-commerce / Custom Web App
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Full Digital Marketing Suite
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Priority Support (24/7)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Dedicated Project Manager
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#02066F] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  6 Months Support
                </li>
              </ul>
              <Link href="/contact" className="block w-full py-3 px-6 text-center bg-white border-2 border-[#02066F] text-[#02066F] font-semibold rounded-full hover:bg-[#02066F] hover:text-white transition-colors duration-300">
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-[#02066F] mb-6">Need a Custom Solution?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We understand that every business is unique. Contact us today for a free consultation and a custom quote tailored to your specific requirements.
            </p>
            <Link href="/contact" className="inline-block py-4 px-8 bg-[#02066F] text-white font-bold rounded-full hover:bg-black transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
