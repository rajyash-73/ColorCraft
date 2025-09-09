import React, { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Upload, Camera, Sun, Moon, Palette, User, Eye, Sparkles, RefreshCw, Download, Copy } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Using plain components instead of shadcn UI for compatibility

// Color analysis utilities
const analyzeImageForSkinTone = async (imageData: string): Promise<{
  skinTone: string;
  undertone: string;
  dominantColors: string[];
}> => {
  // Enhanced skin tone analysis - uses image characteristics for better results
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      // Sample pixels from center area (face region)
      const centerX = Math.floor(img.width / 2);
      const centerY = Math.floor(img.height / 2);
      const sampleSize = Math.min(img.width, img.height) / 4;
      
      let totalR = 0, totalG = 0, totalB = 0, sampleCount = 0;
      
      for (let x = centerX - sampleSize/2; x < centerX + sampleSize/2; x += 10) {
        for (let y = centerY - sampleSize/2; y < centerY + sampleSize/2; y += 10) {
          const imageData = ctx?.getImageData(x, y, 1, 1);
          if (imageData) {
            totalR += imageData.data[0];
            totalG += imageData.data[1];
            totalB += imageData.data[2];
            sampleCount++;
          }
        }
      }
      
      const avgR = totalR / sampleCount;
      const avgG = totalG / sampleCount;
      const avgB = totalB / sampleCount;
      
      // Determine skin tone based on RGB values
      const brightness = (avgR + avgG + avgB) / 3;
      let skinTone: string;
      if (brightness > 200) skinTone = 'fair';
      else if (brightness > 160) skinTone = 'light';
      else if (brightness > 120) skinTone = 'medium';
      else if (brightness > 80) skinTone = 'tan';
      else skinTone = 'deep';
      
      // Determine undertone based on color ratios
      const yellowness = avgR + avgG - avgB * 2;
      const pinkness = avgR - avgG;
      
      let undertone: string;
      if (Math.abs(yellowness) < 10 && Math.abs(pinkness) < 10) {
        undertone = 'neutral';
      } else if (yellowness > pinkness) {
        undertone = 'warm';
      } else {
        undertone = 'cool';
      }
      
      resolve({
        skinTone,
        undertone,
        dominantColors: [`rgb(${Math.floor(avgR)}, ${Math.floor(avgG)}, ${Math.floor(avgB)})`]
      });
    };
    
    img.src = imageData;
  });
};

// Hair color options
const hairColorOptions = [
  { value: 'black', label: 'Black', color: '#2C1B18' },
  { value: 'brown', label: 'Brown', color: '#8B4513' },
  { value: 'blonde', label: 'Blonde', color: '#F4C2A1' },
  { value: 'red', label: 'Red', color: '#B22222' },
  { value: 'gray', label: 'Gray', color: '#808080' },
  { value: 'white', label: 'White', color: '#FFFFFF' },
  { value: 'other', label: 'Other', color: '#A0A0A0' }
];

