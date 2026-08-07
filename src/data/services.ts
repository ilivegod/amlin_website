export type Service = {
  number: string;
  icon: string;
  iconAlt: string;
  title: string;
  tagline: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    number: "01",
    icon: "/svg/design.svg",
    iconAlt: "Websites and online presence icon",
    title: "Websites & Online Presence",
    tagline: "Turn your first impression into an advantage.",
    highlights: [
      "Business websites",
      "E-commerce stores",
      "Landing pages",
      "Customer portals",
      "Website redesigns",
    ],
  },
  {
    number: "02",
    icon: "/svg/AI.svg",
    iconAlt: "Business automation icon",
    title: "Business Automation",
    tagline: "Work smarter by reducing repetitive tasks.",
    highlights: [
      "Automated customer follow-ups",
      "Approval processes",
      "Data entry automation",
      "Business workflows",
      "AI-powered assistants",
    ],
  },
  {
    number: "03",
    icon: "/svg/digitalTransformation.svg",
    iconAlt: "Custom software solutions icon",
    title: "Custom Software Solutions",
    tagline: "Technology built around how your business works.",
    highlights: [
      "Internal business systems",
      "Customer platforms",
      "Booking systems",
      "Management dashboards",
      "Industry-specific software",
    ],
  },
  {
    number: "04",
    icon: "/svg/cloud.svg",
    iconAlt: "Business systems integration icon",
    title: "Business Systems Integration",
    tagline: "Make your tools work together.",
    highlights: [
      "Connecting CRM systems",
      "Connecting payment platforms",
      "Connecting business applications",
      "Data synchronisation",
    ],
  },
  {
    number: "05",
    icon: "/svg/design.svg",
    iconAlt: "Mobile applications icon",
    title: "Mobile Applications",
    tagline: "Bring your services closer to your customers.",
    highlights: [
      "Customer apps",
      "Staff apps",
      "Booking apps",
      "Service platforms",
    ],
  },
  {
    number: "06",
    icon: "/svg/data.svg",
    iconAlt: "Data and business insights icon",
    title: "Data & Business Insights",
    tagline: "Turn your data into better decisions.",
    highlights: [
      "Business dashboards",
      "Reporting systems",
      "Data analysis",
      "Performance tracking",
    ],
  },
  {
    number: "07",
    icon: "/svg/cybersecurity.svg",
    iconAlt: "Cloud and technology support icon",
    title: "Cloud & Technology Support",
    tagline: "Reliable technology that grows with your business.",
    highlights: [
      "Cloud solutions",
      "Infrastructure support",
      "Security improvements",
      "Technology consulting",
    ],
  },
];
