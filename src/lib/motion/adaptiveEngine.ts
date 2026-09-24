"use client";

/**
 * Adaptive Rendering Engine for Aevion Studio
 * 
 * Dynamically detects display refresh rate (60Hz, 75Hz, 90Hz, 120Hz, 144Hz+)
 * and monitors frame-time stability via an Exponential Moving Average (EMA).
 * Scales visual workload (blurs, WebGL resolution, particle density)
 * without ever capping FPS, assuming 60Hz, or throttling scroll responsiveness.
 */

export type PerformanceTier = 0 | 1 | 2; // 0 = Ultra / Native, 1 = Balanced, 2 = Efficiency

export interface AdaptiveEngineState {
  detectedRefreshRate: number; // e.g. 60, 75, 90, 120, 144
  targetFrameTimeMs: number;  // e.g. 16.67, 13.33, 11.11, 8.33, 6.94
  currentTier: PerformanceTier;
  isTabVisible: boolean;
  averageFps: number;
}

type Listener = (state: AdaptiveEngineState) => void;

class AdaptiveEngine {
  private static instance: AdaptiveEngine;
  private listeners: Set<Listener> = new Set();

  private detectedHz = 60;
  private targetFrameMs = 16.67;
  private currentTier: PerformanceTier = 0;
  private isTabVisible = true;
  private averageFps = 60;

  // Frame timing & measurement
  private isCalibrated = false;
  private sampleCount = 0;
  private sampleDeltas: number[] = [];
  private lastTimestamp = 0;

  // EMA & Hysteresis
  private emaFrameTime = 16.67;
  private dropFrameStreak = 0;
  private cleanFrameStreak = 0;

  private rafId: number | null = null;
  private isRunning = false;

  private constructor() {
    if (typeof window === "undefined") return;

    this.isTabVisible = !document.hidden;
    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    // Initial media query hint (rough hardware check)
    this.detectHardwareBaseline();

    // Start passive calibration on mount
    this.startLoop();
  }

  public static getInstance(): AdaptiveEngine {
    if (!AdaptiveEngine.instance) {
      AdaptiveEngine.instance = new AdaptiveEngine();
    }
    return AdaptiveEngine.instance;
  }

  /**
   * Fast baseline check using screen/media queries where supported
   */
  private detectHardwareBaseline() {
    if (typeof window === "undefined") return;

    // Check high refresh rate indicators
    if (window.matchMedia("(min-resolution: 2dppx)").matches) {
      // Modern high-DPI displays often run at 90Hz, 120Hz, or 144Hz
      this.detectedHz = 120;
      this.targetFrameMs = 1000 / 120;
    }
  }

  private handleVisibilityChange = () => {
    this.isTabVisible = !document.hidden;
    if (typeof document !== "undefined" && document.body) {
      document.body.classList.toggle("tab-hidden", !this.isTabVisible);
    }
    if (this.isTabVisible) {
      this.lastTimestamp = performance.now();
      if (!this.isRunning) this.startLoop();
    }
    this.notify();
  };

