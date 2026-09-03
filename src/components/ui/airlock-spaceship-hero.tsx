"use client"

import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*  AIRLOCK — a scroll-locked, scrub-driven video hero                        */
/*                                                                            */
/*  While the hero owns the screen the page cannot move: the body is pinned   */
/*  with position:fixed, the same technique modal libraries use, because      */
/*  overflow:hidden alone is not reliable across browsers. Wheel, touch and   */
/*  key input is captured and spent on video.currentTime instead, forward     */
/*  and backward. When the video reaches its end and the reader keeps         */
/*  pushing forward the page is handed back and scrolls normally; scrolling   */
/*  back up to the top takes the lock again at full progress.                 */
/*                                                                            */
/*  No dependencies beyond React. Reduced-motion readers never get locked.    */
/* -------------------------------------------------------------------------- */

/* --- Types --- */

export type AirlockTheme = "vacuum" | "ember" | "ice"

interface Palette {
    /** Page-coloured backdrop shown before the first frame decodes. */
    backdrop: string
    /** Headline and tagline colour. */
    text: string
    /** Scroll hint and signature colour. */
    muted: string
    /** Progress bar fill. */
    bar: string
}

const PALETTES: Record<AirlockTheme, Palette> = {
    vacuum: {
        backdrop: "#05070d",
        text: "#f2f4f8",
        muted: "rgba(240,244,248,0.72)",
        bar: "linear-gradient(90deg, rgba(255,255,255,0.45), rgba(255,255,255,0.95))",
    },
    ember: {
        backdrop: "#0d0705",
        text: "#fdf1e7",
        muted: "rgba(253,241,231,0.72)",
        bar: "linear-gradient(90deg, rgba(255,176,102,0.45), rgba(255,214,168,0.95))",
    },
    ice: {
        backdrop: "#04090f",
        text: "#eaf4ff",
        muted: "rgba(234,244,255,0.72)",
        bar: "linear-gradient(90deg, rgba(120,190,255,0.45), rgba(214,236,255,0.95))",
    },
}

export interface AirlockHeroProps {
    /** Video to scrub. Must be same-origin or CORS-enabled, and seekable. */
    videoSrc?: string
    /** Still shown until the video has enough data to paint. Kills the black flash. */
    posterSrc?: string
    /** Headline over the opening frames. Fades out as the scrub starts. */
    title?: string
    /** Word next to the bouncing arrow. Hidden once the reader moves. */
    scrollHint?: string
    /** Payoff line, revealed over the last fifth of the scrub. Pass "" to drop it. */
    tagline?: string
    /** Credit in the corner. Pass false to drop it. */
    signature?: { name: string; url: string } | false
    /** Input distance in pixels needed to scrub the whole video. Higher feels heavier. */
    scrubDistance?: number
    /**
     * Extra input distance spent on the last frame, after the film has run out.
     * The picture is frozen and the tagline is fully up for this stretch, so the
     * hero has somewhere to land instead of stopping dead. Set to 0 to drop it.
     */
    holdDistance?: number
    /** Named colour set. */
    theme?: AirlockTheme
    /** Label for the control that hands the page back without scrubbing. */
    skipLabel?: string
    className?: string
    style?: React.CSSProperties
}

/* --- Constants --- */

// Served through jsDelivr rather than raw.githubusercontent.com: raw hands the
// file back as application/octet-stream with nosniff, which browsers may refuse
// to treat as video. jsDelivr sends video/mp4 and honours range requests, which
// is what makes seeking work at all.
const CDN = "https://cdn.jsdelivr.net/gh/yuraoak/airlock-hero-assets@main"
const DEFAULT_VIDEO = `${CDN}/iss-hero-1080p.mp4`
const DEFAULT_POSTER = `${CDN}/iss-hero-poster.jpg`
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

/** Keyboard fallback, so a reader without a wheel is never stuck. */
const KEY_STEPS: Record<string, number> = {
    ArrowDown: 140,
    ArrowUp: -140,
    PageDown: 700,
    PageUp: -700,
    " ": 700,
    End: Number.MAX_SAFE_INTEGER,
    Home: Number.MIN_SAFE_INTEGER,
}

