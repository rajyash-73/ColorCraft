import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProfileButton from './ProfileButton';

const Navigation: React.FC = () => {
  const router = useRouter();
  
  // Check if current path is active
  const isActive = (path: string) => router.pathname === path;
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-400">
                Coolors.in
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Generator
              </Link>
              
              <Link 
                href="/visualizer"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/visualizer') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Visualizer
              </Link>
              
              <Link 
                href="/designers-guide"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/designers-guide') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Guide
              </Link>
            </div>
          </div>
          
          {/* Secondary navigation */}
          <div className="flex items-center">
            <ProfileButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;