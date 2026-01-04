import { useState, useMemo } from "react";
import { foodDatabase, getAllCategories } from "@/lib/food-data";
import { FoodCard } from "@/components/food-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/fresh_healthy_food_spread_with_vegetables_fruits_and_grains_on_white_background.png";

export function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getAllCategories();

  const filteredFood = useMemo(() => {
    return foodDatabase.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? food.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-primary/5 border border-border">
        <div className="grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20 px-3 py-1">
              For a Sustainable Future
            </Badge>
            <h1 className="font-heading text-4xl lg:text-6xl font-bold leading-tight text-foreground">
              Eat Healthy. <br/>
              <span className="text-primary">Protect Earth.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Discover food choices that nourish your body while minimizing your carbon footprint. A complete guide to sustainable eating.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Foods
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 bg-background/50 backdrop-blur-sm">
                How it Works
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] lg:h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-700">
             <img 
               src={heroImage} 
               alt="Fresh healthy food" 
               className="object-cover w-full h-full"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Explorer Section */}
      <section id="explore" className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-heading font-bold">Food Explorer</h2>
            <p className="text-muted-foreground">Browse our database of common foods to see their impact.</p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
             <div className="relative w-full sm:w-[300px]">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
               <Input 
                 placeholder="Search foods (e.g., Apple, Rice)..." 
                 className="pl-10 bg-background"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
               {search && (
                 <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                   <X className="w-3 h-3" />
                 </button>
               )}
             </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 pb-4">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className="rounded-full"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {filteredFood.length > 0 ? (
             filteredFood.map((food) => (
               <FoodCard key={food.id} food={food} />
             ))
           ) : (
             <div className="col-span-full py-20 text-center text-muted-foreground bg-muted/30 rounded-2xl border border-dashed">
               <div className="text-4xl mb-4">🔍</div>
               <p>No foods found matching "{search}"</p>
               <Button variant="link" onClick={() => { setSearch(""); setSelectedCategory(null); }}>Clear Filters</Button>
             </div>
           )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-secondary/20 rounded-2xl p-8 md:p-12 text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">Why Does It Matter?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-left">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">🌍</div>
            <h3 className="font-bold">Climate Change</h3>
            <p className="text-sm text-muted-foreground">Food production accounts for over 25% of global greenhouse gas emissions.</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">💧</div>
            <h3 className="font-bold">Water Usage</h3>
            <p className="text-sm text-muted-foreground">Some crops like almonds and avocados require immense amounts of water to grow.</p>
          </div>
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-2">💪</div>
            <h3 className="font-bold">Human Health</h3>
            <p className="text-sm text-muted-foreground">Often, foods that are good for the planet (plants) are also best for your health.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
