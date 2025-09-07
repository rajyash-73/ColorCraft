import React from 'react';
import { Palette, Thermometer, Sun, Snowflake, Zap, Minus, Moon, Lightbulb, Shuffle } from 'lucide-react';

interface ThemeFilterProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

export const COLOR_THEMES = [
  { id: 'all', name: 'All Themes', icon: Shuffle, description: 'Show all palettes' },
  { id: 'pastel', name: 'Pastel', icon: Palette, description: 'Soft, light colors' },
  { id: 'warm', name: 'Warm', icon: Sun, description: 'Oranges, reds, yellows' },
  { id: 'cold', name: 'Cool', icon: Snowflake, description: 'Blues, greens, purples' },
  { id: 'vibrant', name: 'Vibrant', icon: Zap, description: 'Bold, saturated colors' },
  { id: 'neutral', name: 'Neutral', icon: Minus, description: 'Grays, beiges, earth tones' },
  { id: 'dark', name: 'Dark', icon: Moon, description: 'Deep, rich colors' },
  { id: 'light', name: 'Light', icon: Lightbulb, description: 'Bright, airy colors' },
];

export default function ThemeFilter({ selectedTheme, onThemeChange }: ThemeFilterProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Theme</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {COLOR_THEMES.map((theme) => {
          const Icon = theme.icon;
          const isSelected = selectedTheme === theme.id;
          
          return (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`
                relative group flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
              title={theme.description}
            >
              <Icon 
                size={20} 
                className={`mb-1 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} 
              />
              <span className="text-xs font-medium text-center leading-tight">
                {theme.name}
              </span>
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}