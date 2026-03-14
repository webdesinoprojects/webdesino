const { PrismaClient } = require('../lib/generated/prisma');

const prisma = new PrismaClient();

async function main() {
  const rohitContent = {
    html: `
    <main class="bg-white">
      <!-- Hero Section -->
      <section class="relative py-20 lg:py-28 bg-slate-50 overflow-hidden">
        <!-- Background Effects -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#4F46E5]/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-[#4F46E5]/20 rounded-full blur-3xl animate-float"></div>
        </div>

        <div class="container mx-auto px-4 relative z-10">
          <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <!-- Image Column -->
            <div class="w-full lg:w-1/3 order-2 lg:order-1">
              <div class="relative group mx-auto max-w-md lg:max-w-none">
                <div class="absolute inset-0 bg-[#4F46E5] rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                <div class="relative rounded-3xl overflow-hidden border-2 border-gray-800 group-hover:border-white transition-colors duration-300 aspect-[4/5]">
                  <img
                    src="/rohittiwari2.jpeg"
                    alt="Rohit Tiwari - Founder & CEO"
                    class="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <!-- Floating Stats -->
                <div class="absolute -right-6 top-10 bg-white p-4 rounded-xl shadow-xl hidden md:block animate-float" style="animation-delay: 1s;">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-gray-100 rounded-lg text-[#4F46E5]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 font-medium">Projects</div>
                      <div class="text-xl font-bold text-gray-900">100+</div>
                    </div>
                  </div>
                </div>

                <div class="absolute -left-6 bottom-20 bg-white p-4 rounded-xl shadow-xl hidden md:block animate-float" style="animation-delay: 2s;">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-gray-100 rounded-lg text-[#4F46E5]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500 font-medium">Experience</div>
                      <div class="text-xl font-bold text-gray-900">5+ Years</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Content Column -->
            <div class="w-full lg:w-2/3 order-1 lg:order-2 text-center lg:text-left">
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-[#4F46E5] font-medium text-sm mb-6 border border-[#4F46E5]/20">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-[#4F46E5]"></span>
                </span>
                Founder & CEO
              </div>

              <h1 class="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Hi, I'm <span class="text-[#4F46E5]">Rohit Tiwari</span>
              </h1>

              <p class="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                My name is Rohit Tiwari, and I am a professional Web Developer and Digital Marketing Specialist dedicated to building high-performing online identities for businesses, startups, and brands. Over the years, I have gained extensive experience in WordPress, Shopify, custom-coded web development, SEO, social media marketing, Google Ads, Meta Ads, and brand communication. My focus is to combine technical precision with strategic marketing to create websites and digital assets that deliver measurable business growth.
              </p>

              <div class="flex flex-wrap justify-center lg:justify-start gap-4">
                <a
                  href="https://www.linkedin.com/in/irohittiwari/"
                  target="_blank"
                  class="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  Connect on LinkedIn
                </a>
                <a
                  href="/contact"
                  class="flex items-center gap-2 px-6 py-3 bg-[#4F46E5] text-white border border-[#4F46E5] rounded-full font-semibold hover:bg-[#4F46E5]/90 transition-all hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  Work With Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Me Content -->
      <section class="py-16 lg:py-24 bg-white">
        <div class="container mx-auto px-4">
          <div class="max-w-4xl mx-auto space-y-16">

            <!-- My Professional Approach -->
            <div>
              <h2 class="text-3xl font-bold text-[#4F46E5] mb-6">My Professional Approach</h2>
              <p class="text-lg text-slate-600 mb-6 leading-relaxed">
                I believe that a website is not only a digital representation of a business, but also a powerful tool to generate leads, improve sales, and build trust. I prioritise:
              </p>
              <ul class="space-y-4">
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span>Return on investment and business results</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span>Clean and modern design with strong functionality</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span>Transparent communication and a client-first approach</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span>On-time delivery with uncompromised quality</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                  <span>Long-term support for continuous growth</span>
                </li>
              </ul>
            </div>

            <!-- Expertise Grid -->
            <div>
              <div class=" mb-6">
                <h2 class="text-3xl font-bold text-[#4F46E5] mb-3">My Expertise</h2>
              </div>

              <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100">
                  <div class="w-12 h-12 bg-gray-100 text-[#4F46E5] rounded-xl flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                  <h3 class="text-xl font-bold text-slate-900 mb-3">Full-Stack Development</h3>
                  <p class="text-slate-600">Expertise in Next.js, React, Node.js, and modern web technologies to build scalable applications.</p>
                </div>
                <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100">
                  <div class="w-12 h-12 bg-gray-100 text-[#4F46E5] rounded-xl flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                  </div>
                  <h3 class="text-xl font-bold text-slate-900 mb-3">SEO Strategy</h3>
                  <p class="text-slate-600">Deep understanding of search engine algorithms to help businesses rank #1 on Google.</p>
                </div>
                <div class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100">
                  <div class="w-12 h-12 bg-gray-100 text-[#4F46E5] rounded-xl flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                  </div>
                  <h3 class="text-xl font-bold text-slate-900 mb-3">Digital Growth</h3>
                  <p class="text-slate-600">Holistic approach to digital marketing, focusing on conversion rate optimization and ROI.</p>
                </div>
              </div>
            </div>

            <!-- Achievements and Experience -->
            <div>
              <h2 class="text-3xl font-bold text-[#4F46E5] mb-6">Achievements and Experience</h2>
              <ul class="space-y-4">
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                  <span>Successfully delivered more than 150 website development projects across various industries</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                  <span>Worked with clients across India and international markets</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                  <span>Trusted by startups, SMEs, agencies, and high-net-worth professionals</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-award text-[#4F46E5] mt-1 flex-shrink-0"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                  <span>Expertise in complete digital growth solutions, from branding to marketing execution</span>
                </li>
              </ul>
            </div>

            <!-- Vision -->
            <div>
              <h2 class="text-3xl font-bold text-[#4F46E5] mb-6">Vision</h2>
              <p class="text-lg text-slate-600 leading-relaxed">
                My objective is to help businesses build a strong digital presence that enhances credibility, supports long-term scalability, and creates real business opportunities. I believe in partnerships, not transactions, and I strive to add value beyond just development and marketing services.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- Connect Section -->
      <section class="py-20 bg-slate-50 text-[#4F46E5] relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div class="container mx-auto px-4 text-center relative z-10">
          <h2 class="text-3xl lg:text-5xl font-bold mb-8">Let's Build Something Amazing Together</h2>
          <p class="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Whether you have a specific project in mind or just want to discuss your digital strategy, I'm always open to a conversation.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              class="px-8 py-4 bg-white text-[#4F46E5] rounded-full font-bold hover:bg-gray-50 transition-all shadow-lg"
            >
              Start a Project
            </a>
            <a
              href="https://www.linkedin.com/in/irohittiwari/"
              target="_blank"
              class="px-8 py-4 bg-[#4F46E5] text-white border border-white rounded-full font-bold hover:bg-black transition-all"
            >
              Follow on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
    `
  };

  await prisma.page.upsert({
    where: { slug: 'rohit-tiwari' },
    update: {
      title: 'Rohit Tiwari | Founder & CEO',
      content: rohitContent,
    },
    create: {
      title: 'Rohit Tiwari | Founder & CEO',
      slug: 'rohit-tiwari',
      content: rohitContent,
    },
  });

  //console.log('Rohit Tiwari page seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
