import type { ReactNode } from "react";

const pen = {
  fill: "none",
  stroke: "#fff",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const items: { x: string; y: string; size: number; rot: number; art: ReactNode }[] = [
  {
    x: "76%", y: "10%", size: 120, rot: 12,
    art: (
      <>
        <circle cx="50" cy="50" r="40" />
        <path d="M10 50h80M50 10v80" />
        <path d="M22 20c18 14 18 46 0 60M78 20c-18 14-18 46 0 60" />
      </>
    ),
  },
  {
    x: "88%", y: "46%", size: 110, rot: -8,
    art: (
      <>
        <path d="M28 88h44M32 88l3-34M68 88l-3-34M30 54h40" />
        <path d="M30 54l-2-26h9v8h8v-8h10v8h8v-8h9l-2 26" />
      </>
    ),
  },
  {
    x: "58%", y: "68%", size: 100, rot: 10,
    art: (
      <>
        <rect x="15" y="15" width="70" height="70" rx="6" />
        <path d="M38 15v70M62 15v70M15 38h70M15 62h70" />
      </>
    ),
  },
  {
    x: "64%", y: "30%", size: 110, rot: -6,
    art: (
      <>
        <rect x="30" y="30" width="40" height="40" rx="6" />
        <path d="M42 30V16M58 30V16M42 70v14M58 70v14M30 42H16M30 58H16M70 42h14M70 58h14" />
        <circle cx="50" cy="50" r="6" />
      </>
    ),
  },
  {
    x: "6%", y: "80%", size: 90, rot: -12,
    art: <path d="M50 8l11 27 29 3-22 19 7 29-25-15-25 15 7-29L10 38l29-3z" />,
  },
  {
    x: "36%", y: "82%", size: 130, rot: 4,
    art: <path d="M10 70c20-50 60-50 80-10M72 42l18 18-24 6" />,
  },
];

export default function Doodles() {
  return (
    <div aria-hidden className="doodle-layer pointer-events-none absolute inset-0">
      {items.map((it, i) => (
        <svg
          key={i}
          viewBox="0 0 100 100"
          {...pen}
          className="absolute"
          style={{ left: it.x, top: it.y, width: it.size, height: it.size, transform: `rotate(${it.rot}deg)` }}
        >
          {it.art}
        </svg>
      ))}
      <span className="absolute font-hand text-7xl text-white" style={{ left: "46%", top: "7%", transform: "rotate(-8deg)" }}>
        &lt;/&gt;
      </span>
      <span className="absolute font-hand text-7xl text-white" style={{ left: "90%", top: "80%", transform: "rotate(10deg)" }}>
        hi!
      </span>
    </div>
  );
}
