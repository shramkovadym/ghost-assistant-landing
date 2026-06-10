import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Серверна ініціалізація Firebase Admin SDK. Креди беруться зі service-account JSON
// (Project settings -> Service accounts -> Generate new private key), розкладеного по env.
// FIREBASE_PRIVATE_KEY у Vercel зберігається з екранованими \n — повертаємо реальні переводи рядка.

// Приватний ключ приходить по-різному залежно від того, як його вставили в env:
//   - в подвійних/одинарних лапках (лапки стають частиною значення) -> зрізаємо їх;
//   - з екранованими \n замість переводів рядка -> повертаємо реальні \n;
//   - вже з реальними переводами рядка (багаторядкове значення) -> лишаємо як є.
function normalizePrivateKey(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n");
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

let app: App | null = null;

function getApp(): App | null {
  if (!projectId || !clientEmail || !privateKey) return null;
  if (getApps().length) return getApps()[0];
  if (!app) {
    app = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }
  return app;
}

export function getAdminAuth(): Auth | null {
  const a = getApp();
  return a ? getAuth(a) : null;
}

export function getAdminDb(): Firestore | null {
  const a = getApp();
  return a ? getFirestore(a) : null;
}

export const isFirebaseConfigured = Boolean(projectId && clientEmail && privateKey);
