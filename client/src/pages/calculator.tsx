import { useState } from "react";
import { foodDatabase, FoodItem } from "@/lib/food-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Leaf, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MealItem {
  id: string; // unique id for list
  food: FoodItem;
  quantity: number; // multiplier (1 = 1 serving)
}

export function CalculatorPage() {
  const [selectedFoodId, setSelectedFoodId] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("1");
  const [mealItems, setMealItems] = useState<MealItem[]>([]);

  const handleAdd = () => {
    const food = foodDatabase.find(f => f.id === selectedFoodId);
    if (!food) return;

    const qty = parseFloat(quantity);
    if (isNaN(qty) || qty <= 0) return;

    setMealItems([...mealItems, { id: Math.random().toString(), food, quantity: qty }]);
    setSelectedFoodId("");
    setQuantity("1");
  };

  const handleRemove = (id: string) => {
    setMealItems(mealItems.filter(item => item.id !== id));
  };

  // Totals
  const totalCO2 = mealItems.reduce((acc, item) => acc + (item.food.co2PerServing * item.quantity), 0);
  const totalCalories = mealItems.reduce((acc, item) => acc + (item.food.nutrition.calories * item.quantity), 0);
  const totalProtein = mealItems.reduce((acc, item) => acc + (item.food.nutrition.protein * item.quantity), 0);

  // Benchmarks (Simple logic)
  // Avg Daily carbon budget for sustainable diet is ~2-3kg
  const carbonBudget = 2.5;
  const carbonPercentage = (totalCO2 / carbonBudget) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-heading font-bold">Impact Calculator</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Build a meal or a day of eating to see your environmental footprint.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-8">
        {/* Input Form */}
        <div className="bg-card border p-6 rounded-3xl shadow-sm h-fit">
          <h2 className="font-heading font-bold text-xl mb-4">Add Food</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Food</label>
              <Select value={selectedFoodId} onValueChange={setSelectedFoodId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a food..." />
                </SelectTrigger>
                <SelectContent>
                   {foodDatabase.map(f => (
                     <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                   ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Servings</label>
              <div className="flex gap-2">
                 <Input 
                   type="number" 
                   min="0.1" 
                   step="0.1" 
                   value={quantity} 
                   onChange={(e) => setQuantity(e.target.value)} 
                 />
                 <div className="flex items-center text-sm text-muted-foreground whitespace-nowrap px-2 bg-secondary/20 rounded-md">
                   {selectedFoodId ? foodDatabase.find(f => f.id === selectedFoodId)?.servingSize : "Serving"}
                 </div>
              </div>
            </div>

            <Button onClick={handleAdd} className="w-full" disabled={!selectedFoodId}>
              <Plus className="w-4 h-4 mr-2" /> Add to Plate
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {/* Totals Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-2 text-primary font-bold mb-1">
                   <Leaf className="w-5 h-5" /> Total CO₂
                 </div>
                 <div className="text-4xl font-bold">{totalCO2.toFixed(2)} <span className="text-lg font-normal text-muted-foreground">kg</span></div>
                 <div className="mt-4 space-y-1">
                   <div className="flex justify-between text-xs text-muted-foreground">
                     <span>Daily Budget ({carbonBudget}kg)</span>
                     <span>{Math.round(carbonPercentage)}%</span>
                   </div>
                   <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                     <div 
                       className={`h-full rounded-full ${carbonPercentage > 100 ? "bg-rose-500" : "bg-primary"}`} 
                       style={{ width: `${Math.min(carbonPercentage, 100)}%` }}
                     />
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-card border p-6 rounded-3xl">
              <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
                <Activity className="w-5 h-5" /> Nutrition
              </div>
              <div className="text-3xl font-bold">{Math.round(totalCalories)} <span className="text-lg font-normal text-muted-foreground">kcal</span></div>
              <div className="text-sm text-muted-foreground mt-2">
                Protein: {totalProtein.toFixed(1)}g
              </div>
            </div>
          </div>

          {/* List */}
          <div className="bg-card border rounded-3xl overflow-hidden min-h-[300px]">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="font-bold font-heading">Your Plate</h3>
            </div>
            {mealItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <div className="text-4xl mb-2">🍽️</div>
                <p>Your plate is empty</p>
              </div>
            ) : (
              <div className="divide-y">
                {mealItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between group hover:bg-muted/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-lg">
                        {item.food.category === "Meat & Protein" ? "🥩" : item.food.category === "Fruits" ? "🍎" : "🥗"}
                      </div>
                      <div>
                        <div className="font-bold">{item.food.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} serving(s) • {(item.food.co2PerServing * item.quantity).toFixed(2)}kg CO₂
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(item.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
