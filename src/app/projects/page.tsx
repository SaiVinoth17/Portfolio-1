"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FolderGit2,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const CASE_STUDIES = [
  {
    id: "nilgiris-explorers",
    title: "Nilgiris Explorers",
    subtitle: "Premium Tourism & Experience Discovery Platform",
    category: "Web Application • Travel Engine",
    overview: "A premium tourism discovery platform engineered to showcase destination guides, interactive experience bookings, and local exploration for the Nilgiris (Ooty) region.",
    problem: "Fragmented destination information and slow, outdated travel booking interfaces caused poor user retention for Nilgiris visitors.",
    solution: "Built a high-performance Next.js 16 web application with interactive visual maps, fluid motion transitions, mobile-first optimization, and AI context recommendations.",
    architecture: ["Next.js 16 App Router", "React 19 & TypeScript", "Tailwind CSS v4", "SEO Engine & Structured Schema"],
    metrics: "Lighthouse 98 Performance • Sub-second Page Loads • 100% Mobile Responsive",
    link: "https://nilgirisexplorers.com",
    github: "https://github.com/aevionstudio",
  },
  {
    id: "ooty-mistwings",
    title: "Ooty Mistwings",
    subtitle: "Cinematic Destination & Visual Storytelling Platform",
    category: "Creative Web Engineering • Destination Discovery",
    overview: "An immersive digital platform presenting the beauty of Ooty and the Nilgiris through cinematic UI, responsive visual storytelling, and fluid scroll interactions.",
    problem: "Traditional travel blogs lacked visual immersion, resulting in low engagement times for prospective travelers.",
    solution: "Engineered a cinematic storytelling layout with GPU-accelerated motion, parallax scroll dynamics, and responsive image optimizations.",
    architecture: ["GSAP 3 ScrollTrigger", "Lenis Smooth Scroll", "TypeScript", "Responsive Fluid Layout"],
    metrics: "120 FPS Motion Rendering • Zero Layout Shift (CLS: 0)",
    link: "https://ootymistwings.com",
    github: "https://github.com/aevionstudio",
  },
  {
    id: "gaming-kingdom",
    title: "Gaming Kingdom",
    subtitle: "High-Performance Interactive Gaming Community Hub",
    category: "Frontend Architecture • Community Hub",
    overview: "A fast, visually engaging web platform designed to showcase modern frontend engineering, high responsiveness, and interactive UI components for gaming enthusiasts.",
    problem: "Gaming community hubs frequently suffer from heavy bundle sizes, slow re-renders, and poor mobile responsiveness.",
    solution: "Designed a lightweight, modular component architecture with instant state updates, dynamic filtering, and dark glassmorphic styling.",
    architecture: ["React 19 & TypeScript", "Tailwind v4", "Modular State Management", "Web Audio Feedback"],
    metrics: "60 FPS Interactive Feedback • Sub-50ms Response Latency",
    link: "https://aevion.studio",
    github: "https://github.com/aevionstudio",
  },
  {
    id: "aevion-studio-os",
    title: "Aevion Studio Motion OS v2.0",
    subtitle: "Awwwards-Grade Interactive Web Operating System",
    category: "Creative Engineering • AI Assistant",
    overview: "An interactive web operating system integrated directly into the portfolio website featuring magnetic cursor physics, ambient background intelligence, and Groq-powered AI Assistant.",
    problem: "Standard web portfolios feel like static brochures rather than demonstrating actual engineering capabilities.",
    solution: "Transformed the website into a living motion operating system with real-time telemetry, Web Audio API sound synthesis, and interactive CLI terminal.",
    architecture: ["Next.js 16", "Groq Llama 3.3 SDK", "GSAP 3 & Framer Motion", "Web Audio API Synth"],
    metrics: "Awwwards-Grade Creative Experience • 100% Type Safe",
    link: "https://aevion.studio",
    github: "https://github.com/aevionstudio",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <FolderGit2 size={14} /> FEATURED CASE STUDIES
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)' }}
          className="font-bold text-white font-sans"
        >
          Featured Projects & Engineering <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Case Studies.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-3xl mx-auto"
        >
          Detailed engineering breakdowns of our flagship platforms including Nilgiris Explorers, Ooty Mistwings, Gaming Kingdom, and Aevion Studio Motion OS.
        </motion.p>
      </section>

      {/* Case Studies List */}
      <section className="space-y-12 mb-24">
        {CASE_STUDIES.map((project) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-8 hover:border-emerald-500/40 transition-colors relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/10 pb-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">{project.category}</span>
                <h2
                  style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)', letterSpacing: 'var(--ls-heading)' }}
                  className="font-bold text-white mt-1"
                >
                  <Link href={`/projects/${project.id}`} className="hover:text-emerald-300 transition-colors">
                    {project.title}
                  </Link>
                </h2>
                <p className="text-sm text-zinc-400 mt-1">{project.subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/projects/${project.id}`}
                  className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer"
                >
                  Deep Case Study <ArrowUpRight size={14} />
                </Link>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-xl transition-colors cursor-pointer"
                  title="View GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  Live Demo <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="text-emerald-400" size={18} /> Problem & Overview
                </h3>
                <p className="text-zinc-300 leading-relaxed">{project.overview}</p>
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-1">
                  <span className="text-xs font-mono text-amber-400">Core Challenge</span>
                  <p className="text-xs text-zinc-300">{project.problem}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="text-emerald-400" size={18} /> Solution & Architecture
                </h3>
                <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.architecture.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs bg-zinc-900 border border-white/10 text-emerald-300 px-3 py-1 rounded-full font-mono flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Benchmark Bar */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between font-mono text-xs text-emerald-400">
              <div className="flex items-center gap-2">
                <Cpu size={16} />
                <span>Performance Benchmark</span>
              </div>
              <span className="font-bold">{project.metrics}</span>
            </div>
          </motion.article>
        ))}
      </section>

      {/* CTA Box */}
      <section className="text-center p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-6">
        <h2
          style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)' }}
          className="font-bold text-white"
        >Have a Project Requiring High Engineering Standards?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm">
          Discuss your case study requirements directly with founder Sai Vinoth.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all text-sm"
        >
          Start a Case Study <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
