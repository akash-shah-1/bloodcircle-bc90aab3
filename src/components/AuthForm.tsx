
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

type AuthFormProps = {
  type: "login" | "register";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const { login, register, isLoading, error } = useAuth();
  const { toast } = useToast();
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"donor" | "recipient">("donor");
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (type === "login") {
        await login(email, password);
      } else {
        await register({
          name,
          email,
          password,
          role,
          bloodType: bloodType || undefined,
          location: location || undefined,
        });
      }
      
      // Show success message
      toast({
        title: type === "login" ? "Login successful" : "Registration successful",
        description: type === "login" ? "Welcome back!" : "Your account has been created successfully.",
      });
    } catch (err) {
      // Error handling is done in the auth context
    }
  };

  return (
    <div className="bg-white dark:bg-black/40 rounded-2xl p-8 shadow-lg border border-border/50 w-full max-w-md mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          {type === "login" ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-muted-foreground">
          {type === "login"
            ? "Sign in to your account to continue"
            : "Join BloodCircle and help save lives"}
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {type === "register" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select 
                defaultValue={role} 
                onValueChange={(value) => setRole(value as "donor" | "recipient")}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="donor">Blood Donor</SelectItem>
                  <SelectItem value="recipient">Blood Recipient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {role === "donor" && (
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select 
                  value={bloodType} 
                  onValueChange={setBloodType}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </>
        )}

        <Button 
          type="submit" 
          className="w-full bg-blood-500 hover:bg-blood-600" 
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {type === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        {type === "login" ? (
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blood-500 hover:underline font-medium">
              Register
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blood-500 hover:underline font-medium">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
