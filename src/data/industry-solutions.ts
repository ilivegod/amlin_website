export type IndustrySolution = {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
  image?: string;
  gradient: string;
};

export const industrySolutions: IndustrySolution[] = [
  {
    id: "healthcare",
    title: "Healthcare",
    image: "/photos/nurse.png",
    imageAlt: "Healthcare industry solutions",
    gradient:
      "linear-gradient(135deg, #0b2850 0%, #1a4d78 45%, #3d8fd1 100%)",
    description:
      "We empower healthcare providers with secure, scalable, and user-friendly technology solutions. From telemedicine platforms and electronic health records (EHR) to appointment scheduling and health analytics systems, our custom-built tools are designed to streamline operations, enhance patient engagement, and ensure regulatory compliance. Whether you're a hospital, clinic, or health-tech startup, we help you deliver better care through smarter software.",
  },
  {
    id: "real-estate",
    title: "Real Estate",
    image: "/photos/realEstate.png",
    imageAlt: "Real estate industry solutions",
    gradient:
      "linear-gradient(135deg, #0d1f1a 0%, #1a4d3a 45%, #2dd4bf 100%)",
    description:
      "We help real estate businesses modernize operations with tailored digital solutions. Our software supports property listing and management, virtual tours, tenant portals, digital contracts, and CRM systems, everything you need to simplify transactions and improve customer experience. From residential agencies to commercial developers, we deliver tools that give you a competitive edge in a fast-paced market.",
  },
  {
    id: "transport",
    title: "Transport",
    image: "/photos/road.png",
    imageAlt: "Transport industry solutions",
    gradient:
      "linear-gradient(135deg, #1a1028 0%, #3d1f6e 50%, #7c4dff 100%)",
    description:
      "We build intelligent transport solutions that keep people and goods moving smoothly. Whether it's fleet management systems, ride-hailing platforms, logistics tracking tools, or digital ticketing, our solutions improve route optimization, reduce costs, and enhance user satisfaction. From public transport operators to logistics providers, we deliver reliable technology to meet your mobility goals.",
  },
  {
    id: "corporate",
    title: "Corporate",
    image: "/photos/corporateMeeting.png",
    imageAlt: "Corporate industry solutions",
    gradient:
      "linear-gradient(135deg, #141414 0%, #2a2a2a 45%, #5a5a5a 100%)",
    description:
      "We enable corporate teams to work smarter and scale faster through custom enterprise software. From workflow automation, HR and payroll systems, and CRM tools to secure internal communication platforms, we help optimize productivity and decision-making. No matter your industry or size, we design systems that support strategic growth and operational excellence.",
  },
];
