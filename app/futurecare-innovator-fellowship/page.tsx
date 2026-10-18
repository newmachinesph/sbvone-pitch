"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { AnimatedProgress, Box, Deck, FlexBox, FullScreen, Heading, Slide } from "spectacle";

const deckTheme = {
  colors: {
    primary: "#131e63",
    secondary: "#8dbfeb",
    background: "#e6edfc",
  },
  fonts: {
    header: "var(--font-manrope, 'Manrope', sans-serif)",
    text: "var(--font-manrope, 'Manrope', sans-serif)",
  },
};

const slideShell =
  "relative flex h-full min-h-[100dvh] flex-col overflow-hidden rounded-[32px] border border-[#131e63]/10 bg-white px-8 py-16 text-[#131e63] shadow-[0_30px_80px_rgba(19,30,99,0.12)] lg:px-12 lg:py-20";

const slideBackgrounds = [
  "bg-gradient-to-b from-[#f6f9ff] via-[#e6edfc] to-white",
  "bg-gradient-to-br from-white via-[#f8fbff] to-[#e6edfc]",
  "bg-gradient-to-b from-white to-[#f5f8ff]",
  "bg-gradient-to-br from-[#f9fbff] via-white to-[#e6edfc]",
];

const getSlideBackground = (index: number) => slideBackgrounds[index % slideBackgrounds.length];

const chunkArray = <T,>(items: T[], size: number) => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const weeklyPillars = [
  {
    title: "WHAT",
    description: "Each week anchors on a single theme founders must master to move from idea to pilot.",
    highlights: ["Weekly challenge", "Async deliverables", "Saturday demo", "Guest speaker insight", "Scoring and feedback"],
  },
  {
    title: "WHEN",
    description: "12 weeks follow a predictable cadence so teams can plan deep work and showtime moments.",
    highlights: ["Mon-Fri async sprints", "Saturday 2-3 hour live block", "Optional Sunday deep work"],
  },
  {
    title: "WHO",
    description: "Operators, clinicians, and venture partners surround each fellow with decision-ready guidance.",
    highlights: ["Founders & Innovator Fellows", "FutureCare operators", "Clinicians & guest speakers", "SBV.one venture team", "Tech coaches"],
  },
  {
    title: "WHERE",
    description: "Hybrid delivery keeps momentum high while honoring in-hospital discovery and public showcases.",
    highlights: ["Online async stack", "Hospital immersion sites", "Zoom + Manila hub", "Demo Day in Manila + livestream"],
  },
];

const weeklyPillarChunks = chunkArray(weeklyPillars, 2);

const weeklyFocuses = [
  { title: "Clinical validation", detail: "Pressure-test the care gap with medical teams and data." },
  { title: "Prototyping", detail: "Translate insights into zero-to-one experiences and flows." },
  { title: "Safety & compliance", detail: "Stand up guardrails that satisfy FDA, DOH, and PhilHealth." },
  { title: "Go-to-market", detail: "Craft pricing, positioning, and enterprise pathways." },
  { title: "Pilot execution", detail: "Deploy workflows inside real hospitals with mentors alongside." },
  { title: "Evidence building", detail: "Instrument usage, collect proof, and summarize impact." },
  { title: "Pitching", detail: "Close with data rooms, Demo Day stories, and investor conversations." },
];

const weeklyRhythm = {
  weekdays: ["Research", "Interviews", "Prototype building", "AI copilot workflows", "Prep for Saturday demo"],
  saturday: ["Guest speaker keynote", "Team demos", "Panel critique", "Weekly scoring (2-3 hrs)"],
  sunday: ["Optional deep work or rest reset"],
};

const contributorGroups = [
  {
    title: "Core builders",
    items: ["Founders / Innovator Fellows", "FutureCare Operators & Mentors"],
  },
  {
    title: "Clinical voices",
    items: ["Healthcare Guest Speakers (weekly)", "Clinicians for co-design & feedback"],
  },
  {
    title: "Venture & build support team",
    items: ["SBV.one Venture Team (capital & business support)", "Tech Coaches (rapid prototyping, AI workflows)"],
  },
];

