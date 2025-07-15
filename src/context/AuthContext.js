// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem('customerData');
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    const handleLogin = () => {
      const data = localStorage.getItem('customerData');
      setUser(data ? JSON.parse(data) : null);
    };
    window.addEventListener('userLogin', handleLogin);
    return () => window.removeEventListener('userLogin', handleLogin);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 