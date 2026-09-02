import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aevionstudio.in";
  const routes = [
    "",
    "/studio",
    "/about",
    "/services",
    "/projects",
    "/projects/nilgiris-explorers",
    "/projects/ooty-mistwings",
    "/projects/gaming-kingdom",
    "/projects/aevion-studio-os",
    "/products",
    "/open-source",
    "/tech-stack",
    "/process",
    "/showcase",
    "/showcase/macbook-neo",
    "/showcase/molten-metal",
    "/showcase/scroll-morph",
    "/showcase/ballpit",
    "/showcase/drift-wall",
    "/careers",
    "/status",
    "/resume",
    "/blog",
    "/contact",
    "/accessibility",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/projects") || route === "/studio" || route === "/products" ? 0.8 : 0.6,
  }));
}
