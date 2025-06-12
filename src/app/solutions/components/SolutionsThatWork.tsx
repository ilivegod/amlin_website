import Image from "next/image";
import React from "react";

const solutionss = [
  {
    src: "/photos/nurse.png",
    alt: "nurse Image ",
    title: "Healthcare",
    description:
      "We empower healthcare providers with secure, scalable, and user-friendly technology solutions. From telemedicine platforms and electronic health records (EHR) to appointment scheduling and health analytics systems, our custom-built tools are designed to streamline operations, enhance patient engagement, and ensure regulatory compliance. Whether you're a hospital, clinic, or health-tech startup, we help you deliver better care through smarter software.",
  },
  {
    src: "/photos/realEstate.png",
    alt: "realEstate Image ",
    title: "Real Estate",
    description:
      "We help real estate businesses modernize operations with tailored digital solutions. Our software supports property listing and management, virtual tours, tenant portals, digital contracts, and CRM systems—everything you need to simplify transactions and improve customer experience. From residential agencies to commercial developers, we deliver tools that give you a competitive edge in a fast-paced market.",
  },
  {
    src: "/photos/road.png",
    alt: "road Image ",
    title: "Transport",
    description:
      "We build intelligent transport solutions that keep people and goods moving smoothly. Whether it’s fleet management systems, ride-hailing platforms, logistics tracking tools, or digital ticketing, our solutions improve route optimization, reduce costs, and enhance user satisfaction. From public transport operators to logistics providers, we deliver reliable technology to meet your mobility goals.",
  },
  {
    src: "/photos/corporateMeeting.png",
    alt: "corporateMeeting Image ",
    title: "Corporate",
    description:
      "We enable corporate teams to work smarter and scale faster through custom enterprise software. From workflow automation, HR and payroll systems, and CRM tools to secure internal communication platforms, we help optimize productivity and decision-making. No matter your industry or size, we design systems that support strategic growth and operational excellence.",
  },
];

function SolutionsThatWork() {
  return (
    <section className="relative md:max-w-6xl md:mx-auto md:px-0 px-4 lg:pb-0 pt-20 md:pt-0  ">
      <div className="flex flex-col mb-24  md:pt-20">
        <p className="text-black text-4xl lg:text-6xl font-semibold ">
          Solutions that work <br className="hidden md:block" /> for our
          partners
        </p>
        <p className="text-[#5E646F] font-medium text-lg lg:text-xl pt-5  flex">
          We don’t just build software — we craft industry-specific solutions{" "}
          <br className="hidden md:block" /> that solve real problems and
          deliver measurable impact.
        </p>
      </div>
      <div className="space-y-20 md:space-y-10">
        {solutionss.map((item, index) => {
          const isOdd = index % 2 === 1;

          return (
            <div
              key={index}
              className={`flex  flex-col md:flex-row ${
                !isOdd ? "md:flex-row-reverse" : ""
              }  gap-8`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2  relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  height={800}
                  width={800}
                  className="object-cover "
                />
              </div>

              {/* Text */}
              <div
                className={`w-full flex flex-col md:w-1/2 ${
                  isOdd ? "items-end" : ""
                }`}
              >
                <div>
                  <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
                  <p className="text-gray-700 md:max-w-96">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SolutionsThatWork;
