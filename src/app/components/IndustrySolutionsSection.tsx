"use client";

import {
  Activity,
  Building2,
  BriefcaseBusiness,
  Truck,
  type LucideIcon,
} from "lucide-react";

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

export function IndustrySolutionsIntro() {
  return (
    <>
      <h2 className="max-w-3xl font-polysans text-[clamp(2.25rem,5.4vw,4.75rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-[#050505]">
        Industry Solutions
      </h2>
      <p className="mt-6 max-w-2xl font-inter text-[clamp(1.0625rem,1.55vw,1.3125rem)] font-normal leading-[1.65] text-[#555555]">
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

export function IndustrySolutionsSection() {
  return (
    <section id="industry-solutions" className="relative z-10 bg-white">
      <div className="px-[var(--hero-gutter)] pb-24 pt-8">
        <div className="mx-auto max-w-6xl">
          <IndustrySolutionsIntro />
          <div className="industry-grid mt-12 grid grid-cols-1 border-t border-[#eaeaea] sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
            <IndustryGridContent />
          </div>
        </div>
      </div>
    </section>
  );
}
