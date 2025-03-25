
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BloodTypeCard from "@/components/BloodTypeCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Award, Clock, MapPin, Syringe, Users, BookOpen, HeartHandshake } from "lucide-react";

const bloodTypes = [
  { type: "A+", description: "Can receive from A+, A-, O+, O-", isNegative: false },
  { type: "A-", description: "Can receive from A-, O-", isNegative: true },
  { type: "B+", description: "Can receive from B+, B-, O+, O-", isNegative: false },
  { type: "B-", description: "Can receive from B-, O-", isNegative: true },
  { type: "AB+", description: "Can receive from all blood types", isNegative: false },
  { type: "AB-", description: "Can receive from AB-, A-, B-, O-", isNegative: true },
  { type: "O+", description: "Can receive from O+, O-", isNegative: false },
  { type: "O-", description: "Can receive from O- only", isNegative: true },
];

const features = [
  {
    icon: CheckCircle,
    title: "Easy Registration",
    description: "Complete your profile in minutes and join our donor community.",
  },
  {
    icon: MapPin,
    title: "Location-Based",
    description: "Find donors or recipients in your local area for quick response.",
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Receive notifications about urgent blood needs in your area.",
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Earn badges and recognition for your life-saving donations.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How BloodCircle Works</h2>
              <p className="text-muted-foreground">Our platform connects blood donors with recipients seamlessly, making the donation process simple and efficient.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-black/40 rounded-2xl p-6 text-center shadow-sm border border-border/50 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-blood-50 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="text-blood-500 w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blood Types Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Blood Type Compatibility</h2>
              <p className="text-muted-foreground">Understanding blood types is crucial for successful transfusions. Find out which blood types are compatible with yours.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bloodTypes.map((bloodType, index) => (
                <BloodTypeCard
                  key={index}
                  type={bloodType.type}
                  description={bloodType.description}
                  isNegative={bloodType.isNegative}
                />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild className="bg-blood-500 hover:bg-blood-600">
                <Link to="/register">Join as a Donor</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Process Section */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Donation Process</h2>
              <p className="text-muted-foreground">Donating blood is a simple process that takes only about an hour of your time but can save up to three lives.</p>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blood-100 hidden md:block"></div>
              
              <div className="space-y-12 md:space-y-0 relative">
                {[
                  {
                    icon: Users,
                    title: "Register",
                    description: "Create your account on BloodCircle with your details and blood type."
                  },
                  {
                    icon: BookOpen,
                    title: "Pre-Donation Screening",
                    description: "Complete a quick health questionnaire before donating."
                  },
                  {
                    icon: Syringe,
                    title: "Donation",
                    description: "The actual donation process typically takes about 10-15 minutes."
                  },
                  {
                    icon: HeartHandshake,
                    title: "Save Lives",
                    description: "Your donation can help save up to three lives in your community."
                  }
                ].map((step, index) => (
                  <div key={index} className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} items-center animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className={`w-full md:w-1/2 p-6 md:p-12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    
                    <div className="relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 my-4 md:my-0" style={{ top: `${index * 25 + 8}%` }}>
                      <div className="w-12 h-12 rounded-full bg-blood-500 flex items-center justify-center text-white shadow-lg">
                        <step.icon className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 p-6 md:p-12"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 bg-blood-500 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
              Join our community of blood donors and help save lives. Every donation makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/register">Register as Donor</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-blood-500 hover:bg-white/90">
                <Link to="/find-donor">Find a Donor</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
