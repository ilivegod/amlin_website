"use client";

import { RevealTitle } from "@/components/RevealTitle";
import { getInitials, testimonials } from "@/data/testimonials";
import clsx from "clsx";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type TestimonialsSectionProps = {
  className?: string;
};

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const getActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const cards = track.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    if (!cards.length) return 0;

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - trackCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    return closest;
  }, []);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    if (!cards.length) return;

    const lastCard = cards[cards.length - 1];
    const scrollEnd = lastCard.offsetLeft + lastCard.offsetWidth - track.clientWidth;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const end = Math.max(0, Math.min(scrollEnd, maxScroll));

    if (end <= 0) {
      setProgress(1);
      setActiveIndex(0);
      return;
    }

    const nextProgress = Math.min(1, Math.max(0, track.scrollLeft / end));
    setProgress(nextProgress);
    setActiveIndex(getActiveIndex());
  }, [getActiveIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();

    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);

    return () => observer.disconnect();
  }, [updateScrollState]);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    const card = cards[index];
    if (!card) return;

    const target =
      card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;

    track.scrollTo({ left: target, behavior: "smooth" });
  };

  const scrollByDirection = (direction: -1 | 1) => {
    const nextIndex = Math.min(
      testimonials.length - 1,
      Math.max(0, activeIndex + direction)
    );
    scrollToIndex(nextIndex);
  };

  const releasePointer = (track: HTMLDivElement, pointerId: number) => {
    try {
      if (track.hasPointerCapture(pointerId)) {
        track.releasePointerCapture(pointerId);
      }
    } catch {
      // Pointer may already be released during native touch scrolling.
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const track = trackRef.current;
    if (!track) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: track.scrollLeft,
      pointerId: event.pointerId,
    };
    setIsDragging(true);
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;
    if (event.pointerId !== dragState.current.pointerId) return;

    const delta = event.clientX - dragState.current.startX;
    track.scrollLeft = dragState.current.scrollLeft - delta;
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;
    if (event.pointerId !== dragState.current.pointerId) return;

    const { pointerId } = dragState.current;
    dragState.current.active = false;
    dragState.current.pointerId = -1;
    setIsDragging(false);
    releasePointer(track, pointerId);
    updateScrollState();
  };

  return (
    <section
      className={clsx(
        "relative overflow-hidden bg-[#050505] py-20 md:py-28",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-[var(--hero-gutter)] text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
          <Users className="size-3.5 text-white/55" strokeWidth={1.75} />
          <span className="font-inter text-xs text-white/55">Testimonials</span>
        </div>

        <RevealTitle
          as="h2"
          text="Trusted by partners who expect more"
          className="mt-8 font-polysans text-[clamp(2.25rem,5.2vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
        />

        <p className="mx-auto mt-5 max-w-xl font-inter text-sm leading-relaxed text-white/45 md:text-base">
          Real Stories. Real Results. Straight From
          <br />
          Those Who Trusted Us.
        </p>
      </div>

      <div className="relative mt-14 md:mt-16">
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          className={[
            "testimonial-track flex gap-5 overflow-x-auto px-[var(--hero-gutter)] pb-2",
            "snap-x snap-mandatory scroll-smooth",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab md:cursor-grab",
          ].join(" ")}
        >
          {testimonials.map((item) => (
            <article
              key={item.name}
              data-testimonial-card
              className="testimonial-card relative flex min-h-[22rem] w-[min(88vw,26rem)] shrink-0 snap-center flex-col rounded-[1.35rem] border border-white/[0.06] bg-[#0c0c0c] p-7 md:min-h-[24rem] md:w-[26rem] md:p-8"
            >
              <div className="flex flex-col items-start text-left">
                <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#141414] md:size-16">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      draggable={false}
                    />
                  ) : (
                    <span className="font-inter text-sm font-semibold text-white/80 md:text-base">
                      {getInitials(item.name)}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-inter text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="mt-1 font-inter text-sm text-white/45">{item.role}</p>

                <p className="mt-6 font-inter text-sm leading-relaxed text-white/82 md:text-[0.9375rem]">
                  {item.quote}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl items-center gap-6 px-[var(--hero-gutter)] md:mt-12">
        <div className="relative h-px flex-1 bg-white/10">
          <div
            className="absolute inset-y-0 left-0 bg-white transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByDirection(-1)}
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection(1)}
            disabled={activeIndex === testimonials.length - 1}
            aria-label="Next testimonial"
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronRight className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </section>
  );
}
