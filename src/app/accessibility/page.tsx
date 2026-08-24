"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, ShieldCheck, Eye, Keyboard, Zap } from "lucide-react";
import Link from "next/link";

const ACCESSIBILITY_FEATURES = [
  {
    icon: Keyboard,
    title: "Complete Keyboard Navigation",
    desc: "Every interactive element, modal drawer, and navigation link is accessible via standard Tab, Shift+Tab, and Enter keys with clear visible focus rings.",
  },
  {
    icon: Zap,
    title: "Prefers-Reduced-Motion Support",
    desc: "When reduced motion is enabled at the OS level, all heavy transforms and continuous animations are suppressed into immediate, stable UI transitions.",
  },
  {
    icon: Eye,
    title: "High-Contrast & WCAG AA Colors",
    desc: "All text elements maintain high contrast ratios against dark backgrounds, ensuring readability across OLED, IPS, and mobile screens under daylight.",
  },
  {
    icon: ShieldCheck,
    title: "Graceful WebGL Fallbacks",
    desc: "If WebGL or Three.js fails to initialize or is disabled on a client device, the core HTML/CSS content, tables, and buttons remain 100% usable.",
  },
];

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <ShieldCheck size={14} /> ACCESSIBILITY & INCLUSION CHARTER
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight font-sans"
        >
          Accessibility as an <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Engineering Standard.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
        >
          We believe high-fidelity creative motion must never come at the expense of universal accessibility. Our engineering protocols ensure every visitor has an uncompromised experience.
        </motion.p>
      </section>

      {/* Grid of Accessibility Commitments */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-24">
        {ACCESSIBILITY_FEATURES.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={idx} className="p-8 rounded-3xl bg-zinc-950 border border-white/10 space-y-4 shadow-xl">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 w-fit">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">{feat.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Feedback Link */}
      <section className="text-center p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-4 max-w-2xl mx-auto shadow-2xl">
        <h2 className="text-2xl font-bold text-white">Accessibility Feedback</h2>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          If you encounter any accessibility barriers while browsing Aevion Studio platforms, please let us know immediately so we can remediate them.
        </p>
        <div className="pt-2">
          <a
            href="mailto:hello@aevion.studio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black font-bold font-mono text-xs rounded-xl hover:bg-emerald-400 transition-colors"
          >
            Report Accessibility Feedback
          </a>
        </div>
      </section>
    </main>
  );
}
