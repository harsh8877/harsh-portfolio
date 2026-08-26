"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Magnetic({
  children,
  maxDistance = 12,
  className = "",
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Scale down delta to create a subtle attraction up to maxDistance (max ~12px)
    const factor = 0.35;
    const moveX = Math.max(Math.min(deltaX * factor, maxDistance), -maxDistance);
    const moveY = Math.max(Math.min(deltaY * factor, maxDistance), -maxDistance);

    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
        mass: 0.4,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
