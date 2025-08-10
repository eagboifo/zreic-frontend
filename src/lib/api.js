// src/lib/api.js
export const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '') || '';

// Expose for prod console debugging (safe: base URL is public anyway)
if (typeof window !== 'undefined') {
  window.__ZREIC_API_BASE__ = API_BASE;
}

export async function api(path, { method = 'GET', body, token, headers = {} } = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'omit',
  });

  let data = null;
  try { data = await res.json(); } catch { /* non-JSON */ }

  if (!res.ok) {
    const message = data?.error || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
