import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/seo/schema";
import { getWhatsAppUrl } from "@/lib/config/studio";
import {
  Cpu,
  Brain,
  ShieldCheck,
  Zap,
  Terminal,
  MessageSquare,
  ArrowRight,
  Database,
  Lock,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Systems Engineering & Autonomous Architectures",
  description:
    "Aevion Studio engineers production-grade autonomous AI systems, hybrid RAG pipelines, and deterministic agentic reasoning engines for visionary technology enterprises.",
  path: "/ai",
  keywords: [
    "Autonomous AI Systems",
    "Agentic Workflows",
    "Retrieval-Augmented Generation",
    "LLM Engineering",
    "AI Architecture Studio",
  ],
});

const AI_PILLARS = [
  {
    title: "Autonomous Agentic Workflows",
    icon: Brain,
    description:
      "Multi-agent reasoning loops with deterministic tool execution, automated planning, state rollback, and self-evaluating critique gates.",
    specs: [
      "ReAct and Plan-and-Solve orchestration architectures",
      "Dynamic tool calling with strict schema validation",
      "Memory persistence across asynchronous execution threads",
      "Continuous runtime observability and failure recovery",
    ],
  },
  {
    title: "Hybrid Neural Search & RAG",
    icon: Database,
    description:
      "Dense semantic vector embeddings coupled with BM25 keyword matching and cross-encoder re-ranking for ultra-precise enterprise retrieval.",
    specs: [
      "Sub-50ms hybrid vector retrieval via PostgreSQL pgvector",
      "Context-aware chunking and hierarchical parent-document indexing",
      "Hallucination elimination via verifiable source citations",
      "Row-level multi-tenant document security models",
    ],
  },
  {
    title: "Low-Latency Streaming Inferences",
    icon: Zap,
    description:
      "Optimized inference pipelines delivering instant time-to-first-token (TTFT) via modern edge runtimes and hardware-accelerated model hosting.",
    specs: [
      "Sub-150ms TTFT powered by Groq LPU and vLLM clusters",
      "SSE streaming with typed JSON schema enforcement",
      "Model routing based on task complexity and cost efficiency",
      "Fallback failover across multi-region cloud providers",
    ],
  },
  {
    title: "Defense-in-Depth & Prompt Hardening",
    icon: Lock,
    description:
      "Enterprise security layers defending against prompt injection, jailbreaking, PII leakage, and unauthorized model manipulation.",
    specs: [
      "Bi-directional input and output guardrails",
      "Automated red-teaming and adversarial payload evaluation",
      "Zero-retention policies for proprietary client data",
      "Cryptographically isolated execution sandboxes",
    ],
  },
];

const AI_FAQS = [
  {
    question: "What types of AI applications does Aevion Studio engineer?",
    answer:
      "Aevion Studio builds custom autonomous agent systems, enterprise knowledge extraction engines (RAG), domain-specific conversational platforms, predictive modeling pipelines, and hardware-accelerated real-time streaming interfaces.",
  },
  {
    question: "Does Aevion Studio train models from scratch or fine-tune existing foundation models?",
    answer:
      "We adopt an architecture-first approach: leveraging state-of-the-art open weights (Llama, DeepSeek, Mistral) and proprietary models (Anthropic, OpenAI, Gemini), specialized with fine-tuning, context curation, and hybrid vector indexing for optimal accuracy and cost.",
  },
  {
    question: "How does Aevion guarantee that client data remains private?",
    answer:
      "All proprietary client data is isolated within client-owned VPCs or zero-retention enterprise endpoints. We never train foundation models on client intellectual property or sensitive business documents.",
  },
];

export default function AIPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "AI Systems", url: "/ai" },
  ];

  const whatsappAIUrl = getWhatsAppUrl("ai");

  return (
    <main className="min-h-screen bg-black text-white pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(AI_FAQS)) }}
      />

      {/* Hero */}
      <header className="space-y-6 max-w-3xl border-b border-white/10 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Cpu size={13} /> Applied Intelligence &amp; Autonomous Systems
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-white font-mono">
          NEURAL PIPELINES.
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
            DETERMINISTIC SYSTEMS.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
          We treat artificial intelligence as a rigorous engineering discipline—not a demo gimmick.
          Our architectures pair multi-agent autonomy with strict mathematical guardrails.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href={whatsappAIUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <MessageSquare size={14} /> Discuss AI Build on WhatsApp
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
          >
            Submit Architecture Brief
          </Link>
        </div>
      </header>

      {/* 4 Pillars Grid */}
      <section className="py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AI_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-5 hover:border-cyan-500/30 transition-all shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Icon size={24} />
                </div>
                <h2 className="text-xl font-bold text-white font-mono">{pillar.title}</h2>
                <p className="text-sm text-zinc-400 font-sans leading-relaxed">{pillar.description}</p>
                <ul className="space-y-2 pt-2 border-t border-white/5 text-xs font-mono text-zinc-300">
                  {pillar.specs.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">▸</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* AEO FAQ Section */}
      <section className="py-12 border-t border-white/10 space-y-8">
        <div>
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
            Answer Engine Optimization
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
            AI ARCHITECTURE QUESTIONS ANSWERED
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AI_FAQS.map((faq, i) => (
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

      {/* Callout */}
      <section className="mt-8 p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-cyan-500/30 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold font-mono text-white">
          READY TO DEPLOY REAL AUTONOMY?
        </h2>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto font-sans">
          Skip brittle wrappers. Partner directly with Sai Rio and Edison to architect mission-critical
          neural workflows.
        </p>
        <div className="pt-2">
          <a
            href={whatsappAIUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
          >
            <MessageSquare size={14} /> Connect Directly on WhatsApp <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </main>
  );
}
