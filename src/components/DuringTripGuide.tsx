import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Camera, Star, MapPin, Clock, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface DayPlan {
  day: number;
  date: string;
  title: string;
  location: string;
  timeRange: string;
  highlights: string[];
  funActivity: string;
  games: {
    title: string;
    description: string;
    type: 'challenge' | 'observation' | 'creative';
  }[];
  completed: boolean;
}

const itineraryData: DayPlan[] = [
  {
    day: 1,
    date: "Sunday",
    title: "Arrival & Grand Teton Adventure",
    location: "Grand Teton National Park",
    timeRange: "12:30 PM - 7:00 PM",
    highlights: [
      "Land in Jackson Airport",
      "Explore Jackson Town Square",
      "Jackson Lake Dam scenic views",
      "Jenny Lake boat ride or walk",
      "Hidden Falls short hike",
      "Chapel of the Transfiguration",
      "Check into Grant Village",
      "West Thumb Geyser Basin sunset walk"
    ],
    funActivity: "Take a boat ride across Jenny Lake!",
    games: [
      {
        title: "Airport Scavenger Hunt",
        description: "Find: A cowboy hat, a bison statue, Wyoming license plate, someone with hiking boots",
        type: "challenge"
      },
      {
        title: "Mountain Peak Spotting",
        description: "How many mountain peaks can you see from Jackson Lake? Draw them!",
        type: "observation"
      },
      {
        title: "Chapel Story Time",
        description: "Write a short story about what it would be like to get married with mountains behind you",
        type: "creative"
      }
    ],
    completed: false
  },
  {
    day: 2,
    date: "Monday", 
    title: "Complete Grand Teton Exploration",
    location: "Grand Teton National Park",
    timeRange: "8:00 AM - 4:00 PM",
    highlights: [
      "42-mile Grand Teton Scenic Loop Drive",
      "Jackson Lake Lodge mountain views",
      "Signal Mountain panoramic overlook",
      "Oxbow Bend wildlife viewing",
      "Mormon Row historic barns",
      "Photography opportunities",
      "Visitor center exhibits",
      "Return to Grant Village for relaxation"
    ],
    funActivity: "Drive the complete scenic loop and count all the different animals you see!",
    games: [
      {
        title: "Wildlife Bingo Bonanza",
        description: "Create bingo cards with: Moose, Elk, Bear, Eagle, Beaver, Pronghorn, Mule Deer",
        type: "observation"
      },
      {
        title: "Historic Barn Art Challenge",
        description: "Sketch or photograph the Mormon Row barns, then design your own dream barn",
        type: "creative"
      },
      {
        title: "Mountain Name Game",
        description: "Learn the names of 5 Teton peaks: Grand Teton, Mount Owen, Teewinot, Middle Teton, South Teton",
        type: "challenge"
      }
    ],
    completed: false
  },
  {
    day: 3,
    date: "Tuesday",
    title: "Geyser Basins & Thermal Wonders",
    location: "Yellowstone - Old Faithful Area",
    timeRange: "8:00 AM - Evening",
    highlights: [
      "Old Faithful Geyser eruption",
      "Upper Geyser Basin exploration", 
      "Old Faithful Visitor Center",
      "Grand Prismatic Spring rainbow colors",
      "Grand Prismatic Overlook Trail",
      "Fountain Paint Pot thermal features",
      "Biscuit Basin or Black Sand Basin",
      "Junior Ranger activities"
    ],
    funActivity: "Predict when Old Faithful will erupt next!",
    games: [
      {
        title: "Geyser Prediction Challenge",
        description: "Time Old Faithful and predict the next eruption. Rangers can help with prediction windows!",
        type: "challenge"
      },
      {
        title: "Thermal Color Hunt",
        description: "Find and photograph 7 different colors in Grand Prismatic Spring",
        type: "observation"
      },
      {
        title: "Create Your Own Geyser",
        description: "Draw and name your own geyser. What would make it special?",
        type: "creative"
      }
    ],
    completed: false
  },
  {
    day: 4,
    date: "Wednesday",
    title: "Grand Canyon & Journey North",
    location: "Yellowstone Canyon & Mammoth",
    timeRange: "7:30 AM - 5:30 PM",
    highlights: [
      "Grand Canyon of Yellowstone",
      "Artist Point iconic Lower Falls view",
      "South Rim Trail easy walk",
      "North Rim different perspectives",
      "Hayden Valley wildlife viewing",
      "Mud Volcano and Dragon's Mouth Spring",
      "Mammoth Hot Springs terraces",
      "Move to Gardiner hotel"
    ],
    funActivity: "Count the different colors in the Grand Canyon walls!",
    games: [
      {
        title: "Canyon Color Counting",
        description: "How many different colors can you spot in the canyon walls? Red, yellow, orange, pink, white...",
        type: "observation"
      },
      {
        title: "Waterfall Height Challenge",
        description: "The Lower Falls is 308 feet tall. What else is that tall? Compare to buildings you know!",
        type: "challenge"
      },
      {
        title: "Dragon's Mouth Story",
        description: "Write a story about what lives in Dragon's Mouth Spring making all that noise!",
        type: "creative"
      }
    ],
    completed: false
  },
  {
    day: 5,
    date: "Thursday",
    title: "Northern Yellowstone Wildlife Safari",
    location: "Lamar Valley & Northern Range",
    timeRange: "7:00 AM - Evening",
    highlights: [
      "Lamar Valley \"America's Serengeti\"",
      "Wolf and bear spotting opportunities",
      "Massive bison herds",
      "Elk bugling (seasonal)",
      "Tower Fall 132-foot waterfall",
      "Mammoth Hot Springs terraces",
      "Historic Fort Yellowstone",
      "Trout Lake family hike"
    ],
    funActivity: "Become a wildlife tracker and record every animal you see!",
    games: [
      {
        title: "Wildlife Tracker Certification",
        description: "Keep a detailed log: animal type, time spotted, behavior, number seen",
        type: "observation"
      },
      {
        title: "Bison Herd Count Challenge",
        description: "Work as a family to count a bison herd. Who gets closest to the real number?",
        type: "challenge"
      },
      {
        title: "Animal Sound Symphony",
        description: "Record or imitate animal sounds you hear: elk bugles, wolf howls, bird calls",
        type: "creative"
      }
    ],
    completed: false
  },
  {
    day: 6,
    date: "Friday",
    title: "Historic Farewell & Dinosaur Discovery",
    location: "Roosevelt Arch & Museum of the Rockies",
    timeRange: "9:00 AM - 3:08 PM Flight",
    highlights: [
      "Roosevelt Arch historic entrance",
      "\"For the Benefit and Enjoyment of the People\"",
      "Family photos at the arch",
      "Drive to Bozeman",
      "Museum of the Rockies highlights",
      "T. Rex and Triceratops exhibits",
      "Interactive dinosaur discovery",
      "Final souvenir shopping"
    ],
    funActivity: "Become a paleontologist at the Museum of the Rockies!",
    games: [
      {
        title: "Arch History Detective",
        description: "Find out: When was the arch built? Who was Roosevelt? Why is this inscription important?",
        type: "challenge"
      },
      {
        title: "Dinosaur vs Park Animals",
        description: "Compare dinosaurs to animals you saw in the parks. Which is bigger/smaller/faster?",
        type: "observation"
      },
      {
        title: "Trip Memory Book",
        description: "Create a final page in your journal with your top 5 favorite moments",
        type: "creative"
      }
    ],
    completed: false
  }
];

