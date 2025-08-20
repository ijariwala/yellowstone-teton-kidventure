import { Card, CardContent } from "@/components/ui/card";

interface WildlifeCardProps {
  name: string;
  image: string;
  funFact: string;
  likelihood: "Very Likely" | "Likely" | "Possible";
  safetyTip?: string;
}

const WildlifeCard = ({ name, image, funFact, likelihood, safetyTip }: WildlifeCardProps) => {
  const getLikelihoodColor = (likelihood: string) => {
    switch (likelihood) {
      case "Very Likely":
        return "bg-forest text-primary-foreground";
      case "Likely":
        return "bg-sunset text-accent-foreground";
      case "Possible":
        return "bg-mountain text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="overflow-hidden bg-gradient-card shadow-card-adventure hover:shadow-adventure transition-all duration-300 hover:scale-105">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${getLikelihoodColor(likelihood)}`}>
          {likelihood}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground mb-3 text-sm leading-relaxed">{funFact}</p>
        {safetyTip && (
          <div className="bg-sky/20 border border-sky/30 rounded-lg p-3">
            <p className="text-sm text-mountain font-medium">
              <span className="text-sunset">⚠️ Safety Tip:</span> {safetyTip}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WildlifeCard;