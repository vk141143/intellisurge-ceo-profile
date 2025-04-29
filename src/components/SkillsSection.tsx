
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.getAttribute("data-skill");
            if (skillName && !visibleSkills.includes(skillName)) {
              setVisibleSkills((prev) => [...prev, skillName]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-skill]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleSkills]);

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-10 animate-on-scroll">
          <Award className="h-8 w-8 text-primary" />
          <h2 className="section-heading">Skills & Expertise</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((category, catIndex) => (
            <div 
              key={category.name} 
              className="animate-on-scroll"
              style={{ transitionDelay: `${catIndex * 200}ms` }}
            >
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                {category.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30"></span>
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2" data-skill={skill.name}>
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
