import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { footerLocations } from '../lib/locations-data'
import { getClients, getBlogPosts, getFAQs } from '../lib/data'
import { parseLocations } from './locations-data'

const prisma = new PrismaClient()

// --- Data Definitions ---

const projects = [
  {
    slug: "luckynutra",
    title: "Scaling ₹3,000 to ₹10,00,000+ Monthly Sales with SEO & Performance Marketing",
    client: "LuckyNutra",
    industry: "Health & Wellness (Supplements)",
    description: "LuckyNutra is a fast-growing nutritional supplement brand in India, focused on providing high-quality, science-backed products. Despite offering effective supplements, they struggled with low sales, poor online visibility, and almost no brand presence on key digital channels. Their website traffic was negligible, and they weren't ranking for critical keywords.",
    image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/uploads/2025/10/Lucky_Nutra_1000px.png",
    metrics: [
      { label: "Revenue", value: "₹3K → ₹10L+ Monthly" },
      { label: "ROI", value: "+330x Growth" },
      { label: "Timeline", value: "90 Days" },
      { label: "Channels", value: "Amazon, Flipkart & Website" }
    ],
    highlights: [
        "+500% increase in organic traffic in just 90 days",
        "Zero to 6-figure monthly sales across website & marketplaces",
        "Ranked on Page 1 for keywords like 'best protein powder in India'",
        "Ad campaigns ROI exceeding 1000%"
    ],
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
    resultsData: {
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
    description: "BookBuzzz is an emerging online book seller in India. Despite having a high-quality catalog of over 1.5 lakh books, they faced serious challenges with online visibility, brand awareness, and sales generation. Their website wasn't ranking on Google, and marketplace listings lacked optimization.",
    image: "https://api.microlink.io/?url=https://bookbuzzz.com/&screenshot=true&embed=screenshot.url",
    metrics: [
      { label: "Revenue", value: "0 → ₹25L+ Monthly" },
      { label: "ROI", value: "+10,000% ROI" },
      { label: "Timeline", value: "90 Days" },
      { label: "Channels", value: "Amazon, Flipkart & Website" }
    ],
    highlights: [
        "+220% increase in organic traffic within 90 days",
        "5X more local leads from Delhi NCR",
        "Ranked #1 for competitive keywords like 'Best Online Book Seller in Delhi'",
        "Digital marketing campaigns delivering ROI above 10,000%"
    ],
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
    resultsData: {
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
    description: "Meritshot is a premier investment banking training institute catering to students worldwide. Before WebDesino, their website was not ranking for competitive keywords like 'Investment Banking Course'. Despite high-quality programs, their digital presence was weak and international visibility was minimal.",
    image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/uploads/2025/10/68ce47b8847dda2fd5b1a6b9_Meritshot-Education-Logo.avif",
    metrics: [
      { label: "Revenue", value: "300%+ Organic Leads" },
      { label: "ROI", value: "Global Reach" },
      { label: "Timeline", value: "120 Days" },
      { label: "Channels", value: "SEO & Content" }
    ],
    highlights: [
        "+300% growth in organic traffic within 4 months",
        "Ranked #1 in India for 'Best Institute for Investment Banking'",
        "Global rankings for 'Investment Banking Course' keywords",
        "15+ countries generating student enrollments"
    ],
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
      tools: ["Google Analytics", "Google Search Console", "SEMrush & Ahrefs", "WordPress", "Schema Markup"],
      team: ["SEO Specialists", "Content Writers", "Technical SEO Experts", "Data Analysts"],
      process: ["Audit", "Strategy", "Execution", "Optimization", "Scaling"]
    },
    resultsData: {
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
      quote: "WebDesino's SEO expertise is unmatched. They took us from being invisible to ranking #1 globally for our target keywords. The quality of leads has improved significantly.",
      author: "Director",
      position: "Director",
      company: "Meritshot"
    },
    keyLearnings: [
      "Global SEO Requires Strategy",
      "Content Authority Matters",
      "Technical Foundation is Key",
      "Long-term SEO Pays Off"
    ],
    faqs: [
      {
        question: "How does international SEO work?",
        answer: "International SEO involves optimizing your website to target audiences in different countries using hreflang tags, localized content, and currency/language adjustments."
      },
      {
        question: "Can SEO help education businesses?",
        answer: "Absolutely. SEO helps education businesses rank for course-related keywords, attracting students who are actively looking for training programs."
      }
    ],
    relatedServices: [
      { name: "SEO Services", url: "/services/digital-marketing/seo-services" },
      { name: "Content Marketing", url: "/services/digital-marketing/content-marketing" },
      { name: "Web Development", url: "/services/website-solutions/web-development" }
    ]
  },
  {
    slug: "buykharibauli",
    title: "Scaling ₹30,000 to ₹6,00,000+ Monthly Sales with SEO & UX",
    client: "BuyKhariBauli",
    industry: "E-commerce (Dry Fruits & Nuts)",
    description: "BuyKhariBauli, a premium dry fruits and spices retailer, was struggling with low online visibility despite having quality products. Their website was generating only ₹30,000 per month in sales, far below their potential. The challenge was clear: transform their digital presence to match their product quality and tap into the growing online market for premium dry fruits.",
    image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/uploads/2025/10/buy-khari-baoli-logo-small.webp",
    metrics: [
      { label: "Revenue", value: "₹30,000 → ₹6,00,000+ Monthly" },
      { label: "ROI", value: "+20x Growth" },
      { label: "Timeline", value: "90 Days" },
      { label: "Channels", value: "Direct Website Sales" }
    ],
    highlights: [
        "20x increase in monthly revenue within 3 months",
        "Ranked #1 for 'premium dry fruits online' and related keywords",
        "Reduced bounce rate by 45% through UX improvements",
        "Achieved a 4.5% conversion rate, up from 0.8%"
    ],
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
      tools: ["Google Analytics", "Google Search Console", "Shopify/WooCommerce", "Google Ads", "Hotjar"],
      team: ["UX Designers", "SEO Specialists", "Developers", "PPC Experts"],
      process: ["Audit", "Redesign", "Optimization", "Marketing", "Scaling"]
    },
    resultsData: {
      before: {
        revenue: "₹30,000/month",
        visibility: "Low visibility",
      },
      after: {
        revenue: "₹6,00,000/month",
        visibility: "High visibility",
      },
      highlights: [
        "20x increase in monthly revenue within 3 months",
        "Ranked #1 for 'premium dry fruits online' and related keywords",
        "Reduced bounce rate by 45% through UX improvements",
        "Achieved a 4.5% conversion rate, up from 0.8%"
      ]
    },
    testimonial: {
      quote: "We never imagined our online sales could grow this fast. WebDesino didn't just build a website; they built a business channel for us. Highly recommended!",
      author: "Owner",
      position: "Owner",
      company: "BuyKhariBauli"
    },
    keyLearnings: [
      "UX Drives Conversions",
      "SEO is a Long-term Asset",
      "Quality Content Matters",
      "Data-Driven Marketing Wins"
    ],
    faqs: [
      {
        question: "How important is UX for e-commerce?",
        answer: "Crucial. A good user experience reduces friction, builds trust, and directly impacts conversion rates and sales."
      },
      {
        question: "Can SEO help niche e-commerce brands?",
        answer: "Yes. Niche brands can dominate specific keywords with less competition, driving highly targeted and profitable traffic."
      }
    ],
    relatedServices: [
      { name: "E-commerce Development", url: "/services/website-solutions/ecommerce-development" },
      { name: "SEO Services", url: "/services/digital-marketing/seo-services" },
      { name: "Web Design", url: "/services/website-solutions/web-design" }
    ]
  }
];

