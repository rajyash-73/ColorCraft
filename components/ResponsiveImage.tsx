import React from 'react';
import Image from 'next/image';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
  fill?: boolean;
}

/**
 * A responsive image component that optimizes loading based on device size
 * Uses Next.js Image component with performance optimizations
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  quality = 85,
  width,
  height,
  fill = false
}) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        quality={quality}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        className={`${fill ? 'object-cover' : ''}`}
      />
    </div>
  );
};

export default ResponsiveImage;