import type { Metadata } from "next";
import { Roboto, Manrope } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sbv.one"),
  title: "SBV.one | Starting Block Ventures",
  description:
    "Starting Block Ventures accelerates frontier startups in the Philippines with hands-on venture building, operator support, and programs like the FutureCare Accelerator.",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "SBV.one | Starting Block Ventures",
    description:
      "Starting Block Ventures accelerates frontier startups in the Philippines through mentorship, operator support, and programs like the FutureCare Accelerator.",
    url: "https://sbv.one",
    siteName: "Starting Block Ventures",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/starting-block-ventures.jpg",
        alt: "Starting Block Ventures brand hero graphic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SBV.one | Starting Block Ventures",
    description:
      "Starting Block Ventures accelerates frontier startups in the Philippines with mentorship, operator support, and deep industry programs.",
    images: ["/starting-block-ventures.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} ${manrope.variable} antialiased`}>
        {children}
        <GoogleAnalytics gaId="G-TCYQWZ0XMK" />
      </body>
    </html>
  );
}
