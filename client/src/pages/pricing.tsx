import React from 'react';
import { Link } from 'wouter';
import { 
  Check, 
  Palette, 
  Eye, 
  Save, 
  Shirt,
  ArrowLeft,
  Gift
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';

export default function Pricing() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Free Color Palette Generator - Coolors.in</title>
        <meta name="description" content="All features of Coolors.in are completely free! Unlimited palettes, visualizer access, professional color schemes, and cloth color recommendations." />
        <meta name="keywords" content="free color palette generator, unlimited palettes, professional palettes, visualizer" />
      </Helmet>

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">Coolors.in</span>
              </div>
            </Link>
            <Link href="/">
              <a className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </a>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything is Free!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enjoy unlimited access to all Coolors.in features without any restrictions or subscriptions.
            </p>
          </div>

          {/* Free Features Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                All Features Included
              </h2>
              <p className="text-lg text-gray-600">
                No limits, no subscriptions, no hidden fees - just pure creativity
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited color palette generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Professional color palettes database</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Full visualizer access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Cloth color recommendations</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Color palette from images</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Export in all formats</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Advanced color theory tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">Designer's guide and FAQ access</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/generate">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 mx-auto">
                  <Palette className="w-6 h-6" />
                  Start Creating Palettes
                </button>
              </Link>
            </div>
          </div>

          {/* Features Showcase */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Explore All Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visualizer</h3>
                <p className="text-gray-600">Preview your palettes in real website mockups and UI components</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Palette className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Palettes</h3>
                <p className="text-gray-600">Access curated professional color combinations for your projects</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shirt className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloth Color Matching</h3>
                <p className="text-gray-600">Get personalized clothing color palettes based on your facial tone and hair color</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}