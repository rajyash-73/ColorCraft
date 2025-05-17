import React from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';

export default function Custom500() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEO
        title="Server Error | Coolors.in"
        description="Something went wrong on our server. We're working on fixing the issue."
      />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-6">
            500
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Server Error
          </h2>
          <p className="text-gray-600 mb-8">
            Something went wrong on our server. We've been notified and are working on fixing the issue. Please try again later.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Try Again
            </Link>
            <Link href="/faq" className="px-5 py-3 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Visit FAQ
            </Link>
          </div>
        </div>
        
        {/* Color palette display */}
        <div className="mt-12 w-full max-w-lg">
          <div className="flex h-12 rounded-md overflow-hidden shadow-md">
            <div className="flex-1 bg-blue-700"></div>
            <div className="flex-1 bg-blue-500"></div>
            <div className="flex-1 bg-blue-300"></div>
            <div className="flex-1 bg-gray-300"></div>
            <div className="flex-1 bg-gray-100"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            While we fix things, enjoy this calming palette
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