import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  AcademicCapIcon,
  ArrowRightIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  ClockIcon,
  CpuChipIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const stats = [
  { label: "Clinical & hospital partners", value: "25+", detail: "Nationwide network across the Philippines" },
  { label: "AI experiments deployed", value: "10", detail: "From patient triage to predictive ops" },
  { label: "Capital ready to deploy", value: "PHP 10M+", detail: "Seed + follow-on for standout teams" },
  { label: "Pilot-ready datasets", value: "48", detail: "Curated, de-identified multimodal cohorts" },
];

const timeline = [
  {
    phase: "Immersion & Clinical Diligence",
    duration: "Weeks 1-2",
    detail: "Shadow Philippine care teams, audit DOH and PhilHealth data sources, and reframe your solution around the most urgent local cases.",
  },
  {
    phase: "Build Sprints & Co-Design",
    duration: "Weeks 3-6",
    detail: "Co-design with Manila and provincial hospital partners, ship verifiable prototypes, and align guardrails with compliance leads.",
  },
  {
    phase: "Pilot Launch & Evidence",
    duration: "Weeks 7-10",
    detail: "Launch hospital pilots across Philippine regions, capture impact metrics, and prepare IRB-ready documentation.",
  },
  {
    phase: "Capital & Global Scale",
    duration: "Weeks 11-12",
    detail: "Package the data room, secure DOH/PhilHealth endorsements, and stage venture plus enterprise introductions for rollout.",
  },
];

const programAims = [
  {
    title: "Identify care gaps",
    description: "We work with hospital innovation teams to surface the highest-impact problems spanning prevention, triage, and recovery.",
    Icon: LightBulbIcon,
  },
  {
    title: "Prototype with clinicians",
    description: "Founders co-design with multidisciplinary clinical squads that keep usability, safety, and equity at the center.",
    Icon: UsersIcon,
  },
  {
    title: "Scale responsibly",
    description: "We choreograph pilots, data agreements, and commercialization pathways that keep regulators and payers aligned.",
    Icon: RocketLaunchIcon,
  },
];

const cohortCompanies = [
  {
    name: "Kranium",
    focus: "Hospital data intelligence",
    summary:
      "Kranium transforms siloed, messy records into clear decision support so Filipino hospitals cut admin work and deliver better care.",
    logo: "/kranium.png",
  },
  {
    name: "HealthSpace",
    focus: "Digital health marketplaces",
    summary:
      "HealthSpace connects patients, providers, and facilities through a unified directory and management tools built for Philippine healthcare.",
    logo: "/healthspace.png",
  },
];

const programOffers = [
  {
    title: "Health system access",
    description: "Priority pilots with multi-country hospital partners, insurers, and pharma alliances.",
    Icon: BuildingOfficeIcon,
  },
  {
    title: "Capital readiness",
    description: "Milestone-based funding, grant partners, and data room prep for institutional rounds.",
    Icon: ChartBarIcon,
  },
  {
    title: "Regulatory + trust labs",
    description: "QMS templates, clinical validation coaches, and AI assurance protocols.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Operator mentorship",
    description: "Hands-on coaching from ex-health system executives, clinicians, and go-to-market leads.",
    Icon: AcademicCapIcon,
  },
  {
    title: "Data + tech stack",
    description: "Managed MLOps, de-identified datasets, and secure sandboxes for rapid experimentation.",
    Icon: CpuChipIcon,
  },
];

const studioSupport = [
  {
    title: "Clinical data studios",
    description: "Tap DOH hospitals, PhilHealth-ready claims data, and private hospital sandboxes curated by our local data engineering crew.",
    Icon: CpuChipIcon,
  },
  {
    title: "Regulatory pathway squad",
    description: "Navigate Philippine FDA filings, DOH accreditations, PhilHealth coverage, and partner IRBs with structured playbooks.",
    Icon: ShieldCheckIcon,
  },
  {
    title: "Impact capital partners",
    description: "Philippine hospital groups, LGU funds, and regional corporate ventures co-invest alongside SBV.one.",
    Icon: ChartBarIcon,
  },
];

const cohortCriteria = [
  "Seed to Series A teams building for healthcare, life sciences, or public health resiliency.",
  "At least one technical or clinical founder ready to work on-site in Manila or Singapore immersions.",
  "Working prototype or validated research artifact with a line of sight to revenue inside 12 months.",
  "Commitment to responsible AI practices and equitable access outcomes.",
];

export const metadata: Metadata = {
  title: "SBV.one | FutureCare Accelerator",
  description:
    "FutureCare Accelerator 1.0 immerses HealthTech founders in Philippine hospitals for 12 weeks of clinical diligence, prototyping, pilots, and capital support.",
};

