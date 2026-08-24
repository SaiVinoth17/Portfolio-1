"use client";

import React from "react";
import { FrameSequenceHero, type FrameSequenceStep } from "@/components/ui/mac-book-neo-hero";

const FRAME_COUNT = 941;
const framePath = (i: number) =>
  `https://raw.githubusercontent.com/duthiljean/hero-apple/main/frames/frame_${String(i).padStart(4, "0")}.jpg`;

const steps: FrameSequenceStep[] = [
  {
    from: 0.02,
    to: 0.28,
    color: "#ff9f3a",
    num: "01",
    total: "04",
    icon: "✦",
    title: "Five vivid colors.",
    description: "Bright yellow, soft pink, deep blue, silver, and midnight. Pick the one that's you.",
    label: "Colors",
  },
  {
    from: 0.28,
    to: 0.55,
    color: "#ff6f9c",
    num: "02",
    total: "04",
    icon: "◐",
    title: "A refined silhouette.",
    description: "11.3 mm thin, 1.24 kg light. The most portable MacBook ever built.",
    label: "Design",
  },
  {
    from: 0.55,
    to: 0.82,
    color: "#5e9bff",
    num: "03",
    total: "04",
    icon: "▣",
    title: "A display that captivates.",
    description: "Liquid Retina XDR, 1,000 nits sustained. ProMotion 120 Hz for silky-smooth motion.",
    label: "Display",
  },
  {
    from: 0.82,
    to: 1.01,
    color: "#a37bff",
    num: "04",
    total: "04",
    icon: "⌁",
    title: "Built to last all day.",
    description: "Up to 22 hours of battery life. Whisper-quiet, wherever you go.",
    label: "Battery",
  },
];

export default function MacBookNeoHeroDemo() {
  return (
    <FrameSequenceHero
      frameCount={FRAME_COUNT}
      framePath={framePath}
      eagerCount={140}
      scrollHeight="600vh"
      brand={
        <div className="flex items-center gap-3">
          <a
            href="/showcase"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-[11px] font-mono font-bold text-black transition-all"
          >
            ← 3D LAB
          </a>
          <span className="flex items-center gap-1.5">
            <span className="fsh-brand-dot" />
            neo.
          </span>
        </div>
      }
      navLinks={[
        { label: "Overview", href: "#" },
        { label: "Specs", href: "#" },
        { label: "Colors", href: "#" },
        { label: "Support", href: "#" },
      ]}
      ctaLabel="Buy"
      ctaHref="#"
      title={
        <>
          <span className="fsh-title-dark">MacBook</span>{" "}
          <span className="fsh-title-rainbow">Neo</span>
        </>
      }
      subtitle="Scroll to explore."
      steps={steps}
    />
  );
}
