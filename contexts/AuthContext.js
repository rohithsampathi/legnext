import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { authenticateUser, updateUserSession } from '../utils/data';

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

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        updateUserSession(user.username, 60); // Update every minute
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [user]);

  const login = async (identifier, password) => {
    try {
      const { token, user: userData } = await authenticateUser(identifier, password);
      localStorage.setItem('token', token);
      setUser(userData);
      console.log('User logged in:', userData);
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
