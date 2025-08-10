// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold">ZREIC</Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/profile" className={linkClass(location, '/profile')}>Profile</Link>
              <Link to="/change-password" className={linkClass(location, '/change-password')}>Change Password</Link>
              <button
                onClick={() => { logout(); navigate('/login'); }}
                className="px-3 py-1.5 rounded bg-gray-900 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="px-3 py-1.5 rounded bg-blue-600 text-white">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function linkClass(location, path) {
  const active = location.pathname === path;
  return `px-3 py-1.5 rounded ${active ? 'bg-gray-200' : 'hover:bg-gray-100'}`;
}
