import { Link } from "wouter";
import { Leaf, Heart, ArrowRight } from "lucide-react";
import { FoodItem } from "@/lib/food-data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FoodCardProps {
  food: FoodItem;
}

export function FoodCard({ food }: FoodCardProps) {
  // Color coding for scores
  const getEcoColor = (score: string) => {
    switch (score) {
      case "Low": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "Medium": return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "High": return "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      default: return "";
    }
  };

  const getHealthColor = (score: string) => {
     switch (score) {
      case "High": return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "Medium": return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
      case "Low": return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
      default: return "";
    }
  };

  return (
    <Link href={`/food/${food.id}`}>
      <a className="block h-full group">
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm group-hover:bg-card">
          <CardHeader className="p-0">
            <div className="h-32 bg-secondary/20 flex items-center justify-center relative overflow-hidden">
               {/* Pattern overlay */}
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2F6A48_1px,transparent_1px)] [background-size:16px_16px]"></div>
               
               {/* Icon based on category (placeholder logic) */}
               <span className="text-4xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-500">
                  {food.category === "Fruits" && "🍎"}
                  {food.category === "Vegetables" && "🥦"}
                  {food.category === "Grains & Cereals" && "🌾"}
                  {food.category === "Pulses & Legumes" && "🫘"}
                  {food.category === "Dairy" && "🥛"}
                  {food.category === "Meat & Protein" && "🥩"}
                  {food.category === "Nuts & Seeds" && "🥜"}
               </span>

               <div className="absolute top-2 right-2">
                 <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-[10px]">
                   {food.category}
                 </Badge>
               </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-heading font-bold text-lg">{food.name}</h3>
            </div>
            
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Leaf className="w-3 h-3" /> Impact
                </span>
                <span className={cn("px-2 py-0.5 rounded-full border text-[10px] font-medium", getEcoColor(food.ecoScore))}>
                  {food.ecoScore}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Heart className="w-3 h-3" /> Health
                </span>
                <span className={cn("px-2 py-0.5 rounded-full border text-[10px] font-medium", getHealthColor(food.healthScore))}>
                  {food.healthScore}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-5 pt-0">
             <div className="w-full text-xs text-muted-foreground flex items-center justify-between pt-4 border-t border-dashed">
                <span>{food.nutrition.calories} kcal</span>
                <span className="flex items-center group-hover:text-primary transition-colors">
                  Details <ArrowRight className="w-3 h-3 ml-1" />
                </span>
             </div>
          </CardFooter>
        </Card>
      </a>
    </Link>
  );
}