const testimonials = [
  {
    name: "Siddhi Agarwal",
    text: "WebDesino developed our website and app with a clean, SEO-friendly design. We saw instant growth in web development in Delhi searches.",
    location: "Delhi",
  },
  {
    name: "Mansi Agarwal",
    text: "Their local SEO services in Uttam Nagar boosted our calls and lead generation by 3x. Very professional and reliable team.",
    location: "Uttam Nagar, Delhi",
  },
  {
    name: "Tanvi Mehta",
    text: "They fixed our technical SEO issues and rebuilt our site. Now we rank higher for SEO services in Karol Bagh and get more quality leads.",
    location: "Karol Bagh, Delhi",
  },
  {
    name: "Hardisha Kaur",
    text: "Our eCommerce store is performing 5x better after WebDesino's digital marketing in Delhi NCR. Excellent ROI and reporting.",
    company: "E-commerce Business",
  },
  {
    name: "Rajesh Sharma",
    text: "We hired them for website development in Krishan Vihar and saw our monthly sales jump from 30k to over 6 lakhs. Amazing!",
    location: "Krishan Vihar, Delhi",
  },
  {
    name: "Priya Malhotra",
    text: "Our coaching institute's admissions doubled after WebDesino's education SEO strategies in Delhi. Highly recommended.",
    company: "Coaching Institute",
  },
  {
    name: "Rakesh Jain",
    text: "We partnered with them for small business SEO in Delhi NCR. Affordable packages and real results — exactly what we needed.",
    location: "Delhi NCR",
  },
  {
    name: "Neha Kapoor",
    text: "WebDesino is the best SEO & digital marketing company in Kamla Nagar. Our local business now gets daily leads from Google.",
    location: "Kamla Nagar, Delhi",
  },
];

