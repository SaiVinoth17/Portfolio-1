import { MetadataRoute } from "next";
import { PRODUCTION_DOMAIN } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${PRODUCTION_DOMAIN}/sitemap.xml`,
  };
}
