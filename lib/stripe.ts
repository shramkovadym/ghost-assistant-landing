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

// Повертає email покупця, якщо сесія оплачена; інакше null. Використовується на /activate,
// щоб підставити email і прив'язати акаунт саме до того, хто заплатив (не до довільного email).
export async function getPaidSessionEmail(sessionId: string): Promise<string | null> {
  if (!stripe) return null;
  if (!sessionId || typeof sessionId !== "string") return null;
  if (!sessionId.startsWith("cs_")) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // Платний продукт: лише реально оплачені сесії. 'no_payment_required' (промо/100% знижка)
    // НЕ дає доступу — узгоджено з isSessionPaid і webhook.
    if (session.payment_status !== "paid") return null;
    return session.customer_details?.email ?? null;
  } catch {
    return null;
  }
}
