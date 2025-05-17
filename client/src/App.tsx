import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ImagePalette from "@/pages/image-palette";
import PaletteVisualizer from "@/pages/palette-visualizer";
import PaletteVisualizerNew from "@/pages/palette-visualizer-new";
import PrivacyPolicy from "@/pages/privacy-policy";
import FAQPage from "@/pages/faq";
import DesignersGuide from "@/pages/designers-guide";
import { useEffect, useState } from "react";
import { AuthProvider } from "./hooks/use-auth";
import { PaletteProvider } from "./contexts/PaletteContext";
import TestApp from "./TestApp";
import { HelmetProvider } from 'react-helmet-async';
import Navigation from '../../components/Navigation';
import { Color } from '../../shared/schema';
import SavePaletteModal from '../../components/SavePaletteModal';

// Components that use the PaletteContext
const PaletteRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={TestApp} />
      <Route path="/image-palette" component={ImagePalette} />
      <Route path="/visualize" component={PaletteVisualizerNew} />
      <Route path="/visualize-old" component={PaletteVisualizer} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/designers-guide" component={DesignersGuide} />
      <Route component={NotFound} />
    </Switch>
  );
};

function Router() {
  return <PaletteRoutes />;
}

function App() {
  // State for save palette modal
  const [showSavePaletteModal, setShowSavePaletteModal] = useState(false);
  const [currentPalette, setCurrentPalette] = useState<Color[]>([]);
  const [savePaletteSuccess, setSavePaletteSuccess] = useState(false);

  useEffect(() => {
    // Initialize keyboard shortcut listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && 
          document.activeElement?.tagName !== "INPUT" && 
          document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    // Set up custom event listener for saving palettes
    const handleSavePaletteEvent = (event: CustomEvent<Color[]>) => {
      setCurrentPalette(event.detail);
      setShowSavePaletteModal(true);
    };
    
    // Add event listener for custom save palette event
    document.addEventListener('savePalette', handleSavePaletteEvent as EventListener);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener('savePalette', handleSavePaletteEvent as EventListener);
    };
  }, []);
  
  // Handle successful save
  const handleSaveSuccess = () => {
    setSavePaletteSuccess(true);
    setTimeout(() => setSavePaletteSuccess(false), 3000);
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PaletteProvider>
            <Navigation />
            <Router />
            <Toaster />
            
            {/* Save Palette Modal */}
            {showSavePaletteModal && (
              <SavePaletteModal 
                isOpen={showSavePaletteModal}
                onClose={() => setShowSavePaletteModal(false)}
                palette={currentPalette}
                onSuccess={handleSaveSuccess}
              />
            )}
            
            {/* Success Notification */}
            {savePaletteSuccess && (
              <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center z-50">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Palette saved successfully!</span>
              </div>
            )}
          </PaletteProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
