import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Activity {
  title: string;
  description: string;
  location: string;
  reward: string;
  completed?: boolean;
}

const activities: Activity[] = [
  {
    title: "Geyser Timing Challenge",
    description: "Time how long Old Faithful takes to erupt and guess when the next eruption will be!",
    location: "Old Faithful",
    reward: "Geyser Expert Badge"
  },
  {
    title: "Wildlife Spotting Checklist",
    description: "Spot and photograph (from a safe distance) 5 different animals during your trip.",
    location: "Throughout the parks",
    reward: "Wildlife Watcher Badge"
  },
  {
    title: "Thermal Feature Detective",
    description: "Find all 4 types of thermal features: geysers, hot springs, mud pots, and fumaroles.",
    location: "Fountain Paint Pot",
    reward: "Thermal Detective Badge"
  },
  {
    title: "Junior Geologist",
    description: "Learn about the different colored rocks in the Grand Canyon of Yellowstone and explain why they're yellow.",
    location: "Grand Canyon of Yellowstone",
    reward: "Rock Expert Badge"
  },
  {
    title: "Mountain Peak Identifier",
    description: "Use the visitor center displays to identify and name 3 different peaks in the Teton Range.",
    location: "Grand Teton",
    reward: "Mountain Expert Badge"
  },
  {
    title: "Park History Explorer",
    description: "Visit the Roosevelt Arch and learn 3 facts about how Yellowstone became America's first National Park.",
    location: "Roosevelt Arch",
    reward: "History Expert Badge"
  }
];

const JuniorRangerSection = () => {
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);

  const toggleActivity = (index: number) => {
    setCompletedActivities(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">🎒 Junior Ranger Activities</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete these fun activities during your trip to become an official Junior Ranger!
        </p>
      </div>

      <div className="mb-8 bg-gradient-adventure rounded-xl p-6 text-primary-foreground text-center">
        <h3 className="text-2xl font-bold mb-2">🏅 Your Progress</h3>
        <p className="text-lg mb-3">
          {completedActivities.length} of {activities.length} activities completed!
        </p>
        <div className="w-full bg-white/20 rounded-full h-4">
          <div 
            className="bg-white h-4 rounded-full transition-all duration-500"
            style={{ width: `${(completedActivities.length / activities.length) * 100}%` }}
          />
        </div>
        {completedActivities.length === activities.length && (
          <div className="mt-4 text-xl font-bold animate-bounce">
            🎉 Congratulations! You're now an official Junior Ranger! 🎉
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity, index) => (
          <Card 
            key={index} 
            className={`bg-gradient-card shadow-card-adventure hover:shadow-adventure transition-all duration-300 ${
              completedActivities.includes(index) ? 'border-forest bg-forest/5' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                  {activity.title}
                  {completedActivities.includes(index) && <span className="text-forest">🏆</span>}
                </CardTitle>
              </div>
              <Badge variant="outline" className="w-fit">
                {activity.location}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {activity.description}
              </p>
              
              <div className="bg-sunset/10 border border-sunset/20 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium">
                  <span className="text-sunset">🏅 Reward:</span> {activity.reward}
                </p>
              </div>

              <Button
                variant={completedActivities.includes(index) ? "forest" : "outline"}
                size="sm"
                onClick={() => toggleActivity(index)}
                className="w-full"
              >
                {completedActivities.includes(index) ? "Completed! ✓" : "Mark Complete"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-sky/10 border border-sky/20 rounded-xl p-6">
        <h3 className="text-xl font-bold text-mountain mb-4">📋 How to Become a Junior Ranger:</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">At the Parks:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Pick up Junior Ranger booklets at visitor centers</li>
              <li>• Complete activities in the booklet</li>
              <li>• Attend a ranger program (if available)</li>
              <li>• Return completed booklet to any ranger</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">What You Get:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Official Junior Ranger badge</li>
              <li>• Junior Ranger certificate</li>
              <li>• Special Junior Ranger patches (sometimes)</li>
              <li>• Lifetime memories and knowledge!</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuniorRangerSection;