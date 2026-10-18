import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

const defaultFooterLinks: FooterLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Ventures", href: "/ventures" },
  { label: "FAQs", href: "/contact#faq" },
  { label: "Contact Us", href: "/contact" },
];

type SiteFooterProps = {
  links?: FooterLink[];
};

export default function SiteFooter({ links = defaultFooterLinks }: SiteFooterProps) {
  return (
    <footer className="bg-[#131e63] px-4 py-16 text-white sm:px-8">
      <div className="mx-auto grid w-full max-w-[1536px] gap-6 text-sm sm:grid-cols-2">
        <div>
          <p className="font-semibold">Starting Block Ventures - Building our digital future</p>
          <p className="text-white/70">Makati, Philippines - Global network</p>
        </div>
        <div className="flex flex-col items-start text-xs uppercase tracking-[0.4em] text-white/80 sm:items-end sm:text-right">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <p className="mt-26 text-center text-xs uppercase tracking-[0.4em] text-white/60">
        Copyright @ 2025 | Starting Block Ventures | All Rights Reserved
      </p>
    </footer>
  );
}
