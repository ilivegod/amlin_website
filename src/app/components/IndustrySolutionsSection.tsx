"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Building2,
  BriefcaseBusiness,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { RevealTitle } from "@/components/RevealTitle";

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

const GREY_BORDER = "#2a2a2a";
const FILL_BORDER = "#5a5a5a";

const PIN_SCROLL_VH = 280;
const BORDER_FILL_START = 0.34;
const BORDER_FILL_END = 0.9;

export function IndustrySolutionsIntro() {
  return (
    <>
      <RevealTitle
        as="h2"
        text="Industry Solutions"
        className="max-w-3xl font-polysans text-[clamp(2.25rem,5.4vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.03em]"
      />
      <p className="mt-6 max-w-2xl font-inter text-[clamp(1.0625rem,1.55vw,1.3125rem)] font-normal leading-[1.65] text-white/60">
        Every industry faces unique challenges and we&apos;re here to meet them
        head-on. From streamlining operations to unlocking new revenue streams,
        we help industry leaders innovate, adapt, and thrive.
      </p>
    </>
  );
}

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
            <div className="flex h-9 w-9 items-center justify-center rounded-[0.35rem] border border-white/12">
              <Icon className="size-[1.125rem] text-white" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-inter text-base font-semibold text-white md:text-lg">
                {item.name}:
              </p>
              <p className="font-inter text-base font-semibold leading-snug text-white md:text-lg">
                {item.tagline}
              </p>
            </div>
            <p className="max-w-[18rem] font-inter text-sm leading-relaxed text-white/50 md:text-[0.9375rem]">
              {item.description}
            </p>
          </div>
        );
      })}
    </>
  );
}

type GridMetrics = {
  width: number;
  height: number;
  dividers: number[];
};

type GridBordersProps = {
  metrics: GridMetrics;
  fillProgress: MotionValue<number>;
};

function GridBorders({ metrics, fillProgress }: GridBordersProps) {
  const { width, height, dividers } = metrics;

  const horizontalClipRight = useTransform(
    fillProgress,
    (p) => `${(1 - p) * 100}%`
  );
  const horizontalClip = useMotionTemplate`inset(0 ${horizontalClipRight} 0 0)`;

  const verticalClipBottom = useTransform(
    fillProgress,
    (p) => `${(1 - p) * 100}%`
  );
  const verticalClip = useMotionTemplate`inset(0 0 ${verticalClipBottom} 0)`;

  const lineProps = {
    strokeWidth: 1,
    strokeLinecap: "butt" as const,
    vectorEffect: "nonScalingStroke" as const,
  };

  if (width <= 0 || height <= 0) return null;

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <g stroke={GREY_BORDER} fill="none" {...lineProps}>
        <path d={`M 0.5 0.5 H ${width - 0.5}`} />
        {dividers.map((x) => (
          <path key={`grey-${x}`} d={`M ${x} 0.5 V ${height - 0.5}`} />
        ))}
      </g>

      <motion.g
        stroke={FILL_BORDER}
        fill="none"
        {...lineProps}
        style={{ clipPath: horizontalClip }}
      >
        <path d={`M 0.5 0.5 H ${width - 0.5}`} />
      </motion.g>

      {dividers.map((x) => (
        <motion.g
          key={`fill-${x}`}
          stroke={FILL_BORDER}
          fill="none"
          {...lineProps}
          style={{ clipPath: verticalClip }}
        >
          <path d={`M ${x} 0.5 V ${height - 0.5}`} />
        </motion.g>
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
        const current = rowCells[i].getBoundingClientRect();
        const next = rowCells[i + 1].getBoundingClientRect();
        const x = (current.right + next.left) / 2 - rect.left;

        if (x > 8 && x < rect.width - 8) {
          dividers.push(Math.round(x) + 0.5);
        }
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
  const isMobile = useIsMobile();
  const metrics = useGridMetrics(gridRef);
  const useStaticLayout = reduceMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const gridReveal = useTransform(scrollYProgress, [0.08, 0.32], [28, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0.08, 0.28], [0, 1]);

  const borderFillProgress = useTransform(
    scrollYProgress,
    [BORDER_FILL_START, BORDER_FILL_END],
    [0, 1]
  );

  if (useStaticLayout) {
    return (
      <section
        id="industry-solutions"
        className="relative z-10 flex min-h-dvh flex-col justify-center bg-[#050505]"
      >
        <div className="w-full px-[var(--hero-gutter)] py-[var(--nav-h)]">
          <div className="mx-auto w-full max-w-6xl">
            <IndustrySolutionsIntro />
            <div className="industry-grid mt-12 grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
              <IndustryGridContent />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="industry-solutions" className="relative z-10 bg-[#050505]">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `calc(100dvh + ${PIN_SCROLL_VH}vh)` }}
      >
        <div className="sticky top-0 z-10 flex h-dvh flex-col justify-center bg-[#050505] px-[var(--hero-gutter)]">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center py-[var(--nav-h)]">
            <IndustrySolutionsIntro />

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
