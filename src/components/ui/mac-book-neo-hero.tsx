"use client";

import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";

export type FrameSequenceStep = {
  from: number;
  to: number;
  color: string;
  num: string;
  total: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  label: string;
};

export type FrameSequenceHeroProps = {
  frameCount: number;
  framePath: (i: number) => string;
  eagerCount?: number;
  scrollHeight?: string;
  brand?: React.ReactNode;
  navLinks?: { label: string; href: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  title: React.ReactNode;
  subtitle?: string;
  steps: FrameSequenceStep[];
  className?: string;
};

const cx = (...c: (string | false | null | undefined)[]) =>
  c.filter(Boolean).join(" ");

export function FrameSequenceHero({
  frameCount,
  framePath,
  eagerCount = 80,
  scrollHeight = "600vh",
  brand,
  navLinks = [],
  ctaLabel,
  ctaHref = "#",
  title,
  subtitle,
  steps,
  className,
}: FrameSequenceHeroProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cacheRef = useRef<Array<HTMLImageElement | null>>([]);
  const requestedRef = useRef<Set<number>>(new Set());
  const loadedCountRef = useRef(0);
  const targetFrameRef = useRef(0);
  const displayFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);
  const rafActiveRef = useRef(false);

  const [loadPct, setLoadPct] = useState(0);
  const [loaderDone, setLoaderDone] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [subHidden, setSubHidden] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(-1);
  const [progress, setProgress] = useState(0);
  const [stepLocal, setStepLocal] = useState(0);

  // Triple-safe pinning state: "top" | "fixed" | "bottom"
  const [pinMode, setPinMode] = useState<"top" | "fixed" | "bottom">("top");

  // High-performance canvas draw function (zero DOM thrashing, zero flicker)
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let img = cacheRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) {
        let bestImg: HTMLImageElement | null = null;
        for (let offset = 1; offset <= 30; offset++) {
          const prev = frameIndex - offset;
          if (prev >= 0 && cacheRef.current[prev]?.complete && cacheRef.current[prev]!.naturalWidth > 0) {
            bestImg = cacheRef.current[prev];
            break;
          }
          const next = frameIndex + offset;
          if (next < frameCount && cacheRef.current[next]?.complete && cacheRef.current[next]!.naturalWidth > 0) {
            bestImg = cacheRef.current[next];
            break;
          }
        }
        img = bestImg;
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (iw === 0 || ih === 0) return;

      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
      lastDrawnFrameRef.current = frameIndex;
    },
    [frameCount]
  );

  // Progressive frame loader with caching
  const loadFrame = useCallback(
    (index: number) => {
      if (index < 0 || index >= frameCount) return;
      if (requestedRef.current.has(index)) return;

      requestedRef.current.add(index);
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(index + 1);

      img.onload = () => {
        cacheRef.current[index] = img;
        loadedCountRef.current += 1;
        setLoadPct(Math.round((loadedCountRef.current / Math.min(frameCount, 120)) * 100));

        if (lastDrawnFrameRef.current === -1 && index === 0) {
          setLoaderDone(true);
          drawFrame(0);
        } else if (Math.abs(index - Math.round(displayFrameRef.current)) <= 1) {
          drawFrame(index);
        }
      };

      img.onerror = () => {
        cacheRef.current[index] = null;
      };
    },
    [frameCount, framePath, drawFrame]
  );

  // Windowed prefetching around active scroll target
  const prefetchWindow = useCallback(
    (center: number, radius = 25) => {
      const start = Math.max(0, center - radius);
      const end = Math.min(frameCount - 1, center + radius);
      for (let i = start; i <= end; i++) {
        loadFrame(i);
      }
    },
    [frameCount, loadFrame]
  );

  // Smooth animation loop using velocity interpolation
  const loop = useCallback(() => {
    if (rafActiveRef.current) return;
    rafActiveRef.current = true;

    const tick = () => {
      const diff = targetFrameRef.current - displayFrameRef.current;
      if (Math.abs(diff) < 0.05) {
        displayFrameRef.current = targetFrameRef.current;
      } else {
        displayFrameRef.current += diff * 0.45;
      }

      const idx = Math.max(0, Math.min(frameCount - 1, Math.round(displayFrameRef.current)));
      if (idx !== lastDrawnFrameRef.current) {
        drawFrame(idx);
      }

      if (Math.abs(displayFrameRef.current - targetFrameRef.current) > 0.05) {
        requestAnimationFrame(tick);
      } else {
        rafActiveRef.current = false;
      }
    };
    requestAnimationFrame(tick);
  }, [frameCount, drawFrame]);

  // Initial Keyframe Stratification
  useEffect(() => {
    cacheRef.current = new Array(frameCount).fill(null);
    requestedRef.current.clear();
    loadedCountRef.current = 0;

    loadFrame(0);

    for (let i = 0; i <= Math.min(35, frameCount - 1); i++) {
      loadFrame(i);
    }

    for (let i = 0; i < frameCount; i += 12) {
      loadFrame(i);
    }

    const timer = setTimeout(() => setLoaderDone(true), 800);
    return () => clearTimeout(timer);
  }, [frameCount, loadFrame]);

  // Accurate Relative Scroll Tracking & Pinning Mode
  const onScroll = useCallback(() => {
    const root = rootRef.current;
    if (!root) return;

    const rect = root.getBoundingClientRect();
    const total = root.offsetHeight - window.innerHeight;
    if (total <= 0) return;

    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / total));
    const targetFrame = p * (frameCount - 1);

    // Fail-safe Pin Mode calculation
    if (scrolled < 0) {
      setPinMode("top");
    } else if (scrolled >= 0 && scrolled <= total) {
      setPinMode("fixed");
    } else {
      setPinMode("bottom");
    }

    targetFrameRef.current = targetFrame;
    prefetchWindow(Math.round(targetFrame), 25);
    loop();
    setProgress(p);

    setNavScrolled(scrolled > 20);
    setSubHidden(scrolled > 40);

    let idx = -1;
    let local = 0;
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      if (p >= s.from && p < s.to) {
        idx = i;
        local = (p - s.from) / (s.to - s.from);
        break;
      }
    }
    setActiveIdx(idx);
    setStepLocal(Math.max(0, Math.min(1, local)));
  }, [steps, frameCount, loop, prefetchWindow]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const rafId = requestAnimationFrame(() => onScroll());

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  // Resize canvas according to device pixel ratio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver(() => {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        drawFrame(Math.round(displayFrameRef.current));
      }
    });

    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame]);

  // Stage CSS class according to pinMode
  const stagePositionClass =
    pinMode === "fixed"
      ? "fixed inset-0 z-10"
      : pinMode === "bottom"
      ? "absolute bottom-0 left-0 right-0 z-10"
      : "absolute top-0 left-0 right-0 z-10";

  return (
    <div
      ref={rootRef}
      className={cx("fsh-root relative w-full bg-white text-zinc-900", className)}
      style={{ height: scrollHeight, minHeight: "600vh" }}
    >
      {/* Loading overlay with smooth fadeout */}
      <div
        aria-hidden
        className={cx("fsh-loader", loaderDone && "fsh-loader-done")}
      >
        <div className="fsh-loader-text">
          {loadPct < 100 ? `Loading Sequence · ${loadPct}%` : "Sequence Ready"}
        </div>
        <div className="fsh-loader-track">
          <span
            className="fsh-loader-fill"
            style={{ width: `${Math.max(loadPct, 15)}%` }}
          />
        </div>
      </div>

      {/* Navigation Header */}
      <nav className={cx("fsh-nav", navScrolled && "fsh-nav-scrolled")}>
        <div className="fsh-brand">{brand}</div>
        {navLinks.length > 0 && (
          <div className="fsh-nav-links">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        )}
        {ctaLabel && (
          <a href={ctaHref} className="fsh-cta">
            {ctaLabel}
          </a>
        )}
      </nav>

      {/* Guaranteed Pinned Stage: Never scrolls out of view or goes black */}
      <div
        className={cx(
          "fsh-stage h-screen w-full overflow-hidden flex items-center justify-center bg-white",
          stagePositionClass
        )}
      >
        <div className="fsh-canvas-wrap absolute inset-0 flex items-center justify-center pointer-events-none bg-white">
          <canvas
            ref={canvasRef}
            className="fsh-canvas w-full h-full object-contain pointer-events-none select-none"
          />
        </div>

        {/* Copy Header (Fades as user scrolls) */}
        <div
          className="fsh-copy transition-all duration-300 pointer-events-none"
          style={{
            opacity: Math.max(0, 1 - progress * 5),
            transform: `translateY(${-progress * 60}px)`,
          }}
        >
          <h1 className="fsh-title">{title}</h1>
          {subtitle && (
            <p className={cx("fsh-sub", subHidden && "fsh-sub-hidden")}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Dynamic Step Architecture Cards */}
        <div className="fsh-cards">
          {steps.map((s, i) => {
            const isActive = activeIdx === i;
            const isPrev = activeIdx >= 0 && i < activeIdx;
            return (
              <article
                key={i}
                style={{ ["--c" as any]: s.color }}
                className={cx(
                  "fsh-card",
                  isActive && "fsh-card-active",
                  isPrev && "fsh-card-prev"
                )}
              >
                <div className="fsh-card-inner">
                  <span aria-hidden className="fsh-card-glow" />
                  <div className="fsh-card-head">
                    <span className="fsh-card-num">
                      <strong>{s.num}</strong> / {s.total}
                    </span>
                    <span aria-hidden className="fsh-card-icon">
                      {s.icon ?? "✦"}
                    </span>
                  </div>
                  <h3 className="fsh-card-title">{s.title}</h3>
                  <p className="fsh-card-desc">{s.description}</p>
                  <div className="fsh-card-foot">
                    <div className="fsh-ticks">
                      {steps.map((_, j) => {
                        const done = j < activeIdx;
                        const cur = j === activeIdx;
                        return (
                          <i key={j} className="fsh-tick">
                            <span
                              style={{
                                transform: `scaleX(${done ? 1 : cur ? stepLocal : 0})`,
                                transition: done ? "none" : "transform 160ms linear",
                              }}
                            />
                          </i>
                        );
                      })}
                    </div>
                    <span className="fsh-card-label">{s.label}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Global Progress Bar at stage bottom */}
        <div className="fsh-progress">
          <span
            className="fsh-progress-fill"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default FrameSequenceHero;
