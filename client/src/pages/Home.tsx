import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import KeyboardShortcutsBar from "@/components/KeyboardShortcutsBar";
import ActionButtons from "@/components/ActionButtons";
import ColorCard from "@/components/ColorCard";
import OnboardingTour from "@/components/modals/OnboardingTour";
import ExportModal from "@/components/modals/ExportModal";
import AdjustColorModal from "@/components/modals/AdjustColorModal";
import { usePalette } from "@/contexts/PaletteContext";
import { type Color } from "@shared/schema";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { palette, generatePalette, addColor, clearPalette, updateColor } = usePalette();
  const { toast } = useToast();

  useEffect(() => {
    // Check if first visit
    const hasVisited = localStorage.getItem("hasVisitedPalettePro");
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem("hasVisitedPalettePro", "true");
    }
    
    // Setup space key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && 
          document.activeElement?.tagName !== "INPUT" && 
          document.activeElement?.tagName !== "TEXTAREA" &&
          !showOnboarding && 
          !showExportModal && 
          !showAdjustModal) {
        e.preventDefault();
        handleGeneratePalette();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showOnboarding, showExportModal, showAdjustModal, generatePalette]);

  const handleGeneratePalette = () => {
    // Call the generate palette function from context
    generatePalette();
    
    toast({
      title: "New palette generated!",
      description: "Press spacebar for another one.",
      duration: 2000,
    });
  };

  const handleSavePalette = () => {
    // Save to localStorage
    const savedPalettes = JSON.parse(localStorage.getItem("savedPalettes") || "[]");
    const newPalette = {
      id: Date.now(),
      colors: palette,
      createdAt: new Date().toISOString(),
    };
    
    savedPalettes.push(newPalette);
    localStorage.setItem("savedPalettes", JSON.stringify(savedPalettes));
    
    toast({
      title: "Palette saved!",
      description: "Your palette has been saved to local storage.",
      duration: 2000,
    });
  };

  const handleHelp = () => {
    setShowOnboarding(true);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleAdjustColor = (index: number) => {
    setActiveColorIndex(index);
    setShowAdjustModal(true);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header 
        onHelp={handleHelp} 
        onExport={handleExport} 
        onSave={handleSavePalette}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      
      <KeyboardShortcutsBar />
      
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden" id="paletteContainer">
        {palette.map((color, index) => (
          <ColorCard 
            key={index}
            color={color}
            index={index}
            onAdjustColor={() => handleAdjustColor(index)}
          />
        ))}
        
        <div className="hidden md:flex items-center justify-center w-16 bg-gray-100 border-l border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors"
            onClick={() => addColor()}>
          <div className="flex flex-col items-center justify-center text-gray-500 space-y-2">
            <i className="fas fa-plus text-xl"></i>
            <span className="text-xs font-medium">Add</span>
          </div>
        </div>
      </div>
      
      <ActionButtons 
        onGenerate={handleGeneratePalette}
        onAddColor={addColor}
        onClearAll={clearPalette}
      />
      
      {showOnboarding && <OnboardingTour onClose={() => setShowOnboarding(false)} />}
      
      {showExportModal && 
        <ExportModal 
          palette={palette} 
          onClose={() => setShowExportModal(false)} 
        />
      }
      
      {showAdjustModal && activeColorIndex !== null &&
        <AdjustColorModal 
          color={palette[activeColorIndex]} 
          onClose={() => setShowAdjustModal(false)}
          onApply={(updatedColor: Color) => {
            updateColor(activeColorIndex, updatedColor);
            setShowAdjustModal(false);
          }}
        />
      }
    </div>
  );
}
