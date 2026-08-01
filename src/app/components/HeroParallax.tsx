"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type HeroParallaxProps = {
  background: ReactNode;
  scrim: ReactNode;
  children: ReactNode;
};

export function HeroParallax({ background, scrim, children }: HeroParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45, 1], [1, 0.65, 0.1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.22]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

  if (reduceMotion) {
    return (
      <section className="hero relative min-h-screen overflow-hidden">
        {background}
        {scrim}
        <div className="relative z-10">{children}</div>
      </section>
    );
  }

  return (
    <section ref={ref} className="hero relative min-h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: bgScale, y: bgY }}
      >
        {background}
      </motion.div>

      {scrim}

      <motion.div
        className="relative z-10 will-change-transform"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {children}
      </motion.div>
    </section>
  );
}
