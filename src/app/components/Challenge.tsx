"use client";

import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useRef } from "react";

import { FollowingEyes } from "@/components/FollowingEyes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(3, { message: "Please enter a valid name" }),
  email: z.string().email().min(3, { message: "Please enter a valid email" }),
  projectDetails: z
    .string()
    .min(3, { message: "Please enter your project details" }),
});

type FormValues = z.infer<typeof contactSchema>;

const fieldClassName =
  "border-0 border-b border-white/20 rounded-none bg-transparent px-0 py-4 text-white placeholder:text-white/35 text-base focus-visible:border-white/60 focus-visible:ring-0";

function Challenge() {
  const contactRef = useRef<HTMLDivElement | null>(null);

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
      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });

        const result = await res.json();

        if (result.success) {
          form.reset();
        }

        toast.success(
          "Thanks for contacting us! A member of our team will be in touch shortly."
        );
        form.reset();
      } catch (error) {
        console.error(error);
        toast.warning("Something went wrong! Try again");
      }
    },
  });

  return (
    <section
      id="contact"
      ref={contactRef}
      className="relative bg-[#050505] px-[var(--hero-gutter)] py-20 font-inter md:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 border-t work-grid-line pt-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pt-16">
        <div className="flex flex-col gap-6">
          <h2 className="font-polysans text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[#b0b0b0]">
            <span className="inline-flex flex-wrap items-center">
              We&apos;re l
              <FollowingEyes />
              king for
            </span>{" "}
            <span className="block">new challenges</span>
          </h2>

          <p className="max-w-xl font-inter text-sm leading-relaxed text-white/55 md:text-base">
            We thrive on solving complex problems and turning big ideas into bold
            results. If you&apos;re navigating uncharted territory or aiming for
            something audacious, we&apos;d love to help you make it happen.
          </p>
        </div>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-5"
          >
            <form.Field name="name">
              {(field) => (
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={fieldClassName}
                  required
                />
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="E-mail"
                  className={fieldClassName}
                />
              )}
            </form.Field>

            <form.Field name="projectDetails">
              {(field) => (
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Project details"
                  rows={6}
                  className={`${fieldClassName} min-h-[9rem] resize-y py-4`}
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                    className="amlin-trace rounded-full border border-white/20 bg-white/10 px-6 py-5 font-inter text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/16"
                  >
                    {isSubmitting ? "Submitting..." : "Get in touch"}
                    <ChevronRight className="ml-1 h-4 w-4" />
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
