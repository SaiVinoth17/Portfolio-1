import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Studio Products & Operating Systems",
  description:
    "Explore digital products engineered by Aevion Studio: Aevion Studio OS, Aevion AI streaming assistant, and production motion components.",
  path: "/products",
  keywords: [
    "Aevion Products",
    "Aevion Studio OS",
    "Aevion AI",
    "Motion Component Library",
  ],
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Products", url: "/products" },
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
