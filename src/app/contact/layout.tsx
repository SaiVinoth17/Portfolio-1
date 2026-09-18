import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Initiate Project Brief & Engineering Inquiries",
  description:
    "Partner with Aevion Studio founders Sai Vinoth and Edison. Submit your technical project brief for autonomous AI systems, custom SaaS, and immersive web platforms.",
  path: "/contact",
  keywords: [
    "Contact Aevion Studio",
    "Hire AI Studio",
    "Request Project Proposal",
    "Sai Vinoth Contact",
    "Edison Contact",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" },
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
