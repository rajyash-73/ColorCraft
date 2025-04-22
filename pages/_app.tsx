import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../client/src/lib/queryClient';
import { PaletteProvider } from '../client/src/contexts/PaletteContext';
import { AuthProvider } from '../client/src/hooks/use-auth';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';
import '../styles/globals.css';

// Import Google Analytics and Google AdSense scripts
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Create and explore beautiful color combinations with Coolors.in, the free color palette generator. Design with confidence using our intuitive color tools." />
        <link rel="icon" href="/favicon.svg" />
        {/* Add preconnect for Google fonts and other resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add font display=swap for better performance */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Add Font Awesome with display=swap */}
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
      </Head>

      {/* Google Analytics - load after pageload with Next.js Script component */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-XB40PTGVD4`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XB40PTGVD4');
        `}
      </Script>

      {/* Google AdSense - load after pageload */}
      <Script
        id="google-adsense"
        strategy="lazyOnload"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5617109574785382`}
        crossOrigin="anonymous"
      />

      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PaletteProvider>
            <Component {...pageProps} />
            <Toaster />
          </PaletteProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;