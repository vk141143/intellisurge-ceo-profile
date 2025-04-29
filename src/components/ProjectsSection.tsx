
import { useEffect } from "react";
import { Folder, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: 1,
    title: "AI-Driven Analytics Platform",
    description: "Developed a comprehensive analytics platform using artificial intelligence to provide actionable business insights.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    tags: ["AI/ML", "Data Analytics", "Business Intelligence"],
    link: "#"
  },
  {
    id: 2,
    title: "Smart Infrastructure Management System",
    description: "Created an IoT-based infrastructure monitoring and management system for enterprise environments.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop",
    tags: ["IoT", "Enterprise Solutions", "Infrastructure"],
    link: "#"
  },
  {
    id: 3,
    title: "Financial Technology Suite",
    description: "Built a comprehensive financial technology suite for managing transactions, investments, and financial planning.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop",
    tags: ["FinTech", "Security", "Financial Services"],
    link: "#"
  }
];

export default function ProjectsSection() {
  useEffect(() => {
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      elements.forEach(el => observer.observe(el));
      
      return () => {
        elements.forEach(el => observer.unobserve(el));
      };
    };
    
    animateElements();
  }, []);

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-10 animate-on-scroll">
          <Folder className="h-8 w-8 text-primary" />
          <h2 className="section-heading">Notable Projects</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card 
              key={project.id}
              className="overflow-hidden card-hover animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <h3 className="font-bold text-xl">{project.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="ml-auto" asChild>
                  <a href={project.link}>
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
