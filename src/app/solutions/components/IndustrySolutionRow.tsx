"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import type { IndustrySolution } from "@/data/industry-solutions";

type IndustrySolutionRowProps = {
  solution: IndustrySolution;
  reverse?: boolean;
};

const viewport = { once: true, margin: "-10%" as const };

const mediaVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function IndustryMedia({
  solution,
  reduceMotion,
}: {
  solution: IndustrySolution;
  reduceMotion: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const showImage = solution.image && !imageError;

  const media = showImage ? (
    <Image
      src={solution.image!}
      alt={solution.imageAlt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 55vw"
      onError={() => setImageError(true)}
    />
  ) : (
    <div
      className="h-full w-full"
      style={{ background: solution.gradient }}
      role="img"
      aria-label={solution.imageAlt}
    />
  );

  if (reduceMotion) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
        {media}
      </div>
    );
  }

  return (
    <motion.div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-sm"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={mediaVariants}
    >
      {media}
    </motion.div>
  );
}

export function IndustrySolutionRow({
  solution,
  reverse = false,
}: IndustrySolutionRowProps) {
  const reduceMotion = useReducedMotion();

  const textBlock = reduceMotion ? (
    <div className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-10">
      <h3 className="font-polysans text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
        {solution.title}
      </h3>
      <p className="max-w-lg font-inter text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
        {solution.description}
      </p>
    </div>
  ) : (
    <motion.div
      className="flex flex-col justify-center gap-4 p-6 md:p-8 lg:p-10"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={textVariants}
    >
      <h3 className="font-polysans text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
        {solution.title}
      </h3>
      <p className="max-w-lg font-inter text-sm leading-relaxed text-white/60 md:text-[0.9375rem]">
        {solution.description}
      </p>
    </motion.div>
  );

  return (
    <article
      className={[
        "grid w-full grid-cols-1 border-b work-grid-line py-10 md:py-14",
        reverse
          ? "lg:grid-cols-[0.85fr_1.15fr]"
          : "lg:grid-cols-[1.15fr_0.85fr]",
      ].join(" ")}
    >
      <div
        className={[
          "border-b work-grid-line p-4 md:p-6 lg:border-b-0 lg:py-0",
          reverse
            ? "lg:order-2 lg:border-l lg:pl-8"
            : "lg:border-r lg:pr-8",
        ].join(" ")}
      >
        <IndustryMedia solution={solution} reduceMotion={!!reduceMotion} />
      </div>

      <div className={reverse ? "lg:order-1" : ""}>{textBlock}</div>
    </article>
  );
}
