import { ArrowDown, MoveDown } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex  flex-col min-h-screen overflow-x-hidden ">
      <section className="relative h-screen lg:pb-0  bg-[#121212]">
        <div className="lg:max-w-5xl mx-auto lg:pt-28  flex flex-col">
          <p className="text-white text-6xl font-semibold ">
            Powering{" "}
            <span className="relative inline-block bg-gradient-to-r from-[#7A5FFF] to-[#04C9A8] bg-clip-text text-transparent after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#7A5FFF] after:to-[#04C9A8]">
              Business
            </span>
            <br /> Growth Through Smart <br /> Digital Transformation
          </p>
          <p className="text-white font-medium text-xl lg:pt-16 justify-end  flex">
            We streamline operations, unify fragmented systems, and help
            businesses <br /> scale with intelligent digital solutions that meet
            global standards.
          </p>
          <div className=" justify-end  flex">
            <div className="rounded-full w-28 h-28 flex items-center justify-center border border-white lg:mt-20 hover:cursor-pointer hover:border-8 transition-all duration-500 ease-in-out">
              <MoveDown className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
