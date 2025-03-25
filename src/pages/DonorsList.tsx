
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { MapPin, Droplet, Heart, Mail, Phone, UserCircle, Search } from "lucide-react";

const DonorsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const donors = [
    { id: "1", name: "John Smith", bloodType: "A+", location: "New York", lastDonation: "2023-04-15", email: "john@example.com", phone: "+1 (555) 123-4567", status: "active" },
    { id: "2", name: "Sarah Johnson", bloodType: "O-", location: "Los Angeles", lastDonation: "2023-03-22", email: "sarah@example.com", phone: "+1 (555) 234-5678", status: "active" },
    { id: "3", name: "Michael Brown", bloodType: "B+", location: "Chicago", lastDonation: "2023-04-05", email: "michael@example.com", phone: "+1 (555) 345-6789", status: "inactive" },
    { id: "4", name: "Emily Davis", bloodType: "AB+", location: "Boston", lastDonation: "2023-02-18", email: "emily@example.com", phone: "+1 (555) 456-7890", status: "active" },
    { id: "5", name: "David Wilson", bloodType: "A-", location: "Seattle", lastDonation: "2023-01-30", email: "david@example.com", phone: "+1 (555) 567-8901", status: "active" },
    { id: "6", name: "Lisa Miller", bloodType: "O+", location: "Miami", lastDonation: "2023-03-10", email: "lisa@example.com", phone: "+1 (555) 678-9012", status: "inactive" },
    { id: "7", name: "James Taylor", bloodType: "B-", location: "Dallas", lastDonation: "2023-02-05", email: "james@example.com", phone: "+1 (555) 789-0123", status: "active" },
    { id: "8", name: "Jennifer Anderson", bloodType: "AB-", location: "Phoenix", lastDonation: "2023-03-28", email: "jennifer@example.com", phone: "+1 (555) 890-1234", status: "active" },
  ];

  // Filter donors based on search query
  const filteredDonors = donors.filter(donor => 
    donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">All Blood Donors</h1>
              <p className="text-muted-foreground mt-1">View and manage all registered donors</p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search donors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-blood-500 hover:bg-blood-600">
                Add Donor
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-black/40 border border-border/50 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>A list of all registered blood donors.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Last Donation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDonors.map((donor) => (
                    <TableRow key={donor.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <UserCircle className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{donor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Droplet className="w-3.5 h-3.5 text-blood-500" fill="currentColor" />
                          <span className="font-medium">{donor.bloodType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{donor.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{donor.lastDonation}</TableCell>
                      <TableCell>
                        {donor.status === "active" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-500">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                            Inactive
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={`mailto:${donor.email}`}>
                              <Mail className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={`tel:${donor.phone}`}>
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonorsList;
