"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import aevionLogo from "@/assets/images/logo.svg";

/*
  iOS 26 Liquid Glass — authentic recipe
  ═══════════════════════════════════════
  1. background: rgba(255,255,255,0)   → completely transparent fill
  2. backdrop-filter: blur + saturate  → frosting via the pixels BEHIND
  3. box-shadow inset top              → the single bright specular line = the glass edge
  4. SVG feTurbulence on the border   → makes the edge "liquid" / slightly wobbly
  5. No drop shadow, no tinted fill   → iOS 26 glass floats invisibly
*/

const FILTER_ID = "ios26-glass";

const navLinks = [
  { text: "Work",         href: "/projects" },
  { text: "About",        href: "/about" },
  { text: "Services",     href: "/services" },
  { text: "Capabilities", href: "/capabilities" },
  { text: "Lab",          href: "/lab" },
  { text: "AI",           href: "/ai" },
  { text: "Technology",   href: "/technology" },
  { text: "Process",      href: "/process" },
];

const contactLinks = [
  { text: "Contact",     href: "/contact" },
  { text: "hello@aevionstudio.in", href: "mailto:hello@aevionstudio.in" },
];

/* Nav link — minimal, clean, white */
function NavLink({ href, children }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        transition: "color 0.2s, background 0.2s",
        background: hover ? "rgba(255,255,255,0.10)" : "transparent",
        color: hover ? "#fff" : "rgba(255,255,255,0.75)",
      }}
      className="relative px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] font-medium cursor-pointer select-none whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

/* The glass pill itself — pure CSS, no JS-computed alpha */
function GlassPill({ children, className = "", style = {} }) {
  return (
    <div
      className={`relative rounded-full ${className}`}
      style={{
        /* ── The iOS 26 recipe ─────────────────────────── */

        /* 1. Zero background — see straight through */
        background: "rgba(255, 255, 255, 0.04)",

        /* 2. Heavy blur + saturation boost = the frosting */
        backdropFilter: "blur(24px) saturate(200%) brightness(106%)",
        WebkitBackdropFilter: "blur(24px) saturate(200%) brightness(106%)",

        /* 3. The glass ring: */
        /*    • Outer: very thin semi-white border (the lens edge)   */
        /*    • Top inset: bright specular = curved glass catching light */
        /*    • Bottom inset: dark line = glass thickness             */
        boxShadow: [
          /* Outer lens ring */
          "0 0 0 1px rgba(255,255,255,0.22)",
          /* Top specular — THE signature of iOS liquid glass */
          "inset 0 1px 0 rgba(255,255,255,0.55)",
          /* Side specular — subtle left/right catch */
          "inset 1px 0 0 rgba(255,255,255,0.12)",
          "inset -1px 0 0 rgba(255,255,255,0.12)",
          /* Bottom thickness line */
          "inset 0 -1px 0 rgba(0,0,0,0.18)",
        ].join(", "),

        /* 4. No SVG filter applied here — backdrop-filter already composites on GPU */

        ...style,
      }}
    >
      {/* 5. Gradient sheen — faint curved glass reflection */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.04) 100%)",
          zIndex: 0,
        }}
      />
      <div className="relative z-10 flex items-center">{children}</div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ── SVG filter — static liquid edge (no animate — prevents continuous recomposite) ──── */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id={FILTER_ID}
            x="-4%"
            y="-30%"
            width="108%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            {/* Static noise — one-time cost, no animation tick */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.006"
              numOctaves="2"
              seed="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* ── Desktop navbar ─────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="fixed top-0 left-0 w-full z-40 pointer-events-none flex justify-center pt-4 px-4"
      >
        <GlassPill className="hidden lg:flex pointer-events-auto gap-1 px-2 py-1.5">
          {/* Nav links */}
          <div className="flex items-center gap-0.5">
            {navLinks.map((l) => (
              <NavLink key={l.text} href={l.href}>{l.text}</NavLink>
            ))}
          </div>

          {/* Separator */}
          <div
            className="h-4 w-px mx-1.5 shrink-0"
            style={{ background: "rgba(255,255,255,0.18)" }}
          />

          {/* Contact links */}
          <div className="flex items-center gap-0.5">
            {contactLinks.map((l) => (
              <NavLink key={l.text} href={l.href}>{l.text}</NavLink>
            ))}

            {/* CTA — opaque pill inside the glass pill */}
            <Link
              href="/contact"
              className="ml-2 px-4 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] font-bold text-black cursor-pointer select-none whitespace-nowrap transition-all duration-200 hover:brightness-110 hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(135deg,#34d399 0%,#10b981 55%,#059669 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.35), 0 2px 12px rgba(16,185,129,0.4)",
              }}
            >
              Build With Us
            </Link>
          </div>
        </GlassPill>

        {/* ── Mobile pill ──────────────────────────────────────── */}
        <GlassPill className="lg:hidden w-full pointer-events-auto px-4 py-2.5 justify-between">
          <Link
            href="/"
            className="text-[11px] font-mono uppercase tracking-[0.12em] font-bold text-white/90"
          >
            AEVION STUDIO
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="text-white/80 p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer ml-auto"
          >
            <Menu size={18} strokeWidth={1.5} />
          </button>
        </GlassPill>
      </nav>

      {/* ── Mobile drawer ──────────────────────────────────────── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            background: "rgba(0,0,0,0.5)",
          }}
        />

        {/* Panel — iOS 26 glass on dark */}
        <div
          className={`absolute right-0 top-0 h-screen w-[78%] sm:w-1/2 flex flex-col px-6 pt-8 pb-10 transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backdropFilter: "blur(40px) saturate(220%) brightness(105%)",
            WebkitBackdropFilter: "blur(40px) saturate(220%) brightness(105%)",
            background: "rgba(15,15,15,0.65)",
            boxShadow: [
              "inset 1px 0 0 rgba(255,255,255,0.12)",
              "-20px 0 60px rgba(0,0,0,0.4)",
            ].join(", "),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-10">
            <Image
              src={aevionLogo}
              alt="Aevion Studio"
              width={110}
              className="brightness-0 invert"
            />
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="text-white/80 p-2 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {[...navLinks, ...contactLinks].map((link, i) => (
              <Link
                key={link.text}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 px-4 py-3 rounded-2xl text-white/60 hover:text-white transition-all duration-200 font-mono text-sm tracking-wide"
                style={{
                  background: "transparent",
                  transitionDelay: isOpen ? `${i * 35}ms` : "0ms",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.06)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                {link.text}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/10">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3.5 rounded-2xl text-black font-bold font-mono text-sm tracking-wider transition-all hover:brightness-110 hover:scale-[1.01] cursor-pointer"
              style={{
                background:
                  "linear-gradient(135deg,#34d399 0%,#10b981 55%,#059669 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 20px rgba(16,185,129,0.35)",
              }}
            >
              Build With Us ↗
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}