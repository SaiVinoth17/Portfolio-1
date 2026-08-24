"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock, Tag, Search, BookOpen } from "lucide-react";
import Link from "next/link";

const ARTICLES = [
  {
    id: "streaming-ai",
    category: "AI ENGINEERING",
    title: "Building real-time streaming LLM pipelines with Groq and Server-Sent Events",
    excerpt: "A deep technical walkthrough of architecting production-grade SSE pipelines that deliver sub-100ms first-token latency using Groq's inference API.",
    readTime: "12 min",
    date: "Aug 2024",
    accent: "#6366f1",
    size: "large",
  },
  {
    id: "webgl-perf",
    category: "CREATIVE ENGINEERING",
    title: "GPU-accelerated scroll experiences: Three.js performance at 120 FPS",
    excerpt: "Techniques to keep WebGL scenes running at peak performance on modern browsers without sacrificing visual fidelity.",
    readTime: "8 min",
    date: "Jul 2024",
    accent: "#8b5cf6",
    size: "medium",
  },
  {
    id: "nextjs-16",
    category: "FULL-STACK",
    title: "Next.js 16 App Router: patterns for real-world production applications",
    excerpt: "Practical patterns I've battle-tested across multiple production SaaS deployments — server actions, streaming, and partial prerendering.",
    readTime: "10 min",
    date: "Jun 2024",
    accent: "#4f46e5",
    size: "medium",
  },
  {
    id: "supabase-rls",
    category: "SECURITY",
    title: "Row-Level Security patterns that actually protect your Supabase data",
    excerpt: "A comprehensive audit of common RLS mistakes and the patterns that make multi-tenant apps truly secure at the database layer.",
    readTime: "14 min",
    date: "May 2024",
    accent: "#7c3aed",
    size: "large",
  },
  {
    id: "gsap-scrolltrigger",
    category: "ANIMATION",
    title: "GSAP ScrollTrigger advanced: scrubbing, pinning, and timeline coordination",
    excerpt: "Beyond the basics — crafting multi-stage scroll narratives that feel cinematic rather than just animated.",
    readTime: "9 min",
    date: "Apr 2024",
    accent: "#6366f1",
    size: "small",
  },
  {
    id: "typescript-strict",
    category: "ENGINEERING",
    title: "Why I never turn off strict TypeScript mode (and how to survive it)",
    excerpt: "Strict TypeScript is painful at first and invaluable in production. Here's how to enable it in a legacy codebase without losing your mind.",
    readTime: "6 min",
    date: "Mar 2024",
    accent: "#4338ca",
    size: "small",
  },
];

function ArticleCard({ article, index }: { article: typeof ARTICLES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const isLarge = article.size === "large";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group cursor-pointer ${isLarge ? "col-span-1 lg:col-span-2" : ""}`}
    >
      <Link href={`/blog/${article.id}`} className="block h-full">
        <div
          className="h-full p-8 border rounded-3xl transition-all duration-300 hover:shadow-2xl"
          style={{
            borderColor: "#e5e7eb",
            background: "#ffffff",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-full"
              style={{ background: `${article.accent}12`, color: article.accent }}
            >
              {article.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <Clock size={11} /> {article.readTime}
              </span>
              <span>{article.date}</span>
            </div>
          </div>

          <h2
            className="text-xl sm:text-2xl font-bold text-zinc-900 leading-tight mb-4 relative"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            {/* Ink underline on hover */}
            <span className="relative">
              {article.title}
              <span
                className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: article.accent }}
              />
            </span>
          </h2>

          <p className="text-sm text-zinc-500 leading-relaxed mb-6">{article.excerpt}</p>

          <div
            className="flex items-center gap-1.5 text-xs font-bold transition-all"
            style={{ color: article.accent }}
          >
            Read Article <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPage() {
  const [search, setSearch] = useState("");

  const filtered = ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main
      className="min-h-screen selection:bg-indigo-600 selection:text-white"
      style={{ background: "#fafafa", color: "#111827" }}
    >
      <div className="relative pt-32 pb-24 px-4 sm:px-8 max-w-6xl mx-auto">
        {/* Editorial masthead */}
        <section className="mb-16 border-b-4 border-zinc-900 pb-12">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div>
              <div className="text-[10px] font-bold tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                <BookOpen size={11} /> AEVION JOURNAL · ENGINEERING & CRAFT
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl sm:text-8xl font-black text-zinc-900 leading-none tracking-tighter"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                The Lab.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-zinc-500 mt-4 max-w-md text-sm"
              >
                Deep technical writing on AI engineering, creative frontend, full-stack architecture, and motion design.
              </motion.p>
            </div>
            {/* Issue tag */}
            <div className="text-right hidden sm:block">
              <div className="text-xs text-zinc-400 font-mono">VOL. 2 · ISSUE 6</div>
              <div className="text-xs text-zinc-400 font-mono">AUG 2024</div>
              <div className="text-xs text-indigo-600 font-mono font-bold mt-1">{ARTICLES.length} ARTICLES</div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-10">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm border border-zinc-200 focus:border-indigo-400 outline-none bg-white text-zinc-900 placeholder-zinc-400 transition-colors"
            />
          </div>
        </section>

        {/* Article Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
          {filtered.map((a, i) => <ArticleCard key={a.id} article={a} index={i} />)}
          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-20 text-zinc-400 font-mono text-sm">
              No articles matching &quot;{search}&quot;
            </div>
          )}
        </section>

        {/* Newsletter signup */}
        <section
          className="rounded-3xl p-12 text-center border-2 border-indigo-100"
          style={{ background: "linear-gradient(135deg, #eef2ff, #f8faff)" }}
        >
          <div className="text-xs font-bold tracking-widest text-indigo-600 mb-4">SUBSCRIBE TO THE JOURNAL</div>
          <h2 className="text-3xl font-black text-zinc-900 mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            New issues monthly.
          </h2>
          <p className="text-zinc-500 text-sm mb-8">Get deep technical articles on AI, engineering, and motion design delivered to your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-xl text-sm border border-indigo-200 focus:border-indigo-400 outline-none text-zinc-900 placeholder-zinc-400"
            />
            <button
              className="px-6 py-3 rounded-xl font-bold text-sm text-white"
              style={{ background: "linear-gradient(135deg, #6366f1, #4f46e5)" }}
            >
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
