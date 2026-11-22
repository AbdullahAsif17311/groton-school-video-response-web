"use client";

import { useRef } from "react";

/** A tile with a soft light that follows the mouse. Content is passed in as children. */
export default function InterestTile({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} data-cursor="hover" className={`group relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--px, 50%) var(--py, 50%), rgba(255,255,255,0.22), transparent 65%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
