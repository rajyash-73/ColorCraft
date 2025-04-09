import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Link } from "wouter";
import Header from "@/components/Header";
import KeyboardShortcutsBar from "@/components/KeyboardShortcutsBar";
import ActionButtons from "@/components/ActionButtons";
import ColorCard from "@/components/ColorCard";
import OnboardingTour from "@/components/modals/OnboardingTour";
import ExportModal from "@/components/modals/ExportModal";
import AdjustColorModal from "@/components/modals/AdjustColorModal";
import { usePalette } from "@/contexts/PaletteContext";
import { type Color } from "@shared/schema";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Save, BookmarkPlus } from "lucide-react";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const [activeColorIndex, setActiveColorIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { palette, generatePalette, addColor, clearPalette, updateColor } = usePalette();
  const { toast } = useToast();
  const { user } = useAuth();
  const paletteNameInputRef = useRef<HTMLInputElement>(null);
  
  console.log('Home component rendered with palette:', palette);

  // Mutation for saving palette to the database
  const savePaletteMutation = useMutation({
    mutationFn: async (data: { name: string, colors: string }) => {
      const response = await apiRequest(
        "POST", 
        "/api/palettes", 
        {
          name: data.name,
          colors: data.colors,
          createdAt: new Date().toISOString()
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/palettes"] });
      toast({
        title: "Palette saved!",
        description: "Your palette has been saved to your account.",
      });
      setShowSaveDialog(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving palette",
        description: error.message,
        variant: "destructive",
      });
    },
  });

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
          !showAdjustModal &&
          !showSaveDialog) {
        e.preventDefault();
        handleGeneratePalette();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showOnboarding, showExportModal, showAdjustModal, showSaveDialog, generatePalette]);

  useEffect(() => {
    if (showSaveDialog && paletteNameInputRef.current) {
      paletteNameInputRef.current.focus();
    }
  }, [showSaveDialog]);

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
    // Open save dialog
    setPaletteName(`My Palette ${new Date().toLocaleDateString()}`);
    setShowSaveDialog(true);
  };
  
  const handleSaveConfirm = () => {
    if (!paletteName.trim()) {
      toast({
        title: "Name required",
        description: "Please give your palette a name.",
        variant: "destructive",
      });
      return;
    }
    
    // Extract just the hex values for storage
    const colorsArray = palette.map(color => color.hex);
    const colorsString = JSON.stringify(colorsArray);
    
    savePaletteMutation.mutate({
      name: paletteName.trim(),
      colors: colorsString
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
      
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save Palette</DialogTitle>
            <DialogDescription>
              Give your palette a name to save it to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex h-16 mb-4 rounded overflow-hidden">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="flex-1"
                  style={{ backgroundColor: color.hex }}
                ></div>
              ))}
            </div>
            <Input
              ref={paletteNameInputRef}
              placeholder="My awesome palette"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveConfirm();
              }}
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSaveDialog(false)}
              className="sm:ml-auto"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveConfirm}
              disabled={savePaletteMutation.isPending}
              className="gap-2"
            >
              {savePaletteMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Palette
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Link to saved palettes */}
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50 shadow-md gap-2"
        asChild
      >
        <Link href="/saved-palettes">
          <BookmarkPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Saved Palettes</span>
        </Link>
      </Button>
    </div>
  );
}
