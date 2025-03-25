
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We've received your message and will respond shortly.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              Have questions about blood donation, need assistance, or want to join our team? 
              We're here to help - reach out to us through any of the channels below.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message here..."
                          rows={5}
                          required
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-blood-500 hover:bg-blood-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-muted/30 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blood-50 dark:bg-blood-950 p-2 rounded-full">
                      <Mail className="h-6 w-6 text-blood-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <p className="text-muted-foreground">info@bloodcircle.com</p>
                      <p className="text-muted-foreground">support@bloodcircle.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blood-50 dark:bg-blood-950 p-2 rounded-full">
                      <Phone className="h-6 w-6 text-blood-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Phone</h3>
                      <p className="text-muted-foreground">+1 (800) 555-0123</p>
                      <p className="text-muted-foreground">+1 (800) 555-0124</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blood-50 dark:bg-blood-950 p-2 rounded-full">
                      <MapPin className="h-6 w-6 text-blood-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Office Location</h3>
                      <p className="text-muted-foreground">
                        123 Health Avenue, Suite 301<br />
                        San Francisco, CA 94103<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-blood-50 dark:bg-blood-950 p-2 rounded-full">
                      <Clock className="h-6 w-6 text-blood-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Hours of Operation</h3>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blood-50 dark:bg-blood-950 p-6 rounded-xl">
                <h2 className="text-2xl font-bold mb-4">Emergencies</h2>
                <p className="mb-4">
                  For urgent blood donation needs or emergencies, please call our 24/7 hotline:
                </p>
                <div className="text-blood-500 text-xl font-bold">
                  +1 (800) 555-0199
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  This line is prioritized for hospitals, blood banks, and medical professionals.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I register as a blood donor?",
                answer: "You can register as a donor by clicking the 'Register' button at the top of our website. Fill out the required information including your blood type and location to complete your profile."
              },
              {
                question: "Is there a fee to use BloodCircle?",
                answer: "No, BloodCircle is completely free for both donors and recipients. Our mission is to make blood donation accessible to everyone."
              },
              {
                question: "How does the donor matching work?",
                answer: "Our platform matches donors and recipients based on blood type compatibility, location proximity, and availability to ensure the most efficient donation process."
              },
              {
                question: "Can I update my availability as a donor?",
                answer: "Yes, donors can update their availability status at any time through their dashboard to indicate when they're available for donations."
              },
              {
                question: "How do I contact a matched donor?",
                answer: "Once matched, you can communicate with donors through our secure in-app messaging system. Personal contact information is only shared with mutual consent."
              },
              {
                question: "Is my personal information secure?",
                answer: "Yes, we take data security very seriously. All personal information is encrypted and stored securely in compliance with privacy regulations."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-muted rounded-lg p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
