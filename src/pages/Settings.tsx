
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bell, CreditCard, Key, Lock, MapPin, Save, Shield, User, UserCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleSaveChanges = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-10">Account Settings</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    <Button
                      variant={activeSection === "profile" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeSection === "profile" ? "bg-blood-500 hover:bg-blood-600" : ""}`}
                      onClick={() => setActiveSection("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant={activeSection === "account" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeSection === "account" ? "bg-blood-500 hover:bg-blood-600" : ""}`}
                      onClick={() => setActiveSection("account")}
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Account
                    </Button>
                    <Button
                      variant={activeSection === "password" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeSection === "password" ? "bg-blood-500 hover:bg-blood-600" : ""}`}
                      onClick={() => setActiveSection("password")}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Password
                    </Button>
                    <Button
                      variant={activeSection === "notifications" ? "default" : "ghost"}
                      className={`w-full justify-start ${activeSection === "notifications" ? "bg-blood-500 hover:bg-blood-600" : ""}`}
                      onClick={() => setActiveSection("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    {user.role === "donor" && (
                      <Button
                        variant={activeSection === "privacy" ? "default" : "ghost"}
                        className={`w-full justify-start ${activeSection === "privacy" ? "bg-blood-500 hover:bg-blood-600" : ""}`}
                        onClick={() => setActiveSection("privacy")}
                      >
                        <Shield className="mr-2 h-4 w-4" />
                        Privacy
                      </Button>
                    )}
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Settings Content */}
            <div className="lg:col-span-3">
              <Card>
                {activeSection === "profile" && (
                  <>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal information and blood donation details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue={user.name} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue={user.email} />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input id="phoneNumber" type="tel" placeholder="Enter your phone number" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bloodType">Blood Type</Label>
                            <Input id="bloodType" defaultValue={user.bloodType} />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" defaultValue={user.location} />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea
                            id="bio"
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tell us a bit about yourself..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
                
                {activeSection === "account" && (
                  <>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences and connected services
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Account Type</h3>
                            <p className="text-sm text-muted-foreground">
                              You are registered as a {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </p>
                          </div>
                          <Button variant="outline">Change Role</Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-3">
                          <h3 className="text-base font-medium">Connected Accounts</h3>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#4285F4] flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12C1 5.9 5.9 1 12 1s11 4.9 11 11-4.9 11-11 11S1 18.1 1 12Z" />
                                  <path d="M12 7v5l3 3" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-base font-medium">Google</h4>
                                <p className="text-sm text-muted-foreground">Not connected</p>
                              </div>
                            </div>
                            <Button variant="outline">Connect</Button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-full bg-[#3b5998] flex items-center justify-center text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-base font-medium">Facebook</h4>
                                <p className="text-sm text-muted-foreground">Not connected</p>
                              </div>
                            </div>
                            <Button variant="outline">Connect</Button>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-3">
                          <h3 className="text-base font-medium">Danger Zone</h3>
                          <div className="rounded-md border border-destructive/50 p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-base font-medium text-destructive">Delete Account</h4>
                                <p className="text-sm text-muted-foreground">
                                  Permanently delete your account and all data
                                </p>
                              </div>
                              <Button variant="destructive">Delete Account</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
                
                {activeSection === "password" && (
                  <>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to maintain account security
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        
                        <div className="text-sm space-y-2">
                          <h4 className="font-medium">Password Requirements:</h4>
                          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                            <li>Minimum 8 characters long</li>
                            <li>At least one uppercase letter</li>
                            <li>At least one number</li>
                            <li>At least one special character</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
                
                {activeSection === "notifications" && (
                  <>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Control how and when you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Email Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive email notifications about donation opportunities
                            </p>
                          </div>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">SMS Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive text messages for urgent blood requests
                            </p>
                          </div>
                          <Switch id="sms-notifications" />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Donation Reminders</h3>
                            <p className="text-sm text-muted-foreground">
                              Get reminded when you're eligible to donate again
                            </p>
                          </div>
                          <Switch id="donation-reminders" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Marketing Communications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about campaigns and events
                            </p>
                          </div>
                          <Switch id="marketing" />
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
                
                {activeSection === "privacy" && (
                  <>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>
                        Control your privacy and visibility preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Profile Visibility</h3>
                            <p className="text-sm text-muted-foreground">
                              Allow recipients to find you in donor searches
                            </p>
                          </div>
                          <Switch id="profile-visibility" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Share Blood Type</h3>
                            <p className="text-sm text-muted-foreground">
                              Show your blood type to potential recipients
                            </p>
                          </div>
                          <Switch id="share-blood-type" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Location Sharing</h3>
                            <p className="text-sm text-muted-foreground">
                              Share your general location for matching purposes
                            </p>
                          </div>
                          <Switch id="location-sharing" defaultChecked />
                        </div>
                        
                        <Separator />
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <h3 className="text-base font-medium">Donation History</h3>
                            <p className="text-sm text-muted-foreground">
                              Make your donation history visible to recipients
                            </p>
                          </div>
                          <Switch id="donation-history" />
                        </div>
                      </div>
                    </CardContent>
                  </>
                )}
                
                <CardFooter className="flex justify-between border-t p-6">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={handleSaveChanges} className="bg-blood-500 hover:bg-blood-600">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
