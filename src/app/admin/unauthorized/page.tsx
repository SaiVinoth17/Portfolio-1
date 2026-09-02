import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#07070a]">
      <div className="max-w-md w-full bg-zinc-950 border border-red-500/20 rounded-2xl p-8 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 mx-auto flex items-center justify-center text-red-400">
          <ShieldAlert size={28} />
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-red-400">
            HTTP 403 · ACCESS FORBIDDEN
          </div>
          <h1 className="text-2xl font-bold text-white font-mono uppercase">
            INSUFFICIENT PERMISSIONS
          </h1>
          <p className="text-xs text-zinc-400 font-mono leading-relaxed">
            Your authenticated administrator account does not possess the required role tier to
            access this system resource.
          </p>
        </div>

        <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
          <Link
            href="/admin/dashboard"
            className="w-full py-3 px-4 rounded-xl bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} /> Return to Dashboard
          </Link>
          <Link
            href="/admin/login"
            className="text-xs font-mono text-zinc-500 hover:text-white transition-colors pt-2"
          >
            Sign in with different credentials
          </Link>
        </div>
      </div>
    </div>
  );
}
