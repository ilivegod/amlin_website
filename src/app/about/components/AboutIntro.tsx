import Image from "next/image";

import { ContactLink } from "@/components/ContactLink";
import { RevealTitle } from "@/components/RevealTitle";

export function AboutIntro() {
  return (
    <section className="relative w-full bg-[#050505] px-[var(--hero-gutter)] font-inter">
      <div className="border-b work-grid-line pb-10 pt-24 md:pb-12 md:pt-28">
        <RevealTitle
          as="h1"
          lines={["Our Mission", "& Vision"]}
          className="font-jakarta text-[clamp(3rem,7.5vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
          ariaLabel="Our Mission and Vision"
        />
        <p className="mt-6 max-w-3xl font-inter text-[clamp(1rem,1.45vw,1.25rem)] leading-[1.65] text-white/60 md:mt-8">
          We are driven to build smart, seamless digital ecosystems that simplify
          operations, fuel innovation, and empower lasting change. Our vision is to
          set the global standard for digital transformation through intuitive,
          scalable solutions that put users first and inspire excellence.
        </p>
        <ContactLink className="mt-8 inline-flex items-center gap-2 font-inter text-sm font-medium text-white/70 transition-colors hover:text-white">
          Get in touch
          <span aria-hidden="true">&rarr;</span>
        </ContactLink>
      </div>

      <div className="border-b work-grid-line py-8 md:py-12">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm md:aspect-[21/9]">
          <Image
            src="/photos/about-mission.jpg"
            alt="Team collaborating in a modern workspace"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
