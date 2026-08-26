"use client";

import { createContext, useContext, useEffect, useRef, useSyncExternalStore } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const LenisContext = createContext(null);

let globalLenis = null;
const listeners = new Set();

function subscribe(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return globalLenis;
}

function getServerSnapshot() {
  return null;
}

export const useLenis = () => {
  const lenisContext = useContext(LenisContext);
  const lenisStore = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return lenisContext || lenisStore;
};

export default function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with easeOutExpo-like easing curve and ~1.2s duration
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenisRef.current = lenisInstance;
    globalLenis = lenisInstance;

    // Provide window-level access for components if needed
    if (typeof window !== "undefined") {
      window.lenis = lenisInstance;
    }
    listeners.forEach((listener) => listener());

    // Sync Lenis with requestAnimationFrame loop
    let rafId;
    function raf(time) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      lenisRef.current = null;
      globalLenis = null;
      if (typeof window !== "undefined" && window.lenis === lenisInstance) {
        delete window.lenis;
      }
      listeners.forEach((listener) => listener());
    };
  }, []);

  return (
    <LenisContext.Provider value={globalLenis}>
      {children}
    </LenisContext.Provider>
  );
}
