// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="p-6">Loading...</div>;
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
