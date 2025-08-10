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
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-blue-700 font-semibold">
            Zodiak Real Estate Investment Cooperative  • ZREIC </p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Build wealth in real assets with clarity and control.
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              ZREIC connects qualified investors to institutional-grade deals and
              gives you a single place to track performance, distributions, and
              documents—end to end.
            </p>

            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <Check /> Access curated offerings with full diligence packs.
              </li>
              <li className="flex items-start gap-2">
                <Check /> Monitor NOI, equity multiple, and IRR—updated as projects advance.
              </li>
              <li className="flex items-start gap-2">
                <Check /> Distributions, statements, and K-1s in one secure vault.
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              {!token ? (
                <>
                  <Link
                    to="/register"
                    className="px-5 py-3 rounded-xl bg-gray-900 text-white hover:opacity-90 transition"
                  >
                    Create investor account
                  </Link>
                  <Link
                    to="/login"
                    className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Investor login
                  </Link>
                  <Link
                    to="/about"
                    className="px-5 py-3 rounded-xl bg-white border hover:bg-gray-50 transition"
                  >
                    How it works
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

          {/* Inline illustration (no external image needed) */}
          <div className="relative">
            <div className="absolute -inset-6 bg-blue-100/50 blur-2xl rounded-3xl" aria-hidden />
            <div className="relative rounded-2xl border bg-white p-6">
              <Skyline />
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <MiniStat value="$25M+" label="AUM*" />
                <MiniStat value="6" label="Markets" />
                <MiniStat value="120+" label="Investors*" />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                *Illustrative placeholders. Replace with live metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Why investors choose ZREIC</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<IconDiligence />}
            title="Curated offerings"
            desc="Deal rooms with models, comps, and risk notes. Commit in a few clicks."
            cta={{ to: "/dashboard", label: "View pipeline" }}
          />
          <FeatureCard
            icon={<IconAnalytics />}
            title="Portfolio analytics"
            desc="Track NOI, LTV, IRR, and equity multiple. Bird’s-eye and asset-level views."
            cta={{ to: "/dashboard", label: "Open dashboard" }}
          />
          <FeatureCard
            icon={<IconDocuments />}
            title="Documents & K-1s"
            desc="Statements, updates, and tax docs in a secure vault with audit logs."
            cta={{ to: "/about", label: "Learn more" }}
          />
        </div>
      </section>

      {/* Stats strip */}
      <section className="rounded-2xl border bg-white p-6 md:p-8">
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <Stat value="~8–14%" label="Target net IRR*" />
          <Stat value="Quarterly" label="Distribution cadence" />
          <Stat value="Institutional" label="Asset management" />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          *For illustration only. Not an offer or guarantee. Past performance is not indicative of future results.
        </p>
      </section>

      {/* Final CTA */}
      <section className="rounded-2xl bg-gray-900 text-white p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Join the ZREIC investor community</h3>
            <p className="text-white/80 mt-1">
              Create your account to access opportunities and track your portfolio.
            </p>
          </div>
          {!token ? (
            <div className="flex gap-3">
              <Link
                to="/register"
                className="px-5 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 transition"
              >
                Create account
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

/* ------------------------ small components ------------------------ */

function Check() {
  return (
    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
        <path d="M7.629 13.233 4.4 10.004l1.2-1.2 2.029 2.03 6.8-6.8 1.2 1.2-8 8z" />
      </svg>
    </span>
  );
}

function MiniStat({ value, label }) {
  return (
    <div className="rounded-lg border bg-white p-3">
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
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

/* ------------------------ Inline illustration ------------------------ */

function Skyline() {
  return (
    <svg
      role="img"
      aria-label="Stylized city skyline"
      viewBox="0 0 560 280"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="560" height="280" fill="url(#g1)" rx="16" />
      {/* ground */}
      <rect x="0" y="220" width="560" height="60" fill="#EFF6FF" />
      {/* buildings */}
      <g fill="#1D4ED8">
        <rect x="40" y="120" width="70" height="100" rx="4" opacity="0.25" />
        <rect x="130" y="90" width="80" height="130" rx="4" opacity="0.20" />
        <rect x="230" y="60" width="70" height="160" rx="4" opacity="0.18" />
        <rect x="320" y="100" width="90" height="120" rx="4" opacity="0.22" />
        <rect x="430" y="70" width="70" height="150" rx="4" opacity="0.20" />
      </g>
      {/* windows */}
      <g fill="#93C5FD">
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={"w1-"+i} x={50} y={130 + i * 9} width="50" height="4" rx="2" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={"w2-"+i} x={140} y={100 + i * 8} width="60" height="4" rx="2" />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={"w3-"+i} x={240} y={70 + i * 7} width="50" height="3.5" rx="2" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={"w4-"+i} x={330} y={110 + i * 8} width="70" height="4" rx="2" />
        ))}
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={"w5-"+i} x={440} y={80 + i * 7} width="50" height="3.5" rx="2" />
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------ Icons ---------------------------------- */

function IconDiligence() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden>
      <path d="M3 5h18v2H3zM3 11h12v2H3zM3 17h18v2H3z" />
    </svg>
  );
}

function IconAnalytics() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden>
      <path d="M3 3h2v18H3zM7 13h2v8H7zM11 9h2v12h-2zM15 5h2v16h-2zM19 3h2v18h-2z" />
    </svg>
  );
}

function IconDocuments() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden>
      <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5" />
    </svg>
  );
}
