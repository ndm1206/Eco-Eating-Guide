import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";

import { Home } from "@/pages/home";
import { FoodDetails } from "@/pages/food-details";
import { CalculatorPage } from "@/pages/calculator";
import { SeasonalPage } from "@/pages/seasonal";
import NotFound from "@/pages/not-found";

import founderPhoto from "@assets/PASSPORT_SIZE_IMAGE_1767597800309.jpg";
import { Mail, Instagram } from "lucide-react";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/food/:id" component={FoodDetails} />
        <Route path="/calculator" component={CalculatorPage} />
        <Route path="/seasonal" component={SeasonalPage} />
        <Route path="/about">
          <div className="max-w-2xl mx-auto py-12 prose text-center">
            <h1 className="text-4xl font-heading font-bold mb-6">Our Mission</h1>
            <p className="text-lg text-muted-foreground">
              We believe that every bite counts. By making conscious choices about what we eat, we can significantly reduce our environmental impact while improving our personal health.
            </p>
            <div className="my-12 p-8 bg-secondary/10 border border-secondary/20 rounded-3xl flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
                <img 
                  src={founderPhoto} 
                  alt="Nadeem Alam" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-heading font-bold text-lg">Created by Nadeem Alam</p>
                <p className="text-sm text-muted-foreground font-medium">CSE AIML</p>
                <div className="mt-2 flex justify-center items-center gap-4">
                  <a href="mailto:official.ndm1206@gmail.com" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-xs">Email</span>
                  </a>
                  <a href="https://instagram.com/ndm.1426" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <Instagram className="w-4 h-4" />
                    <span className="text-xs">@ndm.1426</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
