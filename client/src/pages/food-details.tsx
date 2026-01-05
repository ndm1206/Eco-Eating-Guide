import { useRoute } from "wouter";
import { foodDatabase } from "@/lib/food-data";
import { ArrowLeft, Leaf, Heart, Calendar, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function FoodDetails() {
  const [match, params] = useRoute("/food/:id");
  
  if (!match) return <div>404</div>;

  const food = foodDatabase.find(f => f.id === params.id);

  if (!food) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Food not found</h2>
        <Link href="/"><Button>Back to Explorer</Button></Link>
      </div>
    );
  }

  // Months for seasonality chart
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <Link href="/">
        <a className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Explorer
        </a>
      </Link>

      {/* Header Card */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
        {/* Visual */}
        <div className="aspect-square bg-secondary/20 rounded-3xl flex items-center justify-center text-[8rem] shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2F6A48_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <span className="relative z-10 animate-in zoom-in duration-500">
             {food.emoji || (
               <>
                 {food.category === "Fruits" && "🍎"}
                 {food.category === "Vegetables" && "🥦"}
                 {food.category === "Grains & Cereals" && "🌾"}
                 {food.category === "Pulses & Legumes" && "🫘"}
                 {food.category === "Dairy" && "🥛"}
                 {food.category === "Meat & Protein" && "🥩"}
                 {food.category === "Nuts & Seeds" && "🥜"}
               </>
             )}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary">{food.category}</Badge>
              <Badge variant="outline">{food.servingSize}</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">{food.name}</h1>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={cn("p-4 rounded-2xl border", 
              food.ecoScore === "Low" ? "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20" :
              food.ecoScore === "Medium" ? "bg-amber-50 border-amber-100 dark:bg-amber-900/20" :
              "bg-rose-50 border-rose-100 dark:bg-rose-900/20"
            )}>
              <div className="flex items-center gap-2 mb-2 font-medium">
                <Leaf className="w-4 h-4" /> Environment
              </div>
              <div className="text-2xl font-bold">{food.ecoScore} Impact</div>
              <p className="text-xs text-muted-foreground mt-1">{food.co2PerServing} kg CO₂e per serving</p>
            </div>

            <div className={cn("p-4 rounded-2xl border",
              food.healthScore === "High" ? "bg-blue-50 border-blue-100 dark:bg-blue-900/20" :
              food.healthScore === "Medium" ? "bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20" :
              "bg-slate-50 border-slate-100 dark:bg-slate-900/20"
            )}>
              <div className="flex items-center gap-2 mb-2 font-medium">
                <Heart className="w-4 h-4" /> Health
              </div>
              <div className="text-2xl font-bold">{food.healthScore} Score</div>
              <p className="text-xs text-muted-foreground mt-1">{food.nutrition.calories} kcal per serving</p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-xl flex gap-3 items-start">
            <InfoIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm">{food.advice} {food.sustainabilityNote}</p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-8 pt-8">
        
        {/* Nutrition */}
        <div className="bg-card border rounded-3xl p-6 shadow-sm">
          <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Nutritional Facts
          </h3>
          <div className="space-y-4">
             <NutrientRow label="Protein" value={`${food.nutrition.protein}g`} max={30} color="bg-blue-500" />
             <NutrientRow label="Fat" value={`${food.nutrition.fat}g`} max={20} color="bg-amber-500" />
             <NutrientRow label="Carbs" value={`${food.nutrition.carbs}g`} max={50} color="bg-emerald-500" />
             <NutrientRow label="Fiber" value={`${food.nutrition.fiber}g`} max={10} color="bg-primary" />
             
             <div className="pt-4 mt-4 border-t">
               <span className="text-sm font-medium text-muted-foreground">Vitamins & Minerals:</span>
               <div className="flex flex-wrap gap-2 mt-2">
                 {food.nutrition.vitamins.map(v => (
                   <Badge key={v} variant="secondary" className="font-normal">{v}</Badge>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* Seasonality */}
        <div className="bg-card border rounded-3xl p-6 shadow-sm">
          <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Seasonality
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Eating seasonally reduces carbon footprint from storage and transport.
          </p>
          
          <div className="grid grid-cols-3 gap-3">
            {months.map((month, index) => {
              const isSeason = food.seasonality.includes(index);
              return (
                <div 
                  key={month} 
                  className={cn(
                    "text-center py-2 rounded-lg text-sm font-medium transition-colors border",
                    isSeason 
                      ? "bg-primary text-primary-foreground border-primary" 
                      : "bg-muted/30 text-muted-foreground border-transparent"
                  )}
                >
                  {month}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function NutrientRow({ label, value, max, color }: { label: string, value: string, max: number, color: string }) {
  const numValue = parseFloat(value);
  const percentage = Math.min((numValue / max) * 100, 100);
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full transition-all duration-500", color)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function InfoIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
  );
}
