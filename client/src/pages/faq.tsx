import React from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Mail } from 'lucide-react';
import Footer from '@/components/Footer';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 mb-6 flex-grow">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="mr-1" size={20} />
              Back to Home
            </Link>
          </div>
        </header>

        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-5">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">1. What is Coolors.in?</h2>
            <p className="text-gray-600">
              Coolors.in is a free online color palette generator that helps you create aesthetic color combinations for your design projects.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-5">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">2. Do I need to create an account?</h2>
            <p className="text-gray-600">
              No, you can use the tool right away without any sign-up or login.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-5">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">3. Can I copy or download the color palettes?</h2>
            <p className="text-gray-600">
              Yes, you can copy hex codes and soon we'll offer options to export palettes as images or JSON files.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-5">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">4. Can I use the palettes for commercial use?</h2>
            <p className="text-gray-600">
              Yes, all palettes are free to use for personal or commercial projects.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-5">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">5. Does Coolors.in store my data?</h2>
            <p className="text-gray-600">
              No personal data is stored. We use anonymous tracking through cookies and analytics tools. Read our <Link href="/privacy-policy"><a className="text-blue-600 hover:underline">Privacy Policy</a></Link> for details.
            </p>
          </div>
          
          <div className="pb-5">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">6. I have a suggestion or feedback. How can I reach you?</h2>
            <p className="text-gray-600 flex items-center">
              Email us anytime at <a href="mailto:support@coolors.in" className="text-blue-600 hover:underline mx-1 flex items-center"><Mail size={16} className="mr-1" /> support@coolors.in</a> — we'd love to hear from you!
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}