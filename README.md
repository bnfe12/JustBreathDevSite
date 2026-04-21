# justbreath.life

Social platform: profiles, creator sites, real-time chat (DM/groups/workspaces),
internal mail, content feed, e2ee, operations tools. **No frameworks** — vanilla JS SPA
+ Node.js Express + flat-file JSON store.

---

## Quick start (local dev)

```bash
npm install
cp .env.example .env
# For local dev set APP_URL=http://localhost:8080
# Uploaded-site isolation will then auto-derive http://sites.localhost:8080 unless you set UPLOADED_SITES_ORIGIN explicitly.
# For an empty clean start keep DEMO_SEED_MODE=off.
# If the live store is outside the repo, set DATA_DIR=/absolute/path/to/data
# and optionally BACKUPS_DIR=/absolute/path/to/backups
node server/index.js
# → http://localhost:8080
```

---

## Documentation Index

Core docs are intentionally split by responsibility so deployment, creator-site work, and runtime operations do not get mixed together:

- Platform overview and local runbook: [README.md](README.md)
- Creator-site imports, archive rules, Site Studio, review prep: [SITE_CREATION_GUIDE.md](SITE_CREATION_GUIDE.md)
- Production proxy, nginx, TLS, restart, large uploads: [deploy/DEPLOY.md](deploy/DEPLOY.md)
- Runtime checklist and deployment notes: [SECURITY.md](SECURITY.md)

If you mirror the project to GitHub, keep this section near the top of the repository README so docs remain visible immediately instead of getting buried under the feature list.

---

## Site Creation Docs

If you are building or importing creator sites into justbreath, start here:

- In-app guide: `/developers/sites`
- Project repository: <https://github.com/bnfe12/JustBreathDevSite>
- Full repo guide: [SITE_CREATION_GUIDE.md](SITE_CREATION_GUIDE.md)
- Russian examples: [SITE_CREATION_EXAMPLES_RU.md](SITE_CREATION_EXAMPLES_RU.md)
- SEO / indexing rules for public sites: [SEO_DEVELOPMENT_GUIDE.md](SEO_DEVELOPMENT_GUIDE.md)

Use `Template site` for simple static pages, `Single HTML` only for one-file uploads, and `Archive package` for real exported builds with `css/`, `js/`, `img/`, or extra pages. Archive imports support `zip`, `tar`, `tgz`, `tar.gz`, and `7z` when the server extractor is available. `Site Studio` is for editing uploaded text files after deploy.

Archive packages now pass a quarantine/safety scan before they are stored, and public or unlisted launch stays visible only to the site author until approval.

Large archive uploads now show a visible client-side progress state during binary upload and then switch into a server-side processing phase, so a 20 MB+ import no longer looks like a silent hang.

---

## Chat Audio / Voice Notes

Recent chat-media changes are important because they change how the UI behaves under load:

- Voice and audio playback no longer drive a full SPA `render()` loop on every progress tick.
- Playback state is now reflected through targeted DOM updates, which prevents the chat from visually "refreshing" while audio is playing.
- The active track now lives in a shared top audio block, so playback can continue while you switch chats or move to another screen in the SPA.
- Voice recording now has an explicit live state with a visible timer and recording banner, so there is no ambiguity about whether the microphone is actually recording.
- If a future change reintroduces interval-based full renders during media playback, treat that as a regression. Chat playback must stay incremental, not page-wide.

---

## Deployment Notes

This project is designed around server-enforced sessions, isolated uploaded-site hosting, rate limits, reverse-proxy controls, and a review gate for externally reachable creator sites.

The expanded checklist lives in [SECURITY.md](SECURITY.md).

Questions about docs or the repository: `justbreath.business.mail@gmail.com` and <https://github.com/bnfe12>.

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

**Operations surface**: `/admin` — stats, user management (ban/verify), ad slots,
verification queue, maintenance mode.

Guest mode is read-only. Chats, mail, publishing, sites, and settings require
an account.

Site creation workflow, Site Studio, archive handling, and AI/static-site rules are documented in [SITE_CREATION_GUIDE.md](SITE_CREATION_GUIDE.md). SEO, indexing, metadata, canonical, structured-data, performance, and crawlability rules for future development are documented in [SEO_DEVELOPMENT_GUIDE.md](SEO_DEVELOPMENT_GUIDE.md).

---

## Production checklist

Before exposing to real users:

### 1. Secrets
- [ ] Set strong primary account password (`OWNER_PASSWORD`; default `12345678` is **not** safe)
- [ ] Set strong `BRAND_PASSWORD`
- [ ] Keep `/admin` limited to the primary operations session; maintenance mode is no longer token-driven

### 2. Email delivery
Configure SMTP in `.env` so verification, password-reset, and sign-in codes actually reach users:
- [ ] `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- Without SMTP, codes print to server console only. Acceptable only for isolated local development, never for shared staging or production.

### 2b. Google sign-in
- [ ] Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- [ ] Add exact authorized redirect URIs in Google Cloud Console:
- `https://justbreath.life/api/auth/google/callback`
- `http://localhost:8080/api/auth/google/callback`
- `https://justbreath.life` and `https://www.justbreath.life` belong in Authorized JavaScript origins, not redirect URIs

### 3. HTTPS + reverse proxy
- [ ] Put nginx (config in `deploy/`) in front of Node, terminate TLS there
- [ ] Point both `justbreath.life` and `sites.justbreath.life` to the server
- [ ] Set `UPLOADED_SITES_ORIGIN=https://sites.justbreath.life` in `.env`
- [ ] Set `secure: true` on session cookies (search `setSessionCookie` in `server/index.js`)
- [ ] Issue Let's Encrypt cert: `certbot --nginx -d justbreath.life -d www.justbreath.life -d sites.justbreath.life`
- [ ] Keep `client_max_body_size 1g` and `proxy_request_buffering off` on archive binary routes if operators need large archive imports

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

### 6b. Search visibility
- [ ] Review `SEO_DEVELOPMENT_GUIDE.md` before shipping public-route or creator-site changes
- [ ] Verify canonical URLs, robots behavior, and sitemap output after route changes
- [ ] Verify the property in Google Search Console and Bing Webmaster / IndexNow flows
- [ ] Recheck Core Web Vitals for critical public pages after layout or media changes

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

Recent creator-site API additions:

- `GET /api/developers/capabilities`
- `GET /api/me/sites/import-capabilities`
- `POST /api/me/sites/import-inspect`
- `POST /api/me/sites/upload-tar`
- `POST /api/me/sites/upload-tgz`
- `POST /api/me/sites/upload-7z`
- `POST /api/me/sites/upload-bundle`
- `POST /api/me/sites/upload-bundle-binary`

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
