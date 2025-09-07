import React from "react";
import { Link } from "wouter";
import { HelpCircle, Download, Save, Eye, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

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
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <>
      <header className="bg-white shadow-sm px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center z-10">
        <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-16 sm:w-20 md:w-24 h-6 sm:h-8">
              <img src="/logo_circles.svg" alt="Coolors.in Logo" className="h-full" />
            </div>
            <span className="font-bold text-md sm:text-lg md:text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Coolors.in
            </span>
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
          
          {/* Authentication Section */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden lg:inline">{user.username}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <User size={16} />
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            </Link>
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
        className={`md:hidden bg-white shadow-lg fixed top-[42px] sm:top-[52px] right-2 sm:right-4 w-48 sm:w-56 z-50 rounded-xl transform origin-top-right transition-all duration-200 ${mobileMenuOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`} 
      >
        <div className="py-2 px-2 flex flex-col space-y-1.5">
          <button 
            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors text-sm"
            onClick={onHelp}
          >
            <HelpCircle size={16} className="text-gray-500" />
            <span className="font-medium">Help</span>
          </button>
          <button 
            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors text-sm"
            onClick={onExport}
          >
            <Download size={16} className="text-gray-500" />
            <span className="font-medium">Export</span>
          </button>
          <button 
            className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors text-sm"
            onClick={onSave}
          >
            <Save size={16} className="text-gray-500" />
            <span className="font-medium">Save</span>
          </button>
          
          {onVisualize && (
            <button 
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors text-sm"
              onClick={onVisualize}
            >
              <Eye size={16} className="text-gray-500" />
              <span className="font-medium">Visualize</span>
            </button>
          )}
          
          {/* Mobile Authentication */}
          {user ? (
            <>
              <div className="border-t border-gray-100 my-2"></div>
              <div className="px-3 py-1.5 text-xs text-gray-500 font-medium">
                Signed in as {user.username}
              </div>
              <button 
                className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors text-sm"
                onClick={handleLogout}
              >
                <LogOut size={16} className="text-red-500" />
                <span className="font-medium">Logout</span>
              </button>
            </>
          ) : (
            <>
              <div className="border-t border-gray-100 my-2"></div>
              <Link href="/auth">
                <button className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors text-sm w-full">
                  <User size={16} className="text-gray-500" />
                  <span className="font-medium">Sign In</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
