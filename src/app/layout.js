import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";
import LenisProvider from "./providers/LenisProvider";
import EnhancementProvider from "@/components/enhancements/EnhancementProvider";
import PageBackground from "@/components/PageBackground";
import { Analytics } from "@vercel/analytics/next";

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
  metadataBase: new URL("https://www.aevionstudio.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aevion — Futuristic Technology & AI Studio | Sai Rio & Edison",
    description: "Two builders. One vision. Technology without limits. Engineering autonomous AI, high-throughput systems, and next-generation software.",
    url: "https://www.aevionstudio.in",
    siteName: "Aevion Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Aevion Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aevion — Futuristic Technology & AI Studio | Sai Rio & Edison",
    description: "Two builders. One vision. Technology without limits. Engineering autonomous AI, high-throughput systems, and next-generation software.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.aevionstudio.in/#organization",
        "name": "Aevion Studio",
        "url": "https://www.aevionstudio.in",
        "logo": "https://www.aevionstudio.in/images/aevion-logo.png",
        "email": "hello@aevionstudio.in",
        "founders": [
          {
            "@type": "Person",
            "name": "Sai Rio (Sai Vinoth)",
            "jobTitle": "Founder & Lead Engineer",
            "sameAs": "https://github.com/SaiVinoth17",
            "knowsAbout": ["Full Stack Development", "Systems Architecture", "AI/ML Engineering", "Next.js", "Cloud Backends"]
          },
          {
            "@type": "Person",
            "name": "Edison",
            "jobTitle": "Co-Founder",
            "sameAs": "https://github.com/edisonedi84431-art",
            "knowsAbout": ["Studio Operations", "Digital Strategy", "Brand Direction", "Product Strategy"]
          }
        ],
        "description": "An elite technology studio building autonomous AI systems, resilient software products, high-performance web experiences, and experimental digital architectures. Founded by Sai Rio and Edison. Conceived and engineered from scratch by Sai Rio.",
        "sameAs": ["https://github.com/SaiVinoth17", "https://github.com/edisonedi84431-art", "https://github.com/aevionstudio"],
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Tamil Nadu",
          "addressCountry": "India"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer service & project inquiry",
          "email": "hello@aevionstudio.in",
          "url": "https://www.aevionstudio.in/contact",
          "availableLanguage": ["English", "Tamil"]
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.aevionstudio.in/#sairio",
        "name": "Sai Rio (Sai Vinoth)",
        "jobTitle": "Founder & Lead Engineer",
        "sameAs": "https://github.com/SaiVinoth17",
        "worksFor": {
          "@id": "https://www.aevionstudio.in/#organization"
        }
      },
      {
        "@type": "Person",
        "@id": "https://www.aevionstudio.in/#edison",
        "name": "Edison",
        "jobTitle": "Co-Founder",
        "sameAs": "https://github.com/edisonedi84431-art",
        "worksFor": {
          "@id": "https://www.aevionstudio.in/#organization"
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
            "item": "https://www.aevionstudio.in"
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
            <Analytics />
          </EnhancementProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
