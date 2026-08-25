"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Activity, Terminal, Sparkles, Shield, Cpu } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#040407] border-t border-white/10 text-white pt-24 pb-12 px-6 lg:px-16 overflow-hidden selection:bg-emerald-500 selection:text-black">
      {/* Background ambient gradient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Massive Statement Banner */}
        <div className="border-b border-white/10 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono uppercase tracking-widest">
                <Sparkles size={12} /> The Future Is Engineered
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none text-white">
                LET&apos;S BUILD SOMETHING<br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  WORTH REMEMBERING.
                </span>
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed pt-2">
                Turn your most ambitious product visions into production-grade systems. We partner with founders and visionary teams worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-300 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)]"
              >
                Initiate Project Brief <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Top Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info & Founders */}
          <div className="space-y-5 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                ▲
              </div>
              <span className="font-extrabold text-base font-mono tracking-tight text-white">AEVION STUDIO</span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <Activity size={10} className="animate-pulse" /> OPERATIONAL
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Cpu size={12} /> Co-Founders Matrix
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Founded by <strong className="text-white font-semibold">Sai Rio</strong> (Product • Engineering • AI • Systems • Vision) and <strong className="text-white font-semibold">Edison</strong> (Development • Technology • Engineering • Building).
              </p>
              <div className="text-[11px] font-mono text-zinc-400 italic pt-1">
                &ldquo;Two builders. One vision. Technology without limits.&rdquo;
              </div>
            </div>

            {/* Quick Links & GitHubs */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="https://github.com/aevionstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
                title="Aevion Studio GitHub"
              >
                <Github size={13} /> Aevion GitHub
              </a>
              <a
                href="https://github.com/edisonedi84431-art"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
                title="Edison GitHub Profile"
              >
                <Github size={13} /> Edison GitHub
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Explore</span>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home Engine</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Founders & Manifesto</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/studio" className="hover:text-white transition-colors">Studio Philosophy</Link></li>
              <li><Link href="/showcase" className="hover:text-white transition-colors">3D & WebGL Lab</Link></li>
            </ul>
          </div>

          {/* Work & Systems */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">Systems</span>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link href="/services" className="hover:text-white transition-colors">Engineering Services</Link></li>
              <li><Link href="/tech-stack" className="hover:text-white transition-colors">Technology Stack</Link></li>
              <li><Link href="/process" className="hover:text-white transition-colors">Process Blueprint</Link></li>
              <li><Link href="/open-source" className="hover:text-white transition-colors">Open Source</Link></li>
              <li><Link href="/status" className="hover:text-white transition-colors">Telemetry Status</Link></li>
            </ul>
          </div>

          {/* Connect & Governance */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-zinc-300 font-bold uppercase tracking-wider text-[11px]">Connect</span>
            <ul className="space-y-2.5 text-zinc-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Uplink</Link></li>
              <li><a href="mailto:hello@aevion.studio" className="hover:text-white transition-colors">hello@aevion.studio</a></li>
              <li><Link href="/resume" className="hover:text-white transition-colors">Dossier</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Aevion Studio. Co-founded by Sai Rio &amp; Edison.</p>

          <div className="flex items-center gap-4">
            <span className="text-zinc-600 font-mono">EST. 2024</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors text-zinc-400 hover:text-white"
            >
              Back to Top <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
