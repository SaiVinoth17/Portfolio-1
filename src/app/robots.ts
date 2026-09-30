import { MetadataRoute } from "next";
import { PRODUCTION_DOMAIN } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/admin/", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "ClaudeBot",
          "PerplexityBot",
        ],
        allow: ["/", "/llms.txt"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${PRODUCTION_DOMAIN}/sitemap.xml`,
  };
}
