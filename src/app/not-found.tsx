"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles, Terminal } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center selection:bg-emerald-500 selection:text-black">
      <div className="space-y-6 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono"
        >
          <Terminal size={14} /> ERROR 404 • ROUTE NOT FOUND
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl sm:text-8xl font-bold tracking-tight text-white font-mono"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans"
        >
          The page or system resource you requested does not exist or has been moved within the Aevion Studio network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-4 flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs rounded-2xl transition-all inline-flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <Home size={16} /> Return to Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white font-bold text-xs rounded-2xl transition-all inline-flex items-center gap-2"
          >
            Explore Projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
