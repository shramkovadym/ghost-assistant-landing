/** Stripe Payment Link (XPIRIO). Override via NEXT_PUBLIC_STRIPE_PAYMENT_URL if needed. */
export const STRIPE_PAYMENT_URL =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_URL ||
  "https://buy.stripe.com/3cI7sK7h75Vz4EYeFxa7C00";

export const APP_VERSION = "0.5.1";

export const AI_STUDIO_URL = "https://aistudio.google.com/app/apikey";
