"use client";

import clsx from "clsx";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ComponentPropsWithoutRef, type ElementType } from "react";

const unitVariants = (startDelay: number) => ({
  hidden: { y: "135%", opacity: 0, filter: "blur(14px)", scale: 0.92 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.1,
      delay: startDelay + i * 0.18,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
});

type RevealTitleProps<T extends ElementType> = {
  as?: T;
  className?: string;
  text?: string;
  lines?: string[];
  ariaLabel?: string;
  startDelay?: number;
  variant?: "default" | "inherit";
  align?: "left" | "center";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function RevealTitle<T extends ElementType = "h2">({
  as,
  className,
  text,
  lines,
  ariaLabel,
  startDelay = 0,
  variant = "default",
  align = "left",
  ...rest
}: RevealTitleProps<T>) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });
  const reduceMotion = useReducedMotion();
  const variants = unitVariants(startDelay);

  const isLineMode = Boolean(lines?.length);
  const units = isLineMode ? lines! : text?.split(" ") ?? [];
  const label = ariaLabel ?? text ?? lines?.join(" ");
  const isCentered = align === "center";

  return (
    <Tag
      ref={ref}
      className={clsx(
        variant === "default" && "text-[#b0b0b0]",
        isCentered && "text-center",
        className
      )}
      aria-label={label}
      {...rest}
    >
      {isLineMode ? (
        <span
          className={clsx(
            "flex flex-col",
            isCentered && "items-center"
          )}
        >
          {units.map((line, index) => (
            <span key={`${line}-${index}`} className="block overflow-hidden pb-[0.1em]">
              {reduceMotion ? (
                <span className="block">{line}</span>
              ) : (
                <motion.span
                  className="block"
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={variants}
                >
                  {line}
                </motion.span>
              )}
            </span>
          ))}
        </span>
      ) : (
        <span
          className={clsx(
            "flex flex-wrap gap-x-[0.28em]",
            isCentered && "justify-center"
          )}
        >
          {units.map((word, index) => (
            <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.1em]">
              {reduceMotion ? (
                <span className="inline-block">{word}</span>
              ) : (
                <motion.span
                  className="inline-block"
                  custom={index}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={variants}
                >
                  {word}
                </motion.span>
              )}
            </span>
          ))}
        </span>
      )}
    </Tag>
  );
}
