import Link from "next/link";
import { ActivateForm } from "@/components/activate-form";
import { getPaidSessionEmail } from "@/lib/stripe";

export const metadata = {
  title: "Activate — Ghost Assistant",
};

export const dynamic = "force-dynamic";

type Search = Promise<{ session_id?: string | string[] }>;

export default async function ActivatePage({ searchParams }: { searchParams: Search }) {
  const { session_id } = await searchParams;
  const sessionId = Array.isArray(session_id) ? session_id[0] : (session_id ?? null);
  const prefillEmail = sessionId ? await getPaidSessionEmail(sessionId) : null;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="inline-flex text-sm text-[var(--fg-dim)] transition duration-200 hover:scale-[1.02] hover:text-[var(--fg)]"
        >
          ← Back
        </Link>

        <h1 className="mt-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-3xl font-semibold tracking-tight text-transparent">
          Create your account
        </h1>
        <p className="mt-3 leading-relaxed text-[var(--fg-dim)]">
          Set a password to finish setup. You&apos;ll use this email and password to log in inside
          the Ghost Assistant app.
        </p>

        <div className="mt-8">
          <ActivateForm prefillEmail={prefillEmail} sessionId={sessionId} />
        </div>

        <p className="mt-8 text-xs leading-relaxed text-[var(--fg-mute)]">
          Already have an account? Just open the app and log in. Lost access? Reply to your Stripe
          receipt email.
        </p>
      </div>
    </div>
  );
}
