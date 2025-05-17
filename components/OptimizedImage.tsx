import React from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover'
}) => {
  // For dynamic imports from public folder
  const imageSrc = src.startsWith('/') ? src : `/${src}`;
  
  return (
    <div className={`relative ${className}`} style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}>
      <Image
        src={imageSrc}
        alt={alt}
        fill={!width || !height}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'} 
        priority={priority}
        style={{ objectFit }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default OptimizedImage;