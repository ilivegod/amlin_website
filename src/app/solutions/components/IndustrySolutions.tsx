import Image from "next/image";
import React from "react";

function IndustrySolutions() {
  return (
    <section className="relative md:h-[120vh] lg:pb-0  ">
      <div className="bg-[#121212] px-4 md:pt-0 pt-16 h-1/2 ">
        <div className="flex flex-col mx-auto max-w-5xl md:pt-12 pb-16 md:pb-0">
          <p className="text-white text-4xl lg:text-6xl font-semibold ">
            Industry Solutions
          </p>
          <p className="text-white font-medium text-lg lg:text-xl md:pt-5 pt-14  flex">
            Every industry faces unique challenges—and we’re here to meet them
            head-on. <br className="md:block hidden" /> At Amlin, we go beyond
            one-size-fits-all solutions. We partner with organizations{" "}
            <br className="md:block hidden" /> to understand their core
            operations, pain points, and aspirations, then engineer{" "}
            <br className="md:block hidden" /> custom software that drives
            measurable outcomes.
          </p>
        </div>
      </div>
      <div className="h-1/2 bg-white">
        <Image
          src="/photos/manDoingAnimation.png"
          alt="meeting photo"
          width={1000}
          height={1000}
          className="max-w-6xl md:block hidden md:absolute md:bottom-20 left-1/2 transform -translate-x-1/2"
        />
        <Image
          src="/photos/manDoingAnimationMobile.png"
          alt="meeting photo"
          width={1000}
          height={1000}
          className="h-full md:absolute md:hidden block md:bottom-44 md:right-36"
        />
      </div>
    </section>
  );
}

export default IndustrySolutions;
