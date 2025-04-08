import React from "react";

interface HeaderProps {
  onHelp: () => void;
  onExport: () => void;
  onSave: () => void;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export default function Header({ 
  onHelp, 
  onExport, 
  onSave, 
  mobileMenuOpen, 
  toggleMobileMenu 
}: HeaderProps) {
  return (
    <>
      <header className="bg-white shadow-sm px-4 py-2 flex justify-between items-center z-10">
        <div className="flex items-center space-x-2">
          <i className="fas fa-palette text-primary text-xl"></i>
          <h1 className="text-xl font-bold text-gray-800">Palette Pro</h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <button 
            className="text-gray-600 hover:text-primary flex items-center space-x-1 group relative"
            onClick={onHelp}
            aria-label="Help"
          >
            <i className="fas fa-question-circle"></i>
            <span>Help</span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Get instructions
            </span>
          </button>
          
          <button 
            className="text-gray-600 hover:text-primary flex items-center space-x-1 group relative"
            onClick={onExport}
            aria-label="Export palette"
          >
            <i className="fas fa-download"></i>
            <span>Export</span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Download your palette
            </span>
          </button>
          
          <button 
            className="text-gray-600 hover:text-primary flex items-center space-x-1 group relative"
            onClick={onSave}
            aria-label="Save palette"
          >
            <i className="fas fa-save"></i>
            <span>Save</span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
              Save to local storage
            </span>
          </button>
        </div>
        
        <div className="md:hidden">
          <button 
            className="text-gray-600 p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white shadow-md absolute top-12 right-0 w-48 z-20 rounded-bl-lg transform origin-top-right transition-transform duration-200 ${mobileMenuOpen ? 'scale-100' : 'scale-0'}`} 
      >
        <div className="py-2 px-4 flex flex-col space-y-3">
          <button 
            className="text-gray-600 hover:text-primary flex items-center space-x-2 py-1"
            onClick={onHelp}
          >
            <i className="fas fa-question-circle w-5"></i>
            <span>Help</span>
          </button>
          <button 
            className="text-gray-600 hover:text-primary flex items-center space-x-2 py-1"
            onClick={onExport}
          >
            <i className="fas fa-download w-5"></i>
            <span>Export</span>
          </button>
          <button 
            className="text-gray-600 hover:text-primary flex items-center space-x-2 py-1"
            onClick={onSave}
          >
            <i className="fas fa-save w-5"></i>
            <span>Save</span>
          </button>
        </div>
      </div>
    </>
  );
}
