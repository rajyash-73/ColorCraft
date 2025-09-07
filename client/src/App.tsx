import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import TestApp from "./TestApp";
import ImagePalette from "@/pages/image-palette";
import PaletteVisualizer from "@/pages/palette-visualizer";
import PaletteVisualizerNew from "@/pages/palette-visualizer-new";
import PrivacyPolicy from "@/pages/privacy-policy";
import FAQPage from "@/pages/faq";
import DesignersGuide from "@/pages/designers-guide";
import { useEffect } from "react";
import { AuthProvider } from "./hooks/use-auth";
import { PaletteProvider } from "./contexts/PaletteContext";
import { HelmetProvider } from 'react-helmet-async';

// Components that use the PaletteContext
const PaletteRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={TestApp} />
      <Route path="/auth" component={AuthPage} />
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
        <AuthProvider>
          <PaletteProvider>
            <Router />
            <Toaster />
          </PaletteProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
