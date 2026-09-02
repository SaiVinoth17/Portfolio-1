"use client";

import React from "react";
import { BarChart3, ShieldCheck, Cpu, Globe, Zap, Server } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
          <BarChart3 size={13} /> PRODUCTION TELEMETRY &amp; RUNTIME SPECS
        </div>
        <h1 className="text-3xl font-bold font-mono text-white tracking-tight mt-1">
          SYSTEM TELEMETRY
        </h1>
        <p className="text-xs text-zinc-500 font-mono mt-0.5">
          Real architectural metrics, edge distribution, and security verification
        </p>
      </div>

      {/* Grid: Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Cpu size={16} /> RUNTIME ARCHITECTURE
          </div>
          <div className="space-y-2 text-zinc-300">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">FRAMEWORK</span>
              <span className="text-white font-bold">Next.js 16.1.1 App Router</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">REACT ENGINE</span>
              <span className="text-white">React 19.2.3</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">COMPILER</span>
              <span className="text-emerald-400">Turbopack Verified</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500">TYPING</span>
              <span className="text-white">TypeScript Strict Mode</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-sky-400 font-bold">
            <ShieldCheck size={16} /> SECURITY PROFILE
          </div>
          <div className="space-y-2 text-zinc-300">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">AUTH TYPE</span>
              <span className="text-emerald-400 font-bold">First-Party Email/Pass</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">HASHING</span>
              <span className="text-white">Scrypt + 16-byte Salt</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">SESSIONS</span>
              <span className="text-white">DB-Hashed (SHA-256)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500">COOKIES</span>
              <span className="text-white">HttpOnly, Secure, Lax</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Globe size={16} /> EDGE DISTRIBUTION
          </div>
          <div className="space-y-2 text-zinc-300">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">TARGET DOMAIN</span>
              <span className="text-white font-bold">aevionstudio.in</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">HOSTING</span>
              <span className="text-white">Vercel Global Edge</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-zinc-500">SSL/TLS</span>
              <span className="text-emerald-400">Strict HTTPS</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-zinc-500">INDEXING</span>
              <span className="text-white">Admin Disallowed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
