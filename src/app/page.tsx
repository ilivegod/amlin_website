"use client";

import Link from "next/link";

import { HeroBackground } from "@/components/hero/HeroBackground";
import { RevealTitle } from "@/components/RevealTitle";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
// import Challenge from "./components/Challenge";
import { HeroParallax } from "./components/HeroParallax";
import { IndustriesStrip } from "./components/IndustriesStrip";
import { IndustrySolutionsSection } from "./components/IndustrySolutionsSection";
import { MeetTheTeamSection } from "./components/MeetTheTeamSection";
import { TestimonialsSection } from "./components/TestimonialsSection";

const headlineLines = [
  "Custom",
  "technology",
  "that works",
  "from day one.",
];

function scrollToMeetTheTeam(e: React.MouseEvent<HTMLAnchorElement>) {
  if (window.location.pathname !== "/") return;
  e.preventDefault();
  document.getElementById("meet-the-team")?.scrollIntoView({ behavior: "smooth" });
}

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
        <div className="mx-auto flex h-full w-full flex-col px-[var(--hero-gutter)] pb-8 pt-[var(--nav-h)] md:max-w-none">
          <div className="mx-auto flex w-full max-w-[42rem] flex-1 flex-col justify-center md:max-w-none">
          <p
            className="amlin-fade mb-5 font-inter text-[0.6875rem] font-normal uppercase tracking-[0.2em] text-white/[0.52] md:mb-6"
            style={{ animationDelay: "1.05s" }}
          >
            <span
              aria-hidden="true"
              className="mr-2.5 inline-block h-[5px] w-[5px] rounded-full bg-[var(--amlin-accent)]"
            />
            Amlin Technologies
          </p>

          <RevealTitle
            as="h1"
            lines={headlineLines}
            variant="inherit"
            className="font-polysans text-[clamp(2.25rem,6.8vw,5.75rem)] font-extrabold leading-[0.94] tracking-[-0.035em] text-white"
            ariaLabel="Custom technology that works from day one."
          />

          <p
            className="amlin-fade mt-5 max-w-[30rem] font-inter text-[clamp(0.875rem,1.1vw,1.0625rem)] font-normal leading-[1.55] text-white/[0.72] md:mt-6"
            style={{ animationDelay: "1.2s" }}
          >
            We design and build custom software, automation, and digital
            systems for healthcare, real estate, transport, and corporate
            teams, without the long timelines and generic solutions typical of
            most IT vendors.
          </p>

          <div
            className="amlin-fade mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center md:mt-8"
            style={{ animationDelay: "1.55s" }}
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-[1.6rem] py-[0.9rem] font-inter text-sm font-semibold text-[#041525] transition-all duration-300 hover:-translate-y-px hover:bg-[#f4fdff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amlin-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#041525]"
            >
              See our work
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </Link>

            <Link
              href="/#meet-the-team"
              onClick={scrollToMeetTheTeam}
              className="relative pb-[3px] font-inter text-sm font-medium text-white/[0.72] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-[var(--amlin-accent)] after:opacity-70 hover:text-white hover:after:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--amlin-accent)] rounded-sm"
            >
              Talk to our team
            </Link>
          </div>
          </div>

          <IndustriesStrip delay="1.85s" />
        </div>
      </HeroParallax>

      <IndustrySolutionsSection />

      <TestimonialsSection />
      <CapabilitiesSection />
      <MeetTheTeamSection />

      {/* <Challenge /> */}
    </div>
  );
}
