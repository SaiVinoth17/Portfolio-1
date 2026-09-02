import fs from "fs";
import path from "path";

async function runSeoTests() {
  console.log("\n========================================================");
  console.log("  AEVION STUDIO — SEO & DISCOVERABILITY TEST SUITE");
  console.log("  Domain: https://aevionstudio.in");
  console.log("========================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // --- 1. Centralized Metadata & Canonical Invariant ---
  console.log("[1] Centralized Metadata & Canonical Domain Invariant");
  const { constructMetadata, PRODUCTION_DOMAIN } = await import(
    "../src/lib/seo/metadata.ts"
  );
  assert(PRODUCTION_DOMAIN === "https://aevionstudio.in", "Production domain constant verified");

  const homeMeta = constructMetadata({
    title: "Technology Without Limits",
    description: "Aevion Studio engineering portal.",
    path: "/",
  });
  assert(
    homeMeta.alternates?.canonical === "https://aevionstudio.in",
    "Root page canonical strictly points to https://aevionstudio.in"
  );
  assert(
    homeMeta.openGraph?.url === "https://aevionstudio.in",
    "Open Graph URL strictly points to https://aevionstudio.in"
  );

  const subpageMeta = constructMetadata({
    title: "AI Systems",
    description: "Autonomous neural pipelines.",
    path: "/ai",
  });
  assert(
    subpageMeta.alternates?.canonical === "https://aevionstudio.in/ai",
    "Subpage canonical correctly generated"
  );

  // --- 2. Production Sitemap Validation ---
  console.log("\n[2] Dynamic Production XML Sitemap Verification");
  const sitemapFn = (await import("../src/app/sitemap.ts")).default;
  const sitemapEntries = sitemapFn();

  assert(sitemapEntries.length >= 15, `Sitemap generates ${sitemapEntries.length} indexable routes`);
  const urls = sitemapEntries.map((e) => e.url);

  // Exclusions verification
  const hasAdmin = urls.some((u) => u.includes("/admin"));
  const hasApi = urls.some((u) => u.includes("/api"));
  assert(!hasAdmin, "Sitemap strictly excludes all /admin/* routes");
  assert(!hasApi, "Sitemap strictly excludes all /api/* routes");

  // Inclusions verification
  assert(urls.includes("https://aevionstudio.in"), "Sitemap includes homepage");
  assert(urls.includes("https://aevionstudio.in/about"), "Sitemap includes /about");
  assert(urls.includes("https://aevionstudio.in/services"), "Sitemap includes /services");
  assert(urls.includes("https://aevionstudio.in/capabilities"), "Sitemap includes /capabilities");
  assert(urls.includes("https://aevionstudio.in/projects"), "Sitemap includes /projects");
  assert(urls.includes("https://aevionstudio.in/lab"), "Sitemap includes /lab");
  assert(urls.includes("https://aevionstudio.in/technology"), "Sitemap includes /technology");
  assert(urls.includes("https://aevionstudio.in/ai"), "Sitemap includes /ai");
  assert(urls.includes("https://aevionstudio.in/process"), "Sitemap includes /process");
  assert(urls.includes("https://aevionstudio.in/contact"), "Sitemap includes /contact");

  // All URLs must use production domain
  const nonProdUrls = urls.filter((u) => !u.startsWith("https://aevionstudio.in"));
  assert(nonProdUrls.length === 0, "Zero non-production or localhost URLs in sitemap");

  // Stable timestamps verification
  const timestamps = sitemapEntries.map((e) => e.lastModified.toISOString());
  const allValidDates = timestamps.every((t) => t.includes("2026-"));
  assert(allValidDates, "Sitemap entries use valid stable content release timestamps");

  // --- 3. Robots Directives Validation ---
  console.log("\n[3] Robots.txt Directives & Bot Policy");
  const robotsFn = (await import("../src/app/robots.ts")).default;
  const robotsConfig = robotsFn();

  assert(
    robotsConfig.sitemap === "https://aevionstudio.in/sitemap.xml",
    "Robots.txt references production sitemap"
  );
  assert(Array.isArray(robotsConfig.rules), "Robots.txt defines multi-crawler rule sets");

  const defaultRule = robotsConfig.rules.find((r) => r.userAgent === "*");
  assert(
    defaultRule && defaultRule.disallow.includes("/admin/"),
    "Default crawler rule disallows /admin/"
  );
  assert(
    defaultRule && defaultRule.disallow.includes("/api/admin/"),
    "Default crawler rule disallows /api/admin/"
  );

  const aiBotRule = robotsConfig.rules.find(
    (r) => Array.isArray(r.userAgent) && r.userAgent.includes("GPTBot")
  );
  assert(aiBotRule !== undefined, "Robots.txt defines explicit AI bot crawl policies");

  // --- 4. Schema.org JSON-LD Validation ---
  console.log("\n[4] Schema.org JSON-LD Structured Data Validation");
  const {
    getOrganizationSchema,
    getWebSiteSchema,
    getBreadcrumbSchema,
    getFAQSchema,
  } = await import("../src/lib/seo/schema.ts");

  const orgSchema = getOrganizationSchema();
  assert(orgSchema["@type"] === "Organization", "Organization schema type valid");
  assert(orgSchema.founders.length === 2, "Organization schema reflects founder parity (Sai Rio & Edison)");
  assert(orgSchema.url === "https://aevionstudio.in", "Organization schema points to production domain");
  assert(orgSchema.contactPoint !== undefined, "Organization schema provides verified contact point");

  const websiteSchema = getWebSiteSchema();
  assert(websiteSchema["@type"] === "WebSite", "WebSite schema type valid");

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: "Nilgiris Explorers", url: "/projects/nilgiris-explorers" },
  ]);
  assert(breadcrumbs["@type"] === "BreadcrumbList", "BreadcrumbList schema type valid");
  assert(breadcrumbs.itemListElement.length === 3, "BreadcrumbList has 3 ordered levels");

  const faqSchema = getFAQSchema([
    { question: "What does Aevion do?", answer: "Builds autonomous AI and software systems." },
  ]);
  assert(faqSchema["@type"] === "FAQPage", "FAQPage schema type valid");
  assert(faqSchema.mainEntity.length === 1, "FAQPage contains question and answer pair");

  // --- 5. Aevion Lab Registry Validation ---
  console.log("\n[5] Aevion Lab Published Experiments Verification");
  const { LAB_EXPERIMENTS } = await import("../src/lib/data/labExperiments.ts");
  assert(LAB_EXPERIMENTS.length === 6, "All 6 WebGL experiments registered in lab");

  const allPublished = LAB_EXPERIMENTS.every((e) => e.status === "PUBLISHED");
  assert(allPublished, "All lab experiments have verified PUBLISHED status");

  const allHaveProfiles = LAB_EXPERIMENTS.every(
    (e) => e.performanceProfile && e.mobileSupport
  );
  assert(allHaveProfiles, "All lab experiments define performance profiles and mobile support");

  // --- 6. Primary WhatsApp Conversion Generator ---
  console.log("\n[6] Primary WhatsApp Conversion Architecture");
  const { getWhatsAppUrl, STUDIO_CONFIG } = await import(
    "../src/lib/config/studio.ts"
  );
  assert(STUDIO_CONFIG.whatsappNumber === "917604904217", "WhatsApp destination number matches 917604904217");

  const generalUrl = getWhatsAppUrl("general");
  assert(generalUrl.startsWith("https://wa.me/917604904217"), "WhatsApp URL generator targets 917604904217");
  assert(generalUrl.includes("text="), "WhatsApp URL includes prefilled message query");

  const aiUrl = getWhatsAppUrl("ai");
  assert(aiUrl.includes("AI"), "Contextual AI inquiry template formatted properly");

  const websiteUrl = getWhatsAppUrl("website");
  assert(websiteUrl.includes("website"), "Contextual website template formatted properly");

  // --- 7. No Plaintext Credential Leak Check ---
  console.log("\n[7] Credential Leak Inspection");
  const forbiddenSubstrings = [
    "password123",
    "admin123",
    "secret_password",
    "test_password_here",
  ];

  let leakDetected = false;
  const projectFiles = [
    "src/app/layout.js",
    "src/app/api/auth/login/route.ts",
    "src/app/api/auth/bootstrap/route.ts",
    "src/lib/auth/constants.ts",
    "public/llms.txt",
    ".env.example",
  ];

  for (const relPath of projectFiles) {
    const fullPath = path.join(process.cwd(), relPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const forbidden of forbiddenSubstrings) {
        if (content.toLowerCase().includes(forbidden)) {
          console.error(`  ❌ Potential forbidden credential found in ${relPath}: ${forbidden}`);
          leakDetected = true;
        }
      }
    }
  }
  assert(!leakDetected, "Zero plaintext passwords detected across core project files");

  console.log("\n========================================================");
  console.log(`  RESULTS: ${passed} PASSED / ${failed} FAILED`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runSeoTests().catch((err) => {
  console.error("SEO test suite error:", err);
  process.exit(1);
});
