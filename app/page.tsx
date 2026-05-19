import Link from "next/link";
import { STRIPE_PAYMENT_URL } from "@/lib/site";

const steps = [
  {
    title: "Download & install",
    body: "macOS Apple Silicon .dmg — remove quarantine with one Terminal command.",
  },
  {
    title: "Add your Gemini key",
    body: "Settings (⌘⇧,) — stored locally, encrypted by macOS when available.",
  },
  {
    title: "Press ⌘⇧Space",
    body: "Captures ~20s of mic + system audio and your screen — get hints in your language.",
  },
];

const faq = [
  {
    q: "Does it work on screen share?",
    body: "The overlay is designed to stay out of typical Zoom / Meet / Teams capture. Always verify in your own setup.",
  },
  {
    q: "Do I need a paid Gemini plan?",
    body: "Bring your own API key from Google AI Studio. LITE tier works well on the free API quota; PRO often has zero free quota.",
  },
  {
    q: "Which Macs are supported?",
    body: "Apple Silicon (M1/M2/M3/M4) only. macOS 12.3+ recommended for system audio capture.",
  },
];

function CtaButton() {
  if (STRIPE_PAYMENT_URL) {
    return (
      <a
        href={STRIPE_PAYMENT_URL}
        className="inline-flex h-12 items-center justify-center rounded-lg bg-[var(--accent)] px-8 text-sm font-semibold text-[#0d1224] transition hover:brightness-110"
      >
        Get Early Access
      </a>
    );
  }

  return (
    <span className="inline-flex h-12 cursor-not-allowed items-center justify-center rounded-lg bg-white/10 px-8 text-sm font-medium text-[var(--fg-dim)]">
      Payment link coming soon
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">👻 Ghost Assistant</span>
        <span className="rounded-md border border-[var(--border)] bg-[var(--panel)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          Early Access
        </span>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        <section className="py-12 text-center sm:py-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--fg-mute)]">
            Interview copilot for engineers
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Pass technical interviews with less stress
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--fg-dim)]">
            The AI copilot that listens to the call, reads your screen, and whispers hints —
            built to stay invisible on Zoom, Google Meet, and Teams screen sharing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <CtaButton />
            <Link
              href="/thanks"
              className="text-sm text-[var(--fg-dim)] underline-offset-4 hover:text-[var(--fg)] hover:underline"
            >
              Already purchased? Download →
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--panel)] p-8 sm:p-12">
          <p className="mb-2 text-center text-sm text-[var(--fg-mute)]">
            Demo placeholder — replace with a 30s screen recording (LeetCode + ⌘⇧Space overlay)
          </p>
          <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/30 text-sm text-[var(--fg-mute)]">
            Your product GIF / video goes here
          </div>
        </section>

        <section className="mt-20 grid gap-6 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-6"
            >
              <h2 className="text-base font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--fg-dim)]">{s.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-semibold">FAQ</h2>
          <div className="mx-auto max-w-2xl space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <h3 className="font-medium">{item.q}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--fg-dim)]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center">
          <CtaButton />
          <p className="mt-4 text-xs text-[var(--fg-mute)]">
            One-time early access · macOS arm64 · BYOK Gemini
          </p>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--fg-mute)]">
        Ghost Assistant · XPIRIO / FounderSide early access
      </footer>
    </div>
  );
}
