// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

export const AuthContext = createContext();

const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1 hour

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const timeoutRef = useRef(null);

  const scheduleAutoLogout = (expiresAt) => {
    const delay = expiresAt - new Date().getTime();
    if (delay > 0) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        logout();
        alert("Session expired. Please log in again.");
      }, delay);
    }
  };

  useEffect(() => {
  const storedSession = localStorage.getItem('session') || sessionStorage.getItem('session');
  if (storedSession) {
    const { user, expiresAt } = JSON.parse(storedSession);
    if (new Date().getTime() < expiresAt) {
      setUser(user);
      scheduleAutoLogout(expiresAt);
    } else {
      localStorage.removeItem('session');
      sessionStorage.removeItem('session');
    }
  }
  return () => clearTimeout(timeoutRef.current);
}, []);


// Replace your login function in AuthContext.jsx

const login = (userData, remember) => {
  const expiresAt = new Date().getTime() + SESSION_TIMEOUT_MS;
  const session = { user: userData, expiresAt };
  const storage = remember ? localStorage : sessionStorage;

  storage.setItem('session', JSON.stringify(session));
  setUser(userData);
  scheduleAutoLogout(expiresAt);
};

  const logout = () => {
    setUser(null);
    clearTimeout(timeoutRef.current);
    localStorage.removeItem('session');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
