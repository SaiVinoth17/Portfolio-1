"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ArrowUpRight, Sparkles, Star, GitFork, Code2 } from "lucide-react";
import Link from "next/link";

const REPOS = [
  {
    name: "aevion-portfolio",
    desc: "The Aevion Studio OS — a motion-first creative portfolio with WebGL, GSAP ScrollTrigger, 941-frame scroll sequence, and AI chat.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 128,
    forks: 24,
    topics: ["next.js", "three.js", "gsap", "framer-motion", "groq"],
    updated: "2 days ago",
    license: "MIT",
  },
  {
    name: "aevion-components",
    desc: "Production-grade animated React components with Framer Motion, GSAP integrations, and Three.js wrappers. TypeScript-first.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 89,
    forks: 15,
    topics: ["react", "framer-motion", "components", "animation", "typescript"],
    updated: "1 week ago",
    license: "MIT",
  },
  {
    name: "nextjs-supabase-starter",
    desc: "Next.js 16 + Supabase + Stripe + Groq AI boilerplate with RLS, auth, and Aevion design system pre-configured.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 203,
    forks: 47,
    topics: ["nextjs", "supabase", "stripe", "boilerplate", "ai"],
    updated: "3 days ago",
    license: "MIT",
  },
  {
    name: "gsap-scroll-recipes",
    desc: "A collection of reusable GSAP ScrollTrigger patterns: pinning, scrubbing, parallax layers, and timeline coordination.",
    lang: "JavaScript",
    langColor: "#f7df1e",
    stars: 156,
    forks: 31,
    topics: ["gsap", "scrolltrigger", "animation", "javascript", "scroll"],
    updated: "5 days ago",
    license: "MIT",
  },
  {
    name: "groq-streaming-sdk",
    desc: "Minimal SDK for streaming Groq LLM responses via Server-Sent Events in Next.js App Router with structured tool-calling.",
    lang: "TypeScript",
    langColor: "#3178c6",
    stars: 74,
    forks: 12,
    topics: ["groq", "llm", "streaming", "sse", "next.js"],
    updated: "1 week ago",
    license: "MIT",
  },
  {
    name: "webgl-shader-lab",
    desc: "OGL and raw WebGL shader experiments: raymarching, caustics, domain folding, and GPU particle systems.",
    lang: "GLSL",
    langColor: "#5586a4",
    stars: 112,
    forks: 19,
    topics: ["webgl", "glsl", "shaders", "raymarching", "ogl"],
    updated: "2 weeks ago",
    license: "MIT",
  },
];

// Simulated contribution graph
const WEEKS = 52;
const DAYS = 7;
const CONTRIB_CELLS = Array.from({ length: WEEKS * DAYS }, (_, i) => {
  const pseudo = ((i * 37 + 19) % 100) / 100;
  return pseudo < 0.35 ? 0 : pseudo < 0.55 ? 1 : pseudo < 0.75 ? 2 : pseudo < 0.9 ? 3 : 4;
});

function ContribGraph() {
  const cells = CONTRIB_CELLS;
  const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

  return (
    <div className="overflow-x-auto py-2">
      <div className="flex gap-1" style={{ width: "max-content" }}>
        {Array.from({ length: WEEKS }, (_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: DAYS }, (_, d) => {
              const level = cells[w * DAYS + d];
              return (
                <motion.div
                  key={d}
                  className="w-3 h-3 rounded-sm"
                  style={{ background: colors[level] }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (w * DAYS + d) * 0.001, duration: 0.2 }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo, index }: { repo: typeof REPOS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group"
    >
      <div
        className="h-full rounded-2xl border border-white/8 p-6 hover:border-green-500/25 transition-all duration-300"
        style={{ background: "#0d1117" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-green-400 shrink-0" />
            <span className="text-sm font-mono font-bold text-green-400 hover:underline cursor-pointer">{repo.name}</span>
          </div>
          <a
            href={`https://github.com/saivinoth17/${repo.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg border border-white/8 hover:border-green-500/30 transition-colors"
          >
            <Github size={14} className="text-zinc-500 hover:text-green-400 transition-colors" />
          </a>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed mb-5">{repo.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {repo.topics.map((t) => (
            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: "#1f6feb20", color: "#58a6ff", border: "1px solid #1f6feb30" }}>
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-600">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: repo.langColor }} />
            <span>{repo.lang}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={11} /> {repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={11} /> {repo.forks}
          </div>
          <div className="ml-auto">{repo.updated}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function OpenSourcePage() {
  return (
    <main
      className="min-h-screen text-white selection:bg-green-500 selection:text-black font-mono"
      style={{ background: "#0d1117" }}
    >
      <div className="relative pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Hero — GitHub dark IDE */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-500/25 bg-green-500/10 text-green-400 text-xs font-mono mb-8"
          >
            <Github size={12} /> OPEN SOURCE · {REPOS.length} REPOSITORIES
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-none mb-6"
          >
            <span className="text-white">Built in</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              the open.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-zinc-500 text-sm max-w-lg leading-relaxed"
          >
            Aevion&apos;s core tools, components, and boilerplates are open source. Use them, fork them, improve them.
          </motion.p>
        </section>

        {/* Contribution Graph */}
        <section className="mb-16">
          <div className="rounded-2xl border border-white/8 p-6" style={{ background: "#010409" }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm font-bold text-white">{REPOS.reduce((a, r) => a + r.stars, 0)} total stars</div>
                <div className="text-xs text-zinc-600">Contributions in the last year</div>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-600">
                <span>Less</span>
                {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map((c, i) => (
                  <div key={i} className="w-3 h-3 rounded-sm" style={{ background: c }} />
                ))}
                <span>More</span>
              </div>
            </div>
            <ContribGraph />
          </div>
        </section>

        {/* Repos */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
          {REPOS.map((r, i) => <RepoCard key={r.name} repo={r} index={i} />)}
        </section>

        {/* CTA */}
        <section
          className="rounded-3xl p-12 text-center border border-white/8"
          style={{ background: "linear-gradient(135deg, #0e4429, #010409)" }}
        >
          <div className="text-xs font-mono text-green-500 tracking-widest mb-4">CONTRIBUTE</div>
          <h2 className="text-3xl font-extrabold text-white mb-3">Help us build better tools.</h2>
          <p className="text-zinc-500 text-sm mb-8 max-w-md mx-auto">Open an issue, submit a PR, or star a repo. All contributions are welcome.</p>
          <a
            href="https://github.com/saivinoth17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white"
            style={{ background: "linear-gradient(135deg, #238636, #2ea043)", boxShadow: "0 0 40px #4ade8030" }}
          >
            <Github size={16} /> View All on GitHub <ArrowUpRight size={14} />
          </a>
        </section>
      </div>
    </main>
  );
}
