import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function isSessionPaid(sessionId: string): Promise<boolean> {
  if (!stripe) return false;
  if (!sessionId || typeof sessionId !== "string") return false;
  if (!sessionId.startsWith("cs_")) return false;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    return false;
  }
}
