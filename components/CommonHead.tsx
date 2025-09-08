import React from 'react';
import Head from 'next/head';

interface CommonHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

/**
 * A reusable head component for consistent SEO across pages
 */
export const CommonHead = ({
  title,
  description,
  keywords = "color palette generator, color scheme, color combinations, design tools",
  ogImage = "/og-default.jpg",
  canonicalUrl,
  structuredData,
}: CommonHeadProps) => {
  const siteUrl = "https://coolors.in";
  const fullTitle = title.includes("Coolors.in") ? title : `${title} | Coolors.in`;
  
  return (
    <Head>
      {/* Core Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
};