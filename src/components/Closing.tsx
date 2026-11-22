import { ArrowUp, Github, Linkedin } from "lucide-react";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import { links } from "@/config/content";

const pill =
  "inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-crimson shadow-[5px_5px_0_0_var(--color-navy)] transition-shadow hover:shadow-[8px_8px_0_0_var(--color-navy)]";

export default function Closing() {
  return (
    <section aria-labelledby="closing-heading" className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <div aria-hidden className="mb-8 flex gap-2">
            <span className="h-4 w-4 bg-crimson" />
            <span className="h-4 w-4 bg-white" />
            <span className="h-4 w-4 bg-royal" />
          </div>
          <h2 id="closing-heading" className="max-w-3xl font-display text-4xl leading-tight font-black sm:text-6xl">
            Thank you for taking a little time to get to know me.
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-14 flex flex-wrap items-end justify-between gap-10">
          <div className="border-l-4 border-crimson pl-5">
            <p className="font-display text-3xl font-extrabold">Abdullah Asif</p>
            <p className="mt-1 text-lg text-white/85">Karachi, Pakistan</p>
            <p className="text-lg text-white/85">Groton School Applicant · Fall 2027</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Magnetic>
              <a href={links.github} target="_blank" rel="noopener noreferrer" data-cursor-label="Open" className={pill}>
                <Github size={18} aria-hidden />
                GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" data-cursor-label="Open" className={pill}>
                <Linkedin size={18} aria-hidden />
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#home" data-cursor-label="Top" className={pill}>
                <ArrowUp size={18} aria-hidden />
                Back to top
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
