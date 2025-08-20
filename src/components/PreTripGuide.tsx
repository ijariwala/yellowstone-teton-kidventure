import React from 'react';
import IntroSection from './IntroSection';
import WildlifeSection from './WildlifeSection';
import AttractionsSection from './AttractionsSection';
import GamesActivitiesSection from './GamesActivitiesSection';
import MapSection from './MapSection';
import ItinerarySection from './ItinerarySection';
import JuniorRangerSection from './JuniorRangerSection';

const PreTripGuide = () => {
  return (
    <div className="space-y-8">
      <IntroSection />
      <WildlifeSection />
      <AttractionsSection />
      <GamesActivitiesSection />
      <MapSection />
      <ItinerarySection />
      <JuniorRangerSection />
    </div>
  );
};

export default PreTripGuide;