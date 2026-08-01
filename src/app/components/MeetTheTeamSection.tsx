import Image from "next/image";

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
      className="bg-white px-[var(--hero-gutter)] py-24 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto w-full max-w-[52rem]">
          <h2 className="font-polysans text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-[#050505]">
            Meet the Team
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-14 md:mt-16 md:grid-cols-2 md:gap-x-12 md:gap-y-0">
            {team.map((member) => (
              <article key={member.name} className="flex w-full flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f2f2f2]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </div>

                <h3 className="mt-6 w-full font-inter text-[clamp(1.125rem,2vw,1.375rem)] font-bold leading-snug text-[#050505]">
                  {member.name}, {member.role}
                </h3>

                <p className="mt-4 w-full font-inter text-[0.9375rem] leading-relaxed text-[#333333] md:text-base">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
