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
      const t = new Date().toLocaleTimeString("en-US", {
        timeZone: zone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [zone]);

  return (
    <div className="text-center p-2">
      <div className="text-[10px] font-mono text-cyan-600 tracking-widest mb-1 uppercase font-bold">{label}</div>
      <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-300 tabular-nums tracking-wider">{time || "--:--:--"}</div>
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
    name: "",
    email: "",
    company: "",
    projectType: "AI Application",
    budget: "$5k – $15k",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [transmitting, setTransmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const selectedType = PROJECT_TYPES.find((t) => t.label === formState.projectType) || PROJECT_TYPES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage("Please enter your name, email, and mission brief.");
      return;
    }

    setTransmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Transmission rejected.");
      }

      setReferenceId(data.referenceId || "AEV-CONFIRMED");
      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err?.message || "Transmission interrupted. You can email hello@aevionstudio.in directly.");
    } finally {
      setTransmitting(false);
    }
  };

  return (
    <main
      className="min-h-[100dvh] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden"
      style={{ background: "#050810" }}
    >
      {/* HUD background grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 pt-28 sm:pt-32 pb-36 sm:pb-28 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Mission Control Header */}
        <section className="mb-10 sm:mb-16">
          <HUDLine />
          <div className="flex items-center justify-between py-4 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <PulseRing />
              <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-400">
                AEVION MISSION CONTROL · CONTACT UPLINK
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-600">
              <Activity size={11} />
              <span>SYSTEMS OPERATIONAL</span>
            </div>
          </div>
          <HUDLine />
        </section>

        {/* Live Clocks 2x2 on Mobile, 4-col on Desktop */}
        <section className="mb-10 sm:mb-16">
          <div
            className="rounded-3xl border p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center"
            style={{ background: "#06b6d408", borderColor: "#06b6d420" }}
          >
            <LiveClock zone="Asia/Kolkata" label="IST · STUDIO" />
            <LiveClock zone="America/New_York" label="EST · NEW YORK" />
            <LiveClock zone="Europe/London" label="GMT · LONDON" />
            <LiveClock zone="America/Los_Angeles" label="PST · SF BAY" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Establish
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Contact.
                </span>
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Transmit your project brief. We&apos;ll acknowledge within 24 hours and schedule a mission debrief.
              </p>
            </div>

            <div className="space-y-3.5">
              {[
                {
                  icon: Mail,
                  label: "UPLINK ADDRESS",
                  value: "hello@aevionstudio.in",
                  href: "mailto:hello@aevionstudio.in",
                },
                {
                  icon: MapPin,
                  label: "BASE OF OPERATIONS",
                  value: "The Nilgiri Hills, India",
                },
                {
                  icon: Clock,
                  label: "RESPONSE TIME",
                  value: "< 24 Hours",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-colors hover:border-cyan-500/30"
                    style={{ borderColor: "#06b6d418", background: "#06b6d408" }}
                  >
                    <div className="p-2.5 rounded-xl shrink-0" style={{ background: "#06b6d415" }}>
                      <Icon size={16} className="text-cyan-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-600 truncate">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-mono text-white hover:text-cyan-300 transition-colors block truncate"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-sm font-mono text-white truncate">{item.value}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="p-4 sm:p-5 rounded-2xl border"
              style={{ borderColor: "#06b6d418", background: "#06b6d408" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={15} className="text-cyan-400" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-500 uppercase">
                  NDA READY
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                All project conversations are protected under mutual NDA by default. Your IP is safe.
              </p>
            </div>
          </div>

          {/* Right: Mission brief form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl border p-5 sm:p-8 relative overflow-hidden"
              style={{ background: "#06080f", borderColor: "#06b6d420" }}
            >
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-500/40 rounded-tl-lg pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-500/40 rounded-tr-lg pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-cyan-500/40 rounded-bl-lg pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-cyan-500/40 rounded-br-lg pointer-events-none" />

              <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-500 mb-6 uppercase">
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">
                          CALLSIGN (NAME) *
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 border outline-none transition-colors bg-transparent focus:border-cyan-500"
                          style={{ borderColor: "#06b6d425", background: "#ffffff05" }}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">
                          FREQUENCY (EMAIL) *
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 border outline-none transition-colors bg-transparent focus:border-cyan-500"
                          style={{ borderColor: "#06b6d425", background: "#ffffff05" }}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">
                          COMPANY / PROJECT
                        </label>
                        <input
                          type="text"
                          placeholder="Company name"
                          value={formState.company}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, company: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 border outline-none transition-colors bg-transparent focus:border-cyan-500"
                          style={{ borderColor: "#06b6d425", background: "#ffffff05" }}
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-300 flex items-center justify-between">
                        <span>{errorMessage}</span>
                        <a
                          href="mailto:hello@aevionstudio.in"
                          className="underline hover:text-white"
                        >
                          Email directly
                        </a>
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">
                        MISSION TYPE
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() =>
                              setFormState((prev) => ({ ...prev, projectType: t.label }))
                            }
                            className="px-3 py-2 sm:py-1.5 rounded-xl text-xs font-mono transition-all border cursor-pointer"
                            style={{
                              borderColor:
                                formState.projectType === t.label ? "#06b6d4" : "#06b6d420",
                              background:
                                formState.projectType === t.label ? "#06b6d418" : "transparent",
                              color: formState.projectType === t.label ? "#06b6d4" : "#9ca3af",
                            }}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                      {selectedType && (
                        <div className="mt-2 text-[10px] font-mono text-cyan-600">
                          → TIMELINE: {selectedType.timeline} · COMPLEXITY: {selectedType.complexity}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">
                        BUDGET RANGE
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGET_RANGES.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setFormState((prev) => ({ ...prev, budget: b }))}
                            className="px-3 py-2 sm:py-1.5 rounded-xl text-xs font-mono transition-all border cursor-pointer"
                            style={{
                              borderColor: formState.budget === b ? "#06b6d4" : "#06b6d420",
                              background: formState.budget === b ? "#06b6d418" : "transparent",
                              color: formState.budget === b ? "#06b6d4" : "#9ca3af",
                            }}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold tracking-widest text-cyan-600 mb-2">
                        MISSION BRIEF *
                      </label>
                      <textarea
                        placeholder="Describe your project, goals, and technical requirements..."
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        className="w-full px-4 py-3 rounded-xl text-base sm:text-sm text-white placeholder-zinc-600 border outline-none resize-none transition-colors bg-transparent focus:border-cyan-500 leading-relaxed"
                        style={{ borderColor: "#06b6d425", background: "#ffffff05" }}
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={transmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-black relative overflow-hidden cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
                        boxShadow: "0 0 30px #06b6d430",
                      }}
                    >
                      {transmitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Transmitting to Studio Core...
                        </>
                      ) : (
                        <>
                          TRANSMIT MISSION BRIEF <Send size={15} />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-16 text-center space-y-4"
                  >
                    <motion.div
                      className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                      style={{ background: "#06b6d420", border: "2px solid #06b6d460" }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowUpRight className="text-cyan-400" size={24} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">TRANSMISSION CONFIRMED.</h3>
                    <p className="text-cyan-400 font-mono text-sm max-w-md mx-auto">
                      Brief logged under <strong className="text-white">{referenceId}</strong>.
                    </p>
                    <p className="text-zinc-400 text-xs font-mono max-w-md mx-auto leading-relaxed">
                      Sai Rio and Edison personally review incoming project briefs. You will receive an architectural response within 24 hours.
                    </p>
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
