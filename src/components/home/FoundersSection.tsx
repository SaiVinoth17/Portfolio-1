"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Github, ArrowUpRight, Network, Sparkles, Activity, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { MOTION, isReducedMotion, isMobileDevice } from "@/lib/motion/motionTokens";
import { AevionMagnetic } from "@/components/motion/AevionMagnetic";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

interface FounderData {
  id: string;
  name: string;
  role: string;
  badge: string;
  title: string;
  tagline: string;
  focus: string[];
  philosophy: string;
  specialties: string[];
  github?: string;
  accentColor: string;
  gradient: string;
  nodeIndex: string;
  buildStatus?: string;
}

const FOUNDERS: FounderData[] = [
  {
    id: "sai-rio",
    name: "SAI RIO",
    role: "FOUNDER · LEAD ENGINEER",
    badge: "FOUNDER · LEAD ENGINEER",
    title: "Architecture • Full-Stack • AI Systems",
    tagline:
      "The builder behind Aevion — responsible for its architecture, interface, engineering, AI systems and product experience, built from the ground up.",
    focus: [
      "Architecture",
      "Full-Stack Engineering",
      "Frontend",
      "AI Systems",
      "Product Engineering",
      "Creative Technology",
      "Interactive Experiences",
    ],
    philosophy:
      "Software should be an extension of human will. We eliminate unnecessary friction until only raw performance, intelligence, and clarity remain.",
    specialties: ["System Architecture", "Full-Stack Engineering", "Autonomous AI", "Creative Motion"],
    github: "https://github.com/SaiVinoth17",
    accentColor: "#34d399",
    gradient: "from-emerald-400 to-teal-500",
    nodeIndex: "NODE_01 // ARCHITECT & LEAD ENGINEER",
    buildStatus: "CONCEIVED · ARCHITECTED · DESIGNED · ENGINEERED",
  },
  {
    id: "edison",
    name: "EDISON",
    role: "CO-FOUNDER",
    badge: "CO-FOUNDER",
    title: "Co-Founder",
    tagline:
      "Co-founder of Aevion Studio, partnering in studio foundation, digital vision, and strategic direction.",
    focus: [
      "Studio Foundation",
      "Digital Brand Direction",
      "Product Strategy",
      "Creative Vision",
      "Strategic Partnerships",
    ],
    philosophy:
      "Great studios are built on singular conviction. When vision and engineering align without friction, ambitious ideas turn into enduring reality.",
    specialties: ["Studio Operations", "Digital Strategy", "Brand Direction", "Co-Founder"],
    github: "https://github.com/edisonedi84431-art",
    accentColor: "#22d3ee",
    gradient: "from-cyan-400 to-blue-500",
    nodeIndex: "NODE_02 // CO-FOUNDER",
  },
];

