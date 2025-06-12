import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function OurVision() {
  return (
    <section className="relative h-[90vh] flex lg:pb-0  bg-[#121212]">
      <div className=" px-4 md:pt-0  w-1/2  flex flex-col items-center justify-center">
        <div className="flex flex-col mx-auto md:pl-48 ">
          <p className="text-white text-4xl lg:text-6xl font-semibold ">
            Your Vision. <br /> Our Expertise.
          </p>
          <p className="text-white font-medium text-lg lg:text-xl md:pt-10 pt-14  flex">
            We design and develop powerful digital solutions that solve
            <br className="md:block hidden" />
            real business problems. Whether you’re starting from
            <br className="md:block hidden" />
            scratch, modernizing legacy systems, or scaling an existing
            <br className="md:block hidden" />
            product, our team delivers end-to-end services that
            <br className="md:block hidden" />
            transform your ideas into impact.
          </p>
          <Button className=" w-40 bg-gradient-to-r py-5 mt-7  from-[#7A5FFF] to-[#04C9A8] rounded-4xl   hover:cursor-pointer">
            Get in touch
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="w-1/2  flex flex-col items-end">
        <Image
          src="/photos/laptopOnTable.png"
          alt="meeting photo"
          width={1000}
          height={1000}
          className="w-[80vh]"
        />
      </div>
    </section>
  );
}

export default OurVision;
