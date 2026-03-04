import { useState } from "react";
import { foods, FoodItem } from "@/lib/food-data-enhanced";
import { calculateDailyCalories, getDailyMacros, getMealHealthScore, getCarbonBudgetStatus, calculateBMI } from "@/lib/nutrition-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Leaf, Activity, TrendingUp, AlertCircle } from "lucide-react";
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
  
  // User profile
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("170");
  const [age, setAge] = useState<string>("25");
  const [sex, setSex] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<string>("moderate");
  const [showUserProfile, setShowUserProfile] = useState<boolean>(false);

  const handleAdd = () => {
    const food = foods.find(f => f.id === selectedFoodId);
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
  const totalWater = mealItems.reduce((acc, item) => acc + (item.food.waterFootprint * item.quantity), 0);
  const totalCalories = mealItems.reduce((acc, item) => acc + (item.food.nutrition.calories * item.quantity), 0);
  const totalProtein = mealItems.reduce((acc, item) => acc + (item.food.nutrition.protein * item.quantity), 0);
  const totalFat = mealItems.reduce((acc, item) => acc + (item.food.nutrition.fat * item.quantity), 0);
  const totalCarbs = mealItems.reduce((acc, item) => acc + (item.food.nutrition.carbs * item.quantity), 0);
  const totalFiber = mealItems.reduce((acc, item) => acc + (item.food.nutrition.fiber * item.quantity), 0);

  // Calculate daily recommendations
  const w = parseFloat(weight) || 70;
  const h = parseFloat(height) || 170;
  const a = parseFloat(age) || 25;
  const dailyCalories = calculateDailyCalories(w, h, a, sex, activityLevel as any);
  const macros = getDailyMacros(dailyCalories);
  const healthScore = getMealHealthScore(totalProtein, totalCalories, totalFiber, totalCarbs);
  const carbonStatus = getCarbonBudgetStatus(totalCO2);

  // Benchmarks
  const carbonBudget = 2.5;
  const carbonPercentage = (totalCO2 / carbonBudget) * 100;
  const caloriePercentage = (totalCalories / dailyCalories) * 100;
  const proteinPercentage = (totalProtein / macros.protein) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-heading font-bold">Impact Calculator</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Build a meal and track your environmental & nutritional impact.
        </p>
      </div>

      <div className="grid md:grid-cols-[350px_1fr] gap-8">
        {/* Left Sidebar */}
        <div className="space-y-4">
          {/* User Profile */}
          <div className="bg-card border p-6 rounded-3xl shadow-sm">
            <button
              onClick={() => setShowUserProfile(!showUserProfile)}
              className="w-full text-left mb-4 flex items-center justify-between"
            >
              <h3 className="font-heading font-bold text-lg">Your Profile</h3>
              <span className="text-xl">{showUserProfile ? "▼" : "▶"}</span>
            </button>

            {showUserProfile && (
              <div className="space-y-4 border-t pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium">Sex</label>
                  <Select value={sex} onValueChange={(v: any) => setSex(v)}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Weight (kg)</label>
                    <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="h-9 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Height (cm)</label>
                    <Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="h-9 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Age</label>
                    <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="h-9 text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium">Activity Level</label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="active">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Daily Targets */}
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-6 rounded-3xl">
            <h3 className="font-heading font-bold text-sm mb-3">Daily Target</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Calories</span>
                <span className="font-semibold">{dailyCalories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Protein</span>
                <span className="font-semibold">{Math.round(macros.protein)}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Carbs</span>
                <span className="font-semibold">{Math.round(macros.carbs)}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fat</span>
                <span className="font-semibold">{Math.round(macros.fat)}g</span>
              </div>
            </div>
          </div>

          {/* Add Food Form */}
          <div className="bg-card border p-6 rounded-3xl shadow-sm">
            <h2 className="font-heading font-bold text-lg mb-4">Add Food</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium">Select Food</label>
                <Select value={selectedFoodId} onValueChange={setSelectedFoodId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a food..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-64">
                    {foods.map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.emoji} {f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Servings</label>
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    min="0.1" 
                    step="0.1" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    className="h-9"
                  />
                  <div className="flex items-center text-xs text-muted-foreground whitespace-nowrap px-2 bg-secondary/20 rounded-md">
                    {selectedFoodId ? foods.find(f => f.id === selectedFoodId)?.servingSize : "Serving"}
                  </div>
                </div>
              </div>

              <Button onClick={handleAdd} className="w-full h-9" disabled={!selectedFoodId}>
                <Plus className="w-4 h-4 mr-2" /> Add to Plate
              </Button>
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Health Score */}
            <div className={`border p-6 rounded-3xl relative overflow-hidden ${
              healthScore >= 75 ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900" :
              healthScore >= 50 ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900" :
              "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900"
            }`}>
              <div className="relative z-10">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <TrendingUp className="w-5 h-5" /> Health Score
                </div>
                <div className="text-4xl font-bold">{Math.round(healthScore)}<span className="text-lg text-muted-foreground">/100</span></div>
                <Badge variant="outline" className="mt-3 text-xs">
                  {healthScore >= 75 ? "Excellent" : healthScore >= 50 ? "Good" : "Needs Work"}
                </Badge>
              </div>
            </div>

            {/* Total CO₂ */}
            <div className={`border p-6 rounded-3xl ${
              carbonStatus === "Low" ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900" :
              carbonStatus === "Moderate" ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900" :
              "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900"
            }`}>
              <div className="relative z-10">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <Leaf className="w-5 h-5" /> CO₂ Impact
                </div>
                <div className="text-4xl font-bold">{totalCO2.toFixed(2)} <span className="text-lg text-muted-foreground">kg</span></div>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Daily Budget ({carbonBudget}kg)</span>
                    <span>{Math.round(carbonPercentage)}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        carbonPercentage > 100 ? "bg-rose-500" : 
                        carbonPercentage > 50 ? "bg-amber-500" : 
                        "bg-emerald-500"
                      }`} 
                      style={{ width: `${Math.min(carbonPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Breakdown */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 p-4 rounded-2xl">
              <div className="text-xs text-muted-foreground mb-1">Calories</div>
              <div className="text-2xl font-bold">{Math.round(totalCalories)}</div>
              <div className="text-xs text-muted-foreground mt-1">{Math.round(caloriePercentage)}% daily</div>
            </div>
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-4 rounded-2xl">
              <div className="text-xs text-muted-foreground mb-1">Protein</div>
              <div className="text-2xl font-bold">{totalProtein.toFixed(1)}g</div>
              <div className="text-xs text-muted-foreground mt-1">{Math.round(proteinPercentage)}% daily</div>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 rounded-2xl">
              <div className="text-xs text-muted-foreground mb-1">Carbs</div>
              <div className="text-2xl font-bold">{totalCarbs.toFixed(1)}g</div>
              <div className="text-xs text-muted-foreground mt-1">Fiber: {totalFiber.toFixed(1)}g</div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 p-4 rounded-2xl">
              <div className="text-xs text-muted-foreground mb-1">Fat</div>
              <div className="text-2xl font-bold">{totalFat.toFixed(1)}g</div>
              <div className="text-xs text-muted-foreground mt-1">Water: {totalWater.toFixed(0)}L</div>
            </div>
          </div>

          {/* Your Plate */}
          <div className="bg-card border rounded-3xl overflow-hidden min-h-[400px]">
            <div className="p-4 border-b bg-muted/30">
              <h3 className="font-bold font-heading">Your Plate ({mealItems.length})</h3>
            </div>
            {mealItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
                <div className="text-5xl mb-3">🍽️</div>
                <p className="mb-2">Your plate is empty</p>
                <p className="text-xs">Add foods from the left panel</p>
              </div>
            ) : (
              <div className="divide-y">
                {mealItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between group hover:bg-muted/10 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-xl flex-shrink-0">
                        {item.food.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{item.food.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {(item.quantity * item.food.servingGrams).toFixed(0)}g • {Math.round(item.food.nutrition.calories * item.quantity)} kcal
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm mr-4">
                      <div className="font-semibold">{item.quantity.toFixed(1)}x</div>
                      <div className="text-xs text-muted-foreground text-amber-600">{(item.food.co2PerServing * item.quantity).toFixed(2)} kg CO₂</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
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
