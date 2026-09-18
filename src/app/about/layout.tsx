import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "About & Founders Dossier | Sai Rio & Edison",
  description:
    "Learn about Aevion Studio co-founders Sai Rio (Founder · Lead Engineer) and Edison (Co-Founder). Conceived, architected, and engineered from scratch by Sai Rio.",
  path: "/about",
  keywords: [
    "Sai Rio",
    "Sai Vinoth",
    "Edison",
    "Aevion Studio Founders",
    "About Aevion",
    "AI Software Studio Team",
  ],
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
