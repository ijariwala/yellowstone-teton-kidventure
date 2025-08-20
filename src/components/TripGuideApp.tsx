import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreTripGuide from './PreTripGuide';
import DuringTripGuide from './DuringTripGuide';

const TripGuideApp = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
          🏔️ Your Yellowstone & Grand Teton Adventure Guide! 🦌
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Your ultimate family guide to exploring America's most amazing national parks!
        </p>
      </div>

      <Tabs defaultValue="pre-trip" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="pre-trip" className="text-lg py-3">
            📚 Pre-Trip Planning
          </TabsTrigger>
          <TabsTrigger value="during-trip" className="text-lg py-3">
            🎒 During Your Trip
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pre-trip">
          <PreTripGuide />
        </TabsContent>
        
        <TabsContent value="during-trip">
          <DuringTripGuide />
        </TabsContent>
      </Tabs>

      <footer className="text-center py-8 text-muted-foreground mt-8">
        <p className="text-lg font-medium text-forest">
          🏔️ Have the most amazing adventure ever! 🦌
        </p>
        <p className="text-sm mt-2">
          Remember to take lots of photos and make memories that will last a lifetime!
        </p>
      </footer>
    </div>
  );
};

export default TripGuideApp;