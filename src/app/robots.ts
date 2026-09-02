import { MetadataRoute } from "next";
import { PRODUCTION_DOMAIN } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/", "/api/auth/"],
      },
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Applebot-Extended"],
        allow: ["/", "/llms.txt", "/about", "/services", "/capabilities", "/projects", "/lab", "/technology", "/ai", "/process"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${PRODUCTION_DOMAIN}/sitemap.xml`,
  };
}
