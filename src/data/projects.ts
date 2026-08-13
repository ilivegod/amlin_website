export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  href: string;
  media: {
    type: "image";
    src?: string;
    gradient: string;
    alt: string;
  };
};

export const featuredProjects: Project[] = [
  {
    id: "crossmed-ehr",
    title: "CrossMed EHR",
    description:
      "A hospital-ready electronic health records platform that helps providers sign up, manage patient care, and streamline day-to-day operations - from scheduling and billing to telehealth and secure messaging.",
    category: "Healthcare & EHR",
    href: "https://crossmedehr.com/",
    media: {
      type: "image",
      src: "/photos/crossmed-ehr.jpg",
      gradient: "linear-gradient(135deg, #0b2850 0%, #1a4d78 45%, #3d8fd1 100%)",
      alt: "CrossMed EHR patient health records dashboard",
    },
  },
  {
    id: "gcgm-redditch",
    title: "GCGM Redditch",
    description:
      "A modern church website for Global Church of Grace Ministries - with a welcoming landing page, announcements, testimonies, and clear paths for visitors to explore services, get involved, and stay connected.",
    category: "Church & Community",
    href: "https://gcgm-redditch.org/",
    media: {
      type: "image",
      src: "/photos/gcgm-redditch.png",
      gradient: "linear-gradient(135deg, #1a1028 0%, #3d1f6e 50%, #7c4dff 100%)",
      alt: "GCGM Redditch church website preview",
    },
  },
];
