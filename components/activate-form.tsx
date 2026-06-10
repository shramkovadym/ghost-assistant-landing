"use client";

import { useState } from "react";

type Props = {
  prefillEmail: string | null;
  sessionId: string | null;
};

export function ActivateForm({ prefillEmail, sessionId }: Props) {
  const [email, setEmail] = useState(prefillEmail ?? "");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const emailLocked = Boolean(sessionId && prefillEmail);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const body: Record<string, string> = { password };
    if (sessionId) body.sessionId = sessionId;
    else body.email = email;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong");
        return;
      }
      setStatus("done");
      setMessage(data.email);
    } catch {
      setStatus("error");
      setMessage("Network error — please try again");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-6">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-[var(--fg)]">Account created</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--fg-dim)]">
          Open Ghost Assistant on your Mac and log in with{" "}
          <span className="font-medium text-[var(--fg)]">{message}</span> and your password.
        </p>
        <a
          href={sessionId ? `/thanks?session_id=${encodeURIComponent(sessionId)}` : "/thanks"}
          className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#0a0a0c] transition-transform duration-200 hover:scale-105 hover:bg-zinc-100"
        >
          Download the app
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--fg)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          readOnly={emailLocked}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={`h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-[var(--fg)] outline-none transition focus:border-[var(--accent)]/50 focus:bg-white/[0.05] ${
            emailLocked ? "cursor-not-allowed opacity-70" : ""
          }`}
        />
        {emailLocked && (
          <p className="mt-1.5 text-xs text-[var(--fg-mute)]">Tied to your purchase</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--fg)]">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 text-sm text-[var(--fg)] outline-none transition focus:border-[var(--accent)]/50 focus:bg-white/[0.05]"
        />
      </div>

      {status === "error" && (
        <p className="rounded-lg border border-red-500/20 bg-red-500/[0.06] px-3.5 py-2.5 text-sm text-red-400">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-[#0a0a0c] transition-transform duration-200 hover:scale-[1.02] hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
