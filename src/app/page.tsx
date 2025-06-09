"use client";

import { MoveDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export default function Home() {
  const solutionsref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex  flex-col min-h-screen overflow-x-hidden ">
      {/* hero section */}
      <section className="relative h-screen lg:pb-0  bg-[#121212]">
        <div className="lg:max-w-5xl mx-auto pt-28 lg:px-0 px-3  flex flex-col">
          <p className="text-white text-4xl lg:text-6xl font-semibold ">
            Powerings{" "}
            <span className="relative inline-block bg-gradient-to-r from-[#7A5FFF] to-[#04C9A8] bg-clip-text text-transparent after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#7A5FFF] after:to-[#04C9A8]">
              Business
            </span>
            <br /> Growth Through Smart <br /> Digital Transformation
          </p>
          <p className="text-white font-medium text-lg lg:text-xl lg:pt-16 pt-14 justify-end  flex">
            We streamline operations, unify fragmented systems, and help
            businesses <br className="lg:block hidden" /> scale with intelligent{" "}
            digital solutions that meet global standards.
          </p>
          <div className="justify-end flex">
            <button
              onClick={() =>
                solutionsref.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="rounded-full lg:w-28 w-20 lg:h-28 h-20 flex items-center lg:mr-0 mr-4 justify-center border border-white lg:mt-20 mt-32 hover:cursor-pointer hover:border-8 transition-all duration-500 ease-in-out"
            >
              <MoveDown className="lg:w-12 w-10 lg:h-12 h-10 text-white" />
            </button>
          </div>
        </div>
      </section>
      {/* industry solutions section */}
      <section
        ref={solutionsref}
        className="relative h-screen bg-center bg-cover lg:bg-[url('/photos/manTouchingGlass.png')] lg:pb-0  bg-white"
      >
        <div className="flex flex-col lg:max-w-6xl mx-auto">
          <div className="flex lg:absolute lg:bottom-60 flex-col gap-4">
            <p className="text-6xl font-semibold text-white">
              Industry Solutions
            </p>
            <p className="text-xl font-medium text-white">
              Every industry faces unique challenges—and we’re here to meet them{" "}
              <br />
              head-on.From streamlining operations to unlocking new revenue{" "}
              <br />
              streams, we help industry leaders innovate, adapt, and thrive.
            </p>
          </div>
          <div className="grid lg:absolute lg:bottom-12 lg:grid-cols-4 grid-cols-1 gap-4 text-white font-semibold text-xl">
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
      </section>
      {/* Digital transformation section  */}
      <section className="relative flex flex-col items-center justify-center h-screen lg:pb-0  bg-[#121212]">
        <p className="text-[#5E646F] text-6xl font-semibold  text-center leading-tight">
          <span className="text-white">Digital Transformation,</span>
          <br /> Workflow & AI Automation, <br /> UX/UI & Digital Product
          Design, <br /> Data Systems & Analytics, <br /> Systems Integration &
          Cloud <br />
          Engineering, <br /> Cybersecurity & Compliance
        </p>
      </section>
    </div>
  );
}