const servicesData = [
  {
    title: "Website Solutions",
    slug: "website-solutions",
    description: "Comprehensive web solutions tailored to your business needs, from custom development to maintenance.",
    icon: "Layout",
    subtypes: [
      {
        title: "Web Development",
        slug: "web-development",
        description: "Custom website development using the latest technologies like Next.js, React, and Node.js. We build scalable, secure, and high-performance websites.",
        features: ["Custom Frontend & Backend", "API Integration", "Database Design", "Performance Optimization"],
        benefits: ["Scalable Architecture", "High Security", "Fast Loading Speeds", "SEO Friendly Structure"]
      },
      {
        title: "Web Design",
        slug: "web-design",
        description: "Stunning, user-centric web designs that captivate your audience and reflect your brand identity.",
        features: ["Responsive Design", "User Interface (UI) Design", "User Experience (UX) Design", "Interactive Elements"],
        benefits: ["Improved User Engagement", "Lower Bounce Rates", "Stronger Brand Image", "Mobile Compatibility"]
      },
      {
        title: "E-commerce Development",
        slug: "ecommerce-development",
        description: "Robust e-commerce platforms built on Shopify, WooCommerce, or custom solutions to drive sales.",
        features: ["Shopping Cart Integration", "Payment Gateway Setup", "Product Management", "Order Tracking"],
        benefits: ["Increased Sales", "Streamlined Operations", "Secure Transactions", "Better Customer Experience"]
      },
      {
        title: "Website Maintenance",
        slug: "website-maintenance",
        description: "Ongoing support and maintenance to keep your website secure, up-to-date, and running smoothly.",
        features: ["Regular Updates", "Security Patches", "Backup Management", "Performance Monitoring"],
        benefits: ["Peace of Mind", "Reduced Downtime", "Enhanced Security", "Consistent Performance"]
      },
      {
        title: "Web Optimization",
        slug: "web-optimization",
        description: "Speed up your website and improve performance for better user experience and SEO rankings.",
        features: ["Speed Optimization", "Code Minification", "Image Compression", "Caching Setup"],
        benefits: ["Faster Load Times", "Better SEO Rankings", "Lower Bounce Rates", "Improved UX"]
      },
      {
        title: "Website Security",
        slug: "website-security",
        description: "Protect your website from threats, malware, and hackers with our comprehensive security solutions.",
        features: ["Malware Scanning", "Firewall Setup", "SSL Installation", "DDoS Protection"],
        benefits: ["Data Protection", "Customer Trust", "Business Continuity", "Compliance"]
      }
    ]
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Data-driven digital marketing strategies to boost your online presence and drive conversions.",
    icon: "Megaphone",
    subtypes: [
      {
        title: "Social Media Marketing",
        slug: "social-media-marketing",
        description: "Engage your audience on platforms like Instagram, Facebook, LinkedIn, and Twitter with targeted campaigns.",
        features: ["Content Strategy", "Community Management", "Paid Social Ads", "Analytics & Reporting"],
        benefits: ["Increased Brand Awareness", "Higher Engagement", "Targeted Lead Generation", "Customer Loyalty"]
      },
      {
        title: "PPC Advertising",
        slug: "ppc-advertising",
        description: "Maximize your ROI with targeted Pay-Per-Click advertising campaigns on Google and social media.",
        features: ["Keyword Research", "Ad Copywriting", "Bid Management", "Conversion Tracking"],
        benefits: ["Immediate Traffic", "Measurable ROI", "Precise Targeting", "Budget Control"]
      },
      {
        title: "Content Marketing",
        slug: "content-marketing",
        description: "Create and distribute valuable content to attract and retain a clearly defined audience.",
        features: ["Blog Writing", "Infographics", "Video Content", "E-books & Whitepapers"],
        benefits: ["Thought Leadership", "Improved SEO", "Customer Education", "Long-term Traffic"]
      },
      {
        title: "Influencer Marketing",
        slug: "influencer-marketing",
        description: "Collaborate with key influencers in your industry to reach a wider and more engaged audience.",
        features: ["Influencer Outreach", "Campaign Management", "Contract Negotiation", "Performance Tracking"],
        benefits: ["Brand Credibility", "Targeted Reach", "Authentic Content", "High ROI"]
      },
      {
        title: "Reputation Management",
        slug: "reputation-management",
        description: "Monitor and improve your online reputation to build trust and credibility with your audience.",
        features: ["Review Monitoring", "Crisis Management", "Brand Sentiment Analysis", "Positive Review Generation"],
        benefits: ["Better Brand Image", "Increased Trust", "Customer Retention", "Crisis Mitigation"]
      },
      {
        title: "Marketing Automation",
        slug: "marketing-automation",
        description: "Streamline your marketing efforts with automated workflows that nurture leads and drive sales.",
        features: ["Email Automation", "Lead Scoring", "CRM Integration", "Workflow Design"],
        benefits: ["Efficiency", "Personalization", "Scalability", "Better Lead Nurturing"]
      }
    ]
  },
  {
    title: "SEO Services",
    slug: "seo-services",
    description: "Improve your search engine rankings and drive organic traffic with our expert SEO services.",
    icon: "Search",
    subtypes: [
      {
        title: "Local SEO",
        slug: "local-seo",
        description: "Dominate local search results and attract customers in your specific geographic area.",
        features: ["Google Business Profile Optimization", "Local Citations", "Reviews Management", "Local Keyword Targeting"],
        benefits: ["Increased Foot Traffic", "Higher Local Visibility", "Trust & Credibility", "Better Conversion Rates"]
      },
      {
        title: "Technical SEO",
        slug: "technical-seo",
        description: "Optimize the technical aspects of your website to ensure search engines can crawl and index it effectively.",
        features: ["Site Speed Optimization", "XML Sitemap", "Robots.txt", "Schema Markup"],
        benefits: ["Better Indexing", "Improved User Experience", "Higher Rankings", "Mobile Friendliness"]
      },
      {
        title: "On-Page SEO",
        slug: "on-page-seo",
        description: "Optimize individual web pages to rank higher and earn more relevant traffic in search engines.",
        features: ["Keyword Optimization", "Meta Tags", "Content Optimization", "Internal Linking"],
        benefits: ["Higher Relevance", "Improved CTR", "Better User Experience", "Increased Organic Traffic"]
      },
      {
        title: "Off-Page SEO",
        slug: "off-page-seo",
        description: "Build authority and trust for your website through strategic link building and brand mentions.",
        features: ["Link Building", "Guest Posting", "Social Signals", "Brand Mentions"],
        benefits: ["Domain Authority", "Referral Traffic", "Brand Visibility", "Long-term Rankings"]
      },
      {
        title: "Keyword Research",
        slug: "keyword-research",
        description: "Identify high-value keywords that your target audience is searching for to drive relevant traffic.",
        features: ["Competitor Analysis", "Search Volume Analysis", "Long-tail Keywords", "Intent Analysis"],
        benefits: ["Targeted Traffic", "Content Strategy", "Market Insight", "Higher ROI"]
      },
      {
        title: "Outreach & Link Building",
        slug: "link-building",
        description: "Acquire high-quality backlinks from authoritative websites to boost your domain authority.",
        features: ["Guest Blogging", "Broken Link Building", "Resource Page Outreach", "PR Campaigns"],
        benefits: ["Higher Rankings", "Domain Authority", "Referral Traffic", "Brand Awareness"]
      },
      {
        title: "SEO Audits",
        slug: "seo-audits",
        description: "Comprehensive analysis of your website's SEO health to identify opportunities for improvement.",
        features: ["Technical Audit", "Content Audit", "Backlink Audit", "Competitor Audit"],
        benefits: ["Actionable Insights", "Strategy Development", "Performance Baseline", "Error Identification"]
      },
      {
        title: "GPT Search Optimization",
        slug: "gpt-search-optimization",
        description: "Optimize your content for AI-driven search engines and chatbots like ChatGPT and Bing Chat.",
        features: ["Entity Optimization", "Conversational Keywords", "Structured Data", "Answer Engine Optimization"],
        benefits: ["Future-proofing", "Voice Search Visibility", "AI Visibility", "Thought Leadership"]
      }
    ]
  },
  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    description: "Creative graphic design services to visually communicate your brand's message.",
    icon: "PenTool",
    subtypes: [
      {
        title: "Logo Design",
        slug: "logo-design",
        description: "Create a unique and memorable logo that represents your brand's identity and values.",
        features: ["Concept Development", "Vector Formats", "Brand Guidelines", "Multiple Revisions"],
        benefits: ["Brand Recognition", "Professional Image", "Versatility", "Timeless Design"]
      },
      {
        title: "Brand Identity",
        slug: "brand-identity",
        description: "Develop a cohesive brand identity including color palettes, typography, and visual assets.",
        features: ["Visual Style Guide", "Stationery Design", "Social Media Assets", "Marketing Materials"],
        benefits: ["Consistent Branding", "Customer Trust", "Differentiation", "Emotional Connection"]
      },
      {
        title: "UI/UX Design",
        slug: "ui-ux-design",
        description: "Design intuitive and aesthetically pleasing user interfaces for websites and mobile apps.",
        features: ["Wireframing", "Prototyping", "User Research", "Usability Testing"],
        benefits: ["Higher Conversion Rates", "Customer Satisfaction", "Reduced Development Costs", "Competitive Advantage"]
      }
    ]
  },
  {
    title: "Content Writing",
    slug: "content-writing",
    description: "High-quality content writing services to engage your audience and boost your SEO.",
    icon: "Type",
    subtypes: [
      {
        title: "Website Content",
        slug: "website-content",
        description: "Compelling copy for your website pages that communicates your value proposition effectively.",
        features: ["Landing Page Copy", "About Us Pages", "Service Descriptions", "Call-to-Actions"],
        benefits: ["Clear Communication", "Higher Conversions", "SEO Benefits", "Professional Tone"]
      },
      {
        title: "SEO Blog Writing",
        slug: "seo-blog-writing",
        description: "Regular blog posts optimized for search engines to drive traffic and establish authority.",
        features: ["Keyword Research", "Topic Ideation", "Engaging Writing", "Internal Linking"],
        benefits: ["Consistent Traffic", "Industry Authority", "Social Sharing", "Lead Generation"]
      },
      {
        title: "Social Media Content",
        slug: "social-media-content",
        description: "Engaging posts and captions tailored for your social media platforms to drive interaction.",
        features: ["Platform-specific Content", "Visual Design", "Hashtag Strategy", "Calendar Planning"],
        benefits: ["Consistent Presence", "Higher Engagement", "Brand Voice", "Community Growth"]
      },
      {
        title: "Email Newsletters",
        slug: "email-newsletters",
        description: "Informative and persuasive email newsletters to keep your audience engaged and informed.",
        features: ["Template Design", "Copywriting", "A/B Testing", "List Segmentation"],
        benefits: ["Customer Retention", "Direct Communication", "Sales Generation", "Brand Loyalty"]
      },
      {
        title: "Case Studies",
        slug: "case-studies-writing",
        description: "Detailed success stories that showcase your expertise and the results you deliver for clients.",
        features: ["Interviewing", "Data Analysis", "Storytelling", "Formatting"],
        benefits: ["Social Proof", "Trust Building", "Sales Enablement", "Lead Conversion"]
      },
      {
        title: "Product Descriptions",
        slug: "product-descriptions",
        description: "Persuasive product descriptions that highlight features and benefits to drive sales.",
        features: ["SEO Optimization", "Benefit-focused Copy", "Technical Specs", "Brand Tone"],
        benefits: ["Higher Conversion Rates", "Lower Returns", "Better SEO", "Informed Customers"]
      },
      {
        title: "Editing & Proofreading",
        slug: "editing-proofreading",
        description: "Professional editing and proofreading to ensure your content is error-free and polished.",
        features: ["Grammar Check", "Style Consistency", "Clarity Improvement", "Fact Checking"],
        benefits: ["Professionalism", "Credibility", "Clarity", "Error-free Content"]
      }
    ]
  },
];

