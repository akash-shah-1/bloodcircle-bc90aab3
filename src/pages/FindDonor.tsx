
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Droplet, Phone, Mail, UserCircle, Filter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FindDonor = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [bloodType, setBloodType] = useState<string>("");
  const [distance, setDistance] = useState<string>("");

  // Mock data for demonstration
  const donors = [
    { id: "1", name: "John Smith", bloodType: "A+", location: "New York", distance: "2 miles", lastDonation: "3 weeks ago" },
    { id: "2", name: "Sarah Johnson", bloodType: "O-", location: "Los Angeles", distance: "5 miles", lastDonation: "2 months ago" },
    { id: "3", name: "Michael Brown", bloodType: "B+", location: "Chicago", distance: "1 mile", lastDonation: "1 week ago" },
    { id: "4", name: "Emily Davis", bloodType: "AB+", location: "Boston", distance: "3 miles", lastDonation: "5 weeks ago" },
    { id: "5", name: "David Wilson", bloodType: "A-", location: "Seattle", distance: "4 miles", lastDonation: "2 weeks ago" },
    { id: "6", name: "Lisa Miller", bloodType: "O+", location: "Miami", distance: "2 miles", lastDonation: "6 weeks ago" },
    { id: "7", name: "James Taylor", bloodType: "B-", location: "Dallas", distance: "6 miles", lastDonation: "3 months ago" },
    { id: "8", name: "Jennifer Anderson", bloodType: "AB-", location: "Phoenix", distance: "3 miles", lastDonation: "1 month ago" },
  ];

  // Filter donors based on search criteria
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = 
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      donor.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesBloodType = bloodType ? donor.bloodType === bloodType : true;
    
    const matchesDistance = distance ? 
      parseInt(donor.distance) <= parseInt(distance) : true;
    
    return matchesSearch && matchesBloodType && matchesDistance;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-6">Find Blood Donors</h1>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <Input
                placeholder="Search by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={bloodType} onValueChange={setBloodType}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Blood Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={distance} onValueChange={setDistance}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Distance</SelectItem>
                  <SelectItem value="5">Within 5 miles</SelectItem>
                  <SelectItem value="10">Within 10 miles</SelectItem>
                  <SelectItem value="25">Within 25 miles</SelectItem>
                  <SelectItem value="50">Within 50 miles</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="flex gap-2 items-center">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => (
                <Card key={donor.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blood-100 text-blood-500">
                          <UserCircle className="w-8 h-8" />
                        </div>
                        <div>
                          <h3 className="font-medium">{donor.name}</h3>
                          <p className="text-sm text-muted-foreground">Last donated {donor.lastDonation}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center justify-center w-5 h-5">
                            <Droplet className="w-4 h-4 text-blood-500" fill="currentColor" />
                          </div>
                          <span className="font-medium">Blood Type:</span>
                          <span>{donor.bloodType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center justify-center w-5 h-5">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <span className="font-medium">Location:</span>
                          <span>{donor.location}</span>
                          <span className="text-xs text-muted-foreground">({donor.distance})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex border-t border-border">
                      <Button variant="ghost" className="flex-1 rounded-none py-4 h-auto" asChild>
                        <a href={`tel:+1234567890`}>
                          <Phone className="w-4 h-4 mr-2" /> Call
                        </a>
                      </Button>
                      <div className="w-px bg-border" />
                      <Button variant="ghost" className="flex-1 rounded-none py-4 h-auto" asChild>
                        <a href={`mailto:donor@example.com`}>
                          <Mail className="w-4 h-4 mr-2" /> Email
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                  <Droplet className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No donors found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FindDonor;
