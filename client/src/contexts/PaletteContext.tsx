import React, { createContext, useContext, useState, useEffect } from "react";
import { Color } from "@shared/schema";
import { getRandomColor, hexToRgb } from "@/lib/colorUtils";

interface PaletteContextType {
  palette: Color[];
  generatePalette: () => void;
  toggleLock: (index: number) => void;
  addColor: () => void;
  removeColor: (index: number) => void;
  updateColor: (index: number, color: Color) => void;
  clearPalette: () => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState<Color[]>([]);
  
  // Initialize palette on first render
  useEffect(() => {
    if (palette.length === 0) {
      const initialPalette: Color[] = [];
      
      // Generate 5 initial colors
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
  
  // Setup keyboard shortcut for generating palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && 
          document.activeElement?.tagName !== "INPUT" && 
          document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        generatePalette();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [palette]);
  
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
  
  const toggleLock = (index: number) => {
    setPalette(prevPalette => 
      prevPalette.map((color, i) => 
        i === index 
          ? { ...color, locked: !color.locked } 
          : color
      )
    );
  };
  
  const addColor = () => {
    // Limit to 10 colors maximum
    if (palette.length >= 10) return;
    
    const hex = getRandomColor();
    const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
    
    setPalette([
      ...palette,
      {
        hex,
        rgb,
        locked: false
      }
    ]);
  };
  
  const removeColor = (index: number) => {
    // Don't allow removing if only one color remains
    if (palette.length <= 1) return;
    
    setPalette(prevPalette => 
      prevPalette.filter((_, i) => i !== index)
    );
  };
  
  const updateColor = (index: number, updatedColor: Color) => {
    setPalette(prevPalette => 
      prevPalette.map((color, i) => 
        i === index ? updatedColor : color
      )
    );
  };
  
  const clearPalette = () => {
    // Generate a single new color
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
    <PaletteContext.Provider value={{
      palette,
      generatePalette,
      toggleLock,
      addColor,
      removeColor,
      updateColor,
      clearPalette
    }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const context = useContext(PaletteContext);
  
  if (context === undefined) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  
  return context;
}
