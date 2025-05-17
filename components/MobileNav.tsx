import React, { useState } from 'react';
import Link from 'next/link';
import { X, Menu, Home, PenTool, HelpCircle, Settings, BookOpen } from 'lucide-react';

interface MobileNavProps {
  currentPath: string;
}

/**
 * Mobile-friendly navigation component with improved accessibility and SEO
 */
const MobileNav: React.FC<MobileNavProps> = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // When opening menu, prevent background scrolling
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="lg:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile navigation overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden bg-gray-900 bg-opacity-50"
          aria-hidden="true"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile navigation menu */}
      <nav 
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
        aria-label="Mobile navigation"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-bold">Coolors.in</span>
          <button 
            onClick={toggleMenu}
            aria-label="Close menu"
            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="py-4">
          <li>
            <Link 
              href="/" 
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 ${
                currentPath === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home size={18} className="mr-3" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/visualizer" 
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 ${
                currentPath === '/visualizer' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <PenTool size={18} className="mr-3" />
              <span>Palette Visualizer</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/designers-guide" 
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 ${
                currentPath === '/designers-guide' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BookOpen size={18} className="mr-3" />
              <span>Designer's Guide</span>
            </Link>
          </li>
          <li>
            <Link 
              href="/faq" 
              onClick={handleLinkClick}
              className={`flex items-center px-4 py-3 ${
                currentPath === '/faq' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <HelpCircle size={18} className="mr-3" />
              <span>FAQ</span>
            </Link>
          </li>
        </ul>

        <div className="absolute bottom-0 w-full border-t p-4">
          <Link 
            href="/privacy-policy" 
            onClick={handleLinkClick}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Privacy Policy
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;