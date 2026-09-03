"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, ArrowRight, Lock, KeyRound, AlertTriangle, CheckCircle2, Eye, EyeOff } from "lucide-react";

function RestrictedAccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/admin/dashboard";

  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setErrorMessage("Please enter your secret authorization code.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trimmedCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authorization failed.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(redirectTarget);
        router.refresh();
      }, 400);
    } catch (err: any) {
      setErrorMessage(err.message || "Invalid authorization code. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10 space-y-6">
      {/* Security Clearance Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-[11px] uppercase tracking-widest shadow-lg shadow-red-500/10">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <Shield size={13} />
          <span>RESTRICTED ACCESS // LEVEL 4</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono uppercase">
          AEVION // RESTRICTED
        </h1>
        <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
          ENTER SECRET AUTHORIZATION CODE
        </p>
      </div>

      {/* Access Terminal Card */}
      <div className="bg-zinc-950/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6 relative">
        {/* Subtle Top Accent Line */}
        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />

        {errorMessage && (
          <div className="p-4 rounded-xl border border-red-500/40 bg-red-950/30 text-xs font-mono text-red-300 flex items-start gap-3">
            <AlertTriangle size={16} className="shrink-0 mt-0.5 text-red-400" />
            <div className="space-y-0.5">
              <div className="font-bold text-red-200">ACCESS DENIED</div>
              <div className="text-red-300/90">{errorMessage}</div>
            </div>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-950/30 text-xs font-mono text-emerald-300 flex items-center gap-3">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <div>
              <div className="font-bold text-emerald-200">AUTHORIZATION CONFIRMED</div>
              <div className="text-emerald-300/90">Initializing secure administrative session...</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              <label htmlFor="secret-code" className="flex items-center gap-1.5">
                <KeyRound size={12} className="text-red-400" />
                <span>AUTHORIZATION CODE</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">SERVER VALIDATED</span>
            </div>

            <div className="relative">
              <input
                id="secret-code"
                type={showCode ? "text" : "password"}
                autoFocus
                autoComplete="off"
                spellCheck={false}
                placeholder="Enter secret code..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading || success}
                className="w-full bg-black/70 border border-white/15 focus:border-red-500 rounded-xl px-4 py-3.5 pr-12 text-sm sm:text-base text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all font-mono tracking-wider"
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-3.5 text-zinc-500 hover:text-zinc-300 p-1 transition-colors"
                tabIndex={-1}
                aria-label={showCode ? "Hide authorization code" : "Show authorization code"}
              >
                {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success || !code.trim()}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-600/25 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>VERIFYING CLEARANCE...</span>
              </>
            ) : (
              <>
                <Lock size={13} />
                <span>ACCESS</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Security Telemetry Footer */}
        <div className="pt-4 border-t border-white/5 space-y-1.5 text-center text-[10px] font-mono text-zinc-500">
          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>CRYPTOGRAPHIC TIMING-SAFE EVALUATION</span>
          </div>
          <div>UNAUTHORIZED ACCESS ATTEMPTS ARE MONITORED &amp; LOGGED</div>
        </div>
      </div>

      {/* Public Site Navigation */}
      <div className="text-center">
        <Link
          href="/"
          className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
        >
          ← Return to public studio site
        </Link>
      </div>
    </div>
  );
}

export default function AdminRestrictedAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#050508] text-white selection:bg-red-500 selection:text-white">
      {/* Background Ambience & Cyber Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-red-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-emerald-600/10 blur-[130px]" />

      <Suspense fallback={
        <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-950/80 border border-white/10 text-center font-mono text-xs text-zinc-500">
          INITIALIZING SECURITY HANDSHAKE...
        </div>
      }>
        <RestrictedAccessForm />
      </Suspense>
    </div>
  );
}
