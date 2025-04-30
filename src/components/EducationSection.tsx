
import { useState, useEffect, useRef } from "react";
import { School } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Education = {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  grade: string;
  description: string;
  activities?: string;
  skills?: string[];
};

const educationData: Education[] = [
  {
    id: 1,
    institution: "Singhania University, New Delhi",
    degree: "Master of Business Administration in Aviation and Operations Management",
    duration: "Mar 2018 - Dec 2019",
    grade: "A",
    description: "Operations management was mainly focused on planning, organizing, and supervising in the production, manufacturing, and also in providing services, etc. It was also helpful to learn the skills to manage operations, expenses, and resource management of any aviation firm or a private organization and also additional specialization in international business, marketing, and finance. It created room for understanding a global perspective on industry trends to meet client demands. In one sentence, it was a fantastic course-focused discipline that calls for both organizational and analytical abilities.",
    activities: "Sports and Students Entrepreneurship Development Club",
    skills: ["Ethics and appropriate business expertise to solve business problems", "Knowledge of general business acumen", "Business Strategy", "Business Development", "Organizational Leadership", "Operations Management"],
  },
  {
    id: 2,
    institution: "IATA Training",
    degree: "Global Distribution Systems (GDS) Fares & Ticketing, Aviation/Airway Management and Operations",
    duration: "Jun 2018 - Dec 2018",
    grade: "",
    description: "This course provided in-depth training on the key principles and practices of fare construction, ticketing, and the use of Global Distribution Systems (GDS) within the travel and aviation industries. It covered essential topics such as understanding airfare components, applying ticketing rules, and navigating GDS platforms to manage reservations, issue tickets, and provide travel solutions. The program is designed for professionals looking to enhance their expertise in airline ticketing and improve operational efficiency in the competitive travel sector.",
    activities: "IATA Global Distribution Systems (GDS) Fares & Ticketing – Participated in comprehensive training focused on airline reservation systems, fare construction, and ticketing processes. Collaborated in study groups to deepen understanding of complex fare structures and applied knowledge to real-world scenarios using GDS platforms. Gained proficiency in global distribution systems, improving operational efficiency in the travel and aviation industries.",
    skills: ["Global Distribution Systems (GDS)", "Fare Construction", "Airline Ticketing", "Travel Industry Knowledge", "Reservation Systems", "Pricing and Ticketing Rules", "Aviation Operations", "Airline Industry Standards"],
  },
  {
    id: 3,
    institution: "Wesley Degree College, Hyderabad",
    degree: "Bachelor of Commerce & Computer Science",
    duration: "Mar 2013 - May 2017",
    grade: "B",
    description: "This baccalaureate degree was like a tool that sharpened my scope of future with a theoretical and practical study of subjects like business organization and management, understanding of e-commerce, cost/financial accounting, fundamentals of computers/internet, and web design, also the concept of business and it's law.",
    activities: "Part of a government program called \"NSS\" and the college \"Chapel Group.\"",
    skills: ["Financial Accounting", "International Business Law", "Banking"],
  },
  {
    id: 4,
    institution: "Telangana State Board of Intermediate Education-(TS BIE)",
    degree: "Intermediate studies (Higher Secondary Certificate), Economics, Civics and Commerce",
    duration: "Mar 2011 - May 2013",
    grade: "D",
    description: "",
    activities: "",
    skills: [],
  },
  {
    id: 5,
    institution: "The Board of Secondary Education, Telangana (BSET)",
    degree: "Secondary Education (Secondary School Certificate), Higher Mathematics, General Science, Social and languages Telugu, Hindi & English",
    duration: "May 2001 - 2011",
    grade: "C",
    description: "",
    activities: "",
    skills: ["Operating Systems", "Programming Languages"],
  },
];

export default function EducationSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    // Set up intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            if (id && !visibleItems.includes(id)) {
              setVisibleItems((prev) => [...prev, id]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all timeline items
    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleItems]);

  return (
    <section id="education" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-12 animate-on-scroll">
          <School className="h-8 w-8 text-primary" />
          <h2 className="section-heading">Education</h2>
        </div>
        
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2 z-0"></div>
          
          {educationData.map((edu, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={edu.id}
                ref={(el) => (timelineRefs.current[index] = el)}
                data-id={edu.id}
                className={`relative mb-16 last:mb-0 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 top-6 w-6 h-6 bg-primary rounded-full shadow-lg transform -translate-x-1/2 z-10 border-4 border-background"></div>
                
                {/* Content - alternating sides */}
                <div className={`md:col-span-1 ${isEven ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <Card 
                    className={`card-hover glass-card backdrop-blur-sm bg-card/60 border-primary/10 shadow-lg overflow-hidden transition-all duration-500 transform ${
                      visibleItems.includes(edu.id) 
                        ? 'opacity-100 ' + (isEven ? 'translate-x-0' : 'translate-x-0') 
                        : 'opacity-0 ' + (isEven ? '-translate-x-full' : 'translate-x-full')
                    }`}
                  >
                    <CardHeader className="pb-2 relative z-10">
                      <div className="flex flex-wrap justify-between gap-2 items-start">
                        <div>
                          <h3 className="font-bold text-xl">{edu.institution}</h3>
                          <p className="text-accent-foreground font-medium">{edu.degree}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm text-muted-foreground">{edu.duration}</span>
                          {edu.grade && (
                            <Badge variant="secondary" className="ml-auto">{`Grade: ${edu.grade}`}</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 pt-3 relative z-10">
                      {edu.description && (
                        <p className="text-sm text-foreground/80">{edu.description}</p>
                      )}
                      
                      {edu.activities && (
                        <div>
                          <p className="text-sm font-semibold">Activities:</p>
                          <p className="text-sm text-foreground/80">{edu.activities}</p>
                        </div>
                      )}
                      
                      {edu.skills && edu.skills.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold mb-2">Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {edu.skills.map((skill, idx) => (
                              <Badge 
                                key={idx} 
                                variant="outline" 
                                className="animate-scale-up hover:bg-primary/10 hover:scale-105 transition-all"
                                style={{ animationDelay: `${idx * 100}ms` }}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Semi-transparent decorative element */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 z-0"></div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Empty column for alternating layout */}
                <div className={`hidden md:block md:col-span-1 ${!isEven ? 'md:col-start-1' : 'md:col-start-2'}`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
