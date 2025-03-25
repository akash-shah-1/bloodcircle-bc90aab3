
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertCircle, Calendar, Clock, Droplet, MapPin, User } from "lucide-react";
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

// Mock blood requests data
const mockRequests = [
  {
    id: "1",
    date: "2023-11-20",
    location: "Central Hospital",
    bloodType: "O+",
    status: "Fulfilled",
    urgency: "Medium",
    donor: "John D.",
  },
  {
    id: "2",
    date: "2023-12-01",
    location: "City Medical Center",
    bloodType: "AB-",
    status: "Pending",
    urgency: "High",
    donor: null,
  },
  {
    id: "3",
    date: "2023-10-15",
    location: "Red Cross Center",
    bloodType: "A+",
    status: "Fulfilled",
    urgency: "Low",
    donor: "Emily S.",
  },
  {
    id: "4",
    date: "2024-01-05",
    location: "Memorial Hospital",
    bloodType: "B+",
    status: "Pending",
    urgency: "Critical",
    donor: null,
  },
];

const Requests = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "fulfilled">("active");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const activeRequests = mockRequests.filter(r => r.status === "Pending");
  const fulfilledRequests = mockRequests.filter(r => r.status === "Fulfilled");

  const getUrgencyStyle = (urgency: string) => {
    switch (urgency) {
      case "Low":
        return "bg-blue-100 text-blue-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Critical":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold">Blood Requests</h1>
              <p className="text-muted-foreground mt-2">
                {user.role === "recipient" ? "Manage your blood requests" : "Respond to people in need"}
              </p>
            </div>
            
            {user.role === "recipient" && (
              <Button className="mt-4 md:mt-0 bg-blood-500 hover:bg-blood-600">
                Create New Request
              </Button>
            )}
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  Active Requests
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{activeRequests.length}</p>
                <p className="text-sm text-muted-foreground">Waiting for donors</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  Fulfilled Requests
                  <Droplet className="w-5 h-5 text-green-500" fill="currentColor" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{fulfilledRequests.length}</p>
                <p className="text-sm text-muted-foreground">Successfully matched</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  Most Needed
                  <Droplet className="w-5 h-5 text-blood-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">O-</p>
                <p className="text-sm text-muted-foreground">Universal donor type</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b border-border mb-6">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "active"
                  ? "border-b-2 border-blood-500 text-blood-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active Requests
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === "fulfilled"
                  ? "border-b-2 border-blood-500 text-blood-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("fulfilled")}
            >
              Fulfilled Requests
            </button>
          </div>
          
          {/* Requests Table */}
          <Card>
            <Table>
              <TableCaption>
                {activeTab === "active" 
                  ? "A list of active blood requests waiting for donors" 
                  : "Previously fulfilled blood requests"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Blood Type</TableHead>
                  {activeTab === "active" && <TableHead>Urgency</TableHead>}
                  {activeTab === "fulfilled" && <TableHead>Donor</TableHead>}
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(activeTab === "active" ? activeRequests : fulfilledRequests).map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {new Date(request.date).toLocaleDateString("en-US", { 
                        month: "short", 
                        day: "numeric", 
                        year: "numeric" 
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                        {request.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Droplet className="w-3.5 h-3.5 text-blood-500" />
                        {request.bloodType}
                      </div>
                    </TableCell>
                    {activeTab === "active" && (
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getUrgencyStyle(request.urgency)
                        }`}>
                          {request.urgency}
                        </span>
                      </TableCell>
                    )}
                    {activeTab === "fulfilled" && (
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                          {request.donor}
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === "Fulfilled" 
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {activeTab === "active" ? (
                        user.role === "recipient" ? (
                          <Button variant="outline" size="sm">Edit Request</Button>
                        ) : (
                          <Button size="sm" className="bg-blood-500 hover:bg-blood-600">Respond</Button>
                        )
                      ) : (
                        <Button variant="outline" size="sm">View Details</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                
                {(activeTab === "active" ? activeRequests : fulfilledRequests).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <p className="text-muted-foreground">
                        {activeTab === "active" 
                          ? "No active requests found" 
                          : "No fulfilled requests yet"}
                      </p>
                      {activeTab === "active" && user.role === "recipient" && (
                        <Button className="mt-2 bg-blood-500 hover:bg-blood-600">
                          Create Request
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

export default Requests;
