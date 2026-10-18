"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  IdentificationIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SquaresPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
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
  "relative flex h-full min-h-[100dvh] flex-col overflow-hidden rounded-[32px] border border-[#131e63]/10 bg-white px-8 py-16 text-[#131e63] shadow-[0_25px_70px_rgba(19,30,99,0.15)] lg:px-12 lg:py-20";

const evaluationCriteria = ["Founder mindset", "Problem obsession", "Execution speed", "Collaboration energy", "AI readiness", "Healthcare curiosity"];

const founderBackgrounds = ["Engineering / Data", "Design / UX / Product", "Clinical (nurses, physicians, therapists)", "Operations / Business / Policy", "Researchers, analysts, innovators"];

const founderTraits = ["Builder energy", "Curiosity", "Resilience", "Clarity in communication", "Ability to learn fast", "Mission-driven mindset"];

const applicationInputs = [
  "Problem space of interest (care gap focus)",
  "Motivation + founder story",
  "Skills & experience summary",
  "Founder personality indicators",
  "AI readiness mini-challenge",
];

const interviewFocus = [
  "Clarity of thinking & communication",
  "Problem understanding",
  "Founder grit & resilience",
  "Team compatibility",
  "Learning velocity",
];

const founderArchetypes = [
  { label: "Hacker", detail: "Technical builder focused on software, data, or AI." },
  { label: "Hipster", detail: "Product / design lead shaping user experience." },
  { label: "Hustler", detail: "Business + operations driver who grows traction." },
  { label: "Clinician", detail: "Health domain expert who owns clinical rigor." },
  { label: "Analyst", detail: "Data/AI strategist who validates evidence." },
];

const formationCriteria = [
  {
    title: "Skill balance",
    description: "Hacker + Hipster + Hustler + (Clinician or Analyst) mix inside each team.",
  },
  {
    title: "Problem alignment",
    description: "Founders exploring similar care gaps are grouped to maintain conviction.",
  },
  {
    title: "Working style compatibility",
    description: "Signals from interview, communication habits, and readiness challenge.",
  },
  {
    title: "Commitment & mindset",
    description: "Bias toward action, openness to feedback, and willingness to co-create.",
  },
];

const onboardingDeliverables = [
  "Team assignment + roster intro",
  "Mentor pairing with FutureCare operators",
  "HealthTech immersion schedule (Week 1 hospital visits)",
  "Pre-work: interview templates & workflow primers",
  "SBV.ONE workspace access (physical + digital)",
];

const journeySteps = [
  "Apply",
  "Interview & Strength Map",
  "Team Formation",
  "Acceptance into Fellowship",
  "HealthTech Immersion (Week 1)",
  "Zero-to-One Build Journey",
];

const slideBackgrounds = [
  "bg-gradient-to-b from-[#f6f9ff] via-[#e6edfc] to-white",
  "bg-gradient-to-br from-[#f9fbff] via-white to-[#e6edfc]",
  "bg-gradient-to-b from-white to-[#f3f7ff]",
  "bg-gradient-to-br from-[#f8fbff] via-white to-[#e6edfc]",
];

const getSlideBackground = (index: number) => slideBackgrounds[index % slideBackgrounds.length];

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

const SlideTop = ({ label = "FutureCare Innovator Fellowship" }) => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <Link href="/" className="inline-flex items-center gap-2 border border-[#131e63]/15 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#131e63]">
      SBV.one
    </Link>
    <p className="text-[11px] uppercase tracking-[0.4em] text-[#131e63]/60">{label}</p>
  </div>
);

