"use client";

import { MoveDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import Challenge from "./components/Challenge";

export default function Home() {
  const solutionsref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex  flex-col min-h-screen overflow-x-hidden ">
      {/* hero section */}
      <section className="relative h-screen md:pb-0  bg-[#121212]">
        <div className="md:max-w-6xl mx-auto pt-28 md:px-0 px-3  flex flex-col ">
          <p
            className={`text-white font-polysans text-4xl md:text-6xl font-semibold `}
          >
            Powering{" "}
            <span className="relative font-medium font-playfair italic inline-block bg-gradient-to-r from-[#7A5FFF] to-[#04C9A8] bg-clip-text text-transparent after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#7A5FFF] after:to-[#04C9A8]">
              Business
            </span>
            <br /> Growth Through Smart <br className="md:block hidden" />{" "}
            Digital Transformation
          </p>
          <p
            className={`text-white font-inter font-medium text-lg md:text-xl md:pt-16 pt-14 justify-end  flex`}
          >
            We streamline operations, unify fragmented systems, and help
            businesses <br className="md:block hidden" /> scale with intelligent
            digital solutions that meet global standards.
          </p>
          <div className="justify-end flex ">
            <button
              onClick={() =>
                solutionsref.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="rounded-full md:w-28 w-20 md:h-28 h-20 flex items-center md:mr-0 mr-4 justify-center border border-white  mt-32 hover:cursor-pointer hover:border-8 transition-all duration-500 ease-in-out"
            >
              <MoveDown className="md:w-12 w-10 md:h-12 h-10 text-white" />
            </button>
          </div>
        </div>
      </section>
      {/* industry solutions section */}
      <section
        ref={solutionsref}
        className="relative h-screen bg-center bg-cover  bg-[url('/photos/manTouchingGlassMobile.png')] md:bg-[url('/photos/manTouchingGlass.png')] md:pb-0  bg-white"
      >
        <div className="flex flex-col md:max-w-6xl md:mx-auto md:px-0 px-3">
          <div className="flex flex-col gap-28 md:gap-24 absolute bottom-12">
            <div className="flex  flex-col gap-4">
              <p
                className={`md:text-6xl text-4xl font-semibold font-polysans text-white`}
              >
                Industry Solutions
              </p>
              <p
                className={`md:text-xl text-base font-inter md:font-medium text-white`}
              >
                Every industry faces unique challenges and we’re here to meet
                them <br className="hidden md:block" />
                head-on.From streamlining operations to unlocking new revenue{" "}
                <br className="hidden md:block" />
                streams, we help industry leaders innovate, adapt, and thrive.
              </p>
            </div>
            <div
              className={`grid font-inter  md:grid-cols-4 grid-cols-1 gap-4 text-white font-semibold text-xl`}
            >
              <div className="border-b  border-gray-500 pb-1.5">
                <p>HealthCare:</p>
                <p>Powering Better Care</p>
              </div>
              <div className="border-b border-gray-500 pb-1.5">
                <p>Real Estate:</p>
                <p>Sell Smarter, Faster</p>
              </div>
              <div className="border-b border-gray-500 pb-1.5">
                <p>Transport:</p>
                <p>Drive Seamless Movement Care</p>
              </div>
              <div className="border-b border-gray-500 pb-1.5">
                <p>Corporate:</p>
                <p>Optimize. Innovate. Lead.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonial section  */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] md:pb-0  bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 order-2 md:order-1">
              <div className="relative aspect-square  mx-auto">
                <Image
                  src="/photos/portrait-cheerful-black-woman.png"
                  alt="portrait-cheerful-black-woman"
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6 gap-2 flex order-1 md:order-2">
              <Image
                src="/svg/“.svg"
                alt="portrait-cheerful-black-woman"
                width={500}
                height={500}
                className="w-6 h-6"
              />
              <div className={`font-inter  `}>
                <div
                  className={`text-2xl md:text-3xl font-medium leading-snug flex `}
                >
                  Partnering with Amlin was a game-changer.{" "}
                  <br className="md:block hidden" /> In just six months, they
                  helped us cut system downtime by 30% and doubled our{" "}
                  <br className="md:block hidden" />
                  automation capacity. Their team brought{" "}
                  <br className="md:block hidden" /> clarity, speed, and serious
                  results.
                </div>

                <p className="text-gray-600 leading-relaxed pt-5">
                  From idea to execution, we design digital solutions that
                  perform with purpose built to engage, convert, and scale with
                  your goals.
                </p>

                <div className="mt-5 pt-2 border-t border-gray-200">
                  <h3 className="font-medium text-lg">Rosina Andor</h3>
                  <p className="text-gray-600">Tech Lead, Healthcare Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Digital transformation section  */}
      <section
        className={` font-inter   flex flex-col items-center justify-center h-screen md:pb-0  bg-[#121212] `}
      >
        <p className="text-[#5E646F] hover:text-white transform hover:scale-110 hover:cursor-pointer transition ease-in-out duration-200 md:text-6xl text-4xl font-semibold md:px-0 px-3 text-center leading-tight">
          Digital Transformation,
        </p>

        <p className="text-[#5E646F] hover:text-white transform hover:scale-110  hover:cursor-pointer ease-in-out duration-200 md:text-6xl text-4xl font-semibold md:px-0 px-3 text-center leading-tight">
          Workflow & AI Automation,
        </p>
        <p className="text-[#5E646F] hover:text-white transform hover:scale-110  hover:cursor-pointer ease-in-out duration-200 md:text-6xl text-4xl font-semibold md:px-0 px-3 text-center leading-tight">
          UX/UI & Digital Product Design,
        </p>
        <p className="text-[#5E646F] hover:text-white transform hover:scale-110  hover:cursor-pointer ease-in-out duration-200 md:text-6xl text-4xl font-semibold md:px-0 px-3 text-center leading-tight">
          Data Systems & Analytics,
        </p>
        <p className="text-[#5E646F] hover:text-white transform hover:scale-110  hover:cursor-pointer ease-in-out duration-200 md:text-6xl text-4xl font-semibold md:px-0 px-3 text-center leading-tight">
          Systems Integration & Cloud <br /> Engineering,
        </p>
        <p className="text-[#5E646F] hover:text-white transform hover:scale-110  hover:cursor-pointer ease-in-out duration-200 md:text-6xl text-4xl font-semibold md:px-0 px-3 text-center leading-tight">
          Cybersecurity & Compliance
        </p>
      </section>
      {/* new challenge section  */}
      <Challenge />
    </div>
  );
}
