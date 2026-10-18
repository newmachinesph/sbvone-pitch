"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "sbv-admin-password";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ADMIN_PASSWORD) {
      setAuthorized(true);
      setInitialized(true);
      return;
    }
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && stored === ADMIN_PASSWORD) {
      setAuthorized(true);
    }
    setInitialized(true);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ADMIN_PASSWORD) {
      setAuthorized(true);
      return;
    }
    if (input === ADMIN_PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, input);
      setAuthorized(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6edfc] text-[#131e63]">
        <p className="text-sm">Preparing admin console…</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#e6edfc] px-4 text-[#131e63]">
        <div className="w-full max-w-md rounded-3xl border border-[#131e63]/15 bg-white/95 p-8 shadow-[0_25px_70px_rgba(19,30,99,0.12)]">
          <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Restricted</p>
          <h1 className="mt-3 text-2xl font-semibold">Admin Access</h1>
          <p className="mt-2 text-sm text-[#131e63]/70">Enter the admin password to view these dashboards.</p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-[#131e63]/70">Password</label>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border border-[#131e63]/20 bg-white px-3 py-2 text-sm focus:border-[#131e63] focus:outline-none"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-full border border-[#131e63] bg-[#131e63] px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#101955]"
            >
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
