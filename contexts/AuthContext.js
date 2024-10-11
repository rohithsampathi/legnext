// contexts/AuthContext.js

// contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../utils/data';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading to true

  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
              // You need to fetch user data based on the token
              const userData = {
                _id: decodedToken.userId,
                username: decodedToken.username,
                isAdmin: decodedToken.isAdmin,
              };
              setUser(userData);
            } else {
              localStorage.removeItem('token');
            }
          } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('token');
          }
        }
      }
      setLoading(false); // Set loading to false after authentication check
    };

    initializeAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const { token, user } = await authenticateUser(username, password);
      localStorage.setItem('token', token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateUser = (updatedUserData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedUserData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
