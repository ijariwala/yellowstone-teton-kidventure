import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Attraction {
  name: string;
  type: "Geyser" | "Canyon" | "Lake" | "Mountain" | "Historic" | "Wildlife" | "Waterfall";
  description: string;
  coolFact: string;
  day: number;
}

const attractions: Attraction[] = [
  {
    name: "Old Faithful",
    type: "Geyser",
    description: "A famous geyser that erupts about every 90 minutes, shooting water up to 180 feet high!",
    coolFact: "It's been erupting regularly for over 150 years - that's older than your great-great-grandparents!",
    day: 3
  },
  {
    name: "Grand Prismatic Spring",
    type: "Geyser",
    description: "The largest hot spring in the US with amazing rainbow colors caused by heat-loving bacteria.",
    coolFact: "It's as big as a football field and hot enough to cook an egg instantly - 199°F!",
    day: 3
  },
  {
    name: "Grand Canyon of Yellowstone",
    type: "Canyon",
    description: "A massive colorful canyon that's 20 miles long and over 1,200 feet deep in some places.",
    coolFact: "The yellow rocks that gave Yellowstone its name can be seen in the canyon walls!",
    day: 4
  },
  {
    name: "Jenny Lake",
    type: "Lake",
    description: "A crystal-clear mountain lake where you can take a boat ride or walk around the shore.",
    coolFact: "The lake is so clear you can see 30 feet down to the bottom!",
    day: 1
  },
  {
    name: "Grand Teton Peak",
    type: "Mountain",
    description: "The tallest mountain in Grand Teton National Park at 13,775 feet high!",
    coolFact: "The Teton mountains are some of the youngest mountains in North America - only 10 million years old!",
    day: 1
  },
  {
    name: "Lamar Valley",
    type: "Wildlife",
    description: "Known as 'America's Serengeti' - the best place to see wolves, bison, elk, and bears!",
    coolFact: "Over 95 wolves live in Yellowstone, and Lamar Valley is where you're most likely to spot them!",
    day: 5
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Geyser":
      return "bg-sunset text-accent-foreground";
    case "Canyon":
      return "bg-mountain text-primary-foreground";
    case "Lake":
      return "bg-sky text-foreground";
    case "Mountain":
      return "bg-forest text-primary-foreground";
    case "Wildlife":
      return "bg-gradient-adventure text-primary-foreground";
    case "Historic":
      return "bg-muted text-muted-foreground";
    case "Waterfall":
      return "bg-sky-dark text-primary-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const AttractionsSection = () => {
  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">🏔️ Amazing Places You'll Visit</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get ready to see some of the most incredible natural wonders in America!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {attractions.map((attraction, index) => (
          <Card key={index} className="bg-gradient-card shadow-card-adventure hover:shadow-adventure transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg font-bold text-foreground">{attraction.name}</CardTitle>
                <Badge className={`text-xs font-medium ${getTypeColor(attraction.type)}`}>
                  {attraction.type}
                </Badge>
              </div>
              <Badge variant="outline" className="w-fit">
                Day {attraction.day}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
                {attraction.description}
              </p>
              <div className="bg-forest/10 border border-forest/20 rounded-lg p-3">
                <p className="text-sm text-forest-dark font-medium">
                  <span className="text-sunset">💡 Cool Fact:</span> {attraction.coolFact}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default AttractionsSection;