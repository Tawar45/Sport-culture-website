import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define the User interface
export interface User {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

// Define the context type
interface AuthContextType {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const data = localStorage.getItem('customerData');
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    // Optionally, sync user state with localStorage changes
    const handleStorage = () => {
      const data = localStorage.getItem('customerData');
      setUser(data ? JSON.parse(data) : null);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('customerData', JSON.stringify(userData));
    localStorage.setItem('customerToken', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('customerData');
    localStorage.removeItem('customerToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}; 