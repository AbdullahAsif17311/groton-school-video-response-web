import { Play } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import Tilt from "./Tilt";

export default function VideoResponse() {
  return (
    <section
      id="video"
      aria-labelledby="video-heading"
      className="graph relative bg-crimson px-4 pt-6 pb-28 text-white sm:px-6 md:pb-36"
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="video-heading" className="font-display text-5xl font-black sm:text-7xl">
              A Little About Me
            </h2>
            <svg aria-hidden viewBox="0 0 220 14" className="mt-2 h-3 w-56" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
              <path d="M3 9c20-8 38 6 58-1s38-6 58 0 38 5 58-2 20-2 40 0" />
            </svg>
            <p className="mt-5 max-w-xl text-xl text-white">
              Here’s my video response for Groton School. I hope you enjoy watching it!
            </p>
          </div>
          <p aria-hidden className="hidden -rotate-3 font-hand text-4xl sm:block">
            press play!
          </p>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute -top-14 right-0 z-20 hidden rounded-full bg-navy p-1.5 text-white sm:block md:-right-8"
          >
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 120 120" className="spin-slow h-full w-full">
                <defs>
                  <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text fontSize="13" fontWeight="700" fill="currentColor" textLength="272" lengthAdjust="spacing">
                  <textPath href="#badge-circle">PRESS PLAY · PRESS PLAY · </textPath>
                </text>
              </svg>
              <Play size={26} fill="currentColor" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <Tilt max={4}>
            <VideoPlayer />
          </Tilt>
        </div>
      </div>
    </section>
  );
}
