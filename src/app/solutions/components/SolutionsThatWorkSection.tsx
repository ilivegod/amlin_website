import { RevealTitle } from "@/components/RevealTitle";
import { industrySolutions } from "@/data/industry-solutions";

import { IndustrySolutionRow } from "./IndustrySolutionRow";

export function SolutionsThatWorkSection() {
  return (
    <section className="relative w-full bg-[#050505] px-[var(--hero-gutter)] pb-24 font-inter">
      <div className="border-b work-grid-line pb-10 pt-12 md:pb-12 md:pt-16">
        <RevealTitle
          as="h2"
          lines={["Solutions that work", "for our partners"]}
          className="font-polysans text-[clamp(2.25rem,5.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          ariaLabel="Solutions that work for our partners"
        />
        <p className="mt-6 max-w-2xl font-inter text-[clamp(1rem,1.35vw,1.2rem)] leading-[1.65] text-white/55">
          We don&apos;t just build software, we craft industry-specific solutions
          that solve real problems and deliver measurable impact.
        </p>
      </div>

      <div className="w-full border-t work-grid-line">
        {industrySolutions.map((solution, index) => (
          <IndustrySolutionRow
            key={solution.id}
            solution={solution}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
