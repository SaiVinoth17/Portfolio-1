import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Aevion Journal · Engineering, Systems & Craft",
  description:
    "Technical articles, deep architecture breakdowns, WebGL optimization guides, and AI pipeline walkthroughs written by Aevion Studio engineers.",
  path: "/blog",
  keywords: [
    "Aevion Journal",
    "Engineering Blog",
    "WebGL Performance",
    "Streaming AI LLM",
    "Next.js App Router Architecture",
  ],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Journal", url: "/blog" },
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
