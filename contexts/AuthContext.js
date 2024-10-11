// contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../utils/data';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
              setUser({
                username: decodedToken.username,
                isAdmin: decodedToken.isAdmin,
                flatNumber: decodedToken.flatNumber,
                // Add other necessary user information
              });
            } else {
              localStorage.removeItem('token');
            }
          } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('token');
          }
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const { token, user: userData } = await authenticateUser(username, password);
      localStorage.setItem('token', token);
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
