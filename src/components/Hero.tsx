"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import Magnetic from "./Magnetic";
import Doodles from "./Doodles";

const lines = ["Hello,", "I’m", "Abdullah."];

function Headline() {
  let n = 0;
  return (
    <span aria-hidden="true">
      {lines.map((line) => (
        <span key={line} className="block">
          {line.split("").map((ch) => {
            const i = n++;
            return (
              <span
                key={i}
                style={{ animationDelay: `${i * 45}ms` }}
                className="drop-in inline-block cursor-default transition-[translate,rotate,color] duration-200 hover:-translate-y-3 hover:-rotate-6 hover:text-navy"
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "-999px");
    el.style.setProperty("--py", "-999px");
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-labelledby="hero-heading"
      className="graph relative flex min-h-[90svh] items-center overflow-hidden bg-crimson pt-24 pb-16 text-white"
    >
      <Doodles />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="inline-flex items-center gap-3 rounded-full border border-white/60 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase">
          <span aria-hidden className="h-2 w-2 rounded-full bg-white" />
          Groton School · Fall 2027 Applicant
        </p>

        <h1
          id="hero-heading"
          aria-label="Hello, I’m Abdullah."
          className="mt-7 font-display text-[clamp(3.6rem,14vw,9.5rem)] leading-[0.92] font-black tracking-tight"
        >
          <Headline />
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-white sm:text-2xl">
          I’m a student from Karachi, Pakistan. I enjoy exploring technology, building things, learning new skills, and
          discovering ideas that make me curious.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
          <Magnetic>
            <a
              href="#video"
              data-cursor-label="Go"
              className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-bold text-crimson shadow-[6px_6px_0_0_var(--color-navy)] transition-shadow hover:shadow-[10px_10px_0_0_var(--color-navy)]"
            >
              <Play size={20} fill="currentColor" aria-hidden />
              Watch my video
            </a>
          </Magnetic>
          <p className="flex -rotate-2 items-end gap-1 font-hand text-3xl text-white">
            my video is right below
            <svg
              aria-hidden
              viewBox="0 0 60 60"
              className="h-12 w-12 translate-y-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 6c18 2 34 14 36 40" />
              <path d="M30 38l14 10 6-16" />
            </svg>
          </p>
        </div>
      </div>
    </section>
  );
}
