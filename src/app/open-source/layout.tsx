import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Open Source Repositories & Engineering Public R&D",
  description:
    "Explore open source repositories, developer utilities, and public R&D contributions by Aevion Studio founders Sai Vinoth and Edison.",
  path: "/open-source",
  keywords: [
    "Aevion Open Source",
    "Sai Vinoth GitHub",
    "Edison GitHub",
    "Next.js Open Source",
    "Three.js Components",
  ],
});

export default function OpenSourceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Open Source", url: "/open-source" },
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
