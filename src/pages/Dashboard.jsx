// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6 text-gray-700">
        Welcome{user ? `, ${user.fullName || user.email}` : ""}.
      </p>
      <div className="flex gap-3">
        <Link to="/profile" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Edit Profile</Link>
        <Link to="/change-password" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Change Password</Link>
      </div>
    </div>
  );
}
