"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-4 sm:px-8 max-w-4xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <section className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <ShieldCheck size={14} /> PRIVACY & DATA TRANSPARENCY
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-sans">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-zinc-500">LAST UPDATED: MARCH 2025 • AEVION STUDIO</p>
      </section>

      {/* Policy Content */}
      <article className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 space-y-8 text-xs sm:text-sm text-zinc-300 leading-relaxed shadow-2xl">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-sans">1. Zero Tracking Philosophy</h2>
          <p>
            Aevion Studio is built on a zero-invasive-tracking principle. We do not sell personal data, use cross-site behavioral tracking cookies, or monetize visitor information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-sans">2. Information We Collect</h2>
          <p>
            When you explicitly transmit an inquiry via our project configurator or contact forms, we receive your name, email address, and project specifications solely to evaluate and respond to your inquiry.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-sans">3. AI Conversation Processing</h2>
          <p>
            Inquiries transmitted to our streaming AI route (/api/chat) are processed via secure serverless endpoints solely to generate responses. We do not store or use your messages for public model training.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white font-sans">4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding data handling or wish to delete any contact submission records, email us directly at <a href="mailto:hello@aevion.studio" className="text-emerald-400 font-mono underline">hello@aevion.studio</a>.
          </p>
        </section>
      </article>
    </main>
  );
}
