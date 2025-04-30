
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EducationSection from "@/components/EducationSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const sectionsRef = useRef<HTMLElement[]>([]);
  
  // Initialize animation observers and handle initial loading state
  useEffect(() => {
    // Track sections for advanced animation effects
    const sectionElements = document.querySelectorAll("section[id]");
    sectionsRef.current = Array.from(sectionElements) as HTMLElement[];
    
    // Observer for standard scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            
            // Add a special class for sections entering viewport
            if (entry.target.tagName === "SECTION") {
              entry.target.classList.add("section-in-view");
            }
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // More advanced parallax-style observer for sections
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When section enters or leaves viewport
          if (!entry.isIntersecting) {
            // Section is out of view - fade it out and reset
            if (entry.boundingClientRect.top > 0) {
              entry.target.classList.remove("section-active");
              entry.target.classList.add("section-inactive");
            }
          } else {
            // Section is in view - fade it in
            entry.target.classList.add("section-active");
            entry.target.classList.remove("section-inactive");
          }
        });
      },
      { threshold: [0.1, 0.5, 0.9], rootMargin: "-10% 0px" }
    );

    // Observe all elements with the animate-on-scroll class
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    // Observe all section elements for advanced effects
    sectionsRef.current.forEach((section) => {
      parallaxObserver.observe(section);
    });

    // Simulate loading time for initial animations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      parallaxObserver.disconnect();
    };
  }, []);

  return (
    <ThemeProvider>
      {/* Enhanced loading animation */}
      {loading && (
        <div className="loading-overlay">
          <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-text animate-pulse-subtle mt-4">
              Loading portfolio...
            </div>
          </div>
        </div>
      )}

      <Navbar />
      
      <main className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </ThemeProvider>
  );
};

export default Index;
