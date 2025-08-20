import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import yellowstoneHero from "@/assets/yellowstone-hero.jpg";
import grandTetonHero from "@/assets/grand-teton-hero.jpg";

const IntroSection = () => {
  return (
    <section className="py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl mb-12">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative z-10 px-8 py-16 text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            🏔️ Your Yellowstone Adventure Guide! 🦌
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            Get ready for the most amazing 6-day family adventure through America's first National Park!
          </p>
          <Button variant="forest" size="lg" className="text-lg px-8 py-4">
            Let's Explore! 🚀
          </Button>
        </div>
      </div>

      {/* What is Yellowstone */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="overflow-hidden bg-gradient-card shadow-card-adventure">
          <div className="relative">
            <img 
              src={yellowstoneHero} 
              alt="Yellowstone with Old Faithful and Grand Prismatic"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold">Yellowstone National Park</h3>
            </div>
          </div>
          <CardContent className="p-6">
            <h4 className="text-xl font-bold text-foreground mb-3">🌋 What Makes Yellowstone Special?</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>America's FIRST National Park</strong> (created in 1872!)</li>
              <li>• <strong>Bigger than Rhode Island!</strong> It's 2.2 million acres</li>
              <li>• <strong>Home to half the world's geysers</strong> - over 300!</li>
              <li>• <strong>Sits on top of a supervolcano</strong> (don't worry, it's sleeping!)</li>
              <li>• <strong>Has more than 1,000 animal species</strong></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-gradient-card shadow-card-adventure">
          <div className="relative">
            <img 
              src={grandTetonHero} 
              alt="Grand Teton mountain range with Jackson Lake"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold">Grand Teton National Park</h3>
            </div>
          </div>
          <CardContent className="p-6">
            <h4 className="text-xl font-bold text-foreground mb-3">⛰️ What Makes Grand Teton Amazing?</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>Dramatic jagged mountains</strong> that rise straight up!</li>
              <li>• <strong>13,775 feet tall</strong> - the tallest peak in Wyoming</li>
              <li>• <strong>Crystal clear lakes</strong> perfect for boat rides</li>
              <li>• <strong>Young mountains</strong> - only 10 million years old</li>
              <li>• <strong>Home to moose, elk, and bears</strong></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Fun Facts */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-forest/10 border-forest/20 text-center p-6">
          <div className="text-4xl mb-3">🌡️</div>
          <h4 className="font-bold text-forest mb-2">Super Hot Springs!</h4>
          <p className="text-sm text-muted-foreground">
            Some hot springs in Yellowstone are over 200°F - hot enough to cook an egg instantly!
          </p>
        </Card>

        <Card className="bg-mountain/10 border-mountain/20 text-center p-6">
          <div className="text-4xl mb-3">🐺</div>
          <h4 className="font-bold text-mountain mb-2">Wolf Pack Territory!</h4>
          <p className="text-sm text-muted-foreground">
            There are about 95 wolves living in 8-10 packs throughout Yellowstone!
          </p>
        </Card>

        <Card className="bg-sunset/10 border-sunset/20 text-center p-6">
          <div className="text-4xl mb-3">💎</div>
          <h4 className="font-bold text-sunset mb-2">Rainbow Colors!</h4>
          <p className="text-sm text-muted-foreground">
            Grand Prismatic Spring gets its colors from tiny heat-loving bacteria that create a natural rainbow!
          </p>
        </Card>
      </div>
    </section>
  );
};

export default IntroSection;