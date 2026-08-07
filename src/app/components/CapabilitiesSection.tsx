"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { RevealTitle } from "@/components/RevealTitle";
import { useIsMobile } from "@/hooks/useIsMobile";

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

const mobileCycleSpring = {
  type: "spring" as const,
  stiffness: 280,
  damping: 28,
  mass: 0.9,
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

function getMobileItemMotion(
  index: number,
  activeIndex: number,
  reduceMotion: boolean
) {
  if (reduceMotion) {
    return idleState;
  }

  if (index === activeIndex) {
    return { y: 0, x: 0, scale: 1.06, opacity: 1 };
  }

  return {
    y: 0,
    x: 0,
    scale: 0.94,
    opacity: 0.34,
  };
}

export function CapabilitiesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile || reduceMotion) return;

    const timer = window.setInterval(() => {
      setMobileActiveIndex((current) => (current + 1) % capabilities.length);
    }, 2000);

    return () => window.clearInterval(timer);
  }, [isMobile, reduceMotion]);

  const activeIndex = isMobile ? mobileActiveIndex : hoveredIndex;

  return (
    <section className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden bg-[#050505] px-[var(--hero-gutter)] py-12 md:min-h-dvh md:py-24">
      <div
        className="relative flex w-full max-w-5xl flex-col items-center gap-0.5 md:gap-0"
        onMouseLeave={() => {
          if (!isMobile) setHoveredIndex(null);
        }}
        onBlur={(event) => {
          if (isMobile) return;
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setHoveredIndex(null);
          }
        }}
      >
        {capabilities.map((item, index) => {
          const motionState = isMobile
            ? getMobileItemMotion(index, mobileActiveIndex, !!reduceMotion)
            : getItemMotion(index, hoveredIndex, !!reduceMotion);
          const isActive = activeIndex === index;
          const isIdle = !isMobile && hoveredIndex === null;

          return (
            <motion.button
              key={item.id}
              type="button"
              onMouseEnter={() => {
                if (!isMobile) setHoveredIndex(index);
              }}
              onFocus={() => {
                if (!isMobile) setHoveredIndex(index);
              }}
              animate={motionState}
              transition={
                isMobile ? mobileCycleSpring : isIdle ? resetSpring : hoverSpring
              }
              className={[
                "relative w-full cursor-pointer border-0 bg-transparent py-1.5 text-center text-[clamp(1.75rem,4.8vw,3.75rem)] leading-[1.12] tracking-[-0.02em] outline-none transition-[font-family,font-weight,color] duration-300 md:py-2.5",
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
