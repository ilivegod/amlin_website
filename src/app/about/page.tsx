"use client";
import Image from "next/image";
import React, { useState } from "react";
import Challenge from "../components/Challenge";

const images = [
  {
    src: "/photos/meeting.png",
    alt: "Image 1",
    description: "This is the first image description.",
  },
  {
    src: "/photos/meeting.png",
    alt: "Image 2",
    description: "This is the second image description.",
  },
  {
    src: "/photos/meeting.png",
    alt: "Image 3",
    description: "This is the third image description.",
  },
];

function About() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="flex  flex-col min-h-screen overflow-x-hidden ">
      {/* our mission section */}
      <section className="relative h-[120vh] lg:pb-0  ">
        <div className="bg-[#121212]   h-1/2">
          <div className="flex flex-col mx-auto max-w-5xl md:pt-12">
            <p className="text-white text-4xl lg:text-6xl font-semibold ">
              Our Mission & Vision
            </p>
            <p className="text-white font-medium text-lg lg:text-xl md:pt-5 pt-14  flex">
              We are driven to build smart, seamless digital ecosystems that
              simplify <br className="md:block hidden" /> operations, fuel
              innovation, and empower lasting change. Our vision is to set{" "}
              <br className="md:block hidden" /> the global standard for digital
              transformation through intuitive, scalable{" "}
              <br className="md:block hidden" /> solutions that put users first
              and inspire excellence.
            </p>
          </div>
        </div>
        <div className="h-1/2 bg-white">
          <Image
            src="/photos/meeting.png"
            alt="meeting photo"
            width={1000}
            height={1000}
            className="w-1/2 md:absolute md:bottom-44 md:right-36"
          />
        </div>
      </section>
      {/* our values section */}
      <section className="relative min-h-screen lg:pb-0 border ">
        <p className="text-black text-4xl lg:text-6xl font-semibold ">
          Our Values
        </p>
        <p className="text-[#5E646F] font-medium text-lg lg:text-xl md:pt-5 pt-14  flex">
          At the core of everything we do are the principles that guide our{" "}
          <br className="md:block hidden" /> work, shape our culture, and define
          how we create value— <br className="md:block hidden" />
          consistently, ethically, and with purpose.
        </p>
        <div className="flex w-full h-[400px] overflow-hidden">
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
                {isHovered && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4 text-sm">
                    {img.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
      <Challenge />
    </div>
  );
}

export default About;
