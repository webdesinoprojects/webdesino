// Portfolio Projects Data
export interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  industry: string;
  description: string;
  image: string;
  fullDescription?: string;
  results?: string;
  metrics?: {
    growth?: string;
    sales?: string;
    traffic?: string;
  };
}

export const getPortfolioProjects = (): PortfolioProject[] => {
  return [
    {
      id: 1,
      title: "BookBuzzz",
      slug: "bookbuzzz",
      industry: "Ecommerce",
      description:
        "After just 3 months of SEO, marketing, and website optimization, they now generate ₹25,00,000+ monthly sales.",
      image: "https://api.microlink.io/?url=https://bookbuzzz.com/&screenshot=true&embed=screenshot.url",
      fullDescription:
        "BookBuzzz approached Webdesino with nearly zero website and marketplace sales. Through comprehensive SEO strategies, performance marketing, and website optimization, we transformed their online presence. Within just 3 months, they achieved ₹25,00,000+ in monthly sales across their website and marketplaces.",
      results: "Increased monthly sales from zero to ₹25,00,000+ through SEO and website optimization.",
      metrics: {
        growth: "532%",
        sales: "₹25,00,000+ monthly",
      },
    },
    {
      id: 2,
      title: "LuckyNutra",
      slug: "luckynutra",
      industry: "Ecommerce",
      description:
        "Within 2 months, with our SEO & performance marketing strategies, they now generate ₹10,00,000+ monthly sales.",
      image: "https://api.microlink.io/?url=https://luckynutra.com/&screenshot=true&embed=screenshot.url",
      fullDescription:
        "LuckyNutra started with only ₹3,000/month in website sales and zero marketplace presence. Our team implemented targeted SEO strategies and performance marketing campaigns. Within 2 months, they achieved ₹10,00,000+ in monthly sales.",
      results: "Boosted sales from ₹3,000/month to ₹10,00,000+ monthly with SEO & performance marketing.",
      metrics: {
        growth: "244%",
        sales: "₹10,00,000+ monthly",
      },
    },
    {
      id: 3,
      title: "BuyKhariBauli",
      slug: "buykharibauli",
      industry: "Ecommerce",
      description:
        "After implementing our SEO campaigns and optimizing user experience, they now achieve ₹6,00,000/month in sales.",
      image: "https://api.microlink.io/?url=https://buykharibaoli.com/&screenshot=true&embed=screenshot.url",
      fullDescription:
        "BuyKhariBauli began with ₹30,000/month in website sales. Through strategic SEO campaigns and comprehensive user experience optimization, we helped them achieve ₹6,00,000/month in sales directly from their website.",
      results: "Improved website sales from ₹30,000/month to ₹6,00,000/month with targeted SEO campaigns.",
      metrics: {
        growth: "375%",
        sales: "₹6,00,000/month",
      },
    },
    {
      id: 4,
      title: "Meritshot",
      slug: "meritshot",
      industry: "Healthcare",
      description:
        "Within months, we ranked their website on highly competitive global keywords... driving significant worldwide visibility.",
      image: "https://api.microlink.io/?url=https://meritshot.com/&screenshot=true&embed=screenshot.url",
      fullDescription:
        "Meritshot partnered with Webdesino for a focused SEO strategy targeting highly competitive global keywords. We successfully ranked their website for terms like 'Investment Banking Course', 'Best Institute for Investment Banking', and 'Indian No.1 Institute for Investment Banking', driving significant worldwide visibility and student enrollments.",
      results: "Ranked on highly competitive global keywords, driving significant worldwide visibility.",
      metrics: {
        growth: "510%",
        traffic: "Global visibility",
      },
    },
  ];
};

// Testimonials Data
export interface Testimonial {
  id: number;
  name: string;
  text: string;
  company?: string;
  location?: string;
}

export const getTestimonials = (): Testimonial[] => {
  return [
    {
      id: 1,
      name: "Siddhi Agarwal",
      text: "WebDesino developed our website and app with a clean, SEO-friendly design. We saw instant growth in web development in Delhi searches.",
      location: "Delhi",
    },
    {
      id: 2,
      name: "Mansi Agarwal",
      text: "Their local SEO services in Uttam Nagar boosted our calls and lead generation by 3x. Very professional and reliable team.",
      location: "Uttam Nagar, Delhi",
    },
    {
      id: 3,
      name: "Tanvi Mehta",
      text: "They fixed our technical SEO issues and rebuilt our site. Now we rank higher for SEO services in Karol Bagh and get more quality leads.",
      location: "Karol Bagh, Delhi",
    },
    {
      id: 4,
      name: "Hardisha Kaur",
      text: "Our eCommerce store is performing 5x better after WebDesino's digital marketing in Delhi NCR. Excellent ROI and reporting.",
      company: "E-commerce Business",
    },
    {
      id: 5,
      name: "Rajesh Sharma",
      text: "We hired them for website development in Krishan Vihar and saw our monthly sales jump from 30k to over 6 lakhs. Amazing!",
      location: "Krishan Vihar, Delhi",
    },
    {
      id: 6,
      name: "Priya Malhotra",
      text: "Our coaching institute's admissions doubled after WebDesino's education SEO strategies in Delhi. Highly recommended.",
      company: "Coaching Institute",
    },
    {
      id: 7,
      name: "Rakesh Jain",
      text: "We partnered with them for small business SEO in Delhi NCR. Affordable packages and real results — exactly what we needed.",
      location: "Delhi NCR",
    },
    {
      id: 8,
      name: "Neha Kapoor",
      text: "WebDesino is the best SEO & digital marketing company in Kamla Nagar. Our local business now gets daily leads from Google.",
      location: "Kamla Nagar, Delhi",
    },
  ];
};

// FAQ Data
export interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

export const getFAQs = (): FAQ[] => {
  return [
    {
      question: "What makes WebDesino the best web development company in Delhi NCR?",
      answer:
        "WebDesino stands out for delivering SEO-friendly, fast-loading, and mobile-responsive websites tailored for businesses in Delhi NCR. Our team combines technical expertise with creative design to create websites that not only look great but also perform exceptionally well in search engines. With proven case studies and results-driven strategies, we ensure maximum ROI for our clients.",
      category: "General",
    },
    {
      question:
        "Do you provide local SEO services for areas like Uttam Nagar, Karol Bagh, and other Delhi NCR locations?",
      answer:
        "Yes, our local SEO packages are customized for businesses in Delhi NCR areas such as Uttam Nagar, Karol Bagh, Kamla Nagar, and Krishan Vihar. We help businesses improve their local search visibility and attract more customers from their target areas through Google Maps optimization and hyperlocal SEO strategies.",
      category: "SEO Services",
    },
    {
      question: "How long does it take to see results from SEO with WebDesino?",
      answer:
        "SEO is a long-term strategy. Most clients see visible improvements in their search rankings and organic traffic within 2–3 months. However, significant results typically appear after 4–6 months of consistent optimization efforts. We provide monthly reports to track progress and adjust strategies as needed.",
      category: "SEO Services",
    },
    {
      question: "What services does WebDesino offer?",
      answer:
        "WebDesino offers comprehensive digital marketing services including web design and development, SEO optimization, digital marketing, graphic design, mobile app development, and ongoing website maintenance and support. We serve businesses across various industries including Real Estate, Healthcare, E-commerce, Education, and Startups.",
      category: "Services",
    },
    {
      question: "Do you provide website maintenance services?",
      answer:
        "Yes, we offer 24/7 support and maintenance services to ensure your website remains updated, secure, and performing optimally at all times. Our maintenance packages include regular updates, security monitoring, backup services, and technical support.",
      category: "Services",
    },
    {
      question: "Can WebDesino help increase online sales for my eCommerce business?",
      answer:
        "Absolutely. With our eCommerce website development and SEO strategies, we've helped clients grow from zero sales to generating crores in monthly revenue. Our proven approach includes conversion optimization, performance marketing, and comprehensive SEO strategies tailored for e-commerce platforms.",
      category: "E-commerce",
    },
    {
      question: "Do you offer affordable web design packages for small businesses in Delhi?",
      answer:
        "Yes, our packages are designed for startups and SMEs in Delhi NCR. We provide affordable web design and SEO services without compromising on quality. We offer flexible pricing plans that can be customized based on your business needs and budget.",
      category: "Pricing",
    },
    {
      question: "Will my website be mobile-friendly and SEO-optimized?",
      answer:
        "Every website we build is 100% mobile-responsive, fast-loading, and optimized for Google search rankings, ensuring better visibility and user experience. We follow SEO best practices from the ground up, including proper heading structure, semantic HTML, optimized images, and fast page load times.",
      category: "Technical",
    },
    {
      question: "What is the cost of website designing in {{location}}?",
      answer: "Our pricing is flexible and depends on your specific requirements. We offer affordable packages tailored for small businesses and startups in {{location}}.",
      category: "Location",
    },
    {
      question: "Which is the best website development company in {{location}}?",
      answer: "WebDesino is a top-rated web development company serving {{location}}, known for delivering high-quality, SEO-friendly websites.",
      category: "Location",
    },
    {
      question: "Do you offer e-commerce website development for {{location}} businesses?",
      answer: "Yes, we specialize in building secure and scalable e-commerce websites using platforms like WooCommerce and Shopify for businesses in {{location}}.",
      category: "Location",
    },
  ];
};

// Features/Why Choose Us Data
export interface Feature {
  number: string;
  title: string;
  description: string;
}

