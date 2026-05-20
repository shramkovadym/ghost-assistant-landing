import Link from "next/link";
import { STRIPE_PAYMENT_URL } from "@/lib/site";

const steps = [
  {
    step: "01",
    title: "Download & install",
    body: "macOS Apple Silicon .dmg — remove quarantine with one Terminal command.",
  },
  {
    step: "02",
    title: "Add your Gemini key",
    body: "Settings (⌘⇧,) — stored locally, encrypted by macOS when available.",
  },
  {
    step: "03",
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

const primaryCtaBase =
  "inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl px-8 text-sm font-semibold tracking-tight transition-transform duration-200 hover:scale-105";

function PrimaryCta() {
  if (STRIPE_PAYMENT_URL) {
    return (
      <a
        href={STRIPE_PAYMENT_URL}
        className={
          primaryCtaBase +
          " bg-white text-[#0a0a0c] shadow-[0_0_28px_rgba(255,255,255,0.22),0_4px_14px_rgba(0,0,0,0.4)] hover:bg-zinc-100 hover:shadow-[0_0_36px_rgba(255,255,255,0.32),0_8px_20px_rgba(0,0,0,0.45)] active:scale-100"
        }
      >
        Get Early Access
      </a>
    );
  }

  return (
    <span
      className={
        primaryCtaBase +
        " cursor-default bg-[var(--accent)] text-[#0a1020] shadow-[0_0_28px_rgba(122,167,255,0.45),0_4px_14px_rgba(0,0,0,0.4)] hover:brightness-110 active:scale-100"
      }
      title="Stripe payment link will be enabled soon"
    >
      Get Early Access — soon
    </span>
  );
}

function SecondaryCta() {
  return (
    <Link
      href="/thanks"
      className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-transparent px-6 text-sm font-medium text-[var(--fg-dim)] transition-transform duration-200 hover:scale-105 hover:border-white/20 hover:bg-white/[0.05] hover:text-[var(--fg)]"
    >
      Already purchased? Download
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">👻 Ghost Assistant</span>
        <span className="rounded-md border border-white/10 bg-[var(--panel)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          Early Access
        </span>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        <section className="py-12 text-center sm:py-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--fg-mute)]">
            Interview copilot for engineers
          </p>
          <h1 className="mx-auto max-w-3xl bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-5xl">
            Pass technical interviews with less stress
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[var(--fg-dim)]">
            The AI copilot that listens to the call, reads your screen, and whispers hints —
            built to stay invisible on Zoom, Google Meet, and Teams screen sharing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <PrimaryCta />
            <SecondaryCta />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[var(--panel)] p-8 sm:p-12">
          <p className="mb-2 text-center text-sm text-[var(--fg-mute)]">
            Demo placeholder — replace with a 30s screen recording (LeetCode + ⌘⇧Space overlay)
          </p>
          <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/30 text-sm text-[var(--fg-mute)]">
            Your product GIF / video goes here
          </div>
        </section>

        <section className="mt-20 grid gap-5 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e1e24] to-[var(--panel)] p-6 transition duration-200 hover:scale-[1.02] hover:border-white/20 hover:bg-[#222228] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
            >
              <span className="mb-4 inline-block font-mono text-[11px] font-semibold tracking-widest text-[var(--accent)]/80">
                {s.step}
              </span>
              <h2 className="text-base font-semibold tracking-tight text-[var(--fg)]">
                {s.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-[var(--fg-dim)]">{s.body}</p>
            </div>
          ))}
        </section>

        <section className="mt-20">
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-zinc-100">
            FAQ
          </h2>
          <div className="mx-auto max-w-2xl space-y-6">
            {faq.map((item) => (
              <div key={item.q} className="border-b border-white/10 pb-6 last:border-0">
                <h3 className="font-medium tracking-tight">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--fg-dim)]">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <PrimaryCta />
            <SecondaryCta />
          </div>
          <p className="mt-5 text-xs tracking-wide text-[var(--fg-mute)]">
            One-time early access · macOS arm64 · BYOK Gemini
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-[var(--fg-mute)]">
        Ghost Assistant · XPIRIO / FounderSide early access
      </footer>
    </div>
  );
}
