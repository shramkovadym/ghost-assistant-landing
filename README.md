# Ghost Assistant — Landing + Account Backend

Marketing site **and** account/entitlement backend for the Ghost Assistant macOS app
(the Electron app lives in a separate repo: `/Users/bogdan/test/ghost-assistant`).

**Production:** https://ghost-assistant-app.vercel.app

## Routes

- `/` — landing
- `/activate` — post-payment: set email + password to create an account (Stripe redirect target)
- `/thanks` — download & install steps (legacy session-id gate, still works)
- `POST /api/stripe/webhook` — Stripe webhook → writes `entitlements/{email}` to Firestore
- `POST /api/auth/register` — create Firebase user, gated by a paid entitlement
- `GET /api/entitlement` — app startup check (Bearer Firebase idToken → `{ entitled }`)
- `GET /api/version` — app update check (Bearer-gated → latest version)
- `GET /api/download` — signed private-GitHub `.dmg` URL; accepts `?session_id=` OR Bearer idToken

## Account flow

```
Pay (Stripe) ─ webhook ─→ Firestore entitlements/{email}.paid = true
     │
redirect → /activate?session_id={CHECKOUT_SESSION_ID}
     │         user sets email + password (Firebase user created if entitled)
     ▼
App login window → Firebase Auth REST signInWithPassword → idToken/refreshToken in Keychain
     │
     └─→ /api/entitlement (Bearer) gates app use; /api/download (Bearer) for the .dmg
```

## Stripe dashboard

Payment Link → **After payment → Redirect** must include the literal placeholder:

```
https://ghost-assistant-app.vercel.app/activate?session_id={CHECKOUT_SESSION_ID}
```

(Stripe Payment Links do **not** auto-append the session id — you add `{CHECKOUT_SESSION_ID}` yourself.)

Webhook (Workbench → Webhooks → Create new destination), events
`checkout.session.completed` + `checkout.session.async_payment_succeeded`, endpoint
`https://ghost-assistant-app.vercel.app/api/stripe/webhook` → copy the signing secret.

## Env vars

See `.env.example`. Required in Vercel:

- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, (optional `NEXT_PUBLIC_STRIPE_PAYMENT_URL`)
- GitHub: `GHOST_GITHUB_TOKEN` (+ optional `GHOST_GITHUB_REPO`, `GHOST_RELEASE_TAG`)
- Firebase Admin: `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- Firebase Web (public): `NEXT_PUBLIC_FIREBASE_API_KEY`

The Electron app needs the public Firebase Web API key too (`FIREBASE_WEB_API_KEY` in its
`.env` for dev, or hardcoded in `lib/auth-constants.js` for the production build) and
`GHOST_API_BASE` (defaults to the production URL).

## Local dev

```bash
npm install
npm run dev      # localhost:3000
npm run build    # verify production build
npm run lint
```
