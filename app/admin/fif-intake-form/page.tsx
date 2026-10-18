"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import AdminGate from "@/components/AdminGate";
import { supabase } from "@/lib/supabaseClient";

type ApplicationEntry = {
  id: string;
  submitted_at: string;
  first_name: string;
  last_name: string;
  email: string;
  application_type: "individual" | "group";
  team_name: string | null;
  team_size: number | null;
  location: string | null;
  primary_background: string | null;
  care_gap: string | null;
  motivation: string | null;
  team_website: string | null;
  is_read: boolean;
};

type Member = {
  full_name: string | null;
  email: string | null;
  role_archetype: string | null;
  strength: string | null;
};

type ApplicationDetail = ApplicationEntry & {
  linkedin_url: string | null;
  years_experience: string | null;
  strengths: string | null;
  story: string | null;
  team_duration: string | null;
  team_gaps: string | null;
  members: Member[] | null;
  users: string | null;
  attempts: string | null;
  mindset: {
    problem?: number | null;
    execution?: number | null;
    collaboration?: number | null;
  } | null;
  ai_tools: string | null;
  ai_challenge: string | null;
  ai_level: string | null;
  personalities: string[] | null;
  hours_per_week: string | null;
  runway: string | null;
  team_fit: string | null;
  constraints: string | null;
  readiness: {
    has_devices?: boolean;
    can_attend?: boolean;
    open_to_matching?: boolean;
  } | null;
  avatar_bucket_path: string | null;
  avatar_public_url: string | null;
};

const PAGE_SIZE = 10;

