"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-8 max-w-4xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <section className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <FileText size={14} /> CLIENT & PLATFORM TERMS
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-sans">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-zinc-500">LAST UPDATED: MARCH 2025 • AEVION STUDIO</p>
      </section>

      {/* Terms Content */}
      <article className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed shadow-2xl">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-sans">1. Engagement Scope</h2>
          <p>
            All engineering and design deliverables produced by Aevion Studio are governed by clear project specifications, milestone delivery schedules, and technical architecture contracts established before kickoff.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-sans">2. Intellectual Property & Ownership</h2>
          <p>
            Upon final project signoff and milestone payment settlement, all custom application source code, designs, and proprietary assets belong 100% to the client.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-sans">3. Post-Launch Support & Bug Remediation</h2>
          <p>
            Every digital engineering deliverable includes structured post-launch support covering bug remediation, browser compatibility adjustments, and core vitals tuning.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-sans">4. Inquiries</h2>
          <p>
            For contractual inquiries, reach us at <a href="mailto:hello@aevion.studio" className="text-emerald-400 font-mono underline">hello@aevion.studio</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
