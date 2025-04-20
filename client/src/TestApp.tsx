import React, { useState, useRef, useEffect } from 'react';
import { Color } from './types/Color';
import { isLightColor } from '@/lib/colorUtils';
import { LockIcon, UnlockIcon, RefreshCw, Copy, Download, Plus, Trash, Info, Sliders, GripVertical, Image as ImageIcon } from 'lucide-react';
import html2canvas from 'html2canvas';
import ColorAdjustmentModal from '@/components/ColorAdjustmentModal';
import TrendingPalettes from '@/components/TrendingPalettes';
import WelcomeModal from '@/components/modals/WelcomeModal';
import { usePalette } from '@/contexts/PaletteContext';
import { Link } from 'wouter';

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
    setPalette: setPaletteColors,
    reorderColors
  } = usePalette();
  
  const [toast, setToast] = useState<string | null>(null);
  const [showInfoTooltip, setShowInfoTooltip] = useState<number | null>(null);
  const [showAdjustModal, setShowAdjustModal] = useState<boolean>(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
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
  
  // Drag and drop handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
  };
  
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    
    reorderColors(draggedIndex, targetIndex);
    setDraggedIndex(null);
    setToast("Color order updated");
  };
  
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">
          Palette Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Press spacebar to generate a new palette. Click on a color to lock/unlock it. Use the grip handle to drag and reorder colors.
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
        
        <Link href="/image-palette">
          <a className="bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center gap-2">
            <ImageIcon size={18} />
            Create from Image
          </a>
        </Link>
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
                className={`flex-1 relative transition-all group ${draggedIndex === index ? 'opacity-50' : ''}`}
                style={{ backgroundColor: color.hex }}
                draggable={true}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
              >
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${textColor}`}>
                  <div className="absolute top-3 left-3">
                    <div 
                      className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all cursor-move"
                      title="Drag to reorder"
                    >
                      <GripVertical size={18} />
                    </div>
                  </div>
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
                      {color.name && (
                        <p className="text-sm font-semibold mb-2">{color.name}</p>
                      )}
                      <p className="text-sm font-semibold">RGB Values:</p>
                      <p className="text-xs">R: {color.rgb.r}</p>
                      <p className="text-xs">G: {color.rgb.g}</p>
                      <p className="text-xs">B: {color.rgb.b}</p>
                    </div>
                  )}
                  
                  <div className="mt-auto mb-4 text-center">
                    <h3 className="text-2xl font-bold mb-1">{color.hex}</h3>
                    {color.name && (
                      <p className="text-sm mb-2 opacity-90">{color.name}</p>
                    )}
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
        <p>Press spacebar to generate a new palette | Click on the lock icon to keep a color | Drag and drop to reorder</p>
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

// Main component export
export default function TestApp() {
  return (
    <>
      <PaletteApp />
      <WelcomeModal />
    </>
  );
}