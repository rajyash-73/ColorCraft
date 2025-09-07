import React, { useState } from 'react';
import { Crown, Camera, Palette, Upload, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { hexToRgb } from '@/lib/colorUtils';
import { Color } from '@/types/Color';

// Color recommendations based on skin tone and hair color
const COLOR_RECOMMENDATIONS = {
  skinTone: {
    fair: {
      warm: ['#FFF5E1', '#FFE5B4', '#FFC48C', '#FF8A65', '#A8E6CF'],
      cool: ['#F8F8FF', '#E6E6FA', '#DDA0DD', '#B19CD9', '#87CEEB'],
      neutral: ['#F5F5DC', '#E6E6E6', '#D3D3D3', '#C0C0C0', '#A9A9A9']
    },
    medium: {
      warm: ['#F4A460', '#DEB887', '#CD853F', '#D2691E', '#FF6347'],
      cool: ['#4682B4', '#5F9EA0', '#6495ED', '#7B68EE', '#9370DB'],
      neutral: ['#BC8F8F', '#F0E68C', '#DAA520', '#B8860B', '#CD853F']
    },
    dark: {
      warm: ['#8B4513', '#A0522D', '#CD853F', '#D2B48C', '#F0E68C'],
      cool: ['#2F4F4F', '#483D8B', '#4B0082', '#6A5ACD', '#7B68EE'],
      neutral: ['#696969', '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3']
    }
  },
  hairColor: {
    blonde: ['#FFE135', '#F4D03F', '#F7DC6F', '#FCDC00', '#FFD700'],
    brown: ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#BC8F8F'],
    black: ['#000000', '#2F2F2F', '#4A4A4A', '#696969', '#808080'],
    red: ['#DC143C', '#B22222', '#CD5C5C', '#F08080', '#FF6347'],
    gray: ['#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC']
  }
};

export default function ClothColorPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedSkinTone, setSelectedSkinTone] = useState<string>('');
  const [selectedUndertone, setSelectedUndertone] = useState<string>('');
  const [selectedHairColor, setSelectedHairColor] = useState<string>('');
  const [generatedPalette, setGeneratedPalette] = useState<Color[]>([]);
  const [loading, setLoading] = useState(false);

  const isPremium = true; // All features are now free

  const generateClothPalette = () => {
    if (!selectedSkinTone || !selectedUndertone || !selectedHairColor) {
      toast({
        title: "Missing Selection",
        description: "Please select your skin tone, undertone, and hair color.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const skinColors = COLOR_RECOMMENDATIONS.skinTone[selectedSkinTone as keyof typeof COLOR_RECOMMENDATIONS.skinTone][selectedUndertone as keyof typeof COLOR_RECOMMENDATIONS.skinTone.fair];
      const hairColors = COLOR_RECOMMENDATIONS.hairColor[selectedHairColor as keyof typeof COLOR_RECOMMENDATIONS.hairColor];
      
      // Combine and select best colors
      const combinedColors = [...skinColors.slice(0, 3), ...hairColors.slice(0, 2)];
      
      const palette: Color[] = combinedColors.map(hex => ({
        hex,
        rgb: hexToRgb(hex) || { r: 0, g: 0, b: 0 },
        locked: false,
        name: getColorName(hex)
      }));

      setGeneratedPalette(palette);
      setLoading(false);

      toast({
        title: "Palette Generated!",
        description: "Your personalized cloth color palette is ready.",
      });
    }, 2000);
  };

  const getColorName = (hex: string): string => {
    const colorNames: { [key: string]: string } = {
      '#FFF5E1': 'Cream',
      '#FFE5B4': 'Peach',
      '#F4A460': 'Sandy Brown',
      '#8B4513': 'Saddle Brown',
      '#FFE135': 'Golden Yellow',
      '#DC143C': 'Crimson',
      '#000000': 'Black',
      '#808080': 'Gray'
    };
    return colorNames[hex] || 'Color';
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <button className="text-blue-600 hover:text-blue-800 mb-4">← Back to Generator</button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Cloth Color Recommendations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get personalized color recommendations based on your skin tone and hair color.
          </p>
        </div>

        {/* Selection Form */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-md">
          <h2 className="text-xl font-semibold mb-6">Tell us about yourself</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skin Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skin Tone</label>
              <select
                value={selectedSkinTone}
                onChange={(e) => setSelectedSkinTone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select skin tone</option>
                <option value="fair">Fair</option>
                <option value="medium">Medium</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Undertone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Undertone</label>
              <select
                value={selectedUndertone}
                onChange={(e) => setSelectedUndertone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select undertone</option>
                <option value="warm">Warm</option>
                <option value="cool">Cool</option>
                <option value="neutral">Neutral</option>
              </select>
            </div>

            {/* Hair Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hair Color</label>
              <select
                value={selectedHairColor}
                onChange={(e) => setSelectedHairColor(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select hair color</option>
                <option value="blonde">Blonde</option>
                <option value="brown">Brown</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="gray">Gray/Silver</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateClothPalette}
            disabled={loading || !selectedSkinTone || !selectedUndertone || !selectedHairColor}
            className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Analyzing your features...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate My Palette
              </>
            )}
          </button>
        </div>

        {/* Generated Palette */}
        {generatedPalette.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Personalized Cloth Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {generatedPalette.map((color, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-full h-24 rounded-lg border border-gray-200 mb-2"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <p className="text-sm font-medium text-gray-900">{color.name}</p>
                  <p className="text-xs text-gray-500">{color.hex}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Styling Tips:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use these colors as your foundation pieces</li>
                <li>• Mix and match within this palette for coordinated looks</li>
                <li>• Add neutral colors like white, black, or gray as accents</li>
                <li>• These colors will enhance your natural beauty and skin tone</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}