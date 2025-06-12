import Image from "next/image";
import React from "react";

const services = [
  {
    number: "01",
    src: "/svg/digitalTransformation.svg",
    alt: "Digital Transformation icon ",
    title: "Digital Transformation",
    description:
      "We help businesses rethink and digitize operations with strategy-driven solutions that boost agility, cut costs, and create value in a digital-first world.",
  },
  {
    number: "02",
    src: "/svg/AI.svg",
    alt: "Workflow & AI Automation icon ",
    title: "Workflow & AI Automation",
    description:
      "We streamline repetitive processes and unlock efficiency with intelligent automation and AI—freeing teams to focus on high-value, strategic work.",
  },
  {
    number: "03",
    src: "/svg/design.svg",
    alt: "UX/UI & Product Design icon ",
    title: "UX/UI & Product Design",
    description:
      "We craft intuitive user experiences and clean, conversion-driven interfaces that make digital products not only usable—but unforgettable.",
  },
  {
    number: "04",
    src: "/svg/data.svg",
    alt: "Data Systems & Analytics icon ",
    title: "Data Systems & Analytics",
    description:
      "We design data pipelines, dashboards, and analytics tools that turn raw data into real insights—fueling better decisions and smarter strategies.",
  },
  {
    number: "05",
    src: "/svg/cloud.svg",
    alt: "Systems Integration & Cloud Engineering icon ",
    title: "Systems Integration & Cloud Engineering",
    description:
      "We help businesses rethink and digitize operations with strategy-driven solutions that boost agility, cut costs, and create value in a digital-first world.",
  },
  {
    number: "06",
    src: "/svg/cybersecurity.svg",
    alt: "Cybersecurity & Compliance icon ",
    title: "Cybersecurity & Compliance",
    description:
      "We secure your digital assets with advanced protection and ensure your systems meet compliance standards—reducing risk and boosting resilience.",
  },
];

function ServicesSection() {
  return (
    <section className="grid md:grid-cols-3 grid-cols-1 min-h-screen md:max-w-6xl md:mx-auto md:py-28 md:-mb-20">
      {services.map((service) => (
        <div key={service.number} className="p-10  flex flex-col gap-3 ">
          <p className="text-[#5E646F] text-sm">/{service.number}</p>
          <Image
            src={service.src}
            alt={service.alt}
            height={800}
            width={800}
            className="w-5 h-5"
          />
          <p className="text-xl font-semibold">{service.title}</p>
          <p className="text-[#5E646F] text-sm max-w-2xl">
            {service.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default ServicesSection;
