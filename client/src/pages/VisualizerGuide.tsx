import React from "react";
import { Helmet } from "react-helmet-async";
import { Monitor, Eye, Layers, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VisualizerGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Helmet>
        <title>Color Palette Visualizer Guide - See Your Colors in Action | Coolors.in</title>
        <meta name="description" content="Learn how to use our color palette visualizer to preview your color schemes in real-world applications, websites, and design mockups before implementation." />
        <meta name="keywords" content="color palette visualizer, color scheme preview, design mockups, website color preview, UI color testing, color combination visualizer, design visualization tool" />
        <link rel="canonical" href="https://coolors.in/visualizer-guide" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Color Palette Visualizer Guide - See Your Colors in Action" />
        <meta property="og:description" content="Preview your color palettes in real-world applications with our comprehensive visualization tool guide." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://coolors.in/visualizer-guide" />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Color Palette Visualizer Guide - See Your Colors in Action",
            "description": "Complete guide to using our color palette visualizer for design preview and testing",
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
              "@id": "https://coolors.in/visualizer-guide"
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
            Color Palette Visualizer
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              See Your Colors in Action
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Preview your color palettes in real-world applications and design mockups before committing to your final color scheme.
          </p>
          
          <button
            onClick={() => window.location.href = '/visualize'}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center mx-auto"
          >
            Try the Visualizer
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>

        {/* Why Use Color Visualization */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Visualize Your Color Palettes?</h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Color visualization is crucial for making informed design decisions. Our visualizer helps you understand how your color choices will look in real applications, preventing costly mistakes and ensuring your designs achieve the desired impact.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <Eye className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Test Before Implementation</h3>
                <p className="text-gray-600 text-sm">See how colors work together before applying them to your actual project</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <Monitor className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Multiple Contexts</h3>
                <p className="text-gray-600 text-sm">Preview your palette in websites, apps, and various design layouts</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl">
                <Layers className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Instant Feedback</h3>
                <p className="text-gray-600 text-sm">Get immediate visual feedback and make adjustments in real-time</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Use the Visualizer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Use the Color Visualizer</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Create Your Palette</h3>
              <p className="text-gray-600 text-sm">
                Start with a color palette from our generator or create your own custom palette.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Choose a Template</h3>
              <p className="text-gray-600 text-sm">
                Select from website layouts, mobile apps, or design mockups to preview your colors.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Apply Colors</h3>
              <p className="text-gray-600 text-sm">
                Our tool automatically applies your palette to different elements in the chosen template.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Evaluate & Refine</h3>
              <p className="text-gray-600 text-sm">
                Assess the results and make adjustments to perfect your color scheme.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Perfect for Every Project</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Web Design Projects</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  Website headers and navigation elements
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  Button and call-to-action color schemes
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  Background and content area combinations
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
                  Typography and text color hierarchy
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Brand & Marketing</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  Logo and brand identity colors
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  Marketing material color schemes
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  Social media template designs
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  Presentation and infographic colors
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Visualization Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Color Testing Tips</h3>
                <ul className="space-y-3 text-green-100">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Test your palette in different lighting conditions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Check contrast ratios for accessibility compliance
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    View your design on different screen sizes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Consider how colors work in dark/light themes
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Design Evaluation</h3>
                <ul className="space-y-3 text-green-100">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Ensure proper visual hierarchy with your colors
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Check if important elements stand out clearly
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Verify brand consistency across all elements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                    Test user experience with your color choices
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Designers Love Our Visualizer</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Save Time</h3>
              <p className="text-gray-600 text-sm">Instantly preview designs without manual mockup creation</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Make Better Decisions</h3>
              <p className="text-gray-600 text-sm">Visual feedback helps you choose the perfect color combinations</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Reduce Revisions</h3>
              <p className="text-gray-600 text-sm">Catch potential issues early in the design process</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Visualize Your Colors?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            See your color palettes come to life in real design contexts.
          </p>
          <button
            onClick={() => window.location.href = '/visualize'}
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-colors duration-300 shadow-lg"
          >
            Start Visualizing Now
          </button>
        </section>
      </main>

      <Footer className="mt-20" />
    </div>
  );
}