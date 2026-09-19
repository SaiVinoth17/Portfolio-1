"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Synchronize GSAP ticker with Lenis requestAnimationFrame
    const tickerUpdate = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // 1. Recalculate triggers once all web fonts are loaded (prevents stale text offset metrics)
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        if (lenisRef.current) lenisRef.current.resize();
        ScrollTrigger.refresh();
      });
    }

    // 2. Recalculate when all media/images finish loading
    const handleWindowLoad = () => {
      if (lenisRef.current) lenisRef.current.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleWindowLoad);

    // 3. Observe body layout changes (lazy-loaded elements, dynamic expansion)
    let resizeTimer = null;
    const handleViewportResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (lenisRef.current) lenisRef.current.resize();
        ScrollTrigger.refresh();
      }, 100);
    };

    const resizeObserver = new ResizeObserver(handleViewportResize);
    if (typeof document !== "undefined" && document.body) {
      resizeObserver.observe(document.body);
    }

    window.addEventListener("resize", handleViewportResize, { passive: true });
    window.addEventListener("orientationchange", handleViewportResize, { passive: true });

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("resize", handleViewportResize);
      window.removeEventListener("orientationchange", handleViewportResize);
      resizeObserver.disconnect();
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // On route change, reset scroll position, recalculate document dimensions, and refresh ScrollTrigger
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });

      // Staged refresh: early (50ms), DOM settled (200ms), dynamic assets (500ms)
      const t1 = setTimeout(() => {
        if (lenisRef.current) lenisRef.current.resize();
        ScrollTrigger.refresh();
      }, 50);

      const t2 = setTimeout(() => {
        if (lenisRef.current) lenisRef.current.resize();
        ScrollTrigger.refresh();
      }, 200);

      const t3 = setTimeout(() => {
        if (lenisRef.current) lenisRef.current.resize();
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [pathname]);

  return <>{children}</>;
}

