import React from 'react';
import { Color } from '@shared/schema';
import { getRandomColor, hexToRgb } from '@/lib/colorUtils';

// Define context shape
interface PaletteContextType {
  palette: Color[];
  generatePalette: () => void;
}

// Create the context
const PaletteContext = React.createContext<PaletteContextType | null>(null);

// Provider component
function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = React.useState<Color[]>([
    {
      hex: "#FF5733",
      rgb: { r: 255, g: 87, b: 51 },
      locked: false
    },
    {
      hex: "#33FF57",
      rgb: { r: 51, g: 255, b: 87 },
      locked: false
    }
  ]);
  
  const generatePalette = React.useCallback(() => {
    console.log("Generating new palette...");
    setPalette(prevPalette => 
      prevPalette.map(color => {
        if (color.locked) return color;
        
        const hex = getRandomColor();
        const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 };
        
        return {
          hex,
          rgb,
          locked: false
        };
      })
    );
  }, []);
  
  const value = React.useMemo(() => ({
    palette,
    generatePalette
  }), [palette, generatePalette]);
  
  return (
    <PaletteContext.Provider value={value}>
      {children}
    </PaletteContext.Provider>
  );
}

// Hook for using the context
function usePalette() {
  const context = React.useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return context;
}

// Main component that uses the context
function PaletteTest() {
  const { palette, generatePalette } = usePalette();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Palette Test</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={generatePalette}
      >
        Generate New Palette
      </button>
      
      <div className="flex gap-4">
        {palette.map((color, index) => (
          <div 
            key={index}
            className="w-32 h-32 rounded-md flex items-center justify-center"
            style={{ backgroundColor: color.hex }}
          >
            <div className="bg-white bg-opacity-80 rounded px-2 py-1">
              <span className="block text-sm">{color.hex}</span>
              <span className="block text-xs">
                RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Wrapper component that provides the context
export default function TestApp() {
  return (
    <PaletteProvider>
      <PaletteTest />
    </PaletteProvider>
  );
}