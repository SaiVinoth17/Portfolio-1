import { MetadataRoute } from "next";
import { PRODUCTION_DOMAIN } from "@/lib/seo/metadata";
import { LAB_EXPERIMENTS } from "@/lib/data/labExperiments";

interface SitemapEntry {
  path: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Stable content release timestamps (never fabricated new Date() per request)
  const CONTENT_STABLE_DATE = "2026-09-01T00:00:00.000Z";

  // Core canonical indexable pages
  const coreRoutes: SitemapEntry[] = [
    { path: "", lastModified: CONTENT_STABLE_DATE, changeFrequency: "daily", priority: 1.0 },
    { path: "/about", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.9 },
    { path: "/services", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.9 },
    { path: "/capabilities", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.9 },
    { path: "/projects", lastModified: CONTENT_STABLE_DATE, changeFrequency: "daily", priority: 0.9 },
    { path: "/projects/nilgiris-explorers", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.8 },
    { path: "/projects/ooty-mistwings", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.8 },
    { path: "/projects/gaming-kingdom", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.8 },
    { path: "/projects/aevion-studio-os", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.8 },
    { path: "/lab", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.8 },
    ...LAB_EXPERIMENTS.filter((e) => e.status === "PUBLISHED").map((e) => ({
      path: `/lab/${e.slug}`,
      lastModified: CONTENT_STABLE_DATE,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { path: "/technology", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.8 },
    { path: "/ai", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.9 },
    { path: "/process", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.7 },
    { path: "/contact", lastModified: CONTENT_STABLE_DATE, changeFrequency: "weekly", priority: 0.8 },
    { path: "/open-source", lastModified: CONTENT_STABLE_DATE, changeFrequency: "monthly", priority: 0.6 },
    { path: "/accessibility", lastModified: CONTENT_STABLE_DATE, changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy", lastModified: CONTENT_STABLE_DATE, changeFrequency: "monthly", priority: 0.4 },
    { path: "/terms", lastModified: CONTENT_STABLE_DATE, changeFrequency: "monthly", priority: 0.4 },
  ];

  return coreRoutes.map((route) => ({
    url: `${PRODUCTION_DOMAIN}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