const environments = [
  {
    title: "Async work",
    detail: "Online stack inside Notion, Slack, Zoom, and the Co-working space keeps deliverables visible.",
  },
  {
    title: "Live sessions",
    detail: "Saturday Zoom or Manila hub gatherings concentrate feedback, scoring, and guest keynotes.",
  },
  {
    title: "Hospital immersion",
    detail: "Partner hospitals host discovery and usability labs during weeks 1-4.",
  },
  {
    title: "Demo Day",
    detail: "Manila showcase plus livestream connects fellows to investors and hospital leaders.",
  },
];

const discussionTopics = [
  {
    title: "From Zero to Hero: The Founder Mindset",
    description: "How early founders survive ambiguity, move fast, and build conviction when everything is changing daily.",
  },
  {
    title: "Lean Startup for Healthcare",
    description: "Validated learning, fast iteration, and evidence-driven decisions when regulators and clinicians are watching.",
  },
  {
    title: "Design Thinking for Clinical Problems",
    description: "Human-centered design applied to patient, clinician, and hospital workflows across triage to recovery.",
  },
  {
    title: "Digital Product Development in HealthTech",
    description: "Translating clinical insights into functional prototypes, data models, and workflow instrumentation.",
  },
  {
    title: "Technical Project Management for Startups",
    description: "Managing engineering, sprints, pilots, and product velocity with lean teams across hybrid environments.",
  },
  {
    title: "The Startup Stack: Tools, AI Workflows & Infrastructure",
    description: "Modern tech stack, AI copilots, low-code tools, and automation frameworks used throughout FutureCare.",
  },
  {
    title: "Sales Basics for HealthTech Founders",
    description: "Selling into hospitals, clinicians, pharma, insurers, and enterprise buyers with trust-first motions.",
  },
  {
    title: "Hiring & Leading Small, High-Performance Teams",
    description: "Building the first three to five roles, coaching them, and shaping founder leadership habits.",
  },
  {
    title: "Needs Finding & Opportunity Creation in Healthcare",
    description: "Identifying clinical gaps, unmet needs, and scalable opportunities anchored on evidence.",
  },
  {
    title: "Customer Acquisition for Startups",
    description: "Demand generation, distribution channels, and early traction strategies inside regulated markets.",
  },
  {
    title: "Business Models & Innovation in Digital Health",
    description: "Sustainable, scalable, and regulatory-aligned business models that payers and providers accept.",
  },
  {
    title: "The Power of Storytelling in Business",
    description: "Crafting narratives investors, clinicians, and partners remember on Demo Day and beyond.",
  },
];

const optionalTopics = [
  "Identity & communications for founders",
  "Building & managing sales organizations",
  "Conflict resolution & interpersonal dynamics",
  "Global value chains in HealthTech",
  "Managing high-growth enterprises",
  "Regulatory, AI ethics, fundraising, and clinical co-design deep dives",
];

const topicChunks = chunkArray(discussionTopics, 4);

const topicPhases = [
  {
    label: "Weeks 1-3 · Zero-to-One Phase",
    topics: [
      "From Zero to Hero: The Founder Mindset",
      "Lean Startup for Healthcare",
      "Design Thinking for Clinical Problems",
    ],
  },
  {
    label: "Weeks 4-7 · Build & Pilot Phase",
    topics: [
      "Digital Product Development in HealthTech",
      "Technical Project Management for Startups",
      "The Startup Stack: Tools, AI Workflows & Infrastructure",
      "Sales Basics for HealthTech Founders",
    ],
  },
  {
    label: "Weeks 8-10 · Growth & Evidence Phase",
    topics: [
      "Hiring & Leading Small, High-Performance Teams",
      "Needs Finding & Opportunity Creation in Healthcare",
      "Customer Acquisition for Startups",
    ],
  },
  {
    label: "Weeks 11-12 · Pitch & Scale Phase",
    topics: [
      "Business Models & Innovation in Digital Health",
      "The Power of Storytelling in Business",
    ],
  },
];

const topicPhaseChunks = chunkArray(topicPhases, 2);

