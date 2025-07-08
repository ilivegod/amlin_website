"use client";

import { useEffect, useRef } from "react";

export default function Eyes() {
  const leftEye = useRef<HTMLDivElement>(null);
  const rightEye = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveEyes = (e: MouseEvent) => {
      const move = (eye: HTMLDivElement | null) => {
        if (!eye) return;

        const { left, top, width, height } = eye.getBoundingClientRect();
        const eyeCenterX = left + width / 2;
        const eyeCenterY = top + height / 2;

        const rad = Math.atan2(e.clientX - eyeCenterX, e.clientY - eyeCenterY);
        const rot = rad * (180 / Math.PI) * -1 + 180;

        eye.style.transform = `rotate(${rot}deg)`;
      };

      move(leftEye.current);
      move(rightEye.current);
    };

    window.addEventListener("mousemove", moveEyes);
    return () => window.removeEventListener("mousemove", moveEyes);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen gap-10">
      {[leftEye, rightEye].map((ref, i) => (
        <div
          key={i}
          ref={ref}
          className="w-24 h-24 bg-white rounded-full border-4 border-black flex justify-center items-center"
        >
          <div className="w-6 h-6 bg-black rounded-full" />
        </div>
      ))}
    </div>
  );
}
