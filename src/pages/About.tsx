
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HeartPulse, Users, Award, Clock, Droplet } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BloodCircle</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're on a mission to connect blood donors with recipients and save lives through a modern, 
              efficient platform that makes blood donation accessible to everyone.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="bg-blood-50 dark:bg-blood-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <HeartPulse className="text-blood-500" /> Our Mission
                </h3>
                <p>
                  To create a seamless connection between blood donors and recipients, 
                  making blood donation more accessible, efficient, and impactful in saving lives.
                </p>
              </div>
              
              <div className="bg-blood-50 dark:bg-blood-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Users className="text-blood-500" /> Our Community
                </h3>
                <p>
                  BloodCircle brings together donors, recipients, medical professionals, and blood banks
                  to create a supportive ecosystem for blood donation nationwide.
                </p>
              </div>
              
              <div className="bg-blood-50 dark:bg-blood-950 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Award className="text-blood-500" /> Our Vision
                </h3>
                <p>
                  To eliminate blood shortage emergencies and ensure that every patient in need
                  has immediate access to compatible blood donations.
                </p>
              </div>
            </div>
            
            <div className="aspect-square relative rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blood-500/80 to-blood-700/80 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <Droplet className="w-20 h-20 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Every Drop Counts</h2>
                  <p className="text-lg">
                    A single donation can save up to three lives.
                    Join our community and be a lifesaver.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our Story</h2>
          
          <div className="bg-muted/30 p-8 rounded-xl">
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg">
                BloodCircle was founded in 2023 with a simple yet powerful idea: to revolutionize the blood donation process by using technology to connect donors directly with recipients in need.
              </p>
              
              <p className="text-lg">
                After witnessing firsthand the challenges faced by patients requiring blood transfusions, our founding team of healthcare professionals and tech innovators came together to create a platform that would address the critical gaps in the blood donation ecosystem.
              </p>
              
              <p className="text-lg">
                Today, BloodCircle serves thousands of users across the country, facilitating life-saving donations and building a community of regular donors committed to making a difference.
              </p>
              
              <div className="pt-6 border-t border-muted-foreground/20">
                <h3 className="text-xl font-semibold mb-4">Our Impact So Far</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white dark:bg-black/40 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-blood-500">5,000+</p>
                    <p className="text-sm text-muted-foreground">Donors Registered</p>
                  </div>
                  <div className="bg-white dark:bg-black/40 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-blood-500">3,200+</p>
                    <p className="text-sm text-muted-foreground">Donations Made</p>
                  </div>
                  <div className="bg-white dark:bg-black/40 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-blood-500">9,600+</p>
                    <p className="text-sm text-muted-foreground">Lives Impacted</p>
                  </div>
                  <div className="bg-white dark:bg-black/40 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-blood-500">250+</p>
                    <p className="text-sm text-muted-foreground">Cities Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Founder & Medical Director",
                bio: "Hematologist with 15 years of experience in blood transfusion medicine."
              },
              {
                name: "Michael Chen",
                role: "Co-founder & Tech Lead",
                bio: "Former Google engineer passionate about using technology for healthcare solutions."
              },
              {
                name: "Priya Sharma",
                role: "Operations Director",
                bio: "Healthcare administrator with expertise in scaling medical nonprofits."
              },
              {
                name: "Robert Williams",
                role: "Community Outreach",
                bio: "Former Red Cross volunteer dedicated to building donor communities."
              },
              {
                name: "Aisha Mbeki",
                role: "Medical Systems Specialist",
                bio: "Expert in blood bank operations and donor screening protocols."
              },
              {
                name: "David Ortiz",
                role: "Data & Analytics Lead",
                bio: "Specializes in healthcare data modeling and predictive analytics."
              }
            ].map((member, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-black/40 p-6 rounded-xl shadow-sm border border-muted"
              >
                <div className="w-16 h-16 bg-blood-100 rounded-full mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-blood-500" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blood-500 font-medium mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Join Us CTA */}
        <section className="bg-blood-500 text-white p-10 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Whether you're a donor, recipient, medical professional, or volunteer, 
            there's a place for you in the BloodCircle community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/register">Become a Donor</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-blood-500 hover:bg-white/90">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
