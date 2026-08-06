export type ValueCard = {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageAlt: string;
  gradient: string;
};

export const valueCards: ValueCard[] = [
  {
    id: "innovation",
    title: "Innovation",
    image: "/photos/manWithVrHeadsetTouchingScreen.png",
    imageAlt: "Innovation",
    gradient:
      "linear-gradient(135deg, #0b2850 0%, #1a4d78 45%, #3d8fd1 100%)",
    description:
      "We push boundaries with creative thinking and emerging technology, turning ambitious ideas into products that feel ahead of their time.",
  },
  {
    id: "user-centricity",
    title: "User-Centricity",
    image: "/photos/manWorking.png",
    imageAlt: "User-Centricity",
    gradient:
      "linear-gradient(135deg, #1a1028 0%, #3d1f6e 50%, #7c4dff 100%)",
    description:
      "We design with empathy, putting user experience at the heart of every solution to ensure real-world value, usability, and satisfaction.",
  },
  {
    id: "excellence",
    title: "Excellence",
    image: "/photos/handsJoined.png",
    imageAlt: "Excellence",
    gradient:
      "linear-gradient(135deg, #0d1f1a 0%, #1a4d3a 45%, #2dd4bf 100%)",
    description:
      "We hold ourselves to the highest standards delivering quality, precision, and performance in every product, partnership, and line of code.",
  },
];