export default function FIFIntakeAdminPage() {
  const [entries, setEntries] = useState<ApplicationEntry[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [selectedSummary, setSelectedSummary] = useState<ApplicationEntry | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<ApplicationDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const formatReadinessValue = (value?: boolean | null) => {
    if (value === undefined || value === null) return "-";
    return value ? "Yes" : "No";
  };

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
        .from("fif_applications")
        .select(
          "id, submitted_at, first_name, last_name, email, application_type, team_name, team_size, location, primary_background, care_gap, motivation, team_website, is_read",
          { count: "exact" },
        )
        .order("submitted_at", { ascending: false })
        .range(from, to);

      if (!active) return;
      if (error) {
        setError(error.message ?? "Unable to load applications.");
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
    const { error } = await supabase.from("fif_applications").update({ is_read: true }).eq("id", id);
    if (!error) {
      setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, is_read: true } : entry)));
    } else {
      console.error(error);
    }
    setMarkingId(null);
  };

  const fetchDetail = async (id: string) => {
    setDetailLoading(true);
    setDetailError(null);
    const { data, error } = await supabase.from("fif_applications").select("*").eq("id", id).single();
    if (error) {
      setDetailError(error.message ?? "Unable to load application details.");
      setSelectedDetail(null);
    } else {
      setSelectedDetail(data as ApplicationDetail);
    }
    setDetailLoading(false);
  };

  const openDetail = (entry: ApplicationEntry) => {
    setSelectedSummary(entry);
    setSelectedDetail(null);
    setDetailError(null);
    void fetchDetail(entry.id);
  };

  const closeDetail = () => {
    setSelectedSummary(null);
    setSelectedDetail(null);
    setDetailError(null);
  };

  return (
    <AdminGate>
      <div className="font-[family:var(--font-manrope)] relative min-h-screen overflow-hidden bg-[#edf1ff] text-[#131e63]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(141,191,235,0.4),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(230,237,252,0.45),transparent_70%)]" />
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
            <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">FutureCare intake</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold text-[#131e63]">Application queue</h1>
                <p className="text-sm text-[#131e63]/70">Showing {entries.length ? `${(page - 1) * PAGE_SIZE + 1}-${(page - 1) * PAGE_SIZE + entries.length}` : 0} of {total} submissions.</p>
              </div>
              <div className="text-xs text-[#131e63]/60">
                Page {page} / {totalPages}
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-[#131e63]/10 bg-white/95 p-6 shadow-[0_20px_55px_rgba(19,30,99,0.1)]">
            {loading ? (
              <p className="text-sm text-[#131e63]/70">Loading applications...</p>
            ) : error ? (
              <p className="text-sm text-red-600">{error}</p>
            ) : entries.length === 0 ? (
              <p className="text-sm text-[#131e63]/70">No applications yet.</p>
            ) : (
              <ul className="space-y-4">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-2xl border border-[#131e63]/10 bg-white/90 p-4 shadow-sm cursor-pointer transition hover:border-[#131e63]/40"
                    role="button"
                    tabIndex={0}
                    onClick={() => openDetail(entry)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openDetail(entry);
                      }
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-[#131e63]">
                          {entry.first_name} {entry.last_name}
                        </p>
                        <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">
                          {entry.application_type === "group" ? "Group" : "Individual"} application
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2 text-right">
                        <p className="text-xs text-[#131e63]/60">{entry.submitted_at ? dateFormatter.format(new Date(entry.submitted_at)) : "-"}</p>
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
                        <span className="font-semibold">Location:</span> {entry.location || "-"}
                      </div>
                      <div>
                        <span className="font-semibold">Background:</span> {entry.primary_background || "-"}
                      </div>
                      {entry.application_type === "group" && (
                        <div>
                          <span className="font-semibold">Team:</span> {entry.team_name || "-"} ({entry.team_size ?? "?"} people)
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <p className="font-semibold text-[#131e63]">Care gap focus</p>
                        <p className="text-sm text-[#131e63]/75">{entry.care_gap || "-"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="font-semibold text-[#131e63]">Motivation</p>
                        <p className="text-sm text-[#131e63]/75">{entry.motivation || "-"}</p>
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
      {selectedSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={closeDetail} />
          <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[#131e63]/20 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">Application detail</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#131e63]">
                  {selectedSummary.first_name} {selectedSummary.last_name}
                </h2>
                <p className="text-sm text-[#131e63]/70">{selectedSummary.application_type === "group" ? "Group" : "Individual"} submission</p>
              </div>
              <button
                type="button"
                onClick={closeDetail}
                className="text-sm uppercase tracking-[0.3em] text-[#131e63]/60 transition hover:text-[#131e63]"
              >
                Close
              </button>
            </div>
            <div className="mt-6">
              {detailLoading ? (
                <p className="text-sm text-[#131e63]/70">Loading details...</p>
              ) : detailError ? (
                <p className="text-sm text-red-600">{detailError}</p>
              ) : selectedDetail ? (
                <div className="space-y-6 text-sm text-[#131e63]/85">
                  <section className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">Profile</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div><span className="font-semibold text-[#131e63]">Email:</span> {selectedDetail.email}</div>
                      <div><span className="font-semibold text-[#131e63]">Location:</span> {selectedDetail.location || "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Background:</span> {selectedDetail.primary_background || "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">LinkedIn:</span> {selectedDetail.linkedin_url ? <a href={selectedDetail.linkedin_url} className="text-[#131e63] underline" target="_blank" rel="noreferrer">Profile</a> : "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Experience:</span> {selectedDetail.years_experience || "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Strengths:</span> {selectedDetail.strengths || "-"}</div>
                    </div>
                  </section>
                  <section className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">Story & Focus</h3>
                    <div className="space-y-1">
                      <p><span className="font-semibold text-[#131e63]">Founder story:</span> {selectedDetail.story || "-"}</p>
                      <p><span className="font-semibold text-[#131e63]">Care gap:</span> {selectedDetail.care_gap || "-"}</p>
                      <p><span className="font-semibold text-[#131e63]">Motivation:</span> {selectedDetail.motivation || "-"}</p>
                      <p><span className="font-semibold text-[#131e63]">Users:</span> {selectedDetail.users || "-"}</p>
                      <p><span className="font-semibold text-[#131e63]">Attempts:</span> {selectedDetail.attempts || "-"}</p>
                    </div>
                  </section>
                  {selectedDetail.application_type === "group" && (
                    <section className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">Team</h3>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div><span className="font-semibold text-[#131e63]">Team name:</span> {selectedDetail.team_name || "-"}</div>
                        <div><span className="font-semibold text-[#131e63]">Team size:</span> {selectedDetail.team_size ?? "-"}</div>
                        <div><span className="font-semibold text-[#131e63]">Team duration:</span> {selectedDetail.team_duration || "-"}</div>
                        <div><span className="font-semibold text-[#131e63]">Gaps:</span> {selectedDetail.team_gaps || "-"}</div>
                        <div className="md:col-span-2">
                          <span className="font-semibold text-[#131e63]">Website:</span>{" "}
                          {selectedDetail.team_website ? (
                            <a href={selectedDetail.team_website} target="_blank" rel="noreferrer" className="text-[#131e63] underline">
                              {selectedDetail.team_website}
                            </a>
                          ) : (
                            "-"
                          )}
                        </div>
                      </div>
                      {selectedDetail.members && selectedDetail.members.length > 0 && (
                        <div className="rounded-2xl border border-[#131e63]/15 bg-[#f8fbff] p-3">
                          <p className="text-xs font-semibold text-[#131e63] uppercase tracking-[0.3em] mb-2">Members</p>
                          <ul className="space-y-2 text-xs">
                            {selectedDetail.members.map((member, index) => (
                              <li key={`${member.email ?? index}`} className="border-b border-[#131e63]/10 pb-2 last:border-none last:pb-0">
                                <p className="font-semibold text-[#131e63]">{member.full_name || "Unnamed"}</p>
                                <p>{member.email || "-"}</p>
                                <p>{member.role_archetype || "-"} · {member.strength || "-"}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </section>
                  )}
                  <section className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">AI readiness</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div><span className="font-semibold text-[#131e63]">Tools:</span> {selectedDetail.ai_tools || "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Challenge:</span> {selectedDetail.ai_challenge || "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Level:</span> {selectedDetail.ai_level || "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Personalities:</span> {selectedDetail.personalities?.length ? selectedDetail.personalities.join(", ") : "-"}</div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3 text-xs">
                      <div><span className="font-semibold text-[#131e63]">Problem:</span> {selectedDetail.mindset?.problem ?? "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Execution:</span> {selectedDetail.mindset?.execution ?? "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Collaboration:</span> {selectedDetail.mindset?.collaboration ?? "-"}</div>
                    </div>
                  </section>
                  <section className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">Commitment</h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div><span className="font-semibold text-[#131e63]">Hours/week:</span> {selectedDetail.hours_per_week || "-"}</div>
                      <div><span className="font-semibold text-[#131e63]">Runway:</span> {selectedDetail.runway || "-"}</div>
                    </div>
                    <p><span className="font-semibold text-[#131e63]">Team fit:</span> {selectedDetail.team_fit || "-"}</p>
                    <p><span className="font-semibold text-[#131e63]">Constraints:</span> {selectedDetail.constraints || "-"}</p>
                    <div className="grid gap-3 text-xs md:grid-cols-3">
                      <div><span className="font-semibold text-[#131e63]">Has devices:</span> {formatReadinessValue(selectedDetail.readiness?.has_devices)}</div>
                      <div><span className="font-semibold text-[#131e63]">Can attend:</span> {formatReadinessValue(selectedDetail.readiness?.can_attend)}</div>
                      <div><span className="font-semibold text-[#131e63]">Open to matching:</span> {formatReadinessValue(selectedDetail.readiness?.open_to_matching)}</div>
                    </div>
                  </section>
                  {(selectedDetail.avatar_public_url || selectedDetail.avatar_bucket_path) && (
                    <section className="space-y-1 text-xs">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">Avatar</h3>
                      {selectedDetail.avatar_public_url && (
                        <a href={selectedDetail.avatar_public_url} target="_blank" rel="noreferrer" className="text-[#131e63] underline">
                          View uploaded image
                        </a>
                      )}
                      <p className="text-[#131e63]/60">Bucket path: {selectedDetail.avatar_bucket_path || "-"}</p>
                    </section>
                  )}
                </div>
              ) : (
                <p className="text-sm text-[#131e63]/70">Select an application to view full details.</p>
              )}
            </div>
          </div>
        </div>
      )}
      <SiteFooter />
    </div>
    </AdminGate>
  );
}
