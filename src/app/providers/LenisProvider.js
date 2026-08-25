"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Use a ref-like mutable box so the recursive raf captures the latest id
    const idBox = { id: 0 };

    function raf(time) {
      lenis.raf(time);
      idBox.id = requestAnimationFrame(raf);
    }

    idBox.id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(idBox.id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
