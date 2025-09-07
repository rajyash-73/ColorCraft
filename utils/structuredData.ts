/**
 * Utility functions for generating JSON-LD structured data for SEO
 */

// Basic WebApplication structured data
export const generateWebAppSchema = (additionalData = {}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Coolors.in Color Palette Generator',
    'url': 'https://coolors.in/',
    'description': 'Create beautiful color combinations with our intuitive color generator',
    'applicationCategory': 'DesignApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'featureList': 'Generate color palettes, Save palettes, Export in multiple formats, Visualize palettes in UI templates',
    ...additionalData
  };
};

// FAQ page structured data
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
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

// Breadcrumbs structured data
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
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

// Color palette schema
export const generateColorPaletteSchema = (colors: Array<{ hex: string; name?: string }>, paletteName: string = 'Color Palette') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    'name': paletteName,
    'author': {
      '@type': 'Organization',
      'name': 'Coolors.in'
    },
    'description': `A color palette featuring ${colors.map(c => c.name || c.hex).join(', ')}`,
    'keywords': 'color palette, color scheme, design, ' + colors.map(c => c.name || c.hex).join(', ')
  };
};

// Article structured data for blog/guides
export const generateArticleSchema = (title: string, description: string, author: string, datePublished: string, imageUrl: string = '/og-default.jpg') => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': title,
    'description': description,
    'image': `https://coolors.in${imageUrl}`,
    'datePublished': datePublished,
    'author': {
      '@type': 'Person',
      'name': author
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Coolors.in',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://coolors.in/logo.svg'
      }
    }
  };
};

// Contact page structured data
export const generateContactPageSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    'name': 'Contact Coolors.in',
    'description': 'Get in touch with Yash, the creator of Coolors.in color palette generator',
    'url': 'https://coolors.in/contact',
    'mainEntity': {
      '@type': 'Person',
      'name': 'Yash',
      'email': 'rajyash73@gmail.com',
      'jobTitle': 'Creator of Coolors.in',
      'url': 'https://coolors.in',
      'worksFor': {
        '@type': 'Organization',
        'name': 'Coolors.in'
      }
    },
    'potentialAction': {
      '@type': 'CommunicateAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'mailto:rajyash73@gmail.com',
        'inLanguage': 'en-US'
      }
    }
  };
};