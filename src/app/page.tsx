"use client";

import Link from "next/link";

import { ContactLink } from "@/components/ContactLink";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { RevealTitle } from "@/components/RevealTitle";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { HeroParallax } from "./components/HeroParallax";
import { IndustriesStrip } from "./components/IndustriesStrip";
import { IndustrySolutionsSection } from "./components/IndustrySolutionsSection";
import { MeetTheTeamSection } from "./components/MeetTheTeamSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

const headlineLines = [
  "Custom technology",
  "that works from day one.",
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <HeroParallax
        background={<HeroBackground className="absolute inset-0" />}
        scrim={
          <div
            className="hero__scrim pointer-events-none absolute inset-0 z-[1]"
            aria-hidden="true"
          />
        }
      >
        <div className="mx-auto flex h-full w-full flex-col px-[var(--hero-gutter)] pb-6 pt-[var(--nav-h)] md:pb-10">
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center text-center">
            <RevealTitle
              as="h1"
              lines={headlineLines}
              variant="inherit"
              align="center"
              className="font-jakarta text-[clamp(2.25rem,6.2vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white"
              ariaLabel="Custom technology that works from day one."
            />

            <p
              className="amlin-fade mx-auto mt-6 max-w-xl font-inter text-[clamp(0.875rem,1.1vw,1.0625rem)] font-normal leading-[1.6] text-white/[0.72]"
              style={{ animationDelay: "1.2s" }}
            >
              We design and build custom software, automation, and digital
              systems for healthcare, real estate, transport, and corporate
              teams.
            </p>

            <div
              className="amlin-fade mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
              style={{ animationDelay: "1.55s" }}
            >
              <Link
                href="/work"
                className="amlin-cta-solid group inline-flex items-center gap-2.5 rounded-full border border-white px-[1.6rem] py-[0.9rem] font-inter text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amlin-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041525]"
              >
                See our work
                <span
                  aria-hidden="true"
                  className="relative z-[1] transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  &rarr;
                </span>
              </Link>

              <ContactLink className="amlin-cta-fill inline-flex items-center rounded-full border border-white/25 px-[1.5rem] py-[0.85rem] font-inter text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amlin-accent)]">
                Talk to our team
              </ContactLink>
            </div>
          </div>

          <div className="flex justify-center pb-2">
            <IndustriesStrip delay="1.85s" />
          </div>
        </div>
      </HeroParallax>

      <IndustrySolutionsSection />

      <TestimonialsSection />
      <CapabilitiesSection />
      <MeetTheTeamSection />
    </div>
  );
}
