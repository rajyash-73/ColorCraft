import React from "react";
import { Helmet } from "react-helmet-async";
import { Palette, Users, Star, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClothingColorGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Helmet>
        <title>Clothing Color Palette Creator Guide - Find Your Perfect Colors | Coolors.in</title>
        <meta name="description" content="Discover how to use our clothing color palette creator to find the perfect colors for your wardrobe based on your skin tone, undertones, and personal style." />
        <meta name="keywords" content="clothing color palette, skin tone colors, wardrobe colors, fashion color theory, personal color analysis, outfit color combinations, clothing color guide" />
        <link rel="canonical" href="https://coolors.in/clothing-color-guide" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Clothing Color Palette Creator Guide - Find Your Perfect Colors" />
        <meta property="og:description" content="Learn how to find the perfect clothing colors for your skin tone with our comprehensive guide to personal color analysis." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://coolors.in/clothing-color-guide" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Clothing Color Palette Creator Guide - Find Your Perfect Colors",
            "description": "Comprehensive guide to using our clothing color palette creator for personal color analysis",
            "author": {
              "@type": "Person",
              "name": "Yash"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Coolors.in"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://coolors.in/clothing-color-guide"
            }
          })}
        </script>
      </Helmet>

      <Header 
        onHelp={() => {}} 
        onExport={() => {}} 
        onSave={() => {}}
        onVisualize={() => {}}
        mobileMenuOpen={false}
        toggleMobileMenu={() => {}}
      />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Clothing Color Palette Creator
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Find Your Perfect Colors
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the clothing colors that make you look and feel your best with our AI-powered personal color analysis tool.
          </p>
          
          <button
            onClick={() => window.location.href = '/clothing-palette'}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto"
          >
            Try the Tool Now
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>

        {/* What is Personal Color Analysis */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Personal Color Analysis?</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Personal color analysis is the science of determining which colors complement your natural coloring - your skin tone, undertones, hair color, and eye color. Our clothing color palette creator uses advanced algorithms to analyze your photo and recommend colors that will:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Enhance Your Natural Beauty</h3>
                    <p className="text-gray-600">Make your skin look brighter and more radiant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Create Harmonious Outfits</h3>
                    <p className="text-gray-600">Build a cohesive wardrobe with colors that work together</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Boost Your Confidence</h3>
                    <p className="text-gray-600">Look and feel your best in every outfit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Save Time and Money</h3>
                    <p className="text-gray-600">Shop smarter with colors you know will work</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use the Tool */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Use Our Clothing Color Creator</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Your Photo</h3>
              <p className="text-gray-600">
                Upload a clear, well-lit photo of yourself for the most accurate color analysis results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your skin tone, undertones, and features to determine your color profile.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Discover Your Colors</h3>
              <p className="text-gray-600">
                Receive personalized color palettes for primary, neutral, and accent clothing colors.
              </p>
            </div>
          </div>
        </section>

        {/* Color Categories */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Understanding Your Color Palette</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">Primary Colors</h3>
                <p className="text-purple-100">
                  Your signature colors that make you shine. Perfect for statement pieces, dresses, and important occasions.
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">Neutral Colors</h3>
                <p className="text-purple-100">
                  Your foundation colors for building a versatile wardrobe. Great for basics, workwear, and everyday pieces.
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3">Accent Colors</h3>
                <p className="text-purple-100">
                  Your pop colors for accessories, shoes, and adding personality to any outfit. Use sparingly for maximum impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Pro Tips for Better Results</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Photo Guidelines</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Use natural lighting or bright indoor lighting
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Face the camera directly with shoulders visible
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Avoid heavy makeup or filters for accurate results
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Remove or minimize colored clothing near your face
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Using Your Results</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Start with one color category at a time
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Test colors in different lighting conditions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Mix and match within your recommended palette
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                    Save your palette colors for shopping reference
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Discover Your Perfect Colors?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Transform your wardrobe with personalized color recommendations.
          </p>
          <button
            onClick={() => window.location.href = '/clothing-palette'}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-colors duration-300 shadow-lg"
          >
            Start Your Color Analysis
          </button>
        </section>
      </main>

      <Footer className="mt-20" />
    </div>
  );
}