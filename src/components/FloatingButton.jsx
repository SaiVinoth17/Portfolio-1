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
    <div className="w-full flex justify-center fixed bottom-4 sm:bottom-8 z-30 pointer-events-none px-4">
      <div className="flex items-center gap-2 bg-black/85 border border-white/15 backdrop-blur-xl text-white p-1 rounded-full pointer-events-auto shadow-2xl transition-all duration-300 hover:border-emerald-500/40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 hover:text-white hover:bg-emerald-500/30 transition-colors flex items-center justify-center select-none shrink-0"
          title="Instant WhatsApp Uplink"
          aria-label="Direct WhatsApp Message"
        >
          <MessageCircle size={15} />
        </a>

        <Link
          href="/contact"
          className="text-[11px] font-mono font-semibold bg-emerald-400 text-black px-4 py-2 rounded-full cursor-pointer hover:bg-emerald-300 transition-colors select-none flex items-center gap-1.5"
        >
          Build With Us <ArrowUpRight size={13} />
        </Link>

        <Link
          href="/projects"
          aria-label="View Projects"
          className="w-8 h-8 bg-zinc-900 border border-white/10 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center select-none shrink-0"
          title="View Projects"
        >
          <Layers size={14} />
        </Link>
      </div>
    </div>
  );
};

export default FloatingButton;