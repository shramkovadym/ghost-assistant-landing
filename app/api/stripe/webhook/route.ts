import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { markPaid } from "@/lib/entitlements";

// Stripe webhook — джерело правди про оплату (надійніше за redirect, який може не долетіти).
// Потрібен RAW body для перевірки підпису, тому runtime nodejs і request.text() без json().

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !signature || !webhookSecret) {
    return new Response("Webhook not configured", { status: 500 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return new Response("Signature verification failed", { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    // payment_status: 'paid' | 'unpaid' | 'no_payment_required'. Платний продукт — лише 'paid'
    // (узгоджено з isSessionPaid / getPaidSessionEmail; промо-сесії доступу не дають).
    if (session.payment_status === "paid") {
      const email = session.customer_details?.email;
      if (email) {
        try {
          await markPaid(email, session.id);
        } catch {
          // 500 -> Stripe повторить доставку (markPaid ідемпотентний через merge:true).
          return new Response("Failed to persist entitlement", { status: 500 });
        }
      }
    }
  }

  return new Response("ok", { status: 200 });
}
