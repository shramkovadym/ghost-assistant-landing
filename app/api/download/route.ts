import type { NextRequest } from "next/server";
import { isSessionPaid } from "@/lib/stripe";
import { getSignedDmgUrl } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return new Response("Missing session_id", { status: 400 });
  }

  const paid = await isSessionPaid(sessionId);
  if (!paid) {
    return new Response("Payment not confirmed for this session", { status: 403 });
  }

  const dmgUrl = await getSignedDmgUrl();
  if (!dmgUrl) {
    return new Response("Release artifact unavailable", { status: 503 });
  }

  return Response.redirect(dmgUrl, 302);
}
