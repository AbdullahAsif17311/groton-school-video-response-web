"use client";

import { useEffect, useRef, useState } from "react";
import { Film, Play } from "lucide-react";
import { video } from "@/config/site";

type Status = "checking" | "ready" | "missing";

const confettiColors = ["#ffffff", "#0b1f3a", "#c6283d", "#174ea6"];

export default function VideoPlayer() {
  const ref = useRef<HTMLVideoElement>(null);
  const firstPlay = useRef(true);
  const [status, setStatus] = useState<Status>("checking");
  const [playing, setPlaying] = useState(false);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    // Hosted (https://) videos can't be checked reliably from the browser, so
    // trust them and rely on the player's error event. Local files are checked.
    if (!video.src.startsWith("/")) {
      setStatus("ready");
      return;
    }
    let cancelled = false;
    fetch(video.src, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        if (!cancelled) setStatus(res.ok && type.startsWith("video") ? "ready" : "missing");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onPlay = () => {
    setPlaying(true);
    if (firstPlay.current) {
      firstPlay.current = false;
      setBurst(true);
    }
  };

  return (
    <div className="relative">
      <span aria-hidden className="absolute -top-3 left-6 z-10 h-6 w-24 -rotate-6 bg-white/85" />
      <span aria-hidden className="absolute -top-3 right-6 z-10 h-6 w-24 rotate-6 bg-navy/85" />

      <div className="relative aspect-video w-full -rotate-1 overflow-hidden rounded-md bg-navy shadow-[0_0_0_8px_#fff,14px_14px_0_8px_var(--color-navy)]">
        {status === "ready" && (
          <>
            <video
              ref={ref}
              className="h-full w-full"
              src={video.src}
              poster={video.poster}
              controls
              playsInline
              preload="metadata"
              aria-label={video.title}
              data-cursor="hide"
              onPlay={onPlay}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onError={() => setStatus("missing")}
            >
              Your browser can’t play this video.
            </video>

            {!playing && (
              <button
                type="button"
                aria-label="Play video"
                data-cursor-label="Play"
                onClick={() => ref.current?.play().catch(() => {})}
                className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-crimson text-white shadow-[0_0_0_5px_#fff] transition-transform duration-200 hover:scale-110 sm:h-28 sm:w-28"
              >
                <span aria-hidden className="absolute inset-0 rounded-full bg-crimson opacity-60 motion-safe:animate-ping" />
                <Play size={40} fill="currentColor" aria-hidden className="relative ml-1" />
              </button>
            )}

            {burst && (
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                {Array.from({ length: 26 }).map((_, i) => (
                  <span
                    key={i}
                    className="confetti"
                    style={
                      {
                        "--a": `${i * (360 / 26)}deg`,
                        "--d": `${130 + (i % 5) * 45}px`,
                        "--c": confettiColors[i % confettiColors.length],
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}

        {status === "missing" && (
          <div role="status" className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-white">
            <Film size={40} aria-hidden className="text-white/80" />
            <p className="font-display text-2xl sm:text-3xl">My video will appear here.</p>
            {process.env.NODE_ENV !== "production" && (
              <p className="max-w-md text-sm text-white/70">
                Developer note: add your MP4 at <code>public/videos/abdullah-response.mp4</code>, or change the path in{" "}
                <code>src/config/site.ts</code>. This note is hidden on the live site.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
