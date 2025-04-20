import React, { useState, useCallback, useMemo, useContext } from 'react';
import { Color } from '@/types/Color';
import { getRandomColor, hexToRgb, getColorName } from '@/lib/colorUtils';

// Define context shape
interface PaletteContextType {
  palette: Color[];
  generatePalette: () => void;
  toggleLock: (index: number) => void;
  addColor: () => void;
  removeColor: (index: number) => void;
  resetPalette: () => void;
  updateColor: (index: number, color: Color) => void;
  setPalette: (colors: Color[]) => void;
  reorderColors: (sourceIndex: number, targetIndex: number) => void;
}

// Create the context
const PaletteContext = React.createContext<PaletteContextType | null>(null);

const DEFAULT_COLORS = [
  { hex: "#7A4ED9", rgb: { r: 122, g: 78, b: 217 }, locked: false, name: "Blue Violet" },
  { hex: "#ED584E", rgb: { r: 237, g: 88, b: 78 }, locked: false, name: "Tomato" },
  { hex: "#51CED9", rgb: { r: 81, g: 206, b: 217 }, locked: false, name: "Turquoise" },
  { hex: "#F7DB58", rgb: { r: 247, g: 219, b: 88 }, locked: false, name: "Yellow" },
  { hex: "#5AE881", rgb: { r: 90, g: 232, b: 129 }, locked: false, name: "Spring Green" },
];

// Provider component
export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<Color[]>(DEFAULT_COLORS);
  
  const generatePalette = useCallback(() => {
    console.log("Generating new palette...");
    setPaletteState(prevPalette => 
      prevPalette.map(color => {
        if (color.locked) return color;
        
        const hex = getRandomColor();
        const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
        const name = getColorName(hex);
        
        return {
          hex,
          rgb,
          locked: false,
          name
        };
      })
    );
  }, []);
  
  const toggleLock = useCallback((index: number) => {
    setPaletteState(prevPalette => 
      prevPalette.map((color, i) => 
        i === index ? { ...color, locked: !color.locked } : color
      )
    );
  }, []);
  
  const addColor = useCallback(() => {
    if (palette.length >= 10) {
      console.log("Maximum palette size reached");
      return;
    }
    
    const hex = getRandomColor();
    const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
    const name = getColorName(hex);
    
    setPaletteState(prevPalette => [
      ...prevPalette,
      { hex, rgb, locked: false, name }
    ]);
  }, [palette.length]);
  
  const removeColor = useCallback((index: number) => {
    if (palette.length <= 2) {
      console.log("Minimum palette size reached");
      return;
    }
    
    setPaletteState(prevPalette => 
      prevPalette.filter((_, i) => i !== index)
    );
  }, [palette.length]);
  
  const resetPalette = useCallback(() => {
    setPaletteState(DEFAULT_COLORS);
  }, []);
  
  const updateColor = useCallback((index: number, updatedColor: Color) => {
    setPaletteState(prevPalette => 
      prevPalette.map((color, i) => i === index ? updatedColor : color)
    );
  }, []);
  
  const setPalette = useCallback((colors: Color[]) => {
    setPaletteState(colors);
  }, []);
  
  const reorderColors = useCallback((sourceIndex: number, targetIndex: number) => {
    if (sourceIndex === targetIndex) return;
    
    setPaletteState(prevPalette => {
      const newPalette = [...prevPalette];
      const [movedColor] = newPalette.splice(sourceIndex, 1);
      newPalette.splice(targetIndex, 0, movedColor);
      return newPalette;
    });
  }, []);
  
  const value = useMemo(() => ({
    palette,
    generatePalette,
    toggleLock,
    addColor,
    removeColor,
    resetPalette,
    updateColor,
    setPalette,
    reorderColors
  }), [palette, generatePalette, toggleLock, addColor, removeColor, resetPalette, updateColor, setPalette, reorderColors]);
  
  return (
    <PaletteContext.Provider value={value}>
      {children}
    </PaletteContext.Provider>
  );
}

// Hook for using the context
export function usePalette() {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return context;
}