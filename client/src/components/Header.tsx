import React from "react";
import { Link } from "wouter";
import { HelpCircle, Download, Save, Eye, Menu } from "lucide-react";

interface HeaderProps {
  onHelp: () => void;
  onExport: () => void;
  onSave: () => void;
  onVisualize?: () => void;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function Header({ 
  onHelp, 
  onExport, 
  onSave, 
  onVisualize,
  mobileMenuOpen, 
  toggleMobileMenu 
}: HeaderProps) {
  return (
    <>
      <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="flex items-center">
            <div className="relative w-32 sm:w-36 h-8">
              <img src="/logo.svg" alt="Coolors.in Logo" className="h-full" />
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <button 
            className="text-gray-600 hover:text-blue-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group relative"
            onClick={onHelp}
            aria-label="Help"
          >
            <HelpCircle size={16} />
            <span className="font-medium">Help</span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition shadow-lg whitespace-nowrap">
              Get instructions
            </span>
          </button>
          
          <button 
            className="text-gray-600 hover:text-blue-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group relative"
            onClick={onExport}
            aria-label="Export palette"
          >
            <Download size={16} />
            <span className="font-medium">Export</span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition shadow-lg whitespace-nowrap">
              Download your palette
            </span>
          </button>
          
          <button 
            className="text-gray-600 hover:text-blue-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group relative"
            onClick={onSave}
            aria-label="Save palette"
          >
            <Save size={16} />
            <span className="font-medium">Save</span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition shadow-lg whitespace-nowrap">
              Save to local storage
            </span>
          </button>
          
          {onVisualize && (
            <button 
              className="text-gray-600 hover:text-blue-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group relative"
              onClick={onVisualize}
              aria-label="Visualize palette"
            >
              <Eye size={16} />
              <span className="font-medium">Visualize</span>
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition shadow-lg whitespace-nowrap">
                Preview in UI templates
              </span>
            </button>
          )}
        </div>
        
        <div className="md:hidden">
          <button 
            className="text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white shadow-lg absolute top-14 right-4 w-56 z-20 rounded-xl transform origin-top-right transition-all duration-200 ${mobileMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`} 
      >
        <div className="py-3 px-3 flex flex-col space-y-2">
          <button 
            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-3 py-2 px-3 rounded-lg transition-colors"
            onClick={onHelp}
          >
            <HelpCircle size={18} className="text-gray-500" />
            <span className="font-medium">Help</span>
          </button>
          <button 
            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-3 py-2 px-3 rounded-lg transition-colors"
            onClick={onExport}
          >
            <Download size={18} className="text-gray-500" />
            <span className="font-medium">Export</span>
          </button>
          <button 
            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-3 py-2 px-3 rounded-lg transition-colors"
            onClick={onSave}
          >
            <Save size={18} className="text-gray-500" />
            <span className="font-medium">Save</span>
          </button>
          
          {onVisualize && (
            <button 
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-3 py-2 px-3 rounded-lg transition-colors"
              onClick={onVisualize}
            >
              <Eye size={18} className="text-gray-500" />
              <span className="font-medium">Visualize</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
