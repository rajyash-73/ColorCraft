import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Breadcrumb navigation component for better user experience and SEO
 * Follows schema.org structured data for breadcrumbs
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex ${className}`}>
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm flex items-center"
            aria-label="Home"
          >
            <Home size={16} />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight size={16} className="mx-2 text-gray-400" aria-hidden="true" />
            {item.current ? (
              <span className="text-sm font-medium text-gray-700" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
      
      {/* Structured data for breadcrumbs (hidden from users, visible to search engines) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://coolors.in/'
              },
              ...items.map((item, index) => ({
                '@type': 'ListItem',
                'position': index + 2,
                'name': item.name,
                'item': `https://coolors.in${item.href}`
              }))
            ]
          })
        }}
      />
    </nav>
  );
};

export default Breadcrumbs;