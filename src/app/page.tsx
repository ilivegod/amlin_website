"use client";

import { ChevronRight, MoveDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const solutionsref = useRef<HTMLDivElement | null>(null);

  const contactSchema = z.object({
    name: z.string().min(3, { message: "Please enter a valid name" }),
    email: z.string().email().min(3, { message: "Please enter a valid email" }),
    projectDetails: z
      .string()
      .min(3, { message: "Please enter your project details" }),
  });

  type FormValues = z.infer<typeof contactSchema>;

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      projectDetails: "",
    } as FormValues,
    validators: {
      onSubmit: contactSchema,
      onChange: contactSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

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
            businesses <br className="lg:block hidden" /> scale with intelligent
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
        className="relative h-screen bg-center bg-cover  bg-[url('/photos/manTouchingGlassMobile.png')] lg:bg-[url('/photos/manTouchingGlass.png')] lg:pb-0  bg-white"
      >
        <div className="flex flex-col lg:max-w-6xl lg:mx-auto lg:px-0 px-3">
          <div className="flex flex-col gap-28 lg:gap-24 absolute bottom-12">
            <div className="flex  flex-col gap-4">
              <p className="lg:text-6xl text-4xl font-semibold text-white">
                Industry Solutions
              </p>
              <p className="lg:text-xl text-base lg:font-medium text-white">
                Every industry faces unique challenges—and we’re here to meet
                them <br className="hidden lg:block" />
                head-on.From streamlining operations to unlocking new revenue{" "}
                <br className="hidden lg:block" />
                streams, we help industry leaders innovate, adapt, and thrive.
              </p>
            </div>
            <div className="grid  lg:grid-cols-4 grid-cols-1 gap-4 text-white font-semibold text-xl">
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
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] lg:pb-0  bg-white">
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
              <div>
                <div className="text-2xl md:text-3xl font-medium leading-snug flex ">
                  Partnering with Amlin was a game-changer.{" "}
                  <br className="lg:block hidden" /> In just six months, they
                  helped us cut system downtime by 30% and doubled our{" "}
                  <br className="lg:block hidden" />
                  automation capacity. Their team brought{" "}
                  <br className="lg:block hidden" /> clarity, speed, and serious
                  results.
                </div>

                <p className="text-gray-600 leading-relaxed pt-5">
                  From idea to execution, we design digital solutions that
                  perform with purpose—built to engage, convert, and scale with
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
      <section className="relative flex flex-col items-center justify-center h-screen lg:pb-0  bg-[#121212]">
        <p className="text-[#5E646F] lg:text-6xl text-4xl font-semibold lg:px-0 px-3 text-center leading-tight">
          <span className="text-white">Digital Transformation,</span>
          <br /> Workflow & AI Automation, <br /> UX/UI & Digital Product
          Design, <br /> Data Systems & Analytics, <br /> Systems Integration &
          Cloud <br />
          Engineering, <br /> Cybersecurity & Compliance
        </p>
      </section>
      {/* new challenge section  */}
      <section className="relative flex flex-col md:px-0 px-3 md:pt-0 pt-16 items-center md:justify-center min-h-[80vh] lg:pb-0  bg-white">
        <div className="md:flex block md:w-2/3">
          <div className=" md:w-4/6 flex flex-col gap-6">
            <p className="font-semibold md:text-6xl text-3xl">
              We're looking for <br className="md:block hidden" /> new challenge
            </p>
            <p className="text-[#5E646F] font-medium md:text-base text-sm">
              We thrive on solving complex problems and turning big ideas into
              bold <br className="md:block hidden" /> results. If you’re
              navigating uncharted territory or aiming for something{" "}
              <br className="md:block hidden" /> audacious, we’d love to help
              you make it happen.
            </p>
          </div>
          <div className=" md:w-2/6 md:pt-0 pt-28 flex flex-col ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div className="space-y-4  ">
                <form.Field name="name">
                  {(field) => {
                    return (
                      <div className="relative">
                        <Input
                          id="name"
                          name="name"
                          type="email"
                          placeholder="Name"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="bg-transparent border-0 border-b border-gray-300 rounded-none px-0 py-4 text-black placeholder:text-gray-800 text-lg focus-visible:ring-0 focus-visible:border-gray-800"
                          required
                        />
                      </div>
                    );
                  }}
                </form.Field>

                <form.Field name="email">
                  {(field) => {
                    return (
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          name="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="E-mail"
                          className="bg-transparent text-black border-0 border-b border-gray-300 rounded-none px-0 py-4  placeholder:text-gray-800 text-lg focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                      </div>
                    );
                  }}
                </form.Field>

                <form.Field name="projectDetails">
                  {(field) => {
                    return (
                      <div className="relative">
                        <Input
                          id="projectDetails"
                          type="text"
                          name="projectDetails"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Project Details"
                          className="bg-transparent border-0 border-b border-gray-300 rounded-none px-0 py-4 text-black placeholder:text-gray-800 text-lg focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                      </div>
                    );
                  }}
                </form.Field>
              </div>

              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <div className="flex justify-end mt-5">
                    <Button
                      // loading={isSubmitting}
                      type="submit"
                      disabled={!canSubmit || isSubmitting}
                      className="  bg-gradient-to-r py-5  from-[#7A5FFF] to-[#04C9A8] rounded-4xl   hover:cursor-pointer"
                    >
                      Get in touch
                      <ChevronRight />
                    </Button>
                  </div>
                )}
              </form.Subscribe>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
