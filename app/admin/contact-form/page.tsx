"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdminGate from "@/components/AdminGate";
import { supabase } from "@/lib/supabaseClient";

type ContactEntry = {
  id: string;
  created_at: string;
  name: string;
  organization: string | null;
  location: string | null;
  email: string;
  contact_number: string | null;
  support_details: string | null;
  is_read: boolean;
};

const PAGE_SIZE = 10;

export default function ContactFormAdminPage() {
  const [entries, setEntries] = useState<ContactEntry[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<ContactEntry | null>(null);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    [],
  );

  useEffect(() => {
    let active = true;
    const fetchEntries = async () => {
      setLoading(true);
      setError(null);
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data, error, count } = await supabase
        .from("contact_inquiries")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (!active) return;
      if (error) {
        setError(error.message ?? "Unable to load entries.");
        setEntries([]);
        setTotal(0);
      } else {
        setEntries(data ?? []);
        setTotal(count ?? 0);
      }
      setLoading(false);
    };

    fetchEntries();
    return () => {
      active = false;
    };
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const goToPage = (nextPage: number) => {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  const markAsRead = async (id: string) => {
    setMarkingId(id);
    const { error } = await supabase.from("contact_inquiries").update({ is_read: true }).eq("id", id);
    if (!error) {
      setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, is_read: true } : entry)));
    } else {
      console.error(error);
    }
    setMarkingId(null);
  };

  return (
    <AdminGate>
      <div className="font-[family:var(--font-manrope)] relative min-h-screen overflow-hidden bg-[#eef2ff] text-[#131e63]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(141,191,235,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_0,rgba(230,237,252,0.4),transparent_75%)]" />
        </div>
      <SiteHeader />
      <main className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
        <div className="mb-6">
          <Link href="/admin" className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8dbfeb] transition hover:text-[#131e63]">
            Back to admin
          </Link>
        </div>
        <section className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Contact form</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-[#131e63]">Inquiries overview</h1>
                <p className="text-sm text-[#131e63]/70">Showing {entries.length ? `${(page - 1) * PAGE_SIZE + 1}-${(page - 1) * PAGE_SIZE + entries.length}` : 0} of {total} total submissions.</p>
              </div>
              <div className="text-xs text-[#131e63]/60">
                Page {page} / {totalPages}
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-[#131e63]/10 bg-white/95 p-6 shadow-[0_20px_55px_rgba(19,30,99,0.1)]">
            {loading ? (
              <p className="text-sm text-[#131e63]/70">Loading entries...</p>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : entries.length === 0 ? (
              <p className="text-sm text-[#131e63]/70">No submissions yet.</p>
            ) : (
              <ul className="space-y-4">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-2xl border border-[#131e63]/10 bg-white/90 p-4 shadow-sm cursor-pointer transition hover:border-[#131e63]/40"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedEntry(entry)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedEntry(entry);
                      }
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-[#131e63]">{entry.name}</p>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">{entry.organization ?? "Independent"}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <p className="text-xs text-[#131e63]/60">{entry.created_at ? dateFormatter.format(new Date(entry.created_at)) : "-"}</p>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${entry.is_read ? "bg-green-50 text-green-700 border border-green-200" : "bg-[#131e63]/10 text-[#131e63] border border-[#131e63]/20"}`}>
                          {entry.is_read ? "Read" : "Unread"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 grid gap-3 text-sm text-[#131e63]/80 md:grid-cols-2">
                      <div>
                        <span className="font-semibold">Email:</span> {entry.email}
                      </div>
                      <div>
                        <span className="font-semibold">Contact:</span> {entry.contact_number || "-"}
                      </div>
                      <div>
                        <span className="font-semibold">Location:</span> {entry.location || "-"}
                      </div>
                      <div>
                        <span className="font-semibold">Support need:</span> {entry.support_details || "-"}
                      </div>
                    </div>
                    {!entry.is_read && (
                      <div className="mt-4 text-right">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            markAsRead(entry.id);
                          }}
                          disabled={markingId === entry.id}
                          className="inline-flex items-center justify-center rounded-full border border-[#131e63] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-[#131e63] transition hover:bg-[#131e63]/5 disabled:opacity-50"
                        >
                          {markingId === entry.id ? "Updating..." : "Mark as read"}
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => goToPage(page - 1)}
                className="inline-flex items-center justify-center rounded-full border border-[#131e63]/20 px-4 py-2 text-sm text-[#131e63] transition hover:border-[#131e63]/40 disabled:opacity-40"
                disabled={page === 1 || loading}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => goToPage(page + 1)}
                className="inline-flex items-center justify-center rounded-full border border-[#131e63] bg-[#131e63] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#101955] disabled:opacity-40"
                disabled={page >= totalPages || loading}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedEntry(null)} />
          <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-[#131e63]/20 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">Contact submission</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#131e63]">{selectedEntry.name}</h2>
                <p className="text-sm text-[#131e63]/70">{selectedEntry.organization ?? "Independent"}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="text-sm uppercase tracking-[0.3em] text-[#131e63]/60 transition hover:text-[#131e63]"
              >
                Close
              </button>
            </div>
            <div className="mt-6 grid gap-4 text-sm text-[#131e63]/85">
              <div className="grid grid-cols-[140px,1fr] gap-2">
                <span className="font-semibold text-[#131e63]">Email</span>
                <span>{selectedEntry.email}</span>
              </div>
              <div className="grid grid-cols-[140px,1fr] gap-2">
                <span className="font-semibold text-[#131e63]">Contact number</span>
                <span>{selectedEntry.contact_number || "-"}</span>
              </div>
              <div className="grid grid-cols-[140px,1fr] gap-2">
                <span className="font-semibold text-[#131e63]">Location</span>
                <span>{selectedEntry.location || "-"}</span>
              </div>
              <div className="grid grid-cols-[140px,1fr] gap-2">
                <span className="font-semibold text-[#131e63]">Support needed</span>
                <span>{selectedEntry.support_details || "-"}</span>
              </div>
              <div className="grid grid-cols-[140px,1fr] gap-2">
                <span className="font-semibold text-[#131e63]">Submitted on</span>
                <span>{selectedEntry.created_at ? dateFormatter.format(new Date(selectedEntry.created_at)) : "-"}</span>
              </div>
              <div className="grid grid-cols-[140px,1fr] gap-2">
                <span className="font-semibold text-[#131e63]">Status</span>
                <span>{selectedEntry.is_read ? "Read" : "Unread"}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <SiteFooter />
    </div>
    </AdminGate>
  );
}
