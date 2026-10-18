import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AdminGate from "@/components/AdminGate";

const adminSections = [
  {
    title: "Contact inquiries",
    description: "View and triage submissions from the public contact form.",
    href: "/admin/contact-form",
  },
  {
    title: "FutureCare intake",
    description: "Review FutureCare Innovator Fellowship applications.",
    href: "/admin/fif-intake-form",
  },
];

export const metadata: Metadata = {
  title: "SBV.one | Admin Console",
  description: "Secure SBV.one admin console to access contact inquiries and FutureCare intake dashboards.",
};

export default function AdminPage() {
  return (
    <AdminGate>
      <div className="font-[family:var(--font-manrope)] relative min-h-screen overflow-hidden bg-[#f3f6ff] text-[#131e63]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,191,235,0.3),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0,rgba(230,237,252,0.5),transparent_70%)]" />
        </div>
        <SiteHeader />
        <main className="relative mx-auto w-full max-w-5xl px-4 py-16 sm:px-8">
          <section className="space-y-6 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Admin Console</p>
            <h1 className="text-4xl font-semibold text-[#131e63]">Operational dashboards</h1>
            <p className="text-base text-[#131e63]/80">Jump into the submission views you need most often.</p>
          </section>
          <section className="mt-12 grid gap-6 md:grid-cols-2">
            {adminSections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className="group relative block border border-[#131e63]/15 bg-white/95 p-6 text-left shadow-[0_15px_40px_rgba(19,30,99,0.08)] transition hover:-translate-y-1 hover:border-[#131e63]/40"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">View</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#131e63]">{section.title}</h2>
                <p className="mt-3 text-sm text-[#131e63]/70">{section.description}</p>
                <span className="mt-6 inline-flex items-center text-xs font-semibold uppercase tracking-[0.35em] text-[#131e63]/80">
                  Open dashboard -&gt;
                </span>
              </Link>
            ))}
          </section>
        </main>
        <SiteFooter />
      </div>
    </AdminGate>
  );
}
