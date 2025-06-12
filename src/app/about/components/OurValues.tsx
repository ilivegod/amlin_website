"use client";
import Image from "next/image";
import React, { useState } from "react";

const images = [
  {
    src: "/photos/manWithVrHeadsetTouchingScreen.png",
    alt: "Innovation Image ",
    title: "Innovation",
    description:
      "At the core of everything we do are the principles that guide our work, shape our culture, and define how we create value—consistently, ethically, and with purpose.",
  },
  {
    src: "/photos/manWorking.png",
    alt: "User-Centricity Image ",
    title: "User-Centricity",
    description:
      "We design with empathy, putting user experience at the heart of every solution to ensure real-world value, usability, and satisfaction.",
  },
  {
    src: "/photos/handsJoined.png",
    alt: "Excellence Image ",
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards—delivering quality, precision, and performance in every product, partnership, and line of code.",
  },
];

function OurValues() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section className="relative min-h-screen lg:pb-0 md:pt-0 pt-14 ">
      <div className="md:max-w-6xl mx-auto md:px-0 px-4">
        <p className="text-black text-4xl lg:text-6xl font-semibold ">
          Our Values
        </p>
        <p className="text-[#5E646F] font-medium text-lg lg:text-xl pt-5  flex">
          At the core of everything we do are the principles that guide our{" "}
          <br className="md:block hidden" /> work, shape our culture, and define
          how we create value— <br className="md:block hidden" />
          consistently, ethically, and with purpose.
        </p>
        <div className=" w-full h-[450px] overflow-hidden hidden md:flex mt-20">
          {images.map((img, index) => {
            const isHovered = hoveredIndex === index;
            const isOther = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                 relative transition-all duration-500 ease-in-out
                 ${isHovered ? "flex-[3]" : isOther ? "flex-[1]" : "flex-[1.5]"}
                 cursor-pointer overflow-hidden
               `}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-12 left-0 right-0   text-white p-4 text-3xl font-semibold">
                  {img.title}
                </div>
                {isHovered && (
                  <div className="absolute bottom-0 left-0 right-0  text-white p-4 text-sm">
                    {img.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="md:hidden flex flex-col gap-3">
          {images.map((img) => (
            <div key={img.title} className=" relative overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                height={1000}
                width={1000}
                className="object-cover h-[50vh]"
              />

              <div className="absolute bottom-12 mb-4 left-0 right-0  text-white p-4 text-3xl font-semibold">
                {img.title}
              </div>
              <div className="absolute bottom-0 left-0 right-0  text-white p-4 text-sm">
                {img.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurValues;
