"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { RevealTitle } from "@/components/RevealTitle";

const capabilities = [
  { id: "digital-transformation", label: "Digital Transformation," },
  { id: "workflow-ai", label: "Workflow & AI Automation," },
  { id: "ux-ui", label: "UX/UI & Digital Product Design," },
  { id: "data-systems", label: "Data Systems & Analytics," },
  {
    id: "cloud-engineering",
    label: "Systems Integration & Cloud Engineering,",
    multiline: true,
  },
  { id: "cybersecurity", label: "Cybersecurity & Compliance" },
] as const;

const hoverSpring = {
  type: "spring" as const,
  stiffness: 420,
  damping: 32,
  mass: 0.85,
};

const resetSpring = {
  type: "spring" as const,
  stiffness: 360,
  damping: 40,
  mass: 0.75,
};

const idleState = {
  y: 0,
  x: 0,
  scale: 1,
  opacity: 0.42,
};

function getItemMotion(index: number, hovered: number | null, reduceMotion: boolean) {
  if (reduceMotion || hovered === null) {
    return idleState;
  }

  const offset = index - hovered;

  if (offset === 0) {
    return { y: 0, x: 16, scale: 1.05, opacity: 1 };
  }

  const push = Math.sign(offset) * (8 + Math.abs(offset) * 4);

  return {
    y: push,
    x: 0,
    scale: 0.96 - Math.min(Math.abs(offset) * 0.01, 0.03),
    opacity: Math.max(0.2, 0.38 - Math.abs(offset) * 0.06),
  };
}

export function CapabilitiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh w-full flex-1 flex-col items-center justify-center overflow-hidden bg-[#050505] px-[var(--hero-gutter)] py-24">
      <div
        className="relative flex w-full max-w-5xl flex-col items-center gap-1 md:gap-0"
        onMouseLeave={() => setHoveredIndex(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setHoveredIndex(null);
          }
        }}
      >
        {capabilities.map((item, index) => {
          const motionState = getItemMotion(index, hoveredIndex, !!reduceMotion);
          const isActive = hoveredIndex === index;
          const isIdle = hoveredIndex === null;

          return (
            <motion.button
              key={item.id}
              type="button"
              onMouseEnter={() => setHoveredIndex(index)}
              onFocus={() => setHoveredIndex(index)}
              animate={motionState}
              transition={isIdle ? resetSpring : hoverSpring}
              className={[
                "relative w-full cursor-pointer border-0 bg-transparent py-2 text-center text-[clamp(1.75rem,4.8vw,3.75rem)] leading-[1.12] tracking-[-0.02em] outline-none transition-[font-family,font-weight,color] duration-300 md:py-2.5",
                isActive
                  ? "font-polysans font-extrabold"
                  : "font-inter font-semibold",
                "focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]",
              ].join(" ")}
              style={{ zIndex: isActive ? 10 : 1 }}
            >
              {"multiline" in item && item.multiline ? (
                <RevealTitle
                  as="span"
                  variant="inherit"
                  lines={["Systems Integration & Cloud", "Engineering,"]}
                  startDelay={index * 0.08}
                  className={
                    isActive
                      ? "text-white"
                      : "text-[#b0b0b0]/55"
                  }
                />
              ) : (
                <RevealTitle
                  as="span"
                  variant="inherit"
                  lines={[item.label]}
                  startDelay={index * 0.08}
                  className={
                    isActive
                      ? "text-white"
                      : "text-[#b0b0b0]/55"
                  }
                />
              )}

              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 top-1/2 hidden h-px origin-left bg-white md:block"
                initial={false}
                animate={{
                  width: isActive ? 48 : 0,
                  opacity: isActive ? 0.9 : 0,
                }}
                transition={isIdle ? resetSpring : hoverSpring}
              />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
