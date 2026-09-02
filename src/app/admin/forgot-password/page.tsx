"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [devResetLink, setDevResetLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Please enter your administrator email.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to process request.");
      }

      setSubmitted(true);
      if (data.devResetLink) {
        setDevResetLink(data.devResetLink);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#07070a]">
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
            PASSWORD RECOVERY
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
            ADMIN CONSOLE // RECOVERY UPLINK
          </p>
        </div>

        <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-300 flex items-start gap-2.5">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                Enter your verified administrator email. If an account exists, a single-use
                cryptographic reset link will be generated.
              </p>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  ADMINISTRATOR EMAIL
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="admin@aevionstudio.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                  <Mail size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-50 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? "TRANSMITTING..." : (
                  <>
                    REQUEST RESET LINK <Send size={13} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={24} />
              </div>
              <h2 className="text-base font-bold text-white font-mono uppercase">
                INSTRUCTIONS DISPATCHED
              </h2>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                If an account exists for that email, reset instructions have been sent.
              </p>

              {devResetLink && (
                <div className="p-3 bg-zinc-900 border border-emerald-500/40 rounded-xl text-left space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                    LOCAL DEV RESET URL:
                  </span>
                  <Link
                    href={devResetLink}
                    className="text-xs font-mono text-cyan-300 underline break-all block"
                  >
                    {devResetLink}
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="pt-4 border-t border-white/5 text-center">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 hover:text-white transition-colors"
            >
              <ArrowLeft size={13} /> Return to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