const teamMembers = [
  { name: "Rohit Tiwari", role: "Founder & CEO", image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/rohittiwaribanner.png", order: 1 },
  { name: "Vishnu Sharma", role: "Co-Founder", image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/vishnusharma.png", order: 2 },
];

const certifications = [
  { name: "Google", image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/google.jpg" },
  { name: "WordPress", image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/wordpress.jpg" },
  { name: "Shopify", image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/shopify.jpg" },
  { name: "SEMRush", image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/semrush.png" },
  { name: "DesignRush", image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/designrush.jpg" },
];

const aboutPageContent = {
  hero: {
    title: "About Webdesino",
    subtitle: "Building Your Online Presence. Find a team of Web Developers you can rely on. Every day, we build trust through communication, transparency, and results.",
    image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/rohittiwaribanner.png"
  },
  stats: [
    { icon: "Users", value: "100+", label: "Happy Clients" },
    { icon: "Target", value: "100+", label: "Projects Completed" },
    { icon: "TrendingUp", value: "₹6.3 Cr+", label: "Sales Generated" },
    { icon: "Award", value: "10+", label: "Certifications" },
  ],
  features: [
    { number: "01", title: "Proven Results", description: "Trusted by businesses across Delhi NCR with measurable growth in traffic, leads, and sales." },
    { number: "02", title: "Timely Delivery", description: "We respect deadlines and deliver fully tested, functional websites on time, every time." },
    { number: "03", title: "Award Winning", description: "Recognized for professional work and high-quality digital solutions that set industry benchmarks." },
    { number: "04", title: "Highest Rankings", description: "Our SEO-first approach ensures your business ranks on top of Google searches in Delhi NCR." },
    { number: "05", title: "SEO-Optimized", description: "Every site we build is mobile-friendly, fast-loading, and built to perform on Google search." },
    { number: "06", title: "24/7 Support", description: "Our dedicated team is available round the clock for maintenance, updates, and assistance." },
  ],
  serviceAreas: [
    "Uttam Nagar", "Kamla Nagar", "Krishan Vihar", "Karol Bagh", 
    "Hauz Khas", "DLF Camellias", "Dwarka", "Janakpuri", 
    "Rajouri Garden", "Govindpuri", "Kalkaji", "Civil Lines"
  ]
};

// --- Main Seed Function ---

async function main() {
  const password = await hash('admin123', 12)
  const admin = await prisma.admin.upsert({
    where: { email: 'webdesino.com@gmail.com' },
    update: {
      password: password,
    },
    create: {
      email: 'webdesino.com@gmail.com',
      name: 'Admin',
      password,
    },
  })
  console.log({ admin })

  console.log('Seeding locations... SKIPPED')
  /*
  for (const loc of footerLocations) {
    const cleanHref = loc.href.endsWith('/') ? loc.href.slice(0, -1) : loc.href
    const urlParts = cleanHref.split('/')
    const slug = urlParts[urlParts.length - 1]

    if (!slug) {
        console.warn(`Skipping invalid href: ${loc.href}`)
        continue
    }

    let title = `Best Web Development Company in ${loc.name}`;
    let locationName = loc.name;

    const keywords = ["Agency", "Services", "Company", "Developer", "Consultant", "Management", "Designer", "Campaign"];
    if (keywords.some(k => loc.name.includes(k))) {
        title = loc.name;
        if (loc.name.includes(" in ")) {
            locationName = loc.name.split(" in ").pop()!;
        } else if (loc.name.includes(" near ")) {
            locationName = loc.name.split(" near ").pop()!;
        } else if (loc.name.includes(" For ")) {
             locationName = loc.name.split(" For ")[0].split(" in ").pop() || "Delhi";
        } else {
             if (loc.name.includes("Delhi")) locationName = "Delhi";
             else if (loc.name.includes("Noida")) locationName = "Noida";
             else if (loc.name.includes("Gurgaon")) locationName = "Gurgaon";
        }
    }

    await prisma.locationPage.upsert({
      where: { slug },
      update: {
        location: locationName,
        title: title,
      },
      create: {
        slug,
        location: locationName,
        title: title,
        description: `Looking for ${title}? We provide top-notch web design and development services in ${locationName}. Contact us today!`,
      },
    })
  }
  console.log('Locations seeded.')
  */

  // Seed Projects
  console.log('Seeding projects...')
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    })
  }

  // Seed Testimonials
  console.log('Seeding testimonials...')
  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
        where: { name: testimonial.name, text: testimonial.text }
    });
    
    if (!existing) {
        await prisma.testimonial.create({
            data: testimonial
        });
    }
  }

  // Seed Services
  console.log('Seeding services...')
  for (const category of servicesData) {
    const { subtypes, ...categoryData } = category
    
    const createdCategory = await prisma.serviceCategory.upsert({
      where: { slug: categoryData.slug },
      update: categoryData,
      create: categoryData,
    })

    if (subtypes) {
      for (const service of subtypes) {
        await prisma.serviceSubtype.upsert({
          where: { slug: service.slug },
          update: {
            ...service,
            categoryId: createdCategory.id
          },
          create: {
            ...service,
            categoryId: createdCategory.id
          },
        })
      }
    }
  }

  // Seed Team Members
  console.log('Seeding team members...')
  for (const member of teamMembers) {
      const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
      if (!existing) {
          await prisma.teamMember.create({ data: member });
      } else {
          await prisma.teamMember.update({ where: { id: existing.id }, data: member });
      }
  }

  // Seed Certifications
  console.log('Seeding certifications...')
  for (const cert of certifications) {
      const existing = await prisma.certification.findFirst({ where: { name: cert.name } });
      if (!existing) {
          await prisma.certification.create({ data: cert });
      }
  }

  // Seed About Page
  console.log('Seeding About page...')
  await prisma.page.upsert({
      where: { slug: 'about' },
      update: {
          title: "About Us - Web Development Company in Delhi NCR | Webdesino",
          description: "Learn about Webdesino - A leading web development and digital marketing company in Delhi NCR.",
          content: aboutPageContent
      },
      create: {
          slug: 'about',
          title: "About Us - Web Development Company in Delhi NCR | Webdesino",
          description: "Learn about Webdesino - A leading web development and digital marketing company in Delhi NCR.",
          content: aboutPageContent
      }
  });

  // Seed Legal Pages
  console.log('Seeding Legal pages...')
  const legalPages = [
    {
      slug: "terms-conditions",
      title: "Terms & Conditions",
      description: "Terms and Conditions for using WebDesino services and website.",
      content: {
        hero: { subtitle: "Last Updated: 10/07/2025" },
        sections: [
          {
            title: "",
            content: "<p>Welcome to WebDesino.com. By accessing our website or using our services, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully. If you do not agree to these terms, you should not use our site or services.</p>"
          },
          {
            title: "1. Definitions",
            content: "<ul><li><strong>“We”, “Us”, “Our”</strong> refers to WebDesino.com.</li><li><strong>“Client”, “You”, “Your”</strong> refers to the user or purchaser of our services.</li><li><strong>“Services”</strong> refers to website development, digital marketing, branding, and any related services offered by us.</li></ul>"
          },
          {
            title: "2. Use of Website",
            content: "<ul><li>You may browse our website for personal or business use, but you may not reproduce, distribute, or modify any content without prior written permission.</li><li>You agree not to use our website for any unlawful purpose or in any way that may harm WebDesino.com or its users.</li></ul>"
          },
          {
            title: "3. Scope of Services",
            content: "<p>WebDesino.com offers digital services including but not limited to:</p><ul><li>Website design and development</li><li>E-commerce setup</li><li>SEO and digital marketing</li><li>Branding and content creation</li><li>Consulting and strategy</li></ul><p>Each service may be governed by separate contracts or proposals.</p>"
          },
          {
            title: "4. Payments and Invoicing",
            content: "<ul><li>All services require an advance payment before work begins. This advance is non-refundable, as outlined in our Return & Refund Policy.</li><li>Projects may be billed in full or in milestones depending on the scope and timeline.</li><li>Payment is due within 7 days of invoicing unless otherwise agreed.</li></ul><p>Failure to make payments on time may result in project suspension or termination.</p>"
          },
          {
            title: "5. Intellectual Property",
            content: "<ul><li>Upon full payment, the client will own the final deliverables, such as website files, graphics, and content—unless otherwise agreed in writing.</li><li>WebDesino.com retains the right to display completed projects in portfolios or for marketing purposes, unless a confidentiality agreement has been signed.</li></ul>"
          },
          {
            title: "6. Client Responsibilities",
            content: "<ul><li>You agree to provide all necessary content, feedback, and access credentials in a timely manner.</li><li>Delays in communication or approvals from your side may impact the timeline and are not the responsibility of WebDesino.com.</li></ul>"
          },
          {
            title: "7. Revisions and Approvals",
            content: "<ul><li>Projects include a limited number of revisions as outlined in the proposal. Additional revisions may incur extra charges.</li><li>Once a deliverable is approved (explicitly or after 7 days without response), it is considered final.</li></ul>"
          },
          {
            title: "8. Cancellation & Termination",
            content: "<ul><li>Either party may terminate the agreement with written notice.</li><li>If a project is canceled by the client, any work completed will be billed and advance payments will not be refunded.</li><li>We reserve the right to refuse or terminate service to any client for inappropriate conduct, breach of terms, or unethical project demands.</li></ul>"
          },
          {
            title: "9. Limitation of Liability",
            content: "<p>WebDesino.com is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our services or website. This includes (but is not limited to) data loss, business interruption, or third-party actions.</p>"
          },
          {
            title: "10. Confidentiality",
            content: "<p>Any information you share with us that is marked confidential will be treated as such. We do not sell, share, or disclose your confidential business information to unauthorized parties.</p>"
          },
          {
            title: "11. Privacy Policy",
            content: "<p>Please refer to our Privacy Policy for information on how we collect, use, and protect your personal data.</p>"
          },
          {
            title: "12. Modifications to Terms",
            content: "<p>We reserve the right to change or update these Terms and Conditions at any time. Changes will be posted on this page with a revised effective date. Continued use of the site or services after changes constitutes acceptance of the new terms.</p>"
          },
          {
            title: "13. Governing Law",
            content: "<p>These Terms and Conditions are governed by the laws of India. Any disputes will be subject to the jurisdiction of the courts in New Delhi.</p>"
          },
          {
            title: "14. Contact Information",
            content: "<p>For any questions or concerns related to these Terms, please contact us:</p><p>Email: <a href=\"mailto:support@webdesino.com\">support@webdesino.com</a><br />Website: <a href=\"https://webdesino.com\">https://webdesino.com</a></p>"
          }
        ]
      }
    },
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      description: "Privacy Policy for WebDesino. Learn how we collect, use, and protect your personal information.",
      content: {
        hero: { subtitle: "Last Updated: 10/07/2025" },
        sections: [
          {
            title: "",
            content: "<p>At WebDesino.com, your privacy is very important to us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. Please read this policy carefully to understand how we handle your data.</p>"
          },
          {
            title: "1. Information We Collect",
            content: "<p>We collect personal and non-personal information through the website and during the course of providing our services.</p><h3>A. Personal Information (provided by you):</h3><ul><li>Full name</li><li>Email address</li><li>Phone number</li><li>Business name and details</li><li>Project information and preferences</li><li>Billing and payment information (via secure third-party processors)</li><li>Login credentials (for platform integrations if required)</li></ul><h3>B. Non-Personal Information (automatically collected):</h3><ul><li>IP address</li><li>Browser type and device information</li><li>Operating system</li><li>Pages visited, duration, and interactions</li><li>Referring URL</li><li>Cookies and tracking data</li></ul>"
          },
          {
            title: "2. How We Use Your Information",
            content: "<p>We use the information we collect for the following purposes:</p><ul><li>To respond to inquiries and provide requested services</li><li>To process payments and invoices</li><li>To personalize your experience on our website</li><li>To communicate about updates, promotions, or offers</li><li>To improve website functionality and user experience</li><li>To fulfill legal and regulatory obligations</li><li>For internal analytics and performance tracking</li></ul>"
          },
          {
            title: "3. Cookies & Tracking Technologies",
            content: "<p>WebDesino.com uses cookies, pixels, and similar technologies to:</p><ul><li>Remember your preferences</li><li>Analyze user behavior</li><li>Track marketing performance</li><li>Improve overall site performance</li></ul><p>You may choose to disable cookies through your browser settings, but note that certain features may not function correctly as a result.</p>"
          },
          {
            title: "4. Third-Party Sharing & Integrations",
            content: "<p>We do not sell, trade, or rent your personal information. However, we may share your data with trusted third parties, including:</p><ul><li>Payment gateways (e.g., Razorpay, Stripe, PayPal)</li><li>CRM and email platforms (e.g., Mailchimp, Zoho)</li><li>Cloud hosting and analytics services (e.g., Google Analytics, Cloudflare)</li><li>Contractors and vendors working on your project (under confidentiality agreements)</li></ul><p>We ensure all third-party providers adhere to secure data practices.</p>"
          },
          {
            title: "5. Data Security",
            content: "<p>We take reasonable technical and organizational precautions to prevent the loss, misuse, or alteration of your personal data, including:</p><ul><li>SSL encryption on our website</li><li>Secure server environments</li><li>Role-based access control for internal systems</li><li>Regular updates and monitoring</li></ul><p>However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>"
          },
          {
            title: "6. Your Rights",
            content: "<p>Depending on your location (e.g., under GDPR or CCPA), you may have the following rights:</p><ul><li>Right to access, correct, or delete your personal information</li><li>Right to withdraw consent for marketing communications</li><li>Right to restrict or object to data processing</li><li>Right to request data portability</li></ul><p>To exercise any of these rights, email us at support@webdesino.com.</p>"
          },
          {
            title: "7. Data Retention",
            content: "<p>We retain personal information only for as long as necessary:</p><ul><li>To fulfill the purposes outlined above</li><li>To comply with legal obligations</li><li>To resolve disputes and enforce agreements</li></ul><p>Inactive or completed project data may be archived for future reference unless deletion is requested.</p>"
          },
          {
            title: "8. Children’s Privacy",
            content: "<p>WebDesino.com does not knowingly collect or solicit personal information from children under the age of 13. If we discover such information has been collected without parental consent, it will be deleted immediately.</p>"
          },
          {
            title: "9. Changes to This Policy",
            content: "<p>We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Updates will be posted on this page with a revised “Effective Date.”</p>"
          },
          {
            title: "10. Contact Us",
            content: "<p>For any questions or concerns about this Privacy Policy or how your data is handled, please contact:</p><p><strong>WebDesino.com</strong><br />Email: support@webdesino.com<br />Website: https://webdesino.com</p>"
          }
        ]
      }
    },
    {
      slug: "refund-policy",
      title: "Return & Refund Policy",
      description: "Return and Refund Policy for WebDesino services.",
      content: {
        html: "<p>At WebDesino, we specialize in providing high-quality Website Development, Digital Marketing, SEO Services, App Development, and IT solutions tailored to businesses of all sizes. Our focus is on delivering measurable results, building strong digital foundations, and helping our clients grow their online presence.</p><p>Because our services involve professional expertise, strategic planning, and immediate allocation of resources, we follow a strict <strong>No Refund Policy</strong>. This document outlines our approach to refunds and ensures full transparency for our clients.</p><h2>Why Refunds Are Not Possible for Service-Based Businesses</h2><p>Unlike product-based businesses, service-based businesses like WebDesino do not operate with tangible goods that can be returned or exchanged. Once we begin a project:</p><ul><li>Time and resources are allocated immediately to research, planning, design, and execution.</li><li>Highly skilled professionals are assigned to your project, and their time cannot be reversed or refunded.</li><li>Our work, such as strategy planning, SEO optimization, or digital ad campaigns, starts delivering value right from day one.</li></ul><p>Therefore, refunds are not applicable once the project has started.</p><h2>Our Refund Policy in Detail</h2><p>To maintain clarity and trust, below are the key points of our refund policy:</p><h3>Non-Refundable Payments</h3><ul><li>All payments made towards Website Development, Digital Marketing, SEO, or App Development services are final and non-refundable.</li><li>This applies to consultation fees, advance deposits, milestone-based payments, and full project fees.</li></ul><h3>Project Cancellation</h3><ul><li>If a client chooses to cancel a project midway, no refund will be provided for the work already completed.</li><li>However, depending on the stage of the project, we may allow the client to use the deliverables created up to the cancellation date.</li></ul><h3>Digital Marketing Campaigns</h3><ul><li>Fees paid for Google Ads, Meta Ads, or other ad campaigns are directly spent with third-party platforms. These are non-refundable as WebDesino does not control external ad budgets.</li></ul><h3>SEO and Ranking Services</h3><ul><li>SEO is a time-intensive process that requires consistent effort and cannot guarantee exact positions on search engines (due to ever-changing algorithms). Payments for SEO services are therefore non-refundable.</li></ul><h3>App & Website Development</h3><ul><li>Payments made for design, coding, integrations, or testing cannot be refunded once work has started, as technical hours and expertise are already invested.</li></ul><h2>Commitment to Client Satisfaction</h2><p>While we do not provide refunds, we prioritize client satisfaction in every project. Our commitment includes:</p><ul><li><strong>Transparent Communication</strong> – Clients are kept updated at every stage of the project.</li><li><strong>Agreed Scope of Work</strong> – We strictly follow the service agreement to ensure clarity of deliverables.</li><li><strong>Revisions and Adjustments</strong> – Reasonable revisions are provided as per project scope to ensure the final outcome meets expectations.</li><li><strong>Long-Term Support</strong> – We provide guidance and support even after project completion, depending on the service package selected.</li></ul><h2>Protecting Your Investment</h2><p>At WebDesino, we understand that every business invests valuable money and trust when choosing a digital partner. Our No Refund Policy is designed not to limit you, but to ensure we can deliver dedicated services, focused effort, and professional results without disruption.</p><p>We strongly recommend that clients review project details, service scope, and timelines carefully before making payment. Our team is always available for consultation to clarify any doubts before the start of a project.</p><h2>Contact Us</h2><p>If you have any questions regarding this Refund Policy or want to discuss your project before getting started, please reach out to us:</p><p>Email: <a href=\"mailto:support@webdesino.com\">support@webdesino.com</a><br />Phone: <a href=\"tel:+919310851557\">+91 93108 51557</a><br />Website: <a href=\"https://webdesino.com\">https://webdesino.com</a></p>"
      }
    }
  ];

  for (const page of legalPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        description: page.description,
        content: page.content
      },
      create: {
        slug: page.slug,
        title: page.title,
        description: page.description,
        content: page.content
      }
    });
  }

  // Seed Founder Page
  console.log('Seeding Founder page...')
  const founderPageContent = {
    hero: {
      title: "Hi, I'm Rohit Tiwari",
      description: "My name is Rohit Tiwari, and I am a professional Web Developer and Digital Marketing Specialist dedicated to building high-performing online identities for businesses, startups, and brands. Over the years, I have gained extensive experience in WordPress, Shopify, custom-coded web development, SEO, social media marketing, Google Ads, Meta Ads, and brand communication. My focus is to combine technical precision with strategic marketing to create websites and digital assets that deliver measurable business growth.",
      image: "https://vaeoynqqeaoyrgubusvk.supabase.co/storage/v1/object/public/images/rohittiwari2.jpeg",
      stats: [
        { label: "Projects Delivered", value: "150+" },
        { label: "Years Experience", value: "5+" }
      ],
      socials: {
        linkedin: "https://www.linkedin.com/in/irohittiwari/",
        contact: "/contact"
      }
    },
    professionalApproach: {
      title: "My Professional Approach",
      description: "I believe that a website is not only a digital representation of a business, but also a powerful tool to generate leads, improve sales, and build trust. I prioritise:",
      points: [
        "Return on investment and business results",
        "Clean and modern design with strong functionality",
        "Transparent communication and a client-first approach",
        "On-time delivery with uncompromised quality",
        "Long-term support for continuous growth"
      ]
    },
    expertise: {
      title: "My Expertise",
      items: [
        {
          title: "Full-Stack Development",
          desc: "Expertise in Next.js, React, Node.js, and modern web technologies to build scalable applications.",
          icon: "Code"
        },
        {
          title: "SEO Strategy",
          desc: "Deep understanding of search engine algorithms to help businesses rank #1 on Google.",
          icon: "Target"
        },
        {
          title: "Digital Growth",
          desc: "Holistic approach to digital marketing, focusing on conversion rate optimization and ROI.",
          icon: "Rocket"
        }
      ]
    },
    achievements: {
      title: "Achievements and Experience",
      points: [
        "Successfully delivered more than 150 website development projects across various industries",
        "Worked with clients across India and international markets",
        "Trusted by startups, SMEs, agencies, and high-net-worth professionals",
        "Expertise in complete digital growth solutions, from branding to marketing execution"
      ]
    },
    vision: {
      title: "Vision",
      description: "My objective is to help businesses build a strong digital presence that enhances credibility, supports long-term scalability, and creates real business opportunities. I believe in partnerships, not transactions, and I strive to add value beyond just development and marketing services."
    },
    cta: {
      title: "Let's Build Something Amazing Together",
      description: "Whether you have a specific project in mind or just want to discuss your digital strategy, I'm always open to a conversation.",
      buttons: [
        { label: "Start a Project", link: "/contact", primary: true },
        { label: "Follow on LinkedIn", link: "https://www.linkedin.com/in/irohittiwari/", primary: false }
      ]
    }
  };

  await prisma.page.upsert({
    where: { slug: 'rohit-tiwari' },
    update: {
      title: "Rohit Tiwari - Founder & CEO | WebDesino",
      description: "Meet Rohit Tiwari, Founder & CEO of WebDesino. A visionary web developer and digital strategist helping businesses grow online.",
      content: founderPageContent
    },
    create: {
      slug: 'rohit-tiwari',
      title: "Rohit Tiwari - Founder & CEO | WebDesino",
      description: "Meet Rohit Tiwari, Founder & CEO of WebDesino. A visionary web developer and digital strategist helping businesses grow online.",
      content: founderPageContent
    }
  });

  // Seed Clients
  console.log('Seeding clients...')
  await prisma.client.deleteMany({}); // Clear existing clients to avoid duplicates
  const clients = getClients();
  await prisma.client.createMany({
    data: clients.map(c => ({
      name: c.name,
      url: c.url,
      image: c.image,
      category: c.category
    }))
  });

  // Seed Blog Posts
  console.log('Seeding blog posts...')
  const blogPosts = getBlogPosts();
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        date: new Date(post.date),
        category: post.category,
        excerpt: post.excerpt,
        image: post.image,
        content: post.content
      },
      create: {
        title: post.title,
        slug: post.slug,
        date: new Date(post.date),
        category: post.category,
        excerpt: post.excerpt,
        image: post.image,
        content: post.content
      }
    });
  }

  // Seed FAQs
  console.log('Seeding FAQs...')
  await prisma.faq.deleteMany({});
  const faqs = getFAQs();
  await prisma.faq.createMany({
    data: faqs.map((faq, index) => ({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || "General",
      order: index
    }))
  });

  // Seed Location Pages
  console.log('Seeding location pages...')
  const locationPages = parseLocations();
  for (const page of locationPages) {
      const content = {
          hero: {
              subtitle: `Are you searching for a reliable website designer in ${page.location}? At WebDesino, we help local businesses create modern, fast, and SEO-friendly websites that generate genuine leads and rank well on Google.`,
              ctaText: "Get a Free Quote",
              ctaLink: "#contact",
              secondaryCtaText: "Call Us Now",
              secondaryCtaLink: "tel:+919310851557"
          },
          story: {
              title: `Why Your ${page.location} Business Needs a Website Today`,
              content: [
                  `In today's digital landscape, your customers are actively engaged online, whether they are exploring the vibrant market in ${page.location}. A professionally crafted website does more than just provide information; it serves as a powerful tool for your business.`,
                  "A captivating website design establishes trust with potential clients, featuring a sleek, modern aesthetic that reflects your brand's values. It effectively generates leads by incorporating clear and compelling calls to action that guide visitors towards taking the next step.",
                  `Whether you run a charming boutique, a dynamic coaching center, a caring clinic, or a home-based service, a local website tailored for the ${page.location} audience will enable you to differentiate yourself from your competitors.`
              ],
              image: "/hero-img.png"
          },
          leadingCompany: {
              title: `The Leading Web Development Company in ${page.location}`,
              content: `Located in the heart of West Delhi, WebDesino is known for delivering high-converting websites for small businesses and startups. We're the go-to web developer in ${page.location} for WordPress, Shopify, and custom-built platforms.`
          },
          services: [
            {
                title: "Website Design & Development",
                items: [
                    "Mobile-responsive layouts using WordPress, custom HTML/CSS, and popular CMS platforms",
                    "SEO-structured, fast-loading code for better rankings and user experience",
                    "Custom templates designed for clinics, shops, real estate agents, and startups",
                    "Before/After design comparisons to showcase how we transform your online presence"
                ],
                image: "/hero-img.png"
            },
            {
                title: "SEO & Google My Business Optimization",
                items: [
                    `On-page SEO targeting high-value keywords like "web designer ${page.location}" and "SEO service in West Delhi"`,
                    "Google My Business setup with accurate categories, operating hours, photos, and keyword-rich descriptions",
                    "Citation building and weekly posts to maintain high visibility in local searches"
                ],
                image: "/hero-img.png"
            },
            {
                title: "Local Targeting & Fast Support",
                items: [
                    `In-person consultations in ${page.location}, Janakpuri, Tilak Nagar, Uttam Nagar, and Hari Nagar`,
                    "Quick call/WhatsApp support for urgent changes or troubleshooting",
                    "A dedicated local account manager who understands the West Delhi business ecosystem"
                ],
                image: "/hero-img.png"
            }
          ]
      };

      await prisma.locationPage.upsert({
          where: { slug: page.slug },
          update: {
              location: page.location,
              title: page.title,
              description: `Best Web Development Services in ${page.location}`,
              content: content
          },
          create: {
              slug: page.slug,
              location: page.location,
              title: page.title,
              description: `Best Web Development Services in ${page.location}`,
              content: content
          }
      });
  }

  console.log('Seeding completed.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