const weeklyProgram = [
  {
    week: "Week 1",
    title: "HealthTech Immersion & Care Gap Discovery",
    what: ["Identify real healthcare problems", "Understand workflows from triage to outpatient to admin"],
    when: ["Mon-Fri: interviews and workflow mapping", "Sat: Live keynote + Top 3 Care Gaps demo"],
    who: ["Hospital CMO or DOH systems expert", "Clinicians for interviews", "Innovator Fellows + FutureCare mentors"],
    where: ["Hospital immersion sites", "Zoom for Saturday session"],
  },
  {
    week: "Week 2",
    title: "Validation Sprint",
    what: ["Validate care gaps with field interviews", "Map pain points and inefficiencies"],
    when: ["Mon-Fri: validation sprint", "Sat: Problem Validation demo"],
    who: ["Nurse supervisor or clinical researcher", "Clinician panel", "FutureCare mentors"],
    where: ["Remote interviews", "Zoom Saturday session"],
  },
  {
    week: "Week 3",
    title: "Prototype Sprint Zero",
    what: ["Build first prototype", "Zero-to-one design and flows", "AI-assisted prototyping"],
    when: ["Mon-Fri: prototype build", "Sat: Prototype demo (v1)"],
    who: ["HealthTech CTO", "Tech builder / designer mentors"],
    where: ["Online build environment", "Zoom for Saturday session"],
  },
  {
    week: "Week 4",
    title: "Co-Design with Clinicians",
    what: ["Test prototype", "Run co-design sessions", "Conduct usability and workflow testing"],
    when: ["Mon-Fri: co-design iterations", "Sat: Co-Design Results demo"],
    who: ["Physician innovation officer", "Clinician co-design partners"],
    where: ["Hospital partner clinic", "Zoom for Saturday session"],
  },
  {
    week: "Week 5",
    title: "Working Demo Build",
    what: ["Convert prototype to a working demo ready for hands-on feedback"],
    when: ["Mon-Fri: engineering sprint", "Sat: Demo (v1 working build)"],
    who: ["HealthTech engineer guest speaker", "FutureCare tech mentors"],
    where: ["Online build rooms", "Zoom Saturday demo"],
  },
  {
    week: "Week 6",
    title: "Safety, Compliance & Pilot Prep",
    what: ["Build safety guardrails", "Map FDA / DOH / PhilHealth pathways", "Prep pilot plan"],
    when: ["Mon-Fri: compliance tasks", "Sat: Regulatory readiness demo"],
    who: ["FDA / DOH regulatory officer", "FutureCare compliance mentors"],
    where: ["Online work", "Zoom for live review"],
  },
  {
    week: "Week 7",
    title: "Soft Pilot Launch",
    what: ["Deploy product in real workflows", "Monitor onboarding & testing"],
    when: ["Mon-Fri: pilot onboarding and testing", "Sat: Soft pilot demo"],
    who: ["Hospital operations manager", "Clinician testers"],
    where: ["Partner hospital site", "Zoom Saturday check-in"],
  },
  {
    week: "Week 8",
    title: "Evidence Sprint",
    what: ["Collect pilot evidence", "Analyze usage and early impact"],
    when: ["Mon-Fri: data analysis", "Sat: Evidence demo (v1)"],
    who: ["Health data scientist", "Evidence and analytics mentors"],
    where: ["Online analytics stack", "Zoom Saturday"],
  },
  {
    week: "Week 9",
    title: "Business Model & GTM",
    what: ["Create pricing", "Build GTM strategy and buyer messaging"],
    when: ["Mon-Fri: market research", "Sat: GTM demo"],
    who: ["Hospital CEO or procurement lead", "FutureCare business mentors"],
    where: ["Online + stakeholder calls", "Zoom Saturday review"],
  },
  {
    week: "Week 10",
    title: "Capital & Regulatory Readiness",
    what: ["Build investor story", "Prepare regulatory roadmap", "Build data room"],
    when: ["Mon-Fri: deck building", "Sat: Investor mock pitch"],
    who: ["VC (HealthTech)", "SBV.one venture team"],
    where: ["Online collaboration", "Saturday Zoom"],
  },
  {
    week: "Week 11",
    title: "Pitch Polishing",
    what: ["Finalize pitch, evidence, and demo"],
    when: ["Mon-Fri: pitch refinement", "Sat: Full practice pitch"],
    who: ["Innovation thought leader", "Pitch mentors", "Clinician reviewers"],
    where: ["Online + Saturday Zoom"],
  },
  {
    week: "Week 12",
    title: "Demo Day",
    what: ["Final pitch to investors and hospital partners"],
    when: ["Saturday: official Demo Day"],
    who: ["DOH, PhilHealth, SBV.one, hospital CEOs", "Investors, clinicians, partners"],
    where: ["Manila onsite", "Livestream on Zoom"],
  },
];

