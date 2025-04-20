import React from 'react';
import { Link } from 'wouter';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-3 sm:py-4 border-t mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-600">
          <div className="text-center md:text-left">
            © {currentYear} Palette Pro. All rights reserved.
          </div>
          <div className="mt-3 md:mt-0 flex flex-wrap justify-center gap-y-2 gap-x-4">
            <Link href="/privacy-policy">
              <a className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            </Link>
            <Link href="/faq">
              <a className="hover:text-gray-900 transition-colors">FAQ</a>
            </Link>
            <Link href="/designers-guide">
              <a className="hover:text-gray-900 transition-colors">Designer's Guide</a>
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="mailto:support@coolors.in"
              className="hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}