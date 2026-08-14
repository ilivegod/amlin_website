export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  image?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rosina Andor",
    role: "Tech Lead, Healthcare Partner",
    quote:
      "Partnering with Amlin was a game-changer. In just six months, they helped us cut system downtime by 40% and doubled our automation capacity. Their team brought clarity, speed, and serious results.",
    image: "/photos/portrait-cheerful-black-woman.png",
  },
  {
    name: "CrossMed Team",
    role: "CrossMed EHR",
    quote:
      "Amlin Technologies helped us turn a complex healthcare vision into a scalable digital platform. Their technical expertise, problem-solving approach, and understanding of healthcare workflows made them more than a development partner, they became a trusted technology partner.",
  },
  {
    name: "GCGM",
    role: "GCGM Redditch",
    quote:
      "We highly recommend them. They are focused on good quality and an excellent, cordial relationship with their clients.",
  },
  {
    name: "PeGee",
    role: "Client",
    quote: "Fantastic IT services from Amlin, I highly recommend.",
  },
];

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
