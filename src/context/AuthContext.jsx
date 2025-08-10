// src/context/AuthContext.jsx
// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { loginUser, getMe } from '../services/auth.js';




const AuthCtx = createContext(null);

function readStoredToken() {
  return localStorage.getItem('token') || sessionStorage.getItem('token') || '';
}
function writeStoredToken(token, remember) {
  localStorage.removeItem('token'); sessionStorage.removeItem('token');
  (remember ? localStorage : sessionStorage).setItem('token', token);
}
function clearStoredToken() {
  localStorage.removeItem('token'); sessionStorage.removeItem('token');
}
function parseJwt(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(base64).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    return JSON.parse(json);
  } catch { return {}; }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStoredToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!token);
  const logoutTimerRef = useRef(null);

  function logout() {
    clearStoredToken();
    setToken('');
    setUser(null);
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }

  function scheduleAutoLogout(jwt) {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
    const expMs = jwt?.exp ? jwt.exp * 1000 : null;
    if (!expMs) return; // no exp in token → no timer (optional: add fallback below)
    const msLeft = expMs - Date.now();
    if (msLeft <= 0) logout();
    else logoutTimerRef.current = setTimeout(() => logout(), msLeft);
  }

  useEffect(() => {
    let cancelled = false;
    async function fetchMe() {
      if (!token) { setLoading(false); return; }
      try {
        const me = await getMe(token);
        if (!cancelled) setUser(me);
      } catch {
        if (!cancelled) {
          clearStoredToken();
          setToken('');
          setUser(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    scheduleAutoLogout(parseJwt(token));
    fetchMe();
    return () => { cancelled = true; };
  }, [token]);

  async function login(email, password, opts = { remember: true }) {
    const res = await loginUser(email, password); // expects { token, user? }
    writeStoredToken(res.token, !!opts.remember);
    setToken(res.token);
    if (res.user) {
      setUser({
        id: res.user.id,
        fullName: res.user.fullName,
        email: res.user.email,
        role: res.user.role,
      });
    }
    scheduleAutoLogout(parseJwt(res.token));
    return res;
  }

  const value = { token, user, loading, login, logout, setUser };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
