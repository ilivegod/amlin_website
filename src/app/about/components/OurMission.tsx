import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function OurMission() {
  return (
    <section className="relative h-[120vh] lg:pb-0  ">
      <div className="bg-[#121212] px-4 md:pt-0 pt-16 h-1/2 ">
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
          <Button className=" w-40 bg-gradient-to-r py-5 mt-4  from-[#7A5FFF] to-[#04C9A8] rounded-4xl   hover:cursor-pointer">
            Get in touch
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="h-1/2 bg-white">
        <Image
          src="/photos/meeting.png"
          alt="meeting photo"
          width={1000}
          height={1000}
          className="w-1/2 md:block hidden md:absolute md:bottom-44 md:right-36"
        />
        <Image
          src="/photos/meetingMobile.png"
          alt="meeting photo"
          width={1000}
          height={1000}
          className="h-full md:absolute md:hidden block md:bottom-44 md:right-36"
        />
      </div>
    </section>
  );
}

export default OurMission;
