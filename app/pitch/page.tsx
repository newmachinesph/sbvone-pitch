"use client";

import Image from "next/image";
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
  "relative flex h-full min-h-[100dvh] flex-col overflow-hidden rounded-[36px] border border-[#131e63]/10 bg-white px-8 py-16 text-[#131e63] lg:px-12 lg:py-20 shadow-[0_30px_80px_rgba(19,30,99,0.12)]";

const specialties = [
  { icon: "⌘", label: "AI & deep tech" },
  { icon: "≈", label: "IoT & AIoT" },
  { icon: "⬡", label: "Cybersecurity" },
  { icon: "⇡", label: "Connectivity & digital infrastructure" },
  { icon: "☁", label: "Cloud-native systems" },
  { icon: "✦", label: "Future-of-work & next-gen digital services" },
];

const innovationFocus = [
  "AI-driven network optimization",
  "Edge-connected smart infrastructure",
  "IoT/AIoT enterprise platforms",
  "Cloud-native connectivity",
  "Cybersecurity & intelligent monitoring",
];

const engineNeeds = [
  "Dealflow",
  "Talent & operations",
  "Program design",
  "Mentorship & investor networks",
  "Startup sourcing",
];

const visibilityBenefits = [
  "Shape challenge statements",
  "Access curated startups and technologies first",
  "Pilot and co-develop breakthroughs",
  "Build a pipeline for investments and acquisitions",
  "Future-proof the technology roadmap",
];

const brandPositions = [
  "A champion of Philippine tech innovation",
  "A forward-thinking, next-generation telco",
  "A preferred partner for enterprise digital transformation",
  "A magnet for high-level engineering and tech talent",
];

const partnershipModels = [
  {
    title: "Strategic Investment",
    description: "Influence program direction and gain full access to portfolio companies.",
  },
  {
    title: "Co-Branded Innovation Program",
    description: "Annual program focused on connectivity, AI, and digital infrastructure.",
  },
  {
    title: "Technology Piloting & Co-Development",
    description: "Pilot startups directly within Infinivan’s infrastructure.",
  },
  {
    title: "Innovation Advisory",
    description: "Insights, dealflow, and emerging-tech intelligence for leadership.",
  },
];

const imperativeForces = [
  "AI-native networks",
  "Software-defined connectivity",
  "Nationwide IoT layers",
  "Smart cities & digital public infrastructure",
  "Automation & intelligent CX platforms",
  "Cloud-integrated everything",
];

const slideBackgrounds = [
  "bg-gradient-to-b from-[#f6f9ff] via-[#e6edfc] to-white",
  "bg-gradient-to-br from-[#f8fbff] via-white to-[#e6edfc]",
  "bg-gradient-to-b from-white to-[#f3f7ff]",
  "bg-gradient-to-br from-white via-[#f5f8ff] to-[#e6edfc]",
];

const getSlideBackground = (index: number) =>
  slideBackgrounds[index % slideBackgrounds.length];

const DeckTemplate = () => (
  <FlexBox
    justifyContent="space-between"
    alignItems="center"
    position="absolute"
    bottom="1.5rem"
    width={1}
    padding="0 2.5rem"
  >
    <Box padding="0 1em">
      <FullScreen color={deckTheme.colors.primary} />
    </Box>
    <Box padding="0 1em" flex="1" display="flex" justifyContent="center">
      <AnimatedProgress
        size={8}
        color={deckTheme.colors.primary}
        pacmanColor={deckTheme.colors.secondary}
      />
    </Box>
  </FlexBox>
);

const SlideTop = () => (
  <div className="flex flex-wrap items-center justify-between gap-4">
    <Link
      href="/"
      className="flex items-center gap-4 border border-[#131e63]/15 bg-white px-4 py-2 text-[#131e63]  transition hover:border-[#131e63]/40"
    >
      <div className="relative h-12 w-40 overflow-hidden bg-[#e6edfc]">
        <Image
          src="/sbv_logo.png"
          alt="Starting Block Ventures logo"
          fill
          className="object-contain py-1"
          sizes="160px"
        />
      </div>
    </Link>
    <p className="text-[11px] uppercase tracking-[0.35em] text-[#131e63]/50">Partnership Pitch</p>
  </div>
);

