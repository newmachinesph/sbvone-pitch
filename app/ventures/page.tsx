import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const ventures = [
  { name: "InstantStudio", focus: "AI images", logo: "/venture-imgs/instantstudio-logo.png", url: "https://instantstudio.ai/" },
  { name: "TikTag", focus: "AI & Web3", logo: "/venture-imgs/tiktag-logo.png", url: "https://tiktag.app/" },
  { name: "Dogm.ai", focus: "AI bootcamps", logo: "/venture-imgs/dogmai-logo.png", url: "https://dogm.ai/" },
  { name: "Korfshore", focus: "Staff augmentation", logo: "/venture-imgs/korfshore-logo.png", url: "https://korfshore.com/" },
  { name: "Xend", focus: "Logistics", logo: "/venture-imgs/xend-logo.png", url: "https://xend.com.ph/" },
  { name: "Feenex", focus: "Expenses digitization", logo: "/venture-imgs/feenex-logo.jpeg", url: "https://get.feenex.app/" },
  { name: "Tekkicart", focus: "Ecommerce", logo: "/venture-imgs/tekkicart-logo.png", url: "https://www.tekkicart.com/" },
  { name: "Breakpoints Live", focus: "Agentic maker", logo: "/venture-imgs/breakpointslive-logo.png", url: "https://breakpoints.live/" },
  { name: "Kranium", focus: "Healthcare analytics", logo: "/venture-imgs/kranium-logo.png", url: "https://kranium.com.ph/" },
  { name: "HealthSpace", focus: "Healthcare", logo: "/venture-imgs/healthspace-logo.png", url: "https://healthspace.ph/" },
  { name: "Artweex", focus: "Jobs", logo: "/venture-imgs/artweex-logo.png", url: "https://artweex.com/" },
  { name: "Incub8space", focus: "Virtual office solutions", logo: "/venture-imgs/incub8space-logo.png", url: "https://incub8space.com/" },
  { name: "Ximplify", focus: "Smart Billing", logo: "/venture-imgs/ximplify-logo.png", url: "https://ximplify.it/" },
  { name: "RemoteTalent PH", focus: "Remote Jobs", logo: "/venture-imgs/remotetalentph-logo.png", url: "https://remotetalent.ph/" },
];

export const metadata: Metadata = {
  title: "SBV.one | Ventures Portfolio",
  description:
    "Explore SBV.one's portfolio of AI, Web3, healthcare, logistics, and frontier ventures supported with capital, pilots, and operator expertise.",
};

export default function VenturesPage() {
  return (
    <div className="font-[family:var(--font-manrope)] relative min-h-screen overflow-hidden bg-[#e6edfc] text-[#131e63]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,191,235,0.4),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0,rgba(230,237,252,0.6),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(19,30,99,0.08),transparent_75%)]" />
      </div>
      <SiteHeader />

      <main className="relative mx-auto w-full max-w-[1536px] px-4 py-16 sm:px-8 lg:px-16">
        <section className="border border-[#131e63]/15 bg-white/90 px-10 py-16 shadow-[0_25px_70px_rgba(19,30,99,0.12)]">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Ventures</p>
              <h1 className="text-4xl font-semibold text-[#131e63] sm:text-5xl">Investing in the frontier.</h1>
              <p className="text-lg text-[#131e63]/80">
                We're a venture accelerator at the forefront of technological advancement. Our portfolio spans cutting-edge sectors including Web3 and
                Generative AI. We partner with visionary founders to build disruptive companies, providing the resources, expertise, and strategic guidance
                needed to thrive.
              </p>
              <p className="text-base text-[#131e63]/75">
                Whether you're an investor seeking high-potential ventures or a tech founder looking to scale your idea, we offer a unique opportunity to shape
                the future of technology.
              </p>
            </div>
            <div className="p-6 text-sm text-[#131e63]/50">
            </div>
          </div>
        </section>

        <section className="mt-14 border border-[#131e63]/15 bg-gradient-to-r from-white via-[#f8fbff] to-white px-10 py-12 shadow-[0_25px_70px_rgba(19,30,99,0.12)]">
          <div className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Our portfolio</div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ventures.map((venture) => (
              <a
                key={venture.name}
                href={venture.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-[#131e63]/15 bg-white/95 px-6 py-8 shadow-[0_10px_30px_rgba(19,30,99,0.08)] transition hover:-translate-y-1 hover:border-[#131e63]/30 hover:shadow-[0_20px_40px_rgba(19,30,99,0.12)]"
              >
                {venture.logo && (
                  <div className="mb-4 max-w-[200px]">
                    <Image
                      src={venture.logo}
                      alt={`${venture.name} logo`}
                      width={160}
                      height={48}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                )}
                <p className="text-2xl font-semibold text-[#131e63]">{venture.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.35em] text-[#8dbfeb]">{venture.focus}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-14 border border-[#131e63]/10 bg-[#131e63] px-10 py-14 text-white shadow-[0_25px_70px_rgba(19,30,99,0.25)]">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.5em] text-[#8dbfeb]">Partner with us</p>
              <h2 className="text-3xl font-semibold text-white">Let's build the future together.</h2>
              <p className="text-sm text-white/80">
                Are you a tech founder with a groundbreaking idea? Join forces with our team of experienced entrepreneurs and technologists. We provide the
                ideal platform to turn your vision into reality. Let's build the future together.
              </p>
            </div>
            <div className="space-y-4 border border-white/20 bg-white/10 p-6 text-sm text-white/85">
              <p>Contact us today to explore opportunities and accelerate your venture's growth.</p>
              <p>We respond within a few days with feedback, next steps, and introductions tailored to your needs.</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center border border-white bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#131e63] transition hover:bg-white/80"
                >
                  Contact Us
                </a>
                <a
                  href="/futurecare"
                  className="inline-flex items-center justify-center border border-white/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/15"
                >
                  Explore Programs
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
