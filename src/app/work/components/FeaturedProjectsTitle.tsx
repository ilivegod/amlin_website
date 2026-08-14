import { RevealTitle } from "@/components/RevealTitle";

export function FeaturedProjectsTitle() {
  return (
    <RevealTitle
      as="h1"
      text="Featured Projects"
      className="font-jakarta text-[clamp(3rem,7.5vw,5.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]"
      ariaLabel="Featured Projects"
    />
  );
}
