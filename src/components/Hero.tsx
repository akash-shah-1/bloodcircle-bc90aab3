
import { ArrowRight, Heart, UserPlus, DropletPlus, Syringe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blood-100 blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -left-32 w-64 h-64 rounded-full bg-blood-100 blur-3xl opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 text-center md:text-left md:max-w-xl animate-fade-in">
            <div className="inline-block mb-4 px-4 py-1.5 bg-blood-50 text-blood-500 rounded-full font-medium text-sm animate-fade-in-right">
              Join the circle and save lives
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Donate Blood,{" "}
              <span className="text-blood-500">Save a Life</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 md:pr-12">
              Connect with blood donors and recipients through our platform. 
              Whether you want to donate or are in need, BloodCircle brings the community together.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-blood-500 hover:bg-blood-600 rounded-full w-full sm:w-auto">
                <Link to="/register" className="flex items-center gap-2">
                  Register to Donate <ArrowRight size={16} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full w-full sm:w-auto">
                <Link to="/find-donor">Find Donors</Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative animate-fade-in-left">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-blood-100 to-blood-50 rounded-full opacity-50 blur-xl animate-pulse-subtle"></div>
              <div className="relative z-10 w-full h-full glass rounded-full overflow-hidden border-4 border-white p-5 flex items-center justify-center shadow-xl">
                <div className="blood-animation absolute w-48 h-48 bg-blood-500 rounded-full flex items-center justify-center">
                  <Heart className="text-white w-20 h-20" />
                </div>
                
                {/* Floating elements */}
                <div className="absolute top-10 -left-5 glass rounded-xl p-3 shadow-lg animate-float">
                  <UserPlus className="text-blood-500 w-6 h-6" />
                </div>
                <div className="absolute bottom-10 -right-5 glass rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                  <DropletPlus className="text-blood-500 w-6 h-6" />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 glass rounded-xl p-3 shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                  <Syringe className="text-blood-500 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: "10K+", label: "Donors Registered", delay: "0s" },
            { number: "5K+", label: "Lives Saved", delay: "0.2s" },
            { number: "100+", label: "Cities Covered", delay: "0.4s" },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-black/40 rounded-2xl p-6 text-center shadow-sm border border-border/50 animate-fade-in"
              style={{ animationDelay: stat.delay }}
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 text-blood-500">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
