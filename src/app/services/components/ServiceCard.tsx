"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
  index: number;
};

const viewport = { once: true, margin: "-8%" as const };

export function ServiceCard({ service, index }: ServiceCardProps) {
  const reduceMotion = useReducedMotion();
  const animateOnMount = index < 3;

  const content = (
    <div className="flex h-full flex-col gap-3 p-5 md:gap-3.5 md:p-6">
      <p className="font-inter text-xs font-medium tracking-[0.14em] text-white/35">
        /{service.number}
      </p>
      <div className="flex h-9 w-9 items-center justify-center rounded-[0.35rem] border border-white/12 bg-white/[0.03]">
        <Image
          src={service.icon}
          alt={service.iconAlt}
          width={20}
          height={20}
          unoptimized
          className="h-5 w-5 brightness-0 invert opacity-90"
        />
      </div>
      <h3 className="font-jakarta text-lg font-semibold tracking-[-0.02em] text-white md:text-xl">
        {service.title}
      </h3>
      <p className="font-inter text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
        {service.tagline}
      </p>
      <div className="flex flex-wrap gap-1.5 pt-0.5">
        {service.highlights.map((highlight) => (
          <span
            key={highlight}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-inter text-[0.6875rem] leading-none text-white/50"
          >
            {highlight}
          </span>
        ))}
      </div>
    </div>
  );

  if (reduceMotion) {
    return content;
  }

  const revealProps = animateOnMount
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: 0.75,
          delay: index * 0.08,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
      };

  return <motion.div {...revealProps}>{content}</motion.div>;
}
