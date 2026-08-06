import { IndustriesIntro } from "./components/IndustriesIntro";
import { SolutionsThatWorkSection } from "./components/SolutionsThatWorkSection";

export default function SolutionsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050505]">
      <IndustriesIntro />
      <SolutionsThatWorkSection />
    </div>
  );
}
