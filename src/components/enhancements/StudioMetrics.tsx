"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Globe, Server, Cpu, ShieldCheck, X } from "lucide-react";

interface StudioMetricsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudioMetrics({ isOpen, onClose }: StudioMetricsProps) {
  const regions = [
    { name: "US-East (N. Virginia)", ping: "14ms", status: "Healthy" },
    { name: "EU-Central (Frankfurt)", ping: "22ms", status: "Healthy" },
    { name: "AP-East (Tokyo)", ping: "38ms", status: "Healthy" },
    { name: "SA-East (São Paulo)", ping: "54ms", status: "Healthy" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-xl bg-gray-950 border border-blue-500/30 rounded-3xl shadow-2xl overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 bg-black/60 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                <Activity size={16} />
                <span>Aevion Global Edge & Telemetry</span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="p-5 space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>Global Uptime</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">99.99%</div>
                </div>

                <div className="bg-gray-900/80 border border-gray-800 p-3.5 rounded-2xl">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Cpu size={14} className="text-purple-400" />
                    <span>Active Edge Nodes</span>
                  </div>
                  <div className="text-lg font-bold text-white font-mono">32 Regions</div>
                </div>
              </div>

              {/* Edge Latency Stream */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                  <Globe size={12} className="text-blue-400" /> Edge Network Latency
                </h4>
                <div className="space-y-2">
                  {regions.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 bg-black/40 border border-gray-800/80 rounded-xl"
                    >
                      <span className="text-gray-300 font-medium">{r.name}</span>
                      <div className="flex items-center gap-3 font-mono text-[11px]">
                        <span className="text-emerald-400">{r.ping}</span>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          {r.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
