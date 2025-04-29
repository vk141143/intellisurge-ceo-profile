
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
  {
    id: 1,
    title: "Founder & CEO",
    company: "IntelliSurge Technologies",
    duration: "2020 - Present",
    description: "Founded and leading IntelliSurge Technologies, focusing on innovative tech solutions.",
    responsibilities: [
      "Setting strategic direction and vision",
      "Building and managing executive teams",
      "Developing business growth strategies",
      "Overseeing product development and innovation",
      "Managing investor relationships"
    ]
  },
  {
    id: 2,
    title: "Technology Consultant",
    company: "Tech Innovations Inc.",
    duration: "2018 - 2020",
    description: "Provided expert consulting services for digital transformation initiatives.",
    responsibilities: [
      "Digital strategy development",
      "Enterprise architecture design",
      "Technology stack recommendations",
      "Implementation oversight"
    ]
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-10 animate-on-scroll">
          <Briefcase className="h-8 w-8 text-primary" />
          <h2 className="section-heading">Professional Experience</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp, index) => (
            <Card key={exp.id} className="card-hover animate-on-scroll" style={{animationDelay: `${index * 200}ms`}}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{exp.title}</CardTitle>
                    <CardDescription>{exp.company}</CardDescription>
                  </div>
                  <Badge variant="outline">{exp.duration}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{exp.description}</p>
                <div>
                  <p className="font-medium mb-2">Key Responsibilities:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm">{resp}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
