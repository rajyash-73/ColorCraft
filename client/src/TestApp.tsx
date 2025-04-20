import React, { useState, useRef, useEffect } from 'react';
import { Color } from './types/Color';
import { isLightColor } from '@/lib/colorUtils';
import { LockIcon, UnlockIcon, RefreshCw, Copy, Download, Plus, Trash, Info, Sliders, GripVertical, Image as ImageIcon, Eye } from 'lucide-react';
import html2canvas from 'html2canvas';
import ColorAdjustmentModal from '@/components/ColorAdjustmentModal';
import TrendingPalettes from '@/components/TrendingPalettes';
import WelcomeModal from '@/components/modals/WelcomeModal';
import Footer from '@/components/Footer';
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
      <header className="mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">
          Palette Generator
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
          Press spacebar to generate a new palette. Click a color to lock/unlock. Drag to reorder.
        </p>
      </header>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-3 sm:gap-4 mb-8">
        <button 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
          onClick={generatePalette}
        >
          <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Generate</span>
        </button>
        
        <button 
          className="bg-white text-gray-800 border border-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
          onClick={addColor}
          disabled={palette.length >= 10}
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Add Color</span>
        </button>
        
        <button 
          className="bg-white text-gray-800 border border-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
          onClick={resetPalette}
        >
          <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>Reset</span>
        </button>
        
        <button 
          className="bg-white text-gray-800 border border-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
          onClick={exportPalette}
        >
          <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>PNG</span>
        </button>
        
        <button 
          className="bg-white text-gray-800 border border-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base"
          onClick={exportPaletteAsJSON}
        >
          <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span>JSON</span>
        </button>
        
        <Link href="/image-palette">
          <a className="bg-white text-gray-800 border border-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base">
            <ImageIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>From Image</span>
          </a>
        </Link>
        
        <Link href="/visualize">
          <a className="bg-white text-gray-800 border border-gray-300 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base">
            <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span>Visualize</span>
          </a>
        </Link>
      </div>
      
      <div className="flex-1">
        <div 
          ref={paletteRef} 
          className="flex flex-col md:flex-row h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl"
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
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-2 sm:p-4 ${textColor}`}>
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <div 
                      className="p-1.5 sm:p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all cursor-move"
                      title="Drag to reorder"
                    >
                      <GripVertical size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                  </div>
                  
                  {/* Mobile-friendly action buttons */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex space-x-1 sm:space-x-2">
                    <button 
                      className="p-1.5 sm:p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      onClick={() => toggleLock(index)}
                      title={color.locked ? "Unlock color" : "Lock color"}
                    >
                      {color.locked ? 
                        <LockIcon size={16} className="sm:w-[18px] sm:h-[18px]" /> : 
                        <UnlockIcon size={16} className="sm:w-[18px] sm:h-[18px]" />
                      }
                    </button>
                    
                    <button 
                      className="p-1.5 sm:p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all hidden sm:block"
                      onClick={() => handleAdjustColor(index)}
                      title="Adjust color"
                    >
                      <Sliders size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    
                    <button 
                      className="p-1.5 sm:p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      onClick={() => removeColor(index)}
                      disabled={palette.length <= 2}
                      title="Remove color"
                    >
                      <Trash size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    
                    <button 
                      className="p-1.5 sm:p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                      onClick={() => setShowInfoTooltip(showInfoTooltip === index ? null : index)}
                      title="Color information"
                    >
                      <Info size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>
                  
                  {/* Mobile-friendly popup for sliders on small screens */}
                  <button 
                    className="absolute bottom-16 right-2 p-1.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all sm:hidden"
                    onClick={() => handleAdjustColor(index)}
                    title="Adjust color"
                  >
                    <Sliders size={16} />
                  </button>
                  
                  {showInfoTooltip === index && (
                    <div className="absolute top-12 sm:top-14 right-2 sm:right-3 bg-white text-gray-800 p-3 rounded-lg shadow-lg z-10 w-[140px] sm:w-48">
                      {color.name && (
                        <p className="text-sm font-semibold mb-2">{color.name}</p>
                      )}
                      <div className="grid grid-cols-3 gap-1">
                        <p className="text-xs font-medium">R: {color.rgb.r}</p>
                        <p className="text-xs font-medium">G: {color.rgb.g}</p>
                        <p className="text-xs font-medium">B: {color.rgb.b}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-auto mb-2 sm:mb-4 text-center">
                    <h3 className="text-lg sm:text-2xl font-bold mb-0.5 sm:mb-1">{color.hex}</h3>
                    {color.name && (
                      <p className="text-xs sm:text-sm mb-1 sm:mb-2 opacity-90">{color.name}</p>
                    )}
                    <button 
                      className="px-2 sm:px-3 py-0.5 sm:py-1 rounded bg-white bg-opacity-20 hover:bg-opacity-30 transition-all flex items-center gap-1 mx-auto text-xs sm:text-sm"
                      onClick={() => copyToClipboard(color.hex)}
                    >
                      <Copy size={12} className="sm:w-[14px] sm:h-[14px]" />
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
      
      <div className="mt-4 sm:mt-8 text-center text-gray-600 text-xs sm:text-sm px-2">
        <p>Press spacebar to generate • Click lock icon to keep a color • Drag to reorder</p>
      </div>
      
      {/* Footer */}
      <Footer />
      
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