  private startLoop() {
    if (this.isRunning || typeof window === "undefined") return;
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private tick = (timestamp: number) => {
    if (!this.isRunning) return;

    // Browser presentations control the loop
    this.rafId = requestAnimationFrame(this.tick);

    // When tab is hidden, skip frame processing
    if (!this.isTabVisible) return;

    const delta = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // Filter out huge anomalous deltas (tab switch, window resize, OS lock)
    if (delta <= 0 || delta > 200) {
      return;
    }

    // 1. Initial Display Refresh Rate Calibration (~30 frames)
    if (!this.isCalibrated) {
      this.sampleDeltas.push(delta);
      this.sampleCount++;

      if (this.sampleCount >= 30) {
        // Discard min and max anomalies, compute median
        const sorted = [...this.sampleDeltas].sort((a, b) => a - b);
        const middleSlice = sorted.slice(5, 25);
        const avgDelta = middleSlice.reduce((sum, d) => sum + d, 0) / middleSlice.length;

        // Map to standard display refresh tiers
        if (avgDelta <= 7.4) {
          this.detectedHz = 144; // 144Hz, 165Hz, 240Hz
        } else if (avgDelta <= 9.2) {
          this.detectedHz = 120; // 120Hz
        } else if (avgDelta <= 11.8) {
          this.detectedHz = 90; // 90Hz
        } else if (avgDelta <= 14.2) {
          this.detectedHz = 75; // 75Hz
        } else {
          this.detectedHz = 60; // 60Hz
        }

        this.targetFrameMs = 1000 / this.detectedHz;
        this.emaFrameTime = this.targetFrameMs;
        this.isCalibrated = true;
        this.applyTier(0);
        if (this.listeners.size === 0) {
          this.isRunning = false;
          return;
        }
      }
      return;
    }

    if (this.isCalibrated && this.listeners.size === 0) {
      this.isRunning = false;
      return;
    }

    // 2. Continuous Health Monitoring with Rolling Exponential Moving Average
    // Alpha = 0.05 gives responsive yet steady frame time tracking
    this.emaFrameTime = this.emaFrameTime * 0.95 + delta * 0.05;
    this.averageFps = Math.round(1000 / this.emaFrameTime);

    // 3. Sustained Frame Drop & Recovery with Hysteresis
    // Allow up to 25% overhead before classifying as a sustained drop
    const dropThresholdMs = this.targetFrameMs * 1.35;
    const severeDropThresholdMs = this.targetFrameMs * 1.7;

    if (delta > dropThresholdMs) {
      this.dropFrameStreak++;
      this.cleanFrameStreak = 0;

      // Tier 1 downgrade: Sustained drops for 40+ consecutive frames (~0.3s–0.6s)
      if (this.currentTier === 0 && this.dropFrameStreak > 40) {
        this.applyTier(1);
        this.dropFrameStreak = 0;
      }
      // Tier 2 downgrade: Severe sustained drops for 60+ frames
      else if (this.currentTier === 1 && (delta > severeDropThresholdMs || this.dropFrameStreak > 60)) {
        this.applyTier(2);
        this.dropFrameStreak = 0;
      }
    } else {
      this.cleanFrameStreak++;
      this.dropFrameStreak = Math.max(0, this.dropFrameStreak - 1);

      // Recovery requires 150 clean consecutive frames (avoids flapping / anti-flicker hysteresis)
      if (this.currentTier > 0 && this.cleanFrameStreak > 150) {
        this.applyTier((this.currentTier - 1) as PerformanceTier);
        this.cleanFrameStreak = 0;
      }
    }
  };

  private applyTier(newTier: PerformanceTier) {
    if (this.currentTier === newTier && document.documentElement.hasAttribute("data-perf-tier")) return;
    this.currentTier = newTier;

    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-perf-tier", String(newTier));
      document.documentElement.style.setProperty("--aevion-perf-tier", String(newTier));
      document.documentElement.style.setProperty(
        "--aevion-dynamic-blur",
        newTier === 0 ? "4px" : "0px"
      );
    }

    this.notify();
  }

  public getState(): AdaptiveEngineState {
    return {
      detectedRefreshRate: this.detectedHz,
      targetFrameTimeMs: this.targetFrameMs,
      currentTier: this.currentTier,
      isTabVisible: this.isTabVisible,
      averageFps: this.averageFps,
    };
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    if (!this.isRunning && this.isTabVisible) {
      this.startLoop();
    }
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0 && this.isCalibrated) {
        this.isRunning = false;
        if (this.rafId) cancelAnimationFrame(this.rafId);
      }
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((fn) => fn(state));
  }

  public destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.isRunning = false;
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    }
    this.listeners.clear();
  }
}

// React Hook for Adaptive Performance in client components
import { useState, useEffect } from "react";

export function useAdaptivePerformance(): AdaptiveEngineState {
  const [state, setState] = useState<AdaptiveEngineState>(() => {
    if (typeof window !== "undefined") {
      return AdaptiveEngine.getInstance().getState();
    }
    return {
      detectedRefreshRate: 60,
      targetFrameTimeMs: 16.67,
      currentTier: 0,
      isTabVisible: true,
      averageFps: 60,
    };
  });

  useEffect(() => {
    const engine = AdaptiveEngine.getInstance();
    return engine.subscribe(setState);
  }, []);

  return state;
}

export const adaptiveEngine = typeof window !== "undefined" ? AdaptiveEngine.getInstance() : null;
export default AdaptiveEngine;
