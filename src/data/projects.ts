export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  media: {
    type: "image";
    gradient: string;
    alt: string;
  };
};

export const featuredProjects: Project[] = [
  {
    id: "healthcare-platform",
    title: "CareLink Platform",
    description:
      "A secure telehealth and patient engagement platform built for scale — fast appointments, real-time records, and compliance-ready workflows for modern healthcare providers.",
    category: "Healthcare & Platforms",
    href: "#",
    media: {
      type: "image",
      gradient: "linear-gradient(135deg, #0b2850 0%, #1a4d78 45%, #3d8fd1 100%)",
      alt: "CareLink healthcare platform preview",
    },
  },
  {
    id: "logistics-dashboard",
    title: "FleetPulse",
    description:
      "An operations dashboard for logistics teams — live fleet tracking, route optimization, and dispatch tools that keep goods moving on time across multiple regions.",
    category: "Transport & Analytics",
    href: "#",
    media: {
      type: "image",
      gradient: "linear-gradient(135deg, #1a1028 0%, #3d1f6e 50%, #7c4dff 100%)",
      alt: "FleetPulse logistics dashboard preview",
    },
  },
  {
    id: "real-estate-portal",
    title: "EstateFlow",
    description:
      "A property management portal with virtual tours, tenant self-service, and digital contracts — designed to simplify transactions and elevate the client experience.",
    category: "Real Estate & Web Apps",
    href: "#",
    media: {
      type: "image",
      gradient: "linear-gradient(135deg, #0d1f1a 0%, #1a4d3a 45%, #2dd4bf 100%)",
      alt: "EstateFlow real estate portal preview",
    },
  },
];
