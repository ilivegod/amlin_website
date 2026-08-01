"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Building2,
  BriefcaseBusiness,
  Truck,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const industries: {
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    name: "HealthCare",
    tagline: "Powering Better Care",
    description:
      "Patient portals, clinical workflows, and compliance-ready systems that help care teams deliver faster, safer outcomes.",
    icon: Activity,
  },
  {
    name: "Real Estate",
    tagline: "Sell Smarter, Faster",
    description:
      "Listing platforms, CRM integrations, and automation tools that shorten sales cycles and keep every deal moving.",
    icon: Building2,
  },
  {
    name: "Transport",
    tagline: "Drive Seamless Movement Care",
    description:
      "Fleet tracking, route optimization, and real-time logistics software built for reliability at scale.",
    icon: Truck,
  },
  {
    name: "Corporate",
    tagline: "Optimize. Innovate. Lead.",
    description:
      "Custom dashboards, internal tools, and process automation that cut waste and unlock new growth.",
    icon: BriefcaseBusiness,
  },
];

const GREY_BORDER = "#eaeaea";
const DARK_BORDER = "#050505";

const PIN_SCROLL_VH = 280;
const BORDER_FILL_START = 0.34;
const BORDER_FILL_END = 0.9;

type GridMetrics = {
  width: number;
  height: number;
  dividers: number[];
};

function IndustryGridContent() {
  return (
    <>
      {industries.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="industry-cell flex flex-col gap-5 p-6 md:gap-6 md:p-8 md:pt-9"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-[0.35rem] border border-[#050505]/12">
              <Icon className="size-[1.125rem] text-[#050505]" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-inter text-base font-semibold text-[#050505] md:text-lg">
                {item.name}:
              </p>
              <p className="font-inter text-base font-semibold leading-snug text-[#050505] md:text-lg">
                {item.tagline}
              </p>
            </div>
            <p className="max-w-[18rem] font-inter text-sm leading-relaxed text-[#888888] md:text-[0.9375rem]">
              {item.description}
            </p>
          </div>
        );
      })}
    </>
  );
}

type GridBordersProps = {
  metrics: GridMetrics;
  fillProgress: MotionValue<number>;
};

function GridBorders({ metrics, fillProgress }: GridBordersProps) {
  const { width, height, dividers } = metrics;

  const fillX = useTransform(fillProgress, (p) => p * width);
  const fillY = useTransform(fillProgress, (p) => p * height);

  const lineProps = {
    strokeWidth: 1,
    strokeLinecap: "butt" as const,
    vectorEffect: "nonScalingStroke" as const,
    shapeRendering: "crispEdges" as const,
  };

  if (width <= 0 || height <= 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
      aria-hidden="true"
    >
      {/* Horizontal: grey unfilled (right), black filled (left) */}
      <motion.line
        x1={fillX}
        y1={0.5}
        x2={width}
        y2={0.5}
        stroke={GREY_BORDER}
        {...lineProps}
      />
      <motion.line
        x1={0}
        y1={0.5}
        x2={fillX}
        y2={0.5}
        stroke={DARK_BORDER}
        {...lineProps}
      />

      {dividers.map((x) => (
        <g key={x}>
          {/* Vertical: grey unfilled (bottom), black filled (top) */}
          <motion.line
            x1={x}
            y1={fillY}
            x2={x}
            y2={height - 0.5}
            stroke={GREY_BORDER}
            {...lineProps}
          />
          <motion.line
            x1={x}
            y1={0.5}
            x2={x}
            y2={fillY}
            stroke={DARK_BORDER}
            {...lineProps}
          />
        </g>
      ))}
    </svg>
  );
}

function useGridMetrics(gridRef: React.RefObject<HTMLDivElement | null>) {
  const [metrics, setMetrics] = useState<GridMetrics>({
    width: 0,
    height: 0,
    dividers: [],
  });

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const measure = () => {
      const rect = grid.getBoundingClientRect();
      const cells = Array.from(
        grid.querySelectorAll<HTMLElement>(".industry-cell")
      );
      if (!cells.length) return;

      const firstRow = cells[0].getBoundingClientRect().top;
      const rowCells = cells.filter(
        (cell) => Math.abs(cell.getBoundingClientRect().top - firstRow) < 2
      );

      const dividers: number[] = [];
      for (let i = 0; i < rowCells.length - 1; i++) {
        const next = rowCells[i + 1].getBoundingClientRect();
        dividers.push(Math.round(next.left - rect.left) + 0.5);
      }

      setMetrics({
        width: rect.width,
        height: rect.height,
        dividers,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(grid);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [gridRef]);

  return metrics;
}

export function IndustrySolutionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const metrics = useGridMetrics(gridRef);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleReveal = useTransform(scrollYProgress, [0, 0.2], [40, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const bodyReveal = useTransform(scrollYProgress, [0.06, 0.28], [32, 0]);
  const bodyOpacity = useTransform(scrollYProgress, [0.06, 0.26], [0, 1]);
  const gridReveal = useTransform(scrollYProgress, [0.14, 0.36], [28, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.14, 0.32], [0, 1]);

  const borderFillProgress = useTransform(
    scrollYProgress,
    [BORDER_FILL_START, BORDER_FILL_END],
    [0, 1]
  );

  if (reduceMotion) {
    return (
      <section id="industry-solutions" className="relative bg-white">
        <div className="px-[var(--hero-gutter)] pb-24 pt-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="max-w-3xl font-polysans text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#050505]">
              Industry Solutions
            </h2>
            <p className="mt-6 max-w-2xl font-inter text-[clamp(1rem,1.4vw,1.25rem)] font-normal leading-[1.65] text-[#555555]">
              Every industry faces unique challenges and we&apos;re here to meet them
              head-on. From streamlining operations to unlocking new revenue streams,
              we help industry leaders innovate, adapt, and thrive.
            </p>
            <div className="industry-grid mt-12 grid grid-cols-1 border-t border-[#050505] sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
              <IndustryGridContent />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="industry-solutions" className="relative bg-white">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `calc(100vh + ${PIN_SCROLL_VH}vh)` }}
      >
        <div className="sticky top-0 z-10 flex h-svh flex-col justify-center bg-white px-[var(--hero-gutter)]">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center py-[var(--nav-h)]">
            <motion.h2
              style={{ y: titleReveal, opacity: titleOpacity }}
              className="max-w-3xl font-polysans text-[clamp(2.25rem,5.4vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#050505]"
            >
              Industry Solutions
            </motion.h2>

            <motion.p
              style={{ y: bodyReveal, opacity: bodyOpacity }}
              className="mt-6 max-w-2xl font-inter text-[clamp(1.0625rem,1.55vw,1.3125rem)] font-normal leading-[1.65] text-[#555555]"
            >
              Every industry faces unique challenges and we&apos;re here to meet them
              head-on. From streamlining operations to unlocking new revenue streams,
              we help industry leaders innovate, adapt, and thrive.
            </motion.p>

            <motion.div
              ref={gridRef}
              style={{ y: gridReveal, opacity: gridOpacity }}
              className="industry-grid industry-grid--animated relative mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:mt-14"
            >
              <GridBorders metrics={metrics} fillProgress={borderFillProgress} />
              <IndustryGridContent />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