export const getFeatures = (): Feature[] => {
  return [
    {
      number: "1",
      title: "Proven Results",
      description:
        "Trusted by businesses across Delhi NCR with measurable growth in traffic, leads, and sales. With over 6.3 Cr+ sales generated for clients and 100+ successful projects, we deliver measurable results.",
    },
    {
      number: "2",
      title: "Timely Delivery",
      description:
        "We respect deadlines and deliver fully tested, functional websites on time, every time. Our project management ensures transparent communication and on-schedule delivery.",
    },
    {
      number: "3",
      title: "Award Winning",
      description:
        "Recognized for professional work and high-quality digital solutions that set industry benchmarks. Our award-winning approach combines creativity with technical excellence.",
    },
    {
      number: "4",
      title: "Highest Rankings in Delhi",
      description:
        "Our SEO-first approach ensures your business ranks on top of Google searches in Delhi NCR. We specialize in local SEO for areas like Uttam Nagar, Karol Bagh, Kamla Nagar, and Krishan Vihar.",
    },
    {
      number: "5",
      title: "SEO-Optimized Websites",
      description:
        "Every site we build is mobile-friendly, fast-loading, and built to perform on Google search. Our websites are designed with SEO best practices from day one.",
    },
    {
      number: "6",
      title: "24/7 Support",
      description:
        "Our dedicated team is available round a clock for maintenance, updates, and assistance. We provide ongoing support to ensure your website continues to perform optimally.",
    },
  ];
};

// Services Data
export interface Service {
  title: string;
  href: string;
  description?: string;
}

export const getServices = (): Service[] => {
  return [
    {
      title: "Web Development Services",
      href: "/services",
      description:
        "Custom website development, e-commerce solutions, and responsive web design tailored for businesses in Delhi NCR. SEO-optimized and performance-focused.",
    },
    {
      title: "SEO & Digital Marketing",
      href: "/services",
      description:
        "Comprehensive SEO services, local SEO, keyword research, and digital marketing strategies to boost your online visibility and drive organic traffic.",
    },
    {
      title: "Content & Graphic Design",
      href: "/services",
      description:
        "Professional content writing, SEO blog writing, graphic design, branding, and social media content creation for your business growth.",
    },
  ];
};

// Results/Case Studies Data
export interface Result {
  title: string;
  description: string;
  growth: string;
  industry: string;
  slug?: string;
}

export const getResults = (): Result[] => {
  return [
    {
      title: "BookBuzzz E-commerce Growth",
      description: "Increased monthly sales from zero to ₹25,00,000+ through SEO and website optimization.",
      growth: "532%",
      industry: "E-commerce",
      slug: "bookbuzzz",
    },
    {
      title: "LuckyNutra Performance Marketing",
      description: "Boosted sales from ₹3,000/month to ₹10,00,000+ monthly with SEO & performance marketing.",
      growth: "244%",
      industry: "Health & Wellness",
      slug: "luckynutra",
    },
    {
      title: "BuyKhariBauli SEO Success",
      description: "Improved website sales from ₹30,000/month to ₹6,00,000/month with targeted SEO campaigns.",
      growth: "375%",
      industry: "E-commerce",
      slug: "buykharibauli",
    },
    {
      title: "Meritshot Global Rankings",
      description: "Ranked on highly competitive global keywords, driving significant worldwide visibility.",
      growth: "510%",
      industry: "Education",
      slug: "meritshot",
    },
  ];
};

// Case Studies Data
export interface CaseStudy {
  title: string;
  result: string;
  slug?: string;
}

export const getCaseStudies = (): CaseStudy[] => {
  return [
    {
      title: "Website Redesign for BookBuzzz",
      result: "Increased user engagement by 532% through a responsive and visually appealing interface.",
      slug: "bookbuzzz",
    },
    {
      title: "SEO Strategy for LuckyNutra",
      result: "Generated a 244% boost in organic search traffic by optimizing content and site structure.",
      slug: "luckynutra",
    },
    {
      title: "Lead Generation Funnel for BuyKhariBauli",
      result: "Improved lead conversion rate by 375% using a dynamic landing page and call-to-action optimization.",
      slug: "buykharibauli",
    },
    {
      title: "Global SEO for Meritshot",
      result: "Ranked on highly competitive global keywords, driving significant worldwide visibility.",
      slug: "meritshot",
    },
    {
      title: "Website Development for Local Business",
      result: "Monthly sales increased from ₹30,000 to over ₹6,00,000 through custom development.",
    },
    {
      title: "Education SEO Strategies",
      result: "Admissions doubled for a coaching institute after implementing targeted education SEO strategies.",
    },
    {
      title: "Digital Marketing for E-commerce",
      result: "Store performing 5x better with excellent ROI and comprehensive reporting.",
    },
    {
      title: "Local SEO in Uttam Nagar",
      result: "Boosted calls and lead generation by 3x for a local business.",
    },
  ];
};

// Industries for filtering
export const getIndustries = (): string[] => {
  return [
    "All",
    "E-commerce",
    "Health & Wellness",
    "Education",
    "Real Estate",
    "Corporate",
    "Fashion",
  ];
};

// Clients Data
export interface Client {
  name: string;
  url: string;
  image: string;
  category: "Our Clients" | "Querky" | "Shopify Websites" | "Our Apps" | "Digital Marketing" | "Graphic Designing";
}

