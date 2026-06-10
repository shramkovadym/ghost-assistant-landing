import { bearerFrom, emailFromIdToken } from "@/lib/auth-token";
import { isEntitled } from "@/lib/entitlements";

// Перевірка на старті застосунку: чи валідний токен і чи оплачено. Повертає 200 з { entitled }.
// Електрон тримає offline-grace сам — тут лише джерело правди.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = bearerFrom(request);
  if (!token) {
    return Response.json({ entitled: false, error: "Missing token" }, { status: 401 });
  }

  const email = await emailFromIdToken(token);
  if (!email) {
    return Response.json({ entitled: false, error: "Invalid token" }, { status: 401 });
  }

  const entitled = await isEntitled(email);
  return Response.json({ entitled, email }, { status: 200 });
}