export default function FutureCarePage() {
  return (
    <div className="font-[family:var(--font-manrope)] relative min-h-screen overflow-hidden bg-[#e6edfc] text-[#131e63]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,191,235,0.4),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0,rgba(230,237,252,0.6),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(19,30,99,0.08),transparent_75%)]" />
      </div>
      <SiteHeader />
      <div className="relative mx-auto flex w-full max-w-[1536px] flex-col gap-12 px-4 pb-24 pt-10 sm:px-8 lg:px-16">
        <header
          className="relative border border-[#131e63]/10 px-6 py-12 shadow-[0_25px_70px_rgba(19,30,99,0.2)] backdrop-blur lg:px-16"
          style={{
            backgroundImage: "linear-gradient(180deg, rgba(19,30,99,0.8), rgba(19,30,99,0.75)), url('/pexels-mart-production-7088524.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">FutureCare Accelerator 1.0</h1>
              <p className="text-lg text-white">Igniting HealthTech for a Smarter Philippines.</p>
              <p className="text-sm text-white/85 max-w-2xl">
                FutureCare equips founders with SBV.one operators, clinical advisors, and Incub8Space infrastructure so regulatory reviews, remote work, and
                enterprise buyer access become selling points rather than setbacks.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-white/80">
              {["AI x Healthcare", "12-week accelerator program"].map((item) => (
                <span key={item} className="border border-white/40 bg-white/10 px-3 py-1 text-white">
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/fif-intake-form"
                className="inline-flex items-center gap-2 border border-[#131e63] bg-[#131e63] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#101955]"
              >
                Apply Now <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="grid gap-4 text-sm text-[#131e63]/80 sm:grid-cols-2">
              <div className="flex flex-col gap-3 border border-[#131e63]/15 bg-white/85 p-6">
                <div className="relative h-14 w-32">
                  <Image src="/sbv_logo.png" alt="Starting Block Ventures" fill className="object-contain" />
                </div>
                <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Venture partner</p>
                <p>SBV.one brings capital, clinical mentors, and enterprise access so FutureCare accelerator founders validate faster.</p>
              </div>
              <div className="flex flex-col gap-3 border border-[#131e63]/15 bg-white/85 p-6">
                <div className="relative h-14 w-14">
                  <Image src="/incub8space.png" alt="Incub8Space" fill className="object-contain" />
                </div>
                <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Workspace partner</p>
                <p>Incub8Space powers the cohort with operator-built offices, collaboration zones, and virtual services.</p>
              </div>
              <div className="flex flex-col gap-3 border border-[#131e63]/15 bg-white/85 p-6">
                <div className="relative h-14 w-54">
                  <Image src="/dogmai-logo.png" alt="DOGM" fill className="object-contain" />
                </div>
                <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Future Accelerator</p>
                <p>DOGM powers the cohort with AI-powered learning system that functions as a structured operating system, turning daily discipline into shipped work and a verifiable portfolio.</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-[#131e63]/10 bg-white/85 px-4 py-6 text-center shadow-[0_10px_25px_rgba(19,30,99,0.08)]">
              <p className="text-3xl font-semibold text-[#131e63]">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">{stat.label}</p>
              <p className="mt-1 text-xs text-[#131e63]/70">{stat.detail}</p>
            </div>
          ))}
        </section>

        <section className="space-y-6 border border-[#131e63]/10 bg-gradient-to-b from-white via-[#f8fbff] to-white px-6 py-12 shadow-[0_20px_60px_rgba(19,30,99,0.1)] sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-[#8dbfeb]">What FutureCare aims to do</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#131e63]">Identify, prototype, and scale healthcare breakthroughs.</h2>
            <p className="mt-3 text-sm text-[#131e63]/75">
              Modeled after healthcare accelerators across Asia, each aim keeps us accountable to the people who rely on frontline innovation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {programAims.map((aim) => (
              <div key={aim.title} className="flex flex-col gap-3 border border-[#131e63]/10 bg-white/85 p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6edfc]">
                  <aim.Icon className="h-7 w-7 text-[#131e63]" aria-hidden />
                </div>
                <p className="text-lg font-semibold text-[#131e63]">{aim.title}</p>
                <p className="text-sm text-[#131e63]/75">{aim.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 border border-[#131e63]/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(19,30,99,0.08)]">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-[#fa5404]">Meet the cohort</p>
            <h2 className="mt-2 text-3xl font-semibold text-[#131e63]">Founding teams setting the pace.</h2>
            <p className="mt-3 text-sm text-[#131e63]/70">
              We highlight each team&apos;s mission to inspire cross-border collaboration.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {cohortCompanies.map((company) => (
              <div key={company.name} className="flex gap-4 border border-[#131e63]/10 bg-[#f8fbff] p-4">
                <div className="relative h-14 w-32 overflow-hidden bg-white">
                  {company.logo ? (
                    <Image src={company.logo} alt={company.name} fill className="object-contain p-2" sizes="128px" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.3em] text-[#131e63]">
                      {company.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 3)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#131e63]">{company.name}</p>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">{company.focus}</p>
                  <p className="mt-2 text-sm text-[#131e63]/75">{company.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 border border-[#131e63]/10 bg-[#131e63] px-6 py-12 text-white shadow-[0_25px_70px_rgba(19,30,99,0.25)] sm:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.5em] text-[#8dbfeb]">What the program offers</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Tools, capital, and trust layers to unlock scale.</h2>
            <p className="mt-3 text-sm text-white/80">
              FutureCare surrounds founders with practical infrastructure.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programOffers.map((offer) => (
              <div key={offer.title} className="flex flex-col gap-3 border border-white/15 bg-white/5 p-5">
                <offer.Icon className="h-8 w-8 text-[#8dbfeb]" aria-hidden />
                <p className="text-xl font-semibold text-white">{offer.title}</p>
                <p className="text-sm text-white/85">{offer.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4 border border-[#131e63]/10 bg-white/70 p-6 shadow-[0_20px_60px_rgba(19,30,99,0.1)]">
            <p className="text-[11px] uppercase tracking-[0.5em] text-[#8dbfeb]">Studio Support</p>
            <h3 className="text-2xl font-semibold text-[#131e63]">Local operators at your side.</h3>
            <p className="text-sm text-[#131e63]/75">
              FutureCare embeds SBV.one operators with Philippine hospital partners, LGUs, and regulators so founders receive practical help on product,
              compliance, and capital.
            </p>
            <div className="space-y-4">
              {studioSupport.map((support) => (
                <div key={support.title} className="flex gap-4 border border-[#131e63]/10 bg-white/85 p-4">
                  <support.Icon className="h-8 w-8 text-[#131e63]" aria-hidden />
                  <div>
                    <p className="text-lg font-semibold text-[#131e63]">{support.title}</p>
                    <p className="text-sm text-[#131e63]/70">{support.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#131e63]/10 bg-white/80 p-6 shadow-[0_25px_70px_rgba(19,30,99,0.12)]">
            <div className="flex items-center gap-3">
              <ClockIcon className="h-8 w-8 text-[#fa5404]" aria-hidden />
              <div>
                <p className="text-[11px] uppercase tracking-[0.5em] text-[#8dbfeb]">Program Journey</p>
                <h3 className="text-2xl font-semibold text-[#131e63]">12 weeks from idea to institutional pilot.</h3>
              </div>
            </div>
            <div className="mt-6 space-y-5">
              {timeline.map((item) => (
                <div key={item.phase} className="border-l border-[#131e63]/20 pl-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">{item.duration}</p>
                  <p className="mt-2 text-lg font-semibold text-[#131e63]">{item.phase}</p>
                  <p className="text-sm text-[#131e63]/75">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="space-y-8 border border-[#0c1b3d] bg-[#0c1b3d] px-6 py-12 text-white shadow-[0_30px_80px_rgba(8,35,10,0.45)]">
          <div className="space-y-3 text-center">
            <p className="text-[11px] uppercase tracking-[0.6em] text-white/80">Contact FutureCare</p>
            <h2 className="text-3xl font-semibold text-white">Let&apos;s bring your HealthTech build to life.</h2>
            <p className="text-sm text-white/85">
              FutureCare Cohort is forming in Manila. Tell us where you operate, what stage you are in, and the support you need. We respond within 72
              hours with next steps.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-1">
            <div className="space-y-4 text-sm text-white/85 max-w-5xl mx-auto">
              <p>
                We support founders from all over the world and partner with Filipino clinicians, biotech researchers, and data scientists across the region.
                Share your focus area and we will connect you to the right mentors, hospital partners, or pilot hosts.
              </p>
              <div className="grid gap-3 text-xs uppercase tracking-[0.4em] text-white/70 sm:grid-cols-2">
                <div className="border border-white/20 bg-white/10 p-4">
                  Weekly office hours with healthcare operators and venture partners
                </div>
                <div className="border border-white/20 bg-white/10 p-4">
                  Early notice on program events, webinars, and demo days in the Philippines
                </div>
                <div className="border border-white/20 bg-white/10 p-4">
                  Direct introductions to data partners, regulators, and pilot hosts
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border border-[#131e63]/10 px-6 py-12 text-white shadow-[0_25px_70px_rgba(19,30,99,0.25)]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0c1b3d] via-[#1d5b2c] to-[#0c1b3d]" />
          <div className="relative flex flex-col gap-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.6em] text-white/80">Ready to launch?</p>
            <h2 className="text-3xl font-semibold text-white">FutureCare Cohort opens this quarter.</h2>
            <p className="text-sm text-white/85 max-w-3xl mx-auto">
              Tell us how your team is merging healthcare expertise with AI breakthroughs. We&apos;ll respond within 72 hours with next steps, office
              hours invites, and diligence requirements.
            </p>
          </div>
          <div className="mt-8 relative flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/fif-intake-form"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#131e63] transition hover:bg-slate-100"
            >
              Apply Now <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
