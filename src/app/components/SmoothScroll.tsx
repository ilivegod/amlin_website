"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore, type ReactNode } from "react";

import "lenis/dist/lenis.css";

import { RouteScrollReset } from "@/components/RouteScrollReset";

function subscribeReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  if (reduceMotion) {
    return (
      <>
        <RouteScrollReset />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        duration: 1.35,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.15,
      }}
    >
      <RouteScrollReset />
      {children}
    </ReactLenis>
  );
}
