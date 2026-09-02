"use client";

import React, { ReactNode, useState } from "react";
import { CustomCursor } from "./CustomCursor";
import { AmbientBackground } from "./AmbientBackground";
import { DynamicLightingEngine } from "./DynamicLightingEngine";
import { PerformanceDashboard } from "./PerformanceDashboard";
import { EasterEggs } from "./EasterEggs";
import { AevionAI } from "./AevionAI";
import { CommandPalette } from "./CommandPalette";
import { DeveloperTerminal } from "./DeveloperTerminal";
import { StudioMetrics } from "./StudioMetrics";

interface EnhancementProviderProps {
  children: ReactNode;
}

export default function EnhancementProvider({ children }: EnhancementProviderProps) {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);

  return (
    <>
      <CustomCursor />
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
