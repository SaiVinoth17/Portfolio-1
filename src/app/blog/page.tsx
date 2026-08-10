"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Sparkles, Clock, ArrowUpRight, Tag } from "lucide-react";
import Link from "next/link";

const ARTICLES = [
  {
    id: "building-120fps-motion-engine",
    title: "Building a 120 FPS Web Motion Engine with GSAP 3 and Framer Motion",
    category: "Creative Engineering",
    readTime: "5 min read",
    date: "Coming Soon",
    excerpt: "How we architect hardware-accelerated 3D transforms, spring physics, and smooth scroll mechanics without triggering layout thrashing.",
    tags: ["GSAP 3", "Framer Motion", "WebGL", "Performance"],
  },
  {
    id: "enterprise-groq-rag-pipeline",
    title: "Architecting Low-Latency RAG Context Pipelines with Groq and Next.js 16",
    category: "AI & Machine Learning",
    readTime: "7 min read",
    date: "Coming Soon",
    excerpt: "A deep dive into serverless edge RAG architecture, vector context extraction, and sub-50ms streaming token generation.",
    tags: ["Groq Llama 3.3", "RAG Pipeline", "Next.js 16", "TypeScript"],
  },
  {
    id: "tailwind-v4-app-router-best-practices",
    title: "Tailwind CSS v4 & Next.js App Router: Production Optimization Guide",
    category: "Frontend Architecture",
    readTime: "4 min read",
    date: "Coming Soon",
    excerpt: "Lessons learned migrating high-traffic digital products to Tailwind v4 theme inline variables and zero-config CSS compilation.",
    tags: ["Tailwind v4", "Next.js 16", "CSS Architecture", "Design Systems"],
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <BookOpen size={14} /> ENGINEERING INSIGHTS & BLOG
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)' }}
          className="font-bold text-white font-sans"
        >
          Thought Leadership & <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Technical Case Studies.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-3xl mx-auto"
        >
          Technical deep-dives on AI software architecture, 120 FPS web graphics, Next.js 16 performance, and product design.
        </motion.p>
      </section>

      {/* Articles Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {ARTICLES.map((article, idx) => (
          <motion.article
            key={article.id}
            whileHover={{ y: -6 }}
            className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 flex flex-col justify-between space-y-6 hover:border-emerald-500/40 transition-colors group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                <span className="text-emerald-400 font-bold uppercase tracking-wider">{article.category}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
              </div>

              <h3
                style={{ fontSize: 'var(--text-h4)', lineHeight: 'var(--lh-tight)' }}
                className="font-bold text-white group-hover:text-emerald-300 transition-colors"
              >
                {article.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed">{article.excerpt}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] bg-zinc-900 border border-white/10 text-zinc-300 px-2.5 py-0.5 rounded-md font-mono flex items-center gap-1"
                  >
                    <Tag size={10} className="text-emerald-400" /> {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
                <span>{article.date}</span>
                <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5 font-bold">
                  Read Article <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {/* Newsletter Subscription */}
      <section className="p-12 rounded-3xl bg-gradient-to-b from-zinc-950 to-black border border-white/10 text-center space-y-6 max-w-3xl mx-auto">
        <Sparkles className="text-emerald-400 mx-auto" size={28} />
        <h2
          style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)' }}
          className="font-bold text-white"
        >Subscribe to Engineering Insights</h2>
        <p className="text-zinc-400 text-sm max-w-xl mx-auto">
          Get notified when new articles on AI software, Next.js architecture, and web performance are published. Zero spam.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address..."
            className="flex-1 bg-zinc-900 border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
          />
          <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-2xl transition-all cursor-pointer shadow-lg shadow-emerald-500/20">
            Subscribe
          </button>
        </div>
      </section>
    </main>
  );
}
