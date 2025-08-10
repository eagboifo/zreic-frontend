// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => { logout(); navigate("/"); };

  return (
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-semibold tracking-wide">ZREIC</Link>
          <nav className="hidden sm:flex items-center gap-4 text-sm">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {token && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/change-password">Change Password</Link>
              </>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <span className="text-sm text-gray-600 hidden sm:inline">{user?.fullName || user?.email}</span>
              <button onClick={onLogout} className="px-3 py-1.5 rounded bg-gray-900 text-white text-sm hover:opacity-90">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700">Login</Link>
              <Link to="/register" className="text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
