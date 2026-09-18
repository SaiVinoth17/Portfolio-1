import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, Share2, BookOpen } from "lucide-react";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema } from "@/lib/seo/schema";

interface ArticleData {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  accent: string;
  sections: { heading: string; body: string }[];
}

const ARTICLES_DATA: Record<string, ArticleData> = {
  "streaming-ai": {
    id: "streaming-ai",
    category: "AI ENGINEERING",
    title: "Building real-time streaming LLM pipelines with Groq and Server-Sent Events",
    excerpt:
      "A deep technical walkthrough of architecting production-grade SSE pipelines that deliver sub-100ms first-token latency using Groq's inference API.",
    readTime: "12 min",
    date: "Aug 2024",
    accent: "#6366f1",
    sections: [
      {
        heading: "The Low-Latency Imperative",
        body: "Standard request-response architectures fail to meet modern user expectations for conversational AI. When users submit prompts, waiting 3–5 seconds for a complete response degrades engagement. Streaming tokens over HTTP via Server-Sent Events (SSE) allows client interfaces to begin rendering markdown within 80–120 milliseconds.",
      },
      {
        heading: "Server-Sent Events Pipeline Architecture",
        body: "In Next.js App Router route handlers, we utilize the ReadableStream Web API to bridge Groq's low-latency inference engine directly to the browser. By flushing tokens as soon as the Groq LPU emits them, the browser decodes chunks incrementally without buffering.",
      },
      {
        heading: "Error Handling & Stream Termination",
        body: "Production edge streaming requires defensive boundaries. If connection drops or token rate limits trigger, the stream must emit clean error frames rather than abrupt TCP disconnects. Implementing keep-alive heartbeats and exponential backoff retry maintains high reliability.",
      },
    ],
  },
  "webgl-perf": {
    id: "webgl-perf",
    category: "CREATIVE ENGINEERING",
    title: "GPU-accelerated scroll experiences: Three.js performance at 120 FPS",
    excerpt:
      "Techniques to keep WebGL scenes running at peak performance on modern browsers without sacrificing visual fidelity.",
    readTime: "8 min",
    date: "Jul 2024",
    accent: "#8b5cf6",
    sections: [
      {
        heading: "Draw Call Reduction and Geometry Merging",
        body: "The primary bottleneck in browser-based 3D graphics is rarely GPU fill rate—it is CPU-to-GPU draw calls. By merging static geometries using BufferGeometryUtils or leveraging instanced rendering for repetitive meshes, we maintain a solid 120 FPS even on mid-tier mobile hardware.",
      },
      {
        heading: "Offscreen Rendering and Adaptive DPR",
        body: "High-density displays (Retina/OLED) can easily cripple performance if rendering at native window.devicePixelRatio (2.0 or 3.0). Clamping DPR to 1.5 and dropping resolution dynamically during rapid scroll momentum maintains fluid frame rates without perceptible degradation.",
      },
    ],
  },
  "nextjs-16": {
    id: "nextjs-16",
    category: "FULL-STACK",
    title: "Next.js 16 App Router: patterns for real-world production applications",
    excerpt:
      "Practical patterns battle-tested across multiple production SaaS deployments — server actions, streaming, and partial prerendering.",
    readTime: "10 min",
    date: "Jun 2024",
    accent: "#4f46e5",
    sections: [
      {
        heading: "Server Components vs Client Components Boundaries",
        body: "A common pitfall in App Router adoption is overusing 'use client' at the top of the tree. By pushing interactivity to the leaves of the component hierarchy, we minimize client bundle footprints and eliminate unnecessary hydration delays.",
      },
      {
        heading: "Deterministic Cache Revalidation",
        body: "Using tag-based revalidation (revalidateTag) alongside incremental static regeneration guarantees that public marketing pages serve static cached HTML at the edge while immediately updating when administrative changes occur.",
      },
    ],
  },
  "supabase-rls": {
    id: "supabase-rls",
    category: "SECURITY",
    title: "Row-Level Security patterns that actually protect your Supabase data",
    excerpt:
      "A comprehensive audit of common RLS mistakes and the patterns that make multi-tenant apps truly secure at the database layer.",
    readTime: "14 min",
    date: "May 2024",
    accent: "#7c3aed",
    sections: [
      {
        heading: "The Pitfall of Client-Side Filtering",
        body: "Filtering records purely with WHERE clauses in frontend client SDKs creates massive security holes. Database-enforced Row Level Security (RLS) ensures that even if an attacker manipulates API queries, PostgreSQL prevents unauthorized row access.",
      },
      {
        heading: "Optimizing RLS Execution Performance",
        body: "RLS policies that query foreign tables without indexed foreign keys cause sequential table scans on every request. Wrapping auth.uid() in subqueries and indexing tenant identifier columns ensures near-instant query evaluation.",
      },
    ],
  },
  "gsap-scrolltrigger": {
    id: "gsap-scrolltrigger",
    category: "ANIMATION",
    title: "GSAP ScrollTrigger advanced: scrubbing, pinning, and timeline coordination",
    excerpt:
      "Beyond the basics — crafting multi-stage scroll narratives that feel cinematic rather than just animated.",
    readTime: "9 min",
    date: "Apr 2024",
    accent: "#6366f1",
    sections: [
      {
        heading: "Decoupling Native Scroll from Animation Scrub",
        body: "To achieve buttery smooth scroll storytelling, combining Lenis virtual momentum scroll with GSAP ScrollTrigger scrub timelines ensures frame interpolation remains silky even during aggressive touch scrolling.",
      },
      {
        heading: "Hardware Acceleration Best Practices",
        body: "Restricting scroll animations strictly to CSS transforms (translate3d, scale) and opacity keeps compositing within the GPU thread, completely eliminating expensive browser layout recaculations.",
      },
    ],
  },
  "typescript-strict": {
    id: "typescript-strict",
    category: "ENGINEERING",
    title: "Why I never turn off strict TypeScript mode (and how to survive it)",
    excerpt:
      "Strict TypeScript is painful at first and invaluable in production. Here's how to enable it in a legacy codebase without losing your mind.",
    readTime: "6 min",
    date: "Mar 2024",
    accent: "#4338ca",
    sections: [
      {
        heading: "The True Cost of 'any'",
        body: "Allowing untyped variables cascades through codebases like a virus, stripping autocompletion and introducing silent runtime errors. Enabling noImplicitAny and strictNullChecks catches 95% of regressions during development.",
      },
      {
        heading: "Zod Schema Validation at the Edge",
        body: "TypeScript types evaporate at runtime. Pairing TypeScript types with Zod runtime schemas ensures external API payloads and user submissions conform strictly to expected data contracts.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES_DATA).map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = ARTICLES_DATA[id];

  if (!article) {
    return constructMetadata({
      title: "Article Not Found",
      description: "The requested article could not be resolved.",
      path: `/blog/${id}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${article.title} | Aevion Journal`,
    description: article.excerpt,
    path: `/blog/${article.id}`,
    keywords: [article.category, "Software Engineering", "Aevion Journal"],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = ARTICLES_DATA[id];

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        datePublished: article.date,
        author: {
          "@type": "Organization",
          name: "Aevion Studio",
          url: "https://www.aevionstudio.in",
        },
      },
      getBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Journal", url: "/blog" },
        { name: article.title, url: `/blog/${article.id}` },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#050509] text-white pt-28 pb-24 px-4 sm:px-8 max-w-4xl mx-auto selection:bg-emerald-500 selection:text-black">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors p-2 rounded-xl bg-zinc-950/80 border border-white/10 backdrop-blur-md"
          >
            <ArrowLeft size={14} /> BACK TO JOURNAL
          </Link>
        </div>

        <article className="space-y-10">
          <header className="space-y-4 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span
                className="px-3 py-1 rounded-full font-bold"
                style={{
                  background: `${article.accent}20`,
                  color: article.accent,
                  border: `1px solid ${article.accent}40`,
                }}
              >
                {article.category}
              </span>
              <span className="text-zinc-500 flex items-center gap-1">
                <Clock size={12} /> {article.readTime}
              </span>
              <span className="text-zinc-500 flex items-center gap-1">
                <Calendar size={12} /> {article.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {article.title}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              {article.excerpt}
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span>Authored by Aevion Studio Engineering Core</span>
              <span>•</span>
              <span className="text-emerald-400 font-bold">Verified Production Pattern</span>
            </div>
          </header>

          <div className="space-y-10 text-zinc-300 leading-relaxed text-base font-light">
            {article.sections.map((sec, idx) => (
              <section key={idx} className="space-y-4 p-6 sm:p-8 rounded-3xl bg-zinc-950/70 border border-white/10 backdrop-blur-md">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {sec.heading}
                </h2>
                <p className="leading-relaxed text-zinc-300">{sec.body}</p>
              </section>
            ))}
          </div>

          <footer className="pt-12 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:underline"
            >
              <ArrowLeft size={14} /> Explore All Journal Articles
            </Link>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-2xl bg-white text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all text-center"
            >
              Consult With Our Engineers
            </Link>
          </footer>
        </article>
      </main>
    </>
  );
}
