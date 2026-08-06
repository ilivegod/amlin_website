export type Service = {
  number: string;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    number: "01",
    icon: "/svg/digitalTransformation.svg",
    iconAlt: "Digital Transformation icon",
    title: "Digital Transformation",
    description:
      "We help businesses rethink and digitize operations with strategy-driven solutions that boost agility, cut costs, and create value in a digital-first world.",
  },
  {
    number: "02",
    icon: "/svg/AI.svg",
    iconAlt: "Workflow and AI Automation icon",
    title: "Workflow & AI Automation",
    description:
      "We streamline repetitive processes and unlock efficiency with intelligent automation and AI, freeing teams to focus on high-value, strategic work.",
  },
  {
    number: "03",
    icon: "/svg/design.svg",
    iconAlt: "UX/UI and Product Design icon",
    title: "UX/UI & Product Design",
    description:
      "We craft intuitive user experiences and clean, conversion-driven interfaces that make digital products not only usable, but unforgettable.",
  },
  {
    number: "04",
    icon: "/svg/data.svg",
    iconAlt: "Data Systems and Analytics icon",
    title: "Data Systems & Analytics",
    description:
      "We design data pipelines, dashboards, and analytics tools that turn raw data into real insights fueling better decisions and smarter strategies.",
  },
  {
    number: "05",
    icon: "/svg/cloud.svg",
    iconAlt: "Systems Integration and Cloud Engineering icon",
    title: "Systems Integration & Cloud Engineering",
    description:
      "We connect platforms, migrate workloads, and build cloud-native systems that scale reliably without adding operational complexity.",
  },
  {
    number: "06",
    icon: "/svg/cybersecurity.svg",
    iconAlt: "Cybersecurity and Compliance icon",
    title: "Cybersecurity & Compliance",
    description:
      "We secure your digital assets with advanced protection and ensure your systems meet compliance standards, reducing risk and boosting resilience.",
  },
];
