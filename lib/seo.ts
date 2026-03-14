import type { Metadata } from "next";

export const BASE_URL = 'https://webdesino.com';
export const DEFAULT_OG_IMAGE = '/logo.png';
export const DEFAULT_SEO_TITLE = 'Top Web Development Company in Delhi NCR | Webdesino';
export const DEFAULT_SEO_DESCRIPTION =
  'Webdesino is a leading web development and digital marketing agency in Delhi NCR offering SEO, website design and digital marketing services.';

export function generateDefaultMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const title = (overrides.title as string) || DEFAULT_SEO_TITLE;
  const description = overrides.description || DEFAULT_SEO_DESCRIPTION;
  const robotsOverride =
    overrides.robots && typeof overrides.robots === 'object' ? overrides.robots : undefined;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords: [
      'web development company delhi ncr',
      'website design delhi',
      'seo services delhi ncr',
      'digital marketing agency delhi',
      'ecommerce website development',
    ],
    authors: [{ name: 'Webdesino' }],
    creator: 'Webdesino',
    publisher: 'Webdesino',
    alternates: {
      canonical: '/',
      ...overrides.alternates,
    },
    openGraph: {
      title,
      description,
      url: BASE_URL,
      siteName: 'Webdesino',
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'Webdesino - Web Development and Digital Marketing Agency',
        },
      ],
      ...overrides.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      ...overrides.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
      ...(robotsOverride ?? {}),
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    verification: {
      google: 'kq9IMLIo8C8VIGBSe6WnyRJtNULCKsmMFxWECkFhDl0',
    },
    ...overrides,
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Webdesino',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9310851557',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: 'en',
    },
    sameAs: [
      'https://www.facebook.com/webdesino',
      'https://twitter.com/webdesino',
      'https://www.instagram.com/webdesino',
      'https://www.linkedin.com/company/webdesino',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'M, 54/H, Block Z, Krishan Vihar',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110086',
      addressCountry: 'IN',
    },
  };
}

export function generatePrimaryLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Webdesino',
    url: BASE_URL,
    telephone: '+91-9310851557',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Delhi',
      addressCountry: 'India',
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Webdesino',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateLocalBusinessSchema(locationName: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Webdesino - Web Development in ${locationName}`,
    image: `${BASE_URL}/logo.png`,
    '@id': `${BASE_URL}/${slug}`,
    url: `${BASE_URL}/${slug}`,
    telephone: '+91-9310851557',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'M, 54/H, Block Z, Krishan Vihar',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110086',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.7041,
      longitude: 77.1025,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://www.facebook.com/webdesino',
      'https://twitter.com/webdesino',
      'https://www.instagram.com/webdesino',
      'https://www.linkedin.com/company/webdesino',
    ],
  };
}

export function generateBlogPostingSchema(post: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : [`${BASE_URL}/og-image.jpg`],
    datePublished: post.date, // Ensure this is ISO 8601 format if possible
    dateModified: post.date, // Or a modified date if available
    author: {
      '@type': 'Organization',
      name: 'Webdesino Team',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Webdesino',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

export function generateServiceSchema(service: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Webdesino',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Delhi',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.title,
          },
        },
      ],
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${BASE_URL}${item.item}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(article: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description || article.background,
    image: article.image ? [article.image] : [`${BASE_URL}/og-image.jpg`],
    datePublished: article.date || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Webdesino',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Webdesino',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
  };
}
