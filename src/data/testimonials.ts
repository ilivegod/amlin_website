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
      "Partnering with Amlin was a game-changer. In just six months, they helped us cut system downtime by 30% and doubled our automation capacity. Their team brought clarity, speed, and serious results.",
    image: "/photos/portrait-cheerful-black-woman.png",
  },
  {
    name: "Dr. Abena Osei",
    role: "Medical Director, CrossMed EHR",
    quote:
      "CrossMed EHR transformed how our hospital runs day to day. Amlin built a system our clinicians actually enjoy using — from patient intake to discharge summaries, everything is faster, clearer, and far more reliable than the paper-heavy process we left behind.",
  },
  {
    name: "Pastor Emmanuel Gyamfi",
    role: "Lead Pastor, GCGM",
    quote:
      "Our new GCGM website gave our church a real home online. Members can catch announcements, read testimonies, and stay connected between services. Amlin understood our vision and delivered something warm, modern, and easy for everyone to use.",
  },
  {
    name: "Phillipe Nadeau",
    role: "Co-Founder of Heave Corp",
    quote:
      "The new platform showcases everything Heave Corp stands for. Amlin's innovative designs and attention to detail positioned us as leaders, making a noticeable impact on our audience and partners.",
  },
  {
    name: "Jonah Richards",
    role: "CEO of REV Productions",
    quote:
      "Our internal systems are a game-changer thanks to the incredible work of Amlin. Their creativity, attention to detail, and technical expertise brought our vision to life beyond expectations.",
  },
  {
    name: "Hof Coral",
    role: "CEO of Berco Inc",
    quote:
      "Working with Amlin was seamless. They took time to understand our needs, delivering a clean, functional product that impressed clients and partners. We're thrilled with the results!",
  },
  {
    name: "Kennedy M",
    role: "President of Essentia Safari",
    quote:
      "Essentia Safari's new digital platform is a masterpiece. It captures our brand perfectly, thanks to Amlin's expertise and passion. Our clients love it, and it's transformed how we connect.",
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
