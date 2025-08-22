import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PreTripGuide from './PreTripGuide';
import DuringTripGuide from './DuringTripGuide';

const TripGuideApp = () => {
  return (
    <div className="container mx-auto px-3 py-4 md:px-4 md:py-8 max-w-6xl">
      <div className="text-center mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-3 md:mb-4 leading-tight">
          🏔️ Your Yellowstone & Grand Teton Adventure Guide! 🦌
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
          Your ultimate family guide to exploring America's most amazing national parks!
        </p>
        <div className="mt-4 md:mt-6">
          <Link to="/document">
            <Button variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 py-3 touch-target">
              📄 Get Printable Version
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="pre-trip" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 md:mb-8 h-auto">
          <TabsTrigger value="pre-trip" className="text-sm md:text-lg py-3 md:py-4 touch-target flex-1">
            📚 Pre-Trip Planning
          </TabsTrigger>
          <TabsTrigger value="during-trip" className="text-sm md:text-lg py-3 md:py-4 touch-target flex-1">
            🎒 During Your Trip
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pre-trip" className="mt-0">
          <PreTripGuide />
        </TabsContent>
        
        <TabsContent value="during-trip" className="mt-0">
          <DuringTripGuide />
        </TabsContent>
      </Tabs>

      <footer className="text-center py-6 md:py-8 text-muted-foreground mt-6 md:mt-8">
        <p className="text-base md:text-lg font-medium text-forest">
          🏔️ Have the most amazing adventure ever! 🦌
        </p>
        <p className="text-xs md:text-sm mt-2 px-4">
          Remember to take lots of photos and make memories that will last a lifetime!
        </p>
      </footer>
    </div>
  );
};

export default TripGuideApp;