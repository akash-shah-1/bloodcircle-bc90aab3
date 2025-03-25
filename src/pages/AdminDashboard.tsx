
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  UserCircle, 
  Users, 
  Droplet, 
  Heart, 
  Settings, 
  Bell, 
  ShieldAlert,
  FileText,
  Flag
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    
    // Only allow admin access to this page
    if (user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Mock data for demonstration
  const recentDonors = [
    { id: "1", name: "John Smith", bloodType: "A+", location: "New York", date: "2023-04-15" },
    { id: "2", name: "Sarah Johnson", bloodType: "O-", location: "Los Angeles", date: "2023-04-12" },
    { id: "3", name: "Michael Brown", bloodType: "B+", location: "Chicago", date: "2023-04-10" },
  ];

  const recentRecipients = [
    { id: "1", name: "Emily Davis", bloodType: "AB+", location: "Boston", date: "2023-04-14", urgent: true },
    { id: "2", name: "David Wilson", bloodType: "A-", location: "Seattle", date: "2023-04-11", urgent: false },
    { id: "3", name: "Lisa Miller", bloodType: "O+", location: "Miami", date: "2023-04-09", urgent: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Admin Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white dark:bg-black/40 rounded-2xl border border-border/50 overflow-hidden shadow-sm sticky top-24">
                <div className="p-6 pb-8 text-center border-b border-border/50 bg-muted/30">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-yellow-100 mx-auto mb-4 text-yellow-500">
                    <ShieldAlert className="w-14 h-14" />
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground text-sm mb-2">{user.email}</p>
                  
                  <div className="flex justify-center gap-2 flex-wrap">
                    <div className="px-3 py-1 bg-yellow-50 text-yellow-500 rounded-full text-xs font-medium">
                      Administrator
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <nav className="space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 bg-yellow-50 text-yellow-600 rounded-lg">
                      <ShieldAlert className="w-5 h-5" />
                      <span className="font-medium">Admin Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Users className="w-5 h-5" />
                      <span className="font-medium">All Users</span>
                    </a>
                    <a href="/donors" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">All Donors</span>
                    </a>
                    <a href="/recipients" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Droplet className="w-5 h-5" />
                      <span className="font-medium">All Recipients</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Bell className="w-5 h-5" />
                      <span className="font-medium">Requests</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <FileText className="w-5 h-5" />
                      <span className="font-medium">Reports</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Flag className="w-5 h-5" />
                      <span className="font-medium">Issues</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Settings className="w-5 h-5" />
                      <span className="font-medium">Settings</span>
                    </a>
                  </nav>
                  
                  <div className="pt-4 mt-4 border-t border-border/50">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button size="sm" className="mt-4 md:mt-0">
                  Generate Report
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { title: "Total Donors", value: "156", icon: Heart, color: "text-blood-500 bg-blood-50" },
                  { title: "Total Recipients", value: "87", icon: Droplet, color: "text-blue-500 bg-blue-50" },
                  { title: "Active Requests", value: "23", icon: Bell, color: "text-amber-500 bg-amber-50" },
                  { title: "Matches Made", value: "102", icon: Users, color: "text-green-500 bg-green-50" },
                ].map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center justify-between">
                        {stat.title}
                        <div className={`p-2 rounded-full ${stat.color}`}>
                          <stat.icon className="w-4 h-4" />
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {/* Recent Donors */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Recent Donors</CardTitle>
                      <CardDescription>Latest donor registrations</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/donors">View All</a>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Blood Type</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentDonors.map((donor) => (
                          <TableRow key={donor.id}>
                            <TableCell className="font-medium">{donor.name}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blood-50 text-blood-500">
                                {donor.bloodType}
                              </span>
                            </TableCell>
                            <TableCell>{donor.location}</TableCell>
                            <TableCell>{donor.date}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Recent Recipients */}
                <Card className="mt-6">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Recent Recipients</CardTitle>
                      <CardDescription>Latest blood requests</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/recipients">View All</a>
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Blood Type</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentRecipients.map((recipient) => (
                          <TableRow key={recipient.id}>
                            <TableCell className="font-medium">{recipient.name}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-500">
                                {recipient.bloodType}
                              </span>
                            </TableCell>
                            <TableCell>{recipient.location}</TableCell>
                            <TableCell>{recipient.date}</TableCell>
                            <TableCell>
                              {recipient.urgent ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-500">
                                  Urgent
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-500">
                                  Active
                                </span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
