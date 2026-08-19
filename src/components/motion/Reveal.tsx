"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  width?: "fit-content" | "100%";
  className?: string;
  type?: "fade" | "mask";
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  width = "100%",
  className = "",
  type = "fade",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is preferred, simplify to a basic fade with no movement
  if (shouldReduceMotion) {
    return (
      <div style={{ width }} className={className}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.3, delay }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  if (type === "mask") {
    return (
      <div style={{ width, overflow: "hidden" }} className={className}>
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1], // cinematic editorial ease (expo-ish)
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Default fade
  return (
    <div style={{ width }} className={className}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
