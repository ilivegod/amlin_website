import { ServicesIntro } from "./components/ServicesIntro";
import { ServicesSection } from "./components/ServicesSection";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050505]">
      <ServicesIntro />
      <ServicesSection />
    </div>
  );
}
