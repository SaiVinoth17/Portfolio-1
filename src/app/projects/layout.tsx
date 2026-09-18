import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Selected Systems & Architecture Projects",
  description:
    "Explore production-grade software architectures, AI systems, interactive gaming portals, and digital platforms engineered by Aevion Studio.",
  path: "/projects",
  keywords: [
    "Aevion Studio Projects",
    "Nilgiris Explorers",
    "The Gaming Kingdom",
    "House of Petalss",
    "Aevion Studio OS",
    "Ooty Mistwings",
    "Software Architecture",
    "Production Systems",
  ],
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Projects", url: "/projects" },
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
