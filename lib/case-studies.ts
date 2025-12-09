// Case Studies Data Structure
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  image?: string;
  heroMetrics: {
    revenue: string;
    roi: string;
    timeline: string;
    channels?: string;
  };
  background: string;
  challenges: {
    title: string;
    description: string;
    painPoints: string[];
  };
  solutions: {
    title: string;
    pillars: {
      name: string;
      description: string;
    }[];
  };
  implementation: {
    timeline: string;
    tools: string[];
    team: string[];
    process: string[];
  };
  results: {
    before: {
      revenue: string;
      traffic?: string;
      visibility: string;
    };
    after: {
      revenue: string;
      traffic?: string;
      visibility: string;
    };
    highlights: string[];
  };
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
  };
  keyLearnings: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: {
    name: string;
    url: string;
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "luckynutra",
    title: "Scaling ₹3,000 to ₹10,00,000+ Monthly Sales with SEO & Performance Marketing",
    client: "LuckyNutra",
    industry: "Health & Wellness (Supplements)",
    duration: "90 Days",
    image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/uploads/2025/10/Lucky_Nutra_1000px.png",
    heroMetrics: {
      revenue: "₹3K → ₹10L+ Monthly",
      roi: "+330x Growth",
      timeline: "90 Days",
      channels: "Amazon, Flipkart & Website"
    },
    background: "LuckyNutra is a fast-growing nutritional supplement brand in India, focused on providing high-quality, science-backed products. Despite offering effective supplements, they struggled with low sales, poor online visibility, and almost no brand presence on key digital channels. Their website traffic was negligible, and they weren't ranking for critical keywords.",
    challenges: {
      title: "The Challenge: Low Sales, Poor Visibility & Zero Marketplace Presence",
      description: "LuckyNutra had great supplements and demand potential, but lacked the SEO, marketing, and digital infrastructure to scale.",
      painPoints: [
        "Only ₹3,000/month sales from the website",
        "No marketplace presence on Amazon & Flipkart",
        "Zero SEO visibility for competitive supplement keywords",
        "Unoptimized product pages with weak content & structure",
        "Poor brand awareness among health & fitness audiences",
        "Slow loading website affecting user experience & conversions"
      ]
    },
    solutions: {
      title: "WebDesino's Step-by-Step Approach",
      pillars: [
        {
          name: "Website Optimization & Conversion Setup",
          description: "Redesigned to look premium, perform faster, and convert. Improved page speed, mobile experience, and created SEO-friendly product pages."
        },
        {
          name: "SEO & Technical Fixes",
          description: "Built a strong organic foundation. On-page SEO for critical supplements, optimized metadata, fixed crawlability, and published SEO-driven blogs."
        },
        {
          name: "Google Ads & Meta Ads Campaigns",
          description: "Launched paid campaigns to capture demand. Google Search & Shopping Ads, Facebook & Instagram ads with lifestyle creatives, and remarketing."
        },
        {
          name: "Marketplace Launch & Growth",
          description: "Built listings from scratch on Amazon & Flipkart. Enhanced titles, descriptions, A+ content, and implemented marketplace advertising."
        }
      ]
    },
    implementation: {
      timeline: "Month 1: Audit & Setup. Month 2: Ads Launch & Content. Month 3: Scaling & Advanced SEO.",
      tools: ["Google Analytics & GA4", "Google Search Console", "SEMrush & Ahrefs", "Google Ads & Meta Ads", "Amazon & Flipkart Seller Central", "WordPress & WooCommerce"],
      team: ["SEO Specialists", "Web Design Team", "Digital Marketing Experts", "Marketplace Managers", "Content Team", "Data Analysts"],
      process: ["Audit", "Strategy", "Execution", "Optimization", "Scaling"]
    },
    results: {
      before: {
        revenue: "₹3,000/month",
        visibility: "Zero SEO rankings",
      },
      after: {
        revenue: "₹10,00,000+ monthly",
        visibility: "Top Google rankings",
      },
      highlights: [
        "+500% increase in organic traffic in just 90 days",
        "Zero to 6-figure monthly sales across website & marketplaces",
        "Ranked on Page 1 for keywords like 'best protein powder in India'",
        "Ad campaigns ROI exceeding 1000%"
      ]
    },
    testimonial: {
      quote: "Working with WebDesino completely changed our business trajectory. From struggling with only ₹3,000 monthly sales to crossing ₹10,00,000+ per month, the results speak for themselves.",
      author: "Founder",
      position: "Founder",
      company: "LuckyNutra"
    },
    keyLearnings: [
      "Strong SEO Drives Discoverability",
      "Paid Ads Accelerate Growth",
      "Marketplaces are Game-Changers",
      "Data & Optimization Win"
    ],
    faqs: [
      {
        question: "How did WebDesino help LuckyNutra scale?",
        answer: "By combining SEO optimization, paid ads, and website improvements, LuckyNutra's online visibility and conversion rates improved dramatically in just 90 days."
      },
      {
        question: "Can WebDesino help supplement brands rank on Google?",
        answer: "Yes. We specialize in supplement SEO — ranking for competitive keywords like 'best protein powder in India' and 'health supplements online'."
      }
    ],
    relatedServices: [
      { name: "SEO Services", url: "/services/digital-marketing/seo-services" },
      { name: "Web Design", url: "/services/website-solutions/web-design" },
      { name: "Digital Marketing", url: "/services/digital-marketing" }
    ]
  },
  {
    slug: "bookbuzzz",
    title: "From Zero to ₹25,00,000+ Monthly Sales with SEO, Ads & Marketplace Growth",
    client: "BookBuzzz",
    industry: "E-commerce (Books)",
    duration: "90 Days",
    heroMetrics: {
      revenue: "0 → ₹25L+ Monthly",
      roi: "+10,000% ROI",
      timeline: "90 Days",
      channels: "Amazon, Flipkart & Website"
    },
    background: "BookBuzzz is an emerging online book seller in India. Despite having a high-quality catalog of over 1.5 lakh books, they faced serious challenges with online visibility, brand awareness, and sales generation. Their website wasn't ranking on Google, and marketplace listings lacked optimization.",
    challenges: {
      title: "The Challenge: Struggling with Visibility, Awareness & Sales",
      description: "BookBuzzz had the inventory and potential, but lacked the right SEO, digital marketing, and technical foundation.",
      painPoints: [
        "Low SEO visibility despite having 1.5 lakh book pages",
        "Not ranking on Google for important book-related keywords",
        "Google Merchant Center (GMC) ineligible products",
        "Website complications & technical SEO issues",
        "Poor brand awareness in India and global markets",
        "Almost zero online sales conversions"
      ]
    },
    solutions: {
      title: "WebDesino's Step-by-Step Approach",
      pillars: [
        {
          name: "Website Redesign & Optimization",
          description: "Improved page speed, mobile responsiveness, reorganized categories, and streamlined checkout flow."
        },
        {
          name: "Local SEO Setup & Technical Fixes",
          description: "Corrected technical SEO issues, built local presence in Delhi NCR, optimized metadata, and resolved GMC issues."
        },
        {
          name: "Google Ads & Meta Ads Campaigns",
          description: "Targeted Google Search and Shopping campaigns, awareness campaigns on social media, and smart bidding strategies."
        },
        {
          name: "Content Marketing & Social Media Growth",
          description: "SEO-optimized blog posts, regular social media campaigns, and strategic backlink outreach."
        }
      ]
    },
    implementation: {
      timeline: "Month 1: Audit & Redesign. Month 2: Ads Launch. Month 3: Local SEO & Scaling.",
      tools: ["Google Analytics", "Google Search Console", "SEMrush & Ahrefs", "Google Ads & Meta Ads", "WordPress & WooCommerce"],
      team: ["SEO Specialists", "Web Design Team", "Digital Marketing Experts", "Content Writers", "Data Analysts"],
      process: ["Audit", "Redesign", "Ads Launch", "Content Marketing", "Scaling"]
    },
    results: {
      before: {
        revenue: "Zero sales",
        visibility: "No ranking",
      },
      after: {
        revenue: "₹25,00,000+ monthly",
        visibility: "Top Google rankings",
      },
      highlights: [
        "+220% increase in organic traffic within 90 days",
        "5X more local leads from Delhi NCR",
        "Ranked #1 for competitive keywords like 'Best Online Book Seller in Delhi'",
        "Digital marketing campaigns delivering ROI above 10,000%"
      ]
    },
    testimonial: {
      quote: "Partnering with WebDesino has been a game-changer for us. From struggling with almost zero online sales to generating over ₹25,00,000+ monthly revenue, their team delivered on every promise.",
      author: "Founder",
      position: "Founder",
      company: "BookBuzzz"
    },
    keyLearnings: [
      "Technical SEO is Critical",
      "Multi-Channel Marketing Works",
      "Local SEO Builds Trust",
      "Data-Driven Decisions"
    ],
    faqs: [
      {
        question: "What makes a successful case study in SEO?",
        answer: "A successful SEO case study clearly explains the client's challenges, solutions applied, and measurable results."
      },
      {
        question: "How long does it take to see web development results?",
        answer: "Results from web development usually appear within weeks, as a faster and optimized website reduces bounce rate and increases conversions."
      }
    ],
    relatedServices: [
      { name: "SEO Services", url: "/services/digital-marketing/seo-services" },
      { name: "Web Design", url: "/services/website-solutions/web-design" },
      { name: "Digital Marketing", url: "/services/digital-marketing" }
    ]
  },
  {
    slug: "meritshot",
    title: "Ranking #1 in India & Globally for Competitive Investment Banking Keywords",
    client: "Meritshot",
    industry: "Education (Investment Banking)",
    duration: "120 Days",
    image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/uploads/2025/10/68ce47b8847dda2fd5b1a6b9_Meritshot-Education-Logo.avif",
    heroMetrics: {
      revenue: "300%+ Organic Leads",
      roi: "Global Reach",
      timeline: "120 Days",
      channels: "SEO & Content"
    },
    background: "Meritshot is a premier investment banking training institute catering to students worldwide. Before WebDesino, their website was not ranking for competitive keywords like 'Investment Banking Course'. Despite high-quality programs, their digital presence was weak and international visibility was minimal.",
    challenges: {
      title: "The Challenge: Competing in a Highly Competitive Global Market",
      description: "Meritshot had expertise but no visibility. They needed a strong SEO partner to build keyword authority and international rankings.",
      painPoints: [
        "Not ranking for competitive keywords like 'Investment Banking Course'",
        "Low brand awareness despite being a top-quality institute",
        "Minimal organic leads and student enrollments from SEO",
        "Lack of international visibility against global competitors",
        "Technical SEO issues slowing down performance"
      ]
    },
    solutions: {
      title: "WebDesino's Step-by-Step Approach",
      pillars: [
        {
          name: "Technical SEO & Website Optimization",
          description: "Fixed underlying technical SEO issues, improved speed, structured site architecture, and implemented schema markup."
        },
        {
          name: "On-Page SEO & Keyword Targeting",
          description: "Keyword research & mapping for global IB-related queries, optimized meta tags, and created high-conversion landing pages."
        },
        {
          name: "Content Marketing & Authority Building",
          description: "Published SEO-optimized blogs, thought leadership content, and strategic backlink outreach."
        },
        {
          name: "International SEO & Global Reach",
          description: "Targeted international keywords, optimized for global audiences, and implemented hreflang tags."
        }
      ]
    },
    implementation: {
      timeline: "Month 1: Audit & Fixes. Month 2: On-page & Content. Month 3: Authority & International. Month 4: Scaling.",
      tools: ["Google Analytics & GA4", "Google Search Console", "Ahrefs & SEMrush", "SurferSEO & Yoast", "WordPress"],
      team: ["SEO Specialists", "Content Writers", "Digital Marketing Experts", "Web Development Team", "Data Analysts"],
      process: ["Audit", "Optimization", "Content", "International SEO", "Scaling"]
    },
    results: {
      before: {
        revenue: "Minimal leads",
        visibility: "No top rankings",
      },
      after: {
        revenue: "Consistent global leads",
        visibility: "Top 3 Global Rankings",
      },
      highlights: [
        "+300% growth in organic traffic within 4 months",
        "Ranked #1 in India for 'Best Institute for Investment Banking'",
        "Global rankings for 'Investment Banking Course' keywords",
        "15+ countries generating student enrollments"
      ]
    },
    testimonial: {
      quote: "Working with WebDesino has completely transformed our online presence. Within just a few months, our institute started ranking #1 in India for 'Investment Banking Course'.",
      author: "Founder",
      position: "Founder",
      company: "Meritshot"
    },
    keyLearnings: [
      "Keyword Authority Wins",
      "Content Builds Trust",
      "Global SEO Strategy Matters",
      "Data-Driven Growth"
    ],
    faqs: [
      {
        question: "What makes a successful SEO case study for institutes?",
        answer: "A strong SEO case study outlines challenges, strategy, execution, and measurable results."
      },
      {
        question: "How long does it take to rank for competitive education keywords?",
        answer: "Ranking for high-competition keywords usually takes 3–6 months with the right SEO strategy."
      }
    ],
    relatedServices: [
      { name: "SEO Services", url: "/services/digital-marketing/seo-services" },
      { name: "Content Marketing", url: "/services/digital-marketing/content-marketing" },
      { name: "Digital Marketing", url: "/services/digital-marketing" }
    ]
  },
  {
    slug: "buykharibauli",
    title: "How BuyKhariBauli Achieved 20x Sales Growth in Just 90 Days",
    client: "BuyKhariBauli",
    industry: "E-commerce (Dry Fruits & Nuts)",
    duration: "90 Days",
    image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/uploads/2025/10/buy-khari-baoli-logo-small.webp",
    heroMetrics: {
      revenue: "₹30,000 → ₹6,00,000+ Monthly",
      roi: "+20x Growth",
      timeline: "90 Days",
      channels: "Direct Website Sales"
    },
    background: "BuyKhariBauli, a premium dry fruits and spices retailer, was struggling with low online visibility despite having quality products. Their website was generating only ₹30,000 per month in sales, far below their potential. The challenge was clear: transform their digital presence to match their product quality and tap into the growing online market for premium dry fruits.",
    challenges: {
      title: "The Challenges BuyKhariBauli Faced",
      description: "When BuyKhariBauli approached us, they were facing several critical issues that were holding back their growth:",
      painPoints: [
        "Low SEO Visibility: The website wasn't ranking for key terms like 'buy dry fruits online' or 'premium nuts online'",
        "Limited Website Sales: Only ₹30,000/month in revenue from their online store",
        "Weak Product Pages: Product descriptions were thin, and images didn't showcase quality effectively",
        "No Brand Awareness: Competitors dominated the market, leaving little room for BuyKhariBauli",
        "Poor User Experience: High bounce rates due to confusing navigation and slow load times"
      ]
    },
    solutions: {
      title: "Our Strategic Approach",
      pillars: [
        {
          name: "Complete Website Optimization",
          description: "We rebuilt their website from the ground up, focusing on speed, mobile responsiveness, and user experience. Every page was optimized for conversions with compelling CTAs and trust signals."
        },
        {
          name: "Advanced SEO & Content Strategy",
          description: "We implemented a comprehensive SEO strategy targeting high-intent keywords in the dry fruits niche. Created in-depth product guides, blog content, and optimized every product page for search engines."
        },
        {
          name: "Enhanced UX & Branding",
          description: "Redesigned the visual identity to reflect premium quality. High-resolution images, clear value propositions, and a seamless checkout process were introduced to build trust."
        },
        {
          name: "Performance Marketing Integration",
          description: "Launched targeted ad campaigns to drive immediate traffic while SEO efforts gained traction. Retargeting strategies were used to convert visitors who didn't buy initially."
        }
      ]
    },
    implementation: {
      timeline: "Month 1: Audit & Redesign. Month 2: SEO & Content. Month 3: Ads & Scaling.",
      tools: ["Google Analytics", "Google Search Console", "SEMrush", "Google Ads", "Shopify"],
      team: ["SEO Lead", "UX Designer", "Content Strategist", "PPC Specialist"],
      process: ["Discovery", "Strategy", "Execution", "Optimization", "Reporting"]
    },
    results: {
      before: {
        revenue: "₹30,000/month",
        visibility: "Low",
      },
      after: {
        revenue: "₹6,00,000/month",
        visibility: "High",
      },
      highlights: [
        "20x increase in monthly revenue within 3 months",
        "Ranked #1 for 'premium dry fruits online' and related keywords",
        "Reduced bounce rate by 45% through UX improvements",
        "Achieved a 4.5% conversion rate, up from 0.8%"
      ]
    },
    testimonial: {
      quote: "WebDesino transformed our business. We went from struggling to make sales to processing hundreds of orders daily. Their expertise in SEO and e-commerce is unmatched.",
      author: "Owner",
      position: "Owner",
      company: "BuyKhariBauli"
    },
    keyLearnings: [
      "User Experience Drives Conversions",
      "SEO is a Long-Term Asset",
      "Quality Content Builds Trust",
      "Data-Driven Decisions are Key"
    ],
    faqs: [
      {
        question: "How long did it take to see results?",
        answer: "We started seeing significant traffic improvements in the first month, with sales spiking in month 2 and stabilizing at a high level by month 3."
      },
      {
        question: "What was the most impactful change?",
        answer: "The website redesign combined with targeted SEO content had the biggest impact on both traffic and conversion rates."
      }
    ],
    relatedServices: [
      { name: "E-commerce SEO", url: "/services/digital-marketing/seo-services" },
      { name: "Web Design", url: "/services/website-solutions/web-design" },
      { name: "PPC Management", url: "/services/digital-marketing/ppc-management" }
    ]
  }
];

// Helper functions
export function getCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug);
}

export function getAllCaseSlugs(): string[] {
  return caseStudies.map(study => study.slug);
}
