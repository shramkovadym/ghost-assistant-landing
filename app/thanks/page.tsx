import Link from "next/link";
import { CopyTerminalCommand } from "@/components/copy-terminal-command";
import { isSessionPaid } from "@/lib/stripe";
import { AI_STUDIO_URL, APP_VERSION, STRIPE_PAYMENT_URL } from "@/lib/site";

export const metadata = {
  title: "Download — Ghost Assistant",
};

export const dynamic = "force-dynamic";

type Search = Promise<{ session_id?: string | string[] }>;

export default async function ThanksPage({ searchParams }: { searchParams: Search }) {
  const { session_id } = await searchParams;
  const sessionId = Array.isArray(session_id) ? session_id[0] : session_id;
  const paid = sessionId ? await isSessionPaid(sessionId) : false;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-lg">
        <Link
          href="/"
          className="inline-flex text-sm text-[var(--fg-dim)] transition duration-200 hover:scale-[1.02] hover:text-[var(--fg)]"
        >
          ← Back
        </Link>

        <h1 className="mt-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
          {paid ? "You're in — thanks!" : "Access required"}
        </h1>
        <p className="mt-3 leading-relaxed text-[var(--fg-dim)]">
          {paid
            ? "Follow these steps on your Mac (Apple Silicon). Allow about 5 minutes."
            : "This download is for paying early-access users. Complete checkout and you'll be redirected back here automatically."}
        </p>

        {!paid && (
          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <p className="text-sm text-[var(--fg-dim)]">
              Already paid but landed here without a session link? Reply to your Stripe receipt
              email — we&apos;ll forward your download manually.
            </p>
            <a
              href={STRIPE_PAYMENT_URL}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-[#0a0a0c] transition-transform duration-200 hover:scale-105 hover:bg-zinc-100"
            >
              Get Early Access
            </a>
          </div>
        )}

        {paid && (
          <ol className="mt-10 list-decimal space-y-8 pl-5 text-sm leading-relaxed">
            <li>
              <p className="font-medium text-[var(--fg)]">Download the app</p>
              <p className="mt-2 text-[var(--fg-dim)]">
                <a
                  className="font-medium text-[var(--accent)] underline underline-offset-2 transition duration-200 hover:brightness-125"
                  href={`/api/download?session_id=${encodeURIComponent(sessionId!)}`}
                >
                  Ghost Assistant v{APP_VERSION} (arm64 .dmg)
                </a>
              </p>
              <p className="mt-2 text-xs text-[var(--fg-mute)]">
                Link is tied to your purchase — bookmark this page for re-downloads.
              </p>
            </li>

            <li>
              <p className="font-medium text-[var(--fg)]">Install &amp; remove quarantine</p>
              <p className="mt-2 text-[var(--fg-dim)]">
                Drag to Applications, then run in Terminal:
              </p>
              <CopyTerminalCommand />
            </li>

            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition duration-200 hover:border-white/15">
              <p className="font-medium text-[var(--fg)]">Grant permissions</p>
              <p className="mt-2 text-[var(--fg-dim)]">
                Microphone, Screen Recording, and Accessibility (for global hotkeys).
                Restart the app after granting (⌘⇧Q, then open again).
              </p>
            </li>

            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition duration-200 hover:border-white/15">
              <p className="font-medium text-[var(--fg)]">Gemini API key</p>
              <p className="mt-2 text-[var(--fg-dim)]">
                Get a key from{" "}
                <a
                  className="font-medium text-[var(--accent)] underline underline-offset-2 transition duration-200 hover:brightness-125"
                  href={AI_STUDIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google AI Studio
                </a>
                . Open Settings (⌘⇧,) → paste key → <strong className="text-[var(--fg)]">Save</strong>.
              </p>
            </li>

            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition duration-200 hover:border-white/15">
              <p className="font-medium text-[var(--fg)]">Use LITE on free tier</p>
              <p className="mt-2 text-[var(--fg-dim)]">
                Press ⌘⇧P until the badge shows LITE. PRO often has zero quota on free API plans.
              </p>
            </li>

            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition duration-200 hover:border-white/15">
              <p className="font-medium text-[var(--fg)]">During the interview</p>
              <p className="mt-2 text-[var(--fg-dim)]">
                <kbd className="rounded-md border border-white/10 bg-white/[0.06] px-2 py-0.5 font-mono text-xs text-[var(--fg)]">
                  ⌘⇧Space
                </kbd>{" "}
                — answer from last ~20s of audio + screenshot.
              </p>
            </li>
          </ol>
        )}

        <p className="mt-12 text-xs leading-relaxed text-[var(--fg-mute)]">
          Need help? Reply to your purchase receipt email or contact support.
        </p>
      </div>
    </div>
  );
}
