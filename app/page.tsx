import Link from "next/link";
import { STRIPE_PAYMENT_URL } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { MacWindow } from "@/components/mac-window";
import { DemoPlayer } from "@/components/demo-player";

const features = [
  {
    title: "Invisible by design",
    body: "macOS-level content protection hides the overlay from Zoom, Meet, Teams, and QuickTime screen recordings.",
    span: "lg:col-span-2 lg:row-span-2",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7z" opacity=".4" />
        <path d="M2 2l20 20" />
      </svg>
    ),
    visual: (
      <div className="mt-6 grid grid-cols-4 gap-2 opacity-80">
        {["Zoom", "Meet", "Teams", "QuickTime"].map((p) => (
          <div
            key={p}
            className="flex h-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[10px] font-medium text-zinc-400"
          >
            {p}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Dual-audio capture",
    body: "Mic + system audio via native ScreenCaptureKit loopback. No BlackHole, no virtual drivers.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="9" y="2" width="6" height="13" rx="3" />
        <path d="M5 11a7 7 0 0014 0M12 18v3" />
      </svg>
    ),
  },
  {
    title: "30-second buffer",
    body: "Rolling memory of what was just said and shown — answer the question even if you missed it.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    title: "Hotkey-driven",
    body: "No Dock icon, no menu bar. Lives entirely on ⌘⇧ chords — stays out of sight until summoned.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10" />
      </svg>
    ),
  },
  {
    title: "Bring your own key",
    body: "Plug in your Gemini API key. Free tier covers ~500 LITE calls/day. We never see your traffic.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <circle cx="8" cy="12" r="4" />
        <path d="M12 12h10M18 12v3M15 12v2" />
      </svg>
    ),
  },
];

const hotkeys = [
  { keys: ["⌘", "⇧", "Space"], label: "Answer from last 30s" },
  { keys: ["⌘", "⇧", "A"], label: "Ask by typing" },
  { keys: ["⌘", "⇧", "V"], label: "Push-to-talk start" },
  { keys: ["⌘", "⇧", "B"], label: "Push-to-talk stop" },
  { keys: ["⌘", "⇧", "C"], label: "Copy last answer" },
  { keys: ["⌘", "⇧", "R"], label: "Re-ask with context" },
  { keys: ["⌘", "⇧", "P"], label: "Toggle LITE / PRO" },
  { keys: ["⌘", "⇧", "H"], label: "Hide windows" },
];

const steps = [
  {
    n: "01",
    title: "Download & install",
    body: "macOS Apple Silicon .dmg — drag to Applications, remove quarantine with one Terminal command.",
  },
  {
    n: "02",
    title: "Plug in Gemini key",
    body: "Settings (⌘⇧,) → paste your AI Studio API key. Stays in macOS Keychain when available.",
  },
  {
    n: "03",
    title: "Press ⌘⇧Space",
    body: "Captures the last ~30s of mic + system audio plus your screen — hints stream into the overlay.",
  },
];

const faq = [
  {
    q: "Does it really stay invisible on screen share?",
    body: "The overlay window uses NSWindowSharingNone (Electron setContentProtection) so OS-level capture skips it. Tested in Zoom, Google Meet, Microsoft Teams, and QuickTime. Always do a dry run on your own setup first.",
  },
  {
    q: "Do I need to pay for Gemini?",
    body: "No. Bring your own free API key from Google AI Studio. LITE handles ~500 calls/day on the free tier; PRO has tighter quota. Switch with ⌘⇧P.",
  },
  {
    q: "Which Macs are supported?",
    body: "All Apple Silicon Macs — M1 through M5 (yes, the brand-new M5 is supported too). macOS 12.3+ recommended for system-audio capture. Intel Macs are not supported.",
  },
  {
    q: "Is this just Cluely / Cheating Daddy?",
    body: "Same family of tools. Ghost is open-source-ish, BYOK, runs fully local, and you pay once instead of subscribing.",
  },
  {
    q: "What about privacy?",
    body: "Audio and screenshots leave your machine only to Gemini for inference (free tier may be used for training — switch to paid tier if critical). The app has no analytics and no telemetry.",
  },
];

