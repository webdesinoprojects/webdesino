import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { transformBlogImagesInHtml } from '@/lib/transform-blog-html';
import PayPalHostedButton from '@/components/PayPalHostedButton';

export const metadata: Metadata = {
  title: 'Pricing & Packages | WebDesino',
  description: 'Affordable web design and digital marketing packages tailored to your business needs.',
  alternates: {
    canonical: '/pricing',
  },
};

export default async function Pricing() {
  const page = await prisma.page.findUnique({
    where: { slug: 'pricing' },
  });

  const content = (page?.content as any) || {};
  const payOnlineSection = (
    <section className="container mx-auto px-4 pb-16">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50 shadow-[0_20px_60px_-30px_rgba(2,6,23,0.35)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="relative grid gap-8 p-6 md:grid-cols-2 md:gap-10 md:p-10">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#111184]">
              Secure Payment
            </span>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Pay Online
            </h2>
            <p className="mt-3 max-w-md text-base text-slate-600 md:text-lg">
              Complete your payment securely through PayPal. You can pay with PayPal balance, cards, and multiple supported methods.
            </p>

            <div className="mt-6 grid gap-3 text-sm text-slate-700">
              <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                End-to-end secure checkout
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Works with PayPal and major cards
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/70 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Instant payment confirmation
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 md:p-6">
            <p className="mb-4 text-sm font-medium text-slate-500">Checkout</p>
            <PayPalHostedButton />
          </div>
        </div>
      </div>
    </section>
  );

  if (page?.content) {
    return (
      <div className="bg-white">
        <div dangerouslySetInnerHTML={{ __html: transformBlogImagesInHtml(content.html || '') }} />
        {payOnlineSection}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[#111184] mb-4">
              Transparent Pricing & Packages
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business growth. No hidden fees, just results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-[#111184] mb-2">Basic Plan</h3>
              <p className="text-gray-600 mb-6">Perfect for small businesses & startups</p>
              <div className="text-4xl font-bold text-[#111184] mb-6">
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
                    <svg className="w-5 h-5 text-[#111184] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="block w-full py-3 px-6 text-center bg-white border-2 border-[#111184] text-[#111184] font-semibold rounded-full hover:bg-[#111184] hover:text-white transition-colors duration-300">
                Get Started
              </Link>
            </div>

            {/* Growth Plan */}
            <div className="border-2 border-[#111184] rounded-2xl p-8 shadow-xl relative transform scale-105 z-10 bg-white">
              <div className="absolute top-0 right-0 bg-[#111184] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-[#111184] mb-2">Growth</h3>
              <p className="text-gray-600 mb-6">For businesses ready to scale</p>
              <div className="text-4xl font-bold text-[#111184] mb-6">
                Request Quote
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Advanced Website (10+ Pages)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  CMS Integration (WordPress/Next.js)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Advanced SEO & Speed Optimization
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Google Analytics & Search Console
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  3 Months Support
                </li>
              </ul>
              <Link href="/contact" className="block w-full py-3 px-6 text-center bg-[#111184] text-white font-semibold rounded-full hover:bg-black transition-colors duration-300">
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-[#111184] mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">Custom solutions for large organizations</p>
              <div className="text-4xl font-bold text-[#111184] mb-6">
                Custom
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  E-commerce / Custom Web App
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Full Digital Marketing Suite
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Priority Support (24/7)
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Dedicated Project Manager
                </li>
                <li className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-[#111184] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  6 Months Support
                </li>
              </ul>
              <Link href="/contact" className="block w-full py-3 px-6 text-center bg-white border-2 border-[#111184] text-[#111184] font-semibold rounded-full hover:bg-[#111184] hover:text-white transition-colors duration-300">
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-[#111184] mb-6">Need a Custom Solution?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We understand that every business is unique. Contact us today for a free consultation and a custom quote tailored to your specific requirements.
            </p>
            <Link href="/contact" className="inline-block py-4 px-8 bg-[#111184] text-white font-bold rounded-full hover:bg-black transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get a Free Consultation
            </Link>
          </div>

        </div>
        {payOnlineSection}
      </main>
    </div>
  );
}
