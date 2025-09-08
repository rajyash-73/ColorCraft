import React from "react";
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

        {/* Apps & Tools Showcase */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Web App */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Web App</h3>
              <p className="text-gray-600 text-sm mb-4">
                Create, browse and save palettes instantly in your browser.
              </p>
              <button 
                onClick={handleGetStarted}
                className="text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors"
              >
                Launch now →
              </button>
            </div>

            {/* Mobile Experience */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mobile Ready</h3>
              <p className="text-gray-600 text-sm mb-4">
                Fully responsive design that works perfectly on all devices.
              </p>
              <div className="text-green-600 font-medium text-sm">
                Always available →
              </div>
            </div>

            {/* Clothing Palette */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-white" />
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

            {/* Export Options */}
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Export Ready</h3>
              <p className="text-gray-600 text-sm mb-4">
                Export in multiple formats: CSS, JSON, Adobe ASE, and more.
              </p>
              <div className="text-orange-600 font-medium text-sm">
                Multiple formats →
              </div>
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