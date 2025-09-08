import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface FooterProps {
  className?: string;
}

/**
 * Semantic footer component with navigation and copyright information
 * Improves SEO with proper HTML5 semantic elements and site navigation
 */
const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  
  // Check if the current path matches a link
  const isActive = (path: string) => router.pathname === path;
  
  return (
    <footer className={`bg-gray-800 text-white py-8 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold">Coolors.in</h2>
            <p className="text-gray-400 mt-2">
              The super fast color palette generator for designers and developers.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-300">
                Created by <span className="font-medium text-white">Yash</span>
              </p>
              <a 
                href="mailto:rajyash73@gmail.com" 
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                rajyash73@gmail.com
              </a>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className={`text-gray-300 hover:text-white transition-colors ${isActive('/') ? 'text-white font-medium' : ''}`}
                >
                  Palette Generator
                </Link>
              </li>
              <li>
                <Link 
                  href="/visualizer" 
                  className={`text-gray-300 hover:text-white transition-colors ${isActive('/visualizer') ? 'text-white font-medium' : ''}`}
                >
                  Visualizer
                </Link>
              </li>
              <li>
                <Link 
                  href="/image-palette" 
                  className={`text-gray-300 hover:text-white transition-colors ${isActive('/image-palette') ? 'text-white font-medium' : ''}`}
                >
                  Image to Palette
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Resources */}
          <nav className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/designers-guide" 
                  className={`text-gray-300 hover:text-white transition-colors ${isActive('/designers-guide') ? 'text-white font-medium' : ''}`}
                >
                  Designer's Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className={`text-gray-300 hover:text-white transition-colors ${isActive('/faq') ? 'text-white font-medium' : ''}`}
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Legal */}
          <nav className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/privacy-policy" 
                  className={`text-gray-300 hover:text-white transition-colors ${isActive('/privacy-policy') ? 'text-white font-medium' : ''}`}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Copyright and terms */}
        <div className="mt-10 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Coolors.in. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            {/* Social links can be added here */}
            <span className="text-xs text-gray-500">
              Built with SEO best practices
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;