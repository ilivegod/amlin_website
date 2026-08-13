import { RevealTitle } from "@/components/RevealTitle";

export function ServicesIntro() {
  return (
    <section className="relative w-full bg-[#050505] px-[var(--hero-gutter)] font-inter">
      <div className="border-b work-grid-line pb-10 pt-24 md:pb-12 md:pt-28">
        <RevealTitle
          as="h1"
          lines={["Your Vision.", "Our Expertise."]}
          className="font-jakarta text-[clamp(3rem,7.5vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          ariaLabel="Your Vision. Our Expertise."
        />
        <p className="mt-6 max-w-2xl font-inter text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.65] text-white/60 md:mt-8">
          We design and develop powerful digital solutions that solve real
          business problems. Whether you&apos;re starting from scratch,
          modernizing legacy systems, or scaling an existing product, our team
          delivers end-to-end services that transform your ideas into impact.
        </p>
      </div>
    </section>
  );
}
