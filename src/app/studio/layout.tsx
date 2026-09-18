import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Studio Culture, Ethos & Craft Philosophy",
  description:
    "Inside Aevion Studio: our engineering-first culture, craft obsession, creative drive, and direct founder collaboration model.",
  path: "/studio",
  keywords: [
    "Aevion Studio Culture",
    "Creative Technology Studio",
    "Engineering Ethos",
  ],
});

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Studio", url: "/studio" },
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
