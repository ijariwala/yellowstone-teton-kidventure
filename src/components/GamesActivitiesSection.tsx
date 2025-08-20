import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

const triviaQuestions: QuizQuestion[] = [
  {
    question: "What was the first National Park in the world?",
    options: ["Grand Canyon", "Yellowstone", "Yosemite", "Great Smoky Mountains"],
    correct: 1
  },
  {
    question: "How tall are the Grand Teton mountains?",
    options: ["Over 13,000 feet", "8,000 feet", "15,000 feet", "10,000 feet"],
    correct: 0
  },
  {
    question: "What makes Grand Prismatic Spring so colorful?",
    options: ["Minerals", "Tiny bacteria", "Algae", "Both bacteria and algae"],
    correct: 3
  },
  {
    question: "How fast can a bison run?",
    options: ["15 mph", "25 mph", "35 mph", "45 mph"],
    correct: 2
  },
  {
    question: "When do geysers like Old Faithful erupt?",
    options: ["Every hour exactly", "Randomly", "In predictable patterns", "Only at night"],
    correct: 2
  }
];

const wildlifeMatching = [
  { animal: "Bison", fact: "Can weigh as much as a small car!" },
  { animal: "Elk", fact: "Males make loud bugling sounds" },
  { animal: "Grizzly Bear", fact: "Can smell food from 18 miles away" },
  { animal: "Wolf", fact: "Howl so loud others 6 miles away can hear" }
];

const packingItems = [
  { item: "Binoculars", category: "essential", reason: "To see wildlife up close safely!" },
  { item: "Camera", category: "essential", reason: "Capture amazing memories!" },
  { item: "Comfortable hiking shoes", category: "essential", reason: "For walking on trails" },
  { item: "Layers of clothing", category: "essential", reason: "Mountain weather changes fast!" },
  { item: "Water bottle", category: "essential", reason: "Stay hydrated on adventures" },
  { item: "Snacks", category: "essential", reason: "Keep energy up for exploring" },
  { item: "Sunscreen", category: "essential", reason: "Mountain sun is strong!" },
  { item: "Hat", category: "essential", reason: "Protect from sun and wind" },
  { item: "Sandals", category: "optional", reason: "Nice to have for relaxing" },
  { item: "Notebook", category: "optional", reason: "Draw or write about your adventures" }
];

