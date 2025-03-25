
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle, MapPin, Droplet, Heart, Settings, Bell, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white dark:bg-black/40 rounded-2xl border border-border/50 overflow-hidden shadow-sm sticky top-24">
                <div className="p-6 pb-8 text-center border-b border-border/50 bg-muted/30">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blood-100 mx-auto mb-4 text-blood-500">
                    <UserCircle className="w-14 h-14" />
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground text-sm mb-2">{user.email}</p>
                  
                  <div className="flex justify-center gap-2 flex-wrap">
                    <div className="px-3 py-1 bg-blood-50 text-blood-500 rounded-full text-xs font-medium">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                    
                    {user.bloodType && (
                      <div className="px-3 py-1 bg-blood-50 text-blood-500 rounded-full text-xs font-medium flex items-center gap-1">
                        <Droplet className="w-3 h-3" fill="currentColor" />
                        {user.bloodType}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="p-4">
                  <nav className="space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2 bg-blood-50 text-blood-500 rounded-lg">
                      <Heart className="w-5 h-5" />
                      <span className="font-medium">Dashboard</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Donations</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <Bell className="w-5 h-5" />
                      <span className="font-medium">Requests</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2 text-foreground hover:bg-muted rounded-lg transition-colors">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">Locations</span>
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
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { title: "Total Donations", value: user.role === "donor" ? "5" : "Received: 3", icon: Heart, color: "text-blood-500" },
                  { title: "Last Donation", value: user.role === "donor" ? "2 weeks ago" : "1 month ago", icon: Clock, color: "text-amber-500" },
                  { title: "Upcoming Donations", value: user.role === "donor" ? "In 3 days" : "Request open", icon: Calendar, color: "text-blue-500" },
                ].map((stat, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        {stat.title}
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest blood donation activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-blood-100 flex items-center justify-center text-blood-500 flex-shrink-0">
                            {index === 0 ? (
                              <Heart className="w-5 h-5" />
                            ) : index === 1 ? (
                              <Bell className="w-5 h-5" />
                            ) : (
                              <Clock className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {user.role === "donor"
                                ? index === 0
                                  ? "Donation Completed"
                                  : index === 1
                                  ? "Request Accepted"
                                  : "Donation Scheduled"
                                : index === 0
                                ? "Blood Received"
                                : index === 1
                                ? "Request Posted"
                                : "Match Found"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {index === 0
                                ? "2 weeks ago"
                                : index === 1
                                ? "1 month ago"
                                : "2 days ago"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Activity</Button>
                  </CardFooter>
                </Card>
                
                {/* Nearby Donors/Recipients */}
                <Card className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <CardHeader>
                    <CardTitle>
                      {user.role === "donor" ? "Nearby Recipients" : "Nearby Donors"}
                    </CardTitle>
                    <CardDescription>
                      {user.role === "donor"
                        ? "People who need your blood type"
                        : "Potential donors for your blood type"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground flex-shrink-0">
                              <UserCircle className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium">
                                {user.role === "donor"
                                  ? `Recipient ${index + 1}`
                                  : `Donor ${index + 1}`}
                              </p>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{index === 0 ? "2 miles away" : index === 1 ? "5 miles away" : "8 miles away"}</span>
                                
                                <span className="mx-1">•</span>
                                
                                <Droplet className="w-3 h-3" fill={index === 0 ? "#FF4B59" : "#4A7AFF"} />
                                <span>
                                  {index === 0
                                    ? user.bloodType || "A+"
                                    : index === 1
                                    ? "O-"
                                    : "B+"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm">Contact</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All {user.role === "donor" ? "Recipients" : "Donors"}
                    </Button>
                  </CardFooter>
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

export default Dashboard;
