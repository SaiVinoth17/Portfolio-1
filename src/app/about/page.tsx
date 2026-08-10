"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  Cpu,
  Zap,
  CheckCircle2,
  Download,
  Terminal,
  Award,
  ArrowUpRight,
  UserCheck,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const TIMELINE = [
  {
    year: "2024 - Present",
    title: "Founder & Lead Engineer",
    company: "Aevion Studio",
    description: "Architecting high-performance AI software, SaaS platforms, and digital experiences for high-growth startups globally.",
  },
  {
    year: "2023 - 2024",
    title: "Senior Product Engineer",
    company: "AI & Full-Stack Systems",
    description: "Specialized in Next.js 16 App Router, React 19, TypeScript, LLM RAG pipelines, and 120 FPS web motion engines.",
  },
  {
    year: "2022 - 2023",
    title: "Frontend & UI Architect",
    company: "Digital Engineering",
    description: "Focused on high-performance GPU-accelerated web graphics, GSAP, Framer Motion, and design systems.",
  },
];

const CERTIFICATIONS = [
  { title: "Advanced React & Next.js Architecture", issuer: "Meta / Vercel Standards" },
  { title: "Full-Stack AI & LLM Systems Engineering", issuer: "Deep Learning & AI Engineering" },
  { title: "High Performance Web Graphics & Motion", issuer: "Awwwards Creative Engineering" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <Sparkles size={14} /> ABOUT AEVION STUDIO & FOUNDER
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: 'var(--text-h1)',
            lineHeight: 'var(--lh-heading)',
            letterSpacing: 'var(--ls-heading)',
          }}
          className="font-bold text-white font-sans"
        >
          Engineering, Design & AI <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Working Together.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-3xl mx-auto"
        >
          Aevion Studio is an AI Software & Digital Engineering Studio founded by <strong className="text-white">Sai Vinoth</strong>. We believe software should solve real problems through thoughtful engineering, performance, and clean design.
        </motion.p>
      </section>

      {/* Studio Philosophy Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4"
        >
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl w-fit">
            <Cpu size={24} />
          </div>
          <h3
            style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
            className="font-bold text-white"
          >AI-First Mindset</h3>
          <p
            style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-body)' }}
            className="text-zinc-400">
            We integrate intelligent LLMs, RAG context pipelines, and real-time automation directly into core product architectures.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4"
        >
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-2xl w-fit">
            <Zap size={24} />
          </div>
          <h3
            style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
            className="font-bold text-white"
          >120 FPS Motion</h3>
          <p
            style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-body)' }}
            className="text-zinc-400">
            Fluid interactions, spring physics, and hardware-accelerated animations built with GSAP and Framer Motion.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="p-8 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4"
        >
          <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl w-fit">
            <ShieldCheck size={24} />
          </div>
          <h3
            style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
            className="font-bold text-white"
          >Clean Architecture</h3>
          <p
            style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-body)' }}
            className="text-zinc-400">
            Strict TypeScript type safety, Next.js App Router, edge deployments, and long-term maintainability.
          </p>
        </motion.div>
      </section>

      {/* Founder Profile Section */}
      <section className="bg-gradient-to-b from-zinc-950 to-black border border-white/10 rounded-3xl p-8 sm:p-12 mb-24 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <UserCheck size={14} /> FOUNDER PROFILE
            </div>
            <h2
              style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)' }}
              className="font-bold text-white"
            >Meet Sai Vinoth</h2>
            <p
              style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
              className="text-zinc-300"
            >
              &quot;I am a Software Engineer and Founder of Aevion Studio. I spend most of my time building AI-powered applications, modern web experiences, and products that balance engineering quality with great user experience. My philosophy is simple: Build products people actually enjoy using.&quot;
            </p>

            <div className="space-y-3 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Specialization: Full-Stack Web Architecture & AI Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Core Stack: Next.js 16, React 19, TypeScript, Python, Tailwind v4</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Philosophy: Clean Code • High FPS Performance • Meaningful Design</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="mailto:hello@aevion.studio"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-2xl transition-all inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20 text-sm"
              >
                Contact Sai Vinoth <ArrowUpRight size={16} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold rounded-2xl transition-all inline-flex items-center gap-2 text-sm"
              >
                Download Resume <Download size={16} />
              </a>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="text-emerald-400" size={20} /> Engineering Journey
            </h3>
            <div className="space-y-4 border-l-2 border-emerald-500/30 pl-6">
              {TIMELINE.map((item, index) => (
                <div key={index} className="space-y-1 relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-emerald-400 border-4 border-black"></div>
                  <span className="text-xs font-mono text-emerald-400">{item.year}</span>
                  <h4 className="text-base font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-zinc-400">{item.company}</p>
                  <p className="text-xs text-zinc-300 pt-1 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="space-y-8 mb-20">
        <div className="text-center space-y-2">
          <h2
            style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)' }}
            className="font-bold text-white"
          >Certifications & Milestones</h2>
          <p className="text-zinc-400 text-sm">Verified technical standards in AI, web architecture, and motion.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CERTIFICATIONS.map((cert, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-zinc-950 border border-white/10 space-y-2">
              <Award className="text-emerald-400" size={24} />
              <h4 className="text-base font-bold text-white">{cert.title}</h4>
              <p className="text-xs font-mono text-zinc-400">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="text-center p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-6">
        <h2
          style={{ fontSize: 'var(--text-h2)', lineHeight: 'var(--lh-subheading)' }}
          className="font-bold text-white"
        >Ready to Build Something Extraordinary?</h2>
        <p
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-xl mx-auto"
        >
          Collaborate directly with Sai Vinoth and Aevion Studio on your next AI software or web application.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all text-sm"
        >
          Start a Project <Rocket size={16} />
        </Link>
      </section>
    </main>
  );
}
