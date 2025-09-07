import React, { useState, useEffect } from 'react';
import { Shirt, User, Palette, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Color theory data for clothing recommendations
const SKIN_TONES = [
  { id: 'very-fair', name: 'Very Fair', description: 'Porcelain, very light with pink or neutral undertones' },
  { id: 'fair', name: 'Fair', description: 'Light skin that burns easily, light freckles possible' },
  { id: 'light', name: 'Light', description: 'Light skin that tans gradually, may have freckles' },
  { id: 'medium', name: 'Medium', description: 'Medium skin that tans well, rarely burns' },
  { id: 'tan', name: 'Tan', description: 'Olive or golden medium skin that tans easily' },
  { id: 'deep', name: 'Deep', description: 'Rich, deep skin tones with warm or cool undertones' },
  { id: 'very-deep', name: 'Very Deep', description: 'Very deep, rich skin tones' },
];

const HAIR_COLORS = [
  { id: 'platinum', name: 'Platinum Blonde', hex: '#F5F5DC' },
  { id: 'blonde', name: 'Blonde', hex: '#D4AF37' },
  { id: 'light-brown', name: 'Light Brown', hex: '#8B4513' },
  { id: 'medium-brown', name: 'Medium Brown', hex: '#654321' },
  { id: 'dark-brown', name: 'Dark Brown', hex: '#3C2414' },
  { id: 'black', name: 'Black', hex: '#1C1C1C' },
  { id: 'auburn', name: 'Auburn', hex: '#A52A2A' },
  { id: 'red', name: 'Red', hex: '#DC143C' },
  { id: 'gray', name: 'Gray/Silver', hex: '#808080' },
  { id: 'white', name: 'White', hex: '#F8F8FF' },
];

const UNDERTONES = [
  { id: 'warm', name: 'Warm', description: 'Golden, yellow, or peachy undertones. Veins appear greenish.' },
  { id: 'cool', name: 'Cool', description: 'Pink, red, or blue undertones. Veins appear bluish.' },
  { id: 'neutral', name: 'Neutral', description: 'Balance of warm and cool undertones. Veins appear blue-green.' },
];

// Color palette recommendations based on analysis
const COLOR_RECOMMENDATIONS = {
  warm: {
    excellent: ['#FF6B35', '#F7931E', '#FFD23F', '#8B4513', '#CD853F', '#DEB887', '#BC8F8F'],
    good: ['#FF4500', '#FF8C00', '#DAA520', '#B8860B', '#A0522D', '#D2691E', '#F4A460'],
    avoid: ['#4169E1', '#0000FF', '#8A2BE2', '#4B0082', '#6A5ACD', '#00CED1', '#20B2AA'],
  },
  cool: {
    excellent: ['#4169E1', '#0000FF', '#8A2BE2', '#4B0082', '#6A5ACD', '#00CED1', '#20B2AA'],
    good: ['#1E90FF', '#6495ED', '#7B68EE', '#9370DB', '#48D1CC', '#40E0D0', '#5F9EA0'],
    avoid: ['#FF6B35', '#F7931E', '#FFD23F', '#FF4500', '#FF8C00', '#DAA520', '#B8860B'],
  },
  neutral: {
    excellent: ['#708090', '#2F4F4F', '#696969', '#A9A9A9', '#DCDCDC', '#F5F5F5', '#FFFFFF'],
    good: ['#8FBC8F', '#9ACD32', '#32CD32', '#228B22', '#006400', '#8B4513', '#A0522D'],
    avoid: [],
  },
};

interface ClothingRecommendation {
  category: string;
  colors: string[];
  tips: string[];
}

function generateClothingPalette(skinTone: string, hairColor: string, undertone: string): ClothingRecommendation[] {
  const baseColors = COLOR_RECOMMENDATIONS[undertone as keyof typeof COLOR_RECOMMENDATIONS];
  
  const recommendations: ClothingRecommendation[] = [
    {
      category: 'Everyday Neutrals',
      colors: undertone === 'warm' 
        ? ['#8B4513', '#DEB887', '#F5E6D3', '#CD853F', '#D2691E']
        : undertone === 'cool'
        ? ['#2F4F4F', '#708090', '#F8F8FF', '#B0C4DE', '#4682B4']
        : ['#696969', '#A9A9A9', '#F5F5F5', '#DCDCDC', '#708090'],
      tips: undertone === 'warm' 
        ? ['Choose warm beiges and camel', 'Opt for ivory over stark white', 'Brown-based grays work best']
        : undertone === 'cool'
        ? ['True white and cool grays', 'Navy and charcoal are perfect', 'Avoid yellow-based neutrals']
        : ['Any neutral works for you', 'Mix warm and cool neutrals', 'Great foundation for colorful pieces'],
    },
    {
      category: 'Bold Statement Colors',
      colors: baseColors.excellent.slice(0, 5),
      tips: undertone === 'warm'
        ? ['Rich oranges and corals', 'Golden yellows and warm reds', 'Avoid cool blues and purples']
        : undertone === 'cool'
        ? ['True reds and berry tones', 'Royal blues and emerald greens', 'Avoid orange-based colors']
        : ['You can wear most colors', 'Focus on saturation that suits your contrast', 'Mix warm and cool tones freely'],
    },
    {
      category: 'Professional Palette',
      colors: undertone === 'warm'
        ? ['#8B4513', '#A0522D', '#CD853F', '#2F4F4F', '#F5E6D3']
        : undertone === 'cool'
        ? ['#2F4F4F', '#4682B4', '#708090', '#FFFFFF', '#B0C4DE']
        : ['#2F4F4F', '#696969', '#8B4513', '#FFFFFF', '#A9A9A9'],
      tips: undertone === 'warm'
        ? ['Warm browns and navy', 'Cream shirts over stark white', 'Golden jewelry complements']
        : undertone === 'cool'
        ? ['Navy, charcoal, and true grays', 'Crisp white shirts', 'Silver jewelry works best']
        : ['Any professional color works', 'Both gold and silver jewelry', 'Focus on fit and quality'],
    },
  ];

  // Adjust recommendations based on hair color
  if (hairColor === 'red' || hairColor === 'auburn') {
    recommendations[1].tips.push('Avoid competing reds - choose complementary greens and blues');
  }
  
  if (hairColor === 'gray' || hairColor === 'white') {
    recommendations[0].tips.push('Embrace bold colors to create contrast with your beautiful hair');
  }

  return recommendations;
}

export default function ClothingPalettePage() {
  const [skinTone, setSkinTone] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [undertone, setUndertone] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<ClothingRecommendation[]>([]);

  const handleAnalyze = () => {
    if (skinTone && hairColor && undertone) {
      const results = generateClothingPalette(skinTone, hairColor, undertone);
      setRecommendations(results);
      setShowResults(true);
    }
  };

  const resetAnalysis = () => {
    setSkinTone('');
    setHairColor('');
    setUndertone('');
    setShowResults(false);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shirt className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Clothing Palette Generator</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover your perfect clothing colors based on your skin tone, hair color, and undertone. 
              Get personalized recommendations that enhance your natural beauty.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <div className="space-y-8">
            {/* Skin Tone Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Step 1: Select Your Skin Tone</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SKIN_TONES.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSkinTone(tone.id)}
                      className={`text-left p-4 rounded-lg border-2 transition-all ${
                        skinTone === tone.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{tone.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{tone.description}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hair Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Step 2: Select Your Hair Color</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {HAIR_COLORS.map((hair) => (
                    <button
                      key={hair.id}
                      onClick={() => setHairColor(hair.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        hairColor === hair.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div 
                        className="w-full h-6 rounded mb-2"
                        style={{ backgroundColor: hair.hex }}
                      />
                      <div className="text-sm font-medium text-gray-900">{hair.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Undertone Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Step 3: Determine Your Undertone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <strong>Quick tip:</strong> Look at your wrist veins in natural light. 
                        Green = warm, blue = cool, blue-green = neutral.
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {UNDERTONES.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setUndertone(tone.id)}
                      className={`text-left p-4 rounded-lg border-2 transition-all ${
                        undertone === tone.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900 mb-2">{tone.name}</div>
                      <div className="text-sm text-gray-600">{tone.description}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Analyze Button */}
            <div className="text-center">
              <Button
                onClick={handleAnalyze}
                disabled={!skinTone || !hairColor || !undertone}
                size="lg"
                className="px-8 py-3"
              >
                <Palette className="h-5 w-5 mr-2" />
                Generate My Clothing Palette
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Personal Clothing Palette</h2>
              <p className="text-gray-600 mb-6">
                Based on your {SKIN_TONES.find(t => t.id === skinTone)?.name.toLowerCase()} skin tone, 
                {' '}{HAIR_COLORS.find(h => h.id === hairColor)?.name.toLowerCase()} hair, 
                and {undertone} undertone.
              </p>
              <Button onClick={resetAnalysis} variant="outline">
                Start Over
              </Button>
            </div>

            {/* Color Recommendations */}
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{rec.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-3 mb-4">
                      {rec.colors.map((color, colorIndex) => (
                        <div key={colorIndex} className="text-center">
                          <div 
                            className="w-full h-16 rounded-lg border border-gray-200 mb-2"
                            style={{ backgroundColor: color }}
                          />
                          <div className="text-xs text-gray-600 font-mono">{color}</div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Styling Tips:</h4>
                      <ul className="space-y-1">
                        {rec.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Tips */}
            <Card>
              <CardHeader>
                <CardTitle>General Styling Tips for You</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p><strong>Jewelry:</strong> {undertone === 'warm' ? 'Gold and warm metals' : undertone === 'cool' ? 'Silver and cool metals' : 'Both gold and silver work beautifully'} complement your undertone.</p>
                  <p><strong>Makeup:</strong> Choose foundation and lipstick shades that match your {undertone} undertone for the most flattering look.</p>
                  <p><strong>Patterns:</strong> When wearing patterns, ensure the dominant colors align with your recommended palette.</p>
                  <p><strong>Contrast:</strong> {hairColor === 'black' || hairColor === 'dark-brown' ? 'Your dark hair creates beautiful contrast - you can wear bold colors confidently' : hairColor === 'blonde' || hairColor === 'platinum' ? 'Your light hair pairs beautifully with both soft and bold colors' : 'Experiment with different color intensities to find what makes you feel most confident'}.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}