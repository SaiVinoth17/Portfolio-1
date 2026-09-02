"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!token) {
      setErrorMessage("Reset token is missing from the URL.");
      return;
    }

    if (newPassword.length < 10) {
      setErrorMessage("Password must be at least 10 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update password.");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-white font-mono uppercase">
          CREATE NEW PASSWORD
        </h1>
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          ADMIN CONSOLE // SECURITY ROTATION
        </p>
      </div>

      <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        {errorMessage && (
          <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-300 flex items-start gap-2.5">
            <AlertCircle size={15} className="shrink-0 mt-0.5 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {success ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={24} />
            </div>
            <h2 className="text-base font-bold text-white font-mono uppercase">
              PASSWORD ROTATED
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              Your password has been securely updated. Redirecting to sign in...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!token && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono rounded-xl">
                Warning: No reset token detected in query parameters.
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                NEW PASSWORD (MIN 10 CHARS)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                />
                <Lock size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                CONFIRM NEW PASSWORD
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                />
                <Lock size={15} className="absolute left-3.5 top-3.5 text-zinc-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 disabled:opacity-50 font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? "COMMITTING HASH..." : (
                <>
                  UPDATE PASSWORD <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-white/5 text-center">
          <Link
            href="/admin/login"
            className="text-xs font-mono text-zinc-500 hover:text-white transition-colors"
          >
            ← Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative bg-[#07070a]">
      <Suspense fallback={<div className="text-xs font-mono text-zinc-500">Loading token...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