type WeeklyProgramItem = (typeof weeklyProgram)[number];

const weekGroups = [
  {
    label: "Weeks 1-3 · Zero-to-One Phase",
    description: "Ground the cohort in real care gaps, validate problems, and co-design first prototypes with clinicians.",
    weeks: weeklyProgram.slice(0, 3),
  },
  {
    label: "Weeks 4-7 · Build & Pilot Phase",
    description: "Ship working demos, layer in compliance, and launch soft pilots with hospital partners.",
    weeks: weeklyProgram.slice(3, 7),
  },
  {
    label: "Weeks 8-10 · Growth & Evidence Phase",
    description: "Collect pilot evidence, refine business models, and prep capital and regulatory readiness.",
    weeks: weeklyProgram.slice(7, 10),
  },
  {
    label: "Weeks 11-12 · Pitch & Scale Phase",
    description: "Polish the pitch, finalize data rooms, and deliver Demo Day moments that unlock capital and pilots.",
    weeks: weeklyProgram.slice(10),
  },
];

const DeckTemplate = () => (
  <FlexBox justifyContent="space-between" alignItems="center" position="absolute" bottom="1.5rem" width={1} padding="0 2.5rem">
    <Box padding="0 1em">
      <FullScreen color={deckTheme.colors.primary} />
    </Box>
    <Box padding="0 1em" flex="1" display="flex" justifyContent="center">
      <AnimatedProgress size={8} color={deckTheme.colors.primary} pacmanColor={deckTheme.colors.secondary} />
    </Box>
  </FlexBox>
);

const SlideTop = () => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <Link href="/" className="inline-flex items-center gap-3 border border-[#131e63]/15 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#131e63]">
      SBV.one
    </Link>
    <p className="text-[11px] uppercase tracking-[0.4em] text-[#131e63]/60">FutureCare Innovator Fellowship</p>
  </div>
);

