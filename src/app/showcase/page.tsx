"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Demo from "@/components/demo";

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <Sparkles size={14} /> INTERACTIVE 3D SHOWCASE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight font-sans"
        >
          The Future is <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Built on AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-mono text-xs uppercase tracking-widest"
        >
          Scroll inside the container below to morph 3D cards in real-time.
        </motion.p>
      </section>

      {/* 3D Radial Scroll Morph Section */}
      <section className="mb-24">
        <div className="p-2 bg-zinc-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <Demo />
        </div>
      </section>

      {/* CTA Box */}
      <section className="text-center p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-6">
        <h2 className="text-3xl font-bold text-white">Interested in Creative Web Engineering?</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm">
          Collaborate with Aevion Studio to build award-winning 3D web experiences and AI applications.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl hover:bg-emerald-400 transition-all text-sm shadow-lg shadow-emerald-500/20"
        >
          Start a Project <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  );
}
