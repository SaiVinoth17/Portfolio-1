import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Leadership Dossier & Technical CV",
  description:
    "Verified technical dossier and architecture record for Aevion Studio founder and lead engineer Sai Rio (Sai Vinoth). Co-founded with Edison. Full-stack engineering, AI LLM pipelines, and creative WebGL motion.",
  path: "/resume",
  keywords: [
    "Sai Rio Resume",
    "Sai Vinoth Resume",
    "Edison Resume",
    "Aevion Studio Dossier",
    "Software Architect CV",
  ],
});

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Resume", url: "/resume" },
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
