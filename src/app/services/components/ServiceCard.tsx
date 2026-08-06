"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import type { Service } from "@/data/services";

type ServiceCardProps = {
  service: Service;
};

const viewport = { once: true, margin: "-8%" as const };

export function ServiceCard({ service }: ServiceCardProps) {
  const reduceMotion = useReducedMotion();

  const content = (
    <div className="flex h-full flex-col gap-4 p-6 md:gap-5 md:p-8">
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
      <h3 className="font-polysans text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl">
        {service.title}
      </h3>
      <p className="max-w-sm font-inter text-sm leading-relaxed text-white/55 md:text-[0.9375rem]">
        {service.description}
      </p>
    </div>
  );

  if (reduceMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {content}
    </motion.div>
  );
}
