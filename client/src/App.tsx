import React, { Suspense, useEffect, startTransition } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./hooks/use-auth";
import { PaletteProvider } from "./contexts/PaletteContext";
import { HelmetProvider } from 'react-helmet-async';

// Keep essential/small components synchronous
import NotFound from "@/pages/not-found";
import LandingPage from "@/pages/LandingPage";

// Lazy load heavy components for better performance
const TestApp = React.lazy(() => import("./TestApp"));
const Home = React.lazy(() => import("@/pages/Home"));
const ClothingPalettePage = React.lazy(() => import("@/pages/ClothingPalettePage"));
const ClothingColorGuide = React.lazy(() => import("@/pages/ClothingColorGuide"));
const VisualizerGuide = React.lazy(() => import("@/pages/VisualizerGuide"));
const ImagePaletteGuide = React.lazy(() => import("@/pages/ImagePaletteGuide"));
const ImagePalette = React.lazy(() => import("@/pages/image-palette"));
const PaletteVisualizer = React.lazy(() => import("@/pages/palette-visualizer"));
const PaletteVisualizerNew = React.lazy(() => import("@/pages/palette-visualizer-new"));
const PrivacyPolicy = React.lazy(() => import("@/pages/privacy-policy"));
const FAQPage = React.lazy(() => import("@/pages/faq"));
const DesignersGuide = React.lazy(() => import("@/pages/designers-guide"));

// Loading component for lazy-loaded routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-gray-600 font-medium">Loading...</p>
    </div>
  </div>
);

// Wrapper to handle route transitions properly
const LazyRoute = ({ component: Component, ...props }: any) => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

// Components that use the PaletteContext
const PaletteRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/generator">
        <LazyRoute component={TestApp} />
      </Route>
      <Route path="/clothing-palette">
        <LazyRoute component={ClothingPalettePage} />
      </Route>
      <Route path="/image-palette">
        <LazyRoute component={ImagePalette} />
      </Route>
      <Route path="/visualize">
        <LazyRoute component={PaletteVisualizerNew} />
      </Route>
      <Route path="/visualize-old">
        <LazyRoute component={PaletteVisualizer} />
      </Route>
      <Route path="/privacy-policy">
        <LazyRoute component={PrivacyPolicy} />
      </Route>
      <Route path="/faq">
        <LazyRoute component={FAQPage} />
      </Route>
      <Route path="/designers-guide">
        <LazyRoute component={DesignersGuide} />
      </Route>
      <Route path="/clothing-color-guide">
        <LazyRoute component={ClothingColorGuide} />
      </Route>
      <Route path="/visualizer-guide">
        <LazyRoute component={VisualizerGuide} />
      </Route>
      <Route path="/image-palette-guide">
        <LazyRoute component={ImagePaletteGuide} />
      </Route>
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
