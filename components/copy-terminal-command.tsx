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
    <div className="terminal-block mt-3 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0c] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] bg-[#141418] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-wider text-[var(--fg-mute)]">
          Terminal
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-[var(--fg-dim)] transition hover:border-white/20 hover:bg-white/10 hover:text-[var(--fg)]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>
          <span className="text-[var(--fg-mute)] select-none">$ </span>
          <span className="text-emerald-300/90">{COMMAND}</span>
        </code>
      </pre>
    </div>
  );
}
