import type { NextRequest } from "next/server";
import { isSessionPaid } from "@/lib/stripe";
import { getSignedDmgUrl } from "@/lib/github";
import { bearerFrom, emailFromIdToken } from "@/lib/auth-token";
import { isEntitled } from "@/lib/entitlements";

// Доступ до .dmg за двома шляхами:
//   1) сайт одразу після покупки — ?session_id=... (Stripe);
//   2) застосунок / залогінений юзер — Authorization: Bearer <Firebase idToken> + paid entitlement.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function isAuthorized(request: NextRequest): Promise<boolean> {
  const token = bearerFrom(request);
  if (token) {
    const email = await emailFromIdToken(token);
    if (email && (await isEntitled(email))) return true;
  }

  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (sessionId && (await isSessionPaid(sessionId))) return true;

  return false;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthorized(request))) {
    return new Response("Not authorized — log in or complete checkout", { status: 403 });
  }

  const dmgUrl = await getSignedDmgUrl();
  if (!dmgUrl) {
    return new Response("Release artifact unavailable", { status: 503 });
  }

  return Response.redirect(dmgUrl, 302);
}
