// src/services/auth.js
import { api } from '../lib/api.js';

export const registerUser = (payload) =>
  api('/api/register', { method: 'POST', body: payload });

export const loginUser = (email, password) =>
  api('/api/login', { method: 'POST', body: { email, password } });

export const getMe = (token) =>
  api('/api/me', { token });

export const updateProfile = (token, updates) =>
  api('/api/profile', { method: 'PUT', token, body: updates });

export const changePassword = (token, currentPassword, newPassword) =>
  api('/api/password', { method: 'PUT', token, body: { currentPassword, newPassword } });
