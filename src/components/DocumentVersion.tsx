import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Printer, Download, ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import yellowstoneHero from "@/assets/yellowstone-hero.jpg";
import grandTetonHero from "@/assets/grand-teton-hero.jpg";
import bisonImage from "@/assets/bison.jpg";
import elkImage from "@/assets/elk.jpg";
import bearImage from "@/assets/bear.jpg";
import wolfImage from "@/assets/wolf.jpg";

const DocumentVersion = () => {
  const { toast } = useToast();
  
  const handlePrint = () => {
    window.print();
  };

  const handleSavePDF = () => {
    window.print();
  };

  const handleSaveToGoogleDocs = async () => {
    try {
      console.log('Starting Google Docs save...');
      
      // Get the document content without the controls
      const contentElement = document.querySelector('.max-w-4xl');
      console.log('Content element found:', !!contentElement);
      console.log('Content element HTML length:', contentElement?.innerHTML?.length || 0);
      console.log('Content element text length:', contentElement?.textContent?.length || 0);
      
      if (!contentElement) {
        toast({
          title: "Error",
          description: "No content found to copy. Please try refreshing the page.",
          variant: "destructive",
        });
        return;
      }
      
      // Clone the content to avoid modifying the original
      const clonedContent = contentElement.cloneNode(true) as HTMLElement;
      
      // Remove the print controls and any hidden elements
      const printControls = clonedContent.querySelector('.print\\:hidden');
      if (printControls) {
        printControls.remove();
      }
      
      // Remove fixed elements like the floating controls
      const fixedElements = clonedContent.querySelectorAll('.fixed');
      fixedElements.forEach(el => el.remove());
      
      // Also remove any button elements that might interfere
      const buttonElements = clonedContent.querySelectorAll('button');
      buttonElements.forEach(el => el.remove());
      
      // Get clean text content by preserving structure
      const textContent = clonedContent.textContent || '';
      console.log('Raw text content length:', textContent.length);
      console.log('First 200 chars:', textContent.substring(0, 200));
      
      // Simple formatting that preserves emojis and content structure
      const formattedContent = textContent
        .replace(/\s{2,}/g, ' ') // Replace multiple spaces with single space
        .replace(/([.!?])\s/g, '$1\n\n') // Add line breaks after sentences
        .replace(/Table of Contents/g, '\n\nTable of Contents\n')
        .replace(/Pre-Trip Planning/g, '\n\nPre-Trip Planning\n')
        .replace(/During Your Trip/g, '\n\nDuring Your Trip\n')
        .replace(/Amazing Animals You'll Meet/g, '\n\nAmazing Animals You\'ll Meet\n')
        .replace(/Amazing Places You'll Visit/g, '\n\nAmazing Places You\'ll Visit\n')
        .replace(/Junior Ranger Program/g, '\n\nJunior Ranger Program\n')
        .replace(/Packing Checklist/g, '\n\nPacking Checklist\n')
        .replace(/^\s+/gm, '') // Remove leading spaces from lines
        .replace(/\n{3,}/g, '\n\n') // Replace multiple line breaks with double
        .trim();
      
      console.log('Final formatted content length:', formattedContent.length);
      console.log('Content preview:', formattedContent.substring(0, 500));
      
      if (!formattedContent.trim()) {
        console.log('No content to copy!');
        toast({
          title: "Error",
          description: "No content found to copy. Please try refreshing the page.",
          variant: "destructive",
        });
        return;
      }

      // Create simple HTML that Google Docs can actually handle
      const sections = formattedContent.split('\n\n');
      let htmlContent = '';
      
      for (const section of sections) {
        const trimmed = section.trim();
        if (!trimmed) continue;
        
        if (trimmed.includes('Ultimate Yellowstone & Grand Teton Family Adventure Guide')) {
          htmlContent += `<h1>${trimmed}</h1>`;
        } else if (trimmed.includes('Your Complete 6-Day Journey')) {
          htmlContent += `<h2>${trimmed}</h2>`;
        } else if (trimmed.includes('Table of Contents') || trimmed.includes('Pre-Trip Planning') || trimmed.includes('During Your Trip')) {
          htmlContent += `<h2>${trimmed}</h2>`;
        } else if (trimmed.includes('Welcome to Your Amazing Adventure') || trimmed.includes('Amazing Animals') || trimmed.includes('Amazing Places')) {
          htmlContent += `<h2>${trimmed}</h2>`;
        } else if (trimmed.startsWith('•')) {
          htmlContent += `<p>${trimmed}</p>`;
        } else if (trimmed.includes('Day ') && trimmed.includes(':')) {
          htmlContent += `<h3>${trimmed}</h3>`;
        } else {
          htmlContent += `<p>${trimmed}</p>`;
        }
      }
      
      const fullHtmlContent = htmlContent;

      // Try copying as both HTML and plain text
      try {
        const clipboardItem = new ClipboardItem({
          'text/html': new Blob([fullHtmlContent], { type: 'text/html' }),
          'text/plain': new Blob([formattedContent], { type: 'text/plain' })
        });
        await navigator.clipboard.write([clipboardItem]);
        console.log('Content copied as both HTML and plain text');
      } catch (htmlError) {
        console.log('HTML copy failed, trying plain text only:', htmlError);
        await navigator.clipboard.writeText(formattedContent);
        console.log('Content copied as plain text only');
      }

      // Open Google Docs
      window.open('https://docs.google.com/document/create', '_blank');
      
      toast({
        title: "Content copied successfully!",
        description: `${Math.floor(formattedContent.length / 1000)}k characters copied. In Google Docs, try both Ctrl+V and Ctrl+Shift+V (paste without formatting) to see which works better.`,
        duration: 8000,
      });
    } catch (error) {
      console.error('Error in handleSaveToGoogleDocs:', error);
      toast({
        title: "Error",
        description: "Failed to copy content. Please try using Ctrl+A and Ctrl+C to copy manually.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <style>{`
        @media print {
          .page-break-before { page-break-before: always; }
          .page-break-after { page-break-after: always; }
          .page-break-avoid { page-break-inside: avoid; }
        }
      `}</style>
      <div className="max-w-4xl mx-auto p-8 bg-background print:p-4 print:max-w-none">
      
      {/* Print Controls - Hidden when printing */}
      <div className="fixed top-4 right-4 z-50 print:hidden">
        <div className="flex flex-col gap-2 bg-background border rounded-lg p-2 shadow-lg">
          <Link to="/">
            <Button variant="outline" size="sm" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Guide
            </Button>
          </Link>
          <Button onClick={handlePrint} variant="default" size="sm" className="w-full">
            <Printer className="h-4 w-4 mr-2" />
            Print Document
          </Button>
          <Button onClick={handleSavePDF} variant="secondary" size="sm" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Save as PDF
          </Button>
          <Button onClick={handleSaveToGoogleDocs} variant="outline" size="sm" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Save to Google Docs
          </Button>
        </div>
      </div>
      
      {/* Cover Page */}
      <div className="text-center mb-12 print:mb-8">
        <div className="relative overflow-hidden rounded-2xl mb-8 print:rounded-lg">
          <div className="absolute inset-0 bg-gradient-hero opacity-90" />
          <div className="relative z-10 px-8 py-16 text-center text-primary-foreground print:py-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 print:text-4xl">
              🏔️ Ultimate Yellowstone & Grand Teton Family Adventure Guide 🦌
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto print:text-lg">
              Your Complete 6-Day Journey Through America's Most Amazing National Parks
            </p>
            <div className="text-lg font-medium">
              📅 Pre-Trip Planning • 🎒 Daily Adventures • 🎮 Games & Activities • 🏅 Junior Ranger Program
            </div>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <Card className="mb-12 print:mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">📋 Table of Contents</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold text-lg mb-2 text-forest">Pre-Trip Planning</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Park Overview & Fun Facts</li>
              <li>• Wildlife You'll See</li>
              <li>• Amazing Attractions</li>
              <li>• 6-Day Itinerary Overview</li>
              <li>• Pre-Trip Games & Activities</li>
              <li>• Junior Ranger Program</li>
              <li>• Packing Checklist</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-mountain">During Your Trip</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Detailed Daily Adventures</li>
              <li>• Daily Games & Challenges</li>
              <li>• Wildlife Spotting Guide</li>
              <li>• Photography Tips</li>
              <li>• Safety Guidelines</li>
              <li>• Trip Reflection Pages</li>
              <li>• Memory Keepers</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-8 print:my-4 print:page-break-before" />

      {/* Section 1: Park Overview */}
      <section className="mb-12 print:mb-8 print:page-break-before">>
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">🌋 Welcome to Your Amazing Adventure!</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="overflow-hidden">
            <div className="relative h-48 print:h-32">
              <img 
                src={yellowstoneHero} 
                alt="Yellowstone National Park"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold print:text-lg">Yellowstone National Park</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="text-lg font-bold text-foreground mb-3">🌋 What Makes Yellowstone Special?</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• <strong>America's FIRST National Park</strong> (created in 1872!)</li>
                <li>• <strong>Bigger than Rhode Island!</strong> It's 2.2 million acres</li>
                <li>• <strong>Home to half the world's geysers</strong> - over 300!</li>
                <li>• <strong>Sits on top of a supervolcano</strong> (don't worry, it's sleeping!)</li>
                <li>• <strong>Has more than 1,000 animal species</strong></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="relative h-48 print:h-32">
              <img 
                src={grandTetonHero} 
                alt="Grand Teton National Park"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold print:text-lg">Grand Teton National Park</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="text-lg font-bold text-foreground mb-3">⛰️ What Makes Grand Teton Amazing?</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
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
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-forest/10 border-forest/20 text-center p-4">
            <div className="text-3xl mb-2">🌡️</div>
            <h4 className="font-bold text-forest mb-2">Super Hot Springs!</h4>
            <p className="text-sm text-muted-foreground">
              Some hot springs in Yellowstone are over 200°F - hot enough to cook an egg instantly!
            </p>
          </Card>

          <Card className="bg-mountain/10 border-mountain/20 text-center p-4">
            <div className="text-3xl mb-2">🐺</div>
            <h4 className="font-bold text-mountain mb-2">Wolf Pack Territory!</h4>
            <p className="text-sm text-muted-foreground">
              There are about 95 wolves living in 8-10 packs throughout Yellowstone!
            </p>
          </Card>

          <Card className="bg-sunset/10 border-sunset/20 text-center p-4">
            <div className="text-3xl mb-2">💎</div>
            <h4 className="font-bold text-sunset mb-2">Rainbow Colors!</h4>
            <p className="text-sm text-muted-foreground">
              Grand Prismatic Spring gets its colors from tiny heat-loving bacteria that create a natural rainbow!
            </p>
          </Card>
        </div>
      </section>

      <Separator className="my-8 print:my-4" />

      {/* Section 2: Wildlife Guide */}
      <section className="mb-12 print:mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">🦌 Amazing Animals You'll Meet!</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            {
              name: "American Bison (Buffalo)",
              image: bisonImage,
              funFact: "Bison can weigh up to 2,000 pounds (as much as a small car!) and can run up to 35 mph. There are about 4,000 bison in Yellowstone today!",
              likelihood: "Very Likely",
              safetyTip: "Stay at least 25 yards away (about 2 school bus lengths). Bison can be unpredictable!"
            },
            {
              name: "Elk (Wapiti)",
              image: elkImage,
              funFact: "Male elk can weigh up to 700 pounds and their antlers can span 4 feet wide! They make a loud bugling sound that can be heard for miles.",
              likelihood: "Very Likely",
              safetyTip: "Keep 25 yards away, especially during fall mating season when males can be aggressive."
            },
            {
              name: "Grizzly Bears",
              image: bearImage,
              funFact: "Grizzly bears have an incredible sense of smell - 7 times better than a bloodhound! They can smell food from 18 miles away.",
              likelihood: "Likely",
              safetyTip: "Stay 100 yards away (about 4 school bus lengths). Make noise on trails so you don't surprise them!"
            },
            {
              name: "Gray Wolves",
              image: wolfImage,
              funFact: "Wolves were brought back to Yellowstone in 1995! They live in packs and can howl so loud that other wolves 6 miles away can hear them.",
              likelihood: "Possible",
              safetyTip: "Wolves are usually afraid of people, but don't approach them. Watch from a distance with binoculars."
            }
          ].map((animal, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-32 print:h-24">
                <img 
                  src={animal.image} 
                  alt={animal.name}
                  className="w-full h-full object-cover"
                />
                <Badge className={`absolute top-2 right-2 text-xs ${
                  animal.likelihood === "Very Likely" ? "bg-forest text-primary-foreground" :
                  animal.likelihood === "Likely" ? "bg-sunset text-accent-foreground" :
                  "bg-mountain text-primary-foreground"
                }`}>
                  {animal.likelihood}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-foreground mb-2">{animal.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{animal.funFact}</p>
                <div className="bg-sky/20 border border-sky/30 rounded-lg p-2">
                  <p className="text-xs font-medium">
                    <span className="text-sunset">⚠️ Safety:</span> {animal.safetyTip}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-forest/10 border-forest/20 p-4">
          <h3 className="text-lg font-bold text-forest mb-3">🔍 Wildlife Watching Tips for Kids:</h3>
          <ul className="grid md:grid-cols-2 gap-2 text-sm text-forest-dark">
            <li>• Bring binoculars to see animals up close while staying safe</li>
            <li>• Be quiet and patient - animals can hear you coming!</li>
            <li>• Early morning and evening are the best times to spot wildlife</li>
            <li>• Never try to feed the animals - it's dangerous for both you and them</li>
            <li>• If you see baby animals, their mom is probably nearby, so keep extra distance</li>
            <li>• Keep your camera ready - you never know when you'll spot something amazing!</li>
          </ul>
        </Card>
      </section>

      <Separator className="my-8 print:my-4" />

      {/* Section 3: Amazing Attractions */}
      <section className="mb-12 print:mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">🏔️ Amazing Places You'll Visit</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
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
          ].map((attraction, index) => (
            <Card key={index} className="border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-foreground">{attraction.name}</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">
                      {attraction.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Day {attraction.day}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {attraction.description}
                </p>
                <div className="bg-forest/10 border border-forest/20 rounded-lg p-2">
                  <p className="text-xs text-forest-dark font-medium">
                    <span className="text-sunset">💡 Cool Fact:</span> {attraction.coolFact}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8 print:my-4" />

      {/* Section 4: 6-Day Itinerary */}
      <section className="mb-12 print:mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">🗓️ Your 6-Day Adventure Plan</h1>
        
        <div className="space-y-6">
          {[
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
          ].map((day) => (
            <Card key={day.day} className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      Day {day.day} - {day.title}
                    </CardTitle>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline">{day.date}</Badge>
                      <Badge className="bg-mountain text-primary-foreground">{day.location}</Badge>
                    </div>
                  </div>
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
                  <div className="bg-sunset/10 border border-sunset/20 rounded-lg p-3">
                    <h4 className="font-semibold text-sunset mb-2">🎯 Special Activity:</h4>
                    <p className="text-sm text-muted-foreground">{day.funActivity}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8 print:my-4" />

      {/* Section 5: Packing Checklist */}
      <section className="mb-12 print:mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">🎒 Ultimate Packing Checklist</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-forest/5 border-forest/20">
            <CardHeader>
              <CardTitle className="text-xl text-forest">✅ Essential Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { item: "Binoculars", reason: "To see wildlife up close safely!" },
                  { item: "Camera", reason: "Capture amazing memories!" },
                  { item: "Comfortable hiking shoes", reason: "For walking on trails" },
                  { item: "Layers of clothing", reason: "Mountain weather changes fast!" },
                  { item: "Water bottle", reason: "Stay hydrated on adventures" },
                  { item: "Snacks", reason: "Keep energy up for exploring" },
                  { item: "Sunscreen", reason: "Mountain sun is strong!" },
                  { item: "Hat", reason: "Protect from sun and wind" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 bg-white/50 rounded">
                    <div className="w-4 h-4 border border-forest rounded mt-1"></div>
                    <div>
                      <span className="font-medium text-sm">{item.item}</span>
                      <p className="text-xs text-muted-foreground">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-mountain/5 border-mountain/20">
            <CardHeader>
              <CardTitle className="text-xl text-mountain">➕ Nice to Have</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { item: "Sandals", reason: "Nice to have for relaxing" },
                  { item: "Notebook", reason: "Draw or write about your adventures" },
                  { item: "Playing cards", reason: "Fun for downtime" },
                  { item: "Magnifying glass", reason: "Examine rocks and leaves" },
                  { item: "Small backpack", reason: "Day hikes and carrying supplies" },
                  { item: "Phone charger", reason: "Keep your camera/phone charged" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 bg-white/50 rounded">
                    <div className="w-4 h-4 border border-mountain rounded mt-1"></div>
                    <div>
                      <span className="font-medium text-sm">{item.item}</span>
                      <p className="text-xs text-muted-foreground">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="my-8 print:my-4" />

      {/* Section 6: Junior Ranger Activities */}
      <section className="mb-12 print:mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">🎒 Junior Ranger Activities</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {[
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
          ].map((activity, index) => (
            <Card key={index} className="border">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-foreground">{activity.title}</h3>
                  <div className="w-6 h-6 border-2 border-forest rounded"></div>
                </div>
                <Badge variant="outline" className="mb-3">{activity.location}</Badge>
                <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                <div className="bg-sunset/10 border border-sunset/20 rounded-lg p-2">
                  <p className="text-xs font-medium">
                    <span className="text-sunset">🏅 Reward:</span> {activity.reward}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-sky/10 border-sky/20">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-mountain mb-3">📋 How to Become a Junior Ranger:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">At the Parks:</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Pick up Junior Ranger booklets at visitor centers</li>
                  <li>• Complete activities in the booklet</li>
                  <li>• Attend a ranger program (if available)</li>
                  <li>• Return completed booklet to any ranger</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">What You Get:</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Official Junior Ranger badge</li>
                  <li>• Junior Ranger certificate</li>
                  <li>• Special Junior Ranger patches (sometimes)</li>
                  <li>• Lifetime memories and knowledge!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-8 print:my-4" />

      {/* Section 7: Trip Reflection Pages */}
      <section className="mb-12 print:mb-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-foreground">📝 Trip Memory Pages</h1>
        
        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((day) => (
            <Card key={day} className="border-2 border-dashed border-muted-foreground/30">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Day {day} - My Memories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="font-medium text-sm block mb-2">🌟 Best part of today:</label>
                  <div className="border-b-2 border-dotted border-muted-foreground/30 h-8"></div>
                </div>
                <div>
                  <label className="font-medium text-sm block mb-2">🦌 Animals I saw:</label>
                  <div className="border-b-2 border-dotted border-muted-foreground/30 h-8"></div>
                </div>
                <div>
                  <label className="font-medium text-sm block mb-2">📸 Favorite photo spot:</label>
                  <div className="border-b-2 border-dotted border-muted-foreground/30 h-8"></div>
                </div>
                <div>
                  <label className="font-medium text-sm block mb-2">🎯 Special activity we did:</label>
                  <div className="border-b-2 border-dotted border-muted-foreground/30 h-8"></div>
                </div>
                <div>
                  <label className="font-medium text-sm block mb-2">💭 What I learned today:</label>
                  <div className="space-y-2">
                    <div className="border-b-2 border-dotted border-muted-foreground/30 h-6"></div>
                    <div className="border-b-2 border-dotted border-muted-foreground/30 h-6"></div>
                    <div className="border-b-2 border-dotted border-muted-foreground/30 h-6"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-medium text-sm">⭐ Rate this day:</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-6 h-6 border border-muted-foreground rounded-full"></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8 print:my-4" />

      {/* Footer */}
      <footer className="text-center py-8 print:py-4">
        <Card className="bg-gradient-adventure p-6 print:p-4">
          <h2 className="text-2xl font-bold text-primary-foreground mb-2">
            🏔️ Have the Most Amazing Adventure Ever! 🦌
          </h2>
          <p className="text-primary-foreground print:text-sm">
            Remember to take lots of photos, be safe around wildlife, and make memories that will last a lifetime!
          </p>
          <div className="mt-4 text-sm text-primary-foreground/80">
            Created with ❤️ for the ultimate Yellowstone & Grand Teton family adventure
          </div>
        </Card>
      </footer>
    </div>
    </>
  );
};

export default DocumentVersion;