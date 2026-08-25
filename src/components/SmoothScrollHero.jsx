"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

import innerImage from "@/assets/images/innerImage.webp";
import outerImage from "@/assets/images/outerImage.webp";
import shadowImage from "@/assets/images/shadowImage.webp";
import skyImage from "@/assets/images/skyImage.webp";
import cloudsImage from "@/assets/images/cloudsImage.webp";
import aboveImage from "@/assets/images/aboveImage.webp";
import aevionLogo from "@/assets/images/logo.svg";
import About from './About';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollHero = () => {
    const scopeRef = useRef(null);
    const mainContainer = useRef(null);
    const windowRef = useRef(null);
    const contentRef = useRef(null);
    const logoRef = useRef(null);
    const secondSectionRef = useRef(null);
    const cloudsRef = useRef(null);
    const revealRef = useRef(null);

    // Initial Reveal Effect: Logo shows instantly, rest follows after 1s
    useEffect(() => {
        const timer = setTimeout(() => {
            gsap.to(revealRef.current, {
                opacity: 1,
                duration: 1.5,
                ease: "power2.out"
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainContainer.current,
                start: "top top",
                end: "+=250%",
                scrub: 0.6,
                pin: true,
                anticipatePin: 1,
            }
        });

        tl.to(windowRef.current, {
            scale: 5,
            rotation: 0.01,
            force3D: true,
            duration: 10,
            ease: "power2.in"
        }, 0)
            .to(contentRef.current, {
                scale: 5,
                opacity: 0,
                duration: 8,
                ease: "power2.in"
            }, 0)
            .to(".scroll-indicator", { opacity: 0, duration: 1 }, 0);

        const logoMoveFactor = window.innerWidth < 1024 ? 0.43 : 0.44;

        tl.to(logoRef.current, {
            y: -window.innerHeight * logoMoveFactor,
            scale: 0.6,
            duration: 8,
            ease: "power2.inOut"
        }, 1.5);

        tl.fromTo(secondSectionRef.current,
            {
                opacity: 0,
                y: 120,
                scale: 0.88,
                // No blur — filter:blur() forces GPU rasterization on every scrub frame
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 7,
                ease: "power3.out"
            },
            9
        );

        gsap.fromTo(
            cloudsRef.current,
            { xPercent: 0 },
            {
                xPercent: -50,
                duration: 30,
                repeat: -1,
                ease: "none",
            }
        );

    }, { scope: scopeRef });

    return (
        <div ref={scopeRef} className="relative">
            <div className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none">
                <div className="w-[180px] sm:w-[220px] lg:w-[250px]">
                    <Image
                        ref={logoRef}
                        src={aevionLogo}
                        alt="Aevion Studio Logo"
                        className="w-full h-auto object-contain brightness-0 invert"
                        priority
                    />
                </div>
            </div>

            {/* Main Content Reveal Wrapper */}
            <div ref={revealRef} style={{ opacity: 0 }}>
                <div className="fixed inset-0 -z-50" style={{ transform: 'translate3d(0,0,0)' }}>
                    <Image
                        src={skyImage}
                        alt="Aevion environment sky"
                        fill
                        className="object-cover object-bottom"
                        priority
                        quality={100}
                        unoptimized
                    />
                </div>

                <div className="fixed inset-0 -z-40 overflow-hidden pointer-events-none">
                    <div
                        ref={cloudsRef}
                        className="absolute inset-0 h-full w-[1500%] sm:w-[500%]"
                        style={{
                            backgroundImage: `url(${cloudsImage.src})`,
                            backgroundSize: '50% 100%',
                            backgroundRepeat: 'repeat-x',
                            opacity: 0.6,
                            willChange: 'transform',
                            transform: 'translate3d(0,0,0)'
                        }}
                    />
                </div>

                <div ref={mainContainer} className="relative w-full h-screen overflow-hidden">
                    <div ref={windowRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none will-change-transform" style={{ perspective: '1000px', backfaceVisibility: 'hidden' }}>
                        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                            <Image
                                src={innerImage}
                                alt="Aevion workspace inner view"
                                fill
                                className="object-cover scale-100 lg:scale-[1.3] z-10"
                                quality={100}
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                                unoptimized
                            />
                            <Image
                                src={shadowImage}
                                alt="Aevion workspace shadow"
                                fill
                                className="object-cover scale-100 lg:scale-[1.3] opacity-50 z-20"
                                quality={100}
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                                unoptimized
                            />
                            <Image
                                src={outerImage}
                                alt="Aevion workspace outer view"
                                fill
                                className="object-cover scale-100 lg:scale-[1.3] z-30"
                                quality={100}
                                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                                unoptimized
                            />
                            <div className="absolute top-[22.5%] left-[50%] md:top-[10%] md:left-[50.3%] -translate-x-1/2 w-[50%] md:w-[24%] h-auto z-10">
                                <Image src={aboveImage} alt="Aevion studio architecture detail" width={400} height={200} className="object-contain" quality={100} unoptimized />
                            </div>
                        </div>
                    </div>

                    {/* Clean Fluid Hero Content Grid - Zero Text Collisions */}
                    <div ref={contentRef} className="absolute inset-0 z-20 pointer-events-none text-white">

                        {/* ── MOBILE: Bottom bar, two columns, zero overflow ─── */}
                        <div className="lg:hidden absolute bottom-16 left-0 right-0 px-5 flex items-end justify-between gap-2 overflow-hidden">
                            {/* Left */}
                            <div className="flex-1 min-w-0 space-y-0.5">
                                <p
                                    style={{
                                        fontSize: '0.625rem',
                                        letterSpacing: '0.12em',
                                    }}
                                    className="font-mono text-zinc-400 uppercase whitespace-nowrap"
                                >
                                    AI Software Studio
                                </p>
                                <h1
                                    style={{
                                        fontSize: 'clamp(0.9375rem, 3.2vw, 1.375rem)',
                                        lineHeight: 1.08,
                                        letterSpacing: '-0.02em',
                                        fontWeight: 700,
                                        whiteSpace: 'nowrap',
                                    }}
                                    className="text-white"
                                >
                                    We are innovation.
                                </h1>
                            </div>

                            {/* Right */}
                            <div className="flex-1 min-w-0 text-right space-y-0.5">
                                <p
                                    style={{
                                        fontSize: '0.625rem',
                                        letterSpacing: '0.12em',
                                    }}
                                    className="font-mono text-zinc-400 uppercase whitespace-nowrap"
                                >
                                    Est. 2024
                                </p>
                                <h2
                                    style={{
                                        fontSize: 'clamp(0.9375rem, 3.2vw, 1.375rem)',
                                        lineHeight: 1.08,
                                        letterSpacing: '-0.02em',
                                        fontWeight: 700,
                                        whiteSpace: 'nowrap',
                                    }}
                                    className="text-white"
                                >
                                    We are engineering.
                                </h2>
                            </div>
                        </div>

                        {/* ── DESKTOP: Classic two-column split layout ─────────── */}
                        <div className="hidden lg:flex items-center justify-between h-full px-12 lg:px-20 max-w-7xl mx-auto left-0 right-0 absolute inset-0">
                            {/* Left Column */}
                            <div className="hero-text-left space-y-6 max-w-md">
                                <h1
                                    style={{
                                        fontSize: 'var(--text-display)',
                                        lineHeight: 'var(--lh-display)',
                                        letterSpacing: 'var(--ls-display)',
                                        fontWeight: 700,
                                    }}
                                    className="text-white"
                                >
                                    We are<br />innovation
                                </h1>
                                <div className="space-y-4 pt-2">
                                    <h2
                                        style={{
                                            fontSize: 'var(--text-h3)',
                                            lineHeight: 'var(--lh-subheading)',
                                            letterSpacing: 'var(--ls-subheading)',
                                            fontWeight: 500,
                                        }}
                                        className="text-zinc-200"
                                    >
                                        Your vision<br />transformed into power
                                    </h2>
                                    <div className="w-10 h-px bg-white/40" />
                                    <p
                                        style={{
                                            fontSize: 'var(--text-sm)',
                                            lineHeight: 'var(--lh-body)',
                                        }}
                                        className="text-zinc-300 font-sans max-w-[280px]"
                                    >
                                        Every digital solution is engineered around your growth, scale, and strategic ambitions.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="hero-text-right max-w-md flex flex-col items-end text-right">
                                <h1
                                    style={{
                                        fontSize: 'var(--text-display)',
                                        lineHeight: 'var(--lh-display)',
                                        letterSpacing: 'var(--ls-display)',
                                        fontWeight: 700,
                                    }}
                                    className="text-white"
                                >
                                    We are<br />engineering
                                </h1>
                            </div>
                        </div>

                    </div>

                    {/* Scroll Indicator — hidden on mobile to avoid bottom-bar collision */}
                    <div className="scroll-indicator hidden sm:block absolute bottom-12 right-6 sm:right-12 lg:right-20 z-20 text-white w-[180px]">
                        <div className="mb-3 h-[1px] w-full bg-white/40" />
                        <div
                            style={{ fontSize: 'var(--text-xs)' }}
                            className="flex items-center justify-between font-mono tracking-widest text-zinc-300 whitespace-nowrap"
                        >
                            <div className="flex items-center gap-1.5 font-bold">
                                <div className="flex flex-col -space-y-2">
                                    <ChevronDown size={14} />
                                    <ChevronDown size={14} className='-mt-[10px]' />
                                </div>
                                <span>SCROLL DOWN</span>
                            </div>
                            <span>TO EXPLORE</span>
                        </div>
                    </div>

                    {/* Second Section Reveal */}
                    <div ref={secondSectionRef} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white px-6 sm:px-12 max-w-5xl mx-auto pointer-events-none opacity-0">
                        <h2
                            style={{
                                fontSize: 'var(--text-h2)',
                                lineHeight: 'var(--lh-subheading)',
                                letterSpacing: 'var(--ls-subheading)',
                            }}
                            className="font-bold text-zinc-100"
                        >
                            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Aevion Studio®</span> is a premium AI software & digital engineering studio. From venture-backed startups to global enterprises, founders trust us to build fast, scale seamlessly, and lead.
                        </h2>
                    </div>
                </div>

                <About />
            </div>
        </div>
    );
};

export default SmoothScrollHero;