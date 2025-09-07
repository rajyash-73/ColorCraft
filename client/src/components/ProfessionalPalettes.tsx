import React, { useState, useEffect } from 'react';
import { Crown, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Palette } from '@/types/Palette';
import { Color } from '@/types/Color';
import { usePalette } from '@/contexts/PaletteContext';
import { isLightColor } from '@/lib/colorUtils';

interface ProfessionalPalettesProps {
  onSelectPalette?: (colors: Color[]) => void;
}

export default function ProfessionalPalettes({ onSelectPalette }: ProfessionalPalettesProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { setPalette } = usePalette();
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState(false);

  const isPremium = user?.subscriptionStatus === 'active' && user?.subscriptionPlan === 'premium';

  const fetchProfessionalPalettes = async () => {
    if (!isPremium) {
      toast({
        title: "Premium Feature",
        description: "Professional palettes are available with Premium subscription.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/professional-palettes');
      if (response.ok) {
        const data = await response.json();
        setPalettes(data);
      } else {
        throw new Error('Failed to fetch professional palettes');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load professional palettes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPalette = (palette: Palette) => {
    if (onSelectPalette) {
      onSelectPalette(palette.colors);
    } else {
      setPalette(palette.colors);
    }
    
    toast({
      title: "Palette applied",
      description: `"${palette.name}" palette has been applied.`,
    });
  };

  if (!isPremium) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Crown className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Professional Color Palettes
            </h3>
            <p className="text-gray-600 mb-3">
              Access curated professional palettes designed by experts for branding, web design, and marketing.
            </p>
            <button 
              onClick={() => window.location.href = '/pricing'}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 mb-8 shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Crown className="w-6 h-6 text-yellow-600" />
          <h2 className="text-xl font-semibold text-gray-800">Professional Palettes</h2>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Premium
          </span>
        </div>
        <button
          onClick={fetchProfessionalPalettes}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Load Palettes'}
        </button>
      </div>

      {palettes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {palettes.map((palette) => (
            <div 
              key={palette.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelectPalette(palette)}
            >
              <div className="flex h-24">
                {palette.colors.map((color, index) => {
                  const textColor = isLightColor(color.hex) ? 'text-gray-800' : 'text-white';
                  return (
                    <div
                      key={index}
                      className="flex-1 relative group"
                      style={{ backgroundColor: color.hex }}
                    >
                      <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${textColor}`}>
                        <span className="text-xs font-mono">{color.hex}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-gray-900 mb-1">{palette.name}</h3>
                <p className="text-sm text-gray-500">Click to apply this palette</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {palettes.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          <Crown className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>Click "Load Palettes" to view professional color combinations</p>
        </div>
      )}
    </div>
  );
}