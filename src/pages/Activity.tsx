
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bell, Calendar, Clock, Droplet, Filter, Heart, MapPin, Search, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Mock activity data
const MOCK_ACTIVITIES = [
  {
    id: "1",
    type: "donation",
    date: "2023-12-15T14:30:00Z",
    location: "City Blood Bank",
    bloodType: "A+",
    description: "You donated 500ml of blood",
    icon: Heart,
    iconColor: "text-blood-500",
  },
  {
    id: "2",
    type: "request",
    date: "2023-11-25T09:15:00Z",
    location: "Central Hospital",
    bloodType: "O-",
    description: "You responded to a blood request",
    icon: Bell,
    iconColor: "text-amber-500",
  },
  {
    id: "3",
    type: "schedule",
    date: "2023-11-10T11:45:00Z",
    location: "Red Cross Center",
    bloodType: "A+",
    description: "Scheduled a donation appointment",
    icon: Calendar,
    iconColor: "text-blue-500",
  },
  {
    id: "4",
    type: "donation",
    date: "2023-10-05T16:20:00Z",
    location: "Medical Center",
    bloodType: "A+",
    description: "You donated 450ml of blood",
    icon: Heart,
    iconColor: "text-blood-500",
  },
  {
    id: "5",
    type: "request",
    date: "2023-09-18T10:00:00Z",
    location: "Memorial Hospital",
    bloodType: "B+",
    description: "You posted a blood request",
    icon: Bell,
    iconColor: "text-amber-500",
  },
  {
    id: "6",
    type: "donation",
    date: "2023-08-22T13:30:00Z",
    location: "Community Health Center",
    bloodType: "A+",
    description: "You donated 500ml of blood",
    icon: Heart,
    iconColor: "text-blood-500",
  },
  {
    id: "7",
    type: "match",
    date: "2023-07-15T09:45:00Z",
    location: "St. Joseph's Hospital",
    bloodType: "AB-",
    description: "You matched with a recipient",
    icon: User,
    iconColor: "text-green-500",
  },
  {
    id: "8",
    type: "donation",
    date: "2023-06-10T11:15:00Z",
    location: "Blood Donation Drive",
    bloodType: "A+",
    description: "You donated 500ml of blood",
    icon: Heart,
    iconColor: "text-blood-500",
  }
];

const Activity = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null);
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Filter activities based on search term and selected type
    let filteredActivities = MOCK_ACTIVITIES;
    
    if (searchTerm) {
      filteredActivities = filteredActivities.filter(
        activity => 
          activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.bloodType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedActivityType) {
      filteredActivities = filteredActivities.filter(
        activity => activity.type === selectedActivityType
      );
    }
    
    setActivities(filteredActivities);
  }, [searchTerm, selectedActivityType]);

  if (!user) {
    return null;
  }

  const activityTypes = [
    { id: "donation", label: "Donations", icon: Heart, color: "text-blood-500 bg-blood-50" },
    { id: "request", label: "Requests", icon: Bell, color: "text-amber-500 bg-amber-50" },
    { id: "schedule", label: "Scheduled", icon: Calendar, color: "text-blue-500 bg-blue-50" },
    { id: "match", label: "Matches", icon: User, color: "text-green-500 bg-green-50" },
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      day: date.getDate(),
      year: date.getFullYear(),
      time: date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
      relativeTime: getRelativeTime(date)
    };
  };

  // Get relative time (e.g. "2 weeks ago")
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">Activity History</h1>
          <p className="text-muted-foreground mb-10">View your donation and request history</p>
          
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={selectedActivityType === null ? "default" : "outline"}
                className={selectedActivityType === null ? "bg-blood-500 hover:bg-blood-600" : ""}
                onClick={() => setSelectedActivityType(null)}
              >
                <Filter className="mr-2 h-4 w-4" />
                All
              </Button>
              
              {activityTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={selectedActivityType === type.id ? "default" : "outline"}
                  className={selectedActivityType === type.id ? "bg-blood-500 hover:bg-blood-600" : ""}
                  onClick={() => setSelectedActivityType(type.id)}
                >
                  <type.icon className="mr-2 h-4 w-4" />
                  {type.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Activity Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Your Activity Timeline</CardTitle>
              <CardDescription>
                {activities.length} {activities.length === 1 ? 'activity' : 'activities'} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                <div className="space-y-6">
                  {activities.map((activity, index) => {
                    const formattedDate = formatDate(activity.date);
                    
                    return (
                      <div key={activity.id} className="relative pl-6 pb-6">
                        {/* Timeline connector */}
                        {index !== activities.length - 1 && (
                          <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-muted" />
                        )}
                        
                        {/* Activity */}
                        <div className="relative">
                          {/* Timeline dot */}
                          <div className={`absolute -left-6 p-1.5 rounded-full flex items-center justify-center ${
                            activity.type === 'donation' 
                              ? 'bg-blood-100' 
                              : activity.type === 'request' 
                              ? 'bg-amber-100' 
                              : activity.type === 'schedule' 
                              ? 'bg-blue-100'
                              : 'bg-green-100'
                          }`}>
                            <activity.icon className={`w-3.5 h-3.5 ${activity.iconColor}`} />
                          </div>
                          
                          <div className="bg-muted/30 rounded-xl p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                              <h3 className="font-semibold">{activity.description}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="w-3.5 h-3.5 mr-1" />
                                {formattedDate.relativeTime} ({formattedDate.month} {formattedDate.day}, {formattedDate.time})
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <div className="flex items-center">
                                <MapPin className="w-3.5 h-3.5 mr-1 text-muted-foreground" />
                                {activity.location}
                              </div>
                              <div className="flex items-center">
                                <Droplet className="w-3.5 h-3.5 mr-1 text-blood-500" />
                                {activity.bloodType}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No activities found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchTerm || selectedActivityType 
                      ? "Try adjusting your filters or search term"
                      : "You don't have any recorded activities yet"}
                  </p>
                  {!searchTerm && !selectedActivityType && (
                    <Button className="mt-4 bg-blood-500 hover:bg-blood-600">
                      Schedule a Donation
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t p-6">
              {activities.length > 0 && (
                <Button variant="outline" className="w-full md:w-auto">
                  Load More Activities
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Activity;
