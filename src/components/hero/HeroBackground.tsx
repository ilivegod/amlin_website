"use client";

import { useEffect, useRef, useState } from "react";
import {
  createHeroBgProgram,
  getHeroBgUniforms,
  HERO_BG_CONFIG,
} from "./heroBackgroundShaders";

type HeroBackgroundProps = {
  className?: string;
};

export function HeroBackground({ className = "" }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [painted, setPainted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const gl =
      canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        depth: false,
      }) ??
      canvas.getContext("experimental-webgl", {
        antialias: false,
        alpha: false,
        depth: false,
      });

    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      setUseFallback(true);
      return;
    }

    const program = createHeroBgProgram(gl);
    if (!program) {
      setUseFallback(true);
      return;
    }

    gl.useProgram(program);
    const uniforms = getHeroBgUniforms(gl, program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    let scale = Math.min(
      window.devicePixelRatio || 1,
      HERO_BG_CONFIG.maxPixelRatio
    );
    const minScale = 0.7;
    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let running = false;
    let visible = document.visibilityState === "visible";
    let onScreen = true;
    let reducedMotion = motionQuery.matches;
    let startTime = performance.now();
    let lastFrame = 0;
    let frames = 0;
    let accum = 0;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const w = Math.max(1, Math.round(container.clientWidth * scale));
      const h = Math.max(1, Math.round(container.clientHeight * scale));
      if (w === width && h === height) return false;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      return true;
    };

    const draw = (time: number) => {
      gl.uniform2f(uniforms.uRes, width, height);
      gl.uniform1f(uniforms.uTime, time);
      gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
      gl.uniform1f(uniforms.uDensity, HERO_BG_CONFIG.density);
      gl.uniform1f(uniforms.uAperture, HERO_BG_CONFIG.aperture);
      gl.uniform1f(uniforms.uTilt, HERO_BG_CONFIG.tilt);
      gl.uniform1f(uniforms.uExposure, HERO_BG_CONFIG.exposure);
      gl.uniform1f(uniforms.uGrain, HERO_BG_CONFIG.grain);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      setPainted(true);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const frame = (now: number) => {
      animationFrame = 0;
      if (!running) return;

      const dt = lastFrame ? now - lastFrame : 16;
      lastFrame = now;

      if (++frames > 30) {
        if (accum / frames > 24 && scale > minScale) {
          scale = Math.max(minScale, scale * 0.75);
          width = height = 0;
          resize();
        }
        frames = 0;
        accum = 0;
      } else {
        accum += dt;
      }

      const k = 1 - Math.pow(0.001, dt / 1000);
      pointer.x += (pointer.tx - pointer.x) * k;
      pointer.y += (pointer.ty - pointer.y) * k;

      resize();
      draw((now - startTime) / 1000);
      animationFrame = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      lastFrame = 0;
      if (!animationFrame) animationFrame = requestAnimationFrame(frame);
    };

    const renderStill = () => {
      resize();
      draw(12.5);
    };

    const sync = () => {
      if (visible && onScreen && !reducedMotion) start();
      else stop();
    };

    const onVisibilityChange = () => {
      visible = document.visibilityState === "visible";
      sync();
    };

    const onMotionChange = () => {
      reducedMotion = motionQuery.matches;
      if (reducedMotion) {
        stop();
        pointer.x = pointer.y = pointer.tx = pointer.ty = 0;
        renderStill();
      } else {
        startTime = performance.now();
        sync();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || HERO_BG_CONFIG.parallax <= 0) return;
      pointer.tx =
        ((event.clientX / window.innerWidth) * 2 - 1) *
        HERO_BG_CONFIG.parallax;
      pointer.ty =
        ((event.clientY / window.innerHeight) * 2 - 1) *
        HERO_BG_CONFIG.parallax;
    };

    const onResize = () => {
      if (running) return;
      renderStill();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 }
    );

    document.addEventListener("visibilitychange", onVisibilityChange);
    motionQuery.addEventListener("change", onMotionChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    intersectionObserver.observe(container);

    renderStill();
    sync();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      intersectionObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-bg ${useFallback ? "hero-bg--fallback" : ""} ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`hero-bg__canvas ${painted ? "hero-bg__canvas--visible" : ""}`}
      />
    </div>
  );
}
