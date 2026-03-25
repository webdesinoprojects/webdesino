// Location Content Template Generation System
// Generates SEO-optimized location page content based on service focus

export interface LocationContent {
  slug: string;
  title: string;
  description: string;
  hero: {
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    image: string;
  };
  story: {
    title: string;
    content: string[];
    image: string;
  };
  leadingCompany: {
    title: string;
    content: string;
  };
  services: Array<{
    title: string;
    items: string[];
    image: string;
  }>;
}

export type ServiceFocus =
  | "web-development"
  | "digital-marketing"
  | "seo-services"
  | "graphic-designing"
  | "content-writing"
  | "all-services";

// Service focus display names
export const SERVICE_FOCUS_OPTIONS = [
  { value: "web-development", label: "Web Development" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "seo-services", label: "SEO Services" },
  { value: "graphic-designing", label: "Graphic Designing" },
  { value: "content-writing", label: "Content Writing" },
  { value: "all-services", label: "All Services" },
] as const;

// Slug patterns for each service focus
const SLUG_PATTERNS: Record<ServiceFocus, string> = {
  "web-development": "best-web-development-company-in-{location}",
  "digital-marketing": "best-digital-marketing-agency-in-{location}",
  "seo-services": "best-seo-services-in-{location}",
  "graphic-designing": "best-graphic-design-services-in-{location}",
  "content-writing": "best-content-writing-services-in-{location}",
  "all-services": "best-web-development-company-in-{location}",
};

/**
 * Normalizes location name for use in slugs
 * Converts to lowercase and replaces spaces with hyphens
 */
