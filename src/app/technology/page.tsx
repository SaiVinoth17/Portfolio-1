import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/schema";
import {
  Cpu,
  Layers,
  Sparkles,
  Server,
  ShieldCheck,
  Zap,
  ArrowRight,
  Code2,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Technology Stack, Runtimes & Engineering Architecture",
  description:
    "A comprehensive technical specification of Aevion Studio's production runtimes, frameworks, graphics engines, AI pipelines, and cloud database infrastructure.",
  path: "/technology",
  keywords: [
    "Next.js App Router Architecture",
    "React 19 Concurrent Systems",
    "TypeScript Strict Engineering",
    "Three.js WebGL Performance",
    "PostgreSQL pgvector Database",
    "Groq LPU Inference Runtimes",
  ],
});

const TECH_CATEGORIES = [
  {
    category: "Application & Edge Runtime",
    icon: Code2,
    description:
      "Modern full-stack application frameworks delivering zero-bundle-cost Server Components and sub-second global edge response times.",
    items: [
      { name: "Next.js 16 (App Router)", spec: "Turbopack compilation, React Server Components, Streaming SSR" },
      { name: "React 19", spec: "Server Actions, Optimistic state updates, Concurrent rendering" },
      { name: "TypeScript 5 (Strict)", spec: "End-to-end type safety, zero 'any' policy, schema validation" },
      { name: "Node.js 22 LTS", spec: "V8 engine, async hooks, high-throughput microservices" },
      { name: "Vercel Global Edge", spec: "Multi-region serverless execution, Edge Middleware proxy, CDN caching" },
    ],
  },
  {
    category: "Applied AI & Neural Reasoning",
    icon: Cpu,
    description:
      "Hardware-accelerated inference platforms and agentic orchestration frameworks built for high-throughput reasoning.",
    items: [
      { name: "Groq LPU Engine", spec: "Sub-150ms TTFT, Llama 3.3 70B ultra-fast streaming inferences" },
      { name: "PostgreSQL pgvector", spec: "Dense HNSW vector indexing, hybrid keyword & semantic retrieval" },
      { name: "LangChain / LlamaIndex", spec: "Hierarchical agentic planning, multi-step tool execution, RAG pipelines" },
      { name: "OpenAI & Anthropic SDKs", spec: "Structured JSON schema generation, function calling, safety layers" },
      { name: "Python 3.12 Ecosystem", spec: "PyTorch, FastAPI, NumPy data science and fine-tuning pipelines" },
    ],
  },
  {
    category: "Creative Graphics & WebGL",
    icon: Sparkles,
    description:
      "Hardware-accelerated graphics pipelines calibrated for 60fps performance across desktop and mobile form factors.",
    items: [
      { name: "Three.js (r168+)", spec: "Custom scene graphs, PBR materials, instanced mesh rendering" },
      { name: "Custom GLSL Shaders", spec: "Mathematical vertex morphing, procedural noise, ripple refraction" },
      { name: "GSAP & ScrollTrigger", spec: "GPU-composited timeline animations, inertial scrolling transforms" },
      { name: "Lenis Smooth Scroll", spec: "Decoupled physics-based smooth scrolling with touch normalization" },
      { name: "Tailwind CSS & Vanilla CSS", spec: "Zero runtime styling, CSS custom property design tokens" },
    ],
  },
  {
    category: "Data Persistence & Cloud Infrastructure",
    icon: Server,
    description:
      "Deterministic data storage, connection pooling, and in-memory caches designed for data integrity and zero loss.",
    items: [
      { name: "PostgreSQL 16+", spec: "Relational modeling, ACID transactions, connection pool scaling" },
      { name: "Redis / Upstash", spec: "Sub-millisecond key-value caching, rate limiting, pub/sub queues" },
      { name: "Docker & Containerization", spec: "Hermetic container builds, reproducible microservice runtime" },
      { name: "Automated CI/CD", spec: "GitHub Actions, automated linting, test suites, edge previews" },
    ],
  },
  {
    category: "Security & Cryptographic Controls",
    icon: ShieldCheck,
    description:
      "First-party security architecture eliminating external dependencies and social auth tracking vectors.",
    items: [
      { name: "Node.js scrypt", spec: "Memory-hard password hashing with 16-byte cryptographically secure salt" },
      { name: "Constant-Time Verification", spec: "crypto.timingSafeEqual() to eliminate timing attack vectors" },
      { name: "Hashed Database Sessions", spec: "SHA-256 session token hashing, HttpOnly Secure Lax cookies" },
      { name: "Role-Based Access Control", spec: "Server-side RBAC guards, anti-lockout invariants for OWNER" },
      { name: "Rate Limiting Defenses", spec: "IP + Email sliding window lockout defending against brute force" },
    ],
  },
];

const TECH_FAQS = [
  {
    question: "Why does Aevion Studio prefer Next.js App Router and React 19?",
    answer:
      "The App Router allows us to pre-render static HTML at build time (SSG) for instant SEO discoverability, stream dynamic components seamlessly without client-side waterfalls, and eliminate client bundle weight using React Server Components.",
  },
  {
    question: "How does Aevion prevent WebGL experiences from lagging on lower-powered devices?",
    answer:
      "We implement viewport-aware IntersectionObservers, clamp Device Pixel Ratio (DPR) adaptively, decouple physics loops from main-thread layout, and provide instant non-WebGL fallbacks conforming to accessibility standards.",
  },
  {
    question: "Can Aevion integrate with proprietary enterprise cloud environments (AWS, GCP, Azure)?",
    answer:
      "Yes. While we optimize for Vercel Edge and PostgreSQL natively, our architectures are containerized and cloud-agnostic, easily deploying into client-owned AWS, Google Cloud, or hybrid Kubernetes clusters.",
  },
];

export default function TechnologyPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Technology", url: "/technology" },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(TECH_FAQS)) }}
      />

      {/* Header */}
      <header className="space-y-6 max-w-3xl border-b border-white/10 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-400 text-xs font-mono uppercase tracking-widest">
          <Terminal size={13} /> Architecture &amp; Runtimes
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white font-mono">
          PRODUCTION TECHNOLOGY ARCHITECTURE.
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
          A transparent inspection of the runtimes, computational frameworks, graphics engines, and
          cryptographic standards powering Aevion Studio systems.
        </p>
      </header>

      {/* Technology Categories */}
      <section className="py-16 space-y-12">
        <div className="space-y-12">
          {TECH_CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-10 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-6 shadow-xl"
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold font-mono text-white">
                      {cat.category}
                    </h2>
                    <p className="text-xs text-zinc-400 font-sans mt-0.5">{cat.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 font-mono"
                    >
                      <div className="text-sm font-bold text-white flex items-center justify-between">
                        <span>{item.name}</span>
                        <span className="text-[10px] text-emerald-400 font-normal">Active</span>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{item.spec}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AEO FAQ */}
      <section className="py-12 border-t border-white/10 space-y-8">
        <div>
          <div className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">
            Technical Architecture Q&amp;A
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
            RUNTIME SPECIFICATIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_FAQS.map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-zinc-950/60 border border-white/10 space-y-3 font-mono text-xs"
            >
              <h3 className="text-sm font-bold text-white leading-snug">{faq.question}</h3>
              <p className="text-zinc-400 leading-relaxed font-sans text-xs">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-8 p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/15 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-mono text-white">
          BUILD ON PROVEN ARCHITECTURAL FOUNDATIONS
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto font-sans">
          We bring senior-level engineering discipline to every build. No shortcuts. No bloated
          dependencies.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20 inline-flex items-center gap-2"
          >
            Start Architectural Consultation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}
