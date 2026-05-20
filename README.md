# Ghost Assistant — Landing

Marketing site for the Ghost Assistant macOS app (separate repo from the Electron app).

**Production:** https://ghost-assistant-app.vercel.app

**App repo:** https://github.com/knodelchik/ghost-assistant

- `/` — landing
- `/thanks` — post-checkout download & install (Stripe redirect target)

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000 and http://localhost:3000/thanks

## Stripe button

Copy `.env.example` to `.env.local` and set:

```
NEXT_PUBLIC_STRIPE_PAYMENT_URL=https://buy.stripe.com/3cI7sK7h75Vz4EYeFxa7C00
```

Default is already set in `lib/site.ts`; env var only needed to override.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import in Vercel — **Project name must be `ghost-assistant-app`**.
3. Production URL: `https://ghost-assistant-app.vercel.app`
4. Set `NEXT_PUBLIC_STRIPE_PAYMENT_URL` in Vercel → Settings → Environment Variables.

Stripe redirect after payment:

```
https://ghost-assistant-app.vercel.app/thanks
```
