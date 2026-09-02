import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/schema";
import {
  Cpu,
  Layers,
  Sparkles,
  Workflow,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Code2,
  Server,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Engineering Capabilities & Systems Matrix",
  description:
    "Explore Aevion Studio's core technical capabilities across Autonomous AI Systems, Resilient Software Engineering, Immersive WebGL, Product Architecture, and Real-Time Systems.",
  path: "/capabilities",
  keywords: [
    "AI Systems Architecture",
    "Full-Stack Engineering",
    "WebGL Creative Development",
    "Real-Time Distributed Systems",
    "Product Architecture",
  ],
});

const CAPABILITIES = [
  {
    id: "ai-systems",
    name: "Autonomous AI & Neural Systems",
    lead: "Sai Rio",
    icon: Cpu,
    summary:
      "Design and deployment of production-grade LLM pipelines, autonomous agentic workflows, and domain-adapted reasoning engines.",
    specs: [
      "Agentic reasoning frameworks with tool use & multi-step execution",
      "Retrieval-Augmented Generation (RAG) with hybrid semantic search",
      "Low-latency streaming inferences & structured schema generation",
      "Enterprise prompt defense, guardrails & evaluation suites",
    ],
    tech: ["Python", "LangChain", "LlamaIndex", "Groq / vLLM", "PostgreSQL pgvector"],
  },
  {
    id: "software-engineering",
    name: "Resilient Software & Cloud Architecture",
    lead: "Edison",
    icon: Server,
    summary:
      "Fault-tolerant cloud backends, microservices, and distributed systems built for continuous uptime and strict deterministic execution.",
    specs: [
      "Type-safe REST & GraphQL serverless microservices",
      "PostgreSQL, Redis caching, and connection pooling architectures",
      "First-party authentication with cryptographic scrypt hashing & RBAC",
      "Zero-downtime CI/CD deployment pipelines on global edge infrastructure",
    ],
    tech: ["Next.js App Router", "Node.js", "TypeScript", "PostgreSQL", "Vercel Edge"],
  },
  {
    id: "immersive-web",
    name: "Immersive WebGL & Creative Engineering",
    lead: "Edison & Sai Rio",
    icon: Sparkles,
    summary:
      "Award-caliber 3D web experiences, custom GLSL shaders, and hardware-accelerated interfaces that remain butter-smooth across devices.",
    specs: [
      "Adaptive DPR scaling & viewport-aware rendering loops",
      "Custom vertex and fragment shader development",
      "Three.js & WebGL state management with full resource disposal",
      "Strict accessibility fallbacks conforming to prefers-reduced-motion",
    ],
    tech: ["Three.js", "GLSL Shaders", "GSAP ScrollTrigger", "Lenis", "Tailwind CSS"],
  },
  {
    id: "product-architecture",
    name: "End-to-End Product Engineering",
    lead: "Sai Rio",
    icon: Layers,
    summary:
      "Translating visionary product ideas into commercial SaaS platforms, developer operating systems, and scalable digital ventures.",
    specs: [
      "High-velocity prototyping with production-grade engineering foundations",
      "Design system engineering with reusable token architecture",
      "Conversion rate optimization & semantic search visibility",
      "Built-in administrative control planes & observability telemetry",
    ],
    tech: ["React 19", "Framer Motion", "Tailwind CSS", "Zustand", "Radix Primitives"],
  },
  {
    id: "realtime-systems",
    name: "Real-Time & Streaming Infrastructure",
    lead: "Edison",
    icon: Zap,
    summary:
      "Sub-millisecond data exchange architectures powering live collaborative workspaces, telemetry monitors, and interactive interfaces.",
    specs: [
      "Server-Sent Events (SSE) & WebSocket duplex channels",
      "Optimistic UI updates with deterministic state reconciliation",
      "Edge caching and distributed state synchronization",
      "End-to-end data encryption and integrity verification",
    ],
    tech: ["WebSockets", "Server-Sent Events", "Redis Pub/Sub", "Edge Workers"],
  },
];

const FAQS = [
  {
    question: "What makes Aevion Studio's engineering different from a traditional agency?",
    answer:
      "Aevion Studio is run by two equal co-founders who write every line of architecture themselves. We do not use bloated templates, outsourced teams, or junior handoffs. Every client collaborates directly with the founding architects.",
  },
  {
    question: "Can Aevion Studio build both the AI backend and the frontend user experience?",
    answer:
      "Yes. We specialize in vertical full-stack integration—combining deep AI reasoning engines and cloud databases with award-caliber interactive frontend interfaces.",
  },
  {
    question: "How does Aevion ensure high performance for 3D and WebGL interfaces?",
    answer:
      "We implement viewport-based lazy evaluation, adaptive device pixel ratios, explicit GPU memory disposal, and non-WebGL accessibility fallbacks to guarantee 60fps on modern mobile and desktop devices.",
  },
];

export default function CapabilitiesPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Capabilities", url: "/capabilities" },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(FAQS)) }}
      />

      {/* Hero */}
      <header className="space-y-6 max-w-3xl border-b border-white/10 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest">
          <Workflow size={13} /> Engineering Capabilities
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white font-mono">
          SYSTEMS MATRIX &amp; CORE DISCIPLINES.
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
          We combine computational rigor with bespoke visual engineering. Every discipline below is
          executed in-house with production-grade guarantees.
        </p>
      </header>

      {/* Capabilities List */}
      <section className="py-16 space-y-12">
        <div className="space-y-8">
          {CAPABILITIES.map((cap) => {
            const Icon = cap.icon;
            return (
              <article
                key={cap.id}
                id={cap.id}
                className="p-6 sm:p-10 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-emerald-500/30 transition-all space-y-6 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
                        {cap.name}
                      </h2>
                      <div className="text-xs font-mono text-zinc-500 mt-0.5">
                        DISCIPLINE LEAD: <span className="text-zinc-300">{cap.lead}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="self-start sm:self-auto px-4 py-2 rounded-full border border-white/15 hover:border-emerald-400 hover:text-emerald-400 text-xs font-mono transition-colors flex items-center gap-1.5"
                  >
                    Initiate Build <ArrowRight size={13} />
                  </Link>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                  {cap.summary}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {cap.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-xs text-zinc-300 font-mono"
                    >
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mr-2">
                    TECHNOLOGY STACK:
                  </span>
                  {cap.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 border border-white/10 text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Authoritative AEO FAQ Section */}
      <section className="py-12 border-t border-white/10 space-y-8">
        <div>
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
            ENGINEERING &amp; ENGAGEMENT Q&amp;A
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FAQS.map((faq, i) => (
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

      {/* CTA Uplink */}
      <section className="mt-12 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-white/15 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-mono text-white">
          HAVE AN ARCHITECTURAL CHALLENGE?
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto">
          We partner with ambitious startups and technology organizations to build what others deem
          impossible.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Start A Project Brief
          </Link>
          <Link
            href="/projects"
            className="px-8 py-3.5 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            Review Case Studies
          </Link>
        </div>
      </section>
    </main>
  );
}
