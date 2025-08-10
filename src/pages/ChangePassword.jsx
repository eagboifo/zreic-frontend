// src/pages/ChangePassword.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { changePassword } from '../services/auth.js';

export default function ChangePassword() {
  const { token } = useAuth();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState(''); const [err, setErr] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setErr(false);
    try {
      await changePassword(token, form.currentPassword, form.newPassword);
      setMsg('Password updated');
      setForm({ currentPassword: '', newPassword: '' });
    } catch (e) {
      setErr(true); setMsg(e.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {msg ? <div className={`mb-4 p-3 rounded text-sm ${err ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>{msg}</div> : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="currentPassword" type="password" value={form.currentPassword} onChange={onChange} placeholder="Current password" className="w-full p-3 border rounded" required />
        <input name="newPassword" type="password" value={form.newPassword} onChange={onChange} placeholder="New password (min 6 chars)" className="w-full p-3 border rounded" required />
        <button className="w-full py-3 rounded text-white bg-blue-600 hover:bg-blue-700">Change Password</button>
      </form>
    </div>
  );
}
