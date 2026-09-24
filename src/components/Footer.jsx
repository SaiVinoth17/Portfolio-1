"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Github, Activity, Sparkles, Cpu } from "lucide-react";
import { MOTION, isReducedMotion, isMobileDevice } from "@/lib/motion/motionTokens";
import { AevionMagnetic } from "@/components/motion/AevionMagnetic";
import { getWhatsAppUrl } from "@/lib/config/studio";
import AevionLogo from "@/components/ui/AevionLogo";

gsap.registerPlugin(SplitText, ScrambleTextPlugin, ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      if (!footerRef.current || isReducedMotion()) return;

      const isMobile = isMobileDevice();
      const splits = [];

      // 1. Eyebrow: Tracking lock from expanded space
      gsap.fromTo(
        ".footer-eyebrow-text",
        {
          opacity: 0,
          letterSpacing: "0.22em",
          ...(isMobile ? {} : { filter: "blur(4px)" }),
        },
        {
          opacity: 1,
          letterSpacing: "0.1em",
          ...(isMobile ? {} : { filter: "blur(0px)" }),
          duration: MOTION.duration.standard,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".footer-banner",
            start: "top 92%",
            once: true,
          },
        }
      );

      // 2. Headline: Split-line scale expansion and directional slide
      const headlineSplit = new SplitText(".footer-headline", {
        type: "lines,words",
        linesClass: "overflow-hidden py-1",
      });
      splits.push(headlineSplit);

      if (headlineSplit.lines.length >= 2) {
        gsap.fromTo(
          headlineSplit.lines[0],
          {
            x: -35,
            opacity: 0,
            scale: 0.94,
            ...(isMobile ? {} : { filter: "blur(3px)" }),
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            ...(isMobile ? {} : { filter: "blur(0px)" }),
            duration: MOTION.duration.deliberate,
            ease: MOTION.ease.cinematic,
            scrollTrigger: {
              trigger: ".footer-banner",
              start: "top 90%",
              once: true,
            },
          }
        );
        gsap.fromTo(
          headlineSplit.lines[1],
          {
            x: 35,
            opacity: 0,
            letterSpacing: "-0.04em",
            ...(isMobile ? {} : { filter: "blur(3px)" }),
          },
          {
            x: 0,
            opacity: 1,
            letterSpacing: "0em",
            ...(isMobile ? {} : { filter: "blur(0px)" }),
            duration: MOTION.duration.deliberate,
            ease: MOTION.ease.editorial,
            delay: 0.1,
            scrollTrigger: {
              trigger: ".footer-banner",
              start: "top 90%",
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          headlineSplit.words,
          { opacity: 0, y: 24, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.04,
            duration: MOTION.duration.standard,
            ease: MOTION.ease.cinematic,
            scrollTrigger: {
              trigger: ".footer-banner",
              start: "top 90%",
              once: true,
            },
          }
        );
      }

      // 3. Description: Phrase choreography with clip-path
      const descSplit = new SplitText(".footer-desc", {
        type: "lines",
        linesClass: "overflow-hidden",
      });
      splits.push(descSplit);
      splits.forEach((s) => s.elements.forEach((el) => el.removeAttribute("aria-label")));

      gsap.fromTo(
        descSplit.lines,
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.08,
          duration: MOTION.duration.standard,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".footer-banner",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 4. CTA Button Entrance: Snap scale
      gsap.fromTo(
        ".footer-cta-btn",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: MOTION.duration.standard,
          ease: MOTION.ease.elasticOut,
          delay: 0.15,
          scrollTrigger: {
            trigger: ".footer-banner",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 5. Co-Founders Matrix: Scramble decode header
      const matrixHeader = footerRef.current.querySelector(".footer-matrix-header");
      if (matrixHeader) {
        ScrollTrigger.create({
          trigger: ".footer-grid",
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(matrixHeader, {
              duration: 0.8,
              scrambleText: {
                text: "CO-FOUNDERS MATRIX",
                chars: "01/<>[]_!#&*",
                speed: 0.7,
              },
              ease: "none",
            });
          },
        });
      }

      // 6. Column Headers: Micro-scramble decode
      const colHeaders = footerRef.current.querySelectorAll(".footer-col-header");
      colHeaders.forEach((header) => {
        const originalText = header.innerText.trim();
        ScrollTrigger.create({
          trigger: header,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.to(header, {
              duration: 0.7,
              scrambleText: {
                text: originalText,
                chars: "ABCDEF0123456789!<>",
                speed: 0.6,
              },
              ease: "none",
            });
          },
        });
      });

      // 7. Navigation Links: Kinetic line slide
      gsap.fromTo(
        ".footer-link-item",
        { opacity: 0, x: -8 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.025,
          duration: 0.45,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".footer-grid",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 8. Bottom Metadata: Clean readable settle
      gsap.fromTo(
        ".footer-meta-bar",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".footer-meta-bar",
            start: "top 96%",
            once: true,
          },
        }
      );

      // Force refresh ScrollTrigger calculations after all splits have adjusted the DOM
      ScrollTrigger.refresh();

      return () => {
        splits.forEach((s) => {
          try {
            s.revert();
          } catch (_) {}
        });
      };
    },
    { scope: footerRef }
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative scroll-mt-20 bg-[#040407] border-t border-white/10 text-white pt-24 aevion-footer-spacing px-6 lg:px-16 overflow-hidden selection:bg-emerald-500 selection:text-black"
    >
      {/* Background ambient gradient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Massive Statement Banner */}
        <div className="footer-banner border-b border-white/10 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="footer-eyebrow-text inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono uppercase tracking-widest">
                <Sparkles size={12} /> The Future Is Engineered
              </div>
              <h2 className="footer-headline text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-none text-white">
                LET&apos;S BUILD SOMETHING
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  WORTH REMEMBERING.
                </span>
              </h2>
              <p className="footer-desc text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed pt-2">
                Turn your most ambitious product visions into production-grade systems. We partner with
                founders and visionary teams worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <AevionMagnetic strength={0.25}>
                <Link
                  href="/contact"
                  className="footer-cta-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-400 text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-300 transition-all shadow-[0_0_30px_rgba(52,211,153,0.3)]"
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
            <div className="flex items-center gap-3">
              <Link
                href="/"
                aria-label="Aevion Studio Home"
                className="inline-block hover:opacity-90 transition-opacity"
              >
                <AevionLogo
                  variant="full"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </Link>
              <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 self-center">
                <Activity size={10} className="animate-pulse" /> OPERATIONAL
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
              <div className="footer-matrix-header text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Cpu size={12} /> Co-Founders Matrix
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Founded by <strong className="text-white font-semibold">Sai Rio</strong> (Founder &amp; Lead Engineer) and{" "}
                <strong className="text-white font-semibold">Edison</strong> (Co-Founder). Conceived, architected, and engineered from scratch by Sai Rio.
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
                className="footer-link-item flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
                title="Sai Vinoth GitHub Profile"
              >
                <Github size={13} /> Sai Vinoth GitHub
              </a>
              <a
                href="https://github.com/edisonedi84431-art"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-item flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
                title="Edison GitHub Profile"
              >
                <Github size={13} /> Edison GitHub
              </a>
              <a
                href="https://github.com/aevionstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link-item flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs font-mono transition-colors"
                title="Aevion Studio GitHub"
              >
                <Github size={13} /> Studio GitHub
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="footer-col space-y-4">
            <div className="footer-col-header text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold">
              Studio &amp; Work
            </div>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-mono">
              <li className="footer-link-item">
                <Link href="/projects" className="hover:text-emerald-400 transition-colors">
                  Selected Work
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  Founders Dossier
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Core Services
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/capabilities" className="hover:text-emerald-400 transition-colors">
                  Capabilities Matrix
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/process" className="hover:text-emerald-400 transition-colors">
                  Process &amp; SLA
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col space-y-4">
            <div className="footer-col-header text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold">
              Technology &amp; Lab
            </div>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-mono">
              <li className="footer-link-item">
                <Link href="/ai" className="hover:text-emerald-400 transition-colors">
                  AI Systems
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/technology" className="hover:text-emerald-400 transition-colors">
                  Tech Architecture
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/lab" className="hover:text-emerald-400 transition-colors">
                  Aevion Lab R&amp;D
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/lab/ripple-distortion" className="hover:text-emerald-400 transition-colors">
                  Fluid Shaders
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/open-source" className="hover:text-emerald-400 transition-colors">
                  Open Source
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-col space-y-4">
            <div className="footer-col-header text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold">
              Connect &amp; Legal
            </div>
            <ul className="space-y-2.5 text-sm text-zinc-400 font-mono">
              <li className="footer-link-item">
                <a
                  href={getWhatsAppUrl("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors text-emerald-400/90 font-bold flex items-center gap-1"
                >
                  WhatsApp Uplink ↗
                </a>
              </li>
              <li className="footer-link-item">
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Submit Brief
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="footer-link-item">
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li className="footer-link-item">
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
        <div className="footer-meta-bar pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © 2026 AEVION STUDIO — CONCEIVED &amp; ENGINEERED BY SAI RIO. ALL RIGHTS RESERVED.
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
