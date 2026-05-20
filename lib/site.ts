/** Stripe Payment Link (XPIRIO). Override via NEXT_PUBLIC_STRIPE_PAYMENT_URL if needed. */
export const STRIPE_PAYMENT_URL =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL ||
  "https://buy.stripe.com/3cI7sK7h75Vz4EYeFxa7C00";

export const APP_VERSION = "0.4.0";

export const DMG_DOWNLOAD_URL =
  "https://github.com/knodelchik/ghost-assistant/releases/download/v0.4.0/Ghost.Assistant-0.4.0-arm64.dmg";

export const GITHUB_RELEASES_URL =
  "https://github.com/knodelchik/ghost-assistant/releases/tag/v0.4.0";

export const AI_STUDIO_URL = "https://aistudio.google.com/app/apikey";
