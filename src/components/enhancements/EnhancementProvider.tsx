"use client";

import React, { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/ClickSpark";
import { AmbientBackground } from "./AmbientBackground";
import { DynamicLightingEngine } from "./DynamicLightingEngine";

// Code-split heavy interactive overlays that use framer-motion, terminal emulation, and audio synthesis
const PerformanceDashboard = dynamic(
  () => import("./PerformanceDashboard").then((m) => m.PerformanceDashboard),
  { ssr: false }
);

const EasterEggs = dynamic(
  () => import("./EasterEggs").then((m) => m.EasterEggs),
  { ssr: false }
);

const AevionAI = dynamic(
  () => import("./AevionAI").then((m) => m.AevionAI),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import("./CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

const DeveloperTerminal = dynamic(
  () => import("./DeveloperTerminal").then((m) => m.DeveloperTerminal),
  { ssr: false }
);

const StudioMetrics = dynamic(
  () => import("./StudioMetrics").then((m) => m.StudioMetrics),
  { ssr: false }
);

interface EnhancementProviderProps {
  children: ReactNode;
}

export default function EnhancementProvider({ children }: EnhancementProviderProps) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);

  return (
    <>
      <ClickSpark
        global
        sparkColor="#34d399"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
        easing="ease-out"
        extraScale={1.1}
      />
      <AmbientBackground />
      <DynamicLightingEngine />
      <PerformanceDashboard />
      <EasterEggs />
      <AevionAI />
      <CommandPalette
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenMetrics={() => setMetricsOpen(true)}
      />
      <DeveloperTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
      <StudioMetrics
        isOpen={metricsOpen}
        onClose={() => setMetricsOpen(false)}
      />
      {children}
    </>
  );
}
