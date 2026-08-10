"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Instagram, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-zinc-950 border-t border-white/10 text-white pt-16 pb-12 px-6 lg:px-16 selection:bg-emerald-500 selection:text-black">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Sparkles size={14} />
              </div>
              <span className="font-bold text-sm font-mono tracking-tight">AEVION STUDIO</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              AI Software & Digital Engineering Studio founded by <strong className="text-white">Sai Vinoth</strong>. Building modern web applications, SaaS platforms, and AI solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Navigation</span>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About & Founder</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Featured Projects</Link></li>
              <li><Link href="/showcase" className="hover:text-white transition-colors">Interactive 3D Showcase</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Engineering Services</Link></li>
              <li><Link href="/process" className="hover:text-white transition-colors">Agile Process</Link></li>
            </ul>
          </div>

          {/* Special Pages */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Resources</span>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/tech-stack" className="hover:text-white transition-colors">Technology Stack</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Engineering Blog</Link></li>
              <li><Link href="/resume" className="hover:text-white transition-colors">Founder Resume (CV)</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Studio</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-3 font-mono text-xs">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">Connect</span>
            <p className="text-zinc-400 text-xs">hello@aevion.studio</p>
            <div className="flex gap-3 pt-1">
              <a
                href="https://github.com/SaiVinoth17"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-xl transition-colors"
                title="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-xl transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-xl transition-colors"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Aevion Studio. Designed & Engineered by Sai Vinoth.</p>

          <button
            onClick={scrollToTop}
            className="hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
          >
            Back to Top <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
