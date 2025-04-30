
import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you shortly.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
      setFormSubmitted(true);
      
      // Reset animation state after delay
      setTimeout(() => setFormSubmitted(false), 2000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 bg-muted/30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-10 animate-on-scroll">
          <Mail className="h-8 w-8 text-primary" />
          <h2 className="section-heading">Get In Touch</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div 
            className="space-y-6 animate-on-scroll bg-card/40 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/10"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient-primary">Let's Connect</h3>
              <p className="text-foreground/80">
                Have a question, want to collaborate, or interested in learning more about 
                IntelliSurge Technologies? Feel free to reach out through any of these channels:
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <Card 
                className="card-hover overflow-hidden bg-background/50 backdrop-blur-sm border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <CardContent className="p-4 flex items-center gap-4 relative">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-foreground/70">contact@intellisurge.tech</p>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full"></div>
                </CardContent>
              </Card>

              <Card 
                className="card-hover overflow-hidden bg-background/50 backdrop-blur-sm border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <CardContent className="p-4 flex items-center gap-4 relative">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-foreground/70">+91 (123) 456-7890</p>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-secondary/5 rounded-full"></div>
                </CardContent>
              </Card>

              <Card 
                className="card-hover overflow-hidden bg-background/50 backdrop-blur-sm border border-primary/10 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <CardContent className="p-4 flex items-center gap-4 relative">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-sm text-foreground/70">
                      IntelliSurge HQ, Tech Park, Hyderabad, India
                    </p>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-accent/5 rounded-full"></div>
                </CardContent>
              </Card>
            </div>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className={`space-y-4 animate-on-scroll bg-card/40 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-white/10 relative 
              ${formSubmitted ? 'form-submitted' : ''}`}
          >
            <div className="absolute -z-10 inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-70"></div>
            
            <h3 className="text-2xl font-bold mb-4 text-gradient-primary">Send a Message</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="form-field">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter message subject"
                className="w-full bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Write your message here..."
                className="w-full min-h-[150px] bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full relative overflow-hidden group" 
              disabled={isSubmitting}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    Sending... <span className="ml-2 animate-pulse">⋯</span>
                  </>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-primary/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
            </Button>
            
            {/* Animated success overlay */}
            <div className={`absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm rounded-2xl transition-all duration-500 ${formSubmitted ? 'opacity-100 z-20' : 'opacity-0 -z-10'}`}>
              <div className="text-center transform scale-up-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                <p>Your message has been sent successfully.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
