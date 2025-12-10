import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User> = {
  'admin@airswift.com': {
    id: '1',
    email: 'admin@airswift.com',
    name: 'Sarah Mitchell',
    role: 'super_admin',
    phone: '+1-555-0101',
  },
  'dispatcher@airswift.com': {
    id: '2',
    email: 'dispatcher@airswift.com',
    name: 'Michael Chen',
    role: 'dispatcher',
    phone: '+1-555-0102',
  },
  'hospital@general.com': {
    id: '3',
    email: 'hospital@general.com',
    name: 'Dr. Emily Rodriguez',
    role: 'hospital_staff',
    phone: '+1-555-0103',
    hospitalId: 'h1',
  },
  'doctor@airswift.com': {
    id: '4',
    email: 'doctor@airswift.com',
    name: 'Dr. James Wilson',
    role: 'medical_team',
    phone: '+1-555-0104',
  },
  'airline@skymedic.com': {
    id: '5',
    email: 'airline@skymedic.com',
    name: 'David Park',
    role: 'airline_coordinator',
    phone: '+1-555-0105',
    airlineId: 'a1',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Always start logged out
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsLoading(false);
  }, []);


  // ✅ ONLY LOGIN FUNCTION IS UPDATED — EVERYTHING ELSE IS SAME
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const userEmail = email.toLowerCase();
    const mockUser = MOCK_USERS[userEmail];

    // SUPER ADMIN LOGIN CREDENTIALS
    const SUPER_ADMIN_EMAIL = "admin@airswift.com";
    const SUPER_ADMIN_PASSWORD = "demo@123"; // keep same as your demo list

    // ❌ Reject wrong email / wrong password / wrong role  
    if (!mockUser || mockUser.email !== SUPER_ADMIN_EMAIL || password !== SUPER_ADMIN_PASSWORD) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }

    // ✔ Successful login
    setUser(mockUser);
    localStorage.setItem("currentUser", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
