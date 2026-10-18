"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { supabase } from "@/lib/supabaseClient";

const faqs = [
  {
    question: "What types of startups does Starting Block Ventures support?",
    answer:
      "Starting Block Ventures supports early-stage startups that focus on technology-driven solutions across various industries.",
  },
  {
    question: "What resources does Starting Block provide to participating startups?",
    answer:
      "Starting Block offers personalized mentorship, access to funding, workshops on critical business skills, and connections to a vast network of investors and industry leaders.",
  },
  {
    question: "How long is the Starting Block Ventures program?",
    answer:
      "The duration of the Starting Block program varies, but it typically runs for several months, during which startups receive intensive support and resources.",
  },
  {
    question: "How can I apply to join the Starting Block program?",
    answer:
      "Interested startups can contact us here. We screen all startup applications sent through this link. Provide all the information about your startup and we will go through them thoroughly.",
  },
];

const initialFormState = {
  name: "",
  organization: "",
  location: "",
  email: "",
  contactNumber: "",
  supportDetails: "",
};

type FormState = typeof initialFormState;

export default function ContactPageClient() {
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const updateField =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const { error } = await supabase.from("contact_inquiries").insert({
      name: formState.name,
      organization: formState.organization || null,
      location: formState.location || null,
      email: formState.email,
      contact_number: formState.contactNumber || null,
      support_details: formState.supportDetails || null,
    });

    if (error) {
      setStatus("error");
      setFeedback("Something went wrong. Please try again or email us directly.");
      return;
    }

    setStatus("success");
    setFeedback("Thanks for reaching out! We'll get back to you shortly.");
    setFormState(initialFormState);
  };

  return (
    <div className="font-[family:var(--font-manrope)] relative min-h-screen overflow-hidden bg-[#e6edfc] text-[#131e63]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,191,235,0.4),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0,rgba(230,237,252,0.6),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(19,30,99,0.08),transparent_75%)]" />
      </div>
      <SiteHeader />

      <main className="relative mx-auto w-full max-w-[1536px] px-4 py-16 sm:px-8 lg:px-16">
        <section className="mx-auto max-w-4xl space-y-6 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Connect, Innovate, Succeed</p>
          <h1 className="text-4xl font-semibold leading-tight text-[#131e63] sm:text-5xl">Contact Starting Block Ventures</h1>
          <p className="text-lg text-[#131e63]/80">
            Tell us about your startup, partnership idea, or investment goals. We respond within a few days with next steps.
          </p>
        </section>

        <section className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5 border border-[#131e63]/10 bg-white/90 p-8 shadow-[0_25px_70px_rgba(19,30,99,0.12)]">
            <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Reach out</p>
            <p className="text-base text-[#131e63]/80">
              We support founders across the Philippines and globally. Share your stage, key challenges, and the type of support you need. We'll connect you
              with the right operators, mentors, or partners.
            </p>
            <div className="grid gap-4 text-sm text-[#131e63]/75">
              <div className="border border-[#131e63]/10 bg-white/80 p-4">
                Weekly office hours with SBV.one operators, venture partners, and clinical advisors.
              </div>
              <div className="border border-[#131e63]/10 bg-white/80 p-4">
                Fast-track introductions to investors, enterprise partners, and data collaborators.
              </div>
              <div className="border border-[#131e63]/10 bg-white/80 p-4">
                Early access to demo days, accelerator events, and research briefings.
              </div>
            </div>
          </div>
          <form
            className="space-y-4 border border-[#131e63]/10 bg-white/95 p-8 shadow-[0_25px_70px_rgba(19,30,99,0.1)]"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-[#131e63]/80">Name</label>
              <input
                className="w-full border border-[#131e63]/20 bg-white px-3 py-2 text-[#131e63] placeholder-[#131e63]/40 focus:border-[#131e63] focus:outline-none"
                placeholder="Your full name"
                value={formState.name}
                onChange={updateField("name")}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.35em] text-[#131e63]/80">Organization</label>
                <input
                  className="w-full border border-[#131e63]/20 bg-white px-3 py-2 text-[#131e63] placeholder-[#131e63]/40 focus:border-[#131e63] focus:outline-none"
                  placeholder="Startup / Institution"
                  value={formState.organization}
                  onChange={updateField("organization")}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.35em] text-[#131e63]/80">Location</label>
                <input
                  className="w-full border border-[#131e63]/20 bg-white px-3 py-2 text-[#131e63] placeholder-[#131e63]/40 focus:border-[#131e63] focus:outline-none"
                  placeholder="City / Country"
                  value={formState.location}
                  onChange={updateField("location")}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.35em] text-[#131e63]/80">Email</label>
                <input
                  type="email"
                  className="w-full border border-[#131e63]/20 bg-white px-3 py-2 text-[#131e63] placeholder-[#131e63]/40 focus:border-[#131e63] focus:outline-none"
                  placeholder="name@email.com"
                  value={formState.email}
                  onChange={updateField("email")}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.35em] text-[#131e63]/80">Contact number</label>
                <input
                  className="w-full border border-[#131e63]/20 bg-white px-3 py-2 text-[#131e63] placeholder-[#131e63]/40 focus:border-[#131e63] focus:outline-none"
                  placeholder="+63 9XX XXX XXXX"
                  value={formState.contactNumber}
                  onChange={updateField("contactNumber")}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-[#131e63]/80">What support do you need?</label>
              <textarea
                rows={4}
                className="w-full border border-[#131e63]/20 bg-white px-3 py-2 text-[#131e63] placeholder-[#131e63]/40 focus:border-[#131e63] focus:outline-none"
                placeholder="Pilots, capital, regulatory, etc."
                value={formState.supportDetails}
                onChange={updateField("supportDetails")}
              />
            </div>
            {feedback && (
              <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-600"}`}>
                {feedback}
              </p>
            )}
            <button
              type="submit"
              className="w-full border border-[#131e63] bg-[#131e63] px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#101955] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : "Submit inquiry"}
            </button>
          </form>
        </section>

        <section id="faq" className="mt-16 border border-[#131e63]/10 bg-white/90 p-10 shadow-[0_25px_70px_rgba(19,30,99,0.12)]">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">FAQs</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#131e63]">Answers to common questions.</h2>
            <p className="mt-3 text-sm text-[#131e63]/70">Still curious? Reach out anytime and we'll walk you through the program.</p>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="flex flex-col gap-4 border border-[#131e63]/10 bg-[#f8fbff] p-6 shadow-[0_10px_30px_rgba(19,30,99,0.08)] md:flex-row md:items-start"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#8dbfeb] md:w-1/3">{faq.question}</p>
                <p className="text-base text-[#131e63]/85 md:w-2/3">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
