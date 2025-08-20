import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroSection from "./components/IntroSection";
import WildlifeSection from "./components/WildlifeSection";
import AttractionsSection from "./components/AttractionsSection";
import ItinerarySection from "./components/ItinerarySection";
import JuniorRangerSection from "./components/JuniorRangerSection";
import GamesActivitiesSection from "./components/GamesActivitiesSection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <IntroSection />
        <WildlifeSection />
        <AttractionsSection />
        <GamesActivitiesSection />
        <ItinerarySection />
        <JuniorRangerSection />
          
          <footer className="text-center py-8 text-muted-foreground">
            <p className="text-lg font-medium text-forest">
              🏔️ Have the most amazing adventure ever! 🦌
            </p>
            <p className="text-sm mt-2">
              Remember to take lots of photos and make memories that will last a lifetime!
            </p>
          </footer>
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
