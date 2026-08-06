"use client";

import { useEffect, useRef, useState } from "react";

type PupilOffset = { x: number; y: number };

const MAX_PUPIL_SHIFT = 3;

function usePupilTracking(containerRef: React.RefObject<HTMLElement | null>) {
  const [offset, setOffset] = useState<PupilOffset>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(
        Math.hypot(deltaX, deltaY) * 0.035,
        MAX_PUPIL_SHIFT
      );

      setOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [containerRef]);

  return offset;
}

function Eye({ offset }: { offset: PupilOffset }) {
  return (
    <span className="relative inline-flex h-[0.78em] w-[0.44em] items-center justify-center rounded-[50%] border border-white/25 bg-white/95 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
      <span
        className="absolute h-[0.24em] w-[0.18em] rounded-[50%] bg-[#050505] transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
    </span>
  );
}

export function FollowingEyes() {
  const eyesRef = useRef<HTMLSpanElement>(null);
  const offset = usePupilTracking(eyesRef);

  return (
    <span
      ref={eyesRef}
      className="mx-[0.04em] inline-flex items-center gap-[0.1em] align-middle"
      aria-hidden="true"
    >
      <Eye offset={offset} />
      <Eye offset={offset} />
    </span>
  );
}
