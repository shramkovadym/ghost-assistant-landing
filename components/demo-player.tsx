"use client";

import { useState } from "react";

export function DemoPlayer() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <video
        src="/demo.mp4"
        controls
        autoPlay
        playsInline
        preload="metadata"
        className="block aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)]"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#16161c] to-[#0a0a0d] transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_50px_-10px_rgba(138,180,255,0.25)]"
      aria-label="Play demo video"
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(138,180,255,0.18), transparent 60%), radial-gradient(circle at 70% 70%, rgba(192,132,252,0.14), transparent 60%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.35)] transition-transform duration-300 group-hover:scale-110">
          <span
            className="absolute inset-0 rounded-full bg-white/30"
            style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
            aria-hidden
          />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#0a0a0c" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400 backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden />
        Raw 30s screencast
      </div>
    </button>
  );
}
