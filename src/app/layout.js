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
  title: "Aevion — Futuristic Technology & AI Studio | Sai Rio & Edison",
  description: "Aevion is an AI & experimental technology studio founded by Sai Rio and Edison. Two builders. One vision. Technology without limits.",
  keywords: [
    "Aevion",
    "Aevion Studio",
    "Sai Rio",
    "Edison",
    "AI Software Studio",
    "Futuristic Technology Lab",
    "Digital Engineering",
    "Modern Web Applications",
    "SaaS Development",
    "Autonomous AI Systems",
    "Creative Web Engineering",
    "Nilgiris Explorers",
    "Ooty Mistwings",
    "Gaming Kingdom"
  ],
  authors: [{ name: "Sai Rio" }, { name: "Edison" }, { name: "Aevion Studio" }],
  metadataBase: new URL("https://aevion.studio"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aevion — Futuristic Technology & AI Studio | Sai Rio & Edison",
    description: "Two builders. One vision. Technology without limits. Engineering autonomous AI, high-throughput systems, and next-generation software.",
    url: "https://aevion.studio",
    siteName: "Aevion Studio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevion — Futuristic Technology & AI Studio | Sai Rio & Edison",
    description: "Two builders. One vision. Technology without limits. Engineering autonomous AI, high-throughput systems, and next-generation software.",
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
        "founders": [
          {
            "@type": "Person",
            "name": "Sai Rio",
            "jobTitle": "Co-Founder",
            "sameAs": "https://github.com/SaiVinoth17",
            "knowsAbout": ["Product", "Engineering", "AI", "Systems", "Vision"]
          },
          {
            "@type": "Person",
            "name": "Edison",
            "jobTitle": "Co-Founder",
            "sameAs": "https://github.com/edisonedi84431-art",
            "knowsAbout": ["Development", "Technology", "Engineering", "Building"]
          }
        ],
        "description": "A serious futuristic technology studio founded by Sai Rio and Edison. Two builders. One vision. Technology without limits.",
        "sameAs": ["https://github.com/SaiVinoth17", "https://github.com/edisonedi84431-art", "https://github.com/aevionstudio"]
      },
      {
        "@type": "Person",
        "@id": "https://aevion.studio/#sairio",
        "name": "Sai Rio",
        "jobTitle": "Co-Founder",
        "sameAs": "https://github.com/SaiVinoth17",
        "worksFor": {
          "@id": "https://aevion.studio/#organization"
        }
      },
      {
        "@type": "Person",
        "@id": "https://aevion.studio/#edison",
        "name": "Edison",
        "jobTitle": "Co-Founder",
        "sameAs": "https://github.com/edisonedi84431-art",
        "worksFor": {
          "@id": "https://aevion.studio/#organization"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "Aevion Studio OS",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
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
