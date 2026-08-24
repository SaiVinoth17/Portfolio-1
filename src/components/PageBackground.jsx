"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MoltenMetal from "./ui/MoltenMetal";

export default function PageBackground() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <MoltenMetal
        color1="#021f17"
        color2="#059669"
        color3="#6ee7b7"
        speed={0.28}
        scale={3.8}
        detail={3}
        glow={1.4}
        coreSize={0.08}
        swirl={0.8}
        fold={-0.2}
        blackPoint={0.06}
        brightness={1.15}
        colorMode="molten"
        grain={true}
        grainIntensity={0.04}
        mouseInteraction={true}
        mouseStrength={0.25}
        opacity={0.4}
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
    </div>
  );
}
