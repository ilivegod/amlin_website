import { RevealTitle } from "@/components/RevealTitle";
import { services } from "@/data/services";

import { ServiceCard } from "./ServiceCard";

export function ServicesSection() {
  return (
    <section className="relative w-full bg-[#050505] px-[var(--hero-gutter)] pb-24 font-inter">
      <div className="border-b work-grid-line pb-10 pt-12 md:pb-12 md:pt-16">
        <RevealTitle
          as="h2"
          text="Services We Provide"
          className="font-polysans text-[clamp(2.25rem,5.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
        />
      </div>

      <div className="grid grid-cols-1 border-t work-grid-line md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.number}
            className="border-b border-r-0 work-grid-line md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}
