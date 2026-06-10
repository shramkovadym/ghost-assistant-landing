import { bearerFrom, emailFromIdToken } from "@/lib/auth-token";
import { isEntitled } from "@/lib/entitlements";
import { getLatestRelease } from "@/lib/github";
import { APP_VERSION } from "@/lib/site";

// Остання версія для застосунку (notify-style). Береться автоматично з останнього GitHub-релізу;
// APP_VERSION лишається лише як fallback, якщо GitHub недоступний. Гейт по Firebase-токену + оплата.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = bearerFrom(request);
  const email = token ? await emailFromIdToken(token) : null;
  if (!email || !(await isEntitled(email))) {
    return Response.json({ error: "Not authorized" }, { status: 403 });
  }

  const latest = await getLatestRelease();
  return Response.json(
    {
      version: latest?.version || APP_VERSION,
      downloadPath: "/api/download",
    },
    { status: 200 },
  );
}
