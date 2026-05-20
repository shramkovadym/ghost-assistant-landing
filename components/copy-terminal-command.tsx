"use client";

import { useCallback, useState } from "react";

const COMMAND = 'xattr -cr "/Applications/Ghost Assistant.app"';

export function CopyTerminalCommand() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="terminal-block mt-3 overflow-hidden rounded-xl border border-white/10 bg-[#050506] shadow-[inset_0_2px_12px_rgba(0,0,0,0.65),0_8px_24px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-[#1a1a1e] px-3 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-sm" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-sm" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-sm" aria-hidden />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          Terminal — zsh
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-zinc-400 transition duration-200 hover:scale-105 hover:border-white/20 hover:bg-white/10 hover:text-zinc-100"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto bg-[#0c0c0e] px-4 py-4 font-mono text-[13px] leading-relaxed tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
        <code>
          <span className="select-none text-zinc-500">$ </span>
          <span className="text-[#7ee787]">{COMMAND}</span>
        </code>
      </pre>
    </div>
  );
}
