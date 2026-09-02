"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github, Activity, Sparkles, Cpu } from "lucide-react";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";
import { AevionMagnetic } from "@/components/motion/AevionMagnetic";
import { getWhatsAppUrl } from "@/lib/config/studio";

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      if (!footerRef.current || isReducedMotion()) return;

      gsap.fromTo(
        ".footer-banner-elem",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: MOTION.duration.standard,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".footer-banner",
            start: "top 88%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".footer-col",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: MOTION.duration.standard,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".footer-grid",
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#040407] border-t border-white/10 text-white pt-24 pb-12 px-6 lg:px-16 overflow-hidden selection:bg-emerald-500 selection:text-black"
    >
      {/* Background ambient gradient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Massive Statement Banner */}
        <div className="footer-banner border-b border-white/10 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="footer-banner-elem inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono uppercase tracking-widest">
                <Sparkles size={12} /> The Future Is Engineered
              </div>
              <h2 className="footer-banner-elem text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none text-white">
                LET&apos;S BUILD SOMETHING
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  WORTH REMEMBERING.
                </span>
              </h2>
              <p className="footer-banner-elem text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed pt-2">
                Turn your most ambitious product visions into production-grade systems. We partner with
                founders and visionary teams worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <AevionMagnetic strength={0.25}>
                <Link
                  href="/contact"
                  className="footer-banner-elem inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                >
                  Initiate Project Brief <ArrowUpRight size={16} />
                </Link>
              </AevionMagnetic>
            </div>
          </div>
        </div>

        {/* Top Grid Info */}
        <div className="footer-grid grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info & Founders */}
          <div className="footer-col space-y-5 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono text-sm shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                ▲
              </div>
              <span className="font-extrabold text-base font-mono tracking-tight text-white">
                AEVION STUDIO
              </span>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <Activity size={10} className="animate-pulse" /> OPERATIONAL
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Cpu size={12} /> Co-Founders Matrix
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Founded by <strong className="text-white font-semibold">Sai Rio</strong> (Product •
                Engineering • AI • Systems • Vision) and{" "}
                <strong className="text-white font-semibold">Edison</strong> (Development • Technology
                • Engineering • Building).
              </p>
              <div className="text-[11px] font-mono text-zinc-400 italic pt-1">
                &ldquo;Two builders. One vision. Technology without limits.&rdquo;
              </div>
            </div>

            {/* Quick Links & GitHubs */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="https://github.com/SaiVinoth17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
                title="Sai Rio GitHub Profile"
              >
                <Github size={13} /> Sai Rio GitHub
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
              <a
                href="https://github.com/aevionstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
                title="Aevion Studio GitHub"
              >
                <Github size={13} /> Studio GitHub
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-col space-y-4">
            <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-bold">
              Studio &amp; Work
            </div>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-mono">
              <li>
                <Link href="/projects" className="hover:text-emerald-400 transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Founders Dossier
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Core Services
                </Link>
              </li>
              <li>
                <Link href="/capabilities" className="hover:text-emerald-400 transition-colors">
                  Capabilities Matrix
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-emerald-400 transition-colors">
                  Process &amp; SLA
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col space-y-4">
            <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-bold">
              Technology &amp; Lab
            </div>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-mono">
              <li>
                <Link href="/ai" className="hover:text-emerald-400 transition-colors">
                  AI Systems
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-emerald-400 transition-colors">
                  Tech Architecture
                </Link>
              </li>
              <li>
                <Link href="/lab" className="hover:text-emerald-400 transition-colors">
                  Aevion Lab R&amp;D
                </Link>
              </li>
              <li>
                <Link href="/lab/ripple-distortion" className="hover:text-emerald-400 transition-colors">
                  Fluid Shaders
                </Link>
              </li>
              <li>
                <Link href="/open-source" className="hover:text-emerald-400 transition-colors">
                  Open Source
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col space-y-4">
            <div className="text-xs font-mono tracking-widest text-zinc-500 uppercase font-bold">
              Connect &amp; Legal
            </div>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-mono">
              <li>
                <a
                  href={getWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors text-emerald-400/90 font-bold flex items-center gap-1"
                >
                  WhatsApp Uplink ↗
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Submit Brief
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  ↑ Return to Top
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 AEVION STUDIO — SAI RIO &amp; EDISON. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>MUTUAL NDA READY</span>
            <span>•</span>
            <span className="text-emerald-500">GPU-ACCELERATED KINETIC MOTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
