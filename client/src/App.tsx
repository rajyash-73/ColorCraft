import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/landing-page";
import FontsPage from "@/pages/fonts-page";
import ClothingPalettePage from "@/pages/clothing-palette-page";
import TestApp from "./TestApp";
import ImagePalette from "@/pages/image-palette";
import PaletteVisualizer from "@/pages/palette-visualizer";
import PaletteVisualizerNew from "@/pages/palette-visualizer-new";
import PrivacyPolicy from "@/pages/privacy-policy";
import FAQPage from "@/pages/faq";
import DesignersGuide from "@/pages/designers-guide";
import { useEffect } from "react";
import { PaletteProvider } from "./contexts/PaletteContext";
import { HelmetProvider } from 'react-helmet-async';

// Main application routes
const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/generate" component={TestApp} />
      <Route path="/palettes" component={TestApp} />
      <Route path="/image-picker" component={ImagePalette} />
      <Route path="/fonts" component={FontsPage} />
      <Route path="/clothing-palette" component={ClothingPalettePage} />
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
  return <AppRoutes />;
}

function App() {
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
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <PaletteProvider>
          <Router />
          <Toaster />
        </PaletteProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
