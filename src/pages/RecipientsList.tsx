
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
import { MapPin, Droplet, Mail, Phone, UserCircle, Search, Clock, AlertCircle } from "lucide-react";

const RecipientsList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const recipients = [
    { id: "1", name: "Emma Thompson", bloodType: "A+", location: "New York", requestDate: "2023-04-15", urgent: true, email: "emma@example.com", phone: "+1 (555) 123-4567", status: "pending" },
    { id: "2", name: "Robert Garcia", bloodType: "O-", location: "Los Angeles", requestDate: "2023-03-22", urgent: true, email: "robert@example.com", phone: "+1 (555) 234-5678", status: "matched" },
    { id: "3", name: "Sophia Martinez", bloodType: "B+", location: "Chicago", requestDate: "2023-04-05", urgent: false, email: "sophia@example.com", phone: "+1 (555) 345-6789", status: "pending" },
    { id: "4", name: "William Johnson", bloodType: "AB+", location: "Boston", requestDate: "2023-02-18", urgent: false, email: "william@example.com", phone: "+1 (555) 456-7890", status: "fulfilled" },
    { id: "5", name: "Olivia Lee", bloodType: "A-", location: "Seattle", requestDate: "2023-01-30", urgent: true, email: "olivia@example.com", phone: "+1 (555) 567-8901", status: "pending" },
    { id: "6", name: "Noah Wilson", bloodType: "O+", location: "Miami", requestDate: "2023-03-10", urgent: false, email: "noah@example.com", phone: "+1 (555) 678-9012", status: "matched" },
    { id: "7", name: "Isabella Brown", bloodType: "B-", location: "Dallas", requestDate: "2023-02-05", urgent: false, email: "isabella@example.com", phone: "+1 (555) 789-0123", status: "pending" },
    { id: "8", name: "James Davis", bloodType: "AB-", location: "Phoenix", requestDate: "2023-03-28", urgent: true, email: "james@example.com", phone: "+1 (555) 890-1234", status: "fulfilled" },
  ];

  // Filter recipients based on search query
  const filteredRecipients = recipients.filter(recipient => 
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.bloodType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">All Blood Recipients</h1>
              <p className="text-muted-foreground mt-1">View and manage all blood requests</p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search recipients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Add Request
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-black/40 border border-border/50 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>A list of all blood recipients and their requests.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <UserCircle className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{recipient.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Droplet className="w-3.5 h-3.5 text-blue-500" fill="currentColor" />
                          <span className="font-medium">{recipient.bloodType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{recipient.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>{recipient.requestDate}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {recipient.urgent ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-500">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Urgent
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-500">
                            Normal
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {recipient.status === "pending" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-500">
                            Pending
                          </span>
                        )}
                        {recipient.status === "matched" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-500">
                            Matched
                          </span>
                        )}
                        {recipient.status === "fulfilled" && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-500">
                            Fulfilled
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={`mailto:${recipient.email}`}>
                              <Mail className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={`tel:${recipient.phone}`}>
                              <Phone className="h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View Details
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

export default RecipientsList;