interface Reflection {
  dayNumber: number;
  text: string;
  rating: number;
  photos: string[];
  favorite: string;
}

const DuringTripGuide = () => {
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [reflections, setReflections] = useState<Record<number, Reflection>>({});
  const [currentReflection, setCurrentReflection] = useState<Partial<Reflection>>({});
  const { toast } = useToast();

  const toggleDay = (dayNumber: number) => {
    setExpandedDays(prev => 
      prev.includes(dayNumber) 
        ? prev.filter(d => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };

  const markDayComplete = (dayNumber: number) => {
    setCompletedDays(prev => 
      prev.includes(dayNumber) 
        ? prev.filter(d => d !== dayNumber)
        : [...prev, dayNumber]
    );
    
    toast({
      title: `Day ${dayNumber} marked as ${completedDays.includes(dayNumber) ? 'incomplete' : 'complete'}!`,
      description: completedDays.includes(dayNumber) 
        ? "You can always come back to this day" 
        : "Great job exploring! Don't forget to add your reflections.",
    });
  };

  const saveReflection = (dayNumber: number) => {
    if (currentReflection.text && currentReflection.rating) {
      setReflections(prev => ({
        ...prev,
        [dayNumber]: {
          dayNumber,
          text: currentReflection.text,
          rating: currentReflection.rating,
          photos: currentReflection.photos || [],
          favorite: currentReflection.favorite || ''
        } as Reflection
      }));
      
      setCurrentReflection({});
      
      toast({
        title: "Reflection saved! 🌟",
        description: "Your memories have been recorded for this day.",
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Progress Overview */}
      <Card className="bg-gradient-adventure shadow-adventure">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
            🎒 Your Adventure Progress
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {completedDays.length}/{itineraryData.length} Days
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-4 mb-4">
            <div 
              className="bg-gradient-to-r from-forest to-mountain h-4 rounded-full transition-all duration-500"
              style={{ width: `${(completedDays.length / itineraryData.length) * 100}%` }}
            />
          </div>
          <p className="text-muted-foreground text-center">
            {completedDays.length === 0 && "Your adventure is about to begin! 🚀"}
            {completedDays.length > 0 && completedDays.length < itineraryData.length && 
              `Amazing progress! Keep exploring and creating memories! 🌟`}
            {completedDays.length === itineraryData.length && 
              "Congratulations! You've completed your entire Yellowstone adventure! 🎉"}
          </p>
        </CardContent>
      </Card>

      {/* Daily Itinerary */}
      <Card className="bg-card shadow-card-adventure">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
            📅 Your Daily Adventures
          </CardTitle>
          <p className="text-muted-foreground">
            Click on each day to expand details, play games, and add reflections!
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {itineraryData.map((day) => (
            <Collapsible key={day.day} open={expandedDays.includes(day.day)}>
              <CollapsibleTrigger asChild>
                <Card 
                  className={`transition-all duration-200 cursor-pointer hover:shadow-lg ${
                    completedDays.includes(day.day) ? 'bg-forest/10 border-forest/30' : 'hover:bg-accent/50'
                  }`}
                  onClick={() => toggleDay(day.day)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {expandedDays.includes(day.day) ? (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <h3 className="text-xl font-bold text-foreground">
                            Day {day.day}: {day.date}
                          </h3>
                          <p className="text-lg text-mountain font-medium">{day.title}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {day.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {day.timeRange}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {completedDays.includes(day.day) && (
                          <Badge className="bg-forest text-forest-foreground">
                            ✅ Complete
                          </Badge>
                        )}
                        {reflections[day.day] && (
                          <Badge variant="outline" className="border-sunset text-sunset">
                            📝 Reflected
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <Card className="mt-2 bg-gradient-card">
                  <CardContent className="pt-6 space-y-6">
                    
                    {/* Highlights */}
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Star className="h-5 w-5 text-sunset" />
                        Today's Highlights
                      </h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {day.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded bg-background/50">
                            <div className="w-2 h-2 bg-mountain rounded-full" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fun Activity */}
                    <div className="bg-sunset/10 border border-sunset/20 rounded-lg p-4">
                      <h4 className="font-bold text-sunset mb-2">🎯 Special Activity</h4>
                      <p className="text-foreground">{day.funActivity}</p>
                    </div>

                    {/* Games for the Day */}
                    <div>
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Users className="h-5 w-5 text-forest" />
                        Today's Games & Challenges
                      </h4>
                      <div className="grid gap-3">
                        {day.games.map((game, index) => (
                          <Card key={index} className="bg-background/50">
                            <CardContent className="pt-4">
                              <div className="flex items-start gap-3">
                                <Badge 
                                  variant="outline" 
                                  className={`${
                                    game.type === 'challenge' ? 'border-mountain text-mountain' :
                                    game.type === 'observation' ? 'border-forest text-forest' :
                                    'border-sunset text-sunset'
                                  }`}
                                >
                                  {game.type === 'challenge' ? '🏆' : game.type === 'observation' ? '🔍' : '🎨'}
                                  {game.type}
                                </Badge>
                                <div className="flex-1">
                                  <h5 className="font-semibold mb-1">{game.title}</h5>
                                  <p className="text-sm text-muted-foreground">{game.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Reflection Section */}
                    <div className="border-t pt-6">
                      <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Camera className="h-5 w-5 text-mountain" />
                        Day {day.day} Reflection
                      </h4>
                      
                      {reflections[day.day] ? (
                        <div className="space-y-3 p-4 bg-mountain/10 rounded-lg">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Rating:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < reflections[day.day].rating ? 'fill-sunset text-sunset' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Reflection:</span>
                            <p className="mt-1 text-muted-foreground">{reflections[day.day].text}</p>
                          </div>
                          {reflections[day.day].favorite && (
                            <div>
                              <span className="font-medium">Favorite Moment:</span>
                              <p className="mt-1 text-muted-foreground">{reflections[day.day].favorite}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-4 p-4 bg-accent/20 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium mb-2">How was your day? (1-5 stars)</label>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Button
                                  key={i}
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setCurrentReflection(prev => ({ ...prev, rating: i + 1 }))}
                                  className="p-1"
                                >
                                  <Star 
                                    className={`h-5 w-5 ${
                                      (currentReflection.rating || 0) > i ? 'fill-sunset text-sunset' : 'text-muted-foreground'
                                    }`} 
                                  />
                                </Button>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">What was your favorite moment today?</label>
                            <Input
                              placeholder="My favorite moment was..."
                              value={currentReflection.favorite || ''}
                              onChange={(e) => setCurrentReflection(prev => ({ ...prev, favorite: e.target.value }))}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">Tell us about your day!</label>
                            <Textarea
                              placeholder="Today I learned... The coolest thing I saw was... I felt..."
                              value={currentReflection.text || ''}
                              onChange={(e) => setCurrentReflection(prev => ({ ...prev, text: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          
                          <Button 
                            onClick={() => saveReflection(day.day)}
                            disabled={!currentReflection.text || !currentReflection.rating}
                            className="w-full"
                          >
                            Save My Reflection 📝
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Mark Complete */}
                    <div className="border-t pt-4 flex justify-between items-center">
                      <Button
                        variant={completedDays.includes(day.day) ? "secondary" : "default"}
                        onClick={() => markDayComplete(day.day)}
                        className="flex items-center gap-2"
                      >
                        {completedDays.includes(day.day) ? (
                          <>
                            ↶ Mark Incomplete
                          </>
                        ) : (
                          <>
                            ✅ Mark Day Complete
                          </>
                        )}
                      </Button>
                      
                      {completedDays.includes(day.day) && (
                        <Badge className="bg-forest text-forest-foreground px-3 py-1">
                          Great job today! 🌟
                        </Badge>
                      )}
                    </div>

                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>

      {/* Trip Summary */}
      {completedDays.length > 0 && (
        <Card className="bg-gradient-hero shadow-adventure">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground">
              🏆 Your Adventure Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-mountain">{completedDays.length}</div>
                <div className="text-sm text-muted-foreground">Days Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest">{Object.keys(reflections).length}</div>
                <div className="text-sm text-muted-foreground">Reflections Written</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sunset">
                  {Object.values(reflections).reduce((sum, r) => sum + r.rating, 0) / Object.keys(reflections).length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

    </div>
  );
};

export default DuringTripGuide;