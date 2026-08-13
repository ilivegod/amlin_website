"use client";

import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

import { hasPendingHashScroll, scrollToTop } from "@/lib/smooth-scroll";

export function RouteScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return;
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    // Skip top reset when navigating to a pending contact hash target.
    if (hasPendingHashScroll()) return;

    // Only force top on actual route changes (not Lenis re-subscribes).
    if (!pathChanged && !lenis) return;
    if (!pathChanged) return;

    scrollToTop(lenis, { immediate: true });
  }, [pathname, lenis]);

  return null;
}
