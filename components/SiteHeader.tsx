"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

const defaultNavLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Ventures", href: "/ventures" },
  { label: "Accelerator", href: "/futurecare" },
  { label: "Contact Us", href: "/contact" },
];

type SiteHeaderProps = {
  links?: NavLink[];
};

export default function SiteHeader({ links = defaultNavLinks }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((open) => !open);
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#131e63]/10 bg-[#e6edfc]/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-screen-3xl items-center px-4 py-3 sm:px-8 lg:px-16">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em]" onClick={handleCloseMenu}>
          <div className="relative h-10 w-32">
            <Image src="/sbv_logo.png" alt="Starting Block Ventures" fill className="object-contain" sizes="128px" />
          </div>
        </Link>
        <nav className="ml-auto hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#131e63]/70 md:flex">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-[#8dbfeb]">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#131e63]/20 text-[#131e63] transition hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8dbfeb] md:hidden"
          onClick={handleToggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full rounded-full bg-[#131e63] transition-transform duration-200 ${
                isMenuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-[#131e63] transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full rounded-full bg-[#131e63] transition-transform duration-200 ${
                isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
      <div
        className={`absolute left-0 right-0 top-full border-b border-[#131e63]/15 bg-[#e6edfc]/95 px-4 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#131e63] shadow-lg transition-all duration-200 sm:px-8 lg:px-16 md:hidden ${
          isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-[#8dbfeb]" onClick={handleCloseMenu}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
