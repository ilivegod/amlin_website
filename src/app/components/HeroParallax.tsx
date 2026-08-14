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

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.85, 0.55]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} className="hero relative h-dvh overflow-hidden">
      {reduceMotion ? (
        <>
          <div className="absolute inset-0">{background}</div>
          {scrim}
          <div className="relative z-10 h-full">{children}</div>
        </>
      ) : (
        <>
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ scale: bgScale, y: bgY }}
          >
            {background}
          </motion.div>

          {scrim}

          <motion.div
            className="relative z-10 h-full will-change-transform"
            style={{ y: contentY, opacity: contentOpacity }}
          >
            {children}
          </motion.div>
        </>
      )}
    </section>
  );
}