const TitleSlide = () => (
  <div className={slideShell}>
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute -left-20 top-[-120px] h-80 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(141, 191, 235, 0.35)" }}
      />
      <div
        className="absolute -right-10 bottom-[-80px] h-72 w-96 rounded-full blur-3xl"
        style={{ backgroundColor: "rgba(230, 237, 252, 0.65)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6f9ff] via-[#e6edfc] to-white" />
    </div>

    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-8 text-center">
      <SlideTop />

      <div className="space-y-6">
        <Heading
          fontSize="clamp(3.2rem, 5vw, 4.8rem)"
          lineHeight={1.15}
          fontWeight={700}
          textAlign="center"
          fontFamily="var(--font-manrope, 'Manrope', sans-serif)"
          color="#131e63"
        >
          Strategic Innovation Partnership Proposal
        </Heading>
        <p className="text-lg font-semibold text-[#131e63]">
          Starting Block Ventures &times; Infinivan
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 border border-[#131e63]/10 bg-[#f8fbff] px-6 py-8 ">
          <p className="text-sm uppercase tracking-[0.4em] text-[#8dbfeb]">Vision</p>
          <p className="text-base text-[#131e63]/80">
            Aligning venture-backed innovation with national-scale connectivity to accelerate the
            future of Philippine telecommunications &amp; digital infrastructure.
          </p>
        </div>
        <div
          className="border px-6 py-5 text-sm font-semibold"
          style={{
            borderColor: "rgba(141, 191, 235, 0.45)",
            backgroundColor: "rgba(141, 191, 235, 0.25)",
            color: "#131e63",
          }}
        >
          Accelerating the Future of Philippine Telecommunications &amp; Digital Infrastructure
        </div>
      </div>
    </div>
  </div>
);

const OpportunitySlide = () => (
  <div className={`${slideShell} bg-gradient-to-br from-[#f8fbff] via-white to-[#e6edfc]`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,rgba(141,191,235,0.3),transparent_70%)]" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(circle_at_bottom,rgba(19,30,99,0.08),transparent_70%)]" />
    </div>

    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">The Opportunity</p>
        <Heading
          fontSize="clamp(2.8rem, 4vw, 3.6rem)"
          lineHeight={1.15}
          fontWeight={700}
          textAlign="left"
          fontFamily="var(--font-manrope, 'Manrope', sans-serif)"
          color="#131e63"
        >
          The ICT landscape is changing fast.
        </Heading>
        <p className="text-lg font-medium text-[#131e63]/80">
          Innovation is now the defining advantage in telecommunications.
        </p>
      </div>

      <div className="grid gap-6 text-[#131e63] md:grid-cols-2" data-landscape-grid="2">
        <div className="border border-[#8dbfeb]/40 bg-[#f8fbff] px-6 py-6 text-base">
          AI, deep tech, IoT, and cloud-native systems are reshaping connectivity.
        </div>
        <div className="border border-[#131e63]/10 bg-white px-6 py-6 text-base">
          Philippine digital transformation is accelerating.
        </div>
        <div className="border border-[#131e63]/10 bg-white px-6 py-6 text-base md:col-span-2">
          Leaders win by discovering, testing, and scaling new technologies faster.
        </div>
      </div>

      <div className="border border-[#8dbfeb]/50 bg-[#8dbfeb]/15 px-6 py-6 text-center text-xl font-semibold text-[#131e63]">
        Those who innovate first&mdash;lead.
      </div>
    </div>
  </div>
);

const UrgencySlide = () => (
  <div className={`${slideShell} bg-gradient-to-b from-white to-[#f3f7ff]`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,191,235,0.35),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(230,237,252,0.45),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(19,30,99,0.06) 20%, transparent 20%), linear-gradient(100deg, transparent 80%, rgba(19,30,99,0.04) 80%)",
          backgroundSize: "160px 160px",
        }}
      />
      <div className="absolute inset-y-8 right-6 w-40 rounded-full bg-[#8dbfeb]/25 blur-3xl" />
    </div>

    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">
          Why Infinivan Must Act Now
        </p>
        <Heading
          fontSize="clamp(2.6rem, 3.6vw, 3.2rem)"
          lineHeight={1.2}
          fontWeight={700}
          fontFamily="var(--font-manrope, 'Manrope', sans-serif)"
          color="#131e63"
        >
          The top telcos have already built innovation engines.
        </Heading>
      </div>

      <div className="grid gap-6 text-[#131e63] md:grid-cols-2" data-landscape-grid="2">
        <div className="border border-[#131e63]/10 bg-white px-6 py-6 text-base">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8dbfeb]">PLDT / Smart</p>
          <div className="mt-3 flex h-12 w-32 items-center justify-center rounded-lg bg-[#02282f] px-3">
            <Image
              src="/ideaspace.svg"
              alt="Ideaspace logo"
              width={110}
              height={28}
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-lg font-semibold">Ideaspace</p>
        </div>
        <div className="border border-[#131e63]/10 bg-white px-6 py-6 text-base">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8dbfeb]">Globe</p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <div className="relative h-12 w-32 rounded-lg bg-[#cd2025] px-3 py-2">
              <Image
                src="/kvi-logo.webp"
                alt="Kickstart Ventures logo"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
            <div className="relative h-12 w-32">
              <Image
                src="/917ventures-logo.png"
                alt="917Ventures logo"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          </div>
          <p className="mt-3 text-lg font-semibold">Kickstart Ventures + 917Ventures</p>
        </div>
      </div>

      <p className="border border-[#131e63]/10 bg-white px-6 py-6 text-base text-[#131e63]/80">
        These accelerate their access to emerging technologies, M&amp;A, and new revenue pipelines.
      </p>

      <div className="border border-[#131e63]/10 bg-[#f8fbff] px-6 py-6 text-base text-[#131e63]">
        Infinivan is at a strategic inflection point. Building an innovation ecosystem now is essential
        to stay competitive.
      </div>
    </div>
  </div>
);