const SlideFrame = ({ children, index = 0 }: { children: React.ReactNode; index?: number }) => (
  <div className={`${slideShell} ${getSlideBackground(index)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,191,235,0.25),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(230,237,252,0.35),transparent_75%)]" />
    </div>
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">{children}</div>
  </div>
);

const TitleSlide = () => (
  <SlideFrame index={0}>
    <SlideTop label="Founder Recruitment Overview" />
    <div className="space-y-6 text-center">
      <Heading fontSize="clamp(3rem,5vw,4.5rem)" fontWeight={700} color="#131e63">
        Founder Recruitment
      </Heading>
      <p className="text-base text-[#131e63]/75">
        We recruit individuals and shape HealthTech teams. The FutureCare Innovator Fellowship identifies high-potential individuals and transforms them
        into high-performing startup teams through a selective, structured process.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-[#131e63]/10 bg-white/85 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb] text-left">We evaluate</p>
          <div className="mt-3 grid gap-2 text-sm text-left text-[#131e63]/80">
            {evaluationCriteria.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <SquaresPlusIcon className="h-4 w-4 text-[#8dbfeb]" aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-[#131e63]/10 bg-white/85 px-5 py-4 text-left">
          <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">Outcome</p>
          <p className="mt-3 text-sm text-[#131e63]/80">
            A curated cohort of individuals ready to enter team formation with clear insight into their strengths, motivations, and care-gap focus.
          </p>
        </div>
      </div>
    </div>
  </SlideFrame>
);

const IdealFounderSlide = () => (
  <SlideFrame index={1}>
    <SlideTop label="Ideal Founder Profiles" />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">Who we&apos;re looking for</p>
      <Heading fontSize="clamp(2.4rem,3.6vw,3.2rem)" fontWeight={700} color="#131e63">
        Individuals with domain depth and startup hunger.
      </Heading>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="border border-[#131e63]/10 bg-white/85 px-6 py-5">
        <div className="flex items-center gap-3 text-[#131e63]">
          <UsersIcon className="h-6 w-6 text-[#8dbfeb]" aria-hidden />
          <p className="text-sm uppercase tracking-[0.35em]">Backgrounds</p>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-[#131e63]/80">
          {founderBackgrounds.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="border border-[#131e63]/10 bg-white/85 px-6 py-5">
        <div className="flex items-center gap-3 text-[#131e63]">
          <SparklesIcon className="h-6 w-6 text-[#8dbfeb]" aria-hidden />
          <p className="text-sm uppercase tracking-[0.35em]">Traits</p>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-[#131e63]/80">
          {founderTraits.map((trait) => (
            <li key={trait}>{trait}</li>
          ))}
        </ul>
      </div>
    </div>
  </SlideFrame>
);

const ApplicationSlide = () => (
  <SlideFrame index={2}>
    <SlideTop label="Step 1 · Online Application" />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">Entry point</p>
      <Heading fontSize="clamp(2.4rem,3.5vw,3rem)" fontWeight={700} color="#131e63">
        Applicants submit their story, focus, and AI readiness.
      </Heading>
    </div>
    <div className="grid gap-4 lg:grid-cols-[0.6fr_0.4fr]">
      <div className="border border-[#131e63]/10 bg-white/85 px-5 py-5">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">Application includes</p>
        <ul className="mt-3 space-y-2 text-sm text-[#131e63]/80">
          {applicationInputs.map((item) => (
            <li key={item} className="flex gap-2">
              <DocumentTextIcon className="h-5 w-5 text-[#8dbfeb]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-[#131e63]/10 bg-white/85 px-5 py-5">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">Purpose</p>
        <p className="mt-3 text-sm text-[#131e63]/80">
          Filter for individuals with early insight, motivation, and execution potential before deeper interviews.
        </p>
      </div>
    </div>
  </SlideFrame>
);

const InterviewSlide = () => (
  <SlideFrame index={3}>
    <SlideTop label="Step 2 · Interview & Strength Map" />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">Deep assessment</p>
      <Heading fontSize="clamp(2.4rem,3.5vw,3rem)" fontWeight={700} color="#131e63">
        Structured interviews plus archetype tagging.
      </Heading>
    </div>
    <div className="grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
      <div className="border border-[#131e63]/10 bg-white/85 px-5 py-5">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">20–30 min Interview evaluates</p>
        <ul className="mt-3 space-y-2 text-sm text-[#131e63]/80">
          {interviewFocus.map((item) => (
            <li key={item} className="flex gap-2">
              <IdentificationIcon className="h-5 w-5 text-[#8dbfeb]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-[#131e63]/10 bg-white/85 px-5 py-5">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">Strength mapping</p>
        <ul className="mt-3 space-y-2 text-sm text-[#131e63]/80">
          {founderArchetypes.map((type) => (
            <li key={type.label}>
              <span className="font-semibold text-[#131e63]">{type.label}:</span> {type.detail}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-[#131e63]/70">Mapping helps create balanced startup teams.</p>
      </div>
    </div>
  </SlideFrame>
);

const TeamFormationSlide = () => (
  <SlideFrame index={0}>
    <SlideTop label="Step 3 · Team Formation" />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">How we build balanced teams</p>
      <Heading fontSize="clamp(2.4rem,3.5vw,3rem)" fontWeight={700} color="#131e63">
        Matching criteria ensure every team can ship.
      </Heading>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {formationCriteria.map((item) => (
        <div key={item.title} className="border border-[#131e63]/10 bg-white/85 px-5 py-5">
          <p className="text-base font-semibold text-[#131e63]">{item.title}</p>
          <p className="mt-2 text-sm text-[#131e63]/80">{item.description}</p>
        </div>
      ))}
    </div>
    <div className="border border-[#131e63]/15 bg-[#f8fbff] px-5 py-4 text-sm text-[#131e63]/85">
      Outcome: complete zero-to-one startup teams ready for Week 1.
    </div>
  </SlideFrame>
);

const SelectionSlide = () => (
  <SlideFrame index={1}>
    <SlideTop label="Final Selection & Onboarding" />
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.45em] text-[#8dbfeb]">Acceptance notifications</p>
      <Heading fontSize="clamp(2.4rem,3.5vw,3rem)" fontWeight={700} color="#131e63">
        Teams hit the ground running on Day 1.
      </Heading>
    </div>
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="border border-[#131e63]/10 bg-white/85 px-5 py-5">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">Selected founders receive</p>
        <ul className="mt-3 space-y-2 text-sm text-[#131e63]/80">
          {onboardingDeliverables.map((item) => (
            <li key={item} className="flex gap-2">
              <ClipboardDocumentCheckIcon className="h-5 w-5 text-[#8dbfeb]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-[#131e63]/10 bg-white/85 px-5 py-5">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">Purpose</p>
        <p className="mt-3 text-sm text-[#131e63]/80">Ensure teams lock in logistics, access, and context for the hospital immersion sprint.</p>
      </div>
    </div>
  </SlideFrame>
);

const JourneySlide = () => (
  <SlideFrame index={2}>
    <SlideTop label="Founder Journey" />
    <div className="space-y-5 text-center">
      <Heading fontSize="clamp(2.6rem,3.6vw,3.3rem)" fontWeight={700} color="#131e63">
        Individuals → Teams → Innovators → Founders
      </Heading>
      <p className="text-sm text-[#131e63]/75">The full recruitment flow captures every step it takes to convert talent into future HealthTech leaders.</p>
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#131e63]">
        {journeySteps.map((step, index) => (
          <div key={step} className="flex items-center gap-2 border border-[#131e63]/15 bg-white/85 px-4 py-2">
            <span>{step}</span>
            {index < journeySteps.length - 1 && <ArrowRightIcon className="h-4 w-4 text-[#8dbfeb]" aria-hidden />}
          </div>
        ))}
      </div>
      <div className="mt-4 border border-[#131e63]/10 bg-[#f8fbff] px-5 py-5 text-sm text-[#131e63]/80">
        Outcome: high-performing teams capable of building HealthTech solutions from scratch.
      </div>
      <Link
        href="/contact"
        className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#131e63] px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#101955]"
      >
        Refer a founder <RocketLaunchIcon className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  </SlideFrame>
);

export default function FIFFounderRecruitmentDeck() {
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
            <Slide backgroundColor="transparent" padding={0}>
              <IdealFounderSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <ApplicationSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <InterviewSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <TeamFormationSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <SelectionSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <JourneySlide />
            </Slide>
          </Deck>
        </div>
      </div>
    </div>
  );
}
