import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SBV.one | Accelerator Programs",
  description: "Discover SBV.one accelerator programs, currently directing founders to the FutureCare HealthTech experience.",
};

export default function AcceleratorPage() {
  redirect("/futurecare");
}
