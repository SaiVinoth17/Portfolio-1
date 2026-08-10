"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Code2,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const SKILLS = [
  { category: "Frontend", items: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "GSAP 3", "Framer Motion", "Lenis"] },
  { category: "Backend & Edge", items: ["Node.js", "Python", "Vercel Edge", "Supabase", "REST & GraphQL APIs", "PostgreSQL"] },
  { category: "AI & ML", items: ["Groq SDK", "Llama 3.3", "Google Gemini API", "RAG Pipelines", "Prompt Engineering"] },
  { category: "Architecture & DevOps", items: ["Lighthouse Optimization", "WCAG AA Accessibility", "Git & CI/CD", "Vercel CDN"] },
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <FileText size={14} /> FOUNDER CURRICULUM VITAE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)' }}
          className="font-bold text-white font-sans"
        >
          Sai Vinoth <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Software Engineer & Founder.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Specialized in building modern web applications, high-performance AI software, and 120 FPS web motion engines.
        </motion.p>

        <div className="pt-2">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-2xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Download Official CV (PDF) <Download size={18} />
          </a>
        </div>
      </section>

      {/* Skill Matrix Grid */}
      <section className="space-y-8 mb-20">
        <h2
          style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)' }}
          className="font-bold text-white flex items-center gap-2"
        >
          <Code2 className="text-emerald-400" size={22} /> Technical Skill Matrix
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((cat, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-4">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">{cat.category}</span>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Education */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6">
          <h3
            style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
            className="font-bold text-white flex items-center gap-2"
          >
            <Briefcase className="text-emerald-400" size={20} /> Work Experience
          </h3>
          <div className="space-y-6 border-l-2 border-emerald-500/30 pl-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400">2024 - PRESENT</span>
              <h4 className="text-base font-bold text-white">Founder & Lead Engineer</h4>
              <p className="text-xs text-zinc-400">Aevion Studio</p>
              <p className="text-xs text-zinc-300 pt-1 leading-relaxed">
                Building AI software, custom SaaS platforms, and digital experiences for high-growth startups globally.
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400">2023 - 2024</span>
              <h4 className="text-base font-bold text-white">Senior Product Engineer</h4>
              <p className="text-xs text-zinc-400">Digital Engineering</p>
              <p className="text-xs text-zinc-300 pt-1 leading-relaxed">
                Architected Next.js 16 App Router systems, Groq RAG pipelines, and 120 FPS web graphics.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6">
          <h3
            style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
            className="font-bold text-white flex items-center gap-2"
          >
            <GraduationCap className="text-emerald-400" size={20} /> Education & Foundation
          </h3>
          <div className="space-y-6 border-l-2 border-emerald-500/30 pl-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400">SOFTWARE ENGINEERING</span>
              <h4 className="text-base font-bold text-white">B.E. Computer Science & Engineering</h4>
              <p className="text-xs text-zinc-300 pt-1 leading-relaxed">
                Core foundation in Computer Science, Data Structures, Algorithms, Distributed Systems, and Web Engineering.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
