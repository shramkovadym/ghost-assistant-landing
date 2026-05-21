export function MacWindow() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-b from-[#8ab4ff]/20 via-[#c084fc]/10 to-transparent blur-2xl" />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#1c1c22] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
          <div className="ml-4 flex items-center gap-2 rounded-md bg-black/30 px-3 py-1 text-[11px] text-zinc-400">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M12 1v6m0 10v6m11-11h-6m-10 0H1m17-7l-4 4m-4 4l-4 4m12 0l-4-4M5 5l4 4" />
            </svg>
            leetcode.com/problems/two-sum
          </div>
          <span className="ml-auto rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-zinc-500">
            Zoom · Screen sharing
          </span>
        </div>

        <div className="relative grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-7 sm:py-7">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-200">1. Two Sum</h3>
              <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                Easy
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              Given an array of integers <code className="text-zinc-300">nums</code> and an integer{" "}
              <code className="text-zinc-300">target</code>, return indices of the two numbers
              such that they add up to target.
            </p>
            <div className="mt-4 rounded-lg border border-white/5 bg-black/40 p-3 font-mono text-[11px] leading-relaxed">
              <div><span className="text-zinc-600">Input:</span> <span className="text-zinc-300">nums = [2,7,11,15], target = 9</span></div>
              <div><span className="text-zinc-600">Output:</span> <span className="text-zinc-300">[0,1]</span></div>
            </div>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#0a0a0d] p-4 font-mono text-[11px] leading-relaxed">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-zinc-600">{"// solution.ts"}</span>
              <span className="ml-auto rounded bg-white/[0.06] px-1.5 py-0.5 text-[9px] text-zinc-500">TS</span>
            </div>
            <div><span className="text-[#c084fc]">function</span> <span className="text-[#8ab4ff]">twoSum</span><span className="text-zinc-500">(</span></div>
            <div className="pl-4 text-zinc-400">nums: <span className="text-[#7ee787]">number[]</span>,</div>
            <div className="pl-4 text-zinc-400">target: <span className="text-[#7ee787]">number</span></div>
            <div className="text-zinc-500">{`): number[] {`}</div>
            <div className="pl-4 text-zinc-600">{"// ..."}</div>
            <div className="text-zinc-500">{`}`}</div>
          </div>

          <div className="overlay-in pointer-events-none absolute bottom-4 right-4 w-[78%] max-w-[360px] sm:bottom-6 sm:right-6">
            <div className="relative rounded-xl border border-white/15 bg-[#101015]/95 p-3.5 shadow-[0_20px_50px_-10px_rgba(138,180,255,0.4),0_0_0_1px_rgba(138,180,255,0.15)] backdrop-blur-xl">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">👻</span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--accent)]">
                    Ghost · LITE
                  </span>
                </div>
                <span className="rounded border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] text-zinc-500">
                  ⌘⇧Space
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-zinc-300">
                Use a hash map — store{" "}
                <code className="rounded bg-white/[0.06] px-1 text-[var(--accent)]">target − nums[i]</code>
                {" "}as you iterate. <span className="text-zinc-500">O(n) time, O(n) space.</span>
              </p>
              <div className="mt-2.5 flex items-center gap-1">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="ml-2 text-[10px] text-zinc-500">streaming…</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[var(--fg-mute)]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" aria-hidden />
        Overlay invisible to Zoom · Meet · Teams · QuickTime
      </div>
    </div>
  );
}
