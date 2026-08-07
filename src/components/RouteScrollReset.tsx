"use client";

import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect } from "react";

import { hasPendingHashScroll, scrollToTop } from "@/lib/smooth-scroll";

export function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window === "undefined") return;
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (hasPendingHashScroll()) return;
    scrollToTop(lenis, { immediate: true });
  }, [pathname, lenis]);

  return null;
}
