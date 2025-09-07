import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, Download, Eye } from 'lucide-react';
import { Color } from '../types/Color';
import { isLightColor, getColorName } from '@/lib/colorUtils';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import type { Palette } from '../../../shared/schema';
import ThemeFilter from './ThemeFilter';

interface TrendingPaletteProps {
  palette: Palette;
  onSelect: (colors: Color[]) => void;
}

// Fallback trending palettes data (used if no real data available)
export const FALLBACK_TRENDING_PALETTES = [
  {
    id: 1,
    name: "Summer Sunset",
    colors: ["#FF9671", "#FFC75F", "#F9F871", "#D65DB1", "#845EC2"],
    theme: "warm",
    saves: 152,
    downloads: 89,
    views: 523,
  },
  {
    id: 2,
    name: "Ocean Breeze",
    colors: ["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D"],
    theme: "cold",
    saves: 134,
    downloads: 76,
    views: 412,
  },
  {
    id: 3,
    name: "Forest Vibes",
    colors: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2"],
    theme: "cold",
    saves: 98,
    downloads: 65,
    views: 389,
  },
  {
    id: 4,
    name: "Retro Wave",
    colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C", "#D90429"],
    theme: "dark",
    saves: 87,
    downloads: 54,
    views: 298,
  },
  {
    id: 5,
    name: "Pastel Dream",
    colors: ["#CDB4DB", "#FFC8DD", "#FFAFCC", "#BDE0FE", "#A2D2FF"],
    theme: "pastel",
    saves: 76,
    downloads: 43,
    views: 267,
  },
  {
    id: 6,
    name: "Electric Neon",
    colors: ["#FF00FF", "#00FFFF", "#FFFF00", "#FF6600", "#6600FF"],
    theme: "vibrant",
    saves: 65,
    downloads: 38,
    views: 245,
  },
  {
    id: 7,
    name: "Earth Tones",
    colors: ["#8B7355", "#A0826D", "#BFA084", "#D4B896", "#E8D5B7"],
    theme: "neutral",
    saves: 54,
    downloads: 32,
    views: 198,
  },
  {
    id: 8,
    name: "Morning Light",
    colors: ["#FFF8DC", "#FFFACD", "#F0F8FF", "#F5F5DC", "#FFFFF0"],
    theme: "light",
    saves: 43,
    downloads: 28,
    views: 176,
  }
];

function TrendingPalette({ palette, onSelect }: TrendingPaletteProps) {
  const colors = Array.isArray(palette.colors) ? palette.colors : JSON.parse(palette.colors);
  
  const handleClick = () => {
    // Convert hex strings to Color objects
    const colorObjects = colors.map((hex: string) => {
      const colorName = getColorName(hex);
      return {
        hex,
        rgb: {
          r: parseInt(hex.slice(1, 3), 16),
          g: parseInt(hex.slice(3, 5), 16),
          b: parseInt(hex.slice(5, 7), 16)
        },
        locked: false,
        name: colorName
      };
    });
    
    onSelect(colorObjects);
  };

  // Apply bias of 10000 to the display numbers
  const displaySaves = (palette.saves || 0) + 10000;
  const displayDownloads = (palette.downloads || 0) + 10000;
  const displayViews = (palette.views || 0) + 10000;
  
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 transition-all cursor-pointer group"
      onClick={handleClick}
    >
      <div className="flex h-14 sm:h-20 relative">
        {colors.map((color, index) => (
          <div 
            key={index}
            className="flex-1 group-hover:flex-[1.1] transition-all duration-300 relative"
            style={{ backgroundColor: color }}
          >
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-medium transition-opacity duration-300"
              style={{ color: isLightColor(color) ? '#333' : '#fff', backgroundColor: color + '99' }}
            >
              <span className="px-2 py-1 backdrop-blur-sm rounded bg-white bg-opacity-20">
                {color}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-medium text-gray-800">{palette.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{colors.length} colors</p>
          </div>
          <span className="p-1.5 bg-gray-100 rounded-full text-gray-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
            <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Heart size={12} />
            <span>{displaySaves.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download size={12} />
            <span>{displayDownloads.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={12} />
            <span>{displayViews.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TrendingPalettesProps {
  onSelectPalette: (colors: Color[]) => void;
}

export default function TrendingPalettes({ onSelectPalette }: TrendingPalettesProps) {
  const [selectedTheme, setSelectedTheme] = useState('all');
  
  const { 
    data: trendingPalettes = [], 
    isLoading,
    error 
  } = useQuery<Palette[]>({
    queryKey: ['/api/palettes/trending', selectedTheme],
    queryFn: getQueryFn(),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Use real data if available, otherwise fallback to hardcoded data
  const allPalettes = trendingPalettes.length > 0 ? trendingPalettes : FALLBACK_TRENDING_PALETTES;
  
  // Filter fallback data by theme if using fallback
  const palettesToShow = trendingPalettes.length > 0 
    ? trendingPalettes 
    : selectedTheme === 'all' 
      ? FALLBACK_TRENDING_PALETTES 
      : FALLBACK_TRENDING_PALETTES.filter(palette => palette.theme === selectedTheme);

  if (isLoading) {
    return (
      <div className="mt-8 sm:mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 sm:mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-5 sm:mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Trending Palettes</h2>
          <p className="text-sm text-gray-600 mt-1">
            {trendingPalettes.length > 0 
              ? "Most popular color combinations from our community" 
              : "Popular color combinations to get you started"
            }
          </p>
        </div>
        <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-200">
          <ArrowRight size={20} className="text-blue-500" />
        </div>
      </div>

      <ThemeFilter 
        selectedTheme={selectedTheme}
        onThemeChange={setSelectedTheme}
      />
      
      {palettesToShow.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No palettes found for the selected theme.</p>
          <p className="text-sm mt-1">Try selecting a different theme or "All Themes"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {palettesToShow.map((palette) => (
            <TrendingPalette
              key={palette.id}
              palette={palette}
              onSelect={onSelectPalette}
            />
          ))}
        </div>
      )}
    </div>
  );
}