export const getClients = (): Client[] => {
  return [
    // Our Clients (Websites)
    { name: "Land Sathi", url: "https://landsathi.com/", image: "https://api.microlink.io/?url=https://landsathi.com/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "Ambassador Perk", url: "https://ambassadorperk.com/", image: "https://api.microlink.io/?url=https://ambassadorperk.com/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "ProSkills Hub", url: "https://proskillshub.com/", image: "https://api.microlink.io/?url=https://proskillshub.com/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "Book Buzzz", url: "https://bookbuzzz.com/", image: "https://api.microlink.io/?url=https://bookbuzzz.com/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "Demo Project", url: "https://demo-liart-kappa.vercel.app/", image: "https://api.microlink.io/?url=https://demo-liart-kappa.vercel.app/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "E-Bulkwala", url: "https://e-bulkwala-rajeev-thes-projects.vercel.app/", image: "https://api.microlink.io/?url=https://e-bulkwala-rajeev-thes-projects.vercel.app/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "CS Hub", url: "https://cshub.in/", image: "https://api.microlink.io/?url=https://cshub.in/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "Aadiva", url: "https://aadiva.com/", image: "https://api.microlink.io/?url=https://aadiva.com/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "BuyKharibaoli", url: "https://buykharibaoli.com/", image: "https://api.microlink.io/?url=https://buykharibaoli.com/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "Site Karo", url: "https://site-karo-rajeev-thes-projects.vercel.app/", image: "https://api.microlink.io/?url=https://site-karo-rajeev-thes-projects.vercel.app/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "Mentok Healthcare", url: "https://mentokhealthcare.com/", image: "https://api.microlink.io/?url=https://mentokhealthcare.com/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    { name: "HospitalsKart", url: "https://www.hospitalskart.com/", image: "https://api.microlink.io/?url=https://www.hospitalskart.com/&screenshot=true&embed=screenshot.url", category: "Our Clients" },
    
    // Querky
    { name: "Maris Gina", url: "https://maris-gina.vercel.app/", image: "https://api.microlink.io/?url=https://maris-gina.vercel.app/&screenshot=true&embed=screenshot.url", category: "Querky" },
    { name: "SIC", url: "https://sic-jade.vercel.app/", image: "https://api.microlink.io/?url=https://sic-jade.vercel.app/&screenshot=true&embed=screenshot.url", category: "Querky" },
    { name: "Gabriel", url: "https://gabriel-three.vercel.app/", image: "https://api.microlink.io/?url=https://gabriel-three.vercel.app/&screenshot=true&embed=screenshot.url", category: "Querky" },
    { name: "ItzFizz Digital", url: "https://itzfizz-digital.vercel.app/", image: "https://api.microlink.io/?url=https://itzfizz-digital.vercel.app/&screenshot=true&embed=screenshot.url", category: "Querky" },
    { name: "Belen Lopez", url: "https://belenlopez.vercel.app/", image: "https://api.microlink.io/?url=https://belenlopez.vercel.app/&screenshot=true&embed=screenshot.url", category: "Querky" },
    { name: "Talent Buro", url: "https://talent-buro.vercel.app/", image: "https://api.microlink.io/?url=https://talent-buro.vercel.app/&screenshot=true&embed=screenshot.url", category: "Querky" },
    { name: "3JS Project", url: "https://3js-project1.vercel.app/", image: "https://api.microlink.io/?url=https://3js-project1.vercel.app/&screenshot=true&embed=screenshot.url", category: "Querky" },

    // Shopify Websites
    { name: "Muse Wellness Beauty Shop", url: "https://www.musewellnessbeautyshop.com/", image: "https://api.microlink.io/?url=https://www.musewellnessbeautyshop.com/&screenshot=true&embed=screenshot.url", category: "Shopify Websites" },
    { name: "Oceans Gallery Clo", url: "https://oceansgalleryclo.com/", image: "https://api.microlink.io/?url=https://oceansgalleryclo.com/&screenshot=true&embed=screenshot.url", category: "Shopify Websites" },
    { name: "Solo Rugs", url: "https://www.solorugs.com/", image: "https://api.microlink.io/?url=https://www.solorugs.com/&screenshot=true&embed=screenshot.url", category: "Shopify Websites" },
    { name: "Nourish Mantra", url: "https://nourishmantra.com/", image: "https://api.microlink.io/?url=https://nourishmantra.com/&screenshot=true&embed=screenshot.url", category: "Shopify Websites" },
    { name: "ShopHipV", url: "https://shophipv.com/", image: "https://api.microlink.io/?url=https://shophipv.com/&screenshot=true&embed=screenshot.url", category: "Shopify Websites" },

    // Our Apps
    { name: "Fancee User", url: "https://play.google.com/store/apps/details?id=com.fancee.user", image: "https://play-lh.googleusercontent.com/8P2P5j2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k", category: "Our Apps" },
    { name: "Fancee Celebrity", url: "https://play.google.com/store/apps/details?id=com.fancee.celebrity", image: "https://play-lh.googleusercontent.com/8P2P5j2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k", category: "Our Apps" },
    { name: "CityExpressKart Delivery", url: "https://play.google.com/store/apps/details?id=com.cityexpresskart.delivery", image: "https://play-lh.googleusercontent.com/8P2P5j2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k", category: "Our Apps" },
    { name: "Oorkart", url: "https://apps.apple.com/in/app/oorkart/id6475118165", image: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/df/2f/3f/df2f3f3f-3f3f-3f3f-3f3f-3f3f3f3f3f3f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp", category: "Our Apps" },
    { name: "Oorkart Seller", url: "https://apps.apple.com/in/app/oorkart-seller/id6475118015", image: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/df/2f/3f/df2f3f3f-3f3f-3f3f-3f3f-3f3f3f3f3f3f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp", category: "Our Apps" },
    { name: "Auto Assist Limo", url: "https://apps.apple.com/in/app/auto-assist-limo/id6475956973", image: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/df/2f/3f/df2f3f3f-3f3f-3f3f-3f3f-3f3f3f3f3f3f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/246x0w.webp", category: "Our Apps" },
    { name: "Auto Assist Driver", url: "https://play.google.com/store/apps/details?id=com.autoassist.driverapp", image: "https://play-lh.googleusercontent.com/8P2P5j2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k2k", category: "Our Apps" },

    // Digital Marketing (Ads Results)
    { name: "Google Ads Dashboard Result 1", url: "#", image: "https://webdesino.com/wp-content/uploads/2025/07/6.png", category: "Digital Marketing" },
    { name: "Google Ads Dashboard Result 2", url: "#", image: "https://webdesino.com/wp-content/uploads/2025/07/5.png", category: "Digital Marketing" },
    { name: "Google Ads Dashboard Result 3", url: "#", image: "https://webdesino.com/wp-content/uploads/2025/07/4-1.png", category: "Digital Marketing" },
    { name: "Google Ads Dashboard Result 4", url: "#", image: "https://webdesino.com/wp-content/uploads/2025/07/3-1.png", category: "Digital Marketing" },
    
    // Digital Marketing (SMM Portfolio)
    { name: "Bookbuzzz Instagram", url: "https://www.instagram.com/bookbuzzz.insta/", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Buy Kharibaoli Instagram", url: "https://www.instagram.com/buykharibaoli/?hl=en", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Machino International Instagram", url: "https://www.instagram.com/machino_int/", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Aerolam India Instagram", url: "https://www.instagram.com/aerolamindia?igsh=MXdyY2lxenZnMjQ5Zw==", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Kirti Gold Kannada Instagram", url: "https://www.instagram.com/kirtigoldkannada?igsh=MTlybGZhMzA4OXY4Zw==", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Lokmanya Hospital Instagram", url: "https://www.instagram.com/lokmanya_hospital?igsh=MjB5ejJmNDBwN3Zw", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Ayatana Resorts Instagram", url: "https://www.instagram.com/ayatana.resorts?igsh=MXY1djBpMjM0eWVrdw==", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Khushi Thakur Instagram", url: "https://www.instagram.com/thekhushithakurrr?igsh=MWZ3a2IxOHNhYTV3eg==", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Yuccavillas Instagram", url: "https://www.instagram.com/yuccavillas?igsh=Mnphc2gyMWJqNDh3", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Shivangi Narula Instagram", url: "https://www.instagram.com/shivanginarula.in?igsh=MWdxYTlseGtrZDluaQ==", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Shubhangi Chauhan Instagram", url: "https://www.instagram.com/shubhangi_chauhan__?igsh=cTY3cWxlN2prajJh", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },
    { name: "Fit24 Bharat Instagram", url: "https://www.instagram.com/fit24bharat?igsh=MXd0dmc1dmsxcGFmYg==", image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png", category: "Digital Marketing" },

    // Graphic Designing
    { name: "Editing Services Portfolio", url: "https://sites.google.com/view/irohittiwari/home", image: "https://api.microlink.io/?url=https://sites.google.com/view/irohittiwari/home&screenshot=true&embed=screenshot.url", category: "Graphic Designing" },
    { name: "Live Portfolio Drive", url: "https://drive.google.com/drive/folders/1IxNCMHFUbenPjesmLWOJm-TO3rbWCrSo", image: "https://api.microlink.io/?url=https://drive.google.com/drive/folders/1IxNCMHFUbenPjesmLWOJm-TO3rbWCrSo&screenshot=true&embed=screenshot.url", category: "Graphic Designing" },
  ];
};

// Blog Data
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
  content?: string;
}

export const getBlogPosts = (): BlogPost[] => {
  return [
    {
      id: "1",
      title: "Why South Delhi Startups Trust WebDesino for Social Media Marketing, Website Development & PPC Campaigns",
      slug: "why-south-delhi-startups-trust-webdesino-for-social-media-marketing-website-development-ppc-campaigns",
      date: "November 21, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s highly competitive digital world, every business—whether it’s a new startup or an established brand—needs a strong online presence. But for founders juggling product...",
      image: "https://webdesino.com/wp-content/uploads/2025/11/Social-Media-Agency-In-South-Africa-1024x643-1.jpeg",
      content: `
        <p>In today’s highly competitive digital world, every business—whether it’s a new startup or an established brand—needs a strong online presence. But for founders juggling product development, operations, sales, and customer support, marketing often becomes the most ignored part. This is where WebDesino, a trusted digital growth partner, comes in.</p>
        <p>From <a href="https://webdesino.com/social-media-management/">social media marketing agency services in South Delhi</a> to <a href="http://website%20development%20services%20in%20gurgaon%20delhi/">website development in Gurgaon</a> & Delhi NCR, and PPC campaign management for startups in Delhi, WebDesino offers everything a business needs to scale in the digital era.</p>
        <p>If you’re a startup looking to create authority, attract customers, and grow consistently, this blog will help you understand how WebDesino can be the one-stop solution for your digital success.</p>
        
        <h2>Social Media Marketing Agency in South Delhi – Why It Matters</h2>
        <p>South Delhi is home to thousands of fast-growing startups, premium service providers, cafes, boutique stores, fitness brands, and lifestyle businesses. Here, customers spend more time on Instagram, YouTube, Facebook, and LinkedIn than anywhere else. This means the brand a customer sees online first usually gets their attention—and business.</p>
        <p>Being a leading social media marketing agency in South Delhi, WebDesino understands this trend better than anyone.</p>
        
        <h3>What Makes WebDesino Different?</h3>
        <ul>
          <li><strong>Unique brand storytelling:</strong> People don’t follow boring brands. They follow stories, personalities, and vibes. WebDesino creates a unique identity that matches your business goals and audience psychology.</li>
          <li><strong>Creative content for every platform:</strong> Instagram needs visual storytelling. LinkedIn needs professional value-driven content. YouTube needs keyword-rich long-form videos. WebDesino designs content strategies specifically for each platform.</li>
          <li><strong>Growth-focused strategies:</strong> Organic growth is great, but today’s market needs smart optimization. WebDesino creates a mix of reels, trending posts, ad campaigns, and influencer collaborations to boost visibility and conversions.</li>
          <li><strong>Real analytics & ROI tracking:</strong> You get weekly and monthly reports with complete clarity—reach, engagement, audience growth, leads, and conversions.</li>
        </ul>

        <h2>Website Development Services in Gurgaon & Delhi NCR – Build a Website That Sells</h2>
        <p>A website is not just a digital visiting card anymore—it’s your digital showroom, sales engine, and brand’s first impression. Startups in Gurgaon, Delhi NCR, and surrounding areas rely heavily on professional websites to build trust and convert visitors into paying customers.</p>
        <p>This is why WebDesino’s website development services in Gurgaon Delhi are designed with three priorities:</p>
        <ul>
          <li><strong>High-quality design:</strong> No one likes outdated layouts or confusing navigation. The WebDesino team creates modern UI/UX websites that look premium and feel effortless to use.</li>
          <li><strong>Fast loading speed:</strong> Your visitors decide in less than 3 seconds whether they will stay or leave. The development team ensures optimal performance, image compression, clean coding, and smooth functionality.</li>
          <li><strong>SEO-ready structure:</strong> Your website should rank on Google. WebDesino builds SEO-friendly websites with clean URLs, strong on-page structure, keyword-optimized layouts, and technical SEO integration.</li>
        </ul>

        <h2>PPC Campaign Management in Delhi for Startups – Fastest Way to Get Customers</h2>
        <p>Every startup wants quick results—but organic methods take time. This is why PPC campaign management in Delhi for startups has become one of the most demanded services. And WebDesino specializes in running high-performance Google Ads, Meta Ads, and YouTube Ads specifically designed for small budgets and high returns.</p>
        
        <h3>How WebDesino Runs ROI-Driven PPC Campaigns</h3>
        <ul>
          <li><strong>In-depth market research:</strong> Understanding competitors, target audience, search demand, and cost-per-click is the foundation of a successful campaign.</li>
          <li><strong>Smart keyword selection:</strong> Instead of wasting money on broad keywords, WebDesino targets long-tail, intent-based keywords that bring high-quality leads.</li>
          <li><strong>Engaging ad copies & creatives:</strong> The difference between a performing ad and a failed ad is usually the messaging. The team uses real psychology-based ad writing to boost CTR and conversions.</li>
          <li><strong>Daily optimization:</strong> Startup budgets are small, so optimization is the key to saving money. WebDesino uses smart bidding strategies, keyword filtering, A/B testing, and audience retargeting for maximum ROI.</li>
        </ul>

        <h2>Final Thoughts</h2>
        <p>South Delhi and Gurgaon are among the fastest-growing business hubs in India. Every day, new startups launch, competition increases, and consumer choices expand. In this crowded environment, digital presence is not optional—it is the backbone of your business growth.</p>
        <p>If you want a partner who understands branding, technical development, and performance marketing equally well, WebDesino is the agency you can trust.</p>
      `
    },
    {
      id: "2",
      title: "Digital Marketing in Delhi: Why Small Businesses Trust WebDesino for SEO, Website Design & Affordable Growth Solutions",
      slug: "digital-marketing-in-delhi-why-small-businesses-trust-webdesino-for-seo-website-design-affordable-growth-solutions",
      date: "November 20, 2025",
      category: "Digital Marketing",
      excerpt: "Delhi is one of the fastest-growing business hubs in India. Whether it’s a local shop in Laxmi Nagar, a startup in Dwarka, or a service...",
      image: "https://webdesino.com/wp-content/uploads/2025/11/seo-1024x523.jpg",
      content: `
        <p>Delhi is one of the fastest-growing business hubs in India. Whether it’s a local shop in Laxmi Nagar, a startup in Dwarka, or a service business in Rohini—every brand wants visibility, customers, and growth. And in this crowded marketplace, <a href="https://webdesino.com/digital-marketing-services/">digital marketing in Delhi</a> has become the backbone of business success. But with hundreds of agencies promising results, small businesses often struggle to find a trusted team that actually delivers value at an affordable price.</p>
        <p>This is where WebDesino stands out. Known for offering <a href="https://webdesino.com/seo-services/">SEO services</a>, website design in Delhi NCR, and complete digital marketing support at small-business-friendly pricing, WebDesino has become a go-to partner for brands that want real growth—not just big promises.</p>
        
        <h2>Why Digital Marketing in Delhi Matters More Than Ever</h2>
        <p>Delhi’s market is booming, but competition is brutal. Customers don’t search for products by walking from shop to shop anymore—they search online. The first brand that appears on Google, Instagram, or YouTube wins their attention.</p>
        
        <h3>1. Customers Search Online Before Buying</h3>
        <p>Whether someone is looking for a doctor, an institute, a café, a salon, or a home service—Google is their first stop. If your business isn’t visible, it doesn’t exist in their eyes.</p>
        
        <h3>2. Local Competition Is High</h3>
        <p>Thousands of businesses across Delhi fight for the same customers. Proper SEO, social media presence, and website optimization decide who wins the game.</p>
        
        <h3>3. Online Branding Builds Trust</h3>
        <p>A professional website, active social media, and strong Google rankings make even a small business appear trustworthy and established.</p>
        
        <h3>4. Digital Marketing Is More Affordable Than Traditional Ads</h3>
        <p>Billboards, newspapers, pamphlets—these are costly and temporary. Digital marketing gives long-term returns at a fraction of the price.</p>
        
        <h2>Why Choosing the Right SEO Agency in Delhi Is a Game-Changer</h2>
        <p>SEO (Search Engine Optimization) is the heart of digital marketing. A business ranking on top of Google receives consistent traffic, leads, and sales—without paid ads.</p>
        <p>But SEO in Delhi is not easy. Google’s algorithm keeps changing, and thousands of websites compete for the same keywords. This is why choosing the right SEO agency in Delhi is crucial.</p>
        
        <h3>A good SEO agency will:</h3>
        <ul>
          <li>Research keywords based on Delhi market</li>
          <li>Optimize your website for speed, UX, and mobile devices</li>
          <li>Improve on-page SEO like titles, meta descriptions, headers</li>
          <li>Build high-quality backlinks</li>
          <li>Optimize Google Business Profile</li>
          <li>Target local keywords (e.g., “best salons in Lajpat Nagar”)</li>
          <li>Provide transparent reports</li>
          <li>Deliver real growth instead of fake traffic</li>
        </ul>
        
        <h2>A Complete Growth Partner for Delhi’s Small Businesses</h2>
        <p>WebDesino was built to help small and mid-sized businesses grow online without burning their pockets. Whether you need a new website, ranking on Google, or full digital marketing management—the team handles everything with a clear strategy.</p>
        
        <h3>1. Affordable Digital Marketing Services in Delhi</h3>
        <p>Small businesses often hesitate because agencies charge high prices. WebDesino solves this with customized, budget-friendly plans—so even a new business can start digital marketing without stress.</p>
        
        <h3>2. Strong Focus on SEO + Local Visibility</h3>
        <p>From Google Business Profile optimization to local keyword targeting, WebDesino helps you dominate your immediate market areas like Delhi, Noida, Ghaziabad, or Gurgaon.</p>
        
        <h3>3. Creative Website Design in Delhi NCR</h3>
        <p>Websites built by WebDesino are fast, mobile-friendly, SEO-ready, clean, and modern.</p>
        
        <h3>4. End-to-End Digital Solutions Under One Roof</h3>
        <p>You don’t need multiple vendors for website, SEO, content, and social media. WebDesino manages everything for you.</p>
        
        <h2>Website Design in Delhi NCR: Why It Matters for Your Brand</h2>
        <p>In a city like Delhi NCR, customers judge your business by your website. A slow, outdated, or unprofessional site can push customers to your competitors even if your service is good.</p>
        <ul>
          <li><strong>Fast Loading:</strong> A 1–2 second loading time increases conversions drastically.</li>
          <li><strong>Mobile-Friendly Structure:</strong> Most users in Delhi browse using mobile phones.</li>
          <li><strong>SEO-Ready Technical Setup:</strong> Proper structure, schema, alt texts, and clean code help SEO.</li>
          <li><strong>Clear Call-to-Actions:</strong> “Call Now”, “Book Now”, “Get Quote”—these buttons help convert visitors to leads.</li>
        </ul>
        
        <h2>How WebDesino Provides Affordable Digital Marketing Services for Delhi’s Small Businesses</h2>
        <p>Digital marketing doesn’t have to be costly. WebDesino understands that small businesses want results without over-spending.</p>
        <ul>
          <li><strong>Customized Packages Based on Business Needs</strong></li>
          <li><strong>Smart Tools & Automation</strong></li>
          <li><strong>Competitive Delhi Pricing</strong></li>
          <li><strong>Transparent Reporting</strong></li>
          <li><strong>Long-Term Growth Focus</strong></li>
        </ul>
        
        <h2>Final Thoughts</h2>
        <p>The digital landscape of Delhi is evolving fast. Brands that invest in online visibility today will dominate tomorrow. Whether you need digital marketing in Delhi, a powerful SEO agency in Delhi, or modern website design in Delhi NCR, WebDesino delivers reliable and affordable solutions built for real business growth.</p>
      `
    },
    {
      id: "3",
      title: "Digital Marketing in Delhi & the Rise of Expert SEO Services – Why WebDesino Leads the Way",
      slug: "digital-marketing-in-delhi-the-rise-of-expert-seo-services-why-webdesino-leads-the-way",
      date: "November 19, 2025",
      category: "Digital Marketing",
      excerpt: "Delhi has become a fast-growing digital hub where businesses compete every single day for online visibility, customer engagement, and brand trust. From small startups in...",
      image: "https://webdesino.com/wp-content/uploads/2025/11/affordable-seo-services-1024x576.png",
      content: `
        <p>Delhi has become a fast-growing digital hub where businesses compete every single day for online visibility, customer engagement, and brand trust. From small startups in Laxmi Nagar to established brands in Connaught Place and South Delhi, every business is now shifting towards digital transformation. This sudden shift has made <a href="https://webdesino.com/digital-marketing-services/">digital marketing in Delhi</a> one of the most in-demand services—and choosing the right agency determines how fast your business grows online.</p>
        <p>In this environment, WebDesino, a trusted digital marketing and <a href="https://webdesino.com/seo-services/">SEO agency in Delhi</a>, is helping businesses build strong online identities, generate leads, and achieve long-term growth through strategic, data-driven marketing.</p>
        
        <h2>Why Digital Marketing in Delhi Is Growing Rapidly</h2>
        <p>Delhi is home to thousands of businesses—restaurants, coaching centers, e-commerce stores, real estate companies, local service providers, and corporates. Almost every sector now depends on online visibility to attract customers.</p>
        
        <h3>Key reasons behind the rise of digital marketing in Delhi:</h3>
        <ul>
          <li><strong>Customers search online before buying:</strong> Whether it’s food delivery, home services, courses, salons, real estate, or electronics—Delhi residents prefer checking Google reviews, websites, and social media before making decisions.</li>
          <li><strong>Increasing smartphone and internet usage:</strong> High-speed internet and affordable smartphones have made online platforms a primary source of information.</li>
          <li><strong>Rising competition in every industry:</strong> Every business now wants to appear on the first page of Google, making digital marketing essential—not optional.</li>
          <li><strong>Preference for targeted advertising:</strong> Unlike traditional marketing, digital marketing helps create targeted ads for specific locations, age groups, and interests—giving higher ROI.</li>
        </ul>
        
        <h2>What Makes Digital Marketing in Delhi Unique?</h2>
        <p>Delhi is unlike any other metro city because it has multiple market types: Traditional markets (Chandni Chowk, Karol Bagh), Growing corporate zones (Gurgaon, Noida), Startup-heavy areas (Saket, Hauz Khas), Highly competitive local business areas, and Education and coaching hubs.</p>
        <p>Each of these markets requires a different digital marketing strategy. A salon in Lajpat Nagar needs strong local SEO and Instagram marketing, while a corporate business in Gurgaon needs LinkedIn ads, website optimization, and PR marketing.</p>
        
        <h2>Why SEO Is the Backbone of Digital Marketing</h2>
        <p>Digital marketing includes many activities—social media marketing, Google Ads, content writing, web development, branding—but SEO remains the foundation of long-term success.</p>
        
        <h3>Why every Delhi business needs SEO:</h3>
        <ul>
          <li><strong>Google searches bring the highest quality leads:</strong> If someone searches “best interior designer in Delhi,” “AC repair near me,” or “top digital marketing agency Delhi,” they have real buying intent.</li>
          <li><strong>SEO builds trust and brand authority:</strong> Businesses ranking on the first page are automatically seen as more reliable.</li>
          <li><strong>Organic traffic reduces ad costs:</strong> Instead of spending heavily on ads, SEO helps you get free traffic and better ROI.</li>
          <li><strong>Location-based searches increase footfall:</strong> “Near me” queries have increased massively in Delhi.</li>
        </ul>
        
        <h2>4. WebDesino – A Leading SEO Agency in Delhi</h2>
        <p>WebDesino has built a strong reputation for offering end-to-end digital marketing and SEO services. Their approach is simple but highly effective—understand the client’s business deeply, create a personalized plan, and execute it with proven strategies.</p>
        
        <h3>What sets WebDesino apart?</h3>
        <ul>
          <li>Experienced SEO Professionals</li>
          <li>Data-driven marketing strategies</li>
          <li>Transparent working process</li>
          <li>Customized solutions for every industry</li>
          <li>Ethical and safe SEO practices</li>
        </ul>
        
        <h2>WebDesino’s Digital Marketing Services</h2>
        <p>Being a full-service digital marketing agency in Delhi, WebDesino offers everything a business needs to grow online.</p>
        <ul>
          <li><strong>SEO Services:</strong> Technical SEO, On-page and off-page optimization, Local SEO, High-quality backlinks.</li>
          <li><strong>Social Media Marketing:</strong> Facebook, Instagram, LinkedIn campaigns, Creative content designing.</li>
          <li><strong>Website Design & Development:</strong> Mobile-friendly websites, Fast loading speed, SEO-ready structure.</li>
          <li><strong>Google Ads / PPC Management:</strong> Search Ads, Display Ads, Remarketing.</li>
          <li><strong>Content Marketing:</strong> Blogs, Website content, Landing page content.</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Digital marketing in Delhi is evolving fast, and businesses that adapt now will lead the future. Whether you’re a startup, a local shop, or a growing brand, your online presence decides your success. A trusted agency like WebDesino, with its expertise in SEO, social media, content, branding, and website development, gives your business the visibility and credibility it needs.</p>
      `
    },
    {
      id: "4",
      title: "Digital Marketing in Delhi: How WebDesino Is Redefining Growth With SEO & Website Design in Delhi NCR",
      slug: "digital-marketing-in-delhi-how-webdesino-is-redefining-growth-with-seo-website-design-in-delhi-ncr",
      date: "November 18, 2025",
      category: "Digital Marketing",
      excerpt: "In 2026, digital marketing in Delhi has completely transformed. Businesses are no longer competing only for visibility—they are competing for attention, trust, and long-term brand...",
      image: "https://webdesino.com/wp-content/uploads/2025/11/Digital-Marketing-in-Delhi.jpg",
      content: `
        <p>In 2026, digital marketing in Delhi has completely transformed. Businesses are no longer competing only for visibility—they are competing for attention, trust, and long-term brand authority. With rapid changes in consumer behavior, AI-driven searches, and smarter Google algorithms, companies now require a digital partner who understands modern marketing from the inside out. This is where WebDesino, one of the most reliable names in digital marketing, SEO, and <a href="https://webdesino.com/website-designing/">website design in Delhi NCR</a>, is making a strong impact.</p>
        
        <h2>Why Digital Marketing in Delhi Has Become a Must in 2026</h2>
        <p>Delhi has always been a competitive business hub, but 2026 is different. Consumers now rely on search engines, social media reviews, personalized recommendations, and AI-powered suggestions before making a purchase. Traditional marketing alone simply cannot keep up.</p>
        
        <h3>AI-Driven Consumer Behavior</h3>
        <p>People now use voice search, AI chat assistants, and personalized product recommendations more than ever. If your brand is not optimized for these trends, you fade into digital noise.</p>
        
        <h3>Online Presence Is the New “Address”</h3>
        <p>Your website and Google ranking are now more important than your physical office location. Customers trust what they see online.</p>
        
        <h3>Extreme Competition in Every Industry</h3>
        <p>From restaurants to coaching centers to ecommerce stores, everyone is fighting for the same digital space. Smart marketing gives you the advantage.</p>
        
        <h2>WebDesino – Your Trusted Digital Growth Partner in Delhi</h2>
        <p>WebDesino has emerged as a powerful player in Delhi’s digital marketing space, helping businesses build a strong digital identity. The company focuses on practical, ROI-driven solutions instead of generic marketing tactics.</p>
        
        <h2>SEO Agency in Delhi – Why Businesses Prefer WebDesino in 2026</h2>
        <p>SEO has become more important than ever in 2026 because Google’s new AI update favors value-driven content and voice search optimization has become a ranking factor.</p>
        <ul>
          <li><strong>Keyword Research Based on 2026 Search Trends:</strong> Search queries today are longer, more specific, and more conversational.</li>
          <li><strong>Local SEO for Maximum Leads:</strong> If you want customers from Delhi NCR—like Dwarka, Noida, Gurgaon, Rohini, Laxmi Nagar, or South Delhi—WebDesino helps your business appear in Google Maps and Local Searches.</li>
          <li><strong>On-Page SEO Perfected for Google’s Latest Rules:</strong> Fast loading websites, Mobile-first design, Strong internal linking.</li>
        </ul>
        
        <h2>Website Design in Delhi NCR – The New Identity of Modern Businesses</h2>
        <p>In 2026, a website is not just a page—it is the first impression of your brand. A slow or outdated website instantly kills trust and conversions. WebDesino specializes in modern, sleek, fast, and responsive website design in Delhi NCR that delivers results.</p>
        <ul>
          <li><strong>Modern UI/UX with High Conversion Rate</strong></li>
          <li><strong>Mobile-First Design (Very Important in 2026)</strong></li>
          <li><strong>Lightning-Fast Loading Speed</strong></li>
          <li><strong>SEO Ready from Day One</strong></li>
        </ul>
        
        <h2>Final Thoughts</h2>
        <p>As digital competition in Delhi NCR continues to rise in 2026, businesses need a strong partner who understands modern marketing, future trends, and customer psychology. WebDesino is helping brands transform their online presence through powerful digital marketing, high-performance SEO, and cutting-edge website design in Delhi NCR.</p>
      `
    },
    {
      id: "5",
      title: "Why WebDesino Is the Go-To Digital Partner in 2026 for Social Media, Website Development & PPC in Delhi NCR",
      slug: "why-webdesino-is-the-go-to-digital-partner-in-2026-for-social-media-website-development-ppc-in-delhi-ncr",
      date: "November 17, 2025",
      category: "Digital Marketing",
      excerpt: "The digital landscape in 2026 is more competitive, fast-moving, and algorithm-driven than ever before. Brands across Delhi NCR—especially startups and local businesses—are focusing heavily on...",
      image: "https://webdesino.com/wp-content/uploads/2025/11/Social-Media-Agency-In-South-Africa-1024x643-1.jpeg",
      content: `
        <p>The digital landscape in 2026 is more competitive, fast-moving, and algorithm-driven than ever before. Brands across Delhi NCR—especially startups and local businesses—are focusing heavily on online visibility, customer engagement, and performance-driven marketing. With platforms like Instagram, YouTube Shorts, Google Ads, and AI-powered search dominating consumer behavior, having the right digital partner can make or break your business growth.</p>
        <p>This is where WebDesino stands out as one of the most reliable and future-ready digital agencies. From being a creative <a href="https://webdesino.com/social-media-management/">social media marketing agency in South Delhi</a> to offering high-performance website development services in Gurgaon, Delhi NCR, and conversion-focused <a href="https://webdesino.com/ppc-campaign-management-in-delhi-for-startups/">PPC campaign management in Delhi for startups</a>, WebDesino brings everything under one roof.</p>
        
        <h2>Social Media Marketing Agency in South Delhi – Why It Matters in 2026</h2>
        <p>Social media trends evolve every year, but 2026 has been a game-changer. AI-driven recommendations, short-video dominance, community-led engagement, and authenticity-based branding are shaping how customers interact with businesses online.</p>
        
        <h3>What Social Media Looks Like in 2026</h3>
        <ul>
          <li>Short videos rule the internet—Instagram Reels, YouTube Shorts, Snapchat Spotlight.</li>
          <li>AI-driven content suggestions guide almost 70% of what users see.</li>
          <li>Local discovery features on platforms like Instagram Maps boost visibility for neighbourhood businesses.</li>
        </ul>
        
        <h3>How WebDesino Helps Brands Win on Social Media</h3>
        <ul>
          <li>Creates daily engaging content aligned with current trends.</li>
          <li>Plans data-backed hashtag & posting strategies for organic reach.</li>
          <li>Designs high-quality creatives, reels, stories, and ad campaigns.</li>
        </ul>
        
        <h2>Website Development Services in Gurgaon Delhi NCR – Building High-Performance Sites for 2026</h2>
        <p>In 2026, a website is not just an online brochure—it’s the heart of your brand, your sales engine, and your 24/7 digital storefront. Customers judge your business within 0.5 seconds of landing on your website.</p>
        
        <h3>How WebDesino Builds Future-Ready Websites</h3>
        <ul>
          <li>Ultra-fast loading websites optimized for speed.</li>
          <li>Mobile-first, responsive design compatible with all devices.</li>
          <li>SEO-optimized website structure for higher rankings.</li>
          <li>Ecommerce websites with advanced product dashboards.</li>
        </ul>
        
        <h2>PPC Campaign Management in Delhi for Startups – Fast Growth in 2026</h2>
        <p>For startups, time is everything. Organic growth is important, but paid advertising gives you instant visibility, immediate leads, and quick brand recognition. That’s why startups in 2026 heavily rely on PPC campaign management in Delhi to boost traffic and sales.</p>
        
        <h3>How WebDesino Delivers High-ROI PPC Campaigns</h3>
        <ul>
          <li>Performs detailed keyword research for high-intent searches.</li>
          <li>Designs landing pages optimized for conversions.</li>
          <li>Creates compelling ad copies that grab attention.</li>
          <li>Sets up smart bidding strategies to reduce cost per click.</li>
        </ul>
        
        <h2>Final Thoughts</h2>
        <p>If your goal in 2026 is strong branding, high-quality leads, and a powerful online presence, then teaming up with WebDesino gives your business a significant advantage. Whether you need a social media marketing agency in South Delhi, website development services in Gurgaon, or PPC campaign management in Delhi for startups, <a href="https://webdesino.com/">WebDesino</a> brings experience, creativity, and result-oriented strategies that help your business thrive.</p>
      `
    },
    {
      id: "6",
      title: "Why WebDesino Is the Growth Partner Every Small Business Needs",
      slug: "why-webdesino-is-the-growth-partner-every-small-business-needs",
      date: "November 15, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s fast-moving digital world, every business—whether a small shop in Lajpat Nagar or a startup in Gurgaon—needs strong online visibility. Delhi NCR has become...",
    },
    {
      id: "7",
      title: "Why Should Small Businesses in Delhi NCR Choose WebDesino for Website Design, SEO, and Digital Marketing?",
      slug: "why-should-small-businesses-in-delhi-ncr-choose-webdesino",
      date: "November 13, 2025",
      category: "Digital Marketing",
      excerpt: "If you’re a small business owner in Delhi NCR, you’ve probably wondered — “How can I compete with bigger brands online without spending a fortune?”...",
    },
    {
      id: "8",
      title: "The Best SEO Company in Delhi NCR Helping Local Businesses Grow Digitally",
      slug: "best-seo-company-in-delhi-ncr-helping-local-businesses",
      date: "November 12, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s competitive digital world, having a strong online presence is not an option — it’s a necessity. Whether you run a small local business...",
    },
    {
      id: "9",
      title: "Affordable Digital Marketing Services in Delhi for Small Businesses – WebDesino: Your Growth Partner",
      slug: "affordable-digital-marketing-services-in-delhi",
      date: "November 11, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s competitive market, every small business dreams of standing out and building a strong online presence. Whether you run a local store in South...",
    },
    {
      id: "10",
      title: "Digital Marketing in Delhi: How WebDesino Helps Businesses Grow Online",
      slug: "digital-marketing-in-delhi-how-webdesino-helps-businesses-grow-online",
      date: "November 10, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s competitive online world, having a strong digital presence is no longer optional — it’s essential. Whether you’re a small business owner, a growing...",
    },
    {
      id: "11",
      title: "Transform Your Business with Affordable Digital Marketing in Delhi",
      slug: "transform-your-business-with-affordable-digital-marketing-in-delhi",
      date: "November 5, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s fast-paced digital world, every business—big or small—needs a strong online presence to stay ahead of the competition. Whether you’re running a startup, a...",
    },
    {
      id: "12",
      title: "Grow Your Business with the Best Digital Marketing Company in Delhi NCR",
      slug: "grow-your-business-with-the-best-digital-marketing-company-in-delhi-ncr",
      date: "November 3, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s competitive world, every business — whether a small local store or a fast-growing startup — needs a strong online presence. If you’re searching...",
    },
    {
      id: "13",
      title: "Digital Domination in Delhi: How WebDesino Is Powering Local Businesses Online",
      slug: "digital-domination-in-delhi-how-webdesino-is-powering-local-businesses-online",
      date: "November 1, 2025",
      category: "Digital Marketing",
      excerpt: "In the heart of India’s hustle — Delhi NCR — every street has a story and every brand wants to be heard. But in a...",
    },
    {
      id: "14",
      title: "Affordable Digital Marketing Services in Delhi for Small Businesses",
      slug: "affordable-digital-marketing-services-in-delhi-for-small-businesses",
      date: "October 18, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s competitive world, small businesses need a strong digital presence to grow, attract customers, and stay ahead. That’s where WebDesino, a trusted name in...",
      content: `
        <p>In today’s competitive world, small businesses need a strong digital presence to grow, attract customers, and stay ahead. That’s where WebDesino, a trusted name in <a href="https://webdesino.com/digital-marketing-services/" class="text-[#02066F] hover:underline">affordable digital marketing services in Delhi</a>, comes in. With years of expertise and a passion for helping startups and local brands, WebDesino empowers small businesses to compete with big names online — all without breaking the bank.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Why Small Businesses Need Digital Marketing in Delhi</h2>
        <p>Delhi is one of the fastest-growing markets in India, filled with startups, local shops, and small enterprises. But standing out among thousands of competitors isn’t easy. Traditional marketing methods like pamphlets or posters no longer deliver the desired reach.</p>
        <p>This is where digital marketing services in Delhi become essential. They help businesses connect directly with their audience on platforms like Google, Instagram, Facebook, and YouTube. From increasing website traffic to generating sales-ready leads, digital marketing opens endless opportunities for small businesses to grow faster and smarter.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">About WebDesino – The Best Digital Marketing Partner for Small Businesses</h2>
        <p>WebDesino is a professional digital marketing agency in Delhi NCR known for offering affordable, transparent, and result-driven marketing services. The company focuses on helping small and medium-sized businesses grow organically and through paid promotions.</p>
        <p>With a dedicated team of marketers, designers, and content creators, WebDesino provides complete digital solutions tailored to each business’s needs. Whether you’re a local shop owner, a startup founder, or a service-based company, WebDesino ensures your business gains visibility and trust online.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Services Offered by WebDesino</h2>
        <p>Here’s what makes WebDesino one of the top choices for affordable digital marketing services in Delhi for small businesses:</p>

        <h3 class="text-xl font-bold mt-6 mb-3">1. Search Engine Optimization (SEO)</h3>
        <p>WebDesino’s SEO experts optimize your website to appear higher on Google search results. They use advanced on-page and off-page techniques, ensuring your business ranks for local keywords like “digital marketing near me,” “SEO company in Delhi,” or “affordable SEO services.”</p>

        <h3 class="text-xl font-bold mt-6 mb-3">2. Social Media Marketing (SMM)</h3>
        <p>Social media is the voice of every brand. WebDesino helps small businesses create engaging social media campaigns that increase followers, drive engagement, and generate leads on platforms like Facebook, Instagram, and LinkedIn.</p>

        <h3 class="text-xl font-bold mt-6 mb-3">3. Pay-Per-Click Advertising (PPC)</h3>
        <p>For faster results, WebDesino runs cost-effective PPC campaigns on Google Ads and social platforms. Each campaign is designed to bring high-quality traffic and measurable conversions within a limited budget.</p>

        <h3 class="text-xl font-bold mt-6 mb-3">4. Website Design and Development</h3>
        <p>A strong online presence starts with a great website. WebDesino builds responsive, SEO-friendly, and fast-loading websites that help small businesses showcase their products and services professionally.</p>

        <h3 class="text-xl font-bold mt-6 mb-3">5. Content Marketing</h3>
        <p>Quality content builds trust. WebDesino’s team creates blogs, social posts, and website content that attract users and improve your brand’s online credibility.</p>

        <h3 class="text-xl font-bold mt-6 mb-3">6. Local SEO & Google Business Profile Optimization</h3>
        <p>For businesses targeting nearby customers, WebDesino specializes in local SEO services in Delhi NCR. From Google Business Profile optimization to local citation building, they help your brand appear on Google Maps and “near me” searches.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Why Choose WebDesino for Affordable Digital Marketing Services in Delhi</h2>
        <p>There are hundreds of agencies offering digital marketing services in Delhi, but WebDesino stands out because of its commitment to affordability, quality, and transparency.</p>
        <p>Here’s what makes WebDesino the preferred choice for small businesses:</p>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li><strong>Affordable Pricing:</strong> Tailored packages designed for startups and small business owners.</li>
          <li><strong>Transparent Reporting:</strong> You get regular reports showing results and performance insights.</li>
          <li><strong>Customized Strategy:</strong> Every business is unique, so the team builds personalized marketing plans that match your goals.</li>
          <li><strong>Expert Team:</strong> Certified professionals with deep knowledge of SEO, social media, and digital ads.</li>
          <li><strong>Customer-Centric Approach:</strong> WebDesino focuses on building long-term partnerships, not just one-time projects.</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">Benefits of Digital Marketing for Small Businesses</h2>
        <p>Digital marketing has transformed how small businesses operate and connect with their target audience. Some of the major benefits include:</p>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li><strong>Increased Visibility:</strong> Appear on top of Google search results and attract more customers.</li>
          <li><strong>Cost-Effective Marketing:</strong> Reach thousands of potential clients at a fraction of traditional marketing costs.</li>
          <li><strong>Measurable Results:</strong> Every campaign can be tracked, analyzed, and improved.</li>
          <li><strong>Targeted Audience Reach:</strong> Promote your products or services to people who are genuinely interested.</li>
          <li><strong>Brand Building:</strong> Consistent online marketing helps in creating trust and authority among customers.</li>
        </ul>

        <h2 class="text-2xl font-bold mt-8 mb-4">How WebDesino Helps Small Businesses Grow Online</h2>
        <p>WebDesino understands the challenges that small business owners face — limited budgets, time constraints, and tough competition. That’s why the agency focuses on delivering maximum ROI through affordable and smart marketing solutions.</p>
        <p>Here’s how WebDesino transforms small businesses into digital brands:</p>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li><strong>Step 1: Understanding Your Business</strong> – The team analyzes your goals, audience, and competitors.</li>
          <li><strong>Step 2: Creating a Customized Strategy</strong> – Based on insights, they design a strategy that fits your budget and business type.</li>
          <li><strong>Step 3: Implementation & Optimization</strong> – The experts execute campaigns and continuously optimize them for better results.</li>
          <li><strong>Step 4: Reporting & Growth Tracking</strong> – WebDesino provides regular reports and insights to help you measure your progress.</li>
        </ul>
        <p>Whether it’s generating leads through social media ads or improving your Google ranking, WebDesino ensures your business grows digitally every month.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Latest Trends in Digital Marketing for Small Businesses in Delhi</h2>
        <p>The digital landscape is constantly evolving, and WebDesino always stays ahead of trends to help small businesses benefit from new opportunities.</p>
        <p>Some of the latest digital marketing trends include:</p>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li><strong>AI-Powered Marketing Tools</strong> for better campaign targeting.</li>
          <li><strong>Voice Search Optimization</strong> to reach customers using voice assistants.</li>
          <li><strong>Video Content Marketing</strong> for higher engagement.</li>
          <li><strong>Local SEO Focus</strong> for businesses serving specific Delhi NCR areas.</li>
          <li><strong>Personalized Email Campaigns</strong> to retain loyal customers.</li>
        </ul>
        <p>WebDesino integrates these innovative techniques into its strategies to ensure maximum visibility and growth for your brand.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Areas Served by WebDesino in Delhi NCR</h2>
        <p>WebDesino proudly serves clients across Delhi NCR, including:</p>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li>Connaught Place</li>
          <li>Lajpat Nagar</li>
          <li>Dwarka</li>
          <li>Rohini</li>
          <li>Karol Bagh</li>
          <li>Noida</li>
          <li>Gurgaon</li>
          <li>Faridabad</li>
        </ul>
        <p>No matter where your business is located, WebDesino provides complete online marketing support tailored to your local audience.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Affordable Digital Marketing Packages by WebDesino</h2>
        <p>WebDesino’s goal is to make digital marketing affordable for every small business owner. The agency offers customized packages for:</p>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li>SEO and local SEO</li>
          <li>Social media management</li>
          <li>Paid advertising (Google Ads, Facebook Ads)</li>
          <li>Website design and content creation</li>
        </ul>
        <p>Each package is flexible, ensuring that you pay only for what you truly need.</p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Conclusion: Take Your Small Business to the Next Level with WebDesino</h2>
        <p>In the modern business world, digital marketing isn’t optional — it’s essential. If you’re a small business owner looking for affordable digital marketing services in Delhi, WebDesino is your ideal partner.</p>
        <p>With a customer-first approach, creative strategies, and transparent pricing, WebDesino helps you build your online presence, attract quality leads, and boost sales — all within your budget.</p>
        <p>So, don’t let your competitors steal the spotlight. Start your digital growth journey today with WebDesino – the best affordable digital marketing company in Delhi NCR for small businesses ready to make a big impact online.</p>
      `
    },
    {
      id: "15",
      title: "Website Design Delhi NCR: A Complete Guide to Choosing the Best Company for Your Business",
      slug: "website-design-delhi-ncr-a-complete-guide-to-choosing-the-best-company-for-your-business",
      date: "October 17, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s digital-first world, having a professional website is no longer optional; it’s essential. For businesses in Delhi NCR, finding the right website design company...",
    },
    {
      id: "16",
      title: "SEO Agency Delhi: Your Complete Guide to Finding Genuine SEO Services",
      slug: "seo-agency-delhi-your-complete-guide-to-finding-genuine-seo-services",
      date: "October 17, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s fast-paced digital world, having an online presence is essential for every business. Whether you run a small shop in Dwarka or manage a...",
    },
    {
      id: "17",
      title: "Best Web Development Company, SEO & Digital Marketing in Delhi – WebDesino",
      slug: "best-web-development-company-seo-digital-marketing-in-delhi-webdesino",
      date: "October 15, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s online-first world, having a strong digital presence is no longer optional — it’s essential. Businesses in Delhi NCR and nearby areas need a...",
    },
    {
      id: "18",
      title: "Best SEO Company in Delhi NCR for Local Business: Why WebDesino Excels Across Sukhdev Vihar, Jamia Millia Islamia, Okhla Vihar & Nearby Areas",
      slug: "best-seo-company-in-delhi-ncr-for-local-business",
      date: "October 10, 2025",
      category: "Digital Marketing",
      excerpt: "When local businesses—from cafés to clinics to retailers—in Delhi NCR seek growth, partnering with an agency that understands both technical strength and local nuances becomes...",
    },
    {
      id: "19",
      title: "Affordable Digital Marketing Services Delhi for Small Business: Boost Your Growth with WebDesino",
      slug: "affordable-digital-marketing-services-delhi-for-small-business-boost-your-growth-with-webdesino",
      date: "October 9, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s competitive business landscape, small businesses in Delhi face the challenge of standing out online while keeping costs manageable. This is where affordable digital...",
    },
    {
      id: "20",
      title: "Affordable Digital Marketing Services in Delhi for Small Businesses – Boost Local Visibility with WebDesino",
      slug: "affordable-digital-marketing-services-in-delhi-for-small-businesses-boost-local-visibility-with-webdesino",
      date: "October 7, 2025",
      category: "Digital Marketing",
      excerpt: "In the bustling districts of Delhi such as Moti Nagar, Palam, Sadar Bazar Cantonment, Shankar Vihar, and Vasant Vihar, small businesses often face a common...",
    },
    {
      id: "21",
      title: "WebDesino: Your Blueprint for Digital Success in Delhi NCR",
      slug: "webdesino-your-blueprint-for-digital-success-in-delhi-ncr",
      date: "October 6, 2025",
      category: "Digital Marketing",
      excerpt: "Transforming Small Businesses with Expert Website Design and Affordable Digital Marketing In the bustling economic landscape of Delhi NCR, standing out in the digital crowd...",
    },
    {
      id: "22",
      title: "Digital Marketing in Delhi: A Complete Guide for Businesses",
      slug: "digital-marketing-in-delhi-a-complete-guide-for-businesses",
      date: "October 4, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s competitive landscape, businesses in Delhi and NCR cannot rely only on traditional methods to grow. With the majority of consumers spending time online—whether...",
    },
    {
      id: "23",
      title: "Top Ecommerce Website Development Trends in Delhi NCR for 2025 and How SEO Consultants Can Boost Cafes & Restaurants",
      slug: "top-ecommerce-website-development-trends-in-delhi-ncr-for-2025-and-how-seo-consultants-can-boost-cafes-restaurants",
      date: "October 3, 2025",
      category: "Digital Marketing",
      excerpt: "In 2025, businesses in Delhi NCR are realizing more than ever that having an online presence is not optional—it’s essential. From startups to established cafes...",
    },
    {
      id: "24",
      title: "Website Development Services in Gurgaon Delhi and PPC Campaign Management for Startups",
      slug: "website-development-services-in-gurgaon-delhi-and-ppc-campaign-management-for-startups",
      date: "September 29, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s fast-changing digital landscape, a strong online presence has become the backbone of business growth. From startups to established enterprises, companies are realizing that...",
    },
    {
      id: "25",
      title: "Digital Marketing in Delhi – The Growth Engine for Businesses",
      slug: "digital-marketing-in-delhi-the-growth-engine-for-businesses",
      date: "September 27, 2025",
      category: "Digital Marketing",
      excerpt: "Digital marketing has become the backbone of modern business growth, and nowhere is it more evident than in Delhi. With thousands of startups, small businesses,...",
    },
    {
      id: "26",
      title: "Affordable Digital Marketing Services in Delhi for Small Business & Best SEO Company in Delhi NCR for Local Business",
      slug: "affordable-digital-marketing-services-in-delhi-for-small-business-best-seo-company-in-delhi-ncr-for-local-business",
      date: "September 26, 2025",
      category: "Digital Marketing",
      excerpt: "Digital marketing has become the lifeline for small businesses that want to grow and compete in today’s fast-moving market. In a city like Delhi NCR,...",
    },
    {
      id: "27",
      title: "WebDesino – Your Trusted SEO Agency in Delhi & Website Design Experts in Delhi NCR",
      slug: "webdesino-your-trusted-seo-agency-in-delhi-website-design-experts-in-delhi-ncr",
      date: "September 25, 2025",
      category: "Digital Marketing",
      excerpt: "Why Choosing the Right SEO Agency in Delhi Matters In today’s digital age, businesses are no longer judged by just their products or services but...",
    },
    {
      id: "28",
      title: "Digital Edge 2025: How WebDesino is Transforming Businesses with Website Development & PPC in Delhi NCR",
      slug: "digital-edge-2025-how-webdesino-is-transforming-businesses-with-website-development-ppc-in-delhi-ncr",
      date: "September 24, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s digital-first economy, a brand without an online presence is almost invisible. Whether you are a startup trying to create an impact, a retail...",
    },
    {
      id: "29",
      title: "Affordable Digital Marketing Services in Delhi for Small Businesses | Best SEO Company in Delhi NCR for Local Business – WebDesino",
      slug: "affordable-digital-marketing-services-in-delhi-for-small-businesses-best-seo-company-in-delhi-ncr-for-local-business-webdesino",
      date: "September 23, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s digital-first world, small businesses in Delhi are no longer competing only with local shops but also with online brands. Having a strong digital...",
    },
    {
      id: "30",
      title: "Digital Marketing in Delhi: How WebDesino Helps Businesses Grow with SEO, Website Design & Affordable Marketing Services",
      slug: "digital-marketing-in-delhi-how-webdesino-helps-businesses-grow-with-seo-website-design-affordable-marketing-services",
      date: "September 22, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s fast-paced digital world, having an online presence is no longer optional—it’s essential. For businesses in Delhi and NCR, competition is fierce across industries.",
    },
    {
      id: "31",
      title: "Ecommerce Website Development in Delhi NCR & SEO Consultant for Cafes and Restaurants",
      slug: "ecommerce-website-development-in-delhi-ncr-seo-consultant-for-cafes-and-restaurants",
      date: "September 18, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s digital-first world, businesses can no longer rely only on offline sales and word of mouth. Whether you run a fashion store, a homegrown...",
    },
    {
      id: "32",
      title: "Digital Marketing in Delhi: Why WebDesino is Your Trusted SEO Agency in Delhi",
      slug: "digital-marketing-in-delhi-why-webdesino-is-your-trusted-seo-agency-in-delhi",
      date: "September 17, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s fast-paced business world, digital marketing in Delhi has become the backbone of growth for startups, small businesses, and established enterprises alike. With millions...",
    },
    {
      id: "33",
      title: "How WebDesino is Transforming Local Businesses with Affordable Digital Marketing & Website Solutions in Delhi NCR",
      slug: "how-webdesino-is-transforming-local-businesses-with-affordable-digital-marketing-website-solutions-in-delhi-ncr",
      date: "September 16, 2025",
      category: "Digital Marketing",
      excerpt: "In today’s fast-paced digital world, every business—whether a café in South Delhi, a startup in Gurgaon, or a small store in Old Delhi—needs a strong...",
    },
    {
      id: "34",
      title: "Hello world!",
      slug: "hello-world",
      date: "August 11, 2024",
      category: "Uncategorized",
      excerpt: "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!",
    },
    {
      id: "35",
      title: "Omnis veritatis magnam inventore dolorum enim sit",
      slug: "omnis-veritatis-magnam-inventore-dolorum-enim-sit",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Saepe dolor neque. Repudiandae voluptatibus recusandae. Officiis vero nostrum. Eum voluptatibus animi.",
    },
    {
      id: "36",
      title: "Pariatur odit nisi occaecati qui facilis harum",
      slug: "pariatur-odit-nisi-occaecati-qui-facilis-harum",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Dolorem. Quibusdam cumque.",
    },
    {
      id: "37",
      title: "Et sit vel quo odit rerum ratione",
      slug: "et-sit-vel-quo-odit-rerum-ratione",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Distinctio sequi autem.",
    },
    {
      id: "38",
      title: "Nobis veniam culpa amet vero accusantium quo",
      slug: "nobis-veniam-culpa-amet-vero-accusantium-quo",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Aut aspernatur voluptas.",
    },
    {
      id: "39",
      title: "Aliquid et ratione aut est eveniet et",
      slug: "aliquid-et-ratione-aut-est-eveniet-et",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Qui voluptatum corrupti dolorem dolores et aut cum. Sit iste laborum qui. Expedita dolorem dolorem qui Et qui qui architecto provident itaque Aut ipsam veniam",
    },
    {
      id: "40",
      title: "Et sint facere illo",
      slug: "et-sint-facere-illo",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Maxime blanditiis aut qui.",
    },
    {
      id: "41",
      title: "Qui rem rerum doloremque facere maxime",
      slug: "qui-rem-rerum-doloremque-facere-maxime",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Culpa ipsa repellendus magni. Molestiae temporibus quisquam atque iusto et sit perferendis. Aut similique quia dolor facere sunt doloremque alias Ut qui quos et enim",
    },
    {
      id: "42",
      title: "Impedit minus reprehenderit consequatur reprehenderit laborum dicta",
      slug: "impedit-minus-reprehenderit-consequatur-reprehenderit-laborum-dicta",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Voluptate nam et esse. Eos est dolorum nam consequatur enim doloribus Sint ipsa accusamus earum rem Ea voluptas et dicta aut et Iusto eos ad",
    },
    {
      id: "43",
      title: "Corporis adipisci fugiat libero distinctio atque",
      slug: "corporis-adipisci-fugiat-libero-distinctio-atque",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Quia earum.",
    },
    {
      id: "44",
      title: "Aut cumque et unde doloribus necessitatibus",
      slug: "aut-cumque-et-unde-doloribus-necessitatibus",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Nisi ullam soluta ex rem. Vel vel nemo eos corporis. Qui rerum alias pariatur alias Vel dolor earum Mollitia ullam omnis aut aut rem Debitis",
    },
    {
      id: "45",
      title: "Rerum et reprehenderit eligendi quis",
      slug: "rerum-et-reprehenderit-eligendi-quis",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Excepturi doloremque consequatur ea saepe. Placeat temporibus voluptatem deleniti ut non. Qui nihil iure expedita impedit molestiae dolore dolorum",
    },
    {
      id: "46",
      title: "Expedita quam est rem saepe sit",
      slug: "expedita-quam-est-rem-saepe-sit",
      date: "April 22, 2024",
      category: "Blog",
      excerpt: "Qui sapiente illo repellendus vel vero In ut inventore animi perspiciatis. Deserunt ipsam consequatur exercitationem quibusdam ipsa odit eius. Nesciunt et illum sit animi Nulla",
    },
  ];
};

export interface HeroShowcaseItem {
  name: string;
  category: string;
  stat: string;
  description: string;
  iconName: "Store" | "Smartphone" | "Megaphone" | "Palette" | "Globe" | "TrendingUp";
  iconColor: string;
}

export const getHeroShowcaseItems = (): HeroShowcaseItem[] => {
  return [
    { 
      name: "BookBuzzz", 
      category: "E-commerce Website", 
      stat: "₹25L+ Sales", 
      description: "Scaled from zero to ₹25L+ monthly sales in 3 months",
      iconName: "Store",
      iconColor: "text-[#02066F]"
    },
    { 
      name: "Fitness Pro", 
      category: "Mobile App", 
      stat: "50k+ Downloads", 
      description: "Cross-platform fitness tracking app with real-time analytics",
      iconName: "Smartphone",
      iconColor: "text-[#02066F]"
    },
    { 
      name: "Growth Campaign", 
      category: "Digital Marketing", 
      stat: "500% ROI", 
      description: "Data-driven ad campaigns delivering massive returns",
      iconName: "Megaphone",
      iconColor: "text-[#02066F]"
    },
    { 
      name: "Brand Identity", 
      category: "Graphic Designing", 
      stat: "Viral Content", 
      description: "Stunning visuals and reels that captured millions of views",
      iconName: "Palette",
      iconColor: "text-[#02066F]"
    },
    { 
      name: "Meritshot", 
      category: "Education Platform", 
      stat: "Global Rank #1", 
      description: "Ranked #1 globally for Investment Banking courses",
      iconName: "Globe",
      iconColor: "text-[#02066F]"
    },
    { 
      name: "Foodie Express", 
      category: "Food Delivery App", 
      stat: "4.8 Star Rating", 
      description: "Seamless food ordering experience with live tracking",
      iconName: "Smartphone",
      iconColor: "text-[#02066F]"
    },
    { 
      name: "SEO Dominance", 
      category: "SEO Services", 
      stat: "1st Page Rank", 
      description: "Ranking businesses on top for competitive keywords",
      iconName: "TrendingUp",
      iconColor: "text-[#02066F]"
    },
    { 
      name: "Social Reels", 
      category: "Video Editing", 
      stat: "1M+ Views", 
      description: "High-retention video edits for social media growth",
      iconName: "Palette",
      iconColor: "text-[#02066F]"
    },
  ];
};

