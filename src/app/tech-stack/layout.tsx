import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Production Tech Stack & Systems Architecture",
  description:
    "Comprehensive breakdown of Aevion Studio's production technology stack: Next.js 16, React 19, TypeScript, Groq LLM, GSAP, Three.js, and PostgreSQL.",
  path: "/tech-stack",
  keywords: [
    "Tech Stack",
    "Next.js 16 Stack",
    "Groq Llama Inference",
    "Three.js WebGL",
    "TypeScript Full-Stack",
  ],
});

export default function TechStackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tech Stack", url: "/tech-stack" },
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
