"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import AevionLogo from "./AevionLogo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/tech-stack", label: "Stack" },
  { href: "/process", label: "Process" },
  { href: "/showcase", label: "Showcase" },
  { href: "/services", label: "Services" },
  { href: "/resume", label: "Resume" },
  { href: "/blog", label: "Blog" },
];

export default function GlobalNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto flex items-center justify-between p-2 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Brand Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-zinc-900 transition-colors group"
          aria-label="Aevion Studio Home"
        >
          <AevionLogo
            variant="full"
            className="h-9 w-auto object-contain hidden sm:block"
            priority
          />
          <div className="flex items-center gap-2 sm:hidden">
            <AevionLogo
              variant="mark"
              className="h-7 w-auto object-contain"
              priority
            />
            <span className="text-xs font-mono uppercase tracking-[0.14em] font-bold text-white">
              AEVION
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  isActive
                    ? "bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 shadow-sm shadow-emerald-500/10"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-500/40 text-xs font-mono transition-all cursor-pointer"
            aria-label="Open Command Palette"
          >
            <Search size={14} className="text-emerald-400" />
            <span className="text-[11px]">Cmd+K</span>
          </button>

          {/* Primary Persistent Conversion CTA */}
          <Link
            href="/contact"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={14} />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-3xl bg-zinc-950/95 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-2xl text-xs font-mono text-center transition-all ${
                    isActive
                      ? "bg-emerald-500 text-black font-bold"
                      : "bg-zinc-900/80 text-zinc-300 hover:text-white border border-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
