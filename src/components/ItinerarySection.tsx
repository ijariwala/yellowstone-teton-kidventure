import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DayPlan {
  day: number;
  date: string;
  title: string;
  highlights: string[];
  location: string;
  funActivity: string;
  completed?: boolean;
}

const itineraryData: DayPlan[] = [
  {
    day: 1,
    date: "Sunday",
    title: "Grand Teton Adventure Begins!",
    highlights: [
      "Fly into Jackson - look for mountains from the plane!",
      "Jackson Lake Dam - epic mountain photos",
      "Jenny Lake boat ride or nature walk",
      "Hidden Falls hike (only 0.5 miles!)",
      "Chapel of the Transfiguration - tiny historic log church"
    ],
    location: "Grand Teton National Park",
    funActivity: "Take a boat across Jenny Lake - like a mini cruise!"
  },
  {
    day: 2,
    date: "Monday",
    title: "Complete Grand Teton Explorer",
    highlights: [
      "42-mile scenic drive around the mountains",
      "Oxbow Bend - best wildlife spotting place",
      "Mormon Row - historic barns with mountain backdrop",
      "Signal Mountain - panoramic views",
      "Jackson Lake Lodge - mountain views and snacks"
    ],
    location: "Grand Teton National Park",
    funActivity: "Count how many different animals you can spot at Oxbow Bend!"
  },
  {
    day: 3,
    date: "Tuesday",
    title: "Yellowstone Geysers & Hot Springs",
    highlights: [
      "Old Faithful - watch it erupt!",
      "Grand Prismatic Spring - see the rainbow colors",
      "Upper Geyser Basin - world's largest geyser area",
      "Fountain Paint Pot - see all 4 thermal features",
      "Junior Ranger activities"
    ],
    location: "Yellowstone National Park",
    funActivity: "Time Old Faithful's eruption - it happens about every 90 minutes!"
  },
  {
    day: 4,
    date: "Wednesday",
    title: "Grand Canyon & Wildlife Day",
    highlights: [
      "Grand Canyon of Yellowstone - colorful rock walls",
      "Artist Point - best waterfall view",
      "South Rim Trail - easy 1-mile walk",
      "Hayden Valley - buffalo spotting",
      "Mammoth Hot Springs - limestone terraces"
    ],
    location: "Yellowstone National Park",
    funActivity: "Look for the yellow rocks that gave Yellowstone its name!"
  },
  {
    day: 5,
    date: "Thursday",
    title: "Wolf Country & Northern Yellowstone",
    highlights: [
      "Lamar Valley - 'America's Serengeti'",
      "Wolf watching with binoculars",
      "Tower Fall - 132-foot waterfall",
      "Trout Lake hike - beautiful mountain lake",
      "Historic Fort Yellowstone"
    ],
    location: "Northern Yellowstone",
    funActivity: "Bring binoculars to spot wolves in Lamar Valley - you might see a pack!"
  },
  {
    day: 6,
    date: "Friday",
    title: "Roosevelt Arch & Dinosaur Museum",
    highlights: [
      "Roosevelt Arch - historic Yellowstone entrance",
      "Family photos at the arch",
      "Drive to Bozeman",
      "Museum of the Rockies - T. Rex and Triceratops!",
      "Flight home to Seattle"
    ],
    location: "Montana",
    funActivity: "See real dinosaur skeletons that are millions of years old!"
  }
];

const ItinerarySection = () => {
  const [checkedDays, setCheckedDays] = useState<number[]>([]);

  const toggleDay = (day: number) => {
    setCheckedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">🗓️ Your 6-Day Adventure Plan</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Here's what you'll be doing each day! Check off each day as you complete it.
        </p>
      </div>

      <div className="space-y-6">
        {itineraryData.map((day) => (
          <Card 
            key={day.day} 
            className={`bg-gradient-card shadow-card-adventure transition-all duration-300 ${
              checkedDays.includes(day.day) ? 'bg-forest/5 border-forest' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                    Day {day.day} - {day.title}
                    {checkedDays.includes(day.day) && <span className="text-forest">✅</span>}
                  </CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{day.date}</Badge>
                    <Badge className="bg-mountain text-primary-foreground">{day.location}</Badge>
                  </div>
                </div>
                <Button
                  variant={checkedDays.includes(day.day) ? "forest" : "outline"}
                  size="sm"
                  onClick={() => toggleDay(day.day)}
                >
                  {checkedDays.includes(day.day) ? "Complete!" : "Mark Done"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">📍 What You'll See:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {day.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-sunset mr-2">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-sunset/10 border border-sunset/20 rounded-lg p-4">
                  <h4 className="font-semibold text-sunset mb-2">🎯 Special Activity:</h4>
                  <p className="text-sm text-muted-foreground">{day.funActivity}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <div className="bg-gradient-adventure rounded-xl p-6 text-primary-foreground">
          <h3 className="text-xl font-bold mb-2">🏆 Adventure Progress</h3>
          <p className="text-lg">
            {checkedDays.length} of 6 days completed!
          </p>
          <div className="w-full bg-white/20 rounded-full h-3 mt-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${(checkedDays.length / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItinerarySection;