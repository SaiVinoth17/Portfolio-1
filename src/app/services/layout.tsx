import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Core Studio Engineering Services",
  description:
    "Production-grade software engineering, autonomous AI systems, interactive 3D WebGL motion experiences, and high-throughput SaaS architectures built by Aevion Studio.",
  path: "/services",
  keywords: [
    "AI Systems Engineering",
    "SaaS Architecture",
    "WebGL Creative Development",
    "Next.js Development",
    "Full-Stack Software Engineering",
  ],
});

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
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
