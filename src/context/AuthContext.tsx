
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "donor" | "recipient" | "admin";
  bloodType?: string;
  location?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  error: string | null;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: "donor" | "recipient";
  bloodType?: string;
  location?: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "John Donor",
    email: "donor@example.com",
    password: "password",
    role: "donor" as const,
    bloodType: "A+",
    location: "New York",
  },
  {
    id: "2",
    name: "Sarah Recipient",
    email: "recipient@example.com",
    password: "password",
    role: "recipient" as const,
    bloodType: "O-",
    location: "Los Angeles",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    password: "password",
    role: "admin" as const,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("bloodcircle_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = MOCK_USERS.find(u => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password");
      }
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("bloodcircle_user", JSON.stringify(userWithoutPassword));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === userData.email)) {
        throw new Error("Email already in use");
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        bloodType: userData.bloodType,
        location: userData.location,
      };
      
      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem("bloodcircle_user", JSON.stringify(newUser));
      
      // In a real app, MOCK_USERS would be updated via an API
      MOCK_USERS.push({ ...newUser, password: userData.password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bloodcircle_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
