import { Link, useLocation } from "wouter";
import { Leaf, Menu, X, Heart, Calculator, Calendar, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ href, children, icon: Icon }: { href: string; children: React.ReactNode; icon: any }) => {
    const isActive = location === href;
    return (
      <Link href={href}>
        <a 
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-sm font-medium
            ${isActive 
              ? "bg-primary text-primary-foreground" 
              : "text-foreground hover:bg-secondary/50"
            }`}
          onClick={() => setIsOpen(false)}
        >
          <Icon className="w-4 h-4" />
          {children}
        </a>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 group">
              <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:scale-105 transition-transform">
                <Leaf className="w-5 h-5 fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-none tracking-tight">Eco Eating</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Healthy You, Healthy Earth</span>
              </div>
            </a>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/" icon={Leaf}>Explorer</NavLink>
            <NavLink href="/calculator" icon={Calculator}>Calculator</NavLink>
            <NavLink href="/seasonal" icon={Calendar}>Seasonal</NavLink>
            <NavLink href="/about" icon={Info}>Mission</NavLink>
          </nav>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] max-w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLink href="/" icon={Leaf}>Food Explorer</NavLink>
                  <NavLink href="/calculator" icon={Calculator}>Eco Calculator</NavLink>
                  <NavLink href="/seasonal" icon={Calendar}>Seasonal Guide</NavLink>
                  <NavLink href="/about" icon={Info}>Our Mission</NavLink>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4 text-primary">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-semibold text-lg mb-2">Eco Eating Guide</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-8">
            Empowering you to make food choices that nurture your body and protect our planet.
          </p>
          <div className="text-xs text-muted-foreground">
            Created by Nadeem Alam &copy; {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
