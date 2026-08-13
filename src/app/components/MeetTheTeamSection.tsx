"use client";

import Image from "next/image";

import { RevealTitle } from "@/components/RevealTitle";

const team = [
  {
    name: "Godwin Ampaw",
    role: "Founder & CEO",
    image: "/photos/godwin-ampaw.jpg",
    bio: [
      "Godwin leads Amlin’s strategy, client partnerships, and technology delivery, helping businesses use technology to solve real operational and customer challenges.",
      "With a background in digital transformation, health informatics, data analytics, and technology delivery, he founded Amlin to help organisations modernise and stay ahead as AI and digital technologies reshape how businesses operate.",
    ],
  },
  {
    name: "Seka Bernard Junior",
    role: "Product Engineer",
    image: "/photos/sekaJunior.png",
    bio: [
      "Seka is a talented AI and software engineer. He leads engineering across Amlin's products; from architecture to delivery.",
    ],
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
            className="font-jakarta text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
          />

          <div className="mt-14 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
            {team.map((member) => (
              <article key={member.name} className="flex w-full flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#141414]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>
                <div className="mt-6 flex flex-col gap-2">
                  <h3 className="font-jakarta text-xl font-semibold text-white md:text-2xl">
                    {member.name}
                  </h3>
                  <p className="font-inter text-sm text-white/50">{member.role}</p>
                  <div className="mt-2 flex flex-col gap-3">
                    {member.bio.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="font-inter text-sm leading-relaxed text-white/65 md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