export default function FoundersSection() {
  const [hoveredFounder, setHoveredFounder] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      const splits: SplitText[] = [];

      // 1. Eyebrow Terminal Decode
      gsap.to(".founders-eyebrow-text", {
        scrollTrigger: {
          trigger: ".founders-header",
          start: "top 88%",
          once: true,
        },
        scrambleText: {
          text: "LEADERSHIP & ARCHITECTURAL CORE",
          chars: "0101#@*!",
          speed: 0.45,
        },
        duration: 0.4,
        ease: "none",
      });

      // 2. Headline Split-Line Masked Assembly
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".founders-header",
          start: "top 88%",
          once: true,
        },
      });

      headlineTl
        .fromTo(
          ".founders-hl-line1",
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        )
        .fromTo(
          ".founders-hl-line2",
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "<0.08"
        )
        .fromTo(
          ".founders-header-desc",
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".founders-quote-line",
          { letterSpacing: "-0.03em", opacity: 0 },
          { letterSpacing: "0em", opacity: 1, duration: 0.45, ease: "power2.out" },
          "-=0.15"
        );

      // 3. Central Convergence Circuit
      gsap.fromTo(
        ".founders-circuit-line",
        { scaleX: 0, transformOrigin: "center" },
        {
          scaleX: 1,
          duration: 0.6,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".founders-circuit",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 4. Founder Cards Entrance - Staggered per Card upon viewport entry
      const cards = gsap.utils.toArray<HTMLElement>(".founder-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 22, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // 5. Node indices scramble on scroll
      gsap.utils.toArray<HTMLElement>(".founder-node-idx").forEach((el) => {
        const text = el.innerText;
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          scrambleText: {
            text: text,
            chars: "0101ARCH_CORE",
            speed: 0.5,
          },
          duration: 0.4,
          ease: "none",
        });
      });

      const isMobile = isMobileDevice();

      // 6. SAI RIO — Character Assembly / Precision Lock (Scoped to Sai's card)
      const saiSplit = new SplitText(".founder-name-sai", { type: "chars" });
      splits.push(saiSplit);
      gsap.fromTo(
        saiSplit.chars,
        {
          opacity: 0,
          y: 16,
          rotateY: isMobile ? 0 : -60,
          ...(isMobile ? {} : { filter: "blur(4px)" }),
        },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          ...(isMobile ? {} : { filter: "blur(0px)" }),
          stagger: isMobile ? 0.02 : 0.035,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".founder-card-sai-rio",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 7. SAI RIO Role: Tracking Compression
      gsap.fromTo(
        ".founder-role-sai",
        { letterSpacing: "0.26em", opacity: 0, scale: 0.95 },
        {
          letterSpacing: "0.08em",
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".founder-card-sai-rio",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 8. EDISON — Restrained Text Motion (Scoped to Edison's card)
      gsap.fromTo(
        ".founder-name-edison",
        { letterSpacing: "-0.03em", y: 12, opacity: 0 },
        {
          letterSpacing: "0.02em",
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          delay: 0.05,
          scrollTrigger: {
            trigger: ".founder-card-edison",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 9. EDISON Role: Independent Tracking / Mask
      gsap.fromTo(
        ".founder-role-edison",
        { clipPath: "inset(0 100% 0 0)", letterSpacing: "0.2em", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          letterSpacing: "0.08em",
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: ".founder-card-edison",
            start: "top 88%",
            once: true,
          },
        }
      );

      // 10. Descriptions: Phrase-by-phrase masked construction
      const descSplitSai = new SplitText(".founder-desc-sai", { type: "lines,words" });
      splits.push(descSplitSai);
      gsap.fromTo(
        descSplitSai.words,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".founder-card-sai-rio",
            start: "top 86%",
            once: true,
          },
        }
      );

      const descSplitEdison = new SplitText(".founder-desc-edison", { type: "lines,words" });
      splits.push(descSplitEdison);
      gsap.fromTo(
        descSplitEdison.words,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.02,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.05,
          scrollTrigger: {
            trigger: ".founder-card-edison",
            start: "top 86%",
            once: true,
          },
        }
      );

      // 11. Focus tags stagger
      gsap.fromTo(
        ".founder-focus-tag-sai",
        { x: -14, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.03,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".founder-card-sai-rio",
            start: "top 84%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".founder-focus-tag-edison",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.03,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.05,
          scrollTrigger: {
            trigger: ".founder-card-edison",
            start: "top 84%",
            once: true,
          },
        }
      );

      // 12. Philosophy quotes word reveal (Scoped directly to each quote element)
      gsap.utils.toArray<HTMLElement>(".founder-philosophy-quote").forEach((quote) => {
        gsap.fromTo(
          quote,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quote,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // 13. STRONG BUILD CREDIT BANNER — Progressive Word Construction
      const buildHlSplit = new SplitText(".build-credit-hl", { type: "words" });
      splits.push(buildHlSplit);
      gsap.fromTo(
        buildHlSplit.words,
        { opacity: 0, y: 18, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.04,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".founders-collab-banner",
            start: "top 90%",
            once: true,
          },
        }
      );

      gsap.to(".build-credit-eyebrow", {
        scrollTrigger: {
          trigger: ".founders-collab-banner",
          start: "top 92%",
          once: true,
        },
        scrambleText: {
          text: "ARCHITECTURAL RECORD // AEVION CORE",
          chars: "0101#@*!",
          speed: 0.4,
        },
        duration: 0.8,
        ease: "none",
      });

      // Recalculate ScrollTrigger positions after all SplitText DOM modifications
      ScrollTrigger.refresh();

      return () => {
        splits.forEach((s) => {
          try {
            s.revert();
          } catch (_) {}
        });
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="founders"
      className="relative scroll-mt-20 bg-[#06060a] text-white py-28 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        {/* Section Header */}
        <div className="founders-header flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-emerald-400 select-none">
              <Network size={13} />
              <span className="founders-eyebrow-text">LEADERSHIP &amp; ARCHITECTURAL CORE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter leading-none text-white select-none">
              <span className="founders-hl-line1 block">THE PEOPLE</span>
              <span className="founders-hl-line2 block bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">
                BEHIND AEVION.
              </span>
            </h2>
          </div>

          <div className="max-w-md space-y-3">
            <p className="founders-header-desc text-sm font-mono text-zinc-400 leading-relaxed">
              Two builders united by a shared vision. Aevion Studio is engineered from the ground up, pairing deep technical architecture with creative digital craft.
            </p>
            <div className="founders-quote-line text-xs font-mono text-emerald-400 flex items-center gap-2 select-none">
              <Activity size={12} className="animate-pulse flex-shrink-0" />
              <span>&ldquo;Two builders. One vision. Technology without limits.&rdquo;</span>
            </div>
          </div>
        </div>

        {/* Central Convergence Circuit visualization */}
        <div className="founders-circuit relative py-4 hidden md:block">
          <div className="founders-circuit-line h-px w-full bg-gradient-to-r from-emerald-500/30 via-white/40 to-cyan-500/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-[#06060a] border border-white/20 text-[10px] font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>AEVION DUAL-NEXUS CORE</span>
          </div>
        </div>

        {/* Founders Cards Grid */}
        <div className="founders-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FOUNDERS.map((founder) => {
            const isHovered = hoveredFounder === founder.id;
            const isSai = founder.id === "sai-rio";

            return (
              <div
                key={founder.id}
                onMouseEnter={() => setHoveredFounder(founder.id)}
                onMouseLeave={() => setHoveredFounder(null)}
                className={`founder-card founder-card-${founder.id} relative rounded-3xl border transition-all duration-500 p-8 sm:p-10 flex flex-col justify-between overflow-hidden group`}
                style={{
                  borderColor: isHovered ? founder.accentColor : "rgba(255, 255, 255, 0.1)",
                  background: isHovered
                    ? `radial-gradient(ellipse at top left, ${founder.accentColor}10 0%, #090910 80%)`
                    : "#08080e",
                  boxShadow: isHovered ? `0 20px 60px -15px ${founder.accentColor}25` : "none",
                }}
              >
                {/* Accent top-corner line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${founder.accentColor}, transparent)`,
                    opacity: isHovered ? 1 : 0.4,
                  }}
                />

                <div className="space-y-6">
                  {/* Card Header Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="founder-node-idx text-[11px] font-mono tracking-widest text-zinc-500 font-bold mb-1 select-none">
                        {founder.nodeIndex}
                      </div>
                      <h3
                        className={`${
                          isSai ? "founder-name-sai" : "founder-name-edison"
                        } text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3 select-none`}
                      >
                        {founder.name}
                      </h3>
                      <div
                        className={`${
                          isSai ? "founder-role-sai" : "founder-role-edison"
                        } inline-block mt-1 text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-md select-none`}
                        style={{
                          background: `${founder.accentColor}18`,
                          color: founder.accentColor,
                          border: `1px solid ${founder.accentColor}30`,
                        }}
                      >
                        {founder.badge}
                      </div>
                    </div>

                    {founder.github && (
                      <AevionMagnetic strength={0.3}>
                        <a
                          href={founder.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
                          title={`${founder.name} GitHub Profile`}
                        >
                          <Github size={16} />
                          <span className="hidden sm:inline">GitHub</span>
                          <ArrowUpRight size={13} className="text-zinc-500" />
                        </a>
                      </AevionMagnetic>
                    )}
                  </div>

                  {/* Core Description / Build Positioning */}
                  <div className="pt-2 border-t border-white/5 space-y-1.5">
                    <p
                      className={`${
                        isSai ? "founder-desc-sai" : "founder-desc-edison"
                      } text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed`}
                    >
                      {founder.tagline}
                    </p>
                    {founder.buildStatus && (
                      <div className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider pt-1 flex items-center gap-1.5">
                        <ShieldCheck size={12} />
                        <span>{founder.buildStatus}</span>
                      </div>
                    )}
                  </div>

                  {/* Short Philosophy Quote */}
                  <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5 select-none">
                      <Sparkles size={11} style={{ color: founder.accentColor }} />
                      <span>Philosophy</span>
                    </div>
                    <blockquote className="founder-philosophy-quote text-sm text-zinc-300 italic leading-relaxed">
                      &ldquo;{founder.philosophy}&rdquo;
                    </blockquote>
                  </div>

                  {/* Focus Areas Pills */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 select-none">
                      {isSai ? "Craft & Core Disciplines" : "Focus & Technical Craft"}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {founder.focus.map((item) => (
                        <span
                          key={item}
                          className={`${
                            isSai ? "founder-focus-tag-sai" : "founder-focus-tag-edison"
                          } text-xs font-mono px-3 py-1 rounded-xl bg-white/[0.03] border border-white/10 text-zinc-300 select-none`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Specialties Footer */}
                <div className="pt-6 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {founder.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md text-zinc-400 bg-white/[0.02]"
                      >
                        • {spec}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono font-semibold" style={{ color: founder.accentColor }}>
                    {isSai ? "LEAD ARCHITECT →" : "CO-FOUNDER →"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* STRONG BUILD CREDIT BANNER */}
        <div className="founders-collab-banner p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="build-credit-eyebrow text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              ARCHITECTURAL RECORD // AEVION CORE
            </div>
            <div className="build-credit-hl text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
              EVERY INTERFACE. EVERY INTERACTION. EVERY SYSTEM.
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                BUILT FROM SCRATCH BY SAI RIO.
              </span>
            </div>
            <div className="text-xs sm:text-sm text-zinc-400 font-mono pt-1">
              Conceived, architected, designed, and engineered from the ground up — zero outsourced layers, zero generic templates.
            </div>
          </div>

          <AevionMagnetic strength={0.25}>
            <Link
              href="/contact"
              className="shrink-0 px-7 py-4 rounded-2xl bg-white text-black font-bold font-mono text-xs uppercase tracking-[0.1em] hover:bg-zinc-200 transition-all inline-block shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              Initiate Project Brief
            </Link>
          </AevionMagnetic>
        </div>
      </div>
    </section>
  );
}
