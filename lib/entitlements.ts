import { getAdminDb } from "@/lib/firebase-admin";

// Один документ на email у колекції `entitlements`. paid:true ставить лише Stripe webhook.
// Email — нормалізований lowercase; у Firestore doc id емейл валідний (не містить '/').

const COLLECTION = "entitlements";

export type Entitlement = {
  paid: boolean;
  stripeSessionId?: string;
  updatedAt?: string;
};

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function markPaid(email: string, stripeSessionId: string): Promise<void> {
  const db = getAdminDb();
  if (!db) throw new Error("Firestore not configured");
  await db
    .collection(COLLECTION)
    .doc(normalizeEmail(email))
    .set(
      { paid: true, stripeSessionId, updatedAt: new Date().toISOString() },
      { merge: true },
    );
}

export async function isEntitled(email: string): Promise<boolean> {
  const db = getAdminDb();
  if (!db) return false;
  const snap = await db.collection(COLLECTION).doc(normalizeEmail(email)).get();
  return snap.exists && snap.data()?.paid === true;
}
