import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Check, Save, X } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Color } from '@/types/Color';

interface SavePaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  palette: Color[];
  onSuccess?: () => void;
}

const SavePaletteModal: React.FC<SavePaletteModalProps> = ({
  isOpen,
  onClose,
  palette,
  onSuccess
}) => {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [paletteName, setPaletteName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  if (!isOpen) return null;
  
  // Handle input change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaletteName(e.target.value);
    if (error) setError('');
  };
  
  // Handle save palette
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!paletteName.trim()) {
      setError('Please enter a name for your palette');
      return;
    }
    
    // Check if user is logged in
    if (!user) {
      navigate('/auth');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Call API to save palette
      const response = await fetch('/api/palettes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: paletteName,
          colors: JSON.stringify(palette), // Stringify the palette colors
          // userId and createdAt will be set server-side
        }),
      });
      
      if (response.ok) {
        // Success
        onSuccess?.();
        onClose();
        setPaletteName('');
      } else {
        // Handle API errors
        const data = await response.json();
        setError(data.error || 'Failed to save palette');
      }
    } catch (err) {
      console.error('Error saving palette:', err);
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle redirect to login
  const handleRedirectToLogin = () => {
    navigate('/auth');
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Save Color Palette</h2>
          
          {/* Preview palette */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Preview</h3>
            <div className="h-12 flex rounded-md overflow-hidden">
              {palette.map((color, index) => (
                <div 
                  key={index} 
                  className="flex-1" 
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
          
          {/* If user not logged in, show login prompt */}
          {!user ? (
            <div>
              <p className="text-gray-600 mb-4">
                You need to be logged in to save palettes.
              </p>
              <button
                onClick={handleRedirectToLogin}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Log in or Sign up
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label htmlFor="palette-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Palette Name
                </label>
                <input
                  type="text"
                  id="palette-name"
                  value={paletteName}
                  onChange={handleNameChange}
                  placeholder="e.g., Summer Theme, Project Colors"
                  className={`w-full px-3 py-2 border ${error ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={isSubmitting}
                />
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Save Palette
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavePaletteModal;