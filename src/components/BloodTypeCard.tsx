
import { Droplet } from "lucide-react";

type BloodTypeCardProps = {
  type: string;
  description: string;
  isNegative?: boolean;
};

const BloodTypeCard = ({ type, description, isNegative = false }: BloodTypeCardProps) => {
  return (
    <div className="relative bg-white dark:bg-black/40 rounded-2xl p-6 shadow-sm border border-border/50 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] animate-fade-in">
      <div className="absolute top-3 right-3">
        <Droplet className={`w-5 h-5 ${isNegative ? "text-blue-500" : "text-blood-500"}`} fill="currentColor" />
      </div>
      <h3 className="text-2xl font-bold mb-2">{type}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default BloodTypeCard;
