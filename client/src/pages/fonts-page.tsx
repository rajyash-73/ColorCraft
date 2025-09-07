import React, { useState, useEffect } from 'react';
import { Type, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Font {
  name: string;
  family: string;
  category: 'serif' | 'sans-serif' | 'display' | 'handwriting' | 'monospace';
  variants: string[];
  popularity: number;
}

const POPULAR_FONTS: Font[] = [
  { name: 'Roboto', family: 'Roboto', category: 'sans-serif', variants: ['300', '400', '500', '700'], popularity: 100 },
  { name: 'Open Sans', family: 'Open Sans', category: 'sans-serif', variants: ['300', '400', '600', '700'], popularity: 95 },
  { name: 'Montserrat', family: 'Montserrat', category: 'sans-serif', variants: ['300', '400', '500', '600', '700'], popularity: 90 },
  { name: 'Lato', family: 'Lato', category: 'sans-serif', variants: ['300', '400', '700'], popularity: 85 },
  { name: 'Poppins', family: 'Poppins', category: 'sans-serif', variants: ['300', '400', '500', '600', '700'], popularity: 80 },
  { name: 'Source Sans Pro', family: 'Source Sans Pro', category: 'sans-serif', variants: ['300', '400', '600', '700'], popularity: 75 },
  { name: 'Inter', family: 'Inter', category: 'sans-serif', variants: ['300', '400', '500', '600', '700'], popularity: 70 },
  { name: 'Nunito', family: 'Nunito', category: 'sans-serif', variants: ['300', '400', '600', '700'], popularity: 65 },
  
  // Serif fonts
  { name: 'Playfair Display', family: 'Playfair Display', category: 'serif', variants: ['400', '500', '600', '700'], popularity: 60 },
  { name: 'Merriweather', family: 'Merriweather', category: 'serif', variants: ['300', '400', '700'], popularity: 55 },
  { name: 'Lora', family: 'Lora', category: 'serif', variants: ['400', '500', '600', '700'], popularity: 50 },
  { name: 'PT Serif', family: 'PT Serif', category: 'serif', variants: ['400', '700'], popularity: 45 },
  { name: 'Source Serif Pro', family: 'Source Serif Pro', category: 'serif', variants: ['400', '600', '700'], popularity: 40 },
  { name: 'Crimson Text', family: 'Crimson Text', category: 'serif', variants: ['400', '600', '700'], popularity: 35 },
  
  // Display fonts
  { name: 'Bebas Neue', family: 'Bebas Neue', category: 'display', variants: ['400'], popularity: 30 },
  { name: 'Abril Fatface', family: 'Abril Fatface', category: 'display', variants: ['400'], popularity: 28 },
  { name: 'Anton', family: 'Anton', category: 'display', variants: ['400'], popularity: 26 },
  { name: 'Righteous', family: 'Righteous', category: 'display', variants: ['400'], popularity: 24 },
  { name: 'Oswald', family: 'Oswald', category: 'display', variants: ['300', '400', '500', '600', '700'], popularity: 22 },
  { name: 'Bangers', family: 'Bangers', category: 'display', variants: ['400'], popularity: 20 },
  
  // Handwriting fonts
  { name: 'Dancing Script', family: 'Dancing Script', category: 'handwriting', variants: ['400', '500', '600', '700'], popularity: 18 },
  { name: 'Pacifico', family: 'Pacifico', category: 'handwriting', variants: ['400'], popularity: 16 },
  { name: 'Kaushan Script', family: 'Kaushan Script', category: 'handwriting', variants: ['400'], popularity: 14 },
  { name: 'Great Vibes', family: 'Great Vibes', category: 'handwriting', variants: ['400'], popularity: 12 },
  { name: 'Satisfy', family: 'Satisfy', category: 'handwriting', variants: ['400'], popularity: 10 },
  { name: 'Allura', family: 'Allura', category: 'handwriting', variants: ['400'], popularity: 8 },
  
  // Monospace fonts
  { name: 'Fira Code', family: 'Fira Code', category: 'monospace', variants: ['300', '400', '500', '600', '700'], popularity: 6 },
  { name: 'Source Code Pro', family: 'Source Code Pro', category: 'monospace', variants: ['300', '400', '500', '600', '700'], popularity: 5 },
  { name: 'JetBrains Mono', family: 'JetBrains Mono', category: 'monospace', variants: ['300', '400', '500', '600', '700'], popularity: 4 },
  { name: 'Inconsolata', family: 'Inconsolata', category: 'monospace', variants: ['400', '700'], popularity: 3 },
  { name: 'Space Mono', family: 'Space Mono', category: 'monospace', variants: ['400', '700'], popularity: 2 },
  { name: 'Ubuntu Mono', family: 'Ubuntu Mono', category: 'monospace', variants: ['400', '700'], popularity: 1 },
];

const FONT_CATEGORIES = [
  { id: 'all', name: 'All Categories' },
  { id: 'serif', name: 'Serif' },
  { id: 'sans-serif', name: 'Sans Serif' },
  { id: 'display', name: 'Display' },
  { id: 'handwriting', name: 'Handwriting' },
  { id: 'monospace', name: 'Monospace' },
];

const SAMPLE_TEXT = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt repellendus eaque doloribus labore quos velit iusto perferendis odio laudantium.";

interface FontCardProps {
  font: Font;
}

function FontCard({ font }: FontCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load Google Font dynamically
    const loadFont = () => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(' ', '+')}:wght@${font.variants.join(';')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      
      // Wait a bit for font to load
      setTimeout(() => setIsLoaded(true), 100);
    };

    loadFont();
  }, [font]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{font.name}</h3>
        <span className="text-sm text-gray-500 capitalize">{font.category.replace('-', ' ')}</span>
      </div>
      
      <div 
        className="text-gray-700 leading-relaxed"
        style={{ 
          fontFamily: isLoaded ? `"${font.family}", sans-serif` : 'sans-serif',
          fontSize: '16px'
        }}
      >
        {SAMPLE_TEXT}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {font.variants.length} variant{font.variants.length > 1 ? 's' : ''}
          </span>
          <Button variant="outline" size="sm">
            Use Font
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function FontsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFonts = POPULAR_FONTS.filter(font => {
    const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory;
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Type className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Fonts</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse hundreds of free fonts for your projects.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search fonts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {FONT_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredFonts.length} font{filteredFonts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && (
              <span> in {FONT_CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
            )}
            {searchQuery && (
              <span> matching "{searchQuery}"</span>
            )}
          </p>
        </div>

        {/* Font Grid */}
        {filteredFonts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFonts.map((font) => (
              <FontCard key={font.name} font={font} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Type className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No fonts found</h3>
            <p className="text-gray-600">
              Try adjusting your search or selecting a different category.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredFonts.length > 0 && filteredFonts.length >= 20 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Fonts
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}