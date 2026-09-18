import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Careers & Engineering Opportunities",
  description:
    "Join Aevion Studio: build autonomous AI pipelines, high-throughput SaaS platforms, and 120 FPS WebGL experiences alongside founders Sai Vinoth and Edison.",
  path: "/careers",
  keywords: [
    "Aevion Careers",
    "Engineering Jobs",
    "Remote Frontend Engineer",
    "AI ML Integration Engineer",
  ],
});

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Careers", url: "/careers" },
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
