// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { token, user } = useAuth();

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-white border p-8 md:p-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-widest text-blue-700 font-semibold">
            ZREIC Portal
          </p>
          <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Manage your account, track updates, and access resources—fast.
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            This is your central hub. Review your details, update your profile, and
            stay on top of what matters—all in one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {!token ? (
              <>
                <Link
                  to="/register"
                  className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:opacity-90 transition"
                >
                  Create an account
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/about"
                  className="px-5 py-3 rounded-xl bg-white border hover:bg-gray-50 transition"
                >
                  Learn more
                </Link>
              </>
            ) : (
              <>
                <span className="px-5 py-3 rounded-xl bg-green-50 text-green-800 border border-green-200">
                  Signed in as <b>{user?.fullName || user?.email}</b>
                </span>
                <Link
                  to="/dashboard"
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Go to dashboard
                </Link>
                <Link
                  to="/profile"
                  className="px-5 py-3 rounded-xl bg-white border hover:bg-gray-50 transition"
                >
                  Edit profile
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">What you can do here</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z"></path>
              </svg>
            }
            title="Profile & Security"
            desc="Update your name, email and password. Your data stays private and secure."
            cta={{ to: "/profile", label: "Manage profile" }}
          />
          <FeatureCard
            icon={
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h18v2H3v-2z"></path>
              </svg>
            }
            title="Clean Dashboard"
            desc="A simple overview with quick links to what you need most."
            cta={{ to: "/dashboard", label: "Open dashboard" }}
          />
          <FeatureCard
            icon={
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                <path d="M19 3H5C3.9 3 3 3.9 3 5v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
              </svg>
            }
            title="Support & Docs"
            desc="Lightweight pages to explain the basics and help you self-serve."
            cta={{ to: "/about", label: "Read about ZREIC" }}
          />
        </div>
      </section>

      {/* Stats / trust strip (placeholder numbers you can swap) */}
      <section className="rounded-2xl border bg-white p-6 md:p-8">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <Stat value="99.9%" label="Uptime" />
          <Stat value="< 200ms" label="API response" />
          <Stat value="24/7" label="Access" />
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl bg-gray-900 text-white p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to get started?</h3>
            <p className="text-white/80 mt-1">
              Create your account or sign in to access your dashboard.
            </p>
          </div>
          {!token ? (
            <div className="flex gap-3">
              <Link
                to="/register"
                className="px-5 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 transition"
              >
                Create an account
              </Link>
              <Link
                to="/login"
                className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Log in
              </Link>
            </div>
          ) : (
            <Link
              to="/dashboard"
              className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Go to dashboard
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc, cta }) {
  return (
    <div className="rounded-2xl border bg-white p-6 hover:shadow-sm transition">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>
      <h3 className="mt-4 font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
      {cta && (
        <Link to={cta.to} className="mt-4 inline-block text-blue-700 hover:underline">
          {cta.label} →
        </Link>
      )}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-gray-600 mt-1">{label}</div>
    </div>
  );
}