// Enhanced clothing color recommendations based on skin tone, undertone, and hair color
const getClothingRecommendations = (skinTone: string, undertone: string, hairColor: string, isDayTime: boolean) => {
  
  // Base color palettes following professional color analysis principles
  const colorPalettes = {
    cool: {
      day: {
        primary: ['#1e3a8a', '#1e40af', '#3b82f6', '#0ea5e9'], // True blues
        secondary: ['#7c3aed', '#8b5cf6', '#a855f7', '#c084fc'], // Cool purples  
        neutral: ['#ffffff', '#f8fafc', '#e2e8f0', '#94a3b8'], // Cool grays & whites
        accent: ['#ec4899', '#f97316', '#10b981', '#06b6d4'], // Bright cool accents
        earth: ['#059669', '#0d9488', '#0891b2', '#0284c7'] // Cool earth tones
      },
      evening: {
        primary: ['#1e1b4b', '#312e81', '#3730a3', '#4338ca'], // Deep blues
        secondary: ['#581c87', '#7c2d92', '#86198f', '#a21caf'], // Rich purples
        neutral: ['#1f2937', '#374151', '#4b5563', '#6b7280'], // Sophisticated grays
        accent: ['#dc2626', '#ea580c', '#059669', '#0891b2'], // Jewel accents
        metallic: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'] // Cool metallics
      }
    },
    warm: {
      day: {
        primary: ['#dc2626', '#ea580c', '#d97706', '#ca8a04'], // Warm reds & oranges
        secondary: ['#92400e', '#a16207', '#a3a3a3', '#525252'], // Warm browns
        neutral: ['#fef7cd', '#fef3c7', '#fde68a', '#f59e0b'], // Warm creams
        accent: ['#f97316', '#f59e0b', '#eab308', '#84cc16'], // Bright warm accents  
        earth: ['#92400e', '#a16207', '#a3a3a3', '#78716c'] // Warm earth tones
      },
      evening: {
        primary: ['#7f1d1d', '#92400e', '#a16207', '#713f12'], // Deep warm tones
        secondary: ['#451a03', '#78350f', '#a16207', '#ca8a04'], // Rich browns & golds
        neutral: ['#44403c', '#57534e', '#78716c', '#a8a29e'], // Warm grays
        accent: ['#dc2626', '#ea580c', '#059669', '#0d9488'], // Sophisticated accents
        metallic: ['#f59e0b', '#eab308', '#ca8a04', '#a16207'] // Warm metallics
      }
    },
    neutral: {
      day: {
        primary: ['#374151', '#4b5563', '#6b7280', '#9ca3af'], // True grays
        secondary: ['#1e40af', '#dc2626', '#059669', '#7c2d92'], // Balanced colors
        neutral: ['#ffffff', '#f9fafb', '#f3f4f6', '#d1d5db'], // Pure neutrals
        accent: ['#3b82f6', '#ef4444', '#10b981', '#8b5cf6'], // Universal accents
        earth: ['#78716c', '#a8a29e', '#d6d3d1', '#e7e5e4'] // Neutral earth tones
      },
      evening: {
        primary: ['#1f2937', '#374151', '#4b5563', '#6b7280'], // Deep neutrals  
        secondary: ['#312e81', '#7f1d1d', '#064e3b', '#581c87'], // Evening jewel tones
        neutral: ['#111827', '#1f2937', '#374151', '#4b5563'], // Sophisticated darks
        accent: ['#4338ca', '#dc2626', '#059669', '#7c2d92'], // Rich accents
        metallic: ['#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6'] // Neutral metallics
      }
    }
  };

  // Hair color modifications
  const getHairColorAdjustments = (hairColor: string, baseColors: any) => {
    const adjustments = { ...baseColors };
    
    switch (hairColor) {
      case 'blonde':
        // Blonde hair looks great with soft, muted colors
        if (undertone === 'warm') {
          adjustments.accent = ['#f97316', '#fbbf24', '#a3a3a3', '#f59e0b'];
          adjustments.primary = ['#dc2626', '#ea580c', '#ca8a04', '#92400e'];
        } else if (undertone === 'cool') {
          adjustments.accent = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];
          adjustments.primary = ['#1e40af', '#7c3aed', '#0ea5e9', '#1e3a8a'];
        }
        break;
        
      case 'red':
        // Red hair pairs beautifully with greens, earth tones, avoid competing reds
        adjustments.accent = ['#059669', '#0d9488', '#0891b2', '#7c2d92'];
        adjustments.earth = ['#78716c', '#92400e', '#a16207', '#525252'];
        // Remove competing reds from primary
        adjustments.primary = adjustments.primary.filter((color: string) => 
          !color.includes('dc2626') && !color.includes('ef4444')
        );
        break;
        
      case 'black':
        // Black hair can handle bold, dramatic colors
        adjustments.accent = ['#dc2626', '#7c3aed', '#059669', '#f97316'];
        adjustments.primary = [...adjustments.primary, '#1a1a1a', '#0f172a'];
        break;
        
      case 'brown':
        // Brown hair is versatile, enhance earth tones
        adjustments.earth = ['#92400e', '#a16207', '#78716c', '#a8a29e'];
        break;
        
      case 'gray':
      case 'white':
        // Silver/white hair looks stunning with jewel tones and soft colors
        adjustments.accent = ['#7c3aed', '#0ea5e9', '#ec4899', '#059669'];
        adjustments.metallic = ['#6366f1', '#8b5cf6', '#06b6d4', '#a855f7'];
        break;
    }
    
    return adjustments;
  };

  // Skin tone intensity adjustments
  const getSkinToneAdjustments = (skinTone: string, colors: any) => {
    const adjustments = { ...colors };
    
    switch (skinTone) {
      case 'fair':
        // Fair skin looks great with soft, medium-intensity colors
        adjustments.primary = adjustments.primary.map((color: string) => 
          color.replace(/1e|0f|7f|45/g, '3b').replace(/81|92|a1/g, '94')
        );
        break;
        
      case 'deep':
        // Deep skin tones can handle bold, vibrant colors
        adjustments.accent = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
        adjustments.primary = [...adjustments.primary, '#1a1a1a', '#0f172a'];
        break;
        
      case 'medium':
      case 'tan':
        // Medium skin tones look great with rich, warm colors
        if (undertone === 'warm') {
          adjustments.earth = ['#92400e', '#a16207', '#ca8a04', '#78716c'];
        }
        break;
    }
    
    return adjustments;
  };

  const timeOfDay = isDayTime ? 'day' : 'evening';
  let baseColors = colorPalettes[undertone as keyof typeof colorPalettes]?.[timeOfDay] || 
                   colorPalettes.neutral[timeOfDay];
  
  // Apply hair color adjustments
  baseColors = getHairColorAdjustments(hairColor, baseColors);
  
  // Apply skin tone adjustments  
  baseColors = getSkinToneAdjustments(skinTone, baseColors);
  
  // Return organized palette
  return {
    primary: baseColors.primary.slice(0, 4),
    neutral: baseColors.neutral.slice(0, 4), 
    accent: baseColors.accent.slice(0, 4)
  };
};

