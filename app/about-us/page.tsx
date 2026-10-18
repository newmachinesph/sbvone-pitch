import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const coreValues = [
  {
    title: "Innovation",
    description:
      "We stay on the frontier of emerging tech to uncover solutions that push industries forward and create meaningful change.",
  },
  {
    title: "Collaboration",
    description:
      "We embed with founders as hands-on partners, sharing playbooks, teams, and resources to accelerate outcomes.",
  },
  {
    title: "Integrity",
    description:
      "We keep our word and operate transparently so founders, partners, and investors always know where they stand.",
  },
  {
    title: "Empowerment",
    description:
      "We create environments where builders make bold decisions, learn fast, and grow into resilient leaders.",
  },
  {
    title: "Sustainability",
    description:
      "We encourage responsible growth that considers people, communities, and long-term impact-not just near-term wins.",
  },
  {
    title: "Excellence",
    description:
      "We hold ourselves to high standards across execution, craft, and experience so every venture we touch improves.",
  },
];

export const metadata: Metadata = {
  title: "SBV.one | About Starting Block Ventures",
  description:
    "Discover Starting Block Ventures' mission, vision, and core values behind its hands-on venture building model with founders.",
};

export default function AboutUsPage() {
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
          <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Building startups together</p>
          <h1 className="text-4xl font-semibold leading-tight text-[#131e63] sm:text-5xl">About Starting Block Ventures</h1>
          <p className="text-lg text-[#131e63]/80 max-w-3xl mx-auto">
            Accelerating startups through hands-on collaboration, shared resources, and active partnership every step of the way.
          </p>
        </section>

        <section className="mx-auto mt-14 grid gap-10 p-10 relative">
                      <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/70 to-transparent" />
              <div className="absolute inset-y-0 left-[-15%] w-1/2 bg-[radial-gradient(circle,rgba(19,30,99,0.08),transparent_65%)]" />
            </div>       
          <div className="mx-auto max-w-5xl space-y-5 text-lg text-[#131e63]/80 z-10">
          
            <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">About Us</p>
            <p>
              At Starting Block Ventures, we're not just another startup accelerator. We're builders, doers, and collaborators who roll up our sleeves and
              dive into the heart of your business.
            </p>
            <p>
              We go beyond mentorship and guidance-we become an extension of your team. From shaping your business model to developing scalable products,
              we leverage our expertise, resources, and networks to transform your vision into a thriving venture.
            </p>
            <p>
              Our mission is to fuel innovation by working hand-in-hand with founders, taking on the challenges of scaling and operationalizing their
              ideas. Whether it's securing key partnerships, refining go-to-market strategies, or solving the day-to-day complexities of building a
              business, we're right there in the trenches with you.
            </p>
            <p>
              At our core, we believe that startups don't just need advice-they need action. That's why we're committed to co-creating businesses that
              matter, driving growth through real-world collaboration, and accelerating success in industries that shape the future.
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 border border-[#131e63]/10 bg-white/90 p-8 shadow-[0_15px_40px_rgba(19,30,99,0.1)]">
            <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">Our Mission</p>
            <h2 className="text-2xl font-semibold text-[#131e63]">Empowering founders with action.</h2>
            <p className="text-base text-[#131e63]/75">
              Our mission is to empower early-stage startups with the resources, mentorship, and networks needed to thrive. We connect entrepreneurs with
              experts and investors, transforming visionary ideas into sustainable businesses. Committed to excellence, we aim to shape the future of
              technology and drive meaningful change in the startup ecosystem.
            </p>
          </div>
          <div className="space-y-4 border border-[#131e63]/10 bg-[#131e63] p-8 text-white shadow-[0_15px_40px_rgba(19,30,99,0.2)]">
            <p className="text-xs uppercase tracking-[0.4em] text-[#8dbfeb]">Our Vision</p>
            <h2 className="text-2xl font-semibold text-white">Building a tech-enabled future.</h2>
            <p className="text-base text-white/80">
              Our vision is to be the leading catalyst for innovation, empowering entrepreneurs to turn groundbreaking ideas into successful, tech-driven
              businesses. We strive to create a collaborative ecosystem where creativity thrives, startups solve real-world challenges, and a
              sustainable, tech-enabled future takes shape.
            </p>
          </div>
        </section>

        <section className="mt-16 border border-[#131e63]/10 bg-gradient-to-r from-white via-[#f8fbff] to-white p-10 shadow-[0_25px_70px_rgba(19,30,99,0.12)]">
          <div className="space-y-3 text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Our Core Values</p>
            <h2 className="text-3xl font-semibold text-[#131e63]">Principles that guide every build.</h2>
            <p className="text-sm text-[#131e63]/70">
              These values anchor how we show up for founders, partners, and communities. They keep us aligned when momentum accelerates and stakes rise.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {coreValues.map((value) => (
              <div key={value.title} className="border border-[#131e63]/10 bg-white/90 p-6 text-left shadow-[0_10px_30px_rgba(19,30,99,0.08)]">
                <p className="text-lg font-semibold text-[#131e63]">{value.title}</p>
                <p className="mt-2 text-sm text-[#131e63]/75">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
