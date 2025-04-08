import React, { createContext, useContext, useState, useEffect } from "react";
import { Color } from "@shared/schema";
import { getRandomColor, hexToRgb } from "@/lib/colorUtils";

// Define the shape of our context
interface PaletteContextType {
  palette: Color[];
  generatePalette: () => void;
  toggleLock: (index: number) => void;
  addColor: () => void;
  removeColor: (index: number) => void;
  updateColor: (index: number, color: Color) => void;
  clearPalette: () => void;
}

// Create the context with a default value
const defaultValue: PaletteContextType = {
  palette: [],
  generatePalette: () => {},
  toggleLock: () => {},
  addColor: () => {},
  removeColor: () => {},
  updateColor: () => {},
  clearPalette: () => {}
};

// Create the context
const PaletteContext = createContext<PaletteContextType>(defaultValue);

// Create a provider component that will wrap your app
export const PaletteProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // State to hold our palette colors
  const [palette, setPalette] = useState<Color[]>([]);
  
  // Initialize with 5 random colors when the component mounts
  useEffect(() => {
    if (palette.length === 0) {
      const initialPalette: Color[] = [];
      
      for (let i = 0; i < 5; i++) {
        const hex = getRandomColor();
        const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
        
        initialPalette.push({
          hex,
          rgb,
          locked: false
        });
      }
      
      setPalette(initialPalette);
    }
  }, []);
  
  // Generate a new palette, keeping locked colors
  const generatePalette = () => {
    setPalette(prevPalette => 
      prevPalette.map(color => {
        if (color.locked) {
          return color;
        }
        
        const hex = getRandomColor();
        const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
        
        return {
          hex,
          rgb,
          locked: false
        };
      })
    );
  };
  
  // Toggle the lock state of a color
  const toggleLock = (index: number) => {
    setPalette(prevPalette => 
      prevPalette.map((color, i) => 
        i === index 
          ? { ...color, locked: !color.locked } 
          : color
      )
    );
  };
  
  // Add a new random color to the palette
  const addColor = () => {
    // Limit to 10 colors maximum
    if (palette.length >= 10) return;
    
    const hex = getRandomColor();
    const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
    
    setPalette(prevPalette => [
      ...prevPalette,
      {
        hex,
        rgb,
        locked: false
      }
    ]);
  };
  
  // Remove a color from the palette
  const removeColor = (index: number) => {
    // Don't allow removing if only one color remains
    if (palette.length <= 1) return;
    
    setPalette(prevPalette => 
      prevPalette.filter((_, i) => i !== index)
    );
  };
  
  // Update a specific color
  const updateColor = (index: number, updatedColor: Color) => {
    setPalette(prevPalette => 
      prevPalette.map((color, i) => 
        i === index ? updatedColor : color
      )
    );
  };
  
  // Clear all colors and start with one
  const clearPalette = () => {
    const hex = getRandomColor();
    const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
    
    setPalette([
      {
        hex,
        rgb,
        locked: false
      }
    ]);
  };
  
  // The value provided to consumers of the context
  const contextValue = {
    palette,
    generatePalette,
    toggleLock,
    addColor,
    removeColor,
    updateColor,
    clearPalette
  };
  
  return (
    <PaletteContext.Provider value={contextValue}>
      {children}
    </PaletteContext.Provider>
  );
};

// Hook to use the palette context
export const usePalette = () => {
  const context = useContext(PaletteContext);
  
  return context;
};
