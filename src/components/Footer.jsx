"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Sparkles, Activity } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/10 text-white pt-16 pb-12 px-6 lg:px-16 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono text-xs">
                ▲
              </div>
              <span className="font-bold text-sm font-mono tracking-tight">AEVION STUDIO</span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Activity size={10} className="animate-pulse" /> OPERATIONAL
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-sm">
              AI software & creative technology studio founded by <strong className="text-white">Sai Vinoth</strong>. Engineering autonomous AI systems, SaaS platforms, and GPU-accelerated web graphics for high-growth ventures.
            </p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://github.com/aevionstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white rounded-xl transition-colors"
                title="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white rounded-xl transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          {/* Studio & Company */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Studio</span>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/studio" className="hover:text-white transition-colors">Overview</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Founder & Era</Link></li>
              <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/status" className="hover:text-white transition-colors">System Status</Link></li>
              <li><Link href="/resume" className="hover:text-white transition-colors">Resume Dossier</Link></li>
            </ul>
          </div>

          {/* Work & Products */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">Work & Systems</span>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/projects" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">First-Party Products</Link></li>
              <li><Link href="/open-source" className="hover:text-white transition-colors">Open Source</Link></li>
              <li><Link href="/showcase" className="hover:text-white transition-colors">3D & WebGL Lab</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Insights & Research</Link></li>
            </ul>
          </div>

          {/* Capabilities & Legal */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-zinc-300 font-bold uppercase tracking-wider text-[11px]">Governance</span>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Services Engine</Link></li>
              <li><Link href="/process" className="hover:text-white transition-colors">Process Blueprint</Link></li>
              <li><Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Aevion Studio. Engineered by Sai Vinoth.</p>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-emerald-400 hover:underline">
              Start a Project
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
            >
              Back to Top <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
