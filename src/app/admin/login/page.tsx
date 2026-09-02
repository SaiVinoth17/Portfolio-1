"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, ArrowRight, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/dashboard");
        router.refresh();
      }, 500);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#07070a]">
      {/* Subtle Technical Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center,_var(--tw-gradient-stops)] from-emerald-500/5 via-transparent to-transparent" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 font-mono text-[11px] uppercase tracking-widest">
            <Shield size={12} /> RESTRICTED ACCESS
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
            AEVION STUDIO
          </h1>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
            ADMIN CONSOLE // INTERNAL SYSTEMS
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          {errorMessage && (
            <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-300 flex items-start gap-2.5">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-300 flex items-center gap-2.5">
              <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
              <span>Credentials verified. Establishing session...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                ADMINISTRATOR EMAIL
              </label>
              <div className="relative">
                <input
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@aevionstudio.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                />
                <Mail size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                  PASSWORD
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-[11px] font-mono text-emerald-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                />
                <Lock size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-50 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/5"
            >
              {loading ? (
                <span>VERIFYING CREDENTIALS...</span>
              ) : (
                <>
                  SIGN IN <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-white/5 text-center text-[10px] font-mono text-zinc-600 space-y-1">
            <div>MUTUAL SESSION VERIFICATION · HARDENED SCRYPT ENCRYPTION</div>
            <div>UNAUTHORIZED ACCESS ATTEMPTS ARE LOGGED TO AUDIT LOGS</div>
          </div>
        </div>

        {/* Public site link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Return to public studio site
          </Link>
        </div>
      </div>
    </div>
  );
}
