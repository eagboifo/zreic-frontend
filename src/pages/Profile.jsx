// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { updateProfile } from '../services/auth.js';

export default function Profile() {
  const { user, token, setUser } = useAuth();
  const [form, setForm] = useState({ fullName: user?.fullName || '', email: user?.email || '' });
  const [msg, setMsg] = useState(''); const [err, setErr] = useState(false);

  if (!user) return <div className="p-6">Please login.</div>;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr(false);
    try {
      const res = await updateProfile(token, form);
      setUser({ ...user, fullName: res.user.fullName, email: res.user.email, role: res.user.role });
      setMsg('Profile updated');
    } catch (e) {
      setErr(true); setMsg(e.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {msg ? <div className={`mb-4 p-3 rounded text-sm ${err ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{msg}</div> : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="fullName" value={form.fullName} onChange={onChange} className="w-full p-3 border rounded" />
        <input name="email" type="email" value={form.email} onChange={onChange} className="w-full p-3 border rounded" />
        <button className="w-full py-3 rounded text-white bg-blue-600 hover:bg-blue-700">Save</button>
      </form>
    </div>
  );
}
