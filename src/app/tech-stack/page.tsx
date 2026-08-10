"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Terminal, Layers, Server, Cloud, Sparkles, CheckCircle2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    name: "Frontend & Motion Engine",
    icon: Layers,
    items: [
      { name: "Next.js 16 (App Router)", desc: "React framework with Server Components and static site generation" },
      { name: "React 19", desc: "Latest UI library for concurrent rendering and state" },
      { name: "TypeScript", desc: "Strict type safety preventing runtime errors" },
      { name: "Tailwind CSS v4", desc: "Utility-first CSS styling with theme inline variables" },
      { name: "GSAP 3 (ScrollTrigger)", desc: "120 FPS scroll animations and timeline scrubbing" },
      { name: "Framer Motion", desc: "Spring physics animation engine for React" },
      { name: "Lenis Smooth Scroll", desc: "Momentum smooth scrolling mechanics" },
    ],
  },
  {
    name: "AI & Machine Learning",
    icon: Cpu,
    items: [
      { name: "Groq Llama 3.3 SDK", desc: "Ultra-fast LLM inference API engine" },
      { name: "Google Gemini API", desc: "Multimodal LLM generation and retrieval" },
      { name: "Context RAG Pipelines", desc: "Vector domain context injection engine" },
      { name: "Typewriter Streaming", desc: "Token streaming animation API routes" },
    ],
  },
  {
    name: "Backend & Database",
    icon: Server,
    items: [
      { name: "Node.js", desc: "Serverless runtime engine" },
      { name: "Python", desc: "Data processing and ML scripts" },
      { name: "Supabase", desc: "Open-source Firebase alternative with PostgreSQL" },
      { name: "PostgreSQL", desc: "Relational database architecture" },
    ],
  },
  {
    name: "Cloud, DevOps & Security",
    icon: Cloud,
    items: [
      { name: "Vercel Edge Network", desc: "Global CDN serverless deployment" },
      { name: "Git & GitHub", desc: "Version control and automated CI/CD" },
      { name: "Lighthouse 95+ Audit", desc: "Core Web Vitals and CLS optimization" },
      { name: "WCAG AA Accessibility", desc: "Keyboard navigation and screen reader support" },
    ],
  },
];

export default function TechStackPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <Terminal size={14} /> PRODUCTION TECH STACK
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)' }}
          className="font-bold text-white font-sans"
        >
          Battle-Tested Engineering <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Technology Matrix.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-3xl mx-auto"
        >
          Our technology choices are engineered for 120 FPS performance, zero layout shift, strict type safety, and global scalability.
        </motion.p>
      </section>

      {/* Categorized Tech Stack Grid */}
      <section className="space-y-16 mb-24">
        {CATEGORIES.map((cat, idx) => {
          const IconComp = cat.icon;
          return (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                  <IconComp size={20} />
                </div>
                <h2
                  style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
                  className="font-bold text-white tracking-tight"
                >{cat.name}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((tech, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="p-6 rounded-2xl bg-zinc-950/90 border border-white/10 space-y-2 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3
                        style={{ fontSize: 'var(--text-h4)', lineHeight: 'var(--lh-tight)' }}
                        className="font-bold text-white flex items-center gap-2"
                      >
                        <CheckCircle2 size={16} className="text-emerald-400" />
                        {tech.name}
                      </h3>
                    </div>
                    <p
                      style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-body)' }}
                      className="text-zinc-400"
                    >{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA Box */}
      <section className="text-center p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-6">
        <h2
          style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)' }}
          className="font-bold text-white"
        >Need a Custom Tech Stack Solution?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm">
          Discuss technical specs and architectural choices directly with founder Sai Vinoth.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all text-sm shadow-lg shadow-emerald-500/20"
        >
          Consult on Architecture <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
