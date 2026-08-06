"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";

import { smoothScrollToId } from "@/lib/smooth-scroll";

export function AboutHashScroll() {
  const lenis = useLenis();

  useEffect(() => {
    const fromStorage = sessionStorage.getItem("scrollTo");
    const fromHash = window.location.hash.replace("#", "");
    const target = fromStorage || fromHash;

    if (target !== "contact") return;

    sessionStorage.removeItem("scrollTo");

    let attempts = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tryScroll = () => {
      const element = document.getElementById("contact");
      if (element && (lenis || attempts > 4)) {
        smoothScrollToId("contact", lenis);
        return;
      }

      if (attempts < 24) {
        attempts += 1;
        timer = window.setTimeout(tryScroll, 50);
      }
    };

    timer = window.setTimeout(tryScroll, 100);

    return () => window.clearTimeout(timer);
  }, [lenis]);

  return null;
}
