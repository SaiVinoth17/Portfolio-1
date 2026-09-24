"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Globe from "@/components/ui/globe";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";
import { isReducedMotion } from "@/lib/motion/motionTokens";

// Register client plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);
}

// Extended navigation dots interface
export interface NavDotItem {
  id: string;
  badge: string;
}

export const DEFAULT_NAV_DOTS: NavDotItem[] = [
  { id: "hero", badge: "EXPLORE" },
  { id: "innovation", badge: "CONNECTED" },
  { id: "discovery", badge: "REAL SYSTEMS" },
  { id: "manifesto", badge: "The Aevion Manifesto" },
  { id: "founders", badge: "Co-Founders Architecture" },
  { id: "work", badge: "Production Case Studies" },
  { id: "timeline", badge: "Building in Public" },
  { id: "capabilities", badge: "Experimental Lab" },
  { id: "footer", badge: "The Future Is Engineered" },
];

// Reusable ScrollGlobe component following shadcn/ui patterns
interface ScrollGlobeProps {
  sections: {
    id: string;
    badge?: string;
    title?: string;
    subtitle?: string;
    description?: string;
    align?: "left" | "center" | "right";
    features?: { title: string; description: string }[];
    editorialConcepts?: {
      num: string;
      title: string;
      category: string;
      description: string;
    }[];
    actions?: {
      label: string;
      variant: "primary" | "secondary";
      onClick?: () => void;
    }[];
  }[];
  globeConfig?: {
    positions: {
      top: string;
      left: string;
      scale: number;
    }[];
  };
  navDots?: NavDotItem[];
  className?: string;
}

const defaultGlobeConfig = {
  positions: [
    { top: "50%", left: "82%", scale: 1.85 }, // Hero: Deep right, dominant anchor
    { top: "25%", left: "50%", scale: 0.9 },  // Innovation: Top, subtle
    { top: "15%", left: "90%", scale: 2 },    // Discovery: Left, medium
    { top: "50%", left: "50%", scale: 1.8 },  // Future: Center, large backdrop
  ],
};

// Parse percentage string to number
const parsePercent = (str: string): number => parseFloat(str.replace("%", ""));

