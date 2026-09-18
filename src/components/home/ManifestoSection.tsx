"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { Sparkles, Terminal, Cpu, Zap, ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";
import { MOTION, isReducedMotion } from "@/lib/motion/motionTokens";

const PRINCIPLES = [
  {
    num: "01",
    title: "Autonomous Intelligence",
    summary:
      "We build beyond simple API wrappers. Our focus is autonomous reasoning, contextual vector retrieval, streaming pipelines, and neural decision engines that compound value.",
    icon: Cpu,
    tag: "AI & REASONING",
  },
  {
    num: "02",
    title: "Kinetic Engineering",
    summary:
      "Hardware-composited GPU shaders, fluid physics, and tactile micro-interactions are not decorative afterthoughts. They communicate system state, reduce cognitive load, and turn software into an extension of thought.",
    icon: Zap,
    tag: "GPU SHADERS / WEBGL",
  },
  {
    num: "03",
    title: "Zero-Compromise Scalability",
    summary:
      "Clean TypeScript architecture, strict type boundaries, edge-native distributed runtimes, and resilient database models. We build infrastructure that survives real-world scale.",
    icon: Terminal,
    tag: "SYSTEMS ARCHITECTURE",
  },
  {
    num: "04",
    title: "Founder-Direct Execution",
    summary:
      "No agency bloat, no account managers, and no handoffs. Every system bearing the Aevion name is personally architected, coded, and engineered by founder and lead engineer Sai Rio.",
    icon: Code2,
    tag: "DIRECT CRAFTSMANSHIP",
  },
];

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (isReducedMotion()) {
        gsap.set(".manifesto-phase-1", { display: "none" });
        gsap.set(".manifesto-phase-2", { opacity: 1, position: "relative", pointerEvents: "auto" });
        gsap.set([".manifesto-w-we2", ".manifesto-w-build2", ".manifesto-w-whats", ".manifesto-w-next"], { y: "0%", opacity: 1, scale: 1, x: 0 });
        gsap.set([".manifesto-support-1", ".manifesto-support-2", ".manifesto-support-3", ".manifesto-desc"], { opacity: 1, y: 0, clipPath: "none" });
        return;
      }

      // ─── SCENE 4: DECLARE (Staged Climax) ─────────────────────
      const justSplit = new SplitText(".manifesto-w-just", {
        type: "chars",
        charsClass: "just-char",
      });

      const nextLineSplit = new SplitText(".manifesto-support-3", {
        type: "chars",
        charsClass: "support3-char",
      });

      const stageTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".manifesto-stage",
          start: "top 75%",
          end: "bottom 25%",
          scrub: 0.6,
        },
      });

      // 1. Eyebrow initial state: highly tracked
      gsap.set(".manifesto-eyebrow-text", {
        letterSpacing: "0.55em",
      });

      // 2. Phase 1 initial states
      gsap.set(".manifesto-w-we", {
        scale: 1.45,
        opacity: 0,
      });

      gsap.set(".manifesto-w-dont", {
        x: -35,
        opacity: 0,
      });

      gsap.set(justSplit.chars, {
        y: -24,
        opacity: 0,
      });

      gsap.set([".manifesto-w-build1", ".manifesto-w-products"], {
        y: "115%",
        opacity: 0,
      });

      // 3. Phase 2 initial states
      gsap.set(".manifesto-w-we2", {
        x: -35,
        opacity: 0,
      });

      gsap.set(".manifesto-w-build2", {
        x: 35,
        opacity: 0,
      });

      gsap.set([".manifesto-w-whats", ".manifesto-w-next"], {
        scale: 0.82,
        opacity: 0,
      });

      // 4. Supporting Manifesto initial states
      gsap.set(".manifesto-support-1", {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      });

      gsap.set(".manifesto-support-2", {
        letterSpacing: "-0.05em",
        opacity: 0,
      });

      gsap.set(nextLineSplit.chars, {
        y: 12,
        opacity: 0,
      });

      gsap.set(".manifesto-desc", {
        y: 15,
        opacity: 0,
      });

      // ── Stage Progression ──
      stageTl
        // 1. Editorial tracking reveal on eyebrow
        .to(".manifesto-eyebrow-text", {
          letterSpacing: "0.15em",
          ease: "power2.out",
        })
        // 2. WE reveals: Scale / center lock
        .to(
          ".manifesto-w-we",
          {
            scale: 1,
            opacity: 1,
            duration: 0.15,
            ease: "power2.out",
          },
          "<0.05"
        )
        // 3. DON'T reveals: Horizontal word expansion
        .to(
          ".manifesto-w-dont",
          {
            x: 0,
            opacity: 1,
            duration: 0.15,
            ease: "power2.out",
          },
          "<0.08"
        )
        // 4. JUST reveals: Character cascade
        .to(
          justSplit.chars,
          {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.15,
            ease: "power3.out",
          },
          "<0.08"
        )
        // 5. BUILD PRODUCTS. reveals: Masked vertical reveal
        .to(
          [".manifesto-w-build1", ".manifesto-w-products"],
          {
            y: "0%",
            opacity: 1,
            stagger: 0.08,
            duration: 0.2,
            ease: "power2.out",
          },
          "<0.1"
        )
        // 6. HOLD / BREATHE (Pause beat)
        .to({}, { duration: 0.35 })
        // 7. Phase 1 disperses cleanly
        .to(".manifesto-phase-1", {
          y: -30,
          opacity: 0,
          scale: 0.98,
          duration: 0.22,
          ease: "power2.inOut",
        })
        // 8. Phase 2 reveals: WE BUILD (Word Convergence)
        .set(".manifesto-phase-2", { opacity: 1, pointerEvents: "auto" }, "<0.06")
        .to(
          [".manifesto-w-we2", ".manifesto-w-build2"],
          {
            x: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power3.out",
          },
          "<0.04"
        )
        // 9. WHAT'S NEXT.: Large-scale typographic expansion
        .to(
          [".manifesto-w-whats", ".manifesto-w-next"],
          {
            scale: 1,
            opacity: 1,
            stagger: 0.06,
            duration: 0.24,
            ease: "back.out(1.3)",
          },
          "-=0.08"
        )
        // 10. Supporting Manifesto Sentence 1: Horizontal editorial reveal
        .to(
          ".manifesto-support-1",
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.18,
            ease: "power2.out",
          },
          "-=0.05"
        )
        // 11. Supporting Manifesto Sentence 2: Compressed tracking release
        .to(
          ".manifesto-support-2",
          {
            letterSpacing: "0.02em",
            opacity: 1,
            duration: 0.18,
            ease: "power2.out",
          },
          "<0.08"
        )
        // 12. Supporting Manifesto Sentence 3: Progressive character construction
        .to(
          nextLineSplit.chars,
          {
            y: 0,
            opacity: 1,
            stagger: 0.015,
            duration: 0.2,
            ease: "power2.out",
          },
          "<0.08"
        )
        // 13. Narrative statement
        .to(
          ".manifesto-desc",
          {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out",
          },
          "-=0.1"
        );

      // Principle Cards Stagger
      gsap.fromTo(
        ".manifesto-card",
        { opacity: 0, y: 35, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: MOTION.duration.standard,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".manifesto-cards-grid",
            start: "top 82%",
            once: true,
          },
        }
      );

      // Callout Banner
      gsap.fromTo(
        ".manifesto-banner",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.duration.standard,
          ease: MOTION.ease.cinematic,
          scrollTrigger: {
            trigger: ".manifesto-banner",
            start: "top 88%",
            once: true,
          },
        }
      );

      return () => {
        justSplit.revert();
        nextLineSplit.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative scroll-mt-20 bg-[#030306] text-white py-32 px-4 sm:px-8 lg:px-16 border-t border-white/10 selection:bg-emerald-500 selection:text-black overflow-hidden"
    >
      {/* Laser grid accents */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        {/* Top Manifesto Kinetic Transformation Stage */}
        <div className="manifesto-stage space-y-8 max-w-5xl relative min-h-[360px] sm:min-h-[420px] flex flex-col justify-center">
          <div className="manifesto-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase mb-4 w-fit select-none">
            <Sparkles size={12} />
            <span className="manifesto-eyebrow-text">The Aevion Manifesto</span>
          </div>

          {/* Kinetic Container holding both transformation phases */}
          <div className="relative w-full overflow-visible">
            {/* Phase 1: WE DON'T JUST BUILD PRODUCTS. */}
            <div className="manifesto-phase-1">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-white select-none">
                <div className="overflow-hidden py-1">
                  <span className="manifesto-w-we inline-block mr-3 sm:mr-5">WE</span>
                  <span className="manifesto-w-dont inline-block mr-3 sm:mr-5">DON&apos;T</span>
                  <span className="manifesto-w-just inline-block">JUST</span>
                </div>
                <div className="overflow-hidden py-1 text-white/70">
                  <span className="manifesto-w-build1 inline-block mr-3 sm:mr-5">BUILD</span>
                  <span className="manifesto-w-products inline-block">PRODUCTS.</span>
                </div>
              </h2>
            </div>

            {/* Phase 2: WE BUILD WHAT'S NEXT. (Culmination) */}
            <div className="manifesto-phase-2 absolute top-0 left-0 w-full opacity-0 pointer-events-none">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-white select-none">
                <div className="overflow-hidden py-1">
                  <span className="manifesto-w-we2 inline-block mr-3 sm:mr-5">WE</span>
                  <span className="manifesto-w-build2 inline-block">BUILD</span>
                </div>
                <div className="overflow-hidden py-1">
                  <span className="manifesto-w-whats inline-block mr-3 sm:mr-5 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                    WHAT&apos;S
                  </span>
                  <span className="manifesto-w-next inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                    NEXT.
                  </span>
                </div>
              </h2>
            </div>
          </div>

          {/* Supporting Manifesto - 3 Distinct Editorial Statements */}
          <div className="manifesto-supporting-statements space-y-1.5 pt-2 font-mono text-sm sm:text-base text-emerald-400/90 tracking-wide select-none">
            <div className="overflow-hidden">
              <p className="manifesto-support-1">We don&apos;t follow templates.</p>
            </div>
            <div className="overflow-hidden">
              <p className="manifesto-support-2">We don&apos;t chase noise.</p>
            </div>
            <div className="overflow-hidden">
              <p className="manifesto-support-3 text-cyan-300 font-semibold">We engineer what comes next.</p>
            </div>
          </div>

          <p className="manifesto-desc text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-3xl pt-1">
            We operate as an elite experimental laboratory and software foundry for founders and
            forward-thinking enterprises who refuse to settle for ordinary digital products.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="manifesto-cards-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRINCIPLES.map((p) => {
            return (
              <div
                key={p.num}
                className="manifesto-card p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/[0.03] transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-2xl font-mono font-black text-emerald-500/40 group-hover:text-emerald-400 transition-colors">
                      {p.num}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-zinc-400 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all">
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-300 transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-light">
                    {p.summary}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>DISCIPLINE VERIFIED</span>
                  <ArrowUpRight
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-emerald-400"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Laboratory Quote Block */}
        <div className="manifesto-banner p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-950/20 via-black to-cyan-950/20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              LABORATORY EXPERIMENTATION
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              Pushing the boundaries of what browser engines can do.
            </div>
            <p className="text-sm text-zinc-400 font-mono">
              From WebGL shaders to low-latency AI streaming architectures, we test new frontiers before
              they become industry standards.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/showcase"
              className="px-6 py-3.5 rounded-2xl bg-white text-black font-bold font-mono text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              Explore 3D Lab
            </Link>
            <Link
              href="/tech-stack"
              className="px-6 py-3.5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-all"
            >
              Full Stack Specs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