function normalizeLocationForSlug(locationName: string): string {
  return locationName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Generates slug based on location and service focus
 */
function generateSlug(locationName: string, serviceFocus: ServiceFocus): string {
  const normalizedLocation = normalizeLocationForSlug(locationName);
  const pattern = SLUG_PATTERNS[serviceFocus];
  return pattern.replace("{location}", normalizedLocation);
}


/**
 * Main function to generate location page content
 * Returns complete content object based on location and service focus
 */
export function generateLocationContent(
  locationName: string,
  serviceFocus: string = "all-services"
): LocationContent {
  const focus = serviceFocus as ServiceFocus;
  const slug = generateSlug(locationName, focus);

  switch (focus) {
    case "web-development":
      return generateWebDevelopmentContent(locationName, slug);
    case "digital-marketing":
      return generateDigitalMarketingContent(locationName, slug);
    case "seo-services":
      return generateSEOServicesContent(locationName, slug);
    case "graphic-designing":
      return generateGraphicDesigningContent(locationName, slug);
    case "content-writing":
      return generateContentWritingContent(locationName, slug);
    case "all-services":
    default:
      return generateAllServicesContent(locationName, slug);
  }
}

// Template: Web Development
function generateWebDevelopmentContent(
  location: string,
  slug: string
): LocationContent {
  return {
    slug,
    title: `Best Web Development Company in ${location} | WebDesino`,
    description: `Looking for expert web development services in ${location}? WebDesino delivers custom websites, web applications, and e-commerce solutions with cutting-edge technology and exceptional quality.`,
    hero: {
      subtitle: `Transform your digital presence with professional web development services in ${location}. We build responsive, scalable, and user-friendly websites tailored to your business needs.`,
      ctaText: "Get a Free Quote",
      ctaLink: "/contact",
      secondaryCtaText: "View Our Work",
      secondaryCtaLink: "/portfolio",
      image: "", // No image - will center the text
    },
    story: {
      title: `Your Trusted Web Development Partner in ${location}`,
      content: [
        `At WebDesino, we understand that your website is the digital face of your business. That's why we're committed to delivering exceptional web development services to businesses in ${location}. Our team of experienced developers combines technical expertise with creative design to build websites that not only look stunning but also drive real business results.`,
        `Whether you need a simple business website, a complex web application, or a full-featured e-commerce platform, we have the skills and experience to bring your vision to life. We use the latest technologies and best practices to ensure your website is fast, secure, and optimized for search engines. Partner with us to take your online presence to the next level.`,
      ],
      image: "/images/web-development-story.jpg",
    },
    leadingCompany: {
      title: `Why Choose WebDesino for Web Development in ${location}?`,
      content: `We're not just another web development company. We're your strategic partner in digital success. Our team brings years of experience, a proven track record, and a commitment to excellence that sets us apart in ${location}'s competitive market.`,
    },
    services: [
      {
        title: "Custom Website Development",
        items: [
          "Responsive design for all devices",
          "Custom functionality tailored to your needs",
          "SEO-optimized code structure",
          "Fast loading speeds",
        ],
        image: "/images/custom-web-dev.jpg",
      },
      {
        title: "E-Commerce Solutions",
        items: [
          "Secure payment gateway integration",
          "Inventory management systems",
          "User-friendly shopping experience",
          "Mobile-optimized checkout",
        ],
        image: "/images/ecommerce-solutions.jpg",
      },
      {
        title: "Web Application Development",
        items: [
          "Scalable architecture",
          "Cloud-based solutions",
          "API integration",
          "Real-time data processing",
        ],
        image: "/images/web-app-dev.jpg",
      },
    ],
  };
}

// Template: Digital Marketing
function generateDigitalMarketingContent(
  location: string,
  slug: string
): LocationContent {
  return {
    slug,
    title: `Digital Marketing Agency in ${location} | WebDesino`,
    description: `Grow your business with data-driven digital marketing services in ${location}. WebDesino offers SEO, social media marketing, PPC, and content marketing to boost your online visibility and drive conversions.`,
    hero: {
      subtitle: `Accelerate your business growth with comprehensive digital marketing services in ${location}. We create data-driven strategies that deliver measurable results and maximize your ROI.`,
      ctaText: "Start Growing Today",
      ctaLink: "/contact",
      secondaryCtaText: "Our Services",
      secondaryCtaLink: "/services",
      image: "",
    },
    story: {
      title: `Your Digital Marketing Partner in ${location}`,
      content: [
        `In today's digital landscape, having a strong online presence is crucial for business success. WebDesino is your trusted digital marketing partner in ${location}, helping businesses of all sizes reach their target audience and achieve their marketing goals. Our team of digital marketing experts uses proven strategies and cutting-edge tools to drive traffic, generate leads, and increase conversions.`,
        `From search engine optimization to social media marketing, pay-per-click advertising to content marketing, we offer a full suite of digital marketing services designed to grow your business. We take a data-driven approach, continuously monitoring and optimizing campaigns to ensure you get the best possible return on your investment.`,
      ],
      image: "/images/digital-marketing-story.jpg",
    },
    leadingCompany: {
      title: `Why WebDesino is ${location}'s Leading Digital Marketing Agency`,
      content: `We combine creativity with analytics to deliver digital marketing campaigns that truly work. Our team stays ahead of industry trends and algorithm updates to ensure your business maintains a competitive edge in ${location}'s dynamic market.`,
    },
    services: [
      {
        title: "Search Engine Optimization (SEO)",
        items: [
          "Keyword research and optimization",
          "On-page and technical SEO",
          "Link building strategies",
          "Local SEO for ${location} businesses",
        ],
        image: "/images/seo-services.jpg",
      },
      {
        title: "Social Media Marketing",
        items: [
          "Strategic content creation",
          "Community management",
          "Paid social advertising",
          "Influencer partnerships",
        ],
        image: "/images/social-media-marketing.jpg",
      },
      {
        title: "Pay-Per-Click (PPC) Advertising",
        items: [
          "Google Ads management",
          "Facebook and Instagram ads",
          "Conversion optimization",
          "Detailed performance reporting",
        ],
        image: "/images/ppc-advertising.jpg",
      },
    ],
  };
}

// Template: SEO Services
function generateSEOServicesContent(
  location: string,
  slug: string
): LocationContent {
  return {
    slug,
    title: `SEO Services in ${location} | WebDesino`,
    description: `Boost your search rankings with professional SEO services in ${location}. WebDesino provides comprehensive SEO solutions including keyword research, on-page optimization, and link building to increase your organic traffic.`,
    hero: {
      subtitle: `Dominate search results with expert SEO services in ${location}. We help businesses improve their online visibility, attract qualified traffic, and convert visitors into customers.`,
      ctaText: "Get SEO Audit",
      ctaLink: "/contact",
      secondaryCtaText: "SEO Packages",
      secondaryCtaLink: "/pricing",
      image: "",
    },
    story: {
      title: `Professional SEO Services in ${location}`,
      content: [
        `Search engine optimization is the foundation of digital success. At WebDesino, we provide comprehensive SEO services to businesses in ${location}, helping them achieve higher rankings, increased traffic, and better conversions. Our SEO experts use white-hat techniques and follow Google's best practices to deliver sustainable, long-term results.`,
        `We understand that every business is unique, which is why we create customized SEO strategies tailored to your specific goals and target audience. From technical SEO audits to content optimization, local SEO to link building, we cover all aspects of search engine optimization to ensure your website performs at its best.`,
      ],
      image: "/images/seo-story.jpg",
    },
    leadingCompany: {
      title: `Why Choose WebDesino for SEO in ${location}?`,
      content: `Our proven SEO methodologies have helped numerous businesses in ${location} achieve top rankings and significant traffic growth. We focus on sustainable strategies that deliver lasting results, not quick fixes that risk penalties.`,
    },
    services: [
      {
        title: "Technical SEO",
        items: [
          "Website speed optimization",
          "Mobile-friendliness improvements",
          "Schema markup implementation",
          "XML sitemap and robots.txt optimization",
        ],
        image: "/images/technical-seo.jpg",
      },
      {
        title: "On-Page SEO",
        items: [
          "Keyword research and targeting",
          "Content optimization",
          "Meta tags and headers optimization",
          "Internal linking structure",
        ],
        image: "/images/onpage-seo.jpg",
      },
      {
        title: "Local SEO",
        items: [
          "Google Business Profile optimization",
          "Local citations and directories",
          "Location-specific content",
          "Review management for ${location}",
        ],
        image: "/images/local-seo.jpg",
      },
    ],
  };
}

// Template: Graphic Designing
function generateGraphicDesigningContent(
  location: string,
  slug: string
): LocationContent {
  return {
    slug,
    title: `Graphic Design Services in ${location} | WebDesino`,
    description: `Creative graphic design services in ${location} for businesses seeking professional branding, logo design, marketing materials, and visual content. WebDesino brings your brand vision to life with stunning designs.`,
    hero: {
      subtitle: `Elevate your brand with professional graphic design services in ${location}. We create visually stunning designs that capture attention, communicate your message, and leave a lasting impression.`,
      ctaText: "Start Your Project",
      ctaLink: "/contact",
      secondaryCtaText: "View Portfolio",
      secondaryCtaLink: "/portfolio",
      image: "",
    },
    story: {
      title: `Creative Graphic Design Solutions in ${location}`,
      content: [
        `Great design is more than just aesthetics—it's about communicating your brand's story and values effectively. WebDesino offers professional graphic design services to businesses in ${location}, helping them stand out in a crowded marketplace. Our talented designers combine creativity with strategic thinking to deliver designs that not only look beautiful but also drive business results.`,
        `Whether you need a complete brand identity, marketing materials, social media graphics, or packaging design, we have the expertise to bring your vision to life. We work closely with you throughout the design process, ensuring every element aligns with your brand and resonates with your target audience.`,
      ],
      image: "/images/graphic-design-story.jpg",
    },
    leadingCompany: {
      title: `${location}'s Premier Graphic Design Agency`,
      content: `Our design philosophy centers on creating visual experiences that connect with audiences on an emotional level. We blend artistic creativity with market insights to produce designs that are both beautiful and effective for ${location} businesses.`,
    },
    services: [
      {
        title: "Brand Identity Design",
        items: [
          "Logo design and brand guidelines",
          "Color palette and typography",
          "Business card and stationery design",
          "Brand style guide creation",
        ],
        image: "/images/brand-identity.jpg",
      },
      {
        title: "Marketing Materials",
        items: [
          "Brochures and flyers",
          "Posters and banners",
          "Social media graphics",
          "Email templates",
        ],
        image: "/images/marketing-materials.jpg",
      },
      {
        title: "Digital Design",
        items: [
          "Website graphics and UI elements",
          "Infographics and data visualization",
          "Presentation design",
          "Digital advertising creatives",
        ],
        image: "/images/digital-design.jpg",
      },
    ],
  };
}

// Template: Content Writing
function generateContentWritingContent(
  location: string,
  slug: string
): LocationContent {
  return {
    slug,
    title: `Content Writing Services in ${location} | WebDesino`,
    description: `Professional content writing services in ${location} for websites, blogs, marketing materials, and SEO content. WebDesino delivers engaging, high-quality content that drives traffic and converts readers into customers.`,
    hero: {
      subtitle: `Engage your audience with compelling content writing services in ${location}. We create SEO-optimized, conversion-focused content that tells your story and drives business growth.`,
      ctaText: "Get Content Quote",
      ctaLink: "/contact",
      secondaryCtaText: "Content Samples",
      secondaryCtaLink: "/blog",
      image: "",
    },
    story: {
      title: `Expert Content Writing Services in ${location}`,
      content: [
        `Content is the voice of your brand and the foundation of your digital marketing strategy. WebDesino provides professional content writing services to businesses in ${location}, creating engaging, informative, and persuasive content that resonates with your target audience. Our experienced writers understand how to craft content that not only ranks well in search engines but also converts readers into customers.`,
        `From website copy to blog posts, product descriptions to email campaigns, we deliver high-quality content that aligns with your brand voice and marketing objectives. We conduct thorough research, optimize for relevant keywords, and ensure every piece of content provides value to your audience while supporting your business goals.`,
      ],
      image: "/images/content-writing-story.jpg",
    },
    leadingCompany: {
      title: `Why ${location} Businesses Trust WebDesino for Content`,
      content: `Our content writers are skilled storytellers who understand the nuances of different industries and audiences. We create content that educates, entertains, and persuades, helping ${location} businesses build authority and trust with their customers.`,
    },
    services: [
      {
        title: "Website Content",
        items: [
          "Homepage and landing page copy",
          "About us and service pages",
          "Product descriptions",
          "SEO-optimized web content",
        ],
        image: "/images/website-content.jpg",
      },
      {
        title: "Blog Writing",
        items: [
          "Industry-specific blog posts",
          "Thought leadership articles",
          "How-to guides and tutorials",
          "News and trend analysis",
        ],
        image: "/images/blog-writing.jpg",
      },
      {
        title: "Marketing Content",
        items: [
          "Email marketing campaigns",
          "Social media content",
          "Case studies and whitepapers",
          "Press releases and announcements",
        ],
        image: "/images/marketing-content.jpg",
      },
    ],
  };
}

// Template: All Services (Default)
function generateAllServicesContent(
  location: string,
  slug: string
): LocationContent {
  return {
    slug,
    title: `Best Web Development Company in ${location} | WebDesino`,
    description: `WebDesino is ${location}'s leading digital agency offering web development, digital marketing, SEO, graphic design, and content writing services. Transform your business with our comprehensive digital solutions.`,
    hero: {
      subtitle: `Your complete digital solution partner in ${location}. We offer web development, digital marketing, SEO, graphic design, and content writing services to help your business thrive online.`,
      ctaText: "Get Started",
      ctaLink: "/contact",
      secondaryCtaText: "Our Services",
      secondaryCtaLink: "/services",
      image: "",
    },
    story: {
      title: `${location}'s Complete Digital Solutions Provider`,
      content: [
        `WebDesino is your one-stop digital agency in ${location}, offering a comprehensive range of services to help businesses succeed online. From building stunning websites to executing effective digital marketing campaigns, we provide end-to-end solutions that drive real results. Our multidisciplinary team brings together expertise in web development, digital marketing, SEO, graphic design, and content writing to deliver integrated solutions that work.`,
        `We understand that every business is unique, which is why we take a personalized approach to every project. Whether you're a startup looking to establish your online presence or an established business seeking to expand your digital footprint, we have the skills, experience, and dedication to help you achieve your goals. Partner with us to transform your digital presence and accelerate your business growth.`,
      ],
      image: "/images/all-services-story.jpg",
    },
    leadingCompany: {
      title: `Why ${location} Businesses Choose WebDesino`,
      content: `As a full-service digital agency, we offer the convenience of working with a single partner for all your digital needs. Our integrated approach ensures consistency across all channels and maximizes the impact of your digital investments in ${location}'s competitive market.`,
    },
    services: [
      {
        title: "Web Development",
        items: [
          "Custom website development",
          "E-commerce solutions",
          "Web applications",
          "Responsive design",
        ],
        image: "/images/web-development.jpg",
      },
      {
        title: "Digital Marketing",
        items: [
          "SEO and local search optimization",
          "Social media marketing",
          "PPC advertising",
          "Email marketing campaigns",
        ],
        image: "/images/digital-marketing.jpg",
      },
      {
        title: "Creative Services",
        items: [
          "Graphic design and branding",
          "Content writing and copywriting",
          "Video production",
          "Photography services",
        ],
        image: "/images/creative-services.jpg",
      },
    ],
  };
}
