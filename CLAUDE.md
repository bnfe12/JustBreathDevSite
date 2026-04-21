# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common commands

```bash
npm install                  # install deps (express, bcryptjs, compression, cookie, adm-zip)
npm start                    # or: node server/index.js — runs on PORT (default 8080)
npm run check:server         # node --check server/index.js
npm run check:client         # node --check public/app.js
```

There is **no build step, no bundler, no test runner, no linter.** The client is hand-written vanilla JS served directly. After editing `public/app.js` or `public/app.css`, bump the `?v=` query string in `public/index.html` (single `<link>` + `<script>` tag) to bust browser caches. After editing `server/index.js`, restart the node process — nothing hot-reloads.

Running server on dev/prod:
```bash
nohup node server/index.js > server.log 2>&1 &
curl -s http://localhost:8080/api/health     # → {"ok":true,"site":"..."}
```

## Architecture

Three files carry almost the entire application:

- **`server/index.js`** (~4400 lines) — single Express 5 app. Defines ~150 routes under `/api/*`, the flat-file store, auth, SSE, uploads, Google/Discord OAuth, SMTP sender, admin, backups, site rendering. Declared as one big module, not split.
- **`public/app.js`** (~4000 lines) — single vanilla-JS SPA. Owns one global `state` object, a `parseRoute(pathname)` switch (line ~266), a top-level `render()` that re-draws `#app` from state, and two global event listeners (`click` delegated by `data-action`, `submit` delegated by `data-form`).
- **`public/app.css`** (~3800 lines) — all styles, including mobile breakpoints at `900px` and `1260px`. CSS custom properties drive theming (`data-theme="light|dark"` on `<html>`).

### Data store

`data/store.json` is the database. Loaded/saved via `loadStore()` / `saveStore(store)` in `server/index.js`. Writes are atomic (tmp file + rename). Schema is a single object with top-level arrays: `users, sessions, projects, posts, comments, likes, workspaces, rooms, invites, messages, tasks, sites, stickerPacks, stickers, notifications, follows, friendRequests, verificationRequests, reactions, pinnedMessages, auditLogs, botTokens, readReceipts, rateLimits`. Every mutation: load → mutate → save. There are no transactions — concurrent writers would race, but the single-node design avoids that.

Store location defaults to `./data/` but respects `DATA_DIR` / `BACKUPS_DIR` env vars (intentional: production deployments keep data outside the git tree).

Auto-backup runs on a `setInterval(30min)` → writes `backups/auto-<ISO>.json`, rotates to keep the last 48 (24h of history). See `autoBackup()` / `rotateBackups()` at the bottom of `server/index.js`.

### Payload shaping

Never ship raw store objects to the client — always go through the `publicUser / publicPost / publicProject / publicSite / publicRoom / mePayload` helpers (~line 1120–1312). These strip secrets (password hash, email when `privacy.showEmail=false`, OAuth subs) and embed nested `author`/`owner` objects the SPA expects. When you add a new field to a stored user/post/etc., update the matching `public*` helper or the client will not see it.

### Auth & sessions

- Cookie-based sessions: `jb_sid` → `store.sessions[].sessionToken`. Lifetime 30 days (`SESSION_TTL_MS`).
- `requireAuth` blocks unauthenticated requests; `requireMember` additionally blocks guests (guests are real store users with `roleInternal: 'guest'`; guest mode is read-only).
- Sign-in paths: password register/login, email one-time code, Google OAuth, Discord OAuth, guest bootstrap.
- **OAuth merge-by-email is intentional:** both Google and Discord callbacks look up by provider `sub` first, then fall back to `find user by email`. If the email matches an existing user and that user does not already have a conflicting provider ID, the new provider is **linked** to the existing account instead of creating a duplicate. Do not "simplify" this to email-blind lookups — the conflict check on line ~1892 (Google) and ~2012 (Discord) prevents account hijacking.
- `POST /api/auth/unlink` refuses to unlink the last remaining sign-in method (a user must keep at least one of: password, Google, Discord).

### Real-time (SSE)

`sseClients: Map<userId, Set<Response>>` keeps one or more open `text/event-stream` connections per user. `publishSSE(userId, event)` fans out, and chat message routes also skip a notification row when a recipient has a live SSE connection. Heartbeat every 20s keeps proxies from closing. There is no WebSocket server. Multi-process deploy would require moving this map to Redis pub/sub.

### Uploads

