
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Handle scroll to set active section, navbar background, and hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
        if (currentScrollY > 300 && currentScrollY - lastScrollY > 10) {
          setIsNavVisible(false);
        }
      } else {
        setScrollDirection("up");
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);

      // Check if page has been scrolled to add background
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Find current active section
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Smooth scroll to section when clicking on nav links
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({
        top: offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5",
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="text-xl md:text-2xl font-bold text-primary transition-all hover:scale-105"
        >
          IntelliSurge
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "nav-link relative overflow-hidden",
                activeSection === link.href.substring(1) && "active"
              )}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href.substring(1));
              }}
            >
              <span className="relative z-10">{link.name}</span>
              {activeSection === link.href.substring(1) && (
                <span 
                  className="absolute inset-0 bg-primary/10 rounded-lg -z-[1]"
                  style={{
                    animation: "pulse-subtle 2s ease-in-out infinite"
                  }}
                ></span>
              )}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-background z-40 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="py-4 px-4 flex flex-col">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "py-3 text-lg font-medium border-b border-border transition-all",
                activeSection === link.href.substring(1)
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              )}
              style={{
                transitionDelay: `${index * 50}ms`,
                transform: isOpen ? "translateX(0)" : "translateX(20px)",
                opacity: isOpen ? 1 : 0,
                transition: "transform 0.3s ease, opacity 0.3s ease"
              }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href.substring(1));
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
