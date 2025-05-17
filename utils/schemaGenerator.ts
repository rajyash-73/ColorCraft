/**
 * Utility functions for generating structured data (JSON-LD) for SEO
 * This helps search engines better understand the content of each page
 */

// Website/WebApplication schema for the entire site
export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': 'https://coolors.in',
    'name': 'Coolors.in',
    'description': 'The super fast color palette generator for designers and developers.',
    'potentialAction': [
      {
        '@type': 'SearchAction',
        'target': 'https://coolors.in/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    ]
  };
};

// WebApplication schema for the application itself
export const generateWebAppSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Coolors.in Color Palette Generator',
    'url': 'https://coolors.in/',
    'applicationCategory': 'DesignApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'description': 'Create beautiful color combinations with the Coolors.in color palette generator.',
    'creator': {
      '@type': 'Organization',
      'name': 'Coolors.in'
    }
  };
};

// Organization schema for the site owner
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Coolors.in',
    'url': 'https://coolors.in',
    'logo': 'https://coolors.in/logo.png',
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'coolors.in@gmail.com',
      'contactType': 'customer service'
    }
  };
};

// BreadcrumbList schema for navigation paths
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://coolors.in${item.url}`
    }))
  };
};

// FAQPage schema for FAQ pages
export const generateFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
};

// Article schema for blog-like content (e.g., Designer's Guide)
export const generateArticleSchema = (article: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.description,
    'image': article.image || 'https://coolors.in/og-default.jpg',
    'datePublished': article.datePublished,
    'dateModified': article.dateModified || article.datePublished,
    'author': {
      '@type': 'Person',
      'name': article.authorName
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Coolors.in',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://coolors.in/logo.png'
      }
    }
  };
};

// CreativeWork schema for color palettes
export const generateColorPaletteSchema = (palette: {
  id: string;
  name: string;
  colors: string[];
  description?: string;
  dateCreated: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': palette.name || 'Color Palette',
    'description': palette.description || `A color palette featuring ${palette.colors.join(', ')}`,
    'identifier': palette.id,
    'dateCreated': palette.dateCreated,
    'creator': {
      '@type': 'Organization',
      'name': 'Coolors.in'
    },
    'keywords': ['color palette', 'color scheme', 'design', ...palette.colors]
  };
};