"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  Layout,
  Globe,
  Bot,
  Zap,
  ShieldCheck,
  Code2,
  Rocket,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    icon: Cpu,
    title: "AI Applications & LLM Systems",
    description: "Custom AI software, intelligent RAG document retriever pipelines, autonomous agent workflows, and fine-tuned model integrations.",
    deliverables: ["LLM Integration", "RAG Knowledge Bases", "AI Agent Pipelines", "Custom Prompt Systems"],
  },
  {
    icon: Layout,
    title: "Full-Stack Custom SaaS Platforms",
    description: "Multi-tenant cloud applications, subscription engines, real-time analytics dashboards, and scalable database architectures.",
    deliverables: ["Multi-Tenant Architecture", "Stripe & Billing Engines", "Real-Time Telemetry", "Role-Based Access"],
  },
  {
    icon: Globe,
    title: "Modern Web Applications",
    description: "High-performance web apps built on Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4 with sub-second page loads.",
    deliverables: ["Next.js 16 Architecture", "TypeScript Safety", "Tailwind CSS v4 Styling", "Lighthouse 95+ Audit"],
  },
  {
    icon: Zap,
    title: "120 FPS Motion & 3D Web Graphics",
    description: "Award-winning creative engineering with GSAP 3, Framer Motion, Lenis smooth scrolling, and WebGL shader interactions.",
    deliverables: ["GSAP ScrollTrigger", "Framer Motion Physics", "Lenis Scroll Mechanics", "3D Radial Transforms"],
  },
  {
    icon: Bot,
    title: "Intelligent Conversational Assistants",
    description: "Custom enterprise AI chatbots powered by Groq and LLM APIs with streaming token output, markdown rendering, and local memory.",
    deliverables: ["Groq Llama 3.3 Engine", "Streaming Token API", "Markdown & Code Blocks", "Session Memory"],
  },
  {
    icon: ShieldCheck,
    title: "API Engineering & Edge Architecture",
    description: "Serverless REST & GraphQL APIs built for global CDN edge delivery with zero-trust security and sub-50ms latency.",
    deliverables: ["Serverless Edge Routes", "Rate Limiting", "Global CDN Caching", "API Documentation"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <Code2 size={14} /> STUDIO CAPABILITIES
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)' }}
          className="font-bold text-white font-sans"
        >
          Digital Engineering Services <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Engineered for Scale.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-3xl mx-auto"
        >
          From custom AI applications to 120 FPS web motion engines, Aevion Studio delivers high-end software designed for performance, security, and exceptional user experience.
        </motion.p>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {SERVICES.map((srv, idx) => {
          const IconComponent = srv.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-colors group"
            >
              <div className="space-y-4">
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                  <IconComponent size={24} />
                </div>
                <h3
                  style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
                  className="font-bold text-white group-hover:text-emerald-300 transition-colors"
                >
                  {srv.title}
                </h3>
                <p
                  style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-body)' }}
                  className="text-zinc-400"
                >{srv.description}</p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider">Deliverables</span>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {srv.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* CTA Box */}
      <section className="text-center p-12 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-white/10 space-y-6">
        <h2
          style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)' }}
          className="font-bold text-white"
        >Have a Specific Project Requirement?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm">
          Let&apos;s discuss your technical specifications, architecture, and timeline directly with founder Sai Vinoth.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all text-sm shadow-lg shadow-emerald-500/20"
        >
          Book a Technical Call <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
