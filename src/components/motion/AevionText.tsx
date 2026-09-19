"use client";

import React, { useRef, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { MOTION, isReducedMotion, isMobileDevice } from "@/lib/motion/motionTokens";

// Ensure plugins are registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, useGSAP);
}

export type AevionTextVariant =
  | "display"      // Hero / H1: Masked line/word reveal + subtle 3D fold (0.65–0.85s)
  | "section"      // Section H2: Masked word cascade + subtle blur clear (0.55–0.7s)
  | "subheading"   // H3/H4: Geometric clip-path / directional unfold (0.45–0.6s)
  | "project"      // Project titles: Character elastic stagger with back.out(1.4) (0.45–0.65s)
  | "eyebrow"      // Labels / Eyebrows: Cyber ScrambleText decode (0.25–0.4s)
  | "scramble"     // Explicit ScrambleText decode on viewport entry (0.25–0.4s)
  | "paragraph"    // Body copy: Fast, readable line cadence reveal (0.4–0.55s, stagger 0.025s)
  | "kinetic"      // Special statements: Kinetic tracking & scale punch (0.55–0.7s)
  | "counter"      // Numeric count-up with ease for metrics & stats
  | "badge"        // Micro pill scale + tracking expand (0.3s)
  | "button";      // Kinetic CTA slide & subtle skew (0.35s)

export interface AevionTextProps {
  children?: React.ReactNode;
  text?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";
  variant?: AevionTextVariant;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: string; // ScrollTrigger start e.g. "top 88%"
  once?: boolean;
  // Counter specific props
  counterTarget?: number;
  counterPrefix?: string;
  counterSuffix?: string;
  // Scramble specific props
  scrambleChars?: string;
}

