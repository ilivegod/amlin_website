"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

const titleWords = ["Featured", "Projects"];

const wordVariants = {
  hidden: { y: "135%", opacity: 0, filter: "blur(14px)", scale: 0.92 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.1,
      delay: i * 0.18,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function FeaturedProjectsTitle() {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const reduceMotion = useReducedMotion();

  return (
    <h1
      ref={ref}
      className="font-polysans text-[clamp(3rem,7.5vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#b0b0b0]"
      aria-label="Featured Projects"
    >
      <span className="flex flex-wrap gap-x-[0.28em]">
        {titleWords.map((word, index) => (
          <span key={word} className="inline-block overflow-hidden pb-[0.1em]">
            {reduceMotion ? (
              <span className="inline-block">{word}</span>
            ) : (
              <motion.span
                className="inline-block"
                custom={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={wordVariants}
              >
                {word}
              </motion.span>
            )}
          </span>
        ))}
      </span>
    </h1>
  );
}
