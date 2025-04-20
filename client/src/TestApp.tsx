import React, { useState, useCallback, useMemo, useContext, useRef, useEffect } from 'react';
import { Color } from './types/Color';
import { getRandomColor, hexToRgb, isLightColor, rgbToHex, getColorName } from '@/lib/colorUtils';
import { LockIcon, UnlockIcon, RefreshCw, Copy, Download, Plus, Trash, Info, Sliders } from 'lucide-react';
import html2canvas from 'html2canvas';
import ColorAdjustmentModal from '@/components/ColorAdjustmentModal';
import TrendingPalettes, { TRENDING_PALETTES } from '@/components/TrendingPalettes';
import WelcomeModal from '@/components/modals/WelcomeModal';

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
}

// Create the context
const PaletteContext = React.createContext<PaletteContextType | null>(null);

const DEFAULT_COLORS = [
  { hex: "#7A4ED9", rgb: { r: 122, g: 78, b: 217 }, locked: false },
  { hex: "#ED584E", rgb: { r: 237, g: 88, b: 78 }, locked: false },
  { hex: "#51CED9", rgb: { r: 81, g: 206, b: 217 }, locked: false },
  { hex: "#F7DB58", rgb: { r: 247, g: 219, b: 88 }, locked: false },
  { hex: "#5AE881", rgb: { r: 90, g: 232, b: 129 }, locked: false },
];

// Provider component
function PaletteProvider({ children }: { children: React.ReactNode }) {
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
  
  const value = useMemo(() => ({
    palette,
    generatePalette,
    toggleLock,
    addColor,
    removeColor,
    resetPalette,
    updateColor,
    setPalette
  }), [palette, generatePalette, toggleLock, addColor, removeColor, resetPalette, updateColor, setPalette]);
  
  return (
    <PaletteContext.Provider value={value}>
      {children}
    </PaletteContext.Provider>
  );
}

// Hook for using the context
function usePalette() {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return context;
}

// Toast notification component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
      <span>{message}</span>
    </div>
  );
}

// Main component that uses the context
function PaletteApp() {
  const { 
    palette, 
    generatePalette, 
    toggleLock, 
    addColor, 
    removeColor, 
    resetPalette,
    updateColor,
    setPalette: setPaletteColors 
  } = usePalette();
  
  const [toast, setToast] = useState<string | null>(null);
  const [showInfoTooltip, setShowInfoTooltip] = useState<number | null>(null);
  const [showAdjustModal, setShowAdjustModal] = useState<boolean>(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const paletteRef = useRef<HTMLDivElement>(null);
  
  // Handle spacebar for generating new palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && 
          document.activeElement?.tagName !== "INPUT" && 
          document.activeElement?.tagName !== "TEXTAREA" &&
          !showAdjustModal) {
        e.preventDefault();
        generatePalette();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [generatePalette, showAdjustModal]);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setToast(`Copied ${text} to clipboard`);
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };
  
  const exportPalette = async () => {
    if (paletteRef.current) {
      try {
        const canvas = await html2canvas(paletteRef.current);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "palette.png";
        link.click();
      } catch (err) {
        console.error("Error exporting palette:", err);
        setToast("Failed to export palette");
      }
    }
  };
  
  const exportPaletteAsJSON = () => {
    const data = JSON.stringify(palette.map(color => color.hex));
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "palette.json";
    link.click();
    URL.revokeObjectURL(url);
  };
  
  const handleAdjustColor = (index: number) => {
    setActiveColorIndex(index);
    setShowAdjustModal(true);
  };
  
  const handleApplyColorAdjustment = (color: Color) => {
    if (activeColorIndex !== null) {
      updateColor(activeColorIndex, color);
      setShowAdjustModal(false);
      setActiveColorIndex(null);
    }
  };
  
  const handleTrendingPaletteSelect = (colors: Color[]) => {
    setPaletteColors(colors);
    setToast("Trending palette applied!");
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">
          Palette Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Press spacebar to generate a new palette. Click on a color to lock/unlock it.
        </p>
      </header>
      
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          onClick={generatePalette}
        >
          <RefreshCw size={18} />
          Generate Palette
        </button>
        
        <button 
          className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2"
          onClick={addColor}
          disabled={palette.length >= 10}
        >
          <Plus size={18} />
          Add Color
        </button>
        
        <button 
          className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2"
          onClick={resetPalette}
        >
          <RefreshCw size={18} />
          Reset
        </button>
        
        <button 
          className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2"
          onClick={exportPalette}
        >
          <Download size={18} />
          Export PNG
        </button>
        
        <button 
          className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2"
          onClick={exportPaletteAsJSON}
        >
          <Download size={18} />
          Export JSON
        </button>
      </div>
      
      <div className="flex-1">
        <div 
          ref={paletteRef} 
          className="flex flex-col md:flex-row h-[500px] rounded-xl overflow-hidden shadow-2xl"
        >
          {palette.map((color, index) => {
            const textColor = isLightColor(color.hex) ? 'text-gray-800' : 'text-white';
            return (
              <div 
                key={index}
                className="flex-1 relative transition-all group"
                style={{ backgroundColor: color.hex }}
              >
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${textColor}`}>
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button 
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      onClick={() => toggleLock(index)}
                      title={color.locked ? "Unlock color" : "Lock color"}
                    >
                      {color.locked ? <LockIcon size={18} /> : <UnlockIcon size={18} />}
                    </button>
                    
                    <button 
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      onClick={() => handleAdjustColor(index)}
                      title="Adjust color"
                    >
                      <Sliders size={18} />
                    </button>
                    
                    <button 
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      onClick={() => removeColor(index)}
                      disabled={palette.length <= 2}
                      title="Remove color"
                    >
                      <Trash size={18} />
                    </button>
                    
                    <button 
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      onMouseEnter={() => setShowInfoTooltip(index)}
                      onMouseLeave={() => setShowInfoTooltip(null)}
                      title="Color information"
                    >
                      <Info size={18} />
                    </button>
                  </div>
                  
                  {showInfoTooltip === index && (
                    <div className="absolute top-14 right-3 bg-white text-gray-800 p-3 rounded-lg shadow-lg z-10 w-48">
                      <p className="text-sm font-semibold">RGB Values:</p>
                      <p className="text-xs">R: {color.rgb.r}</p>
                      <p className="text-xs">G: {color.rgb.g}</p>
                      <p className="text-xs">B: {color.rgb.b}</p>
                    </div>
                  )}
                  
                  <div className="mt-auto mb-4 text-center">
                    <h3 className="text-2xl font-bold mb-2">{color.hex}</h3>
                    <button 
                      className="px-3 py-1 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center gap-1 mx-auto"
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <Copy size={14} />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Trending Palettes Section */}
      <TrendingPalettes onSelectPalette={handleTrendingPaletteSelect} />
      
      <div className="mt-8 text-center text-gray-600 text-sm">
        <p>Press spacebar to generate a new palette | Click on the lock icon to keep a color</p>
      </div>
      
      {/* Modals */}
      {showAdjustModal && activeColorIndex !== null && (
        <ColorAdjustmentModal 
          color={palette[activeColorIndex]}
          onClose={() => setShowAdjustModal(false)}
          onApply={handleApplyColorAdjustment}
        />
      )}
      
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// Wrapper component that provides the context
export default function TestApp() {
  return (
    <PaletteProvider>
      <PaletteApp />
      <WelcomeModal />
    </PaletteProvider>
  );
}