export function AevionText({
  children,
  text,
  as: Component = "div",
  variant = "paragraph",
  className = "",
  style,
  delay = 0,
  duration,
  stagger,
  threshold,
  once = true,
  counterTarget,
  counterPrefix = "",
  counterSuffix = "",
  scrambleChars = "01X#_<>~*",
}: AevionTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const rawText = text ?? (typeof children === "string" ? children : "");

  // Memoize word tokens for split text rendering
  const words = useMemo(() => {
    if (!rawText) return [];
    return rawText.split(/\s+/).filter(Boolean);
  }, [rawText]);

  // Memoize character tokens for character-level stagger effects (project / subheading)
  const chars = useMemo(() => {
    if (!rawText || (variant !== "project" && variant !== "subheading")) return [];
    return Array.from(rawText);
  }, [rawText, variant]);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Handle reduced motion preference gracefully
      if (isReducedMotion()) {
        gsap.set(el, { opacity: 1, clearProps: "all" });
        const allTokens = el.querySelectorAll(".aevion-token, .aevion-char-token");
        if (allTokens.length) gsap.set(allTokens, { opacity: 1, y: 0, clearProps: "all" });
        return;
      }

      const isMobile = isMobileDevice();
      // Viewport entry trigger: top 92% on mobile, top 88% on desktop
      const effectiveThreshold = threshold ?? (isMobile ? "top 92%" : "top 88%");
      const triggerConfig = {
        trigger: el,
        start: effectiveThreshold,
        once,
      };

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 1: DISPLAY (Hero / H1 - Cinematic Masked Line Reveal, 0.65–0.85s)
      // ────────────────────────────────────────────────────────────────────────
      if (variant === "display") {
        const tokens = el.querySelectorAll(".aevion-token");
        const animDuration = duration ?? (isMobile ? 0.65 : 0.8);
        const animStagger = stagger ?? (isMobile ? 0.025 : 0.04);

        gsap.fromTo(
          tokens,
          {
            yPercent: 105,
            rotateX: isMobile ? 0 : 10,
            opacity: 0,
            transformOrigin: "bottom left",
          },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: animDuration,
            stagger: animStagger,
            delay,
            ease: "power4.out",
            scrollTrigger: triggerConfig,
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 2: SECTION (H2 Section Titles - Masked Word Cascade, 0.55–0.7s)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "section") {
        const tokens = el.querySelectorAll(".aevion-token");
        const animDuration = duration ?? (isMobile ? 0.55 : 0.68);
        const animStagger = stagger ?? (isMobile ? 0.02 : 0.03);

        const isLowPerf =
          typeof document !== "undefined" &&
          Boolean(document.documentElement.dataset.perfTier && document.documentElement.dataset.perfTier !== "0");
        const useBlur = !isMobile && !isLowPerf;

        gsap.fromTo(
          tokens,
          {
            yPercent: 100,
            opacity: 0,
            filter: useBlur ? "blur(4px)" : "none",
          },
          {
            yPercent: 0,
            opacity: 1,
            filter: useBlur ? "blur(0px)" : "none",
            duration: animDuration,
            stagger: animStagger,
            delay,
            ease: "power3.out",
            scrollTrigger: triggerConfig,
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 3: PROJECT (Project Titles - Character Elastic Stagger, 0.45–0.65s)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "project") {
        const charTokens = el.querySelectorAll(".aevion-char-token");
        const animDuration = duration ?? (isMobile ? 0.45 : 0.6);

        if (charTokens.length > 0) {
          gsap.fromTo(
            charTokens,
            {
              opacity: 0,
              y: 16,
              scale: 0.88,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: animDuration,
              stagger: isMobile ? 0.01 : 0.015,
              delay,
              ease: "back.out(1.4)",
              scrollTrigger: triggerConfig,
            }
          );
        } else {
          gsap.fromTo(
            el,
            { opacity: 0, y: 14, letterSpacing: "0.06em" },
            {
              opacity: 1,
              y: 0,
              letterSpacing: "normal",
              duration: animDuration,
              delay,
              ease: "power3.out",
              scrollTrigger: triggerConfig,
            }
          );
        }
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 4: SUBHEADING (H3/H4 - Clip-Path Reveal, 0.45–0.6s)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "subheading") {
        const animDuration = duration ?? (isMobile ? 0.45 : 0.55);

        gsap.fromTo(
          el,
          {
            clipPath: "inset(0 100% 0 0)",
            y: 10,
            opacity: 0,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            opacity: 1,
            duration: animDuration,
            delay,
            ease: "power3.out",
            scrollTrigger: triggerConfig,
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 5: EYEBROW & SCRAMBLE (Cyber Decode / Micro Reveal, 0.25–0.4s)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "eyebrow" || variant === "scramble") {
        const animDuration = duration ?? (isMobile ? 0.3 : 0.38);

        gsap.fromTo(
          el,
          { opacity: 0, y: 5 },
          {
            opacity: 1,
            y: 0,
            duration: animDuration,
            delay,
            ease: "power2.out",
            scrollTrigger: triggerConfig,
            onStart: () => {
              if (rawText) {
                gsap.to(el, {
                  scrambleText: {
                    text: rawText,
                    chars: scrambleChars,
                    speed: 0.5,
                    revealDelay: 0.04,
                  },
                  duration: animDuration,
                  ease: "none",
                });
              }
            },
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 6: PARAGRAPH (Fast, Readable Line Cadence Reveal, 0.4–0.55s)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "paragraph") {
        const tokens = el.querySelectorAll(".aevion-token");
        const animDuration = duration ?? (isMobile ? 0.4 : 0.48);
        const animStagger = stagger ?? (isMobile ? 0.015 : 0.025);

        if (tokens.length > 0) {
          gsap.fromTo(
            tokens,
            { y: 8, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: animDuration,
              stagger: animStagger,
              delay,
              ease: "power2.out",
              scrollTrigger: triggerConfig,
            }
          );
        } else {
          gsap.fromTo(
            el,
            { y: 10, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: animDuration,
              delay,
              ease: "power2.out",
              scrollTrigger: triggerConfig,
            }
          );
        }
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 7: KINETIC (High-Velocity Typographic Lock, 0.55–0.7s)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "kinetic") {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            letterSpacing: "0.15em",
            y: 15,
            scale: 0.97,
          },
          {
            opacity: 1,
            letterSpacing: "normal",
            y: 0,
            scale: 1,
            duration: duration ?? (isMobile ? 0.55 : 0.68),
            delay,
            ease: "power3.out",
            scrollTrigger: triggerConfig,
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 8: COUNTER (Numeric Metric Rollover / Count-Up)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "counter") {
        const targetValue = counterTarget ?? (parseFloat(rawText) || 100);
        const obj = { val: 0 };
        const animDuration = duration ?? 1.2;

        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              ...triggerConfig,
              onEnter: () => {
                gsap.to(obj, {
                  val: targetValue,
                  duration: animDuration,
                  ease: "expo.out",
                  onUpdate: () => {
                    const formatted = Number.isInteger(targetValue)
                      ? Math.round(obj.val).toString()
                      : obj.val.toFixed(1);
                    el.innerText = `${counterPrefix}${formatted}${counterSuffix}`;
                  },
                });
              },
            },
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 9: BADGE (Micro Pill Scale + Subtle Tracking, 0.3s)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "badge") {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.9, y: 8 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: duration ?? 0.32,
            delay,
            ease: "power2.out",
            scrollTrigger: triggerConfig,
          }
        );
      }

      // ────────────────────────────────────────────────────────────────────────
      // VARIANT 10: BUTTON (Kinetic CTA Entry, 0.35s)
      // ────────────────────────────────────────────────────────────────────────
      else if (variant === "button") {
        gsap.fromTo(
          el,
          { opacity: 0, y: 10, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: duration ?? 0.36,
            delay,
            ease: "power3.out",
            scrollTrigger: triggerConfig,
          }
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [variant, rawText, delay, duration, stagger, threshold, once],
    }
  );

  const Tag = Component as any;

  // Project titles use character tokens for elastic overshoot
  if (variant === "project" && chars.length > 0) {
    return (
      <Tag
        ref={containerRef}
        aria-label={rawText || undefined}
        style={style}
        className={`${className} inline-block`}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="aevion-char-token inline-block will-change-transform"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </span>
        ))}
      </Tag>
    );
  }

  // Display and Section titles use responsive inline-block masked word wrapping
  // Spaces are outside the mask so native browser text flow handles responsive wrapping seamlessly!
  if ((variant === "display" || variant === "section") && words.length > 0) {
    return (
      <Tag
        ref={containerRef}
        aria-label={rawText || undefined}
        style={style}
        className={className}
      >
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span className="inline-block whitespace-nowrap overflow-hidden align-baseline py-[0.06em] -my-[0.06em]">
              <span className="aevion-token inline-block will-change-transform">
                {word}
              </span>
            </span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  // Paragraph with native responsive inline token wrapping for fast, readable reveals
  if (variant === "paragraph" && rawText && !children && words.length > 0) {
    return (
      <Tag
        ref={containerRef}
        aria-label={rawText || undefined}
        style={style}
        className={className}
      >
        {words.map((word, i) => (
          <React.Fragment key={i}>
            <span className="aevion-token inline-block will-change-transform">
              {word}
            </span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  // Fallback direct rendering for other variants or complex React node children
  return (
    <Tag
      ref={containerRef}
      style={style}
      className={`${className} ${variant === "badge" || variant === "button" ? "will-change-transform" : ""}`}
    >
      {rawText || children}
    </Tag>
  );
}

export default AevionText;
