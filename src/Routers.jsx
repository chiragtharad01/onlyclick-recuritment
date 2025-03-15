import React from "react";
import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
function Routers() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
    </AuthProvider>
  );
}

export default Routers;
