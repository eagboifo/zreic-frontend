// FIXED_FRONTEND: Register.jsx
import React, { useState, useMemo } from 'react';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Read API base from Vite env; warn if missing
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const REGISTER_URL = useMemo(() => {
    // If API_BASE is undefined, this will log a warning and produce a bad URL;
    // set up your Vite env or a dev proxy as discussed.
    if (!API_BASE) {
      console.warn(
        'VITE_API_BASE_URL is not set. Configure .env (VITE_API_BASE_URL=https://zreic-backend.onrender.com) ' +
        'or add a Vite dev proxy to /api.'
      );
    }
    const base = (API_BASE || '').replace(/\/$/, '');
    return `${base}/api/register`;
  }, [API_BASE]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch(REGISTER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Try to parse JSON even on non-2xx responses
      let data = {};
      try {
        data = await res.json();
      } catch {
        /* non-JSON response */
      }

      if (!res.ok) {
        const errMsg = data?.error || `Registration failed (${res.status})`;
        setIsError(true);
        setMessage(errMsg);
        return;
      }

      setIsError(false);
      setMessage(data?.message || 'User registered successfully');
      setFormData({ fullName: '', email: '', password: '' });
    } catch (err) {
      console.error('Register request failed:', err);
      setIsError(true);
      setMessage('Network/Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-sm bg-white">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      {message ? (
        <div
          className={`mb-4 rounded p-3 text-sm ${
            isError ? 'bg-red-50 text-red-700 border border-red-200'
                    : 'bg-green-50 text-green-700 border border-green-200'
          }`}
        >
          {message}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white font-medium ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Tiny helper for env visibility in dev */}
      <p className="mt-4 text-xs text-gray-500">
        API: {API_BASE ? API_BASE : 'VITE_API_BASE_URL not set'}
      </p>
    </div>
  );
}

export default Register;