const SlideFrame = ({ children, backgroundIndex = 0 }: { children: ReactNode; backgroundIndex?: number }) => (
  <div className={`${slideShell} ${getSlideBackground(backgroundIndex)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,191,235,0.25),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(230,237,252,0.35),transparent_70%)]" />
    </div>
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">{children}</div>
  </div>
);

const TitleSlide = () => (
  <SlideFrame backgroundIndex={0}>
    <SlideTop />
    <div className="space-y-6 text-center">
      <Heading fontSize="clamp(3rem,5vw,4.5rem)" fontWeight={700} lineHeight={1.1} color="#131e63" textAlign="center">
        FutureCare Innovator Fellowship
      </Heading>
      <p className="text-lg text-[#131e63]/85">12-week zero-to-one HealthTech bootcamp built inside SBV.one&apos;s Infrastructure.</p>
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {["HealthTech immersion", "Prototype to pilot", "Evidence to Demo Day"].map((pill) => (
          <span key={pill} className="border border-[#131e63]/15 bg-white/80 px-4 py-2 uppercase tracking-[0.3em] text-[#131e63]">
            {pill}
          </span>
        ))}
      </div>
      <div className="grid gap-4 text-left text-sm text-[#131e63]/80 sm:grid-cols-2">
        <div className="border border-[#131e63]/10 bg-white/80 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">Promise</p>
          <p className="mt-2 text-base text-[#131e63]">Move founders from immersion to investable pilots with clinical buy-in.</p>
        </div>
        <div className="border border-[#131e63]/10 bg-white/80 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">Format</p>
          <p className="mt-2 text-base text-[#131e63]">Weekly <strong>WHAT · WHEN · WHO · WHERE</strong> system keeps the cohort synchronized.</p>
        </div>
      </div>
    </div>
  </SlideFrame>
);

const WeeklyPillarsSlide = ({ chunkIndex }: { chunkIndex: number }) => {
  const chunk = weeklyPillarChunks[chunkIndex];
  return (
    <SlideFrame backgroundIndex={1}>
      <SlideTop />
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">
          Weekly operating system {weeklyPillarChunks.length > 1 ? `(Part ${chunkIndex + 1} of ${weeklyPillarChunks.length})` : ""}
        </p>
        <Heading fontSize="clamp(2.4rem,4vw,3.2rem)" fontWeight={700} color="#131e63">
          WHAT · WHEN · WHO · WHERE keeps founders accountable.
        </Heading>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {chunk.map((pillar) => (
          <div key={pillar.title} className="flex flex-col gap-4 border border-[#131e63]/10 bg-white/85 px-6 py-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.5em] text-[#8dbfeb]">{pillar.title}</p>
            </div>
            <p className="text-sm text-[#131e63]/80">{pillar.description}</p>
            <div className="flex flex-wrap gap-2 text-xs text-[#131e63]">
              {pillar.highlights.map((item) => (
                <span key={item} className="border border-[#131e63]/15 bg-[#f8fbff] px-3 py-1 uppercase tracking-[0.25em]">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
};

const WeeklyFocusSlide = () => (
  <SlideFrame backgroundIndex={2}>
    <SlideTop />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">Themes across 12 weeks</p>
      <Heading fontSize="clamp(2.3rem,3.5vw,3rem)" fontWeight={700} color="#131e63">
        Every module reinforces a founder&apos;s path to pilot-ready traction.
      </Heading>
    </div>
    <div className="grid gap-4 md:grid-cols-4">
      {weeklyFocuses.map((focus) => (
        <div key={focus.title} className="border border-[#131e63]/10 bg-white/85 px-6 py-5">
          <p className="text-base font-semibold text-[#131e63]">{focus.title}</p>
          <p className="mt-2 text-sm text-[#131e63]/75">{focus.detail}</p>
        </div>
      ))}
    </div>
  </SlideFrame>
);

const RhythmSlide = () => (
  <SlideFrame backgroundIndex={3}>
    <SlideTop />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">Weekly rhythm</p>
      <Heading fontSize="clamp(2.2rem,3.4vw,2.8rem)" fontWeight={700} color="#131e63">
        A predictable tempo aligns async deep work with live checkpoints.
      </Heading>
    </div>
    <div className="grid gap-5 lg:grid-cols-3">
      {[
        { label: "Mon-Fri", items: weeklyRhythm.weekdays, accent: "#131e63" },
        { label: "Saturday live", items: weeklyRhythm.saturday, accent: "#fa5404" },
        { label: "Sunday reset", items: weeklyRhythm.sunday, accent: "#8dbfeb" },
      ].map((block) => (
        <div key={block.label} className="flex flex-col gap-3 border border-[#131e63]/10 bg-white/85 px-5 py-5">
          <p className="text-xs uppercase tracking-[0.45em]" style={{ color: block.accent }}>
            {block.label}
          </p>
          <ul className="space-y-2 text-sm text-[#131e63]/80">
            {block.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: block.accent }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SlideFrame>
);

const ParticipantsSlide = () => (
  <SlideFrame backgroundIndex={0}>
    <SlideTop />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">People around the fellowship</p>
      <Heading fontSize="clamp(2.2rem,3.4vw,2.9rem)" fontWeight={700} color="#131e63">
        Operators, clinicians, and venture partners surround every founder.
      </Heading>
    </div>
    <div className="grid gap-5 md:grid-cols-3">
      {contributorGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-3 border border-[#131e63]/10 bg-white/85 px-5 py-5">
          <p className="text-sm uppercase tracking-[0.4em] text-[#8dbfeb]">{group.title}</p>
          <ul className="space-y-2 text-sm text-[#131e63]/80">
            {group.items.map((item) => (
              <li key={item} className="border border-[#131e63]/10 bg-[#f8fbff] px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </SlideFrame>
);

const LocationsSlide = () => (
  <SlideFrame backgroundIndex={1}>
    <SlideTop />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">Where it happens</p>
      <Heading fontSize="clamp(2.2rem,3.4vw,2.9rem)" fontWeight={700} color="#131e63">
        Hybrid delivery keeps founders close to hospitals and decision makers.
      </Heading>
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      {environments.map((env) => (
        <div key={env.title} className="border border-[#131e63]/10 bg-white/85 px-6 py-5">
          <p className="text-base font-semibold text-[#131e63]">{env.title}</p>
          <p className="mt-2 text-sm text-[#131e63]/75">{env.detail}</p>
        </div>
      ))}
    </div>
  </SlideFrame>
);

const TopicListSlide = ({ chunkIndex }: { chunkIndex: number }) => {
  const chunk = topicChunks[chunkIndex];
  return (
    <SlideFrame backgroundIndex={chunkIndex % slideBackgrounds.length}>
      <SlideTop />
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">
          Saturday live sync topics {topicChunks.length > 1 ? `(Part ${chunkIndex + 1} of ${topicChunks.length})` : ""}
        </p>
        <Heading fontSize="clamp(2.2rem,3.4vw,2.9rem)" fontWeight={700} color="#131e63">
          Discussion prompts that guide every week.
        </Heading>
        <p className="text-sm text-[#131e63]/75">
          Facilitators use these spotlights to keep the cohort aligned on weekly deliverables during the Saturday live sync.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {chunk.map((topic) => (
          <div key={topic.title} className="border border-[#131e63]/10 bg-white/85 px-5 py-4">
            <p className="text-base font-semibold text-[#131e63]">{topic.title}</p>
            <p className="mt-2 text-sm text-[#131e63]/75">{topic.description}</p>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
};

const TopicPhaseSlide = ({ chunkIndex }: { chunkIndex: number }) => {
  const chunk = topicPhaseChunks[chunkIndex];
  return (
    <SlideFrame backgroundIndex={(2 + chunkIndex) % slideBackgrounds.length}>
      <SlideTop />
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">
          Topic map {topicPhaseChunks.length > 1 ? `(Part ${chunkIndex + 1} of ${topicPhaseChunks.length})` : ""}
        </p>
        <Heading fontSize="clamp(2.2rem,3.4vw,2.9rem)" fontWeight={700} color="#131e63">
          Each Saturday focus ladders up to the program phase.
        </Heading>
        <p className="text-sm text-[#131e63]/75">Operators cue the discussion that best reinforces the week&apos;s goal.</p>
      </div>
      <div className="space-y-4">
        {chunk.map((phase) => (
          <div key={phase.label} className="border border-[#131e63]/10 bg-white/85 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">{phase.label}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-sm text-[#131e63]/80">
              {phase.topics.map((topic) => (
                <span key={topic} className="border border-[#131e63]/15 bg-[#f8fbff] px-3 py-1">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SlideFrame>
  );
};

const OptionalTopicsSlide = () => (
  <SlideFrame backgroundIndex={3}>
    <SlideTop />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">Bonus tracks</p>
      <Heading fontSize="clamp(2.2rem,3.4vw,2.9rem)" fontWeight={700} color="#131e63">
        Optional topics for parallel tracks or guest speakers.
      </Heading>
      <p className="text-sm text-[#131e63]/75">Operators plug these in when the cohort needs deeper dives.</p>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {optionalTopics.map((topic) => (
        <div key={topic} className="border border-[#131e63]/10 bg-white/80 px-4 py-3 text-sm text-[#131e63]/80">
          {topic}
        </div>
      ))}
    </div>
  </SlideFrame>
);

const WeekDetailCard = ({ week }: { week: WeeklyProgramItem }) => (
  <div className="border border-[#131e63]/10 bg-white/90 px-5 py-5 shadow-[0_15px_40px_rgba(19,30,99,0.08)]">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">{week.week}</p>
      <p className="text-base font-semibold text-[#131e63]">{week.title}</p>
    </div>
    <div className="mt-4 grid gap-5 text-sm md:grid-cols-2">
      {[
        { label: "What", items: week.what },
        { label: "When", items: week.when },
      ].map((block) => (
        <div key={block.label}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">{block.label}</p>
          <ul className="mt-2 space-y-1 text-sm text-[#131e63]/80">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#8dbfeb]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="mt-4 grid gap-5 md:grid-cols-2">
      {[
        { label: "Who", items: week.who },
        { label: "Where", items: week.where },
      ].map((block) => (
        <div key={block.label}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">{block.label}</p>
          <ul className="mt-2 space-y-1 text-sm text-[#131e63]/80">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[#8dbfeb]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const SingleWeekSlide = ({
  week,
  groupLabel,
  groupDescription,
  backgroundIndex,
}: {
  week: WeeklyProgramItem;
  groupLabel: string;
  groupDescription: string;
  backgroundIndex: number;
}) => (
  <SlideFrame backgroundIndex={backgroundIndex}>
    <SlideTop />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">{groupLabel}</p>
      <Heading fontSize="clamp(2.1rem,3.3vw,2.8rem)" fontWeight={700} color="#131e63">
        {week.week}: {week.title}
      </Heading>
      <p className="text-sm text-[#131e63]/75">{groupDescription}</p>
    </div>
    <WeekDetailCard week={week} />
  </SlideFrame>
);

const DemoDaySlide = () => (
  <SlideFrame backgroundIndex={2}>
    <SlideTop />
    <div className="space-y-5 text-center">
      <Heading fontSize="clamp(2.6rem,3.8vw,3.2rem)" fontWeight={700} color="#131e63" textAlign="center">
        Demo Day closes the loop with investors and hospital partners.
      </Heading>
      <p className="text-sm text-[#131e63]/75">
        Week 12 gathers DOH, PhilHealth, SBV.one, hospital CEOs, investors, and clinicians in Manila with a livestream for global partners.
      </p>
      <div className="grid gap-4 text-left text-sm text-[#131e63]/80 sm:grid-cols-2">
        <div className="border border-[#131e63]/10 bg-white/85 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">Scorecard</p>
          <p className="mt-2">Evidence packets, pilot metrics, and regulatory readiness checkpoints guide final scoring.</p>
        </div>
        <div className="border border-[#131e63]/10 bg-white/85 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">Opportunities</p>
          <p className="mt-2">Capital commitments, hospital pilots, and SBV.one support unlock for standout fellows.</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 border border-[#131e63]/10 bg-[#f8fbff] px-6 py-8 text-sm text-[#131e63]/85">
        <p className="text-base font-semibold text-[#131e63]">Ready to showcase a HealthTech build?</p>
        <p className="max-w-2xl">
          Tell us about your idea and the clinical workflow you want to transform. FutureCare replies within 72 hours with next steps and diligence
          needs.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-[#131e63] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#101955]"
        >
          Contact SBV.ONE
        </Link>
      </div>
    </div>
  </SlideFrame>
);

export default function FutureCareFellowshipDeck() {
  const programSlides = weekGroups.flatMap((group, groupIndex) =>
    group.weeks.map((week, weekIndex) => (
      <Slide key={`${week.week}-detail`} backgroundColor="transparent" padding={0}>
        <SingleWeekSlide
          week={week}
          groupLabel={group.label}
          groupDescription={group.description}
          backgroundIndex={(groupIndex * 4 + weekIndex) % slideBackgrounds.length}
        />
      </Slide>
    ))
  );

  return (
    <div className="min-h-[100dvh] bg-[#e6edfc] text-[#131e63]">
      <div className="relative min-h-[100dvh] overflow-hidden bg-[#e6edfc]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto h-full min-h-[100dvh] max-w-6xl px-4 py-12">
          <Deck template={<DeckTemplate />} theme={deckTheme}>
            <Slide backgroundColor="transparent" padding={0}>
              <TitleSlide />
            </Slide>
            {weeklyPillarChunks.map((_, index) => (
              <Slide key={`weekly-pillars-${index}`} backgroundColor="transparent" padding={0}>
                <WeeklyPillarsSlide chunkIndex={index} />
              </Slide>
            ))}
            <Slide backgroundColor="transparent" padding={0}>
              <WeeklyFocusSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <RhythmSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <ParticipantsSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <LocationsSlide />
            </Slide>
            {topicChunks.map((_, index) => (
              <Slide key={`topics-${index}`} backgroundColor="transparent" padding={0}>
                <TopicListSlide chunkIndex={index} />
              </Slide>
            ))}
            {topicPhaseChunks.map((_, index) => (
              <Slide key={`topic-phase-${index}`} backgroundColor="transparent" padding={0}>
                <TopicPhaseSlide chunkIndex={index} />
              </Slide>
            ))}
            <Slide backgroundColor="transparent" padding={0}>
              <OptionalTopicsSlide />
            </Slide>
            {programSlides}
            <Slide backgroundColor="transparent" padding={0}>
              <DemoDaySlide />
            </Slide>
          </Deck>
        </div>
      </div>
    </div>
  );
}
