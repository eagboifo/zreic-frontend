// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { token, user } = useAuth();
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome to ZREIC</h1>
      <p className="mb-6 text-gray-700">
        This is your portal landing page. You can browse public pages or sign in to access your dashboard.
      </p>
      {!token ? (
        <div className="flex gap-3">
          <Link to="/register" className="px-4 py-2 rounded bg-gray-900 text-white hover:opacity-90">Register</Link>
          <Link to="/login" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Login</Link>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-green-700">Signed in as <b>{user?.fullName || user?.email}</b></p>
          <div className="flex gap-3">
            <Link to="/dashboard" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Go to Dashboard</Link>
            <Link to="/profile" className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Edit Profile</Link>
          </div>
        </div>
      )}
    </div>
  );
}
