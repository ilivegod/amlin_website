"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";

import type { Project } from "@/data/projects";

type ProjectRowProps = {
  project: Project;
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

export function ProjectRow({ project }: ProjectRowProps) {
  const reduceMotion = useReducedMotion();
  const isExternal = project.href.startsWith("http");

  const content = (
    <article className="group grid w-full grid-cols-1 border-b work-grid-line py-10 md:py-14 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative w-full border-b work-grid-line p-4 md:p-6 lg:border-b-0 lg:border-r lg:py-0 lg:pr-8">
        {reduceMotion ? (
          <div
            className="aspect-[16/10] w-full overflow-hidden rounded-sm"
            style={{ background: project.media.gradient }}
            role="img"
            aria-label={project.media.alt}
          />
        ) : (
          <motion.div
            className="aspect-[16/10] w-full overflow-hidden rounded-sm transition-transform duration-500 group-hover:scale-[1.005]"
            style={{ background: project.media.gradient }}
            role="img"
            aria-label={project.media.alt}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={mediaVariants}
          />
        )}
      </div>

      <div className="grid min-h-[280px] grid-rows-[1fr_auto] lg:min-h-[420px] lg:pl-2">
        {reduceMotion ? (
          <>
            <div className="grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-2 lg:gap-8">
              <p className="font-inter text-sm leading-relaxed text-white/65 md:text-[0.9375rem]">
                {project.description}
              </p>
              <h2 className="font-polysans text-2xl font-semibold text-white md:text-3xl lg:text-right">
                {project.title}
              </h2>
            </div>
            <div className="flex items-center justify-between gap-4 p-6 md:p-8 md:pt-6">
              <p className="font-inter text-sm font-medium tracking-wide text-white/45">
                {project.category}
              </p>
              {isExternal && (
                <ExternalLink
                  className="h-4 w-4 text-white/35"
                  aria-hidden="true"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-2 lg:gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={textContainerVariants}
            >
              <motion.p
                className="font-inter text-sm leading-relaxed text-white/65 md:text-[0.9375rem]"
                variants={textItemVariants}
              >
                {project.description}
              </motion.p>
              <motion.h2
                className="font-polysans text-2xl font-semibold text-white md:text-3xl lg:text-right"
                variants={textItemVariants}
              >
                {project.title}
              </motion.h2>
            </motion.div>

            <motion.div
              className="flex items-center justify-between gap-4 p-6 md:p-8 md:pt-6"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={textItemVariants}
            >
              <p className="font-inter text-sm font-medium tracking-wide text-white/45">
                {project.category}
              </p>
              {isExternal && (
                <ExternalLink
                  className="h-4 w-4 text-white/35 transition-colors group-hover:text-white/70"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          </>
        )}
      </div>
    </article>
  );

  if (project.href === "#") {
    return (
      <div className="block w-full" aria-label={`${project.title} — coming soon`}>
        {content}
      </div>
    );
  }

  return (
    <a
      href={project.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      aria-label={`View ${project.title}`}
    >
      {content}
    </a>
  );
}
