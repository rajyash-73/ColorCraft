import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Palette, Smartphone, Monitor, Chrome, Download, Star, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const handleGetStarted = () => {
    window.location.href = '/generator';
  };

  const handleExplorePalettes = () => {
    window.location.href = '/saved-palettes';
  };

  // Animated Color Palette Showcase Component
  const AnimatedPaletteShowcase = () => {
    const [currentSet, setCurrentSet] = useState(0);
    
    const paletteSets = [
      [
        ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'],
        ['#6C5CE7', '#A29BFE', '#FD79A8', '#E17055', '#00B894'],
        ['#2D3436', '#636E72', '#DDD', '#74B9FF', '#00CEC9'],
        ['#FF7675', '#FD79A8', '#FDCB6E', '#6C5CE7', '#74B9FF']
      ],
      [
        ['#1ABC9C', '#2ECC71', '#3498DB', '#9B59B6', '#E74C3C'],
        ['#F39C12', '#E67E22', '#D35400', '#C0392B', '#8E44AD'],
        ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7'],
        ['#E8F5E8', '#FFF3CD', '#D1ECF1', '#F8D7DA', '#E2E3E5']
      ],
      [
        ['#FF9FF3', '#F368E0', '#FF6B6B', '#4ECDC4', '#45B7D1'],
        ['#A8E6CF', '#FFD93D', '#6BCF7F', '#4D96FF', '#9B59B6'],
        ['#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'],
        ['#F8BBD9', '#E8F5E8', '#FFF8DC', '#E6E6FA', '#F0F8FF']
      ]
    ];
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSet((prev) => (prev + 1) % paletteSets.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }, []);
    
    return (
      <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Endless Palette Possibilities</h3>
            <p className="text-gray-600">Discover thousands of beautiful color combinations</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {paletteSets[currentSet].map((palette, paletteIndex) => (
              <div 
                key={`${currentSet}-${paletteIndex}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:scale-105 animate-fade-in"
                style={{
                  animationDelay: `${paletteIndex * 0.1}s`
                }}
              >
                <div className="flex h-20">
                  {palette.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="flex-1 transition-all duration-300 hover:scale-110 relative group"
                      style={{ backgroundColor: color }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {color}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 text-center">
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {paletteSets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSet(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSet 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <div className="text-center mt-6">
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Creating Palettes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Helmet>
        <title>Coolors.in - The Super Fast Color Palette Generator!</title>
        <meta name="description" content="Create the perfect palette or get inspired by thousands of beautiful color schemes. The super fast color palette generator for designers and developers." />
        <meta name="keywords" content="color palette generator, color schemes, design tools, color combinations, web design, ui design" />
        <link rel="canonical" href="https://coolors.in/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Coolors.in - The Super Fast Color Palette Generator!" />
        <meta property="og:description" content="Create the perfect palette or get inspired by thousands of beautiful color schemes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://coolors.in/" />
        <meta property="og:image" content="https://coolors.in/og-image.jpg" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Coolors.in Color Palette Generator",
            "url": "https://coolors.in/",
            "description": "Create the perfect palette or get inspired by thousands of beautiful color schemes",
            "applicationCategory": "DesignApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Person",
              "name": "Yash"
            }
          })}
        </script>
      </Helmet>

      {/* Header */}
      <Header 
        onHelp={() => {}} 
        onExport={() => {}} 
        onSave={() => {}}
        onVisualize={() => {}}
        mobileMenuOpen={false}
        toggleMobileMenu={() => {}}
      />

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            The super fast color
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              palette generator!
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Create the perfect palette or get inspired by thousands of beautiful color schemes.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={handleGetStarted}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              Start the generator!
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </button>
            
            <button
              onClick={handleExplorePalettes}
              className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore trending palettes
            </button>
          </div>
          
        </div>

        {/* Animated Palette Showcase */}
        <section className="mb-20">
          <style>
            {`
              @keyframes fade-in {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-fade-in {
                animation: fade-in 0.8s ease-in-out both;
              }
            `}
          </style>
          <AnimatedPaletteShowcase />
        </section>

        {/* Apps & Tools Showcase */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Color Palette Generator */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Palette Generator</h3>
              <p className="text-gray-600 text-sm mb-4">
                Create beautiful color palettes with advanced algorithms and color theory.
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
              >
                Start creating →
              </button>
            </div>

            {/* Clothing Color Palette */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Clothing Colors</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get personalized clothing color recommendations based on your skin tone.
              </p>
              <button 
                onClick={() => window.location.href = '/clothing-palette'}
                className="text-purple-600 font-medium text-sm hover:text-purple-700 transition-colors"
              >
                Try now →
              </button>
            </div>

            {/* Visualizer */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Visualizer</h3>
              <p className="text-gray-600 text-sm mb-4">
                See your color palettes in action with real-time mockups and previews.
              </p>
              <button 
                onClick={() => window.location.href = '/visualize'}
                className="text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
              >
                Visualize →
              </button>
            </div>

            {/* Image to Palette */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Image to Palette</h3>
              <p className="text-gray-600 text-sm mb-4">
                Extract beautiful color palettes from any image you upload.
              </p>
              <button 
                onClick={() => window.location.href = '/image-palette'}
                className="text-orange-600 font-medium text-sm hover:text-orange-700 transition-colors"
              >
                Extract colors →
              </button>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <Users className="w-6 h-6 text-gray-600 mr-2" />
            <p className="text-gray-600 font-medium">
              Used by thousands of designers and developers worldwide
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Generation</h3>
            <p className="text-gray-600">
              Our advanced algorithms create harmonious color combinations that work perfectly together.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Monitor className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Live Preview</h3>
            <p className="text-gray-600">
              See your colors in action with our real-time visualization tools and UI mockups.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Export</h3>
            <p className="text-gray-600">
              Export your palettes in any format you need for your design workflow.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to create amazing palettes?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of designers who trust Coolors.in for their color needs.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Start Creating Now
          </button>
        </section>
      </main>

      <Footer className="mt-20" />
    </div>
  );
}