function ScrollGlobe({
  sections,
  globeConfig = defaultGlobeConfig,
  navDots = DEFAULT_NAV_DOTS,
  className,
}: ScrollGlobeProps) {
  // Pre-calculate positions for performance
  const calculatedPositions = useMemo(() => {
    return globeConfig.positions.map((pos) => ({
      top: parsePercent(pos.top),
      left: parsePercent(pos.left),
      scale: pos.scale,
    }));
  }, [globeConfig.positions]);

  const [activeNavIndex, setActiveNavIndex] = useState(0);
  const [globeTransform, setGlobeTransform] = useState(() => {
    const initialPos = calculatedPositions[0];
    return initialPos
      ? `translate3d(${initialPos.left}vw, ${initialPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${initialPos.scale}, ${initialPos.scale}, 1)`
      : "";
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);
  const activeNavIndexRef = useRef(0);
  const lastGlobeIndexRef = useRef(0);
  const sectionOffsetsRef = useRef<{ id: string; top: number; bottom: number; center: number }[]>([]);
  const docHeightRef = useRef(1);

  // Pre-measure section layout geometry on mount/resize to prevent synchronous getBoundingClientRect during scroll
  const measureSections = useCallback(() => {
    if (typeof window === "undefined") return;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    docHeightRef.current = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );

    sectionOffsetsRef.current = navDots.map((item, index) => {
      let el: HTMLElement | null = null;
      if (index < sectionRefs.current.length && sectionRefs.current[index]) {
        el = sectionRefs.current[index];
      } else {
        el = document.getElementById(item.id);
      }

      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + currentScroll;
        const bottom = rect.bottom + currentScroll;
        return {
          id: item.id,
          top,
          bottom,
          center: top + rect.height / 2,
        };
      }
      return { id: item.id, top: 0, bottom: 0, center: 0 };
    });
  }, [navDots]);

  // Scroll tracking without DOM reads or React component re-rendering
  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = docHeightRef.current;
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

    // Update progress bar directly without triggering full component re-render
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${progress})`;
    }

    const viewportTarget = scrollTop + window.innerHeight * 0.45;
    const scrollBottom = scrollTop + window.innerHeight;
    const totalHeight = docHeight + window.innerHeight;

    let newActiveDot = 0;

    // Bottom of the page: activate the final dot (The Future Is Engineered)
    if (totalHeight - scrollBottom < 90) {
      newActiveDot = navDots.length - 1;
    } else if (scrollTop < 120) {
      newActiveDot = 0;
    } else {
      let minDistance = Infinity;
      const offsets = sectionOffsetsRef.current;
      for (let i = 0; i < offsets.length; i++) {
        const section = offsets[i];
        if (section.top <= viewportTarget && section.bottom >= viewportTarget) {
          newActiveDot = i;
          minDistance = -1;
          break;
        } else if (minDistance >= 0) {
          const distance = Math.abs(section.center - viewportTarget);
          if (distance < minDistance) {
            minDistance = distance;
            newActiveDot = i;
          }
        }
      }
    }

    // Only update state if active section has actually changed
    if (newActiveDot !== activeNavIndexRef.current) {
      activeNavIndexRef.current = newActiveDot;
      setActiveNavIndex(newActiveDot);

      const globeIndex = Math.min(newActiveDot, calculatedPositions.length - 1);
      if (globeIndex !== lastGlobeIndexRef.current) {
        lastGlobeIndexRef.current = globeIndex;
        const currentPos = calculatedPositions[globeIndex];
        if (currentPos) {
          const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`;
          setGlobeTransform(transform);
        }
      }
    }
  }, [calculatedPositions, navDots]);

  // Throttled scroll handler with RAF
  useEffect(() => {
    measureSections();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        animationFrameId.current = requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measureSections();
        updateScrollPosition();
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    animationFrameId.current = requestAnimationFrame(updateScrollPosition);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [measureSections, updateScrollPosition]);

  // Smooth scroll to target section
  const scrollToNav = (item: NavDotItem, index: number) => {
    if (index === 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    let el: HTMLElement | null = null;
    if (index < sectionRefs.current.length && sectionRefs.current[index]) {
      el = sectionRefs.current[index];
    } else {
      el = document.getElementById(item.id);
    }

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ── Kinetic Typography Choreography (Scenes 1, 2, 3) ──
  useGSAP(
    () => {
      if (isReducedMotion()) return;

      // ─── SCENE 1: DISCOVER (Assemble) ───────────────────────────
      const heroSplit = new SplitText(".scene1-title", {
        type: "chars,words",
        charsClass: "scene1-char",
      });

      // Character Assembly: Chars begin displaced in x, y, rotation, scale, opacity
      gsap.set(heroSplit.chars, {
        y: (i) => (i % 2 === 0 ? -32 : 36),
        x: (i) => (i % 3 === 0 ? -24 : 22),
        rotation: (i) => (i % 2 === 0 ? -8 : 8),
        scale: (i) => (i % 2 === 0 ? 0.85 : 1.15),
        opacity: 0.15,
      });

      // Tracking Collapse: Eyebrow begins with exaggerated spacing
      gsap.set(".scene1-eyebrow-text", {
        letterSpacing: "0.65em",
      });

      // Masked construction initial state for phrases
      gsap.set(".scene1-phrase", {
        y: "115%",
        opacity: 0,
      });

      // Micro tokens initial state
      gsap.set(".scene1-micro-token", {
        x: (i) => (i % 2 === 0 ? -18 : 18),
        opacity: 0,
      });

      // Actions initial state
      gsap.set(".scene1-actions", {
        y: 20,
        opacity: 0,
      });

      // Scene 1 Assembly scrub timeline
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "32% top",
          scrub: 0.5,
        },
      });

      tl1
        // 1. Tracking collapse on eyebrow
        .to(".scene1-eyebrow-text", {
          letterSpacing: "0.15em",
          ease: "power2.out",
        })
        // 2. Micro tokens drift into view
        .to(
          ".scene1-micro-token",
          {
            x: 0,
            opacity: 0.8,
            stagger: 0.03,
            ease: "power2.out",
          },
          "<"
        )
        // 3. Character assembly into precise headline lockup
        .to(
          heroSplit.chars,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.015,
            ease: "power3.out",
          },
          "<0.05"
        )
        // 4. Word-by-word masked construction of description
        .to(
          [".scene1-phrase-1", ".scene1-phrase-2", ".scene1-phrase-3", ".scene1-phrase-4"],
          {
            y: "0%",
            opacity: 1,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.15"
        )
        // 5. Action buttons reveal
        .to(
          ".scene1-actions",
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.1"
        );

      // Scene 1 Exit & Transition toward Scene 2
      const tl1Exit = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "42% top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      tl1Exit
        // Chars fragment outward
        .to(heroSplit.chars, {
          y: -48,
          x: (i) => (i - 4) * 14,
          opacity: 0,
          stagger: 0.01,
          ease: "power2.in",
        })
        // Transitional connective fragments emerge and drift
        .fromTo(
          ".scene1-connectors",
          { opacity: 0, y: 25 },
          { opacity: 1, y: -10, duration: 0.25, ease: "power2.out" },
          "<0.05"
        )
        .to(
          ".s1-connector",
          {
            x: (i) => (i % 2 === 0 ? 35 : -35),
            opacity: 0,
            stagger: 0.02,
            ease: "power2.in",
          },
          "+=0.05"
        )
        // Phrases and actions slide away cleanly
        .to(
          [".scene1-eyebrow-container", ".scene1-desc-container", ".scene1-actions", ".scene1-micro-grid"],
          {
            y: -25,
            opacity: 0,
            ease: "power2.in",
          },
          "<"
        );

      // ─── SCENE 2: CONNECT ───────────────────────────────────────
      const connSplit = new SplitText(".scene2-eyebrow-text", {
        type: "chars",
        charsClass: "scene2-conn-char",
      });
      connSplit.elements.forEach((el: any) => el.removeAttribute("aria-label"));

      const designSplit = new SplitText(".scene2-word-design", {
        type: "chars",
        charsClass: "scene2-design-char",
      });
      designSplit.elements.forEach((el: any) => el.removeAttribute("aria-label"));

      // Magnetic Convergence: Characters scattered across the visual plane
      gsap.set(connSplit.chars, {
        x: (i) => (i % 2 === 0 ? -110 : 110) * Math.sin(i + 1),
        y: (i) => (i % 3 === 0 ? -42 : 45),
        scale: 1.35,
        opacity: 0,
      });

      // Radial Dispersion: BY DESIGN characters start dispersed radially
      gsap.set(designSplit.chars, {
        x: (i) => (i - 2.5) * 28,
        y: (i) => (i % 2 === 0 ? -26 : 26),
        scale: 1.25,
        opacity: 0,
      });

      gsap.set(".scene2-word-by", {
        opacity: 0,
        scale: 0.8,
      });

      // Flowing phrase reveal initial state
      gsap.set(".scene2-flow-1", { x: -55, opacity: 0 });
      gsap.set(".scene2-flow-2", { y: 35, opacity: 0 });
      gsap.set(".scene2-flow-3", { x: 55, opacity: 0 });

      // Micro connectors
      gsap.set(".scene2-micro-token", { opacity: 0, scale: 0.85 });

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: "#innovation",
          start: "top 88%",
          end: "top 20%",
          scrub: 0.5,
        },
      });

      tl2
        // 1. Connectors flare
        .to(".scene2-micro-token", {
          opacity: 0.8,
          scale: 1,
          stagger: 0.03,
          ease: "power2.out",
        })
        // 2. Magnetic convergence of CONNECTED into center
        .to(
          connSplit.chars,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.02,
            ease: "power3.out",
          },
          "<0.05"
        )
        // 3. Radial dispersion lock of BY DESIGN
        .to(
          ".scene2-word-by",
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
          },
          "<0.1"
        )
        .to(
          designSplit.chars,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            stagger: 0.018,
            ease: "back.out(1.2)",
          },
          "<0.04"
        )
        // 4. Flowing phrase reveals from multiple directions
        .to(
          ".scene2-flow-1",
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.15"
        )
        .to(
          ".scene2-flow-2",
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          ".scene2-flow-3",
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Scene 2 exit dissolution toward Scene 3
      gsap.to(
        [
          ".scene2-connectors",
          connSplit.chars,
          ".scene2-word-by",
          designSplit.chars,
          ".scene2-desc",
        ],
        {
          scrollTrigger: {
            trigger: "#innovation",
            start: "center 25%",
            end: "bottom top",
            scrub: 0.5,
          },
          y: -35,
          opacity: 0,
          stagger: 0.015,
          ease: "power2.in",
        }
      );

      // ─── SCENE 3: TRANSFORM (Editorial Kinetic Composition) ──────
      // Directional text compression on eyebrow: IDEAS INTO
      gsap.set(".scene3-eyebrow-text", {
        letterSpacing: "0.65em",
        x: -35,
        opacity: 0,
      });

      // Raw vocabulary field tokens initial state
      gsap.set(".scene3-vocab-token", {
        y: (i) => (i % 2 === 0 ? -18 : 18),
        x: (i) => (i % 3 === 0 ? -24 : 24),
        opacity: 0,
        scale: 0.85,
      });

      // Phrase reassembly initial state
      gsap.set([".scene3-rp-1", ".scene3-rp-2", ".scene3-rp-3", ".scene3-rp-4"], {
        y: "115%",
        opacity: 0,
      });

      // 3 Supporting Concepts initial states
      gsap.set(".scene3-num-1", { opacity: 0 });
      gsap.set(".scene3-title-1", { opacity: 0 });
      gsap.set(".scene3-desc-1", { clipPath: "inset(0 100% 0 0)", opacity: 0 });

      gsap.set(".scene3-num-2", { x: -20, opacity: 0 });
      gsap.set(".scene3-title-2", { letterSpacing: "-0.04em", opacity: 0 });
      gsap.set(".scene3-desc-2", { y: 15, opacity: 0 });

      gsap.set(".scene3-num-3", { letterSpacing: "0.3em", opacity: 0 });
      gsap.set(".scene3-title-3", { y: "115%", opacity: 0 });
      gsap.set(".scene3-desc-3", { y: 20, x: -15, opacity: 0 });

      // Vocabulary stream timeline
      const tl3Tokens = gsap.timeline({
        scrollTrigger: {
          trigger: "#discovery",
          start: "top 88%",
          end: "top 42%",
          scrub: 0.45,
        },
      });

      tl3Tokens
        .to(".scene3-vocab-token", {
          y: 0,
          x: 0,
          opacity: 0.85,
          scale: 1,
          stagger: 0.03,
          ease: "power2.out",
        })
        .to(".scene3-vocab-token", {
          opacity: 0.35,
          stagger: 0.02,
        });

      // Headline & Description Decode timeline
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: "#discovery",
          start: "top 88%",
          end: "top 25%",
          scrub: 0.55,
        },
      });

      tl3
        // Eyebrow directional compression
        .to(".scene3-eyebrow-text", {
          letterSpacing: "0.15em",
          x: 0,
          opacity: 1,
          ease: "power2.out",
        })
        // Decode / Scramble transformation into REAL SYSTEMS
        .to(
          ".scene3-title-text",
          {
            scrambleText: {
              text: "REAL SYSTEMS",
              chars: "01ABCDEF#*+!<>%",
              speed: 0.35,
            },
            opacity: 1,
            ease: "none",
          },
          "<0.05"
        )
        // Phrase-by-phrase reassembly of description
        .to(
          [".scene3-rp-1", ".scene3-rp-2", ".scene3-rp-3", ".scene3-rp-4"],
          {
            y: "0%",
            opacity: 1,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.15"
        );

      // 3 Supporting Concepts timeline
      const tl3Concepts = gsap.timeline({
        scrollTrigger: {
          trigger: ".scene3-concepts-grid",
          start: "top 90%",
          end: "top 40%",
          scrub: 0.55,
        },
      });

      tl3Concepts
        // Concept 01: Numerical scramble + Glyph decode + Character-width reveal
        .to(".scene3-num-1", {
          scrambleText: { text: "01", chars: "0123456789" },
          opacity: 1,
          ease: "none",
        })
        .to(
          ".scene3-title-1",
          {
            scrambleText: { text: "INTELLIGENCE", chars: "AI*#91" },
            opacity: 1,
            ease: "power1.out",
          },
          "<0.05"
        )
        .to(
          ".scene3-desc-1",
          {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            ease: "power2.out",
          },
          "<0.1"
        )
        // Concept 02: Split-digit assembly + Tracking expansion + Flowing word reveal
        .to(
          ".scene3-num-2",
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "<0.1"
        )
        .to(
          ".scene3-title-2",
          {
            letterSpacing: "0.12em",
            opacity: 1,
            ease: "power2.out",
          },
          "<0.05"
        )
        .to(
          ".scene3-desc-2",
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "<0.1"
        )
        // Concept 03: Tracking expansion + Vertical masked reveal + Directional line reveal
        .to(
          ".scene3-num-3",
          {
            letterSpacing: "0em",
            opacity: 1,
            ease: "power2.out",
          },
          "<0.1"
        )
        .to(
          ".scene3-title-3",
          {
            y: "0%",
            opacity: 1,
            ease: "power3.out",
          },
          "<0.05"
        )
        .to(
          ".scene3-desc-3",
          {
            y: 0,
            x: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "<0.1"
        );

      // Scene 3 -> 4 Deconstruction Transition
      const tl3Exit = gsap.timeline({
        scrollTrigger: {
          trigger: "#discovery",
          start: "center 20%",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      tl3Exit
        .fromTo(
          ".scene3-deconstruction",
          { opacity: 0, y: 15 },
          { opacity: 0.85, y: 0, duration: 0.2, ease: "power2.out" }
        )
        .to(
          [
            ".scene3-vocabulary-field",
            ".scene3-eyebrow-container",
            ".scene3-title",
            ".scene3-desc",
            ".scene3-concepts-grid",
            ".scene3-deconstruction",
          ],
          {
            opacity: 0,
            y: -35,
            stagger: 0.02,
            ease: "power2.in",
          }
        );

      return () => {
        heroSplit.revert();
        connSplit.revert();
        designSplit.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-screen overflow-x-hidden min-h-screen bg-background text-foreground",
        className
      )}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-border/20 via-border/40 to-border/20 z-50">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-primary via-blue-600 to-blue-900 will-change-transform shadow-sm"
          style={{
            transform: "scaleX(0)",
            transformOrigin: "left center",
            transition: "transform 0.15s ease-out",
            filter: "drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))",
          }}
        />
      </div>

      {/* Enhanced Navigation - Extended to Full Page Sections */}
      <div className="hidden sm:flex fixed right-3 sm:right-5 lg:right-7 xl:right-9 top-1/2 -translate-y-1/2 z-40">
        <div className="space-y-2 sm:space-y-2.5 lg:space-y-3 relative">
          {/* Navigation vertical line */}
          <div className="absolute left-1/2 top-1.5 bottom-1.5 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 -z-10" />

          {navDots.map((item, index) => {
            const isDotActive = activeNavIndex === index;
            return (
              <button
                key={item.id}
                onClick={() => scrollToNav(item, index)}
                className="group flex items-center justify-end w-full py-1 focus:outline-none cursor-pointer"
                aria-label={`Scroll to ${item.badge}`}
              >
                {/* Tooltip on hover */}
                <div
                  className={cn(
                    "hidden group-hover:flex items-center absolute right-6 font-mono text-[11px] whitespace-nowrap",
                    "px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 shadow-lg",
                    "text-white/80 transition-all duration-200 pointer-events-none z-50",
                    isDotActive && "border-emerald-500/40 text-emerald-300"
                  )}
                >
                  <span className="text-emerald-400 mr-1.5 font-bold">{String(index + 1).padStart(2, "0")}</span>
                  {item.badge}
                </div>

                {/* Dot indicator */}
                <div
                  className={cn(
                    "relative transition-all duration-300 rounded-full",
                    isDotActive
                      ? "w-2.5 h-2.5 bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] scale-125"
                      : "w-1.5 h-1.5 bg-white/25 hover:bg-white/60 hover:scale-125"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Globe Container - authoritative positioning */}
      <div
        className="fixed inset-0 pointer-events-none z-10 will-change-transform flex items-center justify-center"
        style={{
          transform: globeTransform,
          transition: "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          transformOrigin: "center center",
        }}
      >
        <div className="scale-[0.95] sm:scale-110 lg:scale-130">
          <Globe />
        </div>
      </div>

      {/* Dynamic sections - fully responsive */}
      {sections.map((section, index) => {
        const hasContent = Boolean(
          section.title ||
            section.description ||
            section.editorialConcepts?.length ||
            section.actions?.length
        );

        if (!hasContent && index !== 0) return null;

        return (
          <section
            key={section.id}
            id={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={cn(
              "relative flex flex-col z-20 w-full max-w-full overflow-hidden",
              index === 0
                ? "min-h-screen justify-center pt-28 pb-16 px-6 sm:px-10 md:px-14 lg:px-20 xl:px-24"
                : "min-h-[85vh] lg:min-h-[90vh] justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-20 lg:py-24",
              section.align === "center" && "items-center text-center",
              section.align === "right" && "items-end text-right",
              section.align !== "center" &&
                section.align !== "right" &&
                "items-start text-left"
            )}
          >
            {hasContent && (
              <div
                className={cn(
                  "will-change-transform transition-all duration-700 opacity-100 translate-y-0",
                  index === 0
                    ? "w-full max-w-[min(52rem,55vw)]"
                    : index === 1
                    ? "w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto"
                    : "w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"
                )}
              >
                {/* ── Scene 1: ASSEMBLE ── */}
                {index === 0 && (
                  <div className="relative">
                    {/* Atmospheric Micro-tokens & Coordinates */}
                    <div className="scene1-micro-grid flex flex-wrap items-center gap-3 mb-5 text-[10px] font-mono uppercase tracking-widest text-emerald-400/70 select-none">
                      <span className="scene1-micro-token px-2 py-0.5 rounded bg-white/[0.03] border border-white/10">01 // DISCOVER</span>
                      <span className="scene1-micro-token px-2 py-0.5 rounded bg-white/[0.03] border border-white/10">LAT 11.41°N · LON 76.70°E</span>
                      <span className="scene1-micro-token px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-emerald-400 font-semibold">FOUNDRY_ACTIVE</span>
                    </div>

                    {/* Eyebrow with Tracking Collapse */}
                    <div className="scene1-eyebrow-container mb-6 overflow-hidden">
                      <div className="scene1-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase w-fit select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="scene1-eyebrow-text">{section.badge || "EXPLORE"}</span>
                      </div>
                    </div>

                    {/* Main Headline: WHAT'S NEXT with Character Assembly */}
                    <h1
                      className="scene1-title font-black leading-[0.92] tracking-[-0.03em] mb-8 text-white select-none"
                      style={{ fontSize: "clamp(3.75rem, 8vw + 0.5rem, 6.75rem)" }}
                    >
                      {section.title}
                    </h1>

                    {/* Description: Word-by-word Masked Construction */}
                    {section.description && (
                      <div className="scene1-desc-container max-w-[38rem] mb-10 text-white/70 text-base sm:text-lg leading-[1.7] font-light">
                        <div className="overflow-hidden py-0.5">
                          <span className="scene1-phrase scene1-phrase-1 inline-block mr-2">We build digital systems</span>
                          <span className="scene1-phrase scene1-phrase-2 inline-block">for ideas</span>
                        </div>
                        <div className="overflow-hidden py-0.5">
                          <span className="scene1-phrase scene1-phrase-3 inline-block mr-2 text-white font-normal">that refuse</span>
                          <span className="scene1-phrase scene1-phrase-4 inline-block text-white font-normal">to stay ordinary.</span>
                        </div>
                      </div>
                    )}

                    {/* CTA Actions */}
                    {section.actions && (
                      <div className="scene1-actions flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2">
                        {section.actions.map((action) => (
                          <button
                            key={action.label}
                            onClick={action.onClick}
                            className={cn(
                              "group relative overflow-hidden font-medium transition-all duration-300 active:scale-[0.97] w-full sm:w-auto",
                              "focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer",
                              action.variant === "primary"
                                ? [
                                    "px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[13px] sm:text-sm tracking-[0.03em] font-semibold",
                                    "bg-white text-black hover:bg-white/90",
                                    "shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_4px_24px_rgba(0,0,0,0.5)]",
                                    "hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3),0_6px_32px_rgba(0,0,0,0.6)]",
                                  ].join(" ")
                                : [
                                    "px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-[13px] sm:text-sm tracking-[0.03em] font-medium",
                                    "border border-white/15 bg-white/[0.04] text-white/60 backdrop-blur-sm",
                                    "hover:border-white/25 hover:bg-white/[0.07] hover:text-white/80",
                                  ].join(" ")
                            )}
                          >
                            <span className="relative z-10">{action.label}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Transitional Connective Fragments toward Scene 2 */}
                    <div className="scene1-connectors pointer-events-none absolute -bottom-12 left-0 flex flex-wrap gap-4 opacity-0 text-xs font-mono uppercase tracking-widest text-cyan-400/60 select-none">
                      <span className="s1-connector s1-conn-1">PEOPLE</span>
                      <span className="s1-connector s1-conn-2">DATA</span>
                      <span className="s1-connector s1-conn-3">IDEAS</span>
                      <span className="s1-connector s1-conn-4">INTELLIGENCE</span>
                    </div>
                  </div>
                )}

                {/* ── Scene 2: CONVERGE ── */}
                {index === 1 && (
                  <div className="space-y-6 max-w-3xl mx-auto text-center relative">
                    {/* Micro Connectors */}
                    <div className="scene2-connectors flex items-center justify-center gap-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-cyan-400/60 select-none">
                      <span className="scene2-micro-token px-2 py-0.5 rounded bg-white/[0.03] border border-white/10">02 // SYNAPSE</span>
                      <span className="scene2-micro-token px-2 py-0.5 rounded bg-white/[0.03] border border-white/10">SYSTEM_ALIGNMENT: 100%</span>
                      <span className="scene2-micro-token px-2 py-0.5 rounded bg-white/[0.03] border border-white/10">SYNC_PULSE</span>
                    </div>

                    {/* Eyebrow: MAGNETIC CHARACTER CONVERGENCE */}
                    <div className="scene2-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="scene2-eyebrow-text tracking-widest">{section.badge || "CONNECTED"}</span>
                    </div>

                    {/* Heading: BY DESIGN - Radial Dispersion to Lock */}
                    <h2 className="scene2-title font-black leading-[1.0] tracking-tight mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl select-none text-white">
                      <span className="scene2-word-by inline-block mr-4 sm:mr-6 text-white/60">BY</span>
                      <span className="scene2-word-design inline-block bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                        DESIGN
                      </span>
                    </h2>

                    {/* Description: Flowing Phrase Reveal through directional masks */}
                    {section.description && (
                      <div className="scene2-desc text-white/70 text-base sm:text-xl lg:text-2xl leading-[1.65] max-w-2xl mx-auto font-light space-y-1">
                        <div className="overflow-hidden py-0.5">
                          <span className="scene2-flow-phrase scene2-flow-1 inline-block">Technology becomes powerful</span>
                        </div>
                        <div className="overflow-hidden py-0.5">
                          <span className="scene2-flow-phrase scene2-flow-2 inline-block text-cyan-300 font-normal">when people, intelligence</span>
                        </div>
                        <div className="overflow-hidden py-0.5">
                          <span className="scene2-flow-phrase scene2-flow-3 inline-block">and systems move as one.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Scene 3: TRANSFORM (Editorial Kinetic Composition) ── */}
                {index === 2 && (
                  <div className="space-y-10 max-w-4xl relative">
                    {/* Micro Vocabulary Field */}
                    <div className="scene3-vocabulary-field flex flex-wrap items-center gap-2 select-none">
                      {["IDEA", "CODE", "DATA", "AI", "DESIGN", "LOGIC", "SYSTEM", "PRODUCT", "EXPERIENCE", "INTELLIGENCE"].map((token, i) => (
                        <span
                          key={token}
                          className={cn(
                            "scene3-vocab-token text-[10px] font-mono px-2 py-0.5 rounded border transition-colors",
                            i % 2 === 0
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                              : "bg-white/[0.04] border-white/10 text-white/50"
                          )}
                        >
                          {token}
                        </span>
                      ))}
                    </div>

                    {/* Eyebrow: DIRECTIONAL TEXT COMPRESSION */}
                    <div className="scene3-eyebrow-container overflow-hidden">
                      <div className="scene3-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase mb-2 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="scene3-eyebrow-text">{section.badge || "IDEAS INTO"}</span>
                      </div>
                    </div>

                    {/* Main Heading: REAL SYSTEMS - DECODE / SCRAMBLE TRANSFORMATION */}
                    <h2 className="scene3-title font-black leading-[0.95] tracking-tight mb-6 text-4xl sm:text-6xl md:text-7xl lg:text-8xl select-none text-white">
                      <span className="scene3-title-text block">REAL SYSTEMS</span>
                    </h2>

                    {/* Description: PHRASE-BY-PHRASE REASSEMBLY */}
                    {section.description && (
                      <div className="scene3-desc text-white/70 text-base sm:text-lg lg:text-xl leading-[1.7] max-w-3xl font-light space-y-1 mb-8">
                        <div className="overflow-hidden py-0.5">
                          <span className="scene3-reassemble-phrase scene3-rp-1 inline-block mr-2">From first concept</span>
                          <span className="scene3-reassemble-phrase scene3-rp-2 inline-block text-white font-normal">to working product,</span>
                        </div>
                        <div className="overflow-hidden py-0.5">
                          <span className="scene3-reassemble-phrase scene3-rp-3 inline-block mr-2">we turn complexity</span>
                          <span className="scene3-reassemble-phrase scene3-rp-4 inline-block text-emerald-400 font-medium">into something people can use.</span>
                        </div>
                      </div>
                    )}

                    {/* THREE SUPPORTING EDITORIAL FLOATING CONCEPTS (NO SAAS CARDS!) */}
                    <div className="scene3-concepts-grid grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10">
                      {/* 01 // INTELLIGENCE */}
                      <div className="scene3-concept scene3-concept-1 space-y-3">
                        <div className="flex items-baseline gap-3">
                          <span className="scene3-c-num scene3-num-1 text-2xl sm:text-3xl font-mono font-black text-emerald-400">
                            01
                          </span>
                          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">AI & REASONING</span>
                        </div>
                        <h3 className="scene3-c-title scene3-title-1 text-xl sm:text-2xl font-bold text-white tracking-tight">
                          INTELLIGENCE
                        </h3>
                        <p className="scene3-c-desc scene3-desc-1 text-sm text-zinc-400 leading-relaxed font-light">
                          AI that works beyond the prompt.
                        </p>
                      </div>

                      {/* 02 // EXPERIENCE */}
                      <div className="scene3-concept scene3-concept-2 space-y-3">
                        <div className="flex items-baseline gap-3">
                          <span className="scene3-c-num scene3-num-2 text-2xl sm:text-3xl font-mono font-black text-cyan-400">
                            02
                          </span>
                          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">KINETIC UI</span>
                        </div>
                        <h3 className="scene3-c-title scene3-title-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
                          EXPERIENCE
                        </h3>
                        <p className="scene3-c-desc scene3-desc-2 text-sm text-zinc-400 leading-relaxed font-light">
                          Interfaces built around how people think.
                        </p>
                      </div>

                      {/* 03 // ENGINEERING */}
                      <div className="scene3-concept scene3-concept-3 space-y-3">
                        <div className="flex items-baseline gap-3">
                          <span className="scene3-c-num scene3-num-3 text-2xl sm:text-3xl font-mono font-black text-teal-400">
                            03
                          </span>
                          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">DISTRIBUTED SYSTEMS</span>
                        </div>
                        <h3 className="scene3-c-title scene3-title-3 text-xl sm:text-2xl font-bold text-white tracking-tight">
                          ENGINEERING
                        </h3>
                        <p className="scene3-c-desc scene3-desc-3 text-sm text-zinc-400 leading-relaxed font-light">
                          Systems designed for the real world.
                        </p>
                      </div>
                    </div>

                    {/* Scene 3 -> 4 Deconstruction Elements */}
                    <div className="scene3-deconstruction pointer-events-none opacity-0 flex gap-6 text-xs font-mono text-emerald-400/70 uppercase tracking-widest pt-4 select-none">
                      <span className="s3-decon-1">SYSTEM</span>
                      <span className="s3-decon-2">PRODUCT</span>
                      <span className="s3-decon-3">VISION</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

// Demo component showcasing the ScrollGlobe
export default function GlobeScrollDemo() {
  const demoSections = [
    {
      id: "hero",
      badge: "EXPLORE",
      title: "WHAT'S NEXT",
      description:
        "We build digital systems for ideas that refuse to stay ordinary.",
      align: "left" as const,
      actions: [
        {
          label: "Initiate Project Brief",
          variant: "primary" as const,
          onClick: () => {
            if (typeof window !== "undefined") window.location.href = "/contact";
          },
        },
        {
          label: "Explore Architecture",
          variant: "secondary" as const,
          onClick: () => {
            if (typeof window !== "undefined") window.location.href = "/projects";
          },
        },
      ],
    },
    {
      id: "innovation",
      badge: "CONNECTED",
      title: "BY DESIGN",
      description:
        "Technology becomes powerful when people, intelligence and systems move as one.",
      align: "center" as const,
    },
    {
      id: "discovery",
      badge: "IDEAS INTO",
      title: "REAL SYSTEMS",
      description:
        "From first concept to working product, we turn complexity into something people can use.",
      align: "left" as const,
      editorialConcepts: [
        {
          num: "01",
          title: "INTELLIGENCE",
          category: "AI & REASONING",
          description: "AI that works beyond the prompt.",
        },
        {
          num: "02",
          title: "EXPERIENCE",
          category: "KINETIC UI",
          description: "Interfaces built around how people think.",
        },
        {
          num: "03",
          title: "ENGINEERING",
          category: "DISTRIBUTED SYSTEMS",
          description: "Systems designed for the real world.",
        },
      ],
    },
  ];

  return (
    <ScrollGlobe
      sections={demoSections}
      className="bg-gradient-to-br from-background via-muted/20 to-background"
    />
  );
}

