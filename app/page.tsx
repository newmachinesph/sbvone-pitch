import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import {
  BriefcaseIcon,
  ChartBarIcon,
  CpuChipIcon,
  GlobeAltIcon,
  HeartIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const industries = [
  {
    title: "AI",
    description: "Harnessing predictive, autonomous, and adaptive technologies",
    Icon: CpuChipIcon,
  },
  {
    title: "Web3",
    description: "Leveraging Web3 for decentralized enterprise resource management solutions.",
    Icon: GlobeAltIcon,
  },
  {
    title: "Healthcare",
    description: "Innovating solutions to improve patient care and medical efficiency.",
    Icon: HeartIcon,
  },
  {
    title: "Logistics",
    description: "Optimizing supply chain and transportation systems for efficiency.",
    Icon: TruckIcon,
  },
  {
    title: "Analytics",
    description: "Transforming raw data into actionable insights for strategic decisions.",
    Icon: ChartBarIcon,
  },
  {
    title: "BPO",
    description: "Streamlining business processes through outsourced operational support.",
    Icon: BriefcaseIcon,
  },
];

const whyUs = [
  {
    title: "Personalized Mentorship",
    description:
      "Startups receive tailored guidance from experienced mentors who provide insights and support throughout their entrepreneurial journey, helping them succeed effectively.",
  },
  {
    title: "Access to Funding",
    description:
      "Starting Block Ventures connects startups with venture capitalists and funding opportunities, facilitating financial support to help them grow and succeed.",
  },
  {
    title: "Comprehensive Skill",
    description:
      "The program includes workshops focused on essential business skills, equipping entrepreneurs with the knowledge needed to navigate the market effectively.",
  },
  {
    title: "Expansive Networking Opportunities",
    description:
      "Participants gain access to a vast network of industry leaders and investors, fostering valuable relationships that can lead to partnerships and growth.",
  },
  {
    title: "Cutting-edge Tech Resources",
    description:
      "Startups gain access to a robust suite of technological tools, including ICT solutions, software platforms, and development resources to stay competitive.",
  },
];

export const metadata: Metadata = {
  title: "SBV.one | Starting Block Ventures",
  description:
    "Starting Block Ventures empowers early-stage teams with mentorship, operator support, and access to AI, healthcare, logistics, and data partners across the Philippines.",
};

export default function LandingPage() {
  return (
    <div className="font-[family:var(--font-manrope)] relative min-h-screen overflow-hidden bg-[#e6edfc] text-[#131e63]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,191,235,0.4),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0,rgba(230,237,252,0.6),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(19,30,99,0.08),transparent_75%)]" />
      </div>
      <SiteHeader />

      <div className="relative flex min-h-screen w-full flex-col pt-10">
        <div className="mx-auto w-full max-w-[1536px]">
          <main className="pt-8">
            <section className="relative py-28" id="hero">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />
              <div className="absolute inset-y-0 left-[-15%] w-1/2 bg-[radial-gradient(circle,rgba(19,30,99,0.08),transparent_65%)]" />
            </div>
            <div className="relative max-w-4xl space-y-8 px-4 sm:px-8 lg:px-16">
              <h1 className="text-4xl font-semibold leading-tight text-[#131e63] sm:text-5xl lg:text-6xl">
                Building startups together
              </h1>
              <p className="text-lg text-[#131e63]/80">
                Starting Block Ventures empowers early-stage startups with mentorship, resources, and networking opportunities to transform
                innovative ideas into successful technology-driven businesses.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/ventures"
                  className="inline-flex items-center justify-center border border-[#131e63]/30 bg-[#131e63] px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:border-[#131e63] hover:bg-[#101955]"
                >
                  See the ventures
                </Link>
              </div>
              <div className="grid gap-4 text-sm text-[#131e63]/70 sm:grid-cols-2">
                {[
                  "Mentorship + venture building in one studio",
                  "Enterprise access across AI, infra, and frontier tech",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 border border-[#131e63]/10 bg-white/80 px-4 py-3">
                    <span className="h-2 w-2 bg-[#8dbfeb]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="about"
            className="relative -mx-4 overflow-hidden bg-[#131e63] px-8 py-20 text-white shadow-[0_25px_70px_rgba(19,30,99,0.35)] sm:-mx-8 sm:px-10 lg:-mx-16 lg:px-16"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-y-0 left-[-15%] w-2/3 bg-[radial-gradient(circle_at_top,rgba(141,191,235,0.45),transparent_65%)]" />
              <div className="absolute inset-y-0 right-[-10%] w-1/3 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.1),transparent_70%)]" />
            </div>
            <div className="relative grid gap-12 md:grid-cols-[0.9fr_1.1fr] max-w-7xl mx-auto lg:px-8">
              <div className="space-y-5">
                <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">What we do</p>
                <h2 className="text-3xl font-semibold text-white">We champion the trailblazers.</h2>
                <p className="text-base text-white/80">
                  We track down the companies bold enough to reinvent how we live. Innovation fuels sustainability, and we provide mentorship, capital
                  support, and meaningful connections so founders stay resilient when the journey gets tough.
                </p>
                <p className="text-base text-white/75">
                  Our partnerships go beyond funding. We co-design strategy, share operating muscle, and align on a shared vision so pioneering teams can
                  deploy technology that moves society forward.
                </p>
              </div>
              <div className="border border-white/15 bg-white/10 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.15)] backdrop-blur">
                <p className="text-base font-semibold text-white">
                  We study how founders stay motivated, the habits that propel teams, and the traits that turn big visions into enduring companies.
                  Each insight loops back into the community so the next builder moves faster.
                </p>
                <div className="mt-6 grid gap-4 text-sm text-white/85 sm:grid-cols-2">
                  {[
                    "Daily founder rituals that sustain momentum",
                    "Frameworks for scaling with trust and shared vision",
                    "Stories that reveal what makes a great company",
                    "Tools that turn experiments into repeatable wins",
                  ].map((item) => (
                    <div key={item} className="border border-white/15 bg-white/5 px-4 py-3">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

            <section className="-mx-4 space-y-8 border border-[#131e63]/10 bg-gradient-to-r from-white via-[#f8fbff] to-white px-4 py-16 shadow-[0_20px_60px_rgba(19,30,99,0.12)] sm:-mx-8 sm:px-8 lg:-mx-16 lg:px-16 " id="industries">
            <div className="max-w-7xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">Our Industries at a Glance</p>
              <h2 className="mt-2 text-3xl font-semibold text-[#131e63]">Where we focus our energy.</h2>
              <p className="mt-3 text-sm text-[#131e63]/75">
                We back categories where our mentors, enterprise partners, and research pipeline already run deep.
              </p>
            </div>
            <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry) => (
                <div key={industry.title} className="flex flex-col gap-4 border border-[#131e63]/10 bg-[#f8fbff] p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center bg-white">
                      <industry.Icon className="h-6 w-6 text-[#131e63]" aria-hidden />
                    </div>
                    <p className="text-xl font-semibold text-[#131e63]">{industry.title}</p>
                  </div>
                  <p className="text-sm text-[#131e63]/80">{industry.description}</p>
                </div>
              ))}
            </div>
          </section>

            <section className="space-y-8 px-6 py-16 sm:px-10" id="ventures">
            <div className="space-y-3 text-center max-w-7xl mx-auto">
              <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">Why Us?</p>
              <h2 className="text-3xl font-semibold text-[#131e63]">The support system founders deserve.</h2>
              <p className="text-sm text-[#131e63]/70">Every program layer is operator-built, so founders receive more than generic advice.</p>
            </div>
            <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {whyUs.map((item) => (
                <div key={item.title} className="border border-[#131e63]/10 bg-white/90 p-6 shadow-[0_10px_35px_rgba(19,30,99,0.08)]">
                  <p className="text-sm uppercase tracking-[0.35em] text-[#8dbfeb]">{item.title}</p>
                  <p className="mt-3 text-sm text-[#131e63]/85">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
          </main>
        </div>

        <section
          id="cta"
          className="relative mt-10 overflow-hidden px-4 py-16 shadow-[0_25px_70px_rgba(19,30,99,0.12)] sm:px-8"
        >
          <div
            className="absolute inset-0 bg-center"
            style={{
              backgroundImage:
                "url('https://ventures.bullrun.one/wp-content/uploads/2024/12/priscilla-du-preez-VkMH9BvNVRY-unsplash.jpg')",
              backgroundSize: "cover",
            }}
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
          <div className="relative mx-auto flex w-full max-w-[1536px] flex-col items-center gap-6 border border-white/40 bg-white/50 px-8 py-12 text-center backdrop-blur-[1px]">
            <p className="text-xs uppercase tracking-[0.5em] text-[#131e63]">Connect, Innovate, Succeed!</p>
            <h2 className="text-3xl font-semibold text-[#131e63]">Ready to partner with Starting Block Ventures?</h2>
            <p className="max-w-3xl text-sm text-[#131e63]/80">
              Tell us about your startup, partnership idea, or investment goals and we&apos;ll set up a discovery session within the week.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center bg-[#131e63] px-8 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-[#101955]">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}
