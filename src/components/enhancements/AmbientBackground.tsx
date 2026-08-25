"use client";

import React, { useEffect, useRef } from "react";

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Prefer reduced motion — skip entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Lean particle pool — fewer for background ambient layer
    const particleCount = Math.min(Math.floor((width * height) / 35000), 28);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.2 + 0.04,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      // Pre-computed per-particle phase offsets avoid per-frame shared `time` trig
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseDirty = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseDirty = true;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;
    // Throttle ambient canvas to ~30 FPS (every 2nd frame)
    let skip = false;

    const render = () => {
      animationId = requestAnimationFrame(render);
      skip = !skip;
      if (skip) return; // Run at ~30fps — ambient layer doesn't need 60fps

      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // Light Bloom Gradient — only recompute when mouse moved
      if (mouseDirty) {
        mouseDirty = false;
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 10,
          mouseX, mouseY, Math.max(width, height) * 0.5
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.018)");
        gradient.addColorStop(0.5, "rgba(100, 150, 255, 0.007)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Render Floating Micro-Particles
      particles.forEach((p) => {
        // Use cheap sine approximation via pre-offset phases
        p.x += p.vx + Math.sin(time + p.phaseX) * 0.08;
        p.y += p.vy + Math.cos(time + p.phaseY) * 0.08;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-50"
    />
  );
}
