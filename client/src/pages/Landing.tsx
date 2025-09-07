import React from 'react';
import { Link } from 'wouter';
import { 
  RefreshCw, 
  Eye, 
  Image as ImageIcon, 
  BookOpen, 
  HelpCircle, 
  Palette
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Coolors.in - Color Palette Generator</title>
        <meta name="description" content="Create beautiful color palettes with our free color palette generator. Professional tools for designers and developers." />
        <meta name="keywords" content="color palette generator, color scheme, design tools" />
        <link rel="canonical" href="https://coolors.in/" />
      </Helmet>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo and Title */}
          <div className="mb-12">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Coolors.in
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The fast color palette generator for designers and developers
            </p>
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <Link href="/generate">
              <div className="group p-8 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all cursor-pointer border-2 border-transparent hover:border-blue-200">
                <RefreshCw className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:rotate-180 transition-transform duration-500" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate Palette</h3>
                <p className="text-gray-600">Create beautiful color combinations</p>
              </div>
            </Link>

            <Link href="/visualize">
              <div className="group p-8 bg-gray-50 rounded-2xl hover:bg-green-50 transition-all cursor-pointer border-2 border-transparent hover:border-green-200">
                <Eye className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Visualize</h3>
                <p className="text-gray-600">Preview palettes in real designs</p>
              </div>
            </Link>

            <Link href="/image-palette">
              <div className="group p-8 bg-gray-50 rounded-2xl hover:bg-purple-50 transition-all cursor-pointer border-2 border-transparent hover:border-purple-200">
                <ImageIcon className="w-12 h-12 text-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">From Image</h3>
                <p className="text-gray-600">Extract colors from images</p>
              </div>
            </Link>
          </div>

          {/* Secondary Actions */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing">
              <div className="flex items-center gap-2 px-6 py-3 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors cursor-pointer">
                <span>🎉</span>
                <span>All Features Free</span>
              </div>
            </Link>
            <Link href="/designers-guide">
              <div className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                <BookOpen className="w-5 h-5" />
                <span>Designer's Guide</span>
              </div>
            </Link>
            <Link href="/faq">
              <div className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                <HelpCircle className="w-5 h-5" />
                <span>FAQ</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}