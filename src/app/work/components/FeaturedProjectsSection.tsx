import { featuredProjects } from "@/data/projects";

import { FeaturedProjectsTitle } from "./FeaturedProjectsTitle";
import { ProjectRow } from "./ProjectRow";

export function FeaturedProjectsSection() {
  return (
    <section className="work-page-grid relative w-full">
      <div className="border-b work-grid-line px-[var(--hero-gutter)] pb-10 pt-24 md:pb-12 md:pt-28">
        <div className="mx-auto w-full max-w-[1400px]">
          <FeaturedProjectsTitle />
        </div>
      </div>

      <div className="w-full">
        {featuredProjects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
