// import { createContext, useContext, useState, useEffect, use } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); 
// const navigate=useNavigate()
//   // Check if user is logged in when the app loads
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData)); // Save to local storage
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user"); // Clear session
//     navigate('/login')
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }


// AuthContext.jsx
import React, { createContext,useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// Create a context to hold authentication state
export const AuthContext = createContext();

// AuthContext provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate=useNavigate()

  useEffect(() => {
    // If there is a token in localStorage, set the user state
    if (token) {
      setUser({ token });
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken); // Store token in localStorage
    setToken(newToken); // Update token in state
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null); // Clear token in state
    setUser(null); // Clear user data
    navigate('/login')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export function useAuth() {
  return useContext(AuthContext);
}
