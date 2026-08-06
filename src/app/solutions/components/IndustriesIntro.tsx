import { RevealTitle } from "@/components/RevealTitle";

export function IndustriesIntro() {
  return (
    <section className="relative w-full bg-[#050505] px-[var(--hero-gutter)] font-inter">
      <div className="border-b work-grid-line pb-10 pt-24 md:pb-12 md:pt-28">
        <RevealTitle
          as="h1"
          text="Industry Solutions"
          className="font-polysans text-[clamp(3rem,7.5vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
        />
        <p className="mt-6 max-w-3xl font-inter text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.65] text-white/60 md:mt-8">
          Every industry faces unique challenges, and we&apos;re here to meet them
          head-on. At Amlin, we go beyond one-size-fits-all solutions. We partner
          with organizations to understand their core operations, pain points, and
          aspirations, then engineer custom software that drives measurable
          outcomes.
        </p>
      </div>

      <div className="border-b work-grid-line py-8 md:py-12">
        <div
          className="aspect-[16/10] w-full overflow-hidden rounded-sm md:aspect-[21/9]"
          style={{
            background:
              "linear-gradient(135deg, #0b2850 0%, #141414 42%, #1a4d78 100%)",
          }}
          role="img"
          aria-label="Industry solutions showcase"
        />
      </div>
    </section>
  );
}
