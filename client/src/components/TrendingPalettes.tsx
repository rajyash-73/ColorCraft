import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Color } from '../types/Color';
import { isLightColor, getColorName } from '@/lib/colorUtils';

interface TrendingPaletteProps {
  name: string;
  colors: string[];
  onSelect: (colors: Color[]) => void;
}

// Sample trending palettes data
export const TRENDING_PALETTES = [
  {
    name: "Summer Sunset",
    colors: ["#FF9671", "#FFC75F", "#F9F871", "#D65DB1", "#845EC2"]
  },
  {
    name: "Ocean Breeze",
    colors: ["#1A535C", "#4ECDC4", "#F7FFF7", "#FF6B6B", "#FFE66D"]
  },
  {
    name: "Forest Vibes",
    colors: ["#2D6A4F", "#40916C", "#52B788", "#74C69D", "#95D5B2"]
  },
  {
    name: "Retro Wave",
    colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C", "#D90429"]
  },
  {
    name: "Pastel Dream",
    colors: ["#CDB4DB", "#FFC8DD", "#FFAFCC", "#BDE0FE", "#A2D2FF"]
  }
];

function TrendingPalette({ name, colors, onSelect }: TrendingPaletteProps) {
  const handleClick = () => {
    // Convert hex strings to Color objects
    const colorObjects = colors.map(hex => {
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
  
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex h-16">
        {colors.map((color, index) => (
          <div 
            key={index}
            className="flex-1"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
      <div className="p-3 flex justify-between items-center">
        <h3 className="font-medium text-gray-800">{name}</h3>
        <button className="text-blue-500 hover:text-blue-700">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

interface TrendingPalettesProps {
  onSelectPalette: (colors: Color[]) => void;
}

export default function TrendingPalettes({ onSelectPalette }: TrendingPalettesProps) {
  return (
    <div className="mt-8 bg-gray-50 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Trending Palettes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TRENDING_PALETTES.map((palette, index) => (
          <TrendingPalette
            key={index}
            name={palette.name}
            colors={palette.colors}
            onSelect={onSelectPalette}
          />
        ))}
      </div>
    </div>
  );
}