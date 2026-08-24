import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import LenisProvider from "./providers/LenisProvider";
import EnhancementProvider from "@/components/enhancements/EnhancementProvider";
import PageBackground from "@/components/PageBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Aevion Studio — AI Software & Digital Engineering Studio by Sai Vinoth",
  description: "Aevion Studio is an AI software & digital engineering studio founded by Sai Vinoth. Building modern web applications, SaaS platforms, AI solutions, and custom software for high-growth businesses.",
  keywords: [
    "AI Software Development",
    "Digital Engineering Studio",
    "Sai Vinoth",
    "Modern Web Applications",
    "SaaS Development",
    "Business Automation",
    "Custom Software Studio",
    "Nilgiris Explorers",
    "Ooty Mistwings",
    "Gaming Kingdom",
    "Aevion Studio"
  ],
  authors: [{ name: "Sai Vinoth" }, { name: "Aevion Studio" }],
  metadataBase: new URL("https://aevion.studio"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aevion Studio — AI Software & Digital Engineering Studio by Sai Vinoth",
    description: "Building modern web applications, SaaS platforms, AI solutions, and custom software for high-growth businesses.",
    url: "https://aevion.studio",
    siteName: "Aevion Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevion Studio — AI Software & Digital Engineering Studio by Sai Vinoth",
    description: "Building modern web applications, SaaS platforms, AI solutions, and custom software for high-growth businesses.",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://aevion.studio/#organization",
        "name": "Aevion Studio",
        "url": "https://aevion.studio",
        "email": "hello@aevion.studio",
        "founder": {
          "@type": "Person",
          "name": "Sai Vinoth",
          "jobTitle": "Founder & Software Engineer"
        },
        "description": "A premium AI Software & Digital Engineering Studio building modern websites, web applications, AI solutions, SaaS products, and custom software.",
        "sameAs": ["https://twitter.com/aevionstudio", "https://github.com/aevionstudio"]
      },
      {
        "@type": "Person",
        "@id": "https://aevion.studio/#saivinoth",
        "name": "Sai Vinoth",
        "jobTitle": "Software Engineer & Founder",
        "worksFor": {
          "@id": "https://aevion.studio/#organization"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Aevion Studio Motion OS",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://aevion.studio"
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="stylesheet" href="https://db.onlinewebfonts.com/c/22b4c73e6141de7c9937f42cb58bdb4b?family=GT+America+Expanded+Bold" />
        <link rel="stylesheet" href="https://db.onlinewebfonts.com/c/879269be836bf8d970d4ef4fb0e54f42?family=GT+America+Extended+Regular" />
        <link rel="stylesheet" href="https://db.onlinewebfonts.com/c/40794b621791bf498f2f06237862031f?family=GT+America+Extended+Bold" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white selection:bg-emerald-500 selection:text-black`}
      >
        <LenisProvider>
          <EnhancementProvider>
            <Navbar />
            {children}
            <Footer />
            <FloatingButton />
          </EnhancementProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
