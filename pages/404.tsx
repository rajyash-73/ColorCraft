import React from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title="Page Not Found | Coolors.in"
        description="The page you're looking for could not be found. Return to Coolors.in to generate beautiful color palettes."
      />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 mb-6">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Go to Homepage
            </Link>
            <Link href="/faq" className="px-5 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Visit FAQ
            </Link>
          </div>
        </div>
        
        {/* Color palette display */}
        <div className="mt-12 w-full max-w-lg">
          <div className="flex h-12 rounded-md overflow-hidden shadow-md">
            <div className="flex-1 bg-red-500"></div>
            <div className="flex-1 bg-yellow-400"></div>
            <div className="flex-1 bg-green-500"></div>
            <div className="flex-1 bg-blue-500"></div>
            <div className="flex-1 bg-purple-500"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            While you're here, enjoy this colorful palette!
          </p>
        </div>
      </main>
      
      <footer className="py-6 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Coolors.in. All rights reserved.
        </p>
      </footer>
    </div>
  );
}