const GamesActivitiesSection = () => {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [matchingGame, setMatchingGame] = useState<{[key: string]: string}>({});
  const [packedItems, setPackedItems] = useState<string[]>([]);
  const [geyserGuess, setGeyserGuess] = useState("");
  const [showGeyserResult, setShowGeyserResult] = useState(false);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    if (answerIndex === triviaQuestions[currentQuiz].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuiz < triviaQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
  };

  const togglePackingItem = (item: string) => {
    setPackedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleGeyserGuess = () => {
    setShowGeyserResult(true);
  };

  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">🎮 Fun Games & Activities</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Test your knowledge and get ready for your adventure with these interactive games!
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Yellowstone Trivia Quiz */}
        <Card className="bg-gradient-card shadow-card-adventure">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              🧠 Yellowstone Trivia Challenge
            </CardTitle>
            <div className="flex justify-between items-center">
              <Badge variant="outline">Question {currentQuiz + 1} of {triviaQuestions.length}</Badge>
              <Badge variant="secondary">Score: {score}/{triviaQuestions.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {currentQuiz < triviaQuestions.length ? (
              <div className="space-y-4">
                <p className="text-lg font-medium text-foreground">
                  {triviaQuestions[currentQuiz].question}
                </p>
                <div className="grid gap-2">
                  {triviaQuestions[currentQuiz].options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        showAnswer 
                          ? index === triviaQuestions[currentQuiz].correct 
                            ? "secondary" 
                            : selectedAnswer === index 
                              ? "destructive"
                              : "outline"
                          : selectedAnswer === index 
                            ? "default" 
                            : "outline"
                      }
                      onClick={() => !showAnswer && handleQuizAnswer(index)}
                      disabled={showAnswer}
                      className="justify-start text-left"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {showAnswer && (
                  <div className="mt-4">
                    {currentQuiz < triviaQuestions.length - 1 ? (
                      <Button onClick={nextQuestion} className="w-full">
                        Next Question →
                      </Button>
                    ) : (
                      <div className="text-center space-y-3">
                        <p className="text-lg font-bold">
                          🎉 Quiz Complete! Final Score: {score}/{triviaQuestions.length}
                        </p>
                        <Button onClick={resetQuiz} variant="outline">
                          Play Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Packing Checklist Game */}
        <Card className="bg-gradient-card shadow-card-adventure">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              🎒 Pack Your Adventure Bag
            </CardTitle>
            <Badge variant="outline">
              {packedItems.length} items packed
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Click items to add them to your packing list!
            </p>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {packingItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    packedItems.includes(item.item)
                      ? 'bg-forest/10 border-forest text-forest'
                      : 'bg-background border-border hover:bg-muted'
                  }`}
                  onClick={() => togglePackingItem(item.item)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.item}</span>
                      {item.category === 'essential' && (
                        <Badge variant="destructive" className="text-xs">Essential</Badge>
                      )}
                      {packedItems.includes(item.item) && <span>✓</span>}
                    </div>
                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-mountain/10 rounded-lg border border-mountain/20">
              <p className="text-sm text-mountain font-medium">
                💡 Tip: Essential items are must-haves for your safety and comfort!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Geyser Prediction Game */}
        <Card className="bg-gradient-card shadow-card-adventure">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              ⏰ Geyser Prediction Challenge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Old Faithful erupts about every 90 minutes. If it just erupted at 10:30 AM, when do you think it will erupt next?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {["11:45 AM", "12:00 PM", "12:15 PM", "12:30 PM"].map((time) => (
                  <Button
                    key={time}
                    variant={geyserGuess === time ? "default" : "outline"}
                    onClick={() => setGeyserGuess(time)}
                    disabled={showGeyserResult}
                  >
                    {time}
                  </Button>
                ))}
              </div>
              {geyserGuess && !showGeyserResult && (
                <Button onClick={handleGeyserGuess} className="w-full">
                  Check My Guess!
                </Button>
              )}
              {showGeyserResult && (
                <div className="p-4 bg-forest/10 border border-forest/20 rounded-lg">
                  <p className="font-medium text-forest">
                    {geyserGuess === "12:00 PM" 
                      ? "🎉 Excellent guess! Around 12:00 PM would be about 90 minutes later!"
                      : "🤔 Close! Old Faithful typically erupts every 60-110 minutes, so around 12:00 PM would be the best guess!"
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wildlife Sound Match */}
        <Card className="bg-gradient-card shadow-card-adventure">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              🔊 Wildlife Sound Detective
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Match each animal with the sound they make!
            </p>
            <div className="space-y-3">
              {[
                { animal: "Elk", sound: "Loud bugling call", emoji: "🦌" },
                { animal: "Wolf", sound: "Howling", emoji: "🐺" },
                { animal: "Bison", sound: "Deep grunting", emoji: "🦬" },
                { animal: "Bear", sound: "Woofing or huffing", emoji: "🐻" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium">{item.emoji} {item.animal}</span>
                  <span className="text-sm text-muted-foreground">{item.sound}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-sunset/10 rounded-lg border border-sunset/20">
              <p className="text-sm text-sunset">
                🎵 Listen for these sounds during your visit! Each animal has its own special way of communicating.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pre-Trip Learning Activities */}
        <Card className="bg-gradient-card shadow-card-adventure lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              📚 Pre-Trip Learning Adventures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-mountain/10 rounded-lg border border-mountain/20">
                <h4 className="font-bold text-mountain mb-2">🗺️ Map Explorer</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Look up Yellowstone on a map. Can you find Wyoming, Montana, and Idaho? The park touches all three states!
                </p>
                <Badge variant="outline" className="text-xs">Geography</Badge>
              </div>
              
              <div className="p-4 bg-forest/10 rounded-lg border border-forest/20">
                <h4 className="font-bold text-forest mb-2">🌋 Volcano Detective</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Research: Did you know Yellowstone sits on top of a supervolcano? Don't worry - it's been sleeping for 70,000 years!
                </p>
                <Badge variant="outline" className="text-xs">Science</Badge>
              </div>
              
              <div className="p-4 bg-sunset/10 rounded-lg border border-sunset/20">
                <h4 className="font-bold text-sunset mb-2">📖 Story Time</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Read about Native American tribes who lived in this area for thousands of years before it became a park.
                </p>
                <Badge variant="outline" className="text-xs">History</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
};

export default GamesActivitiesSection;