const AdvantageSlide = () => (
  <div className={`${slideShell} bg-gradient-to-br from-white via-[#f5f8ff] to-[#e6edfc]`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,191,235,0.35),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(230,237,252,0.45),transparent_80%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(19,30,99,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(19,30,99,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>

    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">
          The Starting Block Advantage
        </p>
        <Heading
          fontSize="clamp(2.6rem, 3.6vw, 3.2rem)"
          lineHeight={1.2}
          fontWeight={700}
          fontFamily="var(--font-manrope, 'Manrope', sans-serif)"
          color="#131e63"
          textAlign="left"
        >
          Philippines-rooted venture building for frontier innovation.
        </Heading>
        <p className="text-lg text-[#131e63]/80">
          Starting Block Ventures is a Philippines-based startup accelerator and venture builder focused
          on high-tech, early-stage innovation.
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-[#8dbfeb]">We specialize in</p>
        <div className="grid gap-4 text-sm text-[#131e63] sm:grid-cols-3" data-landscape-grid="3">
          {specialties.map((item) => (
            <div key={item.label} className="flex items-center gap-3 border border-[#131e63]/10 bg-white/85 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6edfc] text-base font-semibold text-[#131e63]">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="border border-[#131e63]/10 bg-white/90 px-6 py-6 text-base text-[#131e63]/85">
        We transform frontier startups into deployable, scalable technologies.
      </p>
    </div>
  </div>
);

const BringSlide = () => (
  <div className={`${slideShell} ${getSlideBackground(0)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,191,235,0.35),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(230,237,252,0.5),transparent_75%)]" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(19,30,99,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(19,30,99,0.05) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
    </div>
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">
          What We Bring to Infinivan
        </p>
        <Heading
          fontSize="clamp(2.4rem, 3.4vw, 3rem)"
          lineHeight={1.2}
          fontWeight={700}
          fontFamily="var(--font-manrope, 'Manrope', sans-serif)"
          color="#131e63"
          textAlign="left"
        >
          Immediate access to high-potential innovation.
        </Heading>
        <p className="text-base text-[#131e63]/80">Fast innovation—without corporate R&D delays.</p>
      </div>

      <div className="grid gap-4 text-[#131e63] sm:grid-cols-2" data-landscape-grid="2">
        {innovationFocus.map((item) => (
          <div key={item} className="flex items-center gap-3 border border-[#131e63]/10 bg-white/90 px-5 py-4">
            <span className="text-[#8dbfeb]">▹</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EngineSlide = () => (
  <div className={`${slideShell} ${getSlideBackground(1)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,191,235,0.35),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(19,30,99,0.05) 1px, transparent 1px), linear-gradient(30deg, rgba(19,30,99,0.04) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      />
    </div>

    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">
          Plug-and-Play Innovation Engine
        </p>
        <Heading
          fontSize="clamp(2.4rem, 3.4vw, 3rem)"
          lineHeight={1.2}
          fontWeight={700}
          color="#131e63"
          textAlign="left"
          fontFamily="var(--font-manrope, 'Manrope', sans-serif)"
        >
          Starting Block already built the infrastructure.
        </Heading>
      </div>

      <div className="grid gap-6 text-[#131e63] md:grid-cols-2" data-landscape-grid="2">
        <div className="space-y-4 border border-[#131e63]/10 bg-white/90 px-6 py-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8dbfeb]">Requires investment in</p>
          <ul className="space-y-2 text-base">
            {engineNeeds.map((need) => (
              <li key={need} className="flex items-center gap-2">
                <span className="text-[#8dbfeb]">•</span>
                <span>{need}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between border border-[#131e63]/10 bg-[#f8fbff]/90 px-6 py-6">
          <p className="text-base text-[#131e63]/85">
            Starting Block already has the toolkit—Infinivan plugs in and benefits instantly.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#8dbfeb]">
            Minimal operational lift
          </p>
        </div>
      </div>
    </div>
  </div>
);

const VisibilitySlide = () => (
  <div className={`${slideShell} bg-gradient-to-br from-white via-[#f6f9ff] to-[#e6edfc]`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,191,235,0.3),transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#dce9ff]/60 to-transparent" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(19,30,99,0.03) 1px, transparent 1px), linear-gradient(30deg, rgba(19,30,99,0.05) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />
    </div>
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">
          Strategic Visibility Into Emerging Tech
        </p>
        <Heading
          fontSize="clamp(2.4rem, 3.4vw, 3rem)"
          lineHeight={1.2}
          fontWeight={700}
          color="#131e63"
          textAlign="left"
        >
          Infinivan becomes an innovation catalyst.
        </Heading>
      </div>
      <div className="space-y-3 text-[#131e63]">
        {visibilityBenefits.map((point) => (
          <div key={point} className="flex items-center gap-3 border border-[#131e63]/10 bg-white/90 px-5 py-3">
            <span className="text-[#8dbfeb]">▹</span>
            <span>{point}</span>
          </div>
        ))}
      </div>
      <p className="border border-[#131e63]/10 bg-[#f8fbff]/90 px-6 py-6 text-base text-[#131e63]/85">
        Shape, pilot, co-develop, and invest—before anyone else.
      </p>
    </div>
  </div>
);

const BrandSlide = () => (
  <div className={`${slideShell} ${getSlideBackground(3)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,191,235,0.3),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(19,30,99,0.03) 1px, transparent 1px), linear-gradient(45deg, rgba(19,30,99,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">
          Brand & Ecosystem Leadership
        </p>
        <Heading
          fontSize="clamp(2.4rem, 3.4vw, 3rem)"
          lineHeight={1.2}
          fontWeight={700}
          color="#131e63"
          textAlign="left"
        >
          A partnership elevates Infinivan’s position.
        </Heading>
      </div>
      <div className="grid gap-4 text-[#131e63] md:grid-cols-2" data-landscape-grid="2">
        {brandPositions.map((point) => (
          <div key={point} className="border border-[#131e63]/10 bg-white/90 px-5 py-4">
            {point}
          </div>
        ))}
      </div>
      <p className="border border-[#131e63]/10 bg-[#f8fbff]/90 px-6 py-6 text-base text-[#131e63]/90">
        Position Infinivan as leaner, faster, and more visionary.
      </p>
    </div>
  </div>
);

const PartnershipSlide = () => (
  <div className={`${slideShell} ${getSlideBackground(4)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,191,235,0.35),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(19,30,99,0.05) 1px, transparent 1px), linear-gradient(-80deg, rgba(19,30,99,0.04) 1px, transparent 1px)",
          backgroundSize: "110px 110px",
        }}
      />
    </div>
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">
          Partnership Models
        </p>
        <Heading
          fontSize="clamp(2.4rem, 3.4vw, 3rem)"
          lineHeight={1.2}
          fontWeight={700}
          color="#131e63"
          textAlign="left"
        >
          One or a combination of high-leverage engagements.
        </Heading>
      </div>
      <div className="grid gap-4 text-[#131e63] md:grid-cols-2" data-landscape-grid="2">
        {partnershipModels.map((model, index) => (
          <div key={model.title} className="flex flex-col gap-3 border border-[#131e63]/10 bg-white/90 px-5 py-5">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8dbfeb]">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
            <p className="text-lg font-semibold">{model.title}</p>
            <p className="text-sm text-[#131e63]/80">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ImperativeSlide = () => (
  <div className={`${slideShell} ${getSlideBackground(5)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(141,191,235,0.35),transparent_65%)]" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(19,30,99,0.05) 1px, transparent 1px), linear-gradient(0deg, rgba(19,30,99,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">
          The Strategic Imperative
        </p>
        <Heading
          fontSize="clamp(2.4rem, 3.4vw, 3rem)"
          lineHeight={1.2}
          fontWeight={700}
          color="#131e63"
          textAlign="left"
        >
          The next decade of Philippine telecommunications.
        </Heading>
      </div>
      <div className="grid gap-4 text-[#131e63] md:grid-cols-2" data-landscape-grid="2">
        {imperativeForces.map((force) => (
          <div key={force} className="border border-[#131e63]/10 bg-white/90 px-5 py-4">
            {force}
          </div>
        ))}
      </div>
      <p className="border border-[#131e63]/10 bg-[#f8fbff]/90 px-6 py-6 text-base text-[#131e63]/85">
        These innovations will come from startups—not legacy R&amp;D. Starting Block’s mission is to
        find, build, and accelerate them.
      </p>
    </div>
  </div>
);

const VisionSlide = () => (
  <div className={`${slideShell} ${getSlideBackground(6)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(141,191,235,0.35),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(230,237,252,0.45),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(100deg, rgba(19,30,99,0.06) 20%, transparent 20%), linear-gradient(100deg, transparent 80%, rgba(19,30,99,0.04) 80%)",
          backgroundSize: "160px 160px",
        }}
      />
      <div className="absolute inset-y-8 right-6 w-40 rounded-full bg-[#8dbfeb]/25 blur-3xl" />
    </div>

    <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-8 text-center">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">The Vision</p>
        <Heading
          fontSize="clamp(2.8rem, 3.8vw, 3.4rem)"
          lineHeight={1.2}
          fontWeight={700}
          color="#131e63"
          textAlign="center"
        >
          The next-generation telco leader of the Philippines.
        </Heading>
        <p className="text-lg text-[#131e63]/80">
          Enabled by a continuous stream of emerging technologies and venture-backed innovation.
        </p>
      </div>
      <div className="relative mx-auto h-80 w-full max-w-2xl">
        <Image
          src="/illustration.webp"
          alt="Innovation illustration"
          fill
          className="object-contain"
          sizes="512px"
        />
      </div>
    </div>
  </div>
);

const NextStepsSlide = () => (
  <div className={`${slideShell} ${getSlideBackground(7)}`}>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,rgba(141,191,235,0.3),transparent_70%)]" />
      <div className="absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(circle_at_bottom,rgba(19,30,99,0.08),transparent_70%)]" />
    </div>
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(141,191,235,0.3),transparent_70%)]" />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(19,30,99,0.05) 1px, transparent 1px), linear-gradient(180deg, rgba(19,30,99,0.04) 1px, transparent 1px)",
          backgroundSize: "75px 75px",
        }}
      />
    </div>
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#8dbfeb]">Next Steps</p>
        <Heading
          fontSize="clamp(2.4rem, 3.4vw, 3rem)"
          lineHeight={1.2}
          fontWeight={700}
          color="#131e63"
          textAlign="left"
        >
          We’re ready to present.
        </Heading>
      </div>
      <ul className="space-y-3 text-[#131e63]">
        {[
          "Startup pipeline & portfolio",
          "Accelerator roadmap",
          "Partnership framework tailored to Infinivan’s priorities",
        ].map((item) => (
          <li key={item} className="flex items-center gap-3 border border-[#131e63]/10 bg-white/90 px-5 py-3">
            <span className="text-[#8dbfeb]">▹</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center gap-2 border border-[#131e63]/10 bg-[#f8fbff]/90 px-6 py-8 text-center text-base text-[#131e63]/85">
        <div className="relative h-16 w-56">
          <Image
            src="/sbv_logo.png"
            alt="Starting Block Ventures"
            fill
            className="object-contain"
            sizes="224px"
          />
        </div>
        <p className="text-sm text-[#131e63]/70">Startup Accelerator &amp; Venture Builder | Philippines
        </p>
        <p className="text-xl mt-2">Let’s build the future of Philippine innovation—together.</p>
        <Link
          href="https://sbv.one"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-3 inline-flex items-center justify-center rounded-full bg-[#131e63] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#101955]"
        >
          Visit sbv.one
        </Link>
      </div>
    </div>
  </div>
);

export default function PitchDeckSBVOne() {
  return (
    <div className="min-h-[100dvh] bg-[#e6edfc] text-[#131e63]">
      <div className="relative min-h-[100dvh] overflow-hidden bg-[#e6edfc]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
        <div className="relative min-h-[100dvh] mx-auto max-w-6xl px-4 py-12 h-full">
          <Deck template={<DeckTemplate />} theme={deckTheme}>
            <Slide backgroundColor="transparent" padding={0}>
              <TitleSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <OpportunitySlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <UrgencySlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <AdvantageSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <BringSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <EngineSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <VisibilitySlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <BrandSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <PartnershipSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <ImperativeSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <VisionSlide />
            </Slide>
            <Slide backgroundColor="transparent" padding={0}>
              <NextStepsSlide />
            </Slide>
          </Deck>
        </div>
      </div>
    </div>
  );
}
