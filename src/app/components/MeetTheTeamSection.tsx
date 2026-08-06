"use client";

import Image from "next/image";

import { RevealTitle } from "@/components/RevealTitle";

const team = [
  {
    name: "Godwin Ampaw",
    role: "Founder",
    image: "/photos/godwin-ampaw.png",
    bio: "Godwin founded Amlin with a clear belief: technology should solve real problems from day one. He leads strategy, client partnerships, and the vision that keeps every build focused on outcomes, not overhead.",
  },
  {
    name: "Seka Bernard Junior",
    role: "Lead Developer",
    image: "/photos/manWorking.png",
    bio: "Seka is a talented AI and software engineer,he leads engineering across Amlin's products; from architecture to delivery. He turns complex requirements into reliable, scalable systems and keeps every project moving with clarity, speed, and craft.",
  },
] as const;

export function MeetTheTeamSection() {
  return (
    <section
      id="meet-the-team"
      className="bg-[#050505] px-[var(--hero-gutter)] py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto w-full max-w-[52rem]">
          <RevealTitle
            as="h2"
            text="Meet the Team"
            className="font-polysans text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
          />

          <div className="mt-14 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
            {team.map((member) => (
              <article key={member.name} className="flex w-full flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#141414]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <h3 className="font-polysans text-xl font-semibold text-white md:text-2xl">
                    {member.name}
                  </h3>
                  <p className="font-inter text-sm text-white/50">{member.role}</p>
                  <p className="mt-2 font-inter text-sm leading-relaxed text-white/65 md:text-base">
                    {member.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
