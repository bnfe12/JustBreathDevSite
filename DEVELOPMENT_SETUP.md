# Development Setup

This file is the working development reference for `justbreath.life`.

## Current auth modes

- Password login: `email or handle + password`
- Password registration: `displayName + email + password`
- Email code login: `email + one-time code`
- Google login: OAuth callback handled by the Express server
- Guest mode: read-only

## Important files

- [server/index.js](C:/Users/AndriiKharlai/Downloads/justbreath/server/index.js): server, auth, OAuth, SMTP mail, API routes
- [public/app.js](C:/Users/AndriiKharlai/Downloads/justbreath/public/app.js): SPA auth UI and client flows
- [public/index.html](C:/Users/AndriiKharlai/Downloads/justbreath/public/index.html): main app HTML shell and AdSense verification script
- [.env](C:/Users/AndriiKharlai/Downloads/justbreath/.env): local secrets and runtime config
- [.env.example](C:/Users/AndriiKharlai/Downloads/justbreath/.env.example): config template

## Required env vars

- `PORT`
- `APP_URL`
- `DATA_DIR`
- `BACKUPS_DIR`
- `DEMO_SEED_MODE`
- `ADSENSE_CLIENT_ID`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `ADMIN_TOKEN`

## Current auth endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/send-login-code`
- `POST /api/auth/login-code`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `POST /api/auth/send-verify`
- `POST /api/auth/verify-email`
- `POST /api/auth/guest`

## Google OAuth

The app is not using NextAuth or Next.js. Google auth is implemented directly in Express.

Use these exact redirect URIs in Google Cloud Console:

- `https://justbreath.life/api/auth/google/callback`
- `http://localhost:8080/api/auth/google/callback`

Use these JavaScript origins:

- `https://justbreath.life`
- `https://www.justbreath.life`

Notes:

- Client ID is safe to show publicly.
- Client secret should stay only in `.env` or server secrets storage.
- The server loads `.env` automatically on startup.
- On localhost, callback URL is built from the incoming request host so local testing does not get forced onto production `APP_URL`.

## Email code login

Behavior:

- User enters `email`
- If the email is new, user also enters `name`
- Server sends a 6-digit code by email
- `POST /api/auth/login-code` signs in existing user or creates a new one

Implementation details:

- Codes are currently stored in-memory in `_pendingCodes`
- SMTP fallback prints messages to server console if SMTP is not configured
- New user handle is generated automatically from email or name

## AdSense

AdSense verification script is already inserted into:

- `public/index.html`
- server-generated creator site HTML templates in `server/index.js`

Current client id source:

- `ADSENSE_CLIENT_ID` env var
- fallback default is the current publisher id used in the project

If AdSense still does not verify:

1. Deploy the latest code
2. Open page source on production
3. Confirm the `adsbygoogle.js?client=...` script is present inside `<head>`
4. Retry verification in AdSense

## Data storage

By default the app uses local `data/`, but production can and should point elsewhere:

- `DATA_DIR=/absolute/path/to/data`
- `BACKUPS_DIR=/absolute/path/to/backups`

Important:

- `data/store.json` is the main flat-file database
- creator-site modes and archive rules are documented in `SITE_CREATION_GUIDE.md`
- clean startup without demo users requires `DEMO_SEED_MODE=off`
- demo owner/brand seed data is only created when `DEMO_SEED_MODE=on`

## Local run

```bash
npm install
node server/index.js
```

Local URL:

- `http://localhost:8080`

## Before production testing

1. Set real SMTP credentials
2. Set strong `ADMIN_TOKEN`
3. Set strong owner and brand passwords if demo seed mode is ever used
4. Add Google redirect URIs in Cloud Console
5. Deploy changes
6. Test:
- password sign-up
- password sign-in
- email code sign-in
- Google sign-in
- guest restrictions
- AdSense verification

## Known architectural notes

- `.env` is loaded manually by the server, no extra env loader package is used
- guest restrictions are enforced on both server and client, but server is the real source of truth
- email code login and verification codes are not persistent across server restart
- current storage is flat-file JSON, not SQL
