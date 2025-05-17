import React, { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ClipboardCopy, Check, Eye } from 'lucide-react';
import SEO from '../../components/SEO';
import { storage } from '../../server/storage';
import { Color, Palette } from '../../shared/schema';
import { isLightColor } from '../../client/src/lib/colorUtils';
import { generateColorPaletteSchema } from '../../utils/schemaGenerator';

// Props interface for the page
interface SharedPalettePageProps {
  palette?: Palette;
  colors: Color[];
  error?: string;
}

const SharedPalettePage: NextPage<SharedPalettePageProps> = ({ palette, colors, error }) => {
  const router = useRouter();
  const [copied, setCopied] = useState<number | null>(null);
  
  // Function to copy color to clipboard
  const copyToClipboard = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };
  
  // Function to handle using this palette (saves to localStorage for the generator)
  const handleUsePalette = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentPalette', JSON.stringify(colors));
      router.push('/');
    }
  };
  
  // Display error if palette not found
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <SEO 
          title="Palette Not Found | Coolors.in"
          description="The palette you're looking for could not be found."
        />
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Palette Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link 
            href="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="mr-2" size={18} />
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }
  
  // Create structured data for SEO
  const structuredData = palette ? generateColorPaletteSchema({
    id: palette.id.toString(),
    name: palette.name,
    colors: colors.map(c => c.hex),
    dateCreated: palette.createdAt
  }) : undefined;
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO 
        title={`${palette?.name || 'Color Palette'} | Coolors.in`}
        description={`Explore and use this beautiful color palette featuring ${colors.map(c => c.hex).join(', ')}.`}
        structuredData={structuredData}
        ogImage={`/api/palette-og-image?id=${palette?.id || ''}`}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link 
                href="/"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="mr-2" size={18} />
                Back to Home
              </Link>
            </div>
            
            <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Coolors.in
            </h1>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Palette name and info */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{palette?.name || 'Color Palette'}</h2>
          {palette && (
            <p className="text-gray-500 mt-1">
              Created on {new Date(palette.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
        
        {/* Color display */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Desktop view - horizontal */}
          <div className="hidden md:flex h-80">
            {colors.map((color, index) => (
              <div 
                key={index}
                className="flex-1 flex flex-col justify-between p-6 transition-all"
                style={{ backgroundColor: color.hex }}
              >
                <div 
                  className="text-lg font-bold"
                  style={{ color: isLightColor(color.hex) ? '#1f2937' : '#ffffff' }}
                >
                  {index + 1}
                </div>
                
                <div>
                  <button
                    onClick={() => copyToClipboard(color.hex, index)}
                    className={`flex items-center px-3 py-2 rounded-md ${
                      isLightColor(color.hex) 
                        ? 'bg-gray-900 bg-opacity-10 hover:bg-opacity-20 text-gray-900' 
                        : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                    } transition-colors`}
                    aria-label={`Copy ${color.hex}`}
                  >
                    {copied === index ? (
                      <>
                        <Check size={16} className="mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <ClipboardCopy size={16} className="mr-2" />
                        {color.hex}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile view - vertical */}
          <div className="md:hidden">
            {colors.map((color, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-6"
                style={{ backgroundColor: color.hex }}
              >
                <div 
                  className="text-lg font-bold"
                  style={{ color: isLightColor(color.hex) ? '#1f2937' : '#ffffff' }}
                >
                  {index + 1}
                </div>
                
                <button
                  onClick={() => copyToClipboard(color.hex, index)}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isLightColor(color.hex) 
                      ? 'bg-gray-900 bg-opacity-10 hover:bg-opacity-20 text-gray-900' 
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                  } transition-colors`}
                  aria-label={`Copy ${color.hex}`}
                >
                  {copied === index ? (
                    <>
                      <Check size={16} className="mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <ClipboardCopy size={16} className="mr-2" />
                      {color.hex}
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={handleUsePalette}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Eye className="mr-2" size={18} />
            Use This Palette
          </button>
          
          <Link 
            href={`/visualizer?palette=${encodeURIComponent(JSON.stringify(colors))}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            Visualize Palette
          </Link>
        </div>
      </main>
      
      {/* Simple footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Coolors.in. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Server-side data fetching
export const getServerSideProps: GetServerSideProps<SharedPalettePageProps> = async ({ params }) => {
  const id = params?.id;
  
  // Validate ID
  if (!id || Array.isArray(id) || isNaN(Number(id))) {
    return {
      props: {
        colors: [],
        error: 'Invalid palette ID'
      }
    };
  }
  
  try {
    // Fetch palette from database
    const palette = await storage.getPalette(Number(id));
    
    if (!palette) {
      return {
        props: {
          colors: [],
          error: 'Palette not found'
        }
      };
    }
    
    // Parse colors from JSON string
    const colors: Color[] = JSON.parse(palette.colors);
    
    return {
      props: {
        palette,
        colors
      }
    };
  } catch (error) {
    console.error('Error fetching palette:', error);
    return {
      props: {
        colors: [],
        error: 'Failed to load palette'
      }
    };
  }
};

export default SharedPalettePage;