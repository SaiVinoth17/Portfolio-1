import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description:
    "Aevion Studio terms of service: engagement contracts, intellectual property rights, mutual NDA provisions, and engineering warranties.",
  path: "/terms",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Terms of Service", url: "/terms" },
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
