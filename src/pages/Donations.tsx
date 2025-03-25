
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Droplet, MapPin, Clock, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock donation data
const mockDonations = [
  {
    id: "1",
    date: "2023-10-15",
    location: "City Blood Bank",
    amount: "500ml",
    status: "Completed",
    recipient: "Sarah M.",
  },
  {
    id: "2",
    date: "2023-08-22",
    location: "Central Hospital",
    amount: "450ml",
    status: "Completed",
    recipient: "John D.",
  },
  {
    id: "3",
    date: "2023-06-10",
    location: "Red Cross Center",
    amount: "500ml",
    status: "Completed",
    recipient: "Anonymous",
  },
  {
    id: "4",
    date: "2023-12-05",
    location: "Medical Center",
    amount: "500ml",
    status: "Scheduled",
    recipient: "Pending",
  },
];

const Donations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"past" | "upcoming">("past");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const pastDonations = mockDonations.filter(d => d.status === "Completed");
  const upcomingDonations = mockDonations.filter(d => d.status === "Scheduled");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold">My Donations</h1>
              <p className="text-muted-foreground mt-2">Track and manage your blood donations</p>
            </div>
            
            <Button className="mt-4 md:mt-0 bg-blood-500 hover:bg-blood-600">
              Schedule New Donation
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  Total Donations
                  <Droplet className="w-5 h-5 text-blood-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{pastDonations.length}</p>
                <p className="text-sm text-muted-foreground">Lifetime contributions</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  Last Donation
                  <Clock className="w-5 h-5 text-amber-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {pastDonations.length > 0 
                    ? new Date(pastDonations[0].date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric", 
                        year: "numeric" 
                      }) 
                    : "N/A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {pastDonations.length > 0 
                    ? `at ${pastDonations[0].location}` 
                    : "No donations yet"}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  Next Donation
                  <Calendar className="w-5 h-5 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {upcomingDonations.length > 0 
                    ? new Date(upcomingDonations[0].date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric", 
                        year: "numeric" 
                      }) 
                    : "Not Scheduled"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {upcomingDonations.length > 0 
                    ? `at ${upcomingDonations[0].location}` 
                    : "Schedule your next donation"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-border mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "past"
                  ? "border-b-2 border-blood-500 text-blood-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past Donations
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-b-2 border-blood-500 text-blood-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Donations
            </button>
          </div>
          
          {/* Donations Table */}
          <Card>
            <Table>
              <TableCaption>
                {activeTab === "past" 
                  ? "A list of your past blood donations" 
                  : "Your upcoming scheduled donations"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(activeTab === "past" ? pastDonations : upcomingDonations).map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">
                      {new Date(donation.date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric", 
                        year: "numeric" 
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        {donation.location}
                      </div>
                    </TableCell>
                    <TableCell>{donation.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        {donation.recipient}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        donation.status === "Completed" 
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {donation.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {activeTab === "past" ? (
                        <Button variant="outline" size="sm">View Details</Button>
                      ) : (
                        <Button variant="outline" size="sm">Reschedule</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                
                {(activeTab === "past" ? pastDonations : upcomingDonations).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <p className="text-muted-foreground">
                        {activeTab === "past" 
                          ? "No past donations found" 
                          : "No upcoming donations scheduled"}
                      </p>
                      {activeTab === "upcoming" && (
                        <Button className="mt-2 bg-blood-500 hover:bg-blood-600">
                          Schedule Donation
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donations;
