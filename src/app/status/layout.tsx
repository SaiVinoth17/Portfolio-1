import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Edge Infrastructure Health & Operational Status",
  description:
    "Real-time operational health and infrastructure uptime for Aevion Studio edge networks, AI inference pipelines, and graphics runtimes.",
  path: "/status",
  keywords: [
    "Aevion Status",
    "Infrastructure Health",
    "System Uptime",
  ],
});

export default function StatusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Status", url: "/status" },
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
