# Privacy Policy — justbreath.life

_Effective date: 2026-04-19 · Last updated: 2026-04-19_

This Privacy Policy explains what **justbreath.life** (operated by the justbreath team, hereafter "justbreath", "we", "us") collects when you use the service, why we collect it, who we share it with, and what rights you have.

If something here is unclear, write to **justbreath.business.mail@gmail.com**.

## At a glance

- We collect only what we need to run the service: account data, content you publish, basic logs, anonymous telemetry.
- **We do not sell your personal data.**
- We show ads via Google AdSense. AdSense uses cookies; you can opt out of personalised ads at <https://www.google.com/settings/ads>.
- We store data on our own servers. Automatic backups run every 30 minutes and keep the last 48 snapshots (≈24 hours).
- You can export or delete your account at any time in **Settings**.

---

## 1. Data we collect

### 1.1 Account data
- **Email address** — to sign in, verify identity and recover access.
- **Handle and display name** — visible publicly on your profile and your posts.
- **Password hash** — bcrypt (cost 12). We never see your plain-text password.
- **OAuth subject IDs** — if you sign in with Google or Discord, we store the provider's stable `sub` to match future logins. We do not store OAuth access tokens after the initial callback.

### 1.2 Content you publish
Posts, comments, reactions, messages, files, creator-site HTML/ZIP uploads, avatars, banners. Anything you mark **public** is visible to anyone on the internet; **unlisted** is reachable only by direct link; **private** stays accessible only to you and invitees.

### 1.3 Technical data
- IP address — stored only for rate-limiting and abuse prevention; not attached to your public profile.
- User-Agent string — to detect broken clients.
- Session cookie `jb_sid` — 30-day lifetime, HttpOnly, SameSite=Lax.
- Server logs (request method, path, status, duration) — rolling 30-day retention.

### 1.4 Telemetry (anonymous)
We collect anonymous usage metrics to improve the product: **pageviews**, **client-side JavaScript errors**, and [Core Web Vitals](https://web.dev/vitals/) (LCP, CLS, INP, FCP, TTFB). Events carry a short-lived anonymous session ID, the route visited, and timing metrics — **never the contents of your posts, messages, or form fields**. Telemetry is stored on our own servers, not sent to any third-party analytics provider.

## 2. Cookies & local storage

### Essential
| Cookie | Purpose | Lifetime |
| --- | --- | --- |
| `jb_sid` | Session for signed-in users. HttpOnly, SameSite=Lax. | 30 days |
| `jb_google_oauth` | Short-lived OAuth state during Google sign-in. | 10 min |
| `jb_discord_oauth` | Short-lived OAuth state during Discord sign-in. | 10 min |

### Local storage (in your browser, never sent to us)
- `jb_lang` — your chosen interface language.
- `jb_guest_mode` — flag for read-only guest browsing.
- Saved-account list for quick account switching on the same device.

### Third-party
Google AdSense and related ad services set their own cookies when ads are shown. You can manage these at [Google Ad Settings](https://www.google.com/settings/ads) and [How Google uses cookies](https://policies.google.com/technologies/partner-sites).

## 3. Who we share data with

We share data with the following categories of third parties, and only to the extent required for them to provide their service.

- **Google AdSense / Google AdX** — serves ads on the platform. Receives cookies, IP, page URL, and standard ad-context signals.
- **Google OAuth** — when you choose "Sign in with Google". We receive your email, name, profile picture, and provider `sub`.
- **Discord OAuth** — when you choose "Sign in with Discord". Same data shape as Google.
- **SMTP relay** — outgoing transactional email (verification codes, password resets, notifications). We use the SMTP server configured in our `.env`; if none is configured, codes are printed to server logs only (dev mode).
- **Cloudflare** — edge cache and DNS; receives request metadata but no application data.

**We do not sell data. We do not share message contents, file contents, or private posts with third parties.**

## 4. Data retention & backups

- **Live data** — kept as long as your account exists.
- **Backups** — a full snapshot of the store is written every 30 minutes; we keep the last 48 (≈24 hours). Backups sit on the same server unless you run the service yourself with `BACKUPS_DIR` pointed elsewhere.
- **Logs** — request logs rotate after 30 days.
- **Telemetry** — anonymous telemetry is kept in daily NDJSON files for 180 days.
- **Deleted accounts** — immediately soft-deleted from live data; fully purged from the next backup rotation (≤ 24 h).

## 5. Your rights (GDPR · CCPA · UK GDPR)

If you live in the EU/EEA, the UK, California, or a jurisdiction with similar law, you have the following rights:

- **Access** — request a copy of your data. Available as a one-click export in Settings → Export.
- **Rectification** — edit your profile, posts and settings at any time.
- **Erasure** — delete your account in Settings → Account. Irreversible after the next backup rotation.
- **Restriction & objection** — write to us to pause processing.
- **Portability** — the export format is plain JSON.
- **Complaint** — you may complain to your local data-protection authority.

To exercise any right, email **justbreath.business.mail@gmail.com**. We reply within 30 days.

## 6. Security

- Transport encrypted with TLS (HTTPS) end-to-end via Cloudflare.
- Passwords hashed with bcrypt (cost factor 12). We never store plain passwords.
- Sessions bound to HttpOnly cookies with SameSite=Lax.
- Rate limits on authentication endpoints (5/min/IP) and general API (120/min/IP).
- Content Security Policy restricts which third-party scripts can run.
- Uploaded creator-site imports are stored and served as static files only; backend handlers inside an imported site do not execute on the hosted copy.

No system is perfectly secure. If you find a vulnerability, please report responsibly to **justbreath.business.mail@gmail.com**. We acknowledge reports within 72 hours.

## 7. Minors

The service is not directed at children under 13. If you are a parent or guardian and believe a child has given us personal data, email **justbreath.business.mail@gmail.com** and we will delete the account. Between 13 and the age of digital consent in your jurisdiction (14–16 in most EU countries), you may only use the service with the verifiable consent of a parent or legal guardian.

## 8. International transfers

The service is hosted in the European Union. If you access it from outside the EU, your data may be transferred to and processed in the EU under the safeguards required by GDPR.

## 9. Changes to this policy

If we materially change this policy we will notify registered users by email and show a banner on the site for at least 14 days before the change takes effect. The _Last updated_ date at the top always reflects the current version.

## 10. Contact

**Data controller:** justbreath
**Email:** justbreath.business.mail@gmail.com
**Owner profile:** https://justbreath.life/@justbreath
**GitHub:** https://github.com/bnfe12

For legal / DMCA / GDPR subject-access requests, please mark the subject line accordingly (`[LEGAL]`, `[DMCA]`, `[PRIVACY]`).
