import { 
  Code, 
  Layout, 
  ShoppingCart, 
  Settings, 
  Shield, 
  Smartphone, 
  Search, 
  Globe, 
  BarChart, 
  PenTool, 
  Share2, 
  Megaphone, 
  Mail, 
  Type, 
  Image, 
  Layers, 
  Figma 
} from "lucide-react";

export interface ServiceSubtype {
  title: string;
  slug: string;
  description: string;
  features: string[];
  benefits: string[];
  icon?: any;
}

export interface ServiceCategory {
  title: string;
  slug: string;
  description: string;
  icon?: any;
  image?: string;
  subtypes: ServiceSubtype[];
}

export const servicesData: ServiceCategory[] = [
  {
    title: "Website Solutions",
    slug: "website-solutions",
    description: "Comprehensive web solutions tailored to your business needs, from custom development to maintenance.",
    icon: Layout,
    image: "uploads/2025/10/Website-Design-Delhi.jpg",
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
    icon: Megaphone,
    image: "uploads/2025/10/Digital-Marketing-in-Delhi.jpg",
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
    icon: Search,
    image: "uploads/2025/11/seo.jpg",
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
    icon: PenTool,
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
    icon: Type,
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
