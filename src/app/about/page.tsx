import Challenge from "../components/Challenge";

import { AboutHashScroll } from "./components/AboutHashScroll";
import { AboutIntro } from "./components/AboutIntro";
import { OurValuesSection } from "./components/OurValuesSection";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050505]">
      <AboutHashScroll />
      <AboutIntro />
      <OurValuesSection />
      <Challenge />
    </div>
  );
}
