import React from "react";
import { Helmet } from "react-helmet-async";
import { Camera, Upload, Palette, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ImagePaletteGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <Helmet>
        <title>Image to Color Palette Guide - Extract Colors from Photos | Coolors.in</title>
        <meta name="description" content="Learn how to extract beautiful color palettes from any image using our AI-powered color extraction tool. Perfect for design inspiration and color matching." />
        <meta name="keywords" content="image color extractor, photo color palette, color picker from image, extract colors from photo, image color analysis, design inspiration colors, dominant colors from image" />
        <link rel="canonical" href="https://coolors.in/image-palette-guide" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Image to Color Palette Guide - Extract Colors from Photos" />
        <meta property="og:description" content="Extract beautiful color palettes from any image with our comprehensive guide to image color analysis." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://coolors.in/image-palette-guide" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Image to Color Palette Guide - Extract Colors from Photos",
            "description": "Complete guide to extracting color palettes from images for design inspiration",
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
              "@id": "https://coolors.in/image-palette-guide"
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
            Image to Color Palette
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Extract Colors from Photos
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform any image into a beautiful color palette with our AI-powered color extraction tool. Perfect for finding design inspiration and color matching.
          </p>
          
          <button
            onClick={() => window.location.href = '/image-palette'}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto"
          >
            Try the Tool Now
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>

        {/* What is Image Color Extraction */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Image Color Extraction?</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Image color extraction is the process of analyzing an image to identify its dominant colors and creating a cohesive color palette. Our AI-powered tool examines millions of pixels to find the most significant colors and creates harmonious palettes that capture the essence of your image.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect for:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    Design inspiration from photography
                  </li>
                  <li className="flex items-start gap-2">
                    <Palette className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    Brand color development from logos
                  </li>
                  <li className="flex items-start gap-2">
                    <Upload className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    Interior design color matching
                  </li>
                  <li className="flex items-start gap-2">
                    <Camera className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    Art and illustration color analysis
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                    Save time on color research and selection
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                    Ensure color harmony and consistency
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                    Discover unexpected color combinations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></span>
                    Create professional-looking designs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use the Tool */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Extract Colors from Images</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Upload Your Image</h3>
              <p className="text-gray-600">
                Upload any image - photographs, artwork, logos, or design references. Our tool supports all common image formats.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes the image to identify dominant colors, color relationships, and optimal palette combinations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Your Palette</h3>
              <p className="text-gray-600">
                Receive a curated color palette with hex codes, ready to use in your design projects and creative work.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Creative Applications</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎨</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Web Design</h3>
              <p className="text-gray-600 text-sm">
                Extract colors from inspiration images to create cohesive website color schemes.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🏠</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Interior Design</h3>
              <p className="text-gray-600 text-sm">
                Match paint colors to furniture, artwork, or fabric patterns in your photos.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">App Design</h3>
              <p className="text-gray-600 text-sm">
                Create app themes and UI color schemes from brand imagery or concept art.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎭</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Art & Fashion</h3>
              <p className="text-gray-600 text-sm">
                Analyze artwork or fashion photos to understand color relationships and trends.
              </p>
            </div>
          </div>
        </section>

        {/* Tips for Better Results */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Tips for Better Color Extraction</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Image Selection</h3>
                <ul className="space-y-3 text-orange-100">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Use high-quality, well-lit images for accurate results
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Choose images with clear, distinct colors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Avoid overly dark or washed-out photos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Consider the mood and style you want to achieve
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Working with Results</h3>
                <ul className="space-y-3 text-orange-100">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Test extracted colors in your actual design context
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Adjust brightness and saturation if needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Combine colors from multiple images for variety
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Save palettes that work well for future reference
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Advanced Features</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Smart Color Detection</h3>
                <p className="text-gray-600 text-sm">
                  Advanced algorithms identify the most visually significant colors while filtering out noise and artifacts.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Color Harmony</h3>
                <p className="text-gray-600 text-sm">
                  Our tool ensures extracted colors work well together by analyzing color relationships and balance.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Multiple Formats</h3>
                <p className="text-gray-600 text-sm">
                  Export your extracted palettes in HEX, RGB, HSL, and other formats for any design workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Extract Colors from Your Images?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Turn any image into a beautiful, professional color palette in seconds.
          </p>
          <button
            onClick={() => window.location.href = '/image-palette'}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-colors duration-300 shadow-lg"
          >
            Start Extracting Colors
          </button>
        </section>
      </main>

      <Footer className="mt-20" />
    </div>
  );
}