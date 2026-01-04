import { foodDatabase } from "@/lib/food-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Sun, CloudRain, Snowflake, Leaf } from "lucide-react";
import { Link } from "wouter";

export function SeasonalPage() {
  const currentMonthIndex = new Date().getMonth();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const currentMonthName = months[currentMonthIndex];

  // Get Season
  const getSeason = (monthIndex: number) => {
    if (monthIndex >= 2 && monthIndex <= 4) return { name: "Spring", icon: Leaf, color: "text-emerald-500" };
    if (monthIndex >= 5 && monthIndex <= 7) return { name: "Summer", icon: Sun, color: "text-amber-500" };
    if (monthIndex >= 8 && monthIndex <= 10) return { name: "Autumn", icon: CloudRain, color: "text-orange-500" };
    return { name: "Winter", icon: Snowflake, color: "text-blue-500" };
  };

  const currentSeason = getSeason(currentMonthIndex);

  const seasonalFoods = foodDatabase.filter(f => f.seasonality.includes(currentMonthIndex));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4 py-8">
        <Badge variant="outline" className="px-4 py-1 text-base rounded-full bg-background">
          <Calendar className="w-4 h-4 mr-2" /> Current Month: {currentMonthName}
        </Badge>
        <h1 className="text-4xl md:text-5xl font-heading font-bold flex items-center justify-center gap-3">
          It's <span className={currentSeason.color}>{currentSeason.name}</span> Season
          <currentSeason.icon className={`w-8 h-8 ${currentSeason.color}`} />
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Eating seasonal produce is fresher, tastier, and more sustainable because it doesn't need to be transported long distances or grown in heated greenhouses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {seasonalFoods.map(food => (
          <Link key={food.id} href={`/food/${food.id}`}>
            <a className="block group">
              <Card className="hover:shadow-md transition-all duration-300 border-dashed hover:border-solid bg-card/50">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {food.category === "Fruits" ? "🍎" : food.category === "Vegetables" ? "🥦" : "🌾"}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{food.name}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="text-[10px]">{food.category}</Badge>
                      <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">In Season</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </div>

      {seasonalFoods.length === 0 && (
         <div className="text-center py-20 text-muted-foreground">
           <p>Showing a limited selection in this prototype.</p>
         </div>
      )}
    </div>
  );
}
