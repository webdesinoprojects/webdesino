export const BASE_URL = 'https://webdesino.com';

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