export default function ClothingPalettePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzedData, setAnalyzedData] = useState<{
    skinTone: string;
    undertone: string;
    dominantColors: string[];
  } | null>(null);
  const [selectedHairColor, setSelectedHairColor] = useState<string>('brown');
  const [isDayTime, setIsDayTime] = useState<boolean>(true);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create image preview
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setSelectedImage(imageData);
      
      // Analyze the image
      setIsAnalyzing(true);
      try {
        const analysis = await analyzeImageForSkinTone(imageData);
        setAnalyzedData(analysis);
        generateRecommendations(analysis.skinTone, analysis.undertone, selectedHairColor, isDayTime);
      } catch (error) {
        console.error('Error analyzing image:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  }, [selectedHairColor, isDayTime]);

  const generateRecommendations = (skinTone: string, undertone: string, hairColor: string, dayTime: boolean) => {
    const recs = getClothingRecommendations(skinTone, undertone, hairColor, dayTime);
    setRecommendations(recs);
  };

  const handleGenerateRecommendations = () => {
    if (analyzedData) {
      generateRecommendations(analyzedData.skinTone, analyzedData.undertone, selectedHairColor, isDayTime);
    }
  };

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
  };

  const ColorPalette = ({ colors, title }: { colors: string[], title: string }) => (
    <div className="mb-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="grid grid-cols-4 gap-3">
        {colors.map((color, index) => (
          <div key={index} className="group">
            <div 
              className="w-full h-16 rounded-lg cursor-pointer transition-transform hover:scale-105 shadow-md"
              style={{ backgroundColor: color }}
              onClick={() => copyColorToClipboard(color)}
              title={`Click to copy ${color}`}
            />
            <p className="text-xs text-center mt-1 font-mono text-gray-600 group-hover:text-gray-900 transition-colors">
              {color}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Helmet>
        <title>Clothing Color Palette Creator - Personalized Style Recommendations</title>
        <meta name="description" content="Get personalized clothing color recommendations based on your skin tone, hair color, and occasion. Upload your photo for AI-powered style analysis." />
        <meta name="keywords" content="clothing colors, personal style, skin tone analysis, fashion colors, color matching" />
      </Helmet>

      <Header 
        onHelp={() => {}} 
        onExport={() => {}} 
        onSave={() => {}}
        onVisualize={() => {}}
        mobileMenuOpen={false}
        toggleMobileMenu={() => {}}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Clothing Color Palette Creator
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your perfect clothing colors based on your unique skin tone, hair color, and lifestyle
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Input Section */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Upload Your Photo
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Upload a clear photo of your face for skin tone analysis
                </p>
                <div className="space-y-4">
                  {selectedImage ? (
                    <div className="relative">
                      <img 
                        src={selectedImage} 
                        alt="Uploaded face" 
                        className="w-full max-w-md mx-auto rounded-lg shadow-md"
                      />
                      <button
                        className="absolute top-2 right-2 px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                        onClick={() => {
                          setSelectedImage(null);
                          setAnalyzedData(null);
                          setRecommendations(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-purple-400 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">Click to upload your photo</p>
                      <p className="text-sm text-gray-400 mt-2">JPG, PNG up to 10MB</p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {isAnalyzing && (
                    <div className="flex items-center justify-center gap-2 text-purple-600">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing skin tone...
                    </div>
                  )}
                </div>
              </div>

              {/* Hair Color Selection */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Hair Color
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Select your hair color for better recommendations
                </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {hairColorOptions.map((option) => (
                      <button
                        key={option.value}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          selectedHairColor === option.value 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedHairColor(option.value)}
                      >
                        <div 
                          className="w-8 h-8 rounded-full mx-auto mb-2 border border-gray-300"
                          style={{ backgroundColor: option.color }}
                        />
                        <p className="text-xs font-medium">{option.label}</p>
                      </button>
                    ))}
                  </div>
              </div>

              {/* Day/Night Toggle */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  {isDayTime ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  Occasion Setting
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Choose between day and night color recommendations
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <label htmlFor="time-toggle" className="font-medium">Day</label>
                  </div>
                  <button
                    id="time-toggle"
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      isDayTime ? 'bg-gray-300' : 'bg-blue-600'
                    }`}
                    onClick={() => setIsDayTime(!isDayTime)}
                  >
                    <div
                      className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                        isDayTime ? 'left-0.5' : 'left-6'
                      }`}
                    />
                  </button>
                  <div className="flex items-center gap-3">
                    <label htmlFor="time-toggle" className="font-medium">Night</label>
                    <Moon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              {analyzedData && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Analysis Results
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Skin Tone:</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium capitalize">
                        {analyzedData.skinTone}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Undertone:</span>
                      <span className="px-3 py-1 border border-gray-300 text-gray-700 rounded-full text-sm font-medium capitalize">
                        {analyzedData.undertone}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleGenerateRecommendations}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Generate New Recommendations
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Recommendations */}
            <div>
              {recommendations ? (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Your Personalized Color Palette
                    </h2>
                    <p className="text-gray-600">
                      {isDayTime ? 'Daytime' : 'Evening'} colors that complement your features
                    </p>
                  </div>

                  <ColorPalette colors={recommendations.primary} title="Primary Colors" />
                  <ColorPalette colors={recommendations.neutral} title="Neutral Colors" />
                  <ColorPalette colors={recommendations.accent} title="Accent Colors" />

                  {/* Style Tips */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Style Tips
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">How to Use These Colors:</h4>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Use <strong>Primary colors</strong> for main clothing pieces</li>
                          <li>• Use <strong>Neutral colors</strong> as your base wardrobe</li>
                          <li>• Use <strong>Accent colors</strong> for accessories and details</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Best Combinations:</h4>
                        <p className="text-sm text-gray-600">
                          Try pairing neutral bases with primary pieces and accent accessories
                          for a balanced, harmonious look.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-lg p-12 border border-gray-100 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Upload Your Photo to Get Started
                    </h3>
                    <p className="text-gray-400">
                      Upload a clear photo of your face to receive personalized clothing color recommendations
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer className="mt-16" />
    </div>
  );
}