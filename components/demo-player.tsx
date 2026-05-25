"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

const videoClassName =
  "block aspect-video w-full overflow-hidden rounded-b-xl border-x border-b border-white/10 bg-black shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)]";

const demos = [
  {
    src: "/demo2.mp4",
    label: "Latest screen recording",
    filename: "ghost-demo-latest.mp4",
    isNew: true,
  },
  {
    src: "/demo.mp4",
    label: "Raw 30s screencast",
    filename: "ghost-demo-raw.mp4",
    isNew: false,
  },
] as const;

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const total = Math.round(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function useVideoPreview(videoRef: RefObject<HTMLVideoElement | null>, src: string) {
  const [posterReady, setPosterReady] = useState(false);
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setPosterReady(false);
    setDuration(null);

    const seekToPreview = () => {
      setDuration(formatDuration(video.duration));
      const t =
        Number.isFinite(video.duration) && video.duration > 0
          ? Math.min(2.5, Math.max(0.4, video.duration * 0.06))
          : 0.8;
      video.currentTime = t;
    };

    const onSeeked = () => setPosterReady(true);
    video.addEventListener("loadedmetadata", seekToPreview);
    video.addEventListener("seeked", onSeeked);

    return () => {
      video.removeEventListener("loadedmetadata", seekToPreview);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [src, videoRef]);

  return { posterReady, duration };
}

function DemoVideoCard({
  src,
  label,
  filename,
  isNew,
  index,
}: {
  src: string;
  label: string;
  filename: string;
  isNew: boolean;
  index: number;
}) {
  const [playing, setPlaying] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const { posterReady, duration } = useVideoPreview(previewRef, src);

  if (playing) {
    return (
      <article className="demo-card">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)]">
          <DemoTitleBar filename={filename} isNew={isNew} index={index} duration={duration} />
          <video
            src={src}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className={videoClassName}
          />
        </div>
      </article>
    );
  }

  return (
    <article className="demo-card group/demo">
      <div
        className={`absolute -inset-3 -z-10 rounded-3xl blur-2xl transition-opacity duration-500 ${
          isNew
            ? "bg-gradient-to-br from-[#8ab4ff]/25 via-[#c084fc]/15 to-transparent opacity-70 group-hover/demo:opacity-100"
            : "bg-gradient-to-br from-[#8ab4ff]/12 via-transparent to-[#c084fc]/10 opacity-40 group-hover/demo:opacity-70"
        }`}
        aria-hidden
      />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.75)] transition duration-300 group-hover/demo:border-white/18 group-hover/demo:shadow-[0_28px_70px_-18px_rgba(138,180,255,0.22)]">
        <DemoTitleBar filename={filename} isNew={isNew} index={index} duration={duration} />

        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="demo-preview-shine relative block aspect-video w-full overflow-hidden text-left"
          aria-label={`Play demo video ${index}: ${label}`}
        >
          <video
            ref={previewRef}
            src={src}
            muted
            playsInline
            preload="metadata"
            tabIndex={-1}
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover/demo:scale-[1.04] ${
              posterReady ? "opacity-90" : "opacity-0"
            }`}
          />

          <div
            className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover/demo:opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/40 to-[#08080a]/55"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/15 via-transparent to-[var(--accent-2)]/12 mix-blend-screen"
            aria-hidden
          />
          <div className="demo-preview-grain absolute inset-0 opacity-[0.35]" aria-hidden />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <span
                  className="absolute -inset-3 rounded-full bg-[var(--accent)]/20 blur-md transition-transform duration-500 group-hover/demo:scale-125"
                  aria-hidden
                />
                <span
                  className="absolute inset-0 rounded-full border border-white/20"
                  style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
                  aria-hidden
                />
                <div className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-white/30 bg-white/12 shadow-[0_12px_40px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md transition-all duration-300 group-hover/demo:scale-110 group-hover/demo:border-white/45 group-hover/demo:bg-white/20 group-hover/demo:shadow-[0_0_50px_rgba(138,180,255,0.45)]">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="white" className="ml-1 drop-shadow" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <span className="translate-y-1 rounded-full border border-white/12 bg-black/55 px-3.5 py-1 text-[11px] font-medium tracking-wide text-zinc-200 opacity-0 backdrop-blur-md transition-all duration-300 group-hover/demo:translate-y-0 group-hover/demo:opacity-100">
                Watch recording
              </span>
            </div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="flex min-w-0 items-center gap-1.5 rounded-full border border-white/10 bg-black/65 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent-glow)]" aria-hidden />
              <span className="truncate">{label}</span>
            </div>
            {duration ? (
              <span className="shrink-0 rounded-md border border-white/10 bg-black/60 px-2 py-0.5 font-mono text-[10px] text-zinc-400 backdrop-blur-md">
                {duration}
              </span>
            ) : null}
          </div>
        </button>
      </div>
    </article>
  );
}

function DemoTitleBar({
  filename,
  isNew,
  index,
  duration,
}: {
  filename: string;
  isNew: boolean;
  index: number;
  duration: string | null;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#1c1c22] px-3 py-2.5 sm:px-4">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />

      <div className="ml-2 flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-md bg-black/35 px-2.5 py-1">
        <svg
          className="shrink-0 text-zinc-500"
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M10 9l6 3-6 3V9z" />
        </svg>
        <span className="truncate font-mono text-[10px] text-zinc-400">{filename}</span>
      </div>

      <span className="hidden h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/12 bg-black/40 font-mono text-[9px] font-semibold text-[var(--accent)] sm:flex">
        {index}
      </span>

      {isNew ? (
        <span className="shrink-0 rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/12 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          New
        </span>
      ) : null}

      {duration ? (
        <span className="shrink-0 font-mono text-[9px] text-zinc-500 sm:hidden">{duration}</span>
      ) : null}
    </div>
  );
}

export function DemoPlayer() {
  return (
    <div className="flex flex-col gap-7">
      {demos.map((demo, i) => (
        <DemoVideoCard
          key={demo.src}
          src={demo.src}
          label={demo.label}
          filename={demo.filename}
          isNew={demo.isNew}
          index={i + 1}
        />
      ))}
    </div>
  );
}
