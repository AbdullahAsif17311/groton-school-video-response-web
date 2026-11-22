"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "idle" | "link" | "hide";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  rot: number;
  vr: number;
};

const POOL = 28; // how many confetti squares can exist at once
const COLORS = ["#ffffff", "#0b1f3a", "#174ea6", "#c6283d"];

// Set to true to hide the normal arrow and use only the red blob.
// (Video controls and text fields always keep the normal cursor.)
const HIDE_NATIVE_CURSOR = false;

/**
 * A red blob that follows the mouse with a springy lag and stretches in the
 * direction it moves, like a drop of paint. Fast movement leaves a trail of
 * tiny squares, clicking pops a burst of them, and over links it grows into a
 * labelled button ("Play", "Go", "Open"...).
 *
 * Only runs for real mouse pointers and when motion is allowed. The normal
 * cursor stays visible by default, so video controls always work as expected.
 */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const pos = useRef<HTMLDivElement>(null);
  const shape = useRef<HTMLSpanElement>(null);
  const bits = useRef<(HTMLSpanElement | null)[]>([]);
  const modeRef = useRef<Mode>("idle");
  const downRef = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !calm);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let styleEl: HTMLStyleElement | null = null;
    if (HIDE_NATIVE_CURSOR) {
      styleEl = document.createElement("style");
      styleEl.textContent =
        "html,a,button,[data-cursor]{cursor:none!important}video,video *,input,textarea{cursor:auto!important}";
      document.head.appendChild(styleEl);
    }

    let tx = 0; // where the real mouse is
    let ty = 0;
    let bx = 0; // where the blob is (it lags behind the mouse)
    let by = 0;
    let lx = 0; // blob position last frame
    let ly = 0;
    let sx = 1;
    let sy = 1;
    let ang = 0;
    let lastSpawn = 0;
    let first = true;
    let raf = 0;
    let next = 0;
    const parts: (Particle | null)[] = Array(POOL).fill(null);

    const spawn = (p: Particle, size: number) => {
      const el = bits.current[next];
      if (el) {
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.marginLeft = `${-size / 2}px`;
        el.style.marginTop = `${-size / 2}px`;
        el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      parts[next] = p;
      next = (next + 1) % POOL;
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (first) {
        bx = lx = tx;
        by = ly = ty;
        first = false;
      }
      if (root.current) root.current.style.opacity = "1";
    };

    const loop = (t: number) => {
      bx += (tx - bx) * 0.28;
      by += (ty - by) * 0.28;
      const dx = bx - lx;
      const dy = by - ly;
      lx = bx;
      ly = by;
      const speed = Math.hypot(dx, dy);

      if (pos.current) pos.current.style.transform = `translate3d(${bx}px, ${by}px, 0)`;

      if (shape.current) {
        const idle = modeRef.current === "idle";
        const stretch = idle ? Math.min(speed / 30, 0.7) : 0;
        if (speed > 0.5) ang = Math.atan2(dy, dx);
        const press = downRef.current ? 0.75 : 1;
        sx += ((1 + stretch) * press - sx) * 0.3;
        sy += ((1 - stretch * 0.45) * press - sy) * 0.3;
        shape.current.style.transform = `rotate(${ang}rad) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
      }

      // a few tiny squares drop behind the blob when it moves fast
      if (modeRef.current === "idle" && speed > 4 && t - lastSpawn > 30) {
        lastSpawn = t;
        spawn(
          {
            x: bx + (Math.random() - 0.5) * 8,
            y: by + (Math.random() - 0.5) * 8,
            vx: 0,
            vy: 0,
            life: 1,
            decay: 0.035,
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.2,
          },
          5 + Math.random() * 5,
        );
      }

      for (let i = 0; i < POOL; i++) {
        const p = parts[i];
        const el = bits.current[i];
        if (!p || !el) continue;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.rot += p.vr;
        p.life -= p.decay;
        if (p.life <= 0) {
          parts[i] = null;
          el.style.opacity = "0";
        } else {
          el.style.opacity = String(p.life);
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}rad) scale(${p.life})`;
        }
      }

      raf = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      let nextMode: Mode = "idle";
      let nextLabel = "";
      if (el) {
        if (el.dataset.cursor === "hide") {
          nextMode = "hide";
        } else {
          nextMode = "link";
          nextLabel = el.dataset.cursorLabel ?? "";
        }
      }
      modeRef.current = nextMode;
      setMode(nextMode);
      setLabel(nextLabel);
    };

    const onDown = () => {
      downRef.current = true;
      if (modeRef.current === "hide") return;
      const count = 10;
      for (let k = 0; k < count; k++) {
        const a = (k / count) * Math.PI * 2 + Math.random() * 0.4;
        const v = 3 + Math.random() * 3;
        spawn(
          {
            x: tx,
            y: ty,
            vx: Math.cos(a) * v,
            vy: Math.sin(a) * v,
            life: 1,
            decay: 0.03,
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.3,
          },
          6 + Math.random() * 6,
        );
      }
    };
    const onUp = () => {
      downRef.current = false;
    };
    const onLeave = () => {
      if (root.current) root.current.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      styleEl?.remove();
    };
  }, [enabled]);

  if (!enabled) return null;

  const shapeClass =
    mode === "link"
      ? label
        ? "h-[88px] w-[88px] border-white bg-navy shadow-[0_0_0_2px_#fff]"
        : "h-12 w-12 border-white bg-white/10 shadow-[0_0_0_2px_#0b1f3a]"
      : "h-6 w-6 border-white bg-crimson shadow-[0_0_0_2px_#0b1f3a]";

  return (
    <div
      ref={root}
      aria-hidden
      style={{ opacity: 0 }}
      className="pointer-events-none fixed inset-0 z-[100] transition-opacity duration-200"
    >
      {Array.from({ length: POOL }).map((_, i) => (
        <span
          key={i}
          ref={(el) => {
            bits.current[i] = el;
          }}
          className="absolute top-0 left-0 opacity-0"
        />
      ))}

      <div
        ref={pos}
        className={`absolute top-0 left-0 transition-opacity duration-150 ${mode === "hide" ? "opacity-0" : "opacity-100"}`}
      >
        <span
          ref={shape}
          className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-[width,height,background-color,border-color,box-shadow] duration-200 ease-out ${shapeClass}`}
        />
        {label && (
          <span className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-sm font-bold whitespace-nowrap text-white">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
