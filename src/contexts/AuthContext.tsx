import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface MockUser extends User {
  password?: string;
}

// Editable Users Array
// You can change email, password, name, and role here anytime.
const USERS: MockUser[] = [
  {
    id: '1',
    email: 'admin@airswift.com',
    password: 'demo@123',
    name: 'Sarah Mitchell',
    role: 'super_admin',
    phone: '+1-555-0101',
  },
  {
    id: '4',
    email: 'doctor@airswift.com',
    password: 'demo@123',
    name: 'Dr. James Wilson',
    role: 'doctor',
    phone: '+1-555-0104',
  },
  {
    id: '6',
    email: 'pharmacy@airswift.com',
    password: 'demo@123',
    name: 'Ph. Robert Chen',
    role: 'pharmacy',
    phone: '+1-555-0106',
  },
  {
    // Fixed: Pathologist email matches what user likely expects or can be edited easily
    id: '7',
    email: 'pathologist@airswift.com',
    password: 'demo@123',
    name: 'Dr. Lisa Wong',
    role: 'pathologist',
    phone: '+1-555-0107',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent login
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("currentUser");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const normalizedEmail = email.toLowerCase().trim();

      // Find user in the array
      const foundUser = USERS.find(u => u.email.toLowerCase() === normalizedEmail);

      if (!foundUser) {
        throw new Error("No user found with this email");
      }

      // Check password
      // Default to 'demo@123' if no password property is set on the user object, 
      // but strictly check if it IS set.
      const validPassword = foundUser.password || 'demo@123';

      if (password !== validPassword) {
        throw new Error("Invalid password");
      }

      // Successful login
      const userToStore = { ...foundUser };
      delete (userToStore as any).password; // Don't store password in state/localstorage

      setUser(userToStore);
      localStorage.setItem("currentUser", JSON.stringify(userToStore));
    } catch (error) {
      // Re-throw to be handled by the UI
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
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
