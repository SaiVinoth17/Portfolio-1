"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  Github,
  Linkedin,
  Instagram,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "AI Application",
    budget: "$5k - $15k",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-emerald-500 selection:text-black">
      {/* Hero Header */}
      <section className="space-y-6 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <Sparkles size={14} /> GET IN TOUCH
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: 'var(--text-h1)', lineHeight: 'var(--lh-heading)', letterSpacing: 'var(--ls-heading)' }}
          className="font-bold text-white font-sans"
        >
          Let&apos;s Build Something <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Exceptional Together.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'var(--text-body)', lineHeight: 'var(--lh-body)' }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Have an AI application, SaaS platform, or modern web engineering project in mind? Reach out directly to founder Sai Vinoth.
        </motion.p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
        {/* Contact Info Sidebar */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6">
            <h3
            style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
            className="font-bold text-white"
          >Direct Contact</h3>

            <div className="space-y-4">
              <a
                href="mailto:hello@aevion.studio"
                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 transition-colors group"
              >
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 font-mono">Email Us</span>
                  <p className="text-sm font-bold text-white group-hover:text-emerald-300">saivinothdeveloper@gmail.com </p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 font-mono">Location</span>
                  <p className="text-sm font-bold text-white">Global Edge Architecture • Distributed Studio</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
                <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="text-xs text-zinc-400 font-mono">Current Status</span>
                  <p className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Available for Q3/Q4 Projects
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-8 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-4">
            <h3 className="text-lg font-bold text-white">Connect & Follow</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/SaiVinoth17"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-xl transition-colors"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/SaiVinoth17"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-xl transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-xl transition-colors"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/90 border border-white/10 space-y-6">
          <h3
            style={{ fontSize: 'var(--text-h3)', lineHeight: 'var(--lh-subheading)' }}
            className="font-bold text-white"
          >Send a Message</h3>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Message Received!</h4>
              <p className="text-xs text-zinc-300">
                Thank you for reaching out. Sai Vinoth or an Aevion Studio engineer will respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-zinc-400">YOUR NAME *</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Sai Vinoth"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="hello@example.com"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-zinc-400">PROJECT TYPE</label>
                  <select
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option>AI Application</option>
                    <option>SaaS Platform</option>
                    <option>Modern Web App</option>
                    <option>Motion / 3D Web</option>
                    <option>Consulting</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-400">ESTIMATED BUDGET</label>
                  <select
                    value={formState.budget}
                    onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option>$5k - $15k</option>
                    <option>$15k - $30k</option>
                    <option>$30k+</option>
                    <option>Retainer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-zinc-400">PROJECT DETAILS *</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell us about your project goals, technical scope, and target timeline..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-sans font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Send Inquiry <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
