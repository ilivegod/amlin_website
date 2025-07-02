import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function OurMission() {
  return (
    <section className="relative min-h-[120vh] md:pb-0  ">
      <div className="bg-[#121212] px-4 md:pt-0 pt-16 h-1/2 ">
        <div className="flex flex-col mx-auto max-w-6xl pb-16 md:pt-12">
          <p className="text-white text-4xl font-polysans md:text-6xl font-semibold ">
            Our Mission & Vision
          </p>
          <p className="text-white font-inter font-medium text-lg md:text-xl md:pt-5 pt-14  flex">
            We are driven to build smart, seamless digital ecosystems that
            simplify <br className="md:block hidden" /> operations, fuel
            innovation, and empower lasting change. Our vision is to set{" "}
            <br className="md:block hidden" /> the global standard for digital
            transformation through intuitive, scalable{" "}
            <br className="md:block hidden" /> solutions that put users first
            and inspire excellence.
          </p>
          <Link
            href="#challenge"
            className="text-white justify-center flex w-40 bg-gradient-to-r py-3 mt-4 font-inter from-[#7A5FFF] to-[#04C9A8] rounded-4xl   hover:cursor-pointer"
          >
            Get in touch
            <ChevronRight />
          </Link>
        </div>
      </div>
      <div className="md:bg-[linear-gradient(to_bottom,#121212_50%,white_50%)]  ">
        <div className="hidden md:flex mx-auto md:max-w-6xl  justify-end">
          <Image
            src="/photos/meeting.png"
            alt="meeting photo"
            width={1000}
            height={1000}
            className="w-3/4"
          />
        </div>
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
