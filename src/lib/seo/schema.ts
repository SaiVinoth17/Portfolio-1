import { PRODUCTION_DOMAIN } from "./metadata";

/**
 * Generate primary Organization schema representing Aevion Studio entity.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${PRODUCTION_DOMAIN}/#organization`,
    name: "Aevion Studio",
    legalName: "Aevion Studio",
    url: PRODUCTION_DOMAIN,
    logo: `${PRODUCTION_DOMAIN}/images/aevion-logo.png`,
    email: "hello@aevionstudio.in",
    description:
      "Aevion Studio is an independent technology studio founded by Sai Rio and Edison. Conceived, architected, and engineered from scratch by Sai Rio.",
    founders: [
      {
        "@type": "Person",
        "@id": `${PRODUCTION_DOMAIN}/#sairio`,
        name: "Sai Rio (Sai Vinoth)",
        jobTitle: "Founder & Lead Engineer",
        sameAs: ["https://github.com/SaiVinoth17"],
        knowsAbout: [
          "Full Stack Development",
          "AI/ML Engineering",
          "Autonomous AI Systems",
          "Next.js Architecture",
          "Distributed Backends",
          "Creative Web Engineering",
          "Three.js & WebGL Shaders",
        ],
      },
      {
        "@type": "Person",
        "@id": `${PRODUCTION_DOMAIN}/#edison`,
        name: "Edison",
        jobTitle: "Co-Founder",
        sameAs: ["https://github.com/edisonedi84431-art"],
        knowsAbout: [
          "Studio Operations",
          "Digital Strategy",
          "Brand Direction",
          "Product Strategy",
          "Strategic Partnerships",
        ],
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Tamil Nadu",
      addressCountry: "India",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "India" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    sameAs: [
      "https://github.com/SaiVinoth17",
      "https://github.com/edisonedi84431-art",
      "https://github.com/aevionstudio",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support & project inquiries",
      email: "hello@aevionstudio.in",
      url: `${PRODUCTION_DOMAIN}/contact`,
      availableLanguage: ["English", "Tamil"],
    },
  };
}

/**
 * Generate WebSite schema with potential search action.
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${PRODUCTION_DOMAIN}/#website`,
    name: "Aevion Studio",
    url: PRODUCTION_DOMAIN,
    description: "Futuristic Technology & AI Studio | Sai Rio & Edison",
    publisher: {
      "@id": `${PRODUCTION_DOMAIN}/#organization`,
    },
    inLanguage: "en-US",
  };
}

/**
 * Generate BreadcrumbList schema for structured navigation.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${PRODUCTION_DOMAIN}${item.url}`,
    })),
  };
}

/**
 * Generate FAQPage schema for Answer Engine Optimization (AEO).
 */
export function getFAQSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate CreativeWork / SoftwareApplication schema for verified case studies.
 */
export function getProjectSchema({
  title,
  description,
  url,
  category,
  operatingSystem = "Web",
}: {
  title: string;
  description: string;
  url: string;
  category: string;
  operatingSystem?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    description,
    url: url.startsWith("http") ? url : `${PRODUCTION_DOMAIN}${url}`,
    applicationCategory: category,
    operatingSystem,
    author: {
      "@id": `${PRODUCTION_DOMAIN}/#organization`,
    },
  };
}
