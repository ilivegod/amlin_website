const industries = [
  "Healthcare",
  "Real Estate",
  "Transport",
  "Corporate",
] as const;

type IndustriesStripProps = {
  delay?: string;
};

export function IndustriesStrip({ delay = "0s" }: IndustriesStripProps) {
  return (
    <div
      className="amlin-fade flex flex-wrap items-center gap-x-[clamp(1rem,2.4vw,2.25rem)] gap-y-2"
      style={{ animationDelay: delay }}
    >
      {industries.map((industry) => (
        <p
          key={industry}
          className="font-inter text-[0.625rem] uppercase tracking-[0.18em] text-white/[0.42]"
        >
          <span aria-hidden="true" className="mr-2 opacity-50">
            &mdash;
          </span>
          {industry}
        </p>
      ))}
    </div>
  );
}
