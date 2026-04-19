# justbreath.life

Social platform: profiles, creator sites, real-time chat (DM/groups/workspaces),
internal mail, content feed, e2ee, admin panel. **No frameworks** — vanilla JS SPA
+ Node.js Express + flat-file JSON store.

---

## Quick start (local dev)

```bash
npm install
cp .env.example .env
# Edit .env as needed. For an empty clean start keep DEMO_SEED_MODE=off.
# If the live store is outside the repo, set DATA_DIR=/absolute/path/to/data
# and optionally BACKUPS_DIR=/absolute/path/to/backups
node server/index.js
# → http://localhost:8080
```

---

## What works

**Without an account** (guest browsing): home page, public feed, discover, public
profiles, public sites, open rooms list. Hero CTA offers "Try as guest" which
creates a temporary guest account (no email, no password).

**With an account**: full chat (DMs / groups / workspaces with channels & tasks),
internal mail, message reactions / edit / delete / pin / reply / search,
typing indicators, read receipts, online presence, file uploads (saved as files,
not base64), creator sites, projects, posts/devlogs, e2ee for personal DMs,
bot tokens, push notifications, sticker packs, GIF search, sign-in by password,
email code, or Google.

**Owner only**: `/admin` — stats, user management (ban/verify), ad slots,
verification queue, maintenance mode.

Guest mode is read-only. Chats, mail, publishing, sites, and settings require
an account.

Site creation workflow is documented in [SITE_CREATION_GUIDE.md](SITE_CREATION_GUIDE.md).

---

## Production checklist

Before exposing to real users:

### 1. Secrets
- [ ] Set strong `OWNER_PASSWORD` (default `12345678` is **not** safe)
- [ ] Set strong `BRAND_PASSWORD`
- [ ] Generate `ADMIN_TOKEN`: `openssl rand -hex 32`

### 2. Email delivery
Configure SMTP in `.env` so verification, password-reset, and sign-in codes actually reach users:
- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- Without SMTP, codes print to server console only — fine for dev, broken for users.

### 2b. Google sign-in
- [ ] Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- [ ] Add exact authorized redirect URIs in Google Cloud Console:
- `https://justbreath.life/api/auth/google/callback`
- `http://localhost:8080/api/auth/google/callback`
- `https://justbreath.life` and `https://www.justbreath.life` belong in Authorized JavaScript origins, not redirect URIs

### 3. HTTPS + reverse proxy
- [ ] Put nginx (config in `deploy/`) in front of Node, terminate TLS there
- [ ] Set `secure: true` on session cookies (search `setSessionCookie` in `server/index.js`)
- [ ] Issue Let's Encrypt cert: `certbot --nginx -d justbreath.life`

### 4. Process management
- [ ] Run via systemd/PM2 with restart-on-failure
- [ ] Don't run as root
- [ ] Set `NODE_ENV=production`

Sample systemd unit:
```ini
[Unit]
Description=justbreath.life
After=network.target

[Service]
Type=simple
User=jb
WorkingDirectory=/opt/justbreath
EnvironmentFile=/opt/justbreath/.env
ExecStart=/usr/bin/node server/index.js
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

### 5. Backups
- Auto-backups already enabled: every 30 min → `backups/auto-<ISO>.json`,
  rotates to keep last 48 (24h of history)
- [ ] Additionally rsync `data/` and `backups/` off-server nightly

### 6. Monitoring
- [ ] `GET /api/health` returns `{ok:true,site:...}` — point uptime monitor here
- [ ] Tail `journalctl -u justbreath -f` for errors
- [ ] Watch `data/store.json` size — at ~50MB consider migration to SQLite

### 7. Legal (required for EU/Portugal)
- [ ] Fill in `PRIVACY.md` (GDPR data-controller name, contact, what's stored, retention)
- [ ] Fill in `TERMS.md` (acceptable use, account suspension grounds, governing law)
- [ ] Cookie banner — add when you ship analytics

---

## File storage

User uploads (avatars, banners, chat images, post images, room/workspace
covers) are stored as files in `data/uploads/` and served from `/media/`.
The JSON store contains URLs only, **not base64** — so `store.json` stays small.

Creator sites live either as a single HTML file (`data/sites/site-<id>.html`)
or as an extracted archive package (`data/sites/site-<id>/...`). Both are
served from `/@<handle>/<slug>`, and bundled assets/pages are served from
`/@<handle>/<slug>/<path>`.

---

## Architecture

```
server/index.js   — Express app, all API routes, SSE, flat-file DB
public/app.js     — Vanilla JS SPA, all client logic
public/app.css    — All styles
public/index.html — Splash screen + #app mount
data/store.json   — Flat-file JSON DB (atomic write via tmp+rename)
data/uploads/     — User-uploaded binaries (images)
data/sites/       — User-created single HTML sites and extracted archive packages
backups/          — Auto-rotating store.json snapshots
```

API surface: ~110 endpoints under `/api/` — see `app.get/post/patch/delete`
declarations in `server/index.js`.

---

## Scaling notes

Current design comfortably handles ~1000 concurrent users / ~50k messages on
one node. Past that:

1. Migrate `data/store.json` → SQLite (`better-sqlite3`) — schema is already
   decomposed enough that this is mostly mechanical.
2. Move SSE channel from in-memory `Map` to Redis pub/sub — required for
   multi-process deployment (PM2 cluster).
3. Move uploads to S3-compatible object storage (Backblaze B2 / R2 / DO Spaces)
   — `saveDataImage()` becomes the only call site to change.

---

## License

See `LICENSE.md`.
