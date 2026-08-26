"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for responsive and fluid cursor lag
  const springConfig = { damping: 24, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Fast spring for inner dot
  const dotSpringConfig = { damping: 35, stiffness: 700, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Detect fine pointer devices (desktop mouse) vs touch screens
    const checkPointer = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;

      setIsTouchDevice(!hasFinePointer || isTouch);
    };

    checkPointer();
    window.addEventListener("resize", checkPointer);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Event delegation to catch hover over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest(
          'a, button, [data-cursor="hover"], [role="button"], input[type="submit"], input[type="button"], label, .project-card'
        )
      );

      setIsHovered(isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("resize", checkPointer);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // If on a mobile/touch device, don't render custom cursor
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Outer Soft Ring / Aura (Smooth spring follow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 52 : 32,
          height: isHovered ? 52 : 32,
          opacity: isVisible ? (isHovered ? 0.9 : 0.6) : 0,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      >
        <div
          className={`w-full h-full rounded-full transition-all duration-300 ${
            isHovered
              ? "bg-violet-accent/15 dark:bg-electric-blue/15 border-2 border-violet-accent dark:border-electric-blue shadow-[0_0_20px_rgba(108,92,231,0.4)] dark:shadow-[0_0_25px_rgba(0,212,255,0.45)] backdrop-blur-[1px]"
              : "border border-violet-accent/50 dark:border-electric-blue/50 bg-violet-accent/5 dark:bg-electric-blue/5"
          }`}
        />
      </motion.div>

      {/* Inner Precision Dot (Fast follow) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full will-change-transform"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 6 : 7,
          height: isHovered ? 6 : 7,
          opacity: isVisible ? 1 : 0,
          scale: isHovered ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-violet-accent to-electric-blue shadow-[0_0_8px_#00d4ff]" />
      </motion.div>
    </>
  );
}
