import { getAdminAuth } from "@/lib/firebase-admin";
import { normalizeEmail } from "@/lib/entitlements";

// Верифікує Firebase idToken (з Authorization: Bearer ...) і повертає email верифікованого
// користувача або null. Використовується для гейтингу /api/download, /api/version, /api/entitlement
// із застосунку (Electron логіниться через Firebase REST, далі носить idToken).

export function bearerFrom(request: Request): string | null {
  const header = request.headers.get("authorization") || request.headers.get("Authorization");
  if (!header) return null;
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

export async function emailFromIdToken(idToken: string): Promise<string | null> {
  const auth = getAdminAuth();
  if (!auth || !idToken) return null;
  try {
    const decoded = await auth.verifyIdToken(idToken);
    // verifyIdToken перевіряє підпис, але не власність email. Акаунти створює лише
    // /api/auth/register з emailVerified:true (email прийшов з оплаченої Stripe-сесії),
    // тому довіряємо тільки verified-email токенам.
    if (!decoded.email_verified) return null;
    return decoded.email ? normalizeEmail(decoded.email) : null;
  } catch {
    return null;
  }
}
