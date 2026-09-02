export const STUDIO_CONFIG = {
  name: "Aevion Studio",
  tagline: "Technology Without Limits",
  description:
    "An elite technology studio building autonomous AI systems, resilient software products, high-performance web experiences, and experimental digital architectures. Founded by Sai Rio and Edison.",
  domain: "https://aevionstudio.in",
  email: "hello@aevionstudio.in",
  whatsappNumber: (() => {
    const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917604904217";
    const cleaned = raw.replace(/\D/g, "");
    return cleaned.length === 10 ? `91${cleaned}` : cleaned;
  })(),
  location: {
    region: "Tamil Nadu",
    country: "India",
    serviceModel: "Global Remote-First (US, UK, UAE, India, Worldwide)",
  },
  founders: [
    {
      name: "Sai Vinoth",
      role: "Co-Founder",
      discipline: "Full Stack Developer & AI/ML Engineer",
      github: "https://github.com/SaiVinoth17",
    },
    {
      name: "Edison",
      role: "Co-Founder",
      discipline: "Front End Developer",
      github: "https://github.com/edisonedi84431-art",
    },
  ],
  socials: {
    github: "https://github.com/aevionstudio",
    twitter: "https://x.com/aevionstudio",
  },
};

export type WhatsAppInquiryType =
  | "website"
  | "ai"
  | "software"
  | "3d"
  | "general";

const WHATSAPP_TEMPLATES: Record<WhatsAppInquiryType, string> = {
  website:
    "Hi Aevion Studio, I would like to discuss building a high-performance modern website/web application for my company.",
  ai:
    "Hi Aevion Studio, I want to discuss engineering a custom AI system or autonomous pipeline.",
  software:
    "Hi Aevion Studio, we need architectural consulting and custom software development.",
  "3d":
    "Hi Aevion Studio, I'm interested in an immersive digital product or WebGL experience.",
  general:
    "Hi Aevion Studio, I'd like to explore partnering on a new project.",
};

/**
 * Generates an instant, contextual WhatsApp direct messaging link.
 */
export function getWhatsAppUrl(type: WhatsAppInquiryType = "general", customNote?: string): string {
  const baseTemplate = WHATSAPP_TEMPLATES[type] || WHATSAPP_TEMPLATES.general;
  const fullText = customNote ? `${baseTemplate} Note: ${customNote}` : baseTemplate;
  const encoded = encodeURIComponent(fullText);
  return `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encoded}`;
}
