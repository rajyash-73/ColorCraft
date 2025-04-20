import React, { createContext, useContext, useState, useEffect } from "react";
import { Color } from "../types/Color";
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

// Create initial palette data for the default context
const initialPaletteData: Color[] = [
  {
    hex: "#FF5733",
    rgb: { r: 255, g: 87, b: 51 },
    locked: false
  },
  {
    hex: "#33FF57",
    rgb: { r: 51, g: 255, b: 87 },
    locked: false
  },
  {
    hex: "#3357FF",
    rgb: { r: 51, g: 87, b: 255 },
    locked: false
  },
  {
    hex: "#F3FF33",
    rgb: { r: 243, g: 255, b: 51 },
    locked: false
  },
  {
    hex: "#FF33F3",
    rgb: { r: 255, g: 51, b: 243 },
    locked: false
  }
];

// Create the context with a meaningful default value
const PaletteContext = createContext<PaletteContextType>({
  palette: initialPaletteData,
  generatePalette: () => console.warn("generatePalette not implemented"),
  toggleLock: () => console.warn("toggleLock not implemented"),
  addColor: () => console.warn("addColor not implemented"),
  removeColor: () => console.warn("removeColor not implemented"),
  updateColor: () => console.warn("updateColor not implemented"),
  clearPalette: () => console.warn("clearPalette not implemented")
});

// Create a provider component
function PaletteProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default palette colors
  const [palette, setPalette] = useState<Color[]>(initialPaletteData);
  
  // Generate a new palette, keeping locked colors
  const generatePalette = () => {
    console.log("Generating new palette...");
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
  
  return (
    <PaletteContext.Provider 
      value={{
        palette,
        generatePalette,
        toggleLock,
        addColor,
        removeColor,
        updateColor,
        clearPalette
      }}
    >
      {children}
    </PaletteContext.Provider>
  );
}

// Create a hook to use the palette context
function usePalette() {
  return useContext(PaletteContext);
}

export { PaletteProvider, usePalette };