const primaryCtaBase =
  "group relative inline-flex h-12 min-w-[220px] items-center justify-center rounded-xl px-8 text-sm font-semibold tracking-tight transition-all duration-200 hover:scale-[1.03] active:scale-[0.99]";

function PrimaryCta() {
  if (STRIPE_PAYMENT_URL) {
    return (
      <a
        href={STRIPE_PAYMENT_URL}
        className={
          primaryCtaBase +
          " cta-shine bg-white text-[#0a0a0c] shadow-[0_0_30px_rgba(255,255,255,0.18),0_8px_20px_rgba(0,0,0,0.5)] hover:bg-zinc-50 hover:shadow-[0_0_40px_rgba(255,255,255,0.28),0_12px_28px_rgba(0,0,0,0.55)]"
        }
      >
        <span className="relative z-[1]">Get Early Access</span>
        <svg className="relative z-[1] ml-2 transition-transform duration-200 group-hover:translate-x-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </a>
    );
  }

  return (
    <span
      className={
        primaryCtaBase +
        " cursor-default bg-[var(--accent)] text-[#0a1020] shadow-[0_0_28px_rgba(122,167,255,0.45)]"
      }
      title="Stripe payment link will be enabled soon"
    >
      Get Early Access — soon
    </span>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="aurora" aria-hidden />
      <div className="grid-bg" aria-hidden />

      <nav className="nav-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link href="/" className="group flex items-center gap-2 text-base font-semibold tracking-tight">
            <span className="float-y text-xl">👻</span>
            <span className="text-grad-light">Ghost Assistant</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-400 sm:inline-flex">
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 pulse-dot" />
              </span>
              Early Access
            </span>
            <a
              href={STRIPE_PAYMENT_URL}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-white px-4 text-[13px] font-semibold text-[#0a0a0c] transition-transform duration-200 hover:scale-[1.04]"
            >
              Get it
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-32">
        <section className="pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--fg-dim)]">
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
              Interview copilot · macOS
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mx-auto max-w-4xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-grad-light">Pass technical interviews with</span>{" "}
              <span className="text-grad-accent">less stress.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--fg-dim)] sm:text-xl">
              The invisible AI copilot that listens to the call, reads your screen, and whispers
              hints in real time — built to stay out of Zoom, Meet, and Teams screen sharing.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <PrimaryCta />
              <a
                href="#how"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-6 text-sm font-medium text-[var(--fg-dim)] transition-all duration-200 hover:scale-[1.03] hover:border-white/20 hover:bg-white/[0.06] hover:text-[var(--fg)]"
              >
                See how it works
              </a>
            </div>
            <p className="mt-6 text-xs tracking-wide text-[var(--fg-mute)]">
              One-time payment · Apple Silicon · Bring your own Gemini key
            </p>
          </Reveal>
        </section>

        <Reveal>
          <section className="my-12 sm:my-16">
            <MacWindow />
          </section>
        </Reveal>

        <section id="features" className="mt-32 scroll-mt-20">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                Why Ghost
              </p>
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-grad-light sm:text-5xl">
                Engineered to disappear.
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <div
                  className={`card-glow group relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#16161c] to-[#101015] p-6 sm:p-7 ${f.span ?? ""}`}
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.05] text-[var(--accent)] ring-1 ring-white/10">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-[var(--fg)]">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--fg-dim)]">{f.body}</p>
                  {f.visual}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="hotkeys" className="mt-32 scroll-mt-20">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                Driven by chords
              </p>
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-grad-light sm:text-5xl">
                Every action, one shortcut.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[var(--fg-dim)]">
                No floating windows to drag, no menu-bar icon to spot. Just keystrokes that nobody
                on the call can see.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-[var(--panel)]/60 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
              {hotkeys.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-col items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 transition duration-200 hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-1">
                    {h.keys.map((k, i) => (
                      <span key={i} className="kbd">
                        {k}
                      </span>
                    ))}
                  </div>
                  <span className="text-[12px] leading-snug text-[var(--fg-dim)]">{h.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="how" className="mt-32 scroll-mt-20">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                Setup in 3 minutes
              </p>
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-grad-light sm:text-5xl">
                From zero to whispering.
              </h2>
            </div>
          </Reveal>

          <div className="relative grid gap-5 sm:grid-cols-3">
            <div
              className="pointer-events-none absolute left-[16%] right-[16%] top-9 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block"
              aria-hidden
            />
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#16161c] to-[#101015] p-6">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0a0a0d] font-mono text-[12px] font-semibold text-[var(--accent)]">
                    {s.n}
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--fg-dim)]">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-32 scroll-mt-20">
          <Reveal>
            <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#1a1a22] to-[#0e0e12] p-8 sm:p-10">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[var(--accent)]/20 blur-3xl" aria-hidden />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[var(--accent-2)]/20 blur-3xl" aria-hidden />

              <div className="relative">
                <div className="mb-2 flex items-center justify-between">
                  <span className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Early Access
                  </span>
                  <span className="text-[11px] text-[var(--fg-mute)]">Limited</span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">One-time payment</h3>
                <p className="mt-2 text-[var(--fg-dim)]">
                  Pay once, keep forever. No subscriptions, no monthly creep. Future updates included
                  during early access.
                </p>

                <ul className="mt-6 space-y-2.5 text-sm">
                  {[
                    "macOS arm64 .dmg — M1 through M5 supported",
                    "Dual-audio + screenshot context",
                    "Invisible on Zoom / Meet / Teams screen share",
                    "Bring your own Gemini API key (free tier works)",
                    "Updates during early-access window",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 shrink-0 text-[var(--success)]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-[var(--fg-dim)]">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex justify-center">
                  <PrimaryCta />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="faq" className="mt-32 scroll-mt-20">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                Questions
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-grad-light sm:text-5xl">
                Quick answers.
              </h2>
            </div>
          </Reveal>

          <Reveal>
            <div className="mx-auto max-w-2xl divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/10 bg-[var(--panel)]/40">
              {faq.map((item, i) => (
                <details key={item.q} className="group" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 transition hover:bg-white/[0.02]">
                    <span className="font-medium tracking-tight">{item.q}</span>
                    <svg
                      className="shrink-0 text-[var(--fg-mute)] transition-transform duration-300 group-open:rotate-180"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm leading-relaxed text-[var(--fg-dim)]">
                    {item.body}
                  </div>
                </details>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="mt-16">
          <Reveal>
            <details className="group mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/[0.06] bg-[var(--panel)]/30 transition hover:border-white/[0.12]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] text-[var(--accent)] ring-1 ring-white/10">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <span className="block text-sm font-medium tracking-tight text-[var(--fg)]">
                      Curious how it actually looks?
                    </span>
                    <span className="block text-[11px] text-[var(--fg-mute)]">
                      Two short unedited screen recordings
                    </span>
                  </div>
                </div>
                <svg
                  className="shrink-0 text-[var(--fg-mute)] transition-transform duration-300 group-open:rotate-180"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-4 pb-4 pt-1 sm:px-5 sm:pb-5">
                <DemoPlayer />
              </div>
            </details>
          </Reveal>
        </section>

        <section className="mt-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a26] via-[#13131a] to-[#0c0c12] px-6 py-14 text-center sm:px-12 sm:py-20">
              <div className="absolute inset-0 -z-10 opacity-50">
                <div className="absolute left-1/2 top-0 h-72 w-[80%] -translate-x-1/2 rounded-full bg-[var(--accent)]/30 blur-3xl" />
              </div>
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-grad-light sm:text-5xl">
                Your next interview, with backup.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[var(--fg-dim)]">
                Install in five minutes. Invisible on the call. Yours to keep.
              </p>
              <div className="mt-9 flex justify-center">
                <PrimaryCta />
              </div>
              <p className="mt-5 text-xs tracking-wide text-[var(--fg-mute)]">
                One-time early access · macOS arm64 · BYOK Gemini
              </p>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-[var(--fg-mute)] sm:flex-row">
          <div className="flex items-center gap-2">
            <span>👻</span>
            <span>Ghost Assistant</span>
            <span className="text-[var(--fg-mute)]">·</span>
            <span>XPIRIO / FounderSide early access</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#features" className="transition hover:text-[var(--fg-dim)]">Features</a>
            <a href="#hotkeys" className="transition hover:text-[var(--fg-dim)]">Hotkeys</a>
            <a href="#faq" className="transition hover:text-[var(--fg-dim)]">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
