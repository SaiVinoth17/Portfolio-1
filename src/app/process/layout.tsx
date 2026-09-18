import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Process & Production SLA Blueprint",
  description:
    "Explore Aevion Studio's 6-phase engineering lifecycle: Discovery, Architecture, Foundation, Core Engineering, Performance Hardening, and Production Deployment.",
  path: "/process",
  keywords: [
    "Engineering Process",
    "Software Development Lifecycle",
    "Production SLA",
    "Aevion Studio Workflow",
  ],
});

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Process", url: "/process" },
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
