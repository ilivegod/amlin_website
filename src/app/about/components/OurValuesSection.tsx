"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { RevealTitle } from "@/components/RevealTitle";
import { valueCards, type ValueCard } from "@/data/values";

const hoverSpring = {
  type: "spring" as const,
  stiffness: 180,
  damping: 32,
  mass: 1.05,
};

const slowEase = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

function ValueCardMedia({ card }: { card: ValueCard }) {
  const [imageError, setImageError] = useState(false);
  const showImage = card.image && !imageError;

  if (showImage) {
    return (
      <Image
        src={card.image!}
        alt={card.imageAlt}
        fill
        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
        onError={() => setImageError(true)}
      />
    );
  }

  return (
    <div
      className="h-full w-full transition-transform duration-[1100ms] ease-out group-hover:scale-105"
      style={{ background: card.gradient }}
      role="img"
      aria-label={card.imageAlt}
    />
  );
}

function DesktopValueCard({
  card,
  index,
  hoveredIndex,
  setHoveredIndex,
  reduceMotion,
}: {
  card: ValueCard;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  reduceMotion: boolean;
}) {
  const isHovered = hoveredIndex === index;
  const isOther = hoveredIndex !== null && !isHovered;

  const flexValue = isHovered ? 3.2 : isOther ? 0.85 : 1.35;

  return (
    <motion.article
      layout={!reduceMotion}
      className="group relative h-[34rem] cursor-pointer overflow-hidden border-r border-white/10 last:border-r-0"
      style={{ flex: reduceMotion ? 1 : flexValue }}
      transition={hoverSpring}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="absolute inset-0">
        <ValueCardMedia card={card} />
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10"
        animate={{
          opacity: isHovered ? 1 : 0.72,
        }}
        transition={{ duration: 0.72 }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle at 50% 100%, rgba(61,143,209,0.35), transparent 58%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 md:p-8">
        <motion.div
          animate={{ y: isHovered ? -8 : 0 }}
          transition={hoverSpring}
        >
          <h3 className="font-polysans text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">
            {card.title}
          </h3>
        </motion.div>

        <motion.p
          className="mt-3 max-w-md font-inter text-sm leading-relaxed text-white/72 md:text-[0.9375rem]"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 16,
            filter: isHovered ? "blur(0px)" : "blur(6px)",
          }}
          transition={slowEase}
        >
          {card.description}
        </motion.p>
      </div>

      <motion.span
        className="absolute left-6 top-6 z-10 h-px origin-left bg-white/80 md:left-8 md:top-8"
        initial={false}
        animate={{ width: isHovered ? 48 : 0, opacity: isHovered ? 1 : 0 }}
        transition={hoverSpring}
        aria-hidden="true"
      />
    </motion.article>
  );
}

export function OurValuesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-[#050505] px-[var(--hero-gutter)] py-16 font-inter md:py-24">
      <div className="border-b work-grid-line pb-10">
        <RevealTitle
          as="h2"
          text="Our Values"
          className="font-polysans text-[clamp(2.25rem,5.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
        />
        <p className="mt-6 max-w-2xl font-inter text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.65] text-white/55">
          At the core of everything we do are the principles that guide our work,
          shape our culture, and define how we create value consistently,
          ethically, and with purpose.
        </p>
      </div>

      <div className="mt-10 hidden overflow-hidden rounded-sm border border-white/10 md:flex">
        {valueCards.map((card, index) => (
          <DesktopValueCard
            key={card.id}
            card={card}
            index={index}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 md:hidden">
        {valueCards.map((card) => (
          <article
            key={card.id}
            className="group relative h-[26rem] overflow-hidden rounded-sm border border-white/10"
          >
            <div className="absolute inset-0">
              <ValueCardMedia card={card} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-polysans text-2xl font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-2 font-inter text-sm leading-relaxed text-white/70">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
