"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, Clock, Activity, ArrowUpRight, ShieldCheck } from "lucide-react";

const PROJECT_TYPES = [
  { id: "ai", label: "AI Application", timeline: "3–5 Weeks", complexity: "High" },
  { id: "saas", label: "Full-Stack SaaS", timeline: "4–8 Weeks", complexity: "Enterprise" },
  { id: "web", label: "Modern Web App", timeline: "2–4 Weeks", complexity: "Medium" },
  { id: "3d", label: "3D / Motion Web", timeline: "3–6 Weeks", complexity: "High" },
  { id: "consulting", label: "Technical Consulting", timeline: "Flexible", complexity: "Strategic" },
];

const BUDGET_RANGES = ["$5k – $15k", "$15k – $30k", "$30k+", "Monthly Retainer"];

function LiveClock({ zone, label }: { zone: string; label: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-US", { timeZone: zone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [zone]);

  return (
    <div className="text-center">
      <div className="text-[10px] font-mono text-cyan-600 tracking-widest mb-1">{label}</div>
      <div className="text-2xl font-mono font-bold text-cyan-300 tabular-nums tracking-wider">{time}</div>
    </div>
  );
}

function HUDLine() {
  return (
    <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #06b6d420, #06b6d4, #06b6d420, transparent)" }} />
  );
}

function PulseRing() {
  return (
    <div className="relative w-2.5 h-2.5">
      <div className="absolute inset-0 rounded-full bg-cyan-400" />
      <motion.div
        className="absolute inset-0 rounded-full bg-cyan-400"
        animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "", email: "", projectType: "AI Application", budget: "$5k – $15k", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [transmitting, setTransmitting] = useState(false);

  const selectedType = PROJECT_TYPES.find((t) => t.label === formState.projectType) || PROJECT_TYPES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setTransmitting(true);
    setTimeout(() => { setTransmitting(false); setSubmitted(true); }, 1800);
  };

  return (
    <main
      className="min-h-screen text-white selection:bg-cyan-500 selection:text-black"
      style={{ background: "#050810" }}
    >
      {/* HUD grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Mission Control Header */}
        <section className="mb-16">
          <HUDLine />
          <div className="flex items-center justify-between py-4 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <PulseRing />
              <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-400">AEVION MISSION CONTROL · CONTACT UPLINK</div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-600">
              <Activity size={11} />
              <span>SYSTEMS OPERATIONAL</span>
            </div>
          </div>
          <HUDLine />
        </section>

        {/* Live Clocks Row */}
        <section className="mb-16">
          <div
            className="rounded-3xl border p-6 flex items-center justify-around gap-4 flex-wrap"
            style={{ background: "#06b6d408", borderColor: "#06b6d420" }}
          >
            <LiveClock zone="Asia/Kolkata" label="IST · STUDIO" />
            <div className="w-px h-10 bg-cyan-500/20 hidden sm:block" />
            <LiveClock zone="America/New_York" label="EST · NEW YORK" />
            <div className="w-px h-10 bg-cyan-500/20 hidden sm:block" />
            <LiveClock zone="Europe/London" label="GMT · LONDON" />
            <div className="w-px h-10 bg-cyan-500/20 hidden sm:block" />
            <LiveClock zone="America/Los_Angeles" label="PST · SF BAY" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Establish<br />
                <span style={{ background: "linear-gradient(135deg, #06b6d4, #0ea5e9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Contact.
                </span>
              </h1>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Transmit your project brief. We'll acknowledge within 24 hours and schedule a mission debrief.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: Mail, label: "UPLINK ADDRESS", value: "hello@aevion.studio", href: "mailto:hello@aevion.studio" },
                { icon: MapPin, label: "BASE OF OPERATIONS", value: "The Nilgiri Hills, India" },
                { icon: Clock, label: "RESPONSE TIME", value: "< 24 Hours" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-5 rounded-2xl border"
                    style={{ borderColor: "#06b6d418", background: "#06b6d408" }}
                  >
                    <div className="p-2.5 rounded-xl" style={{ background: "#06b6d415" }}>
                      <Icon size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-600">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-white hover:text-cyan-300 transition-colors">{item.value}</a>
                      ) : (
                        <div className="text-sm text-white">{item.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-5 rounded-2xl border" style={{ borderColor: "#06b6d418", background: "#06b6d408" }}>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={14} className="text-cyan-400" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-500">NDA READY</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">All project conversations are protected under mutual NDA by default. Your IP is safe.</p>
            </div>
          </div>

          {/* Right: Mission brief form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl border p-8 relative overflow-hidden"
              style={{ background: "#06080f", borderColor: "#06b6d420" }}
            >
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-500/40 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-500/40 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-500/40 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-500/40 rounded-br-lg" />

              <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-500 mb-6">
                MISSION BRIEF // TRANSMIT
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { label: "CALLSIGN (NAME)", key: "name", type: "text", placeholder: "Your name" },
                        { label: "FREQUENCY (EMAIL)", key: "email", type: "email", placeholder: "your@email.com" },
                      ].map(({ label, key, type, placeholder }) => (
                        <div key={key}>
                          <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">{label}</label>
                          <input
                            type={type}
                            placeholder={placeholder}
                            value={formState[key as keyof typeof formState]}
                            onChange={(e) => setFormState(prev => ({ ...prev, [key]: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 border outline-none transition-colors bg-transparent focus:border-cyan-500"
                            style={{ borderColor: "#06b6d425", background: "#ffffff05" }}
                            required
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">MISSION TYPE</label>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, projectType: t.label }))}
                            className="px-3 py-1.5 rounded-xl text-xs font-mono transition-all border"
                            style={{
                              borderColor: formState.projectType === t.label ? "#06b6d4" : "#06b6d420",
                              background: formState.projectType === t.label ? "#06b6d418" : "transparent",
                              color: formState.projectType === t.label ? "#06b6d4" : "#6b7280",
                            }}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                      {selectedType && (
                        <div className="mt-2 text-[10px] font-mono text-cyan-600/60">
                          → TIMELINE: {selectedType.timeline} · COMPLEXITY: {selectedType.complexity}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">BUDGET RANGE</label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGET_RANGES.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormState(prev => ({ ...prev, budget: b }))}
                            className="px-3 py-1.5 rounded-xl text-xs font-mono transition-all border"
                            style={{
                              borderColor: formState.budget === b ? "#06b6d4" : "#06b6d420",
                              background: formState.budget === b ? "#06b6d418" : "transparent",
                              color: formState.budget === b ? "#06b6d4" : "#6b7280",
                            }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">MISSION BRIEF</label>
                      <textarea
                        placeholder="Describe your project, goals, and any technical requirements..."
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-zinc-600 border outline-none resize-none transition-colors bg-transparent focus:border-cyan-500"
                        style={{ borderColor: "#06b6d425", background: "#ffffff05" }}
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={transmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-black relative overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #06b6d4, #0ea5e9)", boxShadow: "0 0 40px #06b6d430" }}
                    >
                      {transmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Transmitting...
                        </>
                      ) : (
                        <>Transmit Mission Brief <Send size={15} /></>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center"
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                      style={{ background: "#06b6d420", border: "2px solid #06b6d460" }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowUpRight className="text-cyan-400" size={24} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Signal Received.</h3>
                    <p className="text-cyan-400 font-mono text-sm">Uplink established · Response incoming within 24 hours</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
