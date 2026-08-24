"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  FileText,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Code2,
  Cpu,
  ArrowUpRight,
  Sparkles,
  Printer,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";

const SKILL_MATRIX = [
  {
    category: "FRONTEND & MOTION",
    skills: [
      { name: "Next.js 16 (App Router)", level: "98%" },
      { name: "React 19 & Server Components", level: "98%" },
      { name: "TypeScript 5+", level: "95%" },
      { name: "Tailwind CSS v4", level: "96%" },
      { name: "GSAP 3 & ScrollTrigger", level: "92%" },
      { name: "Three.js & WebGL 2", level: "88%" },
    ],
  },
  {
    category: "AI & SYSTEMS",
    skills: [
      { name: "Groq LLM SDK & Inference", level: "94%" },
      { name: "RAG & Vector Retrieval", level: "90%" },
      { name: "Prompt Architecture & Tool Calling", level: "95%" },
      { name: "Streaming SSE API Endpoints", level: "96%" },
    ],
  },
  {
    category: "BACKEND & CLOUD",
    skills: [
      { name: "Node.js Serverless", level: "92%" },
      { name: "PostgreSQL & Supabase", level: "90%" },
      { name: "Vercel Edge & Global CDN", level: "95%" },
      { name: "Git & Automated CI/CD", level: "94%" },
    ],
  },
];

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<string>("ALL");

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black print:bg-white print:text-black print:pt-6 print:pb-6">
      {/* Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-16 print:mb-8 print:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono backdrop-blur-md print:hidden"
        >
          <FileText size={14} /> THE DOSSIER • VERIFIED TECHNICAL RECORD
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight font-sans print:text-black print:text-3xl"
        >
          Sai Vinoth <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent print:text-black print:bg-none">
            Software Architect & Founder.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed print:text-zinc-700 print:text-xs print:mx-0"
        >
          Specialized in Next.js 16 App Router, React 19, high-throughput AI LLM inference pipelines, and GPU-accelerated creative motion engineering. Contact: hello@aevion.studio • GitHub: github.com/aevionstudio
        </motion.p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 print:hidden">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold text-xs rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Printer size={14} /> Print / Save PDF
          </button>
          <a
            href="mailto:hello@aevion.studio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-white/10 text-white font-mono text-xs rounded-2xl hover:border-emerald-500/40 transition-all"
          >
            Request Full ATS CV
          </a>
        </div>
      </section>

      {/* Grid Layout: Experience & Education on Left, Skill Matrix on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-start print:grid-cols-1 print:gap-6 print:mb-6">
        {/* Left: Career Progression */}
        <div className="lg:col-span-7 space-y-8 print:space-y-6">
          {/* Experience Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-8 shadow-2xl print:bg-white print:border-zinc-300 print:p-0 print:shadow-none print:space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 print:border-zinc-300">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 print:text-black print:text-base">
                <Briefcase className="text-emerald-400 print:hidden" size={18} /> Engineering Leadership & Experience
              </h2>
              <span className="text-xs font-mono text-emerald-400 print:text-zinc-600">2022 - PRESENT</span>
            </div>

            <div className="space-y-8 border-l-2 border-emerald-500/30 pl-6 print:border-zinc-300 print:space-y-4 print:pl-4">
              {/* Role 1 */}
              <div className="space-y-2 relative print:space-y-1">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-emerald-400 border-4 border-black print:hidden" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold print:text-black">2024 - PRESENT</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">Aevion Studio</span>
                </div>
                <h3 className="text-lg font-bold text-white print:text-black print:text-sm">Founder & Lead Software Architect</h3>
                <p className="text-xs text-zinc-300 leading-relaxed print:text-zinc-800">
                  Architecting modern web applications, high-throughput Groq LLM inference pipelines, 120 FPS motion engines, and custom SaaS platforms for high-growth startups globally.
                </p>
              </div>

              {/* Role 2 */}
              <div className="space-y-2 relative print:space-y-1">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-cyan-400 border-4 border-black print:hidden" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold print:text-black">2023 - 2024</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">AI & Modern Web Systems</span>
                </div>
                <h3 className="text-lg font-bold text-white print:text-black print:text-sm">Senior Product & Full-Stack Engineer</h3>
                <p className="text-xs text-zinc-300 leading-relaxed print:text-zinc-800">
                  Specialized in Next.js 16 App Router, React 19, TypeScript safety, LLM RAG pipelines, and high-performance WebGL graphics rendering.
                </p>
              </div>

              {/* Role 3 */}
              <div className="space-y-2 relative print:space-y-1">
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-zinc-500 border-4 border-black print:hidden" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 font-bold print:text-black">2022 - 2023</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-mono text-zinc-400 print:text-zinc-600">Digital Engineering Labs</span>
                </div>
                <h3 className="text-lg font-bold text-white print:text-black print:text-sm">Creative Frontend & UI Architect</h3>
                <p className="text-xs text-zinc-300 leading-relaxed print:text-zinc-800">
                  Focused on GSAP ScrollTrigger timeline scrubbing, Framer Motion spring kinetics, modular design systems, and WCAG AA accessibility compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl print:bg-white print:border-zinc-300 print:p-0 print:shadow-none print:space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 print:border-zinc-300">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 print:text-black print:text-base">
                <GraduationCap className="text-emerald-400 print:hidden" size={18} /> Education & Computer Science Foundation
              </h2>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-emerald-400 font-bold print:text-black">UNDERGRADUATE DEGREE</span>
              <h3 className="text-lg font-bold text-white print:text-black print:text-sm">B.E. Computer Science & Engineering</h3>
              <p className="text-xs text-zinc-300 leading-relaxed print:text-zinc-800">
                Core academic foundation in Data Structures, Algorithms, Distributed Systems, Software Engineering, Database Management, and Web Technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Technical Skill Proficiency Matrix */}
        <div className="lg:col-span-5 space-y-6 print:space-y-4">
          <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/90 border border-emerald-500/30 backdrop-blur-2xl space-y-6 shadow-2xl print:bg-white print:border-zinc-300 print:p-0 print:shadow-none print:space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 print:text-black print:text-base">
              <Cpu className="text-emerald-400 print:hidden" size={18} /> Technical Mastery Matrix
            </h2>

            <div className="space-y-6 print:space-y-3">
              {SKILL_MATRIX.map((group, idx) => (
                <div key={idx} className="space-y-3 print:space-y-1">
                  <span className="text-[11px] font-mono text-emerald-400 font-bold tracking-wider print:text-black">{group.category}</span>
                  <div className="space-y-2.5 print:space-y-1">
                    {group.skills.map((skill, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono print:text-zinc-800">
                          <span className="text-zinc-200 print:text-black">{skill.name}</span>
                          <span className="text-emerald-400 font-bold print:text-zinc-600">{skill.level}</span>
                        </div>
                        <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5 print:bg-zinc-200 print:border-none">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full print:bg-zinc-700"
                            style={{ width: skill.level }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
