"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";

const links = [
  { href: "#home", label: "Home" },
  { href: "#video", label: "My Video" },
  { href: "#about", label: "About Me" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-white transition-colors duration-300 ${
        scrolled ? "bg-crimson shadow-[0_4px_0_0_var(--color-navy)]" : "bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5 text-sm font-bold tracking-[0.14em] uppercase">
          <span aria-hidden className="h-3 w-3 rotate-45 bg-white" />
          {site.name}
        </a>

        <ul className="hidden items-center gap-9 text-[0.95rem] font-semibold sm:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="-mr-2 rounded p-2 sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="bg-navy px-5 pb-4 sm:hidden">
          {links.map((l) => (
            <li key={l.href} className="border-b border-white/15 last:border-b-0">
              <a href={l.href} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div ref={bar} aria-hidden style={{ transform: "scaleX(0)" }} className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-white" />
    </header>
  );
}
