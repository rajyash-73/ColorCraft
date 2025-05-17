import React from 'react';
import Head from 'next/head';

interface StructuredDataProps {
  data: any;
}

/**
 * Component for adding structured data (JSON-LD) to a page
 * This helps search engines better understand the page content
 */
const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
};

export default StructuredData;