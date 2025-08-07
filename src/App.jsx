// src/App.jsx
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ZREIC Portal</h1>
        <div>
          <Link to="/" className="mr-4 text-blue-500 hover:underline">Home</Link>
          <Link to="/about" className="mr-4 text-blue-500 hover:underline">About</Link>
          {!user && (
            <>
              <Link to="/register" className="mr-4 text-blue-500 hover:underline">Register</Link>
              <Link to="/login" className="mr-4 text-blue-500 hover:underline">Login</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/dashboard" className="mr-4 text-blue-500 hover:underline">Dashboard</Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
            </>
          )}
        </div>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>

        </Routes>
      </main>
    </div>
  );
}

export default App;
