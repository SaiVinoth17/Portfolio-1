import { Metadata } from "next";

export const PRODUCTION_DOMAIN = "https://aevionstudio.in";

interface MetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
  type?: "website" | "article";
}

/**
 * Production-grade metadata constructor enforcing canonical URLs,
 * search engine standards, and rich social preview cards.
 */
export function constructMetadata({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
  noIndex = false,
  keywords = [],
  type = "website",
}: MetadataProps): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${PRODUCTION_DOMAIN}${cleanPath === "/" ? "" : cleanPath}`;
  const fullTitle = title.includes("Aevion Studio") ? title : `${title} · Aevion Studio`;

  const defaultKeywords = [
    "Aevion Studio",
    "Sai Rio",
    "Edison",
    "Autonomous AI Systems",
    "AI Product Engineering",
    "High Performance Software",
    "Creative Web Engineering",
    "Modern Web Applications",
    "Custom Software Architecture",
    "Digital Product Studio",
  ];

  const mergedKeywords = Array.from(new Set([...keywords, ...defaultKeywords]));

  return {
    title: fullTitle,
    description,
    keywords: mergedKeywords,
    authors: [
      { name: "Sai Vinoth", url: "https://github.com/SaiVinoth17" },
      { name: "Edison", url: "https://github.com/edisonedi84431-art" },
      { name: "Aevion Studio", url: PRODUCTION_DOMAIN },
    ],
    creator: "Aevion Studio",
    publisher: "Aevion Studio",
    metadataBase: new URL(PRODUCTION_DOMAIN),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          "max-snippet": -1,
          "max-image-preview": "large",
          "max-video-preview": -1,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "Aevion Studio",
      images: [
        {
          url: image.startsWith("http") ? image : `${PRODUCTION_DOMAIN}${image}`,
          width: 1200,
          height: 630,
          alt: `${title} · Aevion Studio`,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${PRODUCTION_DOMAIN}${image}`],
      creator: "@aevionstudio",
    },
  };
}
