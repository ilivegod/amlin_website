import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import Challenge from "../components/Challenge";
import OurVision from "./components/OurVision";
import ServicesSection from "./components/ServicesSection";

function Services() {
  return (
    <div>
      <OurVision />
      <ServicesSection />
      <Challenge />
    </div>
  );
}

export default Services;