`saveDataImage(dataUrl, prefix)` and `saveDataAudio(dataUrl, prefix)` decode base64 payloads and write files to `data/uploads/`, returning `/media/...` URLs. The store holds URLs only, never base64 — this keeps `store.json` small. Avatar/banner upload from the client uses the crop-modal flow: the canvas crops client-side, POSTs a `dataUrl`, server writes the file and stores the resulting URL.

### Client state model

- One mutable global `state` object — there is no framework reactivity. After every state change, call `render()`.
- Routing: `navigate(path)` → `pushState` + `parseRoute()` + `render()`. Back/forward also rebuilds via the `popstate` listener.
- Actions dispatch via `data-action="..."` on any element: click handler has one big `switch (target.dataset.action)`. Same pattern for `data-form` on form submit. New interactions get added there, not with per-element `addEventListener`.
- i18n: `t(key)` dictionaries at the top of `app.js`. Six languages (en/ru/uk/pt/pl/fr). Missing keys fall back to English.

### Creator sites

`data/sites/site-<id>.html` files, served from `/@<handle>/<slug>`. The HTML is generated server-side by a template function in `server/index.js` and cached to disk. Regeneration happens on `PATCH /api/me/sites/:id`. AdSense verification script is baked into both the main `index.html` and creator-site HTML.

### Theming & custom accent

`html[data-theme="light|dark"]` switches CSS variables in `app.css:1–80`. The per-user **custom accent** (`user.accent === 'custom'` + `user.accentCustom: {from, to, gradient}`) is applied via `applyCustomAccent(user)` in `app.js`, which sets `--accent`, `--accent-2`, `--accent-gradient`, `--accent-glow` inline on `<html>`. Only `violet|blue|amber|coral|custom` are accepted server-side.

## Environment

`.env` is read by a **hand-rolled** parser in `server/index.js` — there is no `dotenv` dependency. `.env.example` is the source of truth for supported keys. Notable groups:

- Core: `PORT, APP_URL, SITE_NAME, DATA_DIR, BACKUPS_DIR, DEMO_SEED_MODE`
- OAuth: `GOOGLE_CLIENT_ID/SECRET/REDIRECT_URI`, `DISCORD_CLIENT_ID/SECRET/REDIRECT_URI`
- SMTP: `SMTP_HOST/PORT/USER/PASS/FROM` — when `SMTP_HOST` is empty, codes print to `server.log` instead of being emailed (intended for dev).
- Telegram bridge: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_BOT_USERNAME` — endpoints at `/api/integrations/telegram/*` are currently scaffolded (status `'preview'`) and return "coming soon" on link. Webhook endpoint is reserved.

`DEMO_SEED_MODE=on` creates owner (`Tcheler`) and brand (`justbreath`) accounts from env credentials on first boot. Keep it `off` for a clean start.

## Conventions specific to this repo

- **No CSS modules / no class hashing.** Class names are global. Prefer composing an existing class before adding a new one.
- **`icons.*` is a plain object of inline SVG strings** at the top of `app.js`. Use `${icons.key}` in template literals rather than adding `<svg>` markup directly.
- **Escape everything.** User-supplied strings are interpolated into HTML template literals — always wrap with `escapeHtml()` (for text) or the relevant sanitizer (`sanitizeText` server-side). There is no JSX-style auto-escape.
- **Cache-busting is mandatory** after client edits (`?v=YYYYMMDDx` in `public/index.html`). The service is served without hashed asset names, so browsers will hold the previous version.
- **Sessions are per-user-per-browser, stackable** — `state.savedAccounts` / `POST /api/auth/switch` lets a user keep multiple signed-in identities on one device and hot-swap via the drawer.
- **Don't introduce frameworks or a build step.** The "no frameworks" constraint in README is a design choice, not a gap. If something needs a component model, express it with template literals + `data-action` delegation.

## Files worth knowing

- `server/index.js` — everything server
- `public/app.js` — everything client; `parseRoute` at ~266, `render()` at ~2590, click dispatcher at ~3130, form dispatcher at ~3650
- `public/app.css` — theming at the top, `.route-messages` / `.settings-fullscreen` special layouts further down
- `data/store.json` — the DB (don't commit — gitignored via `data/` convention)
- `deploy/nginx-justbreath.conf` — reference nginx config; `deploy/DEPLOY.md` for prod
- `DEVELOPMENT_SETUP.md` — auth-specific notes (Google redirect URIs, email-code flow internals)
- `README.md` — production checklist (secrets, HTTPS, systemd, backups, legal)
