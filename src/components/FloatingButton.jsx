"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, ArrowUpRight, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/config/studio";

const FloatingButton = () => {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const whatsappUrl = getWhatsAppUrl("general");

  return (
    <div className="w-full flex justify-center fixed bottom-4 sm:bottom-6 z-30 pointer-events-none px-4">
      <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 backdrop-blur-xl text-white p-0.5 rounded-full pointer-events-auto shadow-xl transition-all duration-300 hover:border-white/20 hover:bg-black/70">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400/80 hover:text-emerald-300 hover:bg-emerald-500/20 transition-colors flex items-center justify-center select-none shrink-0"
          title="Instant WhatsApp Uplink"
          aria-label="Direct WhatsApp Message"
        >
          <MessageCircle size={13} />
        </a>

        <Link
          href="/contact"
          className="text-[10px] font-mono font-semibold bg-emerald-400/90 text-black px-3.5 py-1.5 rounded-full cursor-pointer hover:bg-emerald-300 transition-colors select-none flex items-center gap-1"
        >
          Build With Us <ArrowUpRight size={11} />
        </Link>

        <Link
          href="/projects"
          aria-label="View Projects"
          className="w-7 h-7 bg-zinc-900/80 border border-white/8 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center select-none shrink-0"
          title="View Projects"
        >
          <Layers size={13} />
        </Link>
      </div>
    </div>
  );
};

export default FloatingButton;