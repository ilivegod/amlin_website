"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

import type { Project } from "@/data/projects";

type ProjectRowProps = {
  project: Project;
  isFirst?: boolean;
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

const textContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function ProjectRow({ project, isFirst = false }: ProjectRowProps) {
  const reduceMotion = useReducedMotion();
  const isExternal = project.href.startsWith("http");

  const revealProps = isFirst
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport,
      };

  const mediaClassName =
    "aspect-[16/10] w-full overflow-hidden rounded-sm transition-transform duration-500 group-hover:scale-[1.005]";

  const mediaContent = project.media.src ? (
    <Image
      src={project.media.src}
      alt={project.media.alt}
      fill
      className="object-cover object-top"
      sizes="(max-width: 1024px) 100vw, 60vw"
      draggable={false}
    />
  ) : null;

  const content = (
    <article className="group grid w-full grid-cols-1 border-b work-grid-line py-10 md:py-14 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative w-full border-b work-grid-line p-4 md:p-6 lg:border-b-0 lg:border-r lg:py-0 lg:pr-8">
        {reduceMotion ? (
          <div
            className={`relative ${mediaClassName}`}
            style={project.media.src ? undefined : { background: project.media.gradient }}
            role="img"
            aria-label={project.media.alt}
          >
            {mediaContent}
          </div>
        ) : (
          <motion.div
            className={`relative ${mediaClassName}`}
            style={project.media.src ? undefined : { background: project.media.gradient }}
            role="img"
            aria-label={project.media.alt}
            variants={mediaVariants}
            {...revealProps}
          >
            {mediaContent}
          </motion.div>
        )}
      </div>

      <div className="grid min-h-[280px] grid-rows-[1fr_auto] lg:min-h-[420px] lg:pl-2">
        {reduceMotion ? (
          <>
            <div className="grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-2 lg:gap-8">
              <p className="font-inter text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">
                {project.description}
              </p>
              <h2 className="font-jakarta text-2xl font-semibold tracking-[-0.02em] text-[#b0b0b0] md:text-3xl lg:text-right">
                {project.title}
              </h2>
            </div>
            <div className="flex items-center justify-between gap-4 p-6 md:p-8 md:pt-6">
              <p className="font-inter text-sm font-medium tracking-wide text-white/45">
                {project.category}
              </p>
              {isExternal && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title}`}
                  className="inline-flex rounded-sm text-white/35 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-2 lg:gap-8"
              variants={textContainerVariants}
              {...revealProps}
            >
              <motion.p
                className="font-inter text-sm leading-relaxed text-white/65 md:text-[0.9375rem]"
                variants={textItemVariants}
              >
                {project.description}
              </motion.p>
              <motion.h2
                className="font-jakarta text-2xl font-semibold tracking-[-0.02em] text-[#b0b0b0] md:text-3xl lg:text-right"
                variants={textItemVariants}
              >
                {project.title}
              </motion.h2>
            </motion.div>

            <motion.div
              className="flex items-center justify-between gap-4 p-6 md:p-8 md:pt-6"
              variants={textItemVariants}
              {...revealProps}
            >
              <p className="font-inter text-sm font-medium tracking-wide text-white/45">
                {project.category}
              </p>
              {isExternal && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${project.title}`}
                  className="inline-flex rounded-sm text-white/35 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </motion.div>
          </>
        )}
      </div>
    </article>
  );

  return (
    <div className="block w-full">
      {content}
    </div>
  );
}
