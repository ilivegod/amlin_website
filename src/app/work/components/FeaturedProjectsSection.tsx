import { featuredProjects } from "@/data/projects";

import { FeaturedProjectsTitle } from "./FeaturedProjectsTitle";
import { ProjectRow } from "./ProjectRow";

export function FeaturedProjectsSection() {
  return (
    <section className="relative w-full bg-[#050505] px-[var(--hero-gutter)] pb-24 font-inter">
      <div className="border-b work-grid-line pb-10 pt-24 md:pb-12 md:pt-28">
        <FeaturedProjectsTitle />
      </div>

      <div className="w-full">
        {featuredProjects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            isFirst={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
