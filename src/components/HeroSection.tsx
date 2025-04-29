
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center px-4 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5 -z-10"></div>
      
      {/* Animated background shape */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-rotate-slow -z-10"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-rotate-slow -z-10"></div>
      
      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className={cn("space-y-6", loaded ? "animate-fade-in" : "opacity-0")}>
          <div className="space-y-2">
            <h2 className="font-medium text-primary">Tech Entrepreneur</h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              JayaSri Krishna Nelluri
            </h1>
            <p className="mt-4 text-xl text-foreground/80 max-w-md">
              Founder and CEO of IntelliSurge Technologies | Creating the Future of Innovation
            </p>
          </div>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <Button 
              onClick={scrollToContact}
              size="lg" 
              className="rounded-full font-medium"
            >
              Get In Touch
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full font-medium"
              asChild
            >
              <a href="#education">
                Learn More
              </a>
            </Button>
          </div>
        </div>
        
        <div className={cn(
          "relative flex justify-center",
          loaded ? "animate-fade-in" : "opacity-0"
        )}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background/80 shadow-xl">
            <img 
              src="/lovable-uploads/0fe5bd2b-cd42-4c67-9b3e-f5e36cb7beb0.png" 
              alt="JayaSri Krishna Nelluri" 
              className="w-full h-full object-cover"
            />
            
            {/* Decorative rings */}
            <div className="absolute -inset-1 border-4 border-dashed border-primary/20 rounded-full animate-rotate-slow"></div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <a href="#education" className="flex flex-col items-center text-foreground/60 hover:text-foreground transition-colors">
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
