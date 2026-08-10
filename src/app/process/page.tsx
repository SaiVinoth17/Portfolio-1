"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Compass,
  FileCode2,
  Sparkles,
  Cpu,
  TestTube2,
  Rocket,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & System Specs",
    icon: Compass,
    description: "Deep technical consultation to map project scope, performance benchmarks, user personas, and architecture specs.",
    details: ["Requirements mapping", "Tech stack selection", "System architecture spec"],
  },
  {
    step: "02",
    title: "Planning & Database Schema",
    icon: FileCode2,
    description: "Designing database models, API endpoint structures, and zero-trust security rules before writing production code.",
    details: ["Data modeling", "API contract design", "Security & RBAC rules"],
  },
  {
    step: "03",
    title: "Interactive Motion Prototyping",
    icon: Sparkles,
    description: "Prototyping 60-120 FPS visual interactions, GSAP spring physics, and responsive layout scaling across all viewports.",
    details: ["GSAP & Framer Motion physics", "Responsive breakpoint layout", "Micro-interaction testing"],
  },
  {
    step: "04",
    title: "Production Engineering",
    icon: Cpu,
    description: "Building production software using strict TypeScript, Next.js 16 App Router, React 19, and modular component design.",
    details: ["Strict TypeScript compilation", "Modular component architecture", "State management"],
  },
  {
    step: "05",
    title: "Testing & Lighthouse Audit",
    icon: TestTube2,
    description: "Rigorously auditing Core Web Vitals, CLS near zero, WCAG AA accessibility, cross-browser compatibility, and edge APIs.",
    details: ["Lighthouse 95+ audit", "WCAG AA accessibility check", "Cross-browser testing"],
  },
  {
    step: "06",
    title: "Edge Deployment & Support",
    icon: Rocket,
    description: "Deploying to global CDN serverless edge nodes with continuous telemetry monitoring, analytics, and 30-day post-launch support.",
    details: ["Vercel / Edge CDN deployment", "Telemetry & monitoring", "30-day post-launch warranty"],
  },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <Compass size={14} /> METHODOLOGY
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)' }}
          className="font-bold text-white font-sans"
        >
          Our Agile Development Process <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            From Spec to Edge.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-3xl mx-auto"
        >
          We follow a 6-stage engineering workflow designed to deliver production-ready software efficiently without compromising on design or performance.
        </motion.p>
      </section>

      {/* Timeline Steps */}
      <section className="space-y-8 mb-24 max-w-4xl mx-auto">
        {PROCESS_STEPS.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.01 }}
              className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 flex flex-col sm:flex-row items-start gap-6 relative overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl font-mono font-bold text-emerald-400 opacity-60">{step.step}</span>
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                  <IconComp size={22} />
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <h3
                  style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
                  className="font-bold text-white"
                >{step.title}</h3>
                <p
                  style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--lh-body)' }}
                  className="text-zinc-400"
                >{step.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {step.details.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs bg-zinc-900 border border-white/10 text-zinc-300 px-3 py-1 rounded-full font-mono"
                    >
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      {item}
                    </span>
                  ))}
                </div>
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
        >Ready to Execute Your Vision?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm">
          Initiate Stage 01 Discovery today with founder Sai Vinoth and Aevion Studio.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all text-sm shadow-lg shadow-emerald-500/20"
        >
          Start Stage 01 Discovery <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
