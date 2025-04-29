
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold text-primary">IntelliSurge Technologies</h3>
            <p className="mt-2 text-sm text-foreground/70 max-w-md">
              Creating the future of innovation through cutting-edge technology solutions.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="h-10 w-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="h-10 w-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="h-10 w-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              className="h-10 w-10 flex items-center justify-center rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60">
              &copy; {currentYear} IntelliSurge Technologies. All rights reserved.
            </p>
            
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm text-foreground/60 hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-foreground/60 hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-foreground/60 hover:text-foreground">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
