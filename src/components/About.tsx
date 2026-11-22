import { Bot, CircleDot, Code, Crown, Grid3x3, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";
import InterestTile from "./InterestTile";
import { alsoDo, projects, roots, timeline } from "@/config/content";

type Interest = {
  title: string;
  text: string;
  Icon: LucideIcon;
  anim: string;
  span: string;
  tile: string;
  hover: string;
};

const interests: Interest[] = [
  {
    title: "Programming & Technology",
    text: "I enjoy building websites, experimenting with code, and learning how technology works.",
    Icon: Code,
    anim: "anim-wiggle",
    span: "md:col-span-7",
    tile: "bg-navy text-white -rotate-1 hover:bg-crimson",
    hover: "hover:shadow-[12px_12px_0_0_var(--color-crimson)]",
  },
  {
    title: "Artificial Intelligence",
    text: "I’m interested in AI, automation, and discovering new ways technology can solve problems.",
    Icon: Bot,
    anim: "anim-nod",
    span: "md:col-span-5 md:mt-12",
    tile: "bg-crimson text-white rotate-1 hover:bg-navy",
    hover: "hover:shadow-[12px_12px_0_0_var(--color-crimson)]",
  },
  {
    title: "Basketball",
    text: "I enjoy playing basketball and learning from the game.",
    Icon: CircleDot,
    anim: "anim-ball",
    span: "md:col-span-4",
    tile: "bg-white text-navy rotate-1 hover:bg-crimson hover:text-white",
    hover: "hover:shadow-[12px_12px_0_0_var(--color-navy)]",
  },
  {
    title: "Chess",
    text: "I like the strategic thinking and problem-solving involved in chess.",
    Icon: Crown,
    anim: "anim-crown",
    span: "md:col-span-4 md:-mt-6",
    tile: "bg-crimson-deep text-white -rotate-2 hover:bg-navy",
    hover: "hover:shadow-[12px_12px_0_0_var(--color-crimson)]",
  },
  {
    title: "Rubik’s Cube",
    text: "I enjoy solving Rubik’s Cubes and challenging myself to improve.",
    Icon: Grid3x3,
    anim: "anim-cube",
    span: "md:col-span-4 md:mt-6",
    tile: "bg-royal text-white rotate-1 hover:bg-crimson",
    hover: "hover:shadow-[12px_12px_0_0_var(--color-navy)]",
  },
];

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 md:pt-28">
        <Reveal>
          <h2 id="about-heading" className="font-display text-5xl font-black text-crimson sm:text-7xl">
            A Few Things About Me
          </h2>
          <p className="mt-6 max-w-2xl font-display text-xl leading-relaxed text-navy sm:text-2xl">
            I’m someone who enjoys learning by experimenting and trying things out. I spend a lot of my time exploring
            technology, working on small projects, and learning things beyond the classroom.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-7 md:grid-cols-12">
          {interests.map(({ title, text, Icon, anim, span, tile, hover }, i) => (
            <li key={title} className={`${span} list-none`}>
              <Reveal delay={i * 90} className="h-full">
                <InterestTile
                  className={`h-full rounded-2xl p-7 shadow-[6px_6px_0_0_rgba(11,31,58,0.9)] transition-all duration-300 hover:-translate-y-2 hover:rotate-0 ${tile} ${hover}`}
                >
                  <span aria-hidden className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-2 ring-current/40">
                    <Icon size={32} className={anim} />
                  </span>
                  <h3 className="mt-5 font-display text-3xl font-extrabold">{title}</h3>
                  <p className="mt-2 max-w-sm text-lg leading-relaxed opacity-95">{text}</p>
                </InterestTile>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-14 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h3 className="font-display text-4xl font-black text-navy">What I’m making</h3>
            <ul className="mt-6 border-t-4 border-navy">
              {projects.map((p) => (
                <li key={p.name} className="group relative overflow-hidden border-b-2 border-navy/20">
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-crimson transition-transform duration-300 group-hover:scale-x-100"
                  />
                  <div className="relative px-1 py-6 transition-colors duration-300 group-hover:px-4 group-hover:text-white">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="font-display text-2xl font-extrabold">{p.name}</h4>
                      <span className="font-hand text-2xl text-crimson transition-colors duration-300 group-hover:text-white">
                        {p.note}
                      </span>
                    </div>
                    <p className="mt-2 leading-relaxed opacity-90">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="font-display text-4xl font-black text-navy">Along the way</h3>
            <ol className="mt-6 ml-2 border-l-4 border-crimson">
              {timeline.map((t) => (
                <li key={t.what} className="group relative pb-8 pl-8 last:pb-0">
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[13px] h-5 w-5 rotate-45 border-4 border-crimson bg-paper transition-colors duration-200 group-hover:bg-crimson"
                  />
                  <div className="transition-transform duration-200 group-hover:translate-x-2">
                    <p className="font-hand text-2xl text-crimson">{t.when}</p>
                    <h4 className="font-display text-xl font-extrabold text-navy">{t.what}</h4>
                    <p className="mt-1 max-w-md leading-relaxed text-navy/80">{t.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>

      <div className="graph mt-24 bg-crimson py-20 text-white">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-start">
              <div>
                <h3 className="font-display text-4xl font-black sm:text-5xl">Where I’m from</h3>
                <p className="mt-5 max-w-md text-xl leading-relaxed">{roots}</p>
              </div>
              <div>
                <p className="font-hand text-3xl">and a few other things I do:</p>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {alsoDo.map((item, i) => (
                    <li
                      key={item}
                      data-cursor="hover"
                      className={`${tilts[i % tilts.length]} cursor-default rounded-full border-2 border-white px-5 py-2 text-lg font-semibold transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:bg-white hover:text-crimson`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
