// FIXED_FRONTEND: Register.jsx (hardened against 404s and bad bases)
import React, { useState, useMemo } from 'react';

function normalizeBase(raw) {
  if (!raw) return '';
  let base = String(raw).trim();
  base = base.replace(/\/+$/, ''); // remove trailing slashes
  base = base.replace(/\/api$/i, '').replace(/\/api\/$/i, ''); // strip trailing /api
  return base;
}

function computeApiBase() {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (envBase && envBase.length) {
    return normalizeBase(envBase);
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.warn(
      'VITE_API_BASE_URL not set. Falling back to dev proxy. ' +
      'Ensure vite.config.js has a proxy for /api -> https://zreic-backend.onrender.com'
    );
    return '';
  }
  console.warn(
    'VITE_API_BASE_URL not set in a non-local environment. ' +
    'Set VITE_API_BASE_URL=https://zreic-backend.onrender.com'
  );
  return '';
}

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE = useMemo(() => computeApiBase(), []);
  const REGISTER_URL = useMemo(() => {
    const base = normalizeBase(API_BASE);
    return `${base}/api/register`; // will be relative if base === ''
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

      let data = {};
      try {
        data = await res.json();
      } catch {
        /* response not JSON; leave data as {} */
      }

      if (!res.ok) {
        const errMsg =
          data?.error ||
          (res.status === 404
            ? `404 Not Found: ${REGISTER_URL} — check your base URL and route path (/api/register)`
            : `Request failed (${res.status})`);
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
            isError
              ? 'bg-red-50 text-red-700 border border-red-200'
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

      <div className="mt-4 text-xs text-gray-500 space-y-1">
        <p>API Base: {API_BASE || '(relative / dev proxy)'}</p>
        <p>Register URL: {REGISTER_URL}</p>
        <p>
          Tip: In production, set <code>VITE_API_BASE_URL=https://zreic-backend.onrender.com</code> and redeploy.
        </p>
      </div>
    </div>
  );
}

export default Register;
