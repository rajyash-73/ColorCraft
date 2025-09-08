import React, { useEffect } from 'react';
import Script from 'next/script';

export const AdSenseSetup = () => {
  return (
    <Script
      id="adsense-setup"
      strategy="lazyOnload"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890"
      crossOrigin="anonymous"
    />
  );
};

interface AdSenseProps {
  adSlot: string; // The ad slot ID
  style?: React.CSSProperties; // Optional custom styles
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical'; // Ad format
  responsive?: boolean; // Whether the ad should be responsive
}

export const AdSense = ({ adSlot, style, format = 'auto', responsive = true }: AdSenseProps) => {
  useEffect(() => {
    try {
      // Only push to adsbygoogle if it exists
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        (window as any).adsbygoogle.push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="ad-container" style={{ overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          overflow: 'hidden',
          width: responsive ? '100%' : undefined,
          height: format === 'fluid' ? 'fluid' : undefined,
        }}
        data-ad-client="ca-pub-1234567890"
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export const InArticleAd = ({ adSlot = '3825791378' }: { adSlot?: string }) => {
  return (
    <div className="my-8 text-center">
      <div className="text-xs text-gray-400 mb-1">Advertisement</div>
      <AdSense 
        adSlot={adSlot} 
        format="fluid" 
        style={{ minHeight: 250 }}
      />
    </div>
  );
};

export const SidebarAd = ({ adSlot = '6781254986' }: { adSlot?: string }) => {
  return (
    <div className="sticky top-4">
      <div className="text-xs text-gray-400 mb-1">Advertisement</div>
      <AdSense 
        adSlot={adSlot} 
        format="vertical" 
        style={{ minHeight: 600 }}
      />
    </div>
  );
};

export const BannerAd = ({ adSlot = '1234567890' }: { adSlot?: string }) => {
  return (
    <div className="py-4 w-full overflow-hidden">
      <div className="text-xs text-gray-400 mb-1">Advertisement</div>
      <AdSense 
        adSlot={adSlot} 
        format="rectangle" 
        responsive={true}
        style={{ minHeight: 90 }}
      />
    </div>
  );
};