import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Starting Block Ventures | SBV.one",
  description:
    "Reach Starting Block Ventures to discuss mentorship, partnerships, investment collaborations, or accelerator support.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
