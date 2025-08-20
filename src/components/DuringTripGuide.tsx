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
      "🏔️ Jackson Hole Airport - Gateway to Adventure (6,300 ft elevation!)",
      "🤠 Jackson Town Square - Famous elk antler arches & boardwalks",
      "🌊 Jackson Lake Dam - 39,000 acres of pristine mountain lake",
      "⛵ Jenny Lake - Crown jewel with crystal clear glacial waters",
      "💧 Hidden Falls - 200-foot cascading waterfall through the forest",
      "⛪ Chapel of the Transfiguration - Historic 1925 log chapel with Teton backdrop",
      "🏨 Grant Village Check-in - Your Yellowstone basecamp on Yellowstone Lake",
      "🌋 West Thumb Geyser Basin - Unique lakeside thermal features at sunset",
      "🌟 COOL FACT: Grand Teton (13,775 ft) means 'Big Breast' in French!",
      "🦌 Wildlife Alert: Watch for moose, elk, and black bears in this area!"
    ],
    funActivity: "Take a boat ride across Jenny Lake and look for the legendary lake trout that can grow up to 40 pounds!",
    games: [
      {
        title: "Airport Scavenger Hunt",
        description: "Find: A cowboy hat, a bison statue, Wyoming license plate, someone with hiking boots, and count how many people have backpacks!",
        type: "challenge"
      },
      {
        title: "Mountain Peak Spotting",
        description: "The Teton Range has 8 peaks over 12,000 feet! How many can you see from Jackson Lake? Draw and name them!",
        type: "observation"
      },
      {
        title: "Chapel Story Time",
        description: "Write a short story about what it would be like to get married with 13,775-foot mountains behind you. What animals might attend?",
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
      "🛣️ 42-Mile Grand Teton Scenic Loop Drive - America's most spectacular mountain drive",
      "🏨 Jackson Lake Lodge - Famous 1950s lodge with 60-foot picture windows",
      "⛰️ Signal Mountain Summit - 800-foot climb for 360° views of Jackson Hole",
      "🦌 Oxbow Bend - Premier wildlife viewing spot (bring binoculars!)",
      "🏚️ Mormon Row Historic District - 1890s homestead with iconic Moulton Barns",
      "📸 Ansel Adams Photography Spots - Where the master captured famous shots",
      "🏛️ Craig Thomas Discovery Center - Interactive exhibits about park ecosystem",
      "🌅 Schwabacher Landing - Perfect reflections of the Teton Range",
      "🌟 COOL FACT: The Tetons are the youngest mountain range in the Rockies (13 million years old)!",
      "🐻 Wildlife Hotspot: This area has the highest concentration of large mammals in the lower 48!"
    ],
    funActivity: "Complete the scenic loop and create a 'wildlife species count' - Mormon Row alone is home to over 300 species!",
    games: [
      {
        title: "Wildlife Bingo Bonanza Plus",
        description: "Advanced bingo: Moose, Elk, Black Bear, Bald Eagle, Great Blue Heron, Beaver, Pronghorn, Mule Deer, Mountain Goat, Coyote",
        type: "observation"
      },
      {
        title: "Historic Barn Time Machine",
        description: "Sketch the Mormon Row barns, then imagine: What was life like for families here in 1890? Design your homestead!",
        type: "creative"
      },
      {
        title: "Teton Peaks Master Challenge",
        description: "Learn all major peaks: Grand Teton (13,775'), Mount Owen (12,928'), Teewinot (12,325'), Middle Teton (12,804'), South Teton (12,514')",
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
      "💥 Old Faithful Geyser - World's most famous geyser! Erupts every 60-110 minutes",
      "🌋 Upper Geyser Basin - Largest concentration of geysers on Earth (150+ geysers!)",
      "🏛️ Old Faithful Visitor Education Center - Learn about geothermal science",
      "🌈 Grand Prismatic Spring - 3rd largest hot spring in the world (370°F!)",
      "🥾 Grand Prismatic Overlook Trail - Fairy Falls Trail for aerial spring views",
      "🎨 Fountain Paint Pot - Bubbling mud pots that look like boiling chocolate",
      "💎 Biscuit Basin - Sapphire Pool & unique mineral formations",
      "⚫ Black Sand Basin - Emerald Pool & Rainbow Pool thermal features",
      "👨‍🎓 Junior Ranger Program - Earn your official Yellowstone badge!",
      "🌟 AMAZING FACT: Grand Prismatic's colors come from heat-loving bacteria!"
    ],
    funActivity: "Old Faithful shoots 3,700-8,400 gallons of boiling water 185 feet high! Time it and predict the next eruption!",
    games: [
      {
        title: "Geyser Scientist Challenge",
        description: "Time 3 Old Faithful eruptions. Calculate the average interval. Rangers say it's getting longer each year - why?",
        type: "challenge"
      },
      {
        title: "Thermal Rainbow Hunt",
        description: "Grand Prismatic shows 7 colors: deep blue center, then green, yellow, orange, red bands. Find and photograph each!",
        type: "observation"
      },
      {
        title: "Design Your Thermal Wonder",
        description: "Create your own geyser, hot spring, or mud pot. What would you name it? What colors would it be? How hot?",
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
      "🏔️ Grand Canyon of Yellowstone - 20 miles long, 4,000 feet wide, 1,200 feet deep!",
      "🎨 Artist Point - Yellowstone's most photographed view (Thomas Moran painted here)",
      "🥾 South Rim Trail - Easy 1-mile walk with multiple canyon viewpoints",
      "🌉 North Rim Trail - Uncle Tom's Trail to base of Lower Falls (challenging!)",
      "🦌 Hayden Valley - 'America's Serengeti' with massive bison herds",
      "🌋 Mud Volcano Area - Churning, acidic mud pots and sulfur springs",
      "🐉 Dragon's Mouth Spring - Roaring underground cavern with 180°F water",
      "🏔️ Mammoth Hot Springs - Limestone terraces built over 8,000 years",
      "🏨 Historic Mammoth Hotel - Built in 1937, where Roosevelt stayed",
      "🌟 INCREDIBLE FACT: The canyon's colors come from iron oxidation - it's literally rusting!"
    ],
    funActivity: "The Lower Falls drops 308 feet - that's taller than Niagara Falls! Count how many colors you see in the canyon walls!",
    games: [
      {
        title: "Canyon Geology Detective",
        description: "Identify canyon colors and their causes: yellow (sulfur), red (iron oxide), white (silica), pink (manganese). Make a color map!",
        type: "observation"
      },
      {
        title: "Waterfall Power Calculator",
        description: "Lower Falls is 308 feet (2x taller than Niagara!). Compare to: Statue of Liberty (305'), Big Ben (316'). What else matches?",
        type: "challenge"
      },
      {
        title: "Dragon's Mouth Adventure Story",
        description: "Dragon's Mouth roars from underground steam. Write an adventure story: What's causing the noise? Who lives down there?",
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
      "🦬 Lamar Valley 'America's Serengeti' - 10-mile-long wildlife paradise",
      "🐺 Wolf Country - Home to 8+ wolf packs (Yellowstone has 95+ wolves!)",
      "🐻 Bear Territory - Both black bears and massive grizzlies roam here",
      "🦌 Massive Bison Herds - Up to 1,000 bison gather here in summer",
      "🦴 Elk Bugling Grounds - Hear males call during mating season",
      "💧 Tower Fall - 132-foot waterfall named for volcanic rock towers",
      "🏔️ Mammoth Hot Springs Historic District - Terraced limestone formations",
      "🏛️ Historic Fort Yellowstone - 1891 cavalry post, now park headquarters",
      "🎣 Trout Lake - Easy 1.2-mile hike to pristine fishing lake",
      "🌟 WILD FACT: Lamar Valley has the world's largest free-roaming bison herd!"
    ],
    funActivity: "Early morning wildlife safari! 6 AM is prime time - wolves, bears, and bison are most active at dawn!",
    games: [
      {
        title: "Wildlife Biologist Challenge",
        description: "Track like a scientist: animal type, exact time, behavior, group size, location. Use binoculars like a pro researcher!",
        type: "observation"
      },
      {
        title: "Bison Math Safari",
        description: "Yellowstone has 4,000+ bison! Count a herd, estimate others. Can you spot calves (they're orange-red until 3 months old)?",
        type: "challenge"
      },
      {
        title: "Wilderness Sound Map",
        description: "Create an audio diary: elk bugles, wolf howls, bison grunts, bird calls. Each animal has a unique 'voice'!",
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
      "🏛️ Roosevelt Arch - Yellowstone's iconic stone entrance (built 1903)",
      "📜 'For the Benefit and Enjoyment of the People' - Democracy in stone!",
      "📸 Family Photos - Stand where millions have marked their Yellowstone adventure",
      "🛣️ Scenic Drive to Bozeman - Through Paradise Valley & Livingston",
      "🦴 Museum of the Rockies - World's largest T. Rex collection!",
      "🦕 'Big Mike' T. Rex - 40-foot-long, 12-foot-tall authentic skeleton",
      "🥚 Egg Mountain - Real dinosaur eggs and babies fossilized together",
      "🔬 Paleontology Lab - Watch scientists preparing real fossils",
      "🌟 Jack Horner Connection - Advisor for Jurassic Park movies worked here!",
      "🎁 Montana Gift Shop - Last chance for unique Yellowstone & Montana treasures"
    ],
    funActivity: "Compare the T. Rex to animals you saw - a T. Rex was 13 feet tall and 40 feet long, while bison are 6 feet tall!",
    games: [
      {
        title: "Roosevelt Legacy Detective",
        description: "Research: Built 1903, dedicated by President Roosevelt, cornerstone of conservation. Why was this arch revolutionary for America?",
        type: "challenge"
      },
      {
        title: "Dinosaur vs Wildlife Comparison",
        description: "T. Rex vs Grizzly Bear, Triceratops vs Bison, Pteranodon vs Bald Eagle. Create size charts and compare abilities!",
        type: "observation"
      },
      {
        title: "Ultimate Adventure Memory Book",
        description: "Final masterpiece: Top 5 moments, favorite animal, biggest surprise, funniest memory, and what you'll tell friends!",
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