/* --- Helpers --- */

function clamp(v: number, min: number, max: number) {
    return Math.min(max, Math.max(min, v))
}

/* --- Component --- */

export default function AirlockHero({
    videoSrc = DEFAULT_VIDEO,
    posterSrc = DEFAULT_POSTER,
    title = "THE AIRLOCK OPENS",
    scrollHint = "SCROLL",
    tagline = "Everything you know fits in one half of the frame.",
    signature = false,
    scrubDistance = 3200,
    holdDistance = 1100,
    theme = "vacuum",
    skipLabel = "Skip intro",
    className,
    style,
}: AirlockHeroProps) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const hintRef = useRef<HTMLDivElement>(null)
    const taglineRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLDivElement>(null)
    const scrimRef = useRef<HTMLDivElement>(null)
    const releaseRef = useRef<() => void>(() => {})
    const [ready, setReady] = useState(false)

    const palette = PALETTES[theme]

    useEffect(() => {
        const video = videoRef.current
        const section = sectionRef.current
        if (!video || !section) return

        const reduceMotion =
            typeof window !== "undefined" &&
            (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)

        let duration = 0
        let rafId = 0
        let target = 0
        let shown = 0
        let moved = false
        let seeking = false
        let queued: number | null = null
        let locked = false
        let lockedY = 0
        let touchY = 0
        /** Only a reader who was handed the page back can hand it over again. */
        let released = false
        let lastY = 0

        const totalDistance = scrubDistance + holdDistance
        /** How much of the input axis the film itself occupies. */
        const scrubShare = scrubDistance / totalDistance

        /* --- Seeking ------------------------------------------------------- */

        function seekTo(t: number) {
            if (seeking) {
                queued = t
                return
            }
            seeking = true
            video!.currentTime = t
        }

        const onSeeked = () => {
            seeking = false
            if (queued !== null) {
                const t = queued
                queued = null
                seeking = true
                video!.currentTime = t
            }
        }

        /* --- Painting ------------------------------------------------------ */

        /**
         * `p` runs 0-1 across scrubDistance *and* holdDistance together. The film
         * only occupies the first stretch; past that everything to do with the
         * picture is pinned at its last value and the reader is spending scroll on
         * a held frame. Ending the moment the film does reads as an abrupt cut.
         */
        function paint(p: number) {
            const videoP = clamp(p / scrubShare, 0, 1)

            // Stop a hair short of the duration: seeking to the very end lands
            // past the last decodable frame in some browsers and paints black.
            if (duration > 0) seekTo(Math.min(videoP * duration, duration - 0.04))

            const titleAlpha = 1 - clamp(videoP / 0.35, 0, 1)
            const taglineAlpha = clamp((videoP - 0.82) / 0.18, 0, 1)

            if (videoRef.current) {
                videoRef.current.style.transform = `scale(${1 + videoP * 0.06})`
            }
            if (scrimRef.current) {
                // The scrim exists to keep type legible over a daylit planet, so
                // it comes and goes with the type instead of muting the whole shot.
                scrimRef.current.style.opacity = String(Math.max(titleAlpha, taglineAlpha))
            }
            if (titleRef.current) {
                const t = titleAlpha
                titleRef.current.style.opacity = String(t)
                titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
                titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
            }
            if (hintRef.current) {
                hintRef.current.style.opacity = moved ? "0" : "1"
            }
            if (taglineRef.current) {
                // Mirrors the headline's blur-focus move, timed as the payoff
                // once the reveal is nearly done.
                const t = taglineAlpha
                taglineRef.current.style.opacity = String(t)
                taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
                taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
            }
            if (barRef.current) {
                barRef.current.style.transform = `scaleX(${p})`
            }
        }

        /* --- The lock ------------------------------------------------------ */

        function engageLock() {
            if (locked) return
            locked = true
            released = false
            lockedY = window.scrollY
            const b = document.body.style
            b.position = "fixed"
            b.top = `-${lockedY}px`
            b.left = "0"
            b.right = "0"
            b.width = "100%"
        }

        function releaseLock() {
            if (!locked) return
            locked = false
            const y = lockedY
            const b = document.body.style
            b.position = ""
            b.top = ""
            b.left = ""
            b.right = ""
            b.width = ""
            window.scrollTo(0, y)
            released = true
            lastY = y
        }

        releaseRef.current = () => {
            target = shown = 1
            moved = true
            paint(1)
            releaseLock()
        }

        /**
         * Spends a gesture on the scrub. Returns true when the hero used it,
         * which is the caller's cue to swallow the event. Once the scrub is
         * finished and the reader is still pushing forward, the page is handed
         * back and the gesture falls through untouched.
         */
        function consume(deltaY: number) {
            if (!locked) return false
            // Wait for the picture to catch up with the input before letting go,
            // otherwise a single hard flick throws the page on a half-played shot.
            if (target >= 1 && shown > 0.98 && deltaY > 0) {
                releaseLock()
                return false
            }
            target = clamp(target + deltaY / totalDistance, 0, 1)
            if (target > 0.001) moved = true
            return true
        }

        /* --- Input --------------------------------------------------------- */

        const onWheel = (e: WheelEvent) => {
            if (consume(e.deltaY)) e.preventDefault()
        }

        const onTouchStart = (e: TouchEvent) => {
            touchY = e.touches[0]?.clientY ?? 0
        }

        const onTouchMove = (e: TouchEvent) => {
            const y = e.touches[0]?.clientY ?? touchY
            const deltaY = touchY - y
            touchY = y
            if (consume(deltaY)) e.preventDefault()
        }

        const onKeyDown = (e: KeyboardEvent) => {
            const step = KEY_STEPS[e.key]
            if (step === undefined) return
            if (consume(step)) e.preventDefault()
        }

        /**
         * Climbing back into the hero takes the lock again, at the last frame,
         * so the sequence runs backwards. Direction matters: sitting at the top
         * of the page is not on its own a reason to seize the wheel, or the hero
         * would grab it the moment it mounts.
         */
        const onScroll = () => {
            if (locked || !released) return
            const y = window.scrollY
            const climbing = y < lastY
            lastY = y
            if (climbing && y <= section!.offsetTop) {
                target = shown = 1
                paint(1)
                engageLock()
            }
        }

        /* --- Wiring -------------------------------------------------------- */

        const onLoadedData = () => {
            duration = video!.duration || 0
            setReady(true)
            if (reduceMotion) {
                // Hold the payoff frame and leave the page alone.
                target = shown = 1
                moved = true
                paint(1)
            }
        }

        video.addEventListener("loadeddata", onLoadedData)
        video.addEventListener("seeked", onSeeked)

        if (!reduceMotion) {
            if (window.scrollY <= section.offsetTop + 1) engageLock()

            window.addEventListener("wheel", onWheel, { passive: false })
            window.addEventListener("touchstart", onTouchStart, { passive: true })
            window.addEventListener("touchmove", onTouchMove, { passive: false })
            window.addEventListener("keydown", onKeyDown)
            window.addEventListener("scroll", onScroll, { passive: true })

            const frame = () => {
                shown += (target - shown) * 0.18
                paint(shown)
                rafId = requestAnimationFrame(frame)
            }
            rafId = requestAnimationFrame(frame)
        }

        return () => {
            video.removeEventListener("loadeddata", onLoadedData)
            video.removeEventListener("seeked", onSeeked)
            window.removeEventListener("wheel", onWheel)
            window.removeEventListener("touchstart", onTouchStart)
            window.removeEventListener("touchmove", onTouchMove)
            window.removeEventListener("keydown", onKeyDown)
            window.removeEventListener("scroll", onScroll)
            cancelAnimationFrame(rafId)
            releaseLock()
        }
    }, [scrubDistance, holdDistance])

    return (
        <div
            ref={sectionRef}
            className={cn("relative h-[100dvh] w-full overflow-hidden", className)}
            style={{ background: palette.backdrop, ...style }}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                    opacity: ready ? 1 : 0,
                    transformOrigin: "center center",
                    willChange: "transform",
                    transition: "opacity 0.6s ease",
                }}
            />

            {/* Top and bottom falloff, so type never fights the sky. */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(5,7,13,0.38), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.58))",
                }}
            />

            {/* Centre scrim driven by paint(), only present while type needs protecting. */}
            <div
                ref={scrimRef}
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 62% 44% at 50% 50%, rgba(5,7,13,0.68), rgba(5,7,13,0) 72%)",
                }}
            />

            <div
                ref={titleRef}
                className="pointer-events-none absolute inset-0 flex items-center justify-center px-[6%] text-center"
            >
                <h1
                    className="inline-block font-extrabold leading-none tracking-[-0.02em]"
                    style={{
                        fontFamily: SANS,
                        fontSize: "clamp(30px, 7vw, 96px)",
                        color: palette.text,
                        textShadow: "0 4px 30px rgba(0,0,0,0.55)",
                        willChange: "transform, filter, opacity",
                    }}
                >
                    {title}
                </h1>
            </div>

            {tagline ? (
                <div
                    ref={taglineRef}
                    className="pointer-events-none absolute inset-0 flex items-center justify-center px-[8%] text-center opacity-0"
                >
                    <p
                        className="font-bold tracking-[-0.01em]"
                        style={{
                            fontFamily: SANS,
                            fontSize: "clamp(20px, 3.4vw, 40px)",
                            lineHeight: 1.2,
                            color: palette.text,
                            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
                        }}
                    >
                        {tagline}
                    </p>
                </div>
            ) : null}

            <div
                ref={hintRef}
                className="pointer-events-none absolute bottom-[clamp(20px,6vh,48px)] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-[400ms]"
                style={{
                    color: palette.muted,
                    fontFamily: SANS,
                    fontSize: "clamp(10px, 1.4vw, 12px)",
                    fontWeight: 600,
                    letterSpacing: "0.3em",
                }}
            >
                <span>{scrollHint}</span>
                <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden="true" style={{ animation: "airlock-bounce 1.6s ease-in-out infinite" }}>
                    <style>{`
                        @keyframes airlock-bounce {
                            0%, 100% { transform: translateY(0); opacity: 0.5; }
                            50% { transform: translateY(5px); opacity: 1; }
                        }
                        @media (prefers-reduced-motion: reduce) {
                            [style*="airlock-bounce"] { animation: none !important; }
                        }
                    `}</style>
                    <path
                        d="M7 1 L7 17 M2 12 L7 17 L12 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Never trap anyone: a keyboard-reachable way straight to the page. */}
            <button
                type="button"
                onClick={() => releaseRef.current()}
                className="absolute left-1/2 top-4 z-10 -translate-x-1/2 rounded-full px-4 py-2 text-xs font-semibold opacity-0 transition-opacity focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ fontFamily: SANS, color: palette.text, background: "rgba(5,7,13,0.7)", letterSpacing: "0.08em" }}
            >
                {skipLabel}
            </button>

            {/* Thin progress line — fills as the video advances. */}
            <div className="absolute inset-x-0 bottom-0 h-0.5" style={{ background: "rgba(255,255,255,0.12)" }}>
                <div
                    ref={barRef}
                    className="h-full w-full origin-left"
                    style={{ background: palette.bar, transform: "scaleX(0)" }}
                />
            </div>

            {signature ? (
                <span
                    className="absolute bottom-[clamp(10px,2vw,18px)] right-[clamp(12px,2.5vw,24px)] z-[2] font-medium"
                    style={{
                        fontFamily: SANS,
                        fontSize: "clamp(11px, 1.4vw, 13px)",
                        color: palette.muted,
                    }}
                >
                    by{" "}
                    <a
                        href={signature.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline transition-colors hover:opacity-100"
                        style={{ color: "inherit" }}
                    >
                        {signature.name}
                    </a>
                </span>
            ) : null}
        </div>
    )
}
