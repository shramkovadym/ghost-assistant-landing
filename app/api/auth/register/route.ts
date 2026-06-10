import type { NextRequest } from "next/server";
import { getAdminAuth } from "@/lib/firebase-admin";
import { getPaidSessionEmail } from "@/lib/stripe";
import { isEntitled, markPaid, normalizeEmail } from "@/lib/entitlements";

// Створення акаунта ПІСЛЯ оплати. Два докази оплати приймаються:
//   1) sessionId (свіжий redirect зі Stripe) — авторитетний, email беремо з сесії;
//   2) інакше — fallback: для введеного email вже є paid-entitlement (його записав webhook).
// Так акаунт неможливо створити без оплати, і немає гонки з webhook при свіжій покупці.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const auth = getAdminAuth();
  if (!auth) {
    return Response.json({ error: "Auth not configured" }, { status: 500 });
  }

  let payload: { email?: string; password?: string; sessionId?: string };
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid body" }, { status: 400 });
  }

  const password = (payload.password ?? "").trim();
  if (password.length < 8) {
    return Response.json({ error: "Password must be at least 8 characters" }, { status: 400 });
  }

  // Визначаємо email, до якого прив'язуємо акаунт.
  let email: string | null = null;

  if (payload.sessionId) {
    email = await getPaidSessionEmail(payload.sessionId);
    if (!email) {
      return Response.json({ error: "Payment not confirmed for this session" }, { status: 403 });
    }
    // Свіжа покупка: гарантуємо entitlement навіть якщо webhook ще не долетів.
    await markPaid(email, payload.sessionId);
  } else if (payload.email) {
    email = normalizeEmail(payload.email);
    const entitled = await isEntitled(email);
    if (!entitled) {
      return Response.json(
        { error: "No purchase found for this email" },
        { status: 403 },
      );
    }
  } else {
    return Response.json({ error: "Email or session required" }, { status: 400 });
  }

  const normalized = normalizeEmail(email);

  try {
    // emailVerified:true — email уже підтверджений оплатою через Stripe (customer_details.email
    // або paid-entitlement). Це дозволяє серверу довіряти verified-токенам цього акаунта.
    await auth.createUser({ email: normalized, password, emailVerified: true });
  } catch (err: unknown) {
    const code = (err as { code?: string })?.code;
    if (code === "auth/email-already-exists") {
      return Response.json(
        { error: "Account already exists — please log in or reset your password" },
        { status: 409 },
      );
    }
    return Response.json({ error: "Could not create account" }, { status: 500 });
  }

  return Response.json({ ok: true, email: normalized }, { status: 201 });
}
