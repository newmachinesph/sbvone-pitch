"use client";

import NextImage from "next/image";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { supabase, supabaseUploadClient } from "@/lib/supabaseClient";

const steps = [
  "Overview",
  "Application Type",
  "Founder / Team Profile",
  "Problem & Motivation",
  "AI Readiness",
  "Commitment",
  "Review & Submit",
];

const mindsetDimensions = [
  { key: "problem", label: "Problem obsession" },
  { key: "execution", label: "Execution speed" },
  { key: "collaboration", label: "Collaboration energy" },
];

const helperMessages = [
  "Preview the fellowship journey and confirm it matches your goals.",
  "Choose whether you are applying solo or as an existing team.",
  "Share a crisp profile so we can understand who is leading the work.",
  "Describe the care gap, the proof you have, and the motivation behind it.",
  "Summarize your AI toolkit, challenges, and founder archetypes.",
  "Let us know your availability, runway, and how you prefer to work.",
  "Review every answer before you submit so nothing gets lost.",
];

export default function FIFIntakeWizard() {
  const [step, setStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(0);
  const [applicationType, setApplicationType] = useState<"individual" | "group">("individual");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const storedValuesRef = useRef<Map<string, FormDataEntryValue[]>>(new Map());
  const [memberCount, setMemberCount] = useState(1);
  const [isCurrentStepValid, setIsCurrentStepValid] = useState(true);

  const persistFormData = useCallback((providedFormData?: FormData) => {
    if (!formRef.current) return;
    const map = storedValuesRef.current;
    const fields = formRef.current.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input[name], textarea[name], select[name]");
    const fieldNames = new Set<string>();
    fields.forEach((field) => {
      fieldNames.add(field.name);
    });
    fieldNames.forEach((name) => {
      map.delete(name);
    });
    const formData = providedFormData ?? new FormData(formRef.current);
    const processed = new Set<string>();
    formData.forEach((_value, key) => {
      if (processed.has(key)) return;
      map.set(key, formData.getAll(key));
      processed.add(key);
    });
  }, []);

  const createSnapshotFormData = useCallback(() => {
    const snapshot = new FormData();
    storedValuesRef.current.forEach((values, key) => {
      values.forEach((value) => snapshot.append(key, value));
    });
    return snapshot;
  }, []);

  const getValue = useCallback((name: string) => storedValuesRef.current.get(name)?.[0]?.toString() ?? "", []);
  const getValues = useCallback((name: string) => storedValuesRef.current.get(name)?.map((entry) => entry.toString()) ?? [], []);
  const isChecked = useCallback(
    (name: string, value: string) => storedValuesRef.current.get(name)?.some((entry) => entry.toString() === value) ?? false,
    [],
  );

  const back = () => {
    persistFormData();
    setSubmitState("idle");
    setSubmitError(null);
    setStep((current) => Math.max(current - 1, 0));
  };
  const goTo = (index: number) => {
    if (index > maxStepReached) return;
    persistFormData();
    setSubmitState("idle");
    setSubmitError(null);
    setStep(index);
  };

  const handleMemberCountChange = useCallback(
    (nextCount: number) => {
      setMemberCount((prev) => {
        if (nextCount < prev) {
          for (let index = nextCount; index < prev; index += 1) {
            ["name", "email", "role", "strength"].forEach((field) => {
              storedValuesRef.current.delete(`member-${index}-${field}`);
            });
          }
        }
        return nextCount;
      });
    },
    [],
  );

  useEffect(() => {
    if (applicationType === "individual") {
      handleMemberCountChange(1);
    }
  }, [applicationType, handleMemberCountChange]);

  const helperMessages = [
    "Preview the fellowship journey and confirm it matches your goals.",
    "Choose whether you are applying solo or as an existing team.",
    "Share a crisp profile so we can understand who is leading the work.",
    "Describe the care gap, the proof you have, and the motivation behind it.",
    "Summarize your AI toolkit, challenges, and founder archetypes.",
    "Let us know your availability, runway, and how you prefer to work.",
    "Review every answer before you submit so nothing gets lost.",
  ];

  const helperCopy = useMemo(() => helperMessages[step] ?? "", [step]);

  const fieldAccessors = useMemo(
    () => ({
      getValue,
      getValues,
      isChecked,
    }),
    [getValue, getValues, isChecked],
  );

  useEffect(() => {
    const formElement = formRef.current;
    if (!formElement) return;
    const handleInput = () => {
      const currentFormData = new FormData(formElement);
      persistFormData(currentFormData);
      setIsCurrentStepValid(isStepFieldsComplete(currentFormData, step, applicationType, memberCount));
    };

    formElement.addEventListener("input", handleInput);
    formElement.addEventListener("change", handleInput);
    handleInput();

    return () => {
      formElement.removeEventListener("input", handleInput);
      formElement.removeEventListener("change", handleInput);
    };
  }, [applicationType, memberCount, persistFormData, step]);

  const handlePrimaryAction = async () => {
    if (!formRef.current) return;
    const formDataForStep = new FormData(formRef.current);
    const readyForNext = isStepFieldsComplete(formDataForStep, step, applicationType, memberCount);
    setIsCurrentStepValid(readyForNext);
    if (!readyForNext) {
      return;
    }
    persistFormData(formDataForStep);
    if (step < steps.length - 1) {
      setSubmitState("idle");
      setSubmitError(null);
      setStep((current) => {
        const next = Math.min(current + 1, steps.length - 1);
        setMaxStepReached((prev) => Math.max(prev, next));
        return next;
      });
      return;
    }

    const formData = createSnapshotFormData();
    const payload = buildApplicationPayload(formData, applicationType);

    if (!payload.first_name || !payload.last_name || !payload.email) {
      setSubmitError("First name, last name, and email are required.");
      setSubmitState("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");
    setSubmitError(null);

    try {
      const { data: inserted, error } = await supabase
        .from("fif_applications")
        .insert(payload)
        .select("id")
        .single();

      if (error) {
        throw error;
      }

      const applicationId = inserted?.id;

      if (applicationId && avatarPreview) {
        const avatarBlob = await dataUrlToBlob(avatarPreview);
        const storagePath = `avatars/${applicationId}.jpg`;
        const { error: uploadError } = await supabaseUploadClient.storage
          .from("fif-intake-form")
          .upload(storagePath, avatarBlob, { contentType: "image/jpeg", upsert: true });

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabaseUploadClient.storage.from("fif-intake-form").getPublicUrl(storagePath);

        const { error: updateError } = await supabase
          .from("fif_applications")
          .update({
            avatar_bucket_path: storagePath,
            avatar_public_url: publicUrl,
          })
          .eq("id", applicationId);

        if (updateError) {
          throw updateError;
        }
      }

      setSubmitState("success");
      storedValuesRef.current.clear();
      formRef.current?.reset();
      setAvatarPreview(null);
      setApplicationType("individual");
      handleMemberCountChange(1);
      setStep(0);
      setMaxStepReached(0);
    } catch (error) {
      setSubmitState("error");
      setSubmitError(error instanceof Error ? error.message : "Unable to submit your application right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e6edfc] text-[#131e63] font-[family:var(--font-manrope)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,191,235,0.35),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0,rgba(230,237,252,0.55),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(19,30,99,0.08),transparent_80%)]" />
      </div>
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl">
          <form
            ref={formRef}
            className="rounded-[32px] border border-[#131e63]/10 bg-white/90 p-6 shadow-[0_25px_70px_rgba(19,30,99,0.12)] backdrop-blur md:p-10 space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold text-[#131e63]">FutureCare Innovator Fellowship Intake</h1>
              <p className="text-sm text-[#131e63]/70 max-w-2xl">
                Apply on your own or with a team. Highlight the care gap you obsess over, the proof you already have, and how you use AI to ship faster.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#131e63]/70 uppercase tracking-[0.3em]">
                <span>
                  Step {step + 1} of {steps.length} · {steps[step]}
                </span>
                <span>FutureCare Innovator Fellowship</span>
              </div>
              <div className="relative flex items-center gap-2">
                <div className="flex-1 h-1 bg-[#131e63]/15 rounded-full overflow-hidden">
                  <div className="h-full bg-[#131e63] transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
                </div>
              </div>
              <div className="hidden md:flex justify-between text-[11px] text-[#131e63]/50">
                {steps.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => goTo(index)}
                    disabled={index > maxStepReached}
                    className={`truncate max-w-[7rem] text-left transition ${
                      index === step
                        ? "text-[#131e63] font-semibold"
                        : index < step
                          ? "text-[#131e63]/70"
                          : "text-[#131e63]/40 disabled:cursor-not-allowed"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#131e63]/10 rounded-3xl p-4 md:p-8 bg-white/80">
              {step === 0 && <OverviewStep />}
              {step === 1 && <ApplicationTypeStep applicationType={applicationType} onChange={setApplicationType} />}
              {step === 2 && (
                <FounderProfileStep
                  applicationType={applicationType}
                  avatarPreview={avatarPreview}
                  onAvatarChange={setAvatarPreview}
                  memberCount={memberCount}
                  onMemberCountChange={handleMemberCountChange}
                  {...fieldAccessors}
                />
              )}
              {step === 3 && <ProblemMotivationStep applicationType={applicationType} {...fieldAccessors} />}
              {step === 4 && <AIReadinessStep {...fieldAccessors} />}
              {step === 5 && <CommitmentStep applicationType={applicationType} {...fieldAccessors} />}
              {step === 6 && <ReviewStep applicationType={applicationType} />}
            </div>

            {submitState === "success" && (
              <div className="rounded-2xl border border-[#131e63]/20 bg-[#8dbfeb]/10 px-4 py-3 text-sm text-[#131e63]">
                Application submitted. Our team will follow up via email.
              </div>
            )}
            {submitState === "error" && submitError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
              <div className="text-xs text-[#131e63]/70 max-w-sm">{helperCopy}</div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs md:text-sm border border-[#131e63]/20 text-[#131e63] disabled:opacity-40 disabled:cursor-not-allowed bg-white/90 hover:border-[#131e63]/40"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handlePrimaryAction}
                  disabled={isSubmitting || !isCurrentStepValid}
                  className="inline-flex items-center justify-center rounded-full px-5 py-2 text-xs md:text-sm font-semibold bg-[#131e63] text-white hover:bg-[#101955] disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : step === steps.length - 1 ? "Submit application" : "Next"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

type StepProps = {
  applicationType: "individual" | "group";
};

type ValueAccessors = {
  getValue: (name: string) => string;
  getValues: (name: string) => string[];
  isChecked: (name: string, value: string) => boolean;
};

type FounderProfileProps = StepProps &
  ValueAccessors & {
    avatarPreview: string | null;
    onAvatarChange: (value: string | null) => void;
    memberCount: number;
    onMemberCountChange: (count: number) => void;
  };

function CardShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">{eyebrow}</p>
        <h2 className="text-lg font-semibold text-[#131e63]">{title}</h2>
        {subtitle && <p className="text-sm text-[#131e63]/70 max-w-xl">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function OverviewStep() {
  return (
    <CardShell
      eyebrow="FutureCare flow"
      title="From spark to FutureCare builder"
      subtitle="We back curious operators, clinicians, and technologists who obsess over real care gaps and can ship with AI."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-3 text-[#131e63]/85">
          <h3 className="text-xs font-semibold tracking-wide text-[#131e63]/85 uppercase">What we look for</h3>
          <p>Founder mindset, clear problem statements, bias to experiment, collaborative energy, and a healthy respect for AI tooling.</p>
          <p className="text-xs text-[#131e63]/70">Your answers plus any shared links help us calibrate interviews and team formation.</p>
        </div>
        <div className="space-y-3 text-[#131e63]/85">
          <h3 className="text-xs font-semibold tracking-wide text-[#131e63]/85 uppercase">Ideal profiles</h3>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li>Engineering / Data</li>
            <li>Design / Product</li>
            <li>Clinical operators</li>
            <li>Biz / Ops / Policy</li>
            <li>Researchers & analysts</li>
          </ul>
          <p className="text-xs text-[#131e63]/70">Shared traits: curiosity, clarity, resilience, and a mission-first outlook.</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {[
          { label: "Step 1 · Online Application", detail: "Story, focus, AI snapshot." },
          { label: "Step 2 · Interview & Map", detail: "Live conversation and archetype tags." },
          { label: "Step 3 · Team Formation", detail: "Balanced squads go build." },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-[#131e63]/15 bg-white px-3 py-2">
            <p className="font-semibold text-[#131e63] text-[11px] uppercase mb-1">{card.label}</p>
            <p className="text-[#131e63]/70 text-xs">{card.detail}</p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function ApplicationTypeStep({
  applicationType,
  onChange,
}: {
  applicationType: "individual" | "group";
  onChange: (type: "individual" | "group") => void;
}) {
  return (
    <CardShell
      eyebrow="Step 1 · Application Type"
      title="How are you applying?"
      subtitle="Pick individual or group. You can still be matched or paired later if we see gaps."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        {[
          {
            key: "individual" as const,
            eyebrow: "Solo founder",
            title: "I'm applying on my own.",
            description: "Join a curated cohort and we will surround you with complementary builders.",
          },
          {
            key: "group" as const,
            eyebrow: "Existing team",
            title: "We're applying together.",
            description: "2-5 collaborators who already build together. We still assess skills, archetypes, and gap coverage.",
          },
        ].map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`text-left rounded-2xl border px-4 py-4 space-y-2 transition ${
              applicationType === option.key ? "border-[#131e63] bg-[#131e63]/5" : "border-[#131e63]/15 bg-white hover:border-[#131e63]/40"
            }`}
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#131e63]/70">{option.eyebrow}</p>
            <p className="font-semibold text-[#131e63]">{option.title}</p>
            <p className="text-xs text-[#131e63]/70">{option.description}</p>
          </button>
        ))}
      </div>
    </CardShell>
  );
}

function Input({
  label,
  id,
  name,
  type = "text",
  placeholder,
  defaultValue,
}: {
  label: string;
  id: string;
  name?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  const fieldName = name ?? id;
  return (
    <div>
      <label className="block text-sm text-[#131e63]/85 mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={fieldName}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-[#131e63]/15 bg-white px-3 py-2 text-sm focus:border-[#131e63] focus:outline-none focus:ring-1 focus:ring-[#131e63]"
      />
    </div>
  );
}

function TextArea({
  label,
  id,
  name,
  rows = 3,
  placeholder,
  defaultValue,
}: {
  label: string;
  id: string;
  name?: string;
  rows?: number;
  placeholder?: string;
  defaultValue?: string;
}) {
  const fieldName = name ?? id;
  return (
    <div>
      <label className="block text-sm text-[#131e63]/85 mb-1" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        name={fieldName}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-[#131e63]/15 bg-white px-3 py-2 text-sm focus:border-[#131e63] focus:outline-none focus:ring-1 focus:ring-[#131e63]"
      />
    </div>
  );
}

function FounderProfileStep({
  applicationType,
  avatarPreview,
  onAvatarChange,
  memberCount,
  onMemberCountChange,
  getValue,
}: FounderProfileProps) {
  const isIndividual = applicationType === "individual";

  const addMember = () => onMemberCountChange(Math.min(4, memberCount + 1));
  const removeMember = () => onMemberCountChange(Math.max(1, memberCount - 1));

  return (
    <CardShell
      eyebrow="Step 2 · Profile"
      title={isIndividual ? "Founder snapshot" : "Team + lead snapshot"}
      subtitle={isIndividual ? "Share the essentials so we know how to place you." : "Tell us about the group and who is the primary contact."}
    >
      <AvatarUploader value={avatarPreview} onChange={onAvatarChange} />

      {!isIndividual && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="teamName"
              name="teamName"
              label="Team or project name"
              placeholder="FutureCare Labs (optional)"
              defaultValue={getValue("teamName")}
            />
            <div>
              <label className="block text-sm text-[#131e63]/85 mb-1" htmlFor="teamSize">
                How many people? (2-5)
              </label>
              <input
                id="teamSize"
                name="teamSize"
                type="number"
                min={2}
                max={5}
                placeholder="2"
                defaultValue={getValue("teamSize")}
                className="w-full rounded-lg border border-[#131e63]/15 bg-white px-3 py-2 text-sm focus:border-[#131e63] focus:outline-none focus:ring-1 focus:ring-[#131e63]"
              />
            </div>
            <Input id="teamDuration" name="teamDuration" label="How long together?" placeholder="e.g. 6 months" defaultValue={getValue("teamDuration")} />
          </div>
          <Input
            id="teamWebsite"
            name="teamWebsite"
            label="Live site, deck, or prototype link"
            type="url"
            placeholder="https://project-site.com"
            defaultValue={getValue("teamWebsite")}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input id="firstName" name="firstName" label="First name" placeholder="Alex" defaultValue={getValue("firstName")} />
        <Input id="lastName" name="lastName" label="Last name" placeholder="Santos" defaultValue={getValue("lastName")} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="email"
          name="email"
          label={isIndividual ? "Email" : "Lead contact email"}
          type="email"
          placeholder="you@example.com"
          defaultValue={getValue("email")}
        />
        <Input
          id="location"
          name="location"
          label={isIndividual ? "Location" : "Primary working location"}
          placeholder="City, Country"
          defaultValue={getValue("location")}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="background"
          name="background"
          label={isIndividual ? "Primary background" : "Lead founder background"}
          placeholder="Clinical, engineering, design, ops..."
          defaultValue={getValue("background")}
        />
        <Input
          id="linkedin"
          name="linkedin"
          label={isIndividual ? "LinkedIn or site" : "Team / lead link"}
          type="url"
          placeholder="https://linkedin.com/in/you"
          defaultValue={getValue("linkedin")}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#131e63]/85 mb-1" htmlFor="experience">
            {isIndividual ? "Years of experience" : "Lead founder experience"}
          </label>
          <select
            id="experience"
            name="experience"
            defaultValue={getValue("experience")}
            className="w-full rounded-lg border border-[#131e63]/15 bg-white px-3 py-2 text-sm focus:border-[#131e63] focus:outline-none focus:ring-1 focus:ring-[#131e63]"
          >
            <option value="">Select</option>
            <option>&lt; 2 years</option>
            <option>2-4 years</option>
            <option>5-7 years</option>
            <option>8-10 years</option>
            <option>10+ years</option>
          </select>
        </div>
        <Input
          id="strengths"
          name="strengths"
          label={isIndividual ? "Top strengths" : "Team superpowers"}
          placeholder={isIndividual ? "Sales, data, design, clinical insight" : "Clinical access, prototyping, GTM motion"}
          defaultValue={getValue("strengths")}
        />
      </div>

      {!isIndividual && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-[#131e63]">Team members (2-5 people incl. lead)</p>
              <p className="text-xs text-[#131e63]/70">This section is for additional members beyond the lead. Minimum 1 extra, maximum 4.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={removeMember}
                disabled={memberCount === 1}
                className="rounded-full border border-[#131e63]/15 px-3 py-1 text-xs text-[#131e63]/85 disabled:opacity-40"
              >
                - Remove
              </button>
              <button
                type="button"
                onClick={addMember}
                disabled={memberCount === 4}
                className="rounded-full border border-[#131e63]/15 px-3 py-1 text-xs text-[#131e63]/85 disabled:opacity-40"
              >
                + Add
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: memberCount }, (_, index) => (
              <div key={index} className="rounded-2xl border border-[#131e63]/15 bg-white p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#131e63]/70">Member {index + 1}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    id={`member-${index}-name`}
                    label="Full name"
                    placeholder="Full name"
                    defaultValue={getValue(`member-${index}-name`)}
                  />
                  <Input
                    id={`member-${index}-email`}
                    label="Email"
                    type="email"
                    placeholder="member@example.com"
                    defaultValue={getValue(`member-${index}-email`)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    id={`member-${index}-role`}
                    label="Role / archetype"
                    placeholder="Hacker, Hipster, Hustler..."
                    defaultValue={getValue(`member-${index}-role`)}
                  />
                  <Input
                    id={`member-${index}-strength`}
                    label="Key strength"
                    placeholder="Clinical access, AI build, GTM..."
                    defaultValue={getValue(`member-${index}-strength`)}
                  />
                </div>
              </div>
            ))}
          </div>
          <TextArea
            id="teamGaps"
            name="teamGaps"
            label="Where are the gaps?"
            rows={4}
            placeholder="Need a clinician, more eng, GTM support..."
            defaultValue={getValue("teamGaps")}
          />
        </div>
      )}

      <TextArea
        id="founderStory"
        name="founderStory"
        label={isIndividual ? "Short founder story" : "Short team story"}
        rows={4}
        placeholder={isIndividual ? "What nudged you toward HealthTech + startups?" : "How did the group form and why this space?"}
        defaultValue={getValue("founderStory")}
      />
    </CardShell>
  );
}

function ProblemMotivationStep({ applicationType, getValue }: StepProps & ValueAccessors) {
  const isIndividual = applicationType === "individual";

  return (
    <CardShell
      eyebrow="Step 3 · Problem & motivation"
      title="Care gaps that keep you up"
      subtitle="Obsessions beat perfect pitch decks. Share the gap, the why, and any scrappy proof."
    >
      <TextArea
        id="careGap"
        name="careGap"
        label={isIndividual ? "What care gap are you chasing?" : "What care gap is the team chasing?"}
        rows={4}
        placeholder="Describe the part of healthcare that feels broken or ignored."
        defaultValue={getValue("careGap")}
      />
      <TextArea
        id="motivation"
        name="motivation"
        label={isIndividual ? "Why this space, why now?" : "Why this space for the team, why now?"}
        rows={3}
        placeholder="Any personal hook, key insight, or urgency for the next 5-10 years."
        defaultValue={getValue("motivation")}
      />
      <TextArea
        id="users"
        name="users"
        label={isIndividual ? "First users / customers?" : "Who would your first users be?"}
        rows={3}
        placeholder="Nurses in public hospitals, caregivers, care teams, etc."
        defaultValue={getValue("users")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextArea
          id="attempts"
          name="attempts"
          label={isIndividual ? "Tried anything yet?" : "Has the team tested anything yet?"}
          rows={3}
          placeholder="Experiments, interviews, pilots. Outcomes welcome, even if messy."
          defaultValue={getValue("attempts")}
        />
        <div className="space-y-3 text-xs">
          <p className="font-semibold text-[#131e63]">Founder mindset snapshot</p>
          <p className="text-[#131e63]/70">Tap where you feel today. This is context, not a score.</p>
          <div className="space-y-2">
            {mindsetDimensions.map((dimension) => (
              <MindsetSelector
                key={dimension.key}
                name={`mindset_${dimension.key}`}
                label={dimension.label}
                defaultValue={getValue(`mindset_${dimension.key}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function MindsetSelector({ name, label, defaultValue }: { name: string; label: string; defaultValue?: string }) {
  const selected = Number(defaultValue ?? "");
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[11px] text-[#131e63]/70">
        <span>{label}</span>
        <span>Self check</span>
      </div>
      <div className="flex justify-between text-[10px] text-[#131e63]/50 mb-1">
        <span>Early</span>
        <span>Evolving</span>
        <span>Strong</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3].map((level) => (
          <label key={level} className="flex-1">
            <input type="radio" name={name} value={level} className="peer sr-only" defaultChecked={selected === level} />
            <span className="flex h-6 items-center justify-center rounded-full border border-[#131e63]/15 bg-white text-[10px] text-[#131e63]/70 transition peer-checked:border-[#131e63] peer-checked:bg-[#131e63]/10 peer-checked:text-[#131e63]">
              {level}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function AIReadinessStep({ getValue, isChecked }: ValueAccessors) {
  return (
    <CardShell eyebrow="Step 4 · AI readiness" title="AI co-pilot habits" subtitle="Explain how you already use AI and how you'd spin it up in week one.">
      <TextArea
        id="aiTools"
        name="aiTools"
        label="How are you using AI tools today?"
        rows={3}
        placeholder="List AI tools (ChatGPT, Claude, Notion AI, scripts) and how you use them."
        defaultValue={getValue("aiTools")}
      />
      <TextArea
        id="aiChallenge"
        name="aiChallenge"
        label="Mini-challenge: first 2 weeks with AI?"
        rows={5}
        placeholder="Bullet a plan for research, synthesis, idea generation, prototyping, or user discovery."
        defaultValue={getValue("aiChallenge")}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 text-xs">
          <p className="font-semibold text-[#131e63]">AI comfort level</p>
          <div className="flex gap-2">
            {["New to AI", "Practical user", "Builder / advanced"].map((label) => (
              <label
                key={label}
                className="flex-1 cursor-pointer"
              >
                <input type="radio" name="aiLevel" value={label} className="peer sr-only" defaultChecked={getValue("aiLevel") === label} />
                <span className="inline-flex w-full items-center justify-center rounded-full border border-[#131e63]/15 bg-white px-2 py-2 text-[11px] text-center text-[#131e63]/70 transition peer-checked:border-[#131e63] peer-checked:bg-[#131e63]/10 peer-checked:text-[#131e63]">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2 text-xs">
          <p className="font-semibold text-[#131e63]">Founder personality indicators</p>
          <p className="text-[#131e63]/70">Pick the 2-3 that feel true today.</p>
          <div className="flex flex-wrap gap-2">
            {["Hacker", "Hipster", "Hustler", "Clinician", "Analyst"].map((tag) => (
              <label key={tag} className="cursor-pointer">
                <input type="checkbox" name="personalities" value={tag} className="peer sr-only" defaultChecked={isChecked("personalities", tag)} />
                <span className="inline-flex items-center justify-center rounded-full border border-[#131e63]/15 bg-white px-3 py-1 text-[11px] text-[#131e63]/70 transition peer-checked:border-[#131e63] peer-checked:bg-[#131e63]/10 peer-checked:text-[#131e63]">
                  {tag}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function CommitmentStep({ applicationType, getValue, isChecked }: StepProps & ValueAccessors) {
  const isIndividual = applicationType === "individual";

  return (
    <CardShell
      eyebrow="Step 5 · Commitment"
      title="Time, runway, and working style"
      subtitle="We bias toward founders who can keep promises and ship with teams."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-[#131e63]/85 mb-1" htmlFor="hours">
            {isIndividual ? "Hours per week you can commit" : "Hours per week your team can commit"}
          </label>
          <select
            id="hours"
            name="hours"
            defaultValue={getValue("hours")}
            className="w-full rounded-lg border border-[#131e63]/15 bg-white px-3 py-2 text-sm focus:border-[#131e63] focus:outline-none focus:ring-1 focus:ring-[#131e63]"
          >
            <option value="">Select</option>
            <option>10-15 hours</option>
            <option>15-25 hours</option>
            <option>25-40 hours</option>
            <option>Full-time+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-[#131e63]/85 mb-1" htmlFor="runway">
            {isIndividual ? "Runway (months you can focus)" : "Runway (months team can focus)"}
          </label>
          <select
            id="runway"
            name="runway"
            defaultValue={getValue("runway")}
            className="w-full rounded-lg border border-[#131e63]/15 bg-white px-3 py-2 text-sm focus:border-[#131e63] focus:outline-none focus:ring-1 focus:ring-[#131e63]"
          >
            <option value="">Select</option>
            <option>&lt; 3 months</option>
            <option>3-6 months</option>
            <option>6-12 months</option>
            <option>12+ months</option>
          </select>
        </div>
      </div>
      <div className="space-y-3 text-xs">
        <p className="font-semibold text-[#131e63]">Practical readiness</p>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Reliable laptop + internet", name: "readiness_devices" },
            { label: "Can attend live sessions in stated time zone", name: "readiness_attend" },
            { label: "Open to being matched with teammates", name: "readiness_matching" },
          ].map((item) => (
            <label key={item.name} className="inline-flex items-center gap-2 border border-[#131e63]/15 rounded-full px-3 py-1 bg-white cursor-pointer hover:border-[#131e63]/40">
              <input type="checkbox" name={item.name} value="yes" className="h-3 w-3 rounded border-[#131e63]/30" defaultChecked={isChecked(item.name, "yes")} />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
      <TextArea
        id="teamFit"
        name="teamFit"
        label={isIndividual ? "What kind of teammates unlock you?" : "How does the team decide + communicate?"}
        rows={3}
        placeholder={
          isIndividual ? "Working styles, comms habits, what brings out your best." : "Decision rituals, comms norms, conflict habits."
        }
        defaultValue={getValue("teamFit")}
      />
      <TextArea
        id="constraints"
        name="constraints"
        label="Any constraints (time zones, caregiving, clinic schedule, etc.)?"
        rows={3}
        placeholder="Helps us build realistic teams."
        defaultValue={getValue("constraints")}
      />
    </CardShell>
  );
}

function ReviewStep({ applicationType }: StepProps) {
  const isIndividual = applicationType === "individual";

  return (
    <CardShell
      eyebrow="Step 6 · Review"
      title="Check, breathe, submit"
      subtitle="In production you'll see every answer here before submitting."
    >
      <div className="space-y-4 text-sm text-[#131e63]/85">
        <p>
          We'll surface your {isIndividual ? "founder" : "team"} profile, problem focus, and AI readiness plus the short FutureCare journey:
          Apply → Interview & Strength Map → Team Formation → Fellowship → Immersion → Build.
        </p>
        <div className="rounded-xl border border-dashed border-[#131e63]/15 bg-white px-3 py-3 text-xs text-[#131e63]/70 space-y-2">
          <p className="font-semibold text-[#131e63]">Before you submit</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Double-check contact info and backgrounds (plus member list if you're a group).</li>
            <li>Make sure the care-gap focus and motivation blurbs feel true to you.</li>
            <li>Confirm you're aligned with the commitment and runway you entered.</li>
          </ul>
        </div>
        <p className="text-xs text-[#131e63]/70">
          After submission we review for clarity, grit, learning speed, and likely archetypes (Hacker, Hipster, Hustler, Clinician, Analyst).
        </p>
      </div>
      <p className="text-[11px] text-[#131e63]/50">
        By submitting you acknowledge this is an application to the FutureCare Innovator Fellowship and final selection is at SBV.one's discretion.
      </p>
    </CardShell>
  );
}

type MemberPayload = {
  full_name: string | null;
  email: string | null;
  role_archetype: string | null;
  strength: string | null;
};

type MindsetPayload = {
  problem: number | null;
  execution: number | null;
  collaboration: number | null;
};

type ReadinessPayload = {
  has_devices: boolean;
  can_attend: boolean;
  open_to_matching: boolean;
};

type ApplicationInsertPayload = {
  application_type: "individual" | "group";
  is_submitted: boolean;
  first_name: string;
  last_name: string;
  email: string;
  location: string | null;
  primary_background: string | null;
  linkedin_url: string | null;
  years_experience: string | null;
  strengths: string | null;
  story: string | null;
  team_name: string | null;
  team_size: number | null;
  team_duration: string | null;
  team_gaps: string | null;
  members: MemberPayload[] | null;
  team_website: string | null;
  care_gap: string | null;
  motivation: string | null;
  users: string | null;
  attempts: string | null;
  mindset: MindsetPayload | null;
  ai_tools: string | null;
  ai_challenge: string | null;
  ai_level: string | null;
  personalities: string[] | null;
  hours_per_week: string | null;
  runway: string | null;
  team_fit: string | null;
  constraints: string | null;
  readiness: ReadinessPayload;
};

function buildApplicationPayload(formData: FormData, applicationType: "individual" | "group"): ApplicationInsertPayload {
  const first_name = toRequiredText(formData.get("firstName"));
  const last_name = toRequiredText(formData.get("lastName"));
  const email = toRequiredText(formData.get("email"));

  const members = collectMembers(formData);
  const normalizedMembers = applicationType === "group" && members.length ? members : null;

  const readiness: ReadinessPayload = {
    has_devices: formData.get("readiness_devices") === "yes",
    can_attend: formData.get("readiness_attend") === "yes",
    open_to_matching: formData.get("readiness_matching") === "yes",
  };

  const mindset: MindsetPayload = {
    problem: toNumber(formData.get("mindset_problem")),
    execution: toNumber(formData.get("mindset_execution")),
    collaboration: toNumber(formData.get("mindset_collaboration")),
  };
  const normalizedMindset = Object.values(mindset).some((value) => value !== null) ? mindset : null;

  const personalities = formData.getAll("personalities").map((entry) => entry.toString());
  const normalizedPersonalities = personalities.length ? personalities : null;

  const teamSizeValue = toNumber(formData.get("teamSize"));

  return {
    application_type: applicationType,
    is_submitted: true,
    first_name,
    last_name,
    email,
    location: toOptionalText(formData.get("location")),
    primary_background: toOptionalText(formData.get("background")),
    linkedin_url: toOptionalText(formData.get("linkedin")),
    years_experience: toOptionalText(formData.get("experience")),
    strengths: toOptionalText(formData.get("strengths")),
    story: toOptionalText(formData.get("founderStory")),
    team_name: toOptionalText(formData.get("teamName")),
    team_size: teamSizeValue,
    team_duration: toOptionalText(formData.get("teamDuration")),
    team_gaps: toOptionalText(formData.get("teamGaps")),
    members: normalizedMembers,
    team_website: toOptionalText(formData.get("teamWebsite")),
    care_gap: toOptionalText(formData.get("careGap")),
    motivation: toOptionalText(formData.get("motivation")),
    users: toOptionalText(formData.get("users")),
    attempts: toOptionalText(formData.get("attempts")),
    mindset: normalizedMindset,
    ai_tools: toOptionalText(formData.get("aiTools")),
    ai_challenge: toOptionalText(formData.get("aiChallenge")),
    ai_level: toOptionalText(formData.get("aiLevel")),
    personalities: normalizedPersonalities,
    hours_per_week: toOptionalText(formData.get("hours")),
    runway: toOptionalText(formData.get("runway")),
    team_fit: toOptionalText(formData.get("teamFit")),
    constraints: toOptionalText(formData.get("constraints")),
    readiness,
  };
}

function isStepFieldsComplete(formData: FormData, step: number, applicationType: "individual" | "group", memberCount: number): boolean {
  const hasValue = (value: FormDataEntryValue | null) => {
    if (value === null) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (value instanceof File) return value.size > 0;
    return true;
  };
  const requireAll = (fields: string[]) => fields.every((field) => hasValue(formData.get(field)));

  switch (step) {
    case 0:
      return true;
    case 1:
      return applicationType === "individual" || applicationType === "group";
    case 2: {
      const commonFields = ["firstName", "lastName", "email", "location", "background", "linkedin", "experience", "strengths", "founderStory"];
      if (!requireAll(commonFields)) {
        return false;
      }
      if (applicationType === "group") {
        if (!requireAll(["teamSize", "teamDuration", "teamGaps"])) {
          return false;
        }
        const teamSizeValue = Number(formData.get("teamSize"));
        if (!Number.isInteger(teamSizeValue) || teamSizeValue < 2 || teamSizeValue > 5) {
          return false;
        }
        for (let index = 0; index < memberCount; index += 1) {
          if (
            !requireAll([
              `member-${index}-name`,
              `member-${index}-email`,
              `member-${index}-role`,
              `member-${index}-strength`,
            ])
          ) {
            return false;
          }
        }
      }
      return true;
    }
    case 3:
      return (
        requireAll(["careGap", "motivation", "users", "attempts"]) &&
        requireAll(["mindset_problem", "mindset_execution", "mindset_collaboration"])
      );
    case 4:
      return requireAll(["aiTools", "aiChallenge", "aiLevel"]) && formData.getAll("personalities").length > 0;
    case 5:
      return requireAll(["hours", "runway", "teamFit", "constraints"]);
    case 6:
      return true;
    default:
      return true;
  }
}

function collectMembers(formData: FormData): MemberPayload[] {
  const bucket = new Map<number, Partial<MemberPayload>>();

  formData.forEach((value, key) => {
    const match = key.match(/^member-(\d+)-(name|email|role|strength)$/);
    if (!match) return;
    const index = Number(match[1]);
    const field = match[2];
    const current = bucket.get(index) ?? {};
    if (field === "name") current.full_name = toOptionalText(value);
    if (field === "email") current.email = toOptionalText(value);
    if (field === "role") current.role_archetype = toOptionalText(value);
    if (field === "strength") current.strength = toOptionalText(value);
    bucket.set(index, current);
  });

  return Array.from(bucket.entries())
    .sort(([a], [b]) => a - b)
    .map(([, member]) => ({
      full_name: member.full_name ?? null,
      email: member.email ?? null,
      role_archetype: member.role_archetype ?? null,
      strength: member.strength ?? null,
    }))
    .filter((member) => member.full_name || member.email || member.role_archetype || member.strength);
}

function toRequiredText(value: FormDataEntryValue | null): string {
  return value ? value.toString().trim() : "";
}

function toOptionalText(value: FormDataEntryValue | null): string | null {
  if (!value) return null;
  const trimmed = value.toString().trim();
  return trimmed ? trimmed : null;
}

function toNumber(value: FormDataEntryValue | null): number | null {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function AvatarUploader({ value, onChange }: { value: string | null; onChange: (preview: string | null) => void }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [preview, setPreview] = useState<string | null>(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const onSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file.");
        return;
      }
      setError(null);
      setPreview(null);
      onChange(null);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result as string);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
      });
      reader.readAsDataURL(file);
    },
    [onChange],
  );

  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    if (!imageSrc || !croppedAreaPixels) {
      return () => {
        isCancelled = true;
      };
    }

    const processCrop = async () => {
      try {
        const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels);
        if (!isCancelled) {
          setPreview(croppedImage);
          onChange(croppedImage);
        }
      } catch (croppingError) {
        if (!isCancelled) {
          console.error(croppingError);
          setError("Could not crop image. Try again.");
        }
      }
    };

    processCrop();
    return () => {
      isCancelled = true;
    };
  }, [croppedAreaPixels, imageSrc, onChange]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#131e63]">Square profile image</p>
        {preview && <span className="text-xs text-[#131e63]/70">Looks good ✓</span>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr,0.8fr] gap-4">
        <div className="space-y-2">
          <label className="block text-sm text-[#131e63]/85">Upload & crop</label>
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className="w-full rounded-lg border border-[#131e63]/15 bg-white px-3 py-2 text-sm focus:border-[#131e63] focus:outline-none focus:ring-1 focus:ring-[#131e63]"
          />
          {imageSrc && (
            <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-[#131e63]/15 bg-black/5">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
          {imageSrc && (
            <div className="flex items-center gap-3">
              <label className="text-xs text-[#131e63]/70">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="flex-1"
              />
            </div>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        <div className="space-y-2">
          <p className="text-sm text-[#131e63]/85">Preview</p>
          <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-[#131e63]/15 bg-white">
            {preview ? (
              <NextImage src={preview} alt="Cropped preview" width={160} height={160} className="h-40 w-40 rounded-2xl object-cover" unoptimized />
            ) : (
              <div className="text-center text-xs text-[#131e63]/50 space-y-1">
                <p>No image yet.</p>
                <p>Upload a square-ish photo and crop it clean.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

async function getCroppedImage(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas unsupported");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL("image/jpeg");
}

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const response = await fetch(dataUrl);
  return response.blob();
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}
