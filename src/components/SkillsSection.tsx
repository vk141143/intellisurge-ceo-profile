
import { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number;
  }[];
}

const skillsData: SkillCategory[] = [
  {
    name: "Business & Leadership",
    skills: [
      { name: "Business Strategy", level: 95 },
      { name: "Organizational Leadership", level: 90 },
      { name: "Business Development", level: 85 },
      { name: "Operations Management", level: 88 },
      { name: "Financial Management", level: 80 },
    ],
  },
  {
    name: "Industry Knowledge",
    skills: [
      { name: "Aviation Operations", level: 85 },
      { name: "Travel Industry", level: 82 },
      { name: "Global Distribution Systems", level: 78 },
      { name: "Airline Industry Standards", level: 75 },
    ],
  },
  {
    name: "Technical Skills",
    skills: [
      { name: "Data Analysis", level: 70 },
      { name: "Financial Accounting", level: 75 },
      { name: "Programming Languages", level: 65 },
      { name: "Operating Systems", level: 68 },
    ],
  },
];

export default function SkillsSection() {
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  const [animateIn, setAnimateIn] = useState(false);

  // Handle scroll-based animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.getAttribute("data-skill");
            if (skillName && !visibleSkills.includes(skillName)) {
              setVisibleSkills((prev) => [...prev, skillName]);
            }
            if (entry.target.id === "skills-section") {
              setAnimateIn(true);
            }
          } else if (entry.target.id === "skills-section" && !entry.isIntersecting) {
            // Reset animation when out of viewport for re-entry animation
            if (entry.boundingClientRect.top > 0) {
              setAnimateIn(false);
            }
          }
        });
      },
      { threshold: [0.1, 0.5] }
    );

    document.querySelectorAll("[data-skill]").forEach((el) => {
      observer.observe(el);
    });
    
    const skillsSection = document.getElementById("skills-section");
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => observer.disconnect();
  }, [visibleSkills]);

  return (
    <section 
      id="skills" 
      className="section-padding relative overflow-hidden"
    >
      <div 
        id="skills-section"
        className={`container mx-auto transition-all duration-1000 ${
          animateIn ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
        }`}
      >
        <div className="flex items-center gap-3 mb-10 animate-on-scroll">
          <Award className="h-8 w-8 text-primary" />
          <h2 className="section-heading">Skills & Expertise</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((category, catIndex) => (
            <div 
              key={category.name} 
              className="animate-on-scroll"
              style={{ 
                transitionDelay: `${catIndex * 200}ms`,
                transform: animateIn ? 'translateX(0)' : catIndex % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)',
                opacity: animateIn ? 1 : 0,
                transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
              }}
            >
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                {category.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30"></span>
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className="space-y-2" 
                    data-skill={skill.name}
                    style={{
                      opacity: visibleSkills.includes(skill.name) ? 1 : 0,
                      transform: visibleSkills.includes(skill.name) ? 'translateY(0)' : 'translateY(20px)',
                      transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                      transitionDelay: `${(index * 100) + (catIndex * 150)}ms`,
                    }}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-foreground/70">
                        {visibleSkills.includes(skill.name) ? `${skill.level}%` : "0%"}
                      </span>
                    </div>
                    <Progress 
                      value={visibleSkills.includes(skill.name) ? skill.level : 0} 
                      className="h-2 transition-all duration-1000 ease-out"
                      style={{ 
                        transitionDelay: `${(catIndex * 400) + (index * 200)}ms`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
