const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  const pricingContent = {
    html: `
    <div class="min-h-screen bg-white">
      <main class="pt-24 pb-16">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h1 class="text-4xl md:text-5xl font-bold text-[#4F46E5] mb-4">
              Transparent Pricing & Packages
            </h1>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business growth. No hidden fees, just results.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <!-- Basic Plan -->
            <div class="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-2xl font-bold text-[#4F46E5] mb-2">Basic Plan</h3>
              <p class="text-gray-600 mb-6">Perfect for small businesses & startups</p>
              <div class="text-4xl font-bold text-[#4F46E5] mb-6">
                ₹10,324 <span class="text-lg font-normal text-gray-500">/ Plan</span>
              </div>
              <ul class="space-y-4 mb-8">
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Free Consultation
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Domain Name
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Social Links Integration
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Free Web Hosting (1 Year)
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Home & Internal Web Pages (only 5)
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Corporate Email ID's
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Contact Form
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Google Location Map
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Mobile/iPad Compatibility
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Visitor Counter
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Search Engine Optimization (SEO)
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  CMS
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Custom Design
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Content Writing
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  24X7 Technical Support
                </li>
              </ul>
              <a href="/contact" class="block w-full py-3 px-6 text-center bg-white border-2 border-[#4F46E5] text-[#4F46E5] font-semibold rounded-full hover:bg-[#4F46E5] hover:text-white transition-colors duration-300">
                Get Started
              </a>
            </div>

            <!-- Growth Plan -->
            <div class="border-2 border-[#4F46E5] rounded-2xl p-8 shadow-xl relative transform scale-105 z-10 bg-white">
              <div class="absolute top-0 right-0 bg-[#4F46E5] text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
              <h3 class="text-2xl font-bold text-[#4F46E5] mb-2">Growth</h3>
              <p class="text-gray-600 mb-6">For businesses ready to scale</p>
              <div class="text-4xl font-bold text-[#4F46E5] mb-6">
                Request Quote
              </div>
              <ul class="space-y-4 mb-8">
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Advanced Website (10+ Pages)
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  CMS Integration (WordPress/Next.js)
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Advanced SEO & Speed Optimization
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Google Analytics & Search Console
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  3 Months Support
                </li>
              </ul>
              <a href="/contact" class="block w-full py-3 px-6 text-center bg-[#4F46E5] text-white font-semibold rounded-full hover:bg-black transition-colors duration-300">
                Get Started
              </a>
            </div>

            <!-- Enterprise Plan -->
            <div class="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300">
              <h3 class="text-2xl font-bold text-[#4F46E5] mb-2">Enterprise</h3>
              <p class="text-gray-600 mb-6">Custom solutions for large organizations</p>
              <div class="text-4xl font-bold text-[#4F46E5] mb-6">
                Custom
              </div>
              <ul class="space-y-4 mb-8">
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  E-commerce / Custom Web App
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Full Digital Marketing Suite
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Priority Support (24/7)
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  Dedicated Project Manager
                </li>
                <li class="flex items-center text-gray-700">
                  <svg class="w-5 h-5 text-[#4F46E5] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                  6 Months Support
                </li>
              </ul>
              <a href="/contact" class="block w-full py-3 px-6 text-center bg-white border-2 border-[#4F46E5] text-[#4F46E5] font-semibold rounded-full hover:bg-[#4F46E5] hover:text-white transition-colors duration-300">
                Contact Sales
              </a>
            </div>
          </div>

          <div class="mt-20 text-center">
            <h2 class="text-3xl font-bold text-[#4F46E5] mb-6">Need a Custom Solution?</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We understand that every business is unique. Contact us today for a free consultation and a custom quote tailored to your specific requirements.
            </p>
            <a href="/contact" class="inline-block py-4 px-8 bg-[#4F46E5] text-white font-bold rounded-full hover:bg-black transition-colors duration-300 shadow-lg hover:shadow-xl">
              Get a Free Consultation
            </a>
          </div>
        </div>
      </main>
    </div>
    `
  };

  await prisma.page.upsert({
    where: { slug: 'pricing' },
    update: {
      title: 'Pricing & Packages',
      content: pricingContent,
    },
    create: {
      title: 'Pricing & Packages',
      slug: 'pricing',
      content: pricingContent,
    },
  });

  //console.log('Pricing page seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
