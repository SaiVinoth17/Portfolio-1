"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-20 text-center font-mono selection:bg-emerald-500 selection:text-black">
      <div className="max-w-lg mx-auto space-y-6 p-8 rounded-3xl bg-zinc-950 border border-emerald-500/30 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-2xl mx-auto">
          404
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">SYSTEM EXCEPTION // ROUTE NOT FOUND</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-sans">
            Coordinate Does Not Exist
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            The requested digital coordinate could not be resolved on the Aevion Studio edge network.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/5 text-[11px] text-zinc-400 text-left space-y-1">
          <span className="text-emerald-400 font-bold block">RECOVERY SUGGESTIONS:</span>
          <p>• Verify URL parameters or route path</p>
          <p>• Use Cmd+K / Ctrl+K to open global Command Palette</p>
          <p>• Return to home portal</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
          >
            <Home size={14} /> Return to Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 bg-zinc-900 border border-white/10 text-white hover:border-emerald-500/40 text-xs rounded-xl transition-all flex items-center gap-1.5"
          >
            <Compass size={14} /> Explore Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
