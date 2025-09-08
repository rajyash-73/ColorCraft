import React, { useState, useRef, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Upload, Camera, Sun, Moon, Palette, User, Eye, Sparkles, RefreshCw, Download, Copy } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Color analysis utilities
const analyzeImageForSkinTone = async (imageData: string): Promise<{
  skinTone: string;
  undertone: string;
  dominantColors: string[];
}> => {
  // Simulate skin tone analysis - in a real app, this would use computer vision APIs
  const skinTones = ['fair', 'light', 'medium', 'tan', 'deep'];
  const undertones = ['cool', 'warm', 'neutral'];
  
  return {
    skinTone: skinTones[Math.floor(Math.random() * skinTones.length)],
    undertone: undertones[Math.floor(Math.random() * undertones.length)],
    dominantColors: ['#F4D2A5', '#E8B583', '#D4A574'] // Example skin tone colors
  };
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

// Clothing color recommendations based on skin tone and undertone
const getClothingRecommendations = (skinTone: string, undertone: string, hairColor: string, isDayTime: boolean) => {
  const recommendations = {
    // Cool undertone recommendations
    cool: {
      day: {
        primary: ['#2E5D8F', '#4A708B', '#5F9EA0', '#6495ED'],
        neutral: ['#F8F8FF', '#E6E6FA', '#D3D3D3', '#A9A9A9'],
        accent: ['#FF69B4', '#DA70D6', '#BA55D3', '#9370DB']
      },
      night: {
        primary: ['#191970', '#000080', '#483D8B', '#2F4F4F'],
        neutral: ['#2F2F2F', '#1C1C1C', '#0D0D0D', '#000000'],
        accent: ['#8A2BE2', '#4B0082', '#9400D3', '#8B008B']
      }
    },
    // Warm undertone recommendations  
    warm: {
      day: {
        primary: ['#CD853F', '#D2691E', '#A0522D', '#8B4513'],
        neutral: ['#FFF8DC', '#F5DEB3', '#DEB887', '#D2B48C'],
        accent: ['#FF6347', '#FF7F50', '#FF8C00', '#FFA500']
      },
      night: {
        primary: ['#8B4513', '#A0522D', '#654321', '#3D2B1F'],
        neutral: ['#2F1B14', '#1A0E0A', '#0F0907', '#000000'],
        accent: ['#B22222', '#DC143C', '#8B0000', '#800000']
      }
    },
    // Neutral undertone recommendations
    neutral: {
      day: {
        primary: ['#708090', '#778899', '#2F4F4F', '#36454F'],
        neutral: ['#F5F5F5', '#DCDCDC', '#C0C0C0', '#A9A9A9'],
        accent: ['#4682B4', '#5F9EA0', '#87CEEB', '#6495ED']
      },
      night: {
        primary: ['#2F4F4F', '#191970', '#000080', '#1C1C1C'],
        neutral: ['#2F2F2F', '#1C1C1C', '#0D0D0D', '#000000'],
        accent: ['#4B0082', '#483D8B', '#663399', '#800080']
      }
    }
  };

  const timeOfDay = isDayTime ? 'day' : 'night';
  return recommendations[undertone as keyof typeof recommendations]?.[timeOfDay] || recommendations.neutral[timeOfDay];
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
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Upload Your Photo
                  </CardTitle>
                  <CardDescription>
                    Upload a clear photo of your face for skin tone analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedImage ? (
                    <div className="relative">
                      <img 
                        src={selectedImage} 
                        alt="Uploaded face" 
                        className="w-full max-w-md mx-auto rounded-lg shadow-md"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setSelectedImage(null);
                          setAnalyzedData(null);
                          setRecommendations(null);
                        }}
                      >
                        Remove
                      </Button>
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
                </CardContent>
              </Card>

              {/* Hair Color Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Hair Color
                  </CardTitle>
                  <CardDescription>
                    Select your hair color for better recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>

              {/* Day/Night Toggle */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isDayTime ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    Occasion Setting
                  </CardTitle>
                  <CardDescription>
                    Choose between day and night color recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <Label htmlFor="time-toggle">Day</Label>
                    </div>
                    <Switch
                      id="time-toggle"
                      checked={!isDayTime}
                      onCheckedChange={(checked) => setIsDayTime(!checked)}
                    />
                    <div className="flex items-center gap-3">
                      <Label htmlFor="time-toggle">Night</Label>
                      <Moon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Results */}
              {analyzedData && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Skin Tone:</span>
                      <Badge variant="secondary" className="capitalize">
                        {analyzedData.skinTone}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Undertone:</span>
                      <Badge variant="outline" className="capitalize">
                        {analyzedData.undertone}
                      </Badge>
                    </div>
                    
                    <Button
                      onClick={handleGenerateRecommendations}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate New Recommendations
                    </Button>
                  </CardContent>
                </Card>
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Style Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
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
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <CardContent className="text-center">
                    <User className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Upload Your Photo to Get Started
                    </h3>
                    <p className="text-gray-400">
                      Upload a clear photo of your face to receive personalized clothing color recommendations
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer className="mt-16" />
    </div>
  );
}