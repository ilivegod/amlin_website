"use client";

import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

import {
  CONTACT_SCROLL_KEY,
  clearPendingHashScroll,
  smoothScrollToId,
} from "@/lib/smooth-scroll";

export function AboutHashScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (pathname !== "/about") return;

    const fromStorage = sessionStorage.getItem(CONTACT_SCROLL_KEY);
    const fromHash = window.location.hash.replace("#", "");
    const target = fromStorage || fromHash;

    if (target !== "contact") return;

    let attempts = 0;
    let timer: number | undefined;
    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;

      const element = document.getElementById("contact");
      const ready = Boolean(element) && (Boolean(lenis) || attempts > 10);

      if (ready) {
        const scrolled = smoothScrollToId("contact", lenis, {
          duration: 1.85,
        });
        if (scrolled) {
          clearPendingHashScroll();
        }
        return;
      }

      if (attempts < 40) {
        attempts += 1;
        timer = window.setTimeout(tryScroll, 50);
      }
    };

    // Wait a beat for the about page (and Lenis) to settle after route change.
    timer = window.setTimeout(tryScroll, 120);

    return () => {
      cancelled = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [pathname, lenis]);

  return null;
}
