"use client";

import React, { useState } from "react";
import ClickSpark from "@/components/ui/ClickSpark";
import { Sparkles, Sliders, Play, Copy, Check, RefreshCw } from "lucide-react";

const COLOR_PRESETS = [
  { name: "Emerald Neon", value: "#10b981" },
  { name: "Cyan Plasma", value: "#06b6d4" },
  { name: "Supernova Gold", value: "#f59e0b" },
  { name: "Pure White", value: "#ffffff" },
  { name: "Hyper Crimson", value: "#f43f5e" },
  { name: "Ultraviolet", value: "#a855f7" },
];

const EASING_OPTIONS = ["ease-out", "ease-in", "ease-in-out", "linear"];

export default function ClickSparkLab() {
  const [sparkColor, setSparkColor] = useState("#10b981");
  const [sparkSize, setSparkSize] = useState(14);
  const [sparkRadius, setSparkRadius] = useState(25);
  const [sparkCount, setSparkCount] = useState(10);
  const [duration, setDuration] = useState(450);
  const [easing, setEasing] = useState("ease-out");
  const [extraScale, setExtraScale] = useState(1.2);
  const [clickCount, setClickCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const resetDefaults = () => {
    setSparkColor("#10b981");
    setSparkSize(14);
    setSparkRadius(25);
    setSparkCount(10);
    setDuration(450);
    setEasing("ease-out");
    setExtraScale(1.2);
  };

  const copyCode = () => {
    const code = `<ClickSpark
  sparkColor='${sparkColor}'
  sparkSize={${sparkSize}}
  sparkRadius={${sparkRadius}}
  sparkCount={${sparkCount}}
  duration={${duration}}
  easing='${easing}'
  extraScale={${extraScale}}
>
  {/* Your content here */}
</ClickSpark>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col bg-zinc-950 font-mono text-xs">
      {/* Interactive Spark Stage */}
      <div className="relative w-full h-[65vh] min-h-[440px] border-b border-white/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/60 via-black to-black overflow-hidden select-none">
        <ClickSpark
          sparkColor={sparkColor}
          sparkSize={sparkSize}
          sparkRadius={sparkRadius}
          sparkCount={sparkCount}
          duration={duration}
          easing={easing}
          extraScale={extraScale}
          onClick={() => setClickCount((c) => c + 1)}
          className="w-full h-full cursor-crosshair flex flex-col items-center justify-center p-6 text-center"
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Interactive target core */}
          <div className="relative z-10 max-w-xl space-y-6 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur text-zinc-400 text-[11px]">
              <Sparkles size={13} style={{ color: sparkColor }} />
              <span>Interactive Particle Target</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
                Click anywhere to spark
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-md mx-auto">
                Real-time 2D Canvas particle emitter with trigonometric trajectory vectors and hardware-accelerated rendering.
              </p>
            </div>

            {/* Click statistics & trigger buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl font-sans font-semibold text-black transition-transform active:scale-95 shadow-lg flex items-center gap-2 text-xs"
                style={{
                  backgroundColor: sparkColor,
                  boxShadow: `0 0 20px -3px ${sparkColor}66`,
                }}
              >
                <Play size={12} fill="currentColor" />
                Trigger Blast
              </button>

              <div className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-300 flex items-center gap-2 text-xs">
                <span>Sparks Emitted:</span>
                <span className="font-bold text-white">
                  {(clickCount * sparkCount).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 text-[10px] text-zinc-600">
            RADIAL EMITTER ACTIVE · CANVAS 2D CONTEXT
          </div>
        </ClickSpark>
      </div>

      {/* Realtime Tuning Controls & Code Generator */}
      <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Parameter Sliders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-sm text-white font-semibold font-sans">
              <Sliders size={16} className="text-emerald-400" />
              <span>Particle Parameter Matrix</span>
            </div>
            <button
              onClick={resetDefaults}
              type="button"
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-[11px]"
            >
              <RefreshCw size={11} /> Reset Defaults
            </button>
          </div>

          {/* Color Palettes */}
          <div className="space-y-2">
            <label className="text-[11px] text-zinc-400">Spark Color ({sparkColor})</label>
            <div className="flex flex-wrap items-center gap-2">
              {COLOR_PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setSparkColor(p.value)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] flex items-center gap-1.5 transition-all ${
                    sparkColor === p.value
                      ? "border-white text-white bg-white/10"
                      : "border-white/10 text-zinc-400 hover:text-white bg-zinc-900/60"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: p.value }}
                  />
                  <span>{p.name}</span>
                </button>
              ))}
              <input
                type="color"
                value={sparkColor}
                onChange={(e) => setSparkColor(e.target.value)}
                className="w-7 h-7 rounded border border-white/20 bg-transparent cursor-pointer"
                title="Custom color"
              />
            </div>
          </div>

          {/* Slider Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">sparkCount</span>
                <span className="text-emerald-400 font-bold">{sparkCount} lines</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                step="1"
                value={sparkCount}
                onChange={(e) => setSparkCount(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">sparkSize</span>
                <span className="text-emerald-400 font-bold">{sparkSize} px</span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                step="1"
                value={sparkSize}
                onChange={(e) => setSparkSize(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">sparkRadius</span>
                <span className="text-emerald-400 font-bold">{sparkRadius} px</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="1"
                value={sparkRadius}
                onChange={(e) => setSparkRadius(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">duration</span>
                <span className="text-emerald-400 font-bold">{duration} ms</span>
              </div>
              <input
                type="range"
                min="150"
                max="1200"
                step="25"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">extraScale</span>
                <span className="text-emerald-400 font-bold">{extraScale.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={extraScale}
                onChange={(e) => setExtraScale(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 space-y-2">
              <div className="flex justify-between text-[11px]">
                <span className="text-zinc-400">easing</span>
                <span className="text-emerald-400 font-bold">{easing}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {EASING_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setEasing(opt)}
                    className={`py-1 rounded text-[10px] transition-colors ${
                      easing === opt
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-zinc-800/60 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Code Generator */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-sm text-white font-semibold font-sans">
              Generated JSX Usage
            </span>
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-white transition-colors text-[11px]"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy Code
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-black border border-white/10 text-[11px] text-zinc-300 overflow-x-auto leading-relaxed">
{`import ClickSpark from '@/components/ClickSpark';

<ClickSpark
  sparkColor="${sparkColor}"
  sparkSize={${sparkSize}}
  sparkRadius={${sparkRadius}}
  sparkCount={${sparkCount}}
  duration={${duration}}
  easing="${easing}"
  extraScale={${extraScale}}
>
  <button className="your-button-class">
    Click Me
  </button>
</ClickSpark>`}
          </pre>

          <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 space-y-2 text-zinc-400 text-[11px]">
            <div className="text-white font-semibold">Implementation Tip</div>
            <p>
              <code className="text-emerald-400 font-mono">&lt;ClickSpark /&gt;</code> seamlessly wraps any React component, button, hero card, or entire section without intercepting pointer events from nested buttons or links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
