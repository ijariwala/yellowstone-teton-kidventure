import WildlifeCard from "./WildlifeCard";
import bisonImage from "@/assets/bison.jpg";
import elkImage from "@/assets/elk.jpg";
import bearImage from "@/assets/bear.jpg";
import wolfImage from "@/assets/wolf.jpg";

const wildlifeData = [
  {
    name: "American Bison (Buffalo)",
    image: bisonImage,
    funFact: "Bison can weigh up to 2,000 pounds (as much as a small car!) and can run up to 35 mph. There are about 4,000 bison in Yellowstone today!",
    likelihood: "Very Likely" as const,
    safetyTip: "Stay at least 25 yards away (about 2 school bus lengths). Bison can be unpredictable!"
  },
  {
    name: "Elk (Wapiti)",
    image: elkImage,
    funFact: "Male elk can weigh up to 700 pounds and their antlers can span 4 feet wide! They make a loud bugling sound that can be heard for miles.",
    likelihood: "Very Likely" as const,
    safetyTip: "Keep 25 yards away, especially during fall mating season when males can be aggressive."
  },
  {
    name: "Grizzly Bears",
    image: bearImage,
    funFact: "Grizzly bears have an incredible sense of smell - 7 times better than a bloodhound! They can smell food from 18 miles away.",
    likelihood: "Likely" as const,
    safetyTip: "Stay 100 yards away (about 4 school bus lengths). Make noise on trails so you don't surprise them!"
  },
  {
    name: "Gray Wolves",
    image: wolfImage,
    funFact: "Wolves were brought back to Yellowstone in 1995! They live in packs and can howl so loud that other wolves 6 miles away can hear them.",
    likelihood: "Possible" as const,
    safetyTip: "Wolves are usually afraid of people, but don't approach them. Watch from a distance with binoculars."
  }
];

const WildlifeSection = () => {
  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">🦌 Amazing Animals You Might See!</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Yellowstone is home to incredible wildlife! Here are the animals you're most likely to spot on your adventure.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {wildlifeData.map((animal, index) => (
          <WildlifeCard key={index} {...animal} />
        ))}
      </div>

      <div className="mt-8 bg-forest/10 rounded-xl p-6 border border-forest/20">
        <h3 className="text-xl font-bold text-forest mb-3">🔍 Wildlife Watching Tips for Kids:</h3>
        <ul className="space-y-2 text-sm text-forest-dark">
          <li>• Bring binoculars to see animals up close while staying safe</li>
          <li>• Be quiet and patient - animals can hear you coming!</li>
          <li>• Early morning and evening are the best times to spot wildlife</li>
          <li>• Never try to feed the animals - it's dangerous for both you and them</li>
          <li>• If you see baby animals, their mom is probably nearby, so keep extra distance</li>
        </ul>
      </div>
    </section>
  );
};

export default WildlifeSection;