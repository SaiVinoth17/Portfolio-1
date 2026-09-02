"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight, Activity } from "lucide-react";

export default function GlobalFooter() {
  return (
    <footer className="border-t border-white/10 bg-black text-zinc-400 font-mono text-xs py-16 px-4 sm:px-8 relative z-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold text-base">▲ AEVION STUDIO</span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Activity size={10} className="animate-pulse" /> PRODUCTION READY
              </span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed max-w-md font-sans">
              Autonomous AI software, high-throughput systems, and creative web engineering. Founded by Sai Rio and Edison.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-white font-bold block mb-2">PAGES</span>
            <div className="flex flex-col space-y-1.5 text-xs">
              <Link href="/about" className="hover:text-emerald-400 transition-colors">About & Timeline</Link>
              <Link href="/projects" className="hover:text-emerald-400 transition-colors">Case Studies</Link>
              <Link href="/tech-stack" className="hover:text-emerald-400 transition-colors">Tech Stack</Link>
              <Link href="/process" className="hover:text-emerald-400 transition-colors">Process Blueprint</Link>
              <Link href="/showcase" className="hover:text-emerald-400 transition-colors">3D Showcase</Link>
            </div>
          </div>

          {/* External & Legal */}
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-wider text-white font-bold block mb-2">CONNECT</span>
            <div className="flex flex-col space-y-1.5 text-xs">
              <a
                href="https://github.com/aevionstudio"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Github size={12} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Linkedin size={12} /> LinkedIn
              </a>
              <a
                href="mailto:hello@aevionstudio.in"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Mail size={12} /> hello@aevionstudio.in
              </a>
              <Link href="/resume" className="hover:text-emerald-400 transition-colors">
                Resume Dossier
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Aevion Studio • Sai Rio &amp; Edison. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>TypeScript • Next.js 16 • Three.js</span>
            <span className="text-zinc-700">|</span>
            <span className="text-emerald-400">Strict Quality Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
