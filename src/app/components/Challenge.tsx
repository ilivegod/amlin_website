"use client";

import { ChevronRight } from "lucide-react";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import localFont from "next/font/local";

function Challenge() {
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
    <section className="relative flex flex-col md:px-0 px-3 md:pt-0 pt-16 items-center md:justify-center min-h-[80vh] lg:pb-0  bg-white">
      <div className="md:flex block md:w-2/3">
        <div className=" md:w-4/6 flex flex-col gap-6">
          <p className={`font-semibold  md:text-6xl text-3xl`}>
            We&apos;re l👀king for <br className="md:block hidden" /> new
            challenge
          </p>

          <p
            className={`text-[#5E646F] font-inter font-medium md:text-base text-sm`}
          >
            We thrive on solving complex problems and turning big ideas into
            bold <br className="md:block hidden" /> results. If you’re
            navigating uncharted territory or aiming for something{" "}
            <br className="md:block hidden" /> audacious, we’d love to help you
            make it happen.
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
  );
}

export default Challenge;
