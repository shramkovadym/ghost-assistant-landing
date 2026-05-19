import Link from "next/link";
import { AI_STUDIO_URL, DMG_DOWNLOAD_URL, GITHUB_RELEASES_URL } from "@/lib/site";

export const metadata = {
  title: "Download — Ghost Assistant",
};

export default function ThanksPage() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-lg">
        <Link
          href="/"
          className="text-sm text-[var(--fg-dim)] hover:text-[var(--fg)]"
        >
          ← Back
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight">
          You&apos;re in — thanks!
        </h1>
        <p className="mt-3 text-[var(--fg-dim)]">
          Follow these steps on your Mac (Apple Silicon). Allow about 5 minutes.
        </p>

        <ol className="mt-10 list-decimal space-y-8 pl-5 text-sm leading-relaxed">
          <li>
            <p className="font-medium text-[var(--fg)]">Download the app</p>
            <p className="mt-2 text-[var(--fg-dim)]">
              <a
                className="text-[var(--accent)] underline underline-offset-2"
                href={DMG_DOWNLOAD_URL}
              >
                Ghost Assistant 0.3.1 (arm64 .dmg)
              </a>
              {" · "}
              <a
                className="text-[var(--fg-dim)] underline underline-offset-2"
                href={GITHUB_RELEASES_URL}
              >
                all releases
              </a>
            </p>
          </li>

          <li>
            <p className="font-medium text-[var(--fg)]">Install & remove quarantine</p>
            <p className="mt-2 text-[var(--fg-dim)]">
              Drag to Applications, then run in Terminal:
            </p>
            <pre className="mt-3 overflow-x-auto rounded-lg border border-[var(--border)] bg-black/40 p-4 text-xs text-zinc-200">
              xattr -cr &quot;/Applications/Ghost Assistant.app&quot;
            </pre>
          </li>

          <li>
            <p className="font-medium text-[var(--fg)]">Grant permissions</p>
            <p className="mt-2 text-[var(--fg-dim)]">
              Microphone, Screen Recording, and Accessibility (for global hotkeys).
              Restart the app after granting (⌘⇧Q, then open again).
            </p>
          </li>

          <li>
            <p className="font-medium text-[var(--fg)]">Gemini API key</p>
            <p className="mt-2 text-[var(--fg-dim)]">
              Get a key from{" "}
              <a
                className="text-[var(--accent)] underline underline-offset-2"
                href={AI_STUDIO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google AI Studio
              </a>
              . Open Settings (⌘⇧,) → paste key → <strong>Save</strong>.
            </p>
          </li>

          <li>
            <p className="font-medium text-[var(--fg)]">Use LITE on free tier</p>
            <p className="mt-2 text-[var(--fg-dim)]">
              Press ⌘⇧P until the badge shows LITE. PRO often has zero quota on free API plans.
            </p>
          </li>

          <li>
            <p className="font-medium text-[var(--fg)]">During the interview</p>
            <p className="mt-2 text-[var(--fg-dim)]">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs">
                ⌘⇧Space
              </kbd>{" "}
              — answer from last ~20s of audio + screenshot.
            </p>
          </li>
        </ol>

        <p className="mt-12 text-xs text-[var(--fg-mute)]">
          Need help? Reply to your purchase receipt email or contact support.
        </p>
      </div>
    </div